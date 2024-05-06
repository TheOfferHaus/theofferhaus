type SignerData = {
  email: string;
  name: string;
};

class Envelope {
  envelopeId: string;
  templateId: string;
  status: string;

  constructor(envelopeId: string, templateId: string) {
    this.envelopeId = envelopeId;
    this.templateId = templateId;
    this.status = "created";
  }

  /**
   * Creates a new envelope from a specified template
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   * @param {string} templateId The unique identifier for the template from which the envelope will be created.
   * @param {SignerData} signerData The data of the signer including their email and name.
   *
   * The function posts to the envelope creation API endpoint. It sets the envelope's status to "created" and includes
   * the roles using the template and signer information.
   *
   * @returns {Promise<Envelope>} Returns a promise that resolves with the envelope ID if the request is successful.
   * If the request fails, it throws an error with the server's response text.
   */

  static async createEnvelope(
    baseApiPath: string,
    accessToken: string,
    templateId: string,
    signerData: SignerData
  ): Promise<Envelope> {
    const requestData = {
      templateId: templateId,
      templateRoles: [
        {
          email: signerData.email,
          name: signerData.name,
          roleName: "signer",
          clientUserId: 1005,
          embeddedRecipientStartURL: "SIGN_AT_DOCUSIGN"
        },
      ],
      status: "created",
    };

    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.status > 201) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseData = await response.json();

    return new Envelope(responseData.envelopeId, templateId);
  }

  /**
   * Retrieves the document generation form fields for a specified envelope
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   *
   * @returns {Promise<any>} Returns a promise that resolves with the JSON-parsed form field data if the request is successful.
   * If the request fails, it throws an error containing the server's error message.
   */

  async getDocGenFormFields(baseApiPath: string, accessToken: string) {
    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docGenFormFields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const respText = await response.text();
      throw new Error(respText);
    }

    const responseData = await response.json();
    return responseData;
  }

  /**
   * Updates document generation form fields for a given document within an envelope.
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   * @param {string} documentId The unique identifier for the document to update form fields within.
   *
   * @returns {Promise<void>} A promise that resolves if the update is successful, and throws an error with a detailed
   * message if it fails.
   */

  async mergeDataFields(
    baseApiPath: string,
    accessToken: string,
    documentId: string,
    dataToMerge: { [key: string]: string; }
  ): Promise<void> {
    const docGenFormFieldList = Object.keys(dataToMerge).map((key) => ({
      name: key,
      value: dataToMerge[key],
    }));

    const requestData = {
      docGenFormFields: [
        {
          documentId: documentId,
          docGenFormFieldList,
        },
      ],
    };

    console.log(requestData);

    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docgenformfields`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const respText = await response.text();
      console.error("Failed to update docGenFormFields.", respText);
      throw new Error(respText);
    }
  }

  /**
   * Sends a signature request email for a specified envelope
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   *
   * @returns {Promise<void>} A promise that resolves if the request is successful. If the request fails,
   * an error is thrown detailing the server's response.
   */

  async sendSigningEmail(baseApiPath: string, accessToken: string) {
    const requestData = {
      status: "sent",
    };

    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const respText = await response.text();
      throw new Error(respText);
    }
  }

  /**
   * Retrieves a signing URL for a specified envelope and recipient.
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   * @param {string} returnUrl The URL to which the user will be redirected after signing.
   * @param {RecipientData} recipientData The details of the recipient, including their email and username.
   *
   * The payload for the POST request includes the returnUrl, a fixed 'none' authentication method, and the recipient's email and username.
   * It checks the response and if successful, extracts and returns the signing URL.
   * If the API call fails, it processes and throws the error with a detailed message.
   *
   * @returns {Promise<string>} A promise that resolves to the signing URL if the request is successful.
   * If the request fails, an error is thrown detailing the server response.
   */

  async getSigningUrl(
    baseApiPath: string,
    accessToken: string,
    returnUrl: string,
    recipientData: SignerData
  ): Promise<string> {
    const payload = {
      returnUrl: returnUrl,
      authenticationMethod: "none",
      email: recipientData.email,
      userName: recipientData.name,
      clientUserId: 1005,
    };

    const signingUrlResp = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/views/recipient`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const signingUrlData = await signingUrlResp.json();
    console.log(signingUrlData);
    return signingUrlData.url;
  }

  /**
   * Retrieves document uris associated with all envelopes that have been created.
   *
   * @param {string} baseApiPath The base URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   *
   * @returns {Promise<string>} Array of document uris for all envelopes.
   */

  static async getEnvelopes(
    baseApiPath: string,
    accessToken: string
  ): Promise<Array<string>> {
    const envelopesResp = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify('2017-05-02T01:44Z')
      }
    );

    const envelopesData = await envelopesResp.json();
    const envelopes: { uri: string, }[] = envelopesData.envelopes;

    return envelopes.map((e) => e.uri);
  }

  /**
  * Filters envelopes by envelope ID and retrieves document uris associated
  * with them.
  *
  * @param {string} baseApiPath The base URL for the API.
  * @param {string} accessToken The bearer token for authentication.
  *
  * @returns {Promise<string>} Array of document uris for filtered envelopes.
  */

  static async getEnvelopeByIds(
    baseApiPath: string,
    accessToken: string,
    envelopeIds: string[]
  ): Promise<Array<String>> {
    const q = new URLSearchParams({
      envelopeIds: envelopeIds.join(","),
    });

    const envelopesResp = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes?${q}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const envelopesData = await envelopesResp.json();
    const envelopes: { uri: string; }[] = envelopesData.envelopes;

    return envelopes.map((e) => e.uri);
  }
}

export { Envelope };