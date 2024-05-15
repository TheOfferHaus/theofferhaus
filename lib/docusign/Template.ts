import fs from "fs";
import ApiTokenManager from "./ApiTokenManager";
import { TemplateData, DocumentData } from "@/config";

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

export default class Template {
  id: string;
  tokenManager: ApiTokenManager;

  constructor(templateId: string, tokenManager: ApiTokenManager) {
    this.id = templateId;
    this.tokenManager = tokenManager;
  }

  /**
   * Creates a new envelope generation template.
   *
   * @param {TemplateData} templateData
   *
   * The template includes details such as description, name, whether it's shared,
   * subject of the email, status, and recipient information which specifies
   * the role, recipient ID, and routing order.
   *
   * @returns {Promise<Template>} Returns a promise that resolves with the template.
   */

  static async createTemplate(
    templateData: TemplateData = DEFAULT_TEMPLATE_DATA
  ): Promise<Template> {
    const tokenManager = await ApiTokenManager.createApiTokenManager();

    const response = await fetch(
      `${tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID
      }/templates`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      }
    );

    if (!response.ok) {
      throw new Error("Template creation failed: " + (await response.text()));
    }

    const responseData = await response.json();
    return new Template(responseData.templateId, tokenManager);
  }

  /** Add documents to template.
   *
   * @param {DocumentData} documentData Object containining data about to document to add to template.
   *
   * @returns {Promise<void>}
   *
   * Notes: currently this function only supports adding a single document
   * to a template. this can be changed if needed.
   */

  async addDocument(documentPath: string): Promise<void> {
    // Read and base64 encode the document
    const documentBuffer = fs.readFileSync(documentPath);
    const documentBase64 = documentBuffer.toString("base64");
    const documentName = documentPath.split("/").pop() || "";

    // Construct request JSON
    const requestData = {
      documents: [
        {
          documentBase64: documentBase64,
          documentId: "1",
          fileExtension: documentName.split(".").pop() || "",
          order: "1",
          name: documentName,
        },
      ],
    };

    const response = await fetch(
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID
      }/templates/${this.id}/documents/1`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Adding document to template failed: " + (await response.text())
      );
    }
  }

  /** Add tabs to template.
   *
   *
   * @returns {Promise<void>}
   */

  async addTabs(): Promise<void> {
    const requestData = {
      signHereTabs: [
        {
          anchorString: "buyers_signature",
          anchorUnits: "pixels",
          anchorYOffset: "-20",
        },
      ],
      dateSignedTabs: [
        {
          anchorString: "sign_date2",
          anchorUnits: "pixels",
          anchorYOffset: "-20",
        },
      ],
    };

    const response = await fetch(
      `${this.tokenManager.getBaseUrl()}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID
      }/templates/${this.id}/recipients/1/tabs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Adding tabs to template failed: " + (await response.text())
      );
    }
  }
}
