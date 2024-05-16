import ApiTokenManager from "./ApiTokenManager";
import { SignerData } from "@/config";

export default class Envelope {
  envelopeId: string;
  tokenManager: ApiTokenManager;

  constructor(envelopeId: string, tokenManager: ApiTokenManager) {
    this.envelopeId = envelopeId;
    this.tokenManager = tokenManager;
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

    const tokenManager = await ApiTokenManager.createApiTokenManager();

    const requestData = {
      templateId: templateId,
      templateRoles: [
        {
          email: signerData.email,
          name: signerData.name,
          roleName: "signer",
          clientUserId: signerData.userId,
          embeddedRecipientStartURL: "SIGN_AT_DOCUSIGN"
        },
      ],
      status: "created",
    };

    const response = await fetch(
      `${tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.status > 201) {
      throw new Error("Creating envelope failed: " + await response.text());
    }

    const responseData = await response.json();

    return new Envelope(responseData.envelopeId, tokenManager);
  }

  /**
   * Retrieves the document generation form fields for a specified envelope
   *
   * @returns {Promise<any>} Returns a promise that resolves with the JSON-parsed form field data if the request is successful.
   * If the request fails, it throws an error containing the server's error message.
   */

  async getDocGenFormFields(): Promise<any> {
    const response = await fetch(
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docGenFormFields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Getting doc gen form fields failed: " + await response.text());
    }

    return await response.json();
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
          documentId,
          docGenFormFieldList,
        },
      ],
    };

    const response = await fetch(
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/docgenformfields`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Merging data fields failed: " + await response.text());
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
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Sending signing email failed: " + await response.text());
    }
  }

  /**
   * Retrieves a signing URL for a specified envelope and recipient.
   *
   * @param {string} returnUrl The URL to which the user will be redirected after signing.
   * @param {SignerData} signerData The details of the recipient, including their email and username.
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
    signerData: SignerData
  ): Promise<string> {

    const response = await fetch(
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${this.envelopeId}/views/recipient`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: returnUrl,
          authenticationMethod: "none",
          email: signerData.email,
          userName: signerData.name,
          clientUserId: signerData.userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Getting signing url failed: " + await response.text());
    }

    const signingUrlData = await response.json();
    return signingUrlData.url;
  }

}
