import fs from "fs";

type Signer = {
  recipientId: string;
  roleName: string;
  routingOrder: string;
};

type Recipients = {
  signers: Signer[];
};

type TemplateData = {
  description: string;
  name: string;
  shared: boolean;
  emailSubject: string;
  status: string;
  recipients: Recipients;
};

type Document = {
  documentBase64: string;
  documentId: string;
  fileExtension: string; //TODO: constrain file extension values
  order: string;
  pages: string;
  name: string;
};

type DocumentData = {
  path: string;
  pageCount: string;
};

const DEFAULT_TEMPLATE_DATA: TemplateData = {
  description: "Template for residential purchase agreement.",
  name: "OfferHaus Offer Contract",
  shared: false,
  emailSubject: "Your residential purchase agreement is ready to be signed.",
  status: "created",
  recipients: {
    signers: [
      {
        recipientId: "1",
        roleName: "signer",
        routingOrder: "1",
      },
    ],
  },
};

class Template {
  id: string;

  constructor(templateId: string) {
    this.id = templateId;
  }

  /**
   * Creates a new envelope generation template.
   *
   * @param {string} baseApiPath The base path URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   * @param {TemplateData} templateData
   *
   * The template includes details such as description, name, whether it's shared,
   * subject of the email, status, and recipient information which specifies
   * the role, recipient ID, and routing order.
   *
   * @returns {Promise<Template>} Returns a promise that resolves with the template.
   */

  static async createTemplate(
    baseApiPath: string,
    accessToken: string,
    templateData: TemplateData = DEFAULT_TEMPLATE_DATA
  ): Promise<Template> {
    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      }
    );

    const responseData = await response.json();

    if (response.status > 201) {
      throw new Error("Template creation failed");
    }

    return new Template(responseData.templateId);
  }

  /** Add documents to template.
   *
   * @param {string} baseApiPath The base path URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   * @param {DocumentData} documentData Object containining data about to document to add to template.
   *
   * @returns {Promise<void>}
   *
   * Notes: currently this function only supports adding a single document
   * to a template. this can be changed if needed.
   */

  async addDocument(
    baseApiPath: string,
    accessToken: string,
    documentData: DocumentData
  ): Promise<void> {
    // Read and base64 encode the document
    const documentBuffer = fs.readFileSync(documentData.path);
    const documentBase64 = documentBuffer.toString("base64");
    const documentName = Template._getDocumentName(documentData.path);

    // Construct request JSON
    const requestData = {
      documents: [
        {
          documentBase64: documentBase64,
          documentId: "1",
          fileExtension: Template._getDocumentExtension(documentName),
          order: "1",
          pages: documentData.pageCount, //TODO: get num pages programmatically
          name: documentName,
        },
      ],
    };

    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${this.id}/documents/1`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const respText = await response.text();
      throw new Error(respText);
    }
  }

  /** Add tabs to template.
   *
   * @param {string} baseApiPath The base path URL for the API.
   * @param {string} accessToken The bearer token for authentication.
   *
   * @returns {void}
   */

  async addTabs(accessToken: string, baseApiPath: string) {
    const requestData = {
      signHereTabs: [{
        anchorString: "buyers_signature",
        anchorUnits: "pixels",
        anchorYOffset: "-20",
      }],
      dateSignedTabs: [{
        anchorString: "sign_date2",
        anchorUnits: "pixels",
        anchorYOffset: "-20",
      }]
    };

    const response = await fetch(
      `${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${this.id}/recipients/1/tabs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }
  }

  /** Takes document path and returns document name.
   *
   * @param {string} documentPath Path to document to add to template.
   *
   * @returns {string} name of file
   */
  static _getDocumentName(documentPath: string): string {
    return documentPath.split("/").pop() || "";
  }

  /** Takes document name and returns file extension.
   *
   * @param {string} documentName Path to document to add to template.
   *
   * @returns {string} File extension.
   */
  static _getDocumentExtension(documentName: string): string {
    return documentName.split(".").pop() || "";
  }
}

/**
 * Retrieves an access token and the base URI from docusign API from an authentication
 * code that is returned after filling out the consent form
 *
 * @param {string} authorizationCode The authorization code received after submitting
 *  the consent form
 *
 * @returns {Promise<{token: string, baseUri: string}>} A promise that resolves with an object containing the `access_token`
 * and `base_uri` of the user's primary account. This information is used for further interactions with the API.
 * If either request fails, the function will throw an error with a detailed message based on the server's response.
 */

async function getAccessKeyAndBaseUri(authorizationCode: string) {
  const encodedKeys = btoa(
    `${process.env.INTEGRATION_KEY}:${process.env.SECRET_KEY}`
  );
  const tokenResp = await fetch("https://account-d.docusign.com/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedKeys}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&code=${authorizationCode}`,
  });

  if (tokenResp.status > 201) {
    throw new Error("Getting token failed");
  }

  const tokenData = await tokenResp.json();

  const baseUriResp = await fetch(
    "https://account-d.docusign.com/oauth/userinfo",
    {
      method: "GET", // HTTP method
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Authorization header
      },
    }
  );

  if (baseUriResp.status > 201) {
    throw new Error("Getting base url failed");
  }

  const baseUriData = await baseUriResp.json();

  return {
    token: tokenData.access_token,
    baseUri: baseUriData.accounts[0].base_uri,
  };
}


export { Template };