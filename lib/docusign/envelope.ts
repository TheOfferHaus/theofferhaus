import { env } from "process";

type SignerData = {
  email: string;
  name: string;
};

class Envelope {
  envelopeId: string;

  constructor(envelopeId: string) {
    this.envelopeId = envelopeId;
  }

  /**
   * Creates a new envelope from a specified template
   *
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
    templateId: string,
    signerData: SignerData,
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
      `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
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

    return new Envelope(responseData.envelopeId);
  }

  /**
   * Retrieves the document generation form fields for a specified envelope
   *
   * @returns {Promise<any>} Returns a promise that resolves with the JSON-parsed form field data if the request is successful.
   * If the request fails, it throws an error containing the server's error message.
   */

  async getDocGenFormFields(): Promise<any> {
    const response = await fetch(
      `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docGenFormFields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
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
   * @param {string} documentId The unique identifier for the document to update form fields within.
   *
   * @returns {Promise<void>} A promise that resolves if the update is successful, and throws an error with a detailed
   * message if it fails.
   */

  async mergeDataFields(
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

    const response = await fetch(
      `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docgenformfields`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  /**
   * Sends a signature request email for a specified envelope
   *
   *
   * @returns {Promise<void>} A promise that resolves if the request is successful. If the request fails,
   * an error is thrown detailing the server's response.
   */

  async sendSigningEmail(): Promise<void> {
    const requestData = {
      status: "sent",
    };

    const response = await fetch(
      `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  /**
   * Retrieves a signing URL for a specified envelope and recipient.
   *
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
      `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/views/recipient`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
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
   * @returns {Promise<string>} Array of document uris for all envelopes.
   */

  // static async getEnvelopes(
  //   env.DOCUSIGN_BASE_API_PATH: string,
  //   env.DOCUSIGN_ACCESS_TOKEN: string
  // ): Promise<Array<string>> {
  //   const envelopesResp = await fetch(
  //     `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify('2017-05-02T01:44Z')
  //     }
  //   );

  //   const envelopesData = await envelopesResp.json();
  //   const envelopes: { uri: string, }[] = envelopesData.envelopes;

  //   return envelopes.map((e) => e.uri);
  // }

  /**
  * Filters envelopes by envelope ID and retrieves document uris associated
  * with them.
  *
  *
  * @returns {Promise<string>} Array of document uris for filtered envelopes.
  */

  // static async getEnvelopeByIds(
  //   env.DOCUSIGN_BASE_API_PATH: string,
  //   env.DOCUSIGN_ACCESS_TOKEN: string,
  //   envelopeIds: string[]
  // ): Promise<Array<String>> {
  //   const q = new URLSearchParams({
  //     envelopeIds: envelopeIds.join(","),
  //   });

  //   const envelopesResp = await fetch(
  //     `${env.DOCUSIGN_BASE_API_PATH}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes?${q}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${env.DOCUSIGN_ACCESS_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const envelopesData = await envelopesResp.json();
  //   const envelopes: { uri: string; }[] = envelopesData.envelopes;

  //   return envelopes.map((e) => e.uri);
  // }
}

export { Envelope };