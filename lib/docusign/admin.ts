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
  path: string,
  pageCount: string
}

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

const DEFAULT_DOCUMENT_DATA: Document = {
  documentBase64: "",
  documentId: "1",
  fileExtension: "docx",
  order: "1",
  pages: "1",
  name: "docusign_test_doc.docx",
};

/**
 * Creates a new envelope generation template.
 *
 * @param {string} basePath The base path URL for the API.
 * @param {string} accessToken The bearer token for authentication.
 * @param {TemplateData} templateData
 * The template includes details such as description, name, whether it's shared,
 *  subject of the email, status, and recipient information which specifies
 * the role, recipient ID, and routing order.
 *
 * @returns {Promise<Object>} Returns a promise that resolves with the template ID.
 */

async function createTemplate(
  basePath: string,
  accessToken: string,
  templateData: TemplateData = DEFAULT_TEMPLATE_DATA
): Promise<string> {
  const response = await fetch(
    `${basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates`,
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
  console.log(responseData);

  if (response.status > 201) {
    console.error("Request failed:", await response.text());
    return responseData;
  }

  const templateId = responseData.templateId;
  console.log("Template created with ID:", templateId);
  return templateId;
}

/** Add documents to template.
 *
 * @param {TemplateData} templateId The template ID of template to add documents to.
 * @param {string} basePath The base path URL for the API.
 * @param {string} accessToken The bearer token for authentication.
 * @param {string} documentPath Path to document to add to template.
 *
 * @returns {void}
 */
async function addDocsToTemplate(
  basePath: string,
  accessToken: string,
  templateId: string,
  document: DocumentData
) {
  // Read and base64 encode the document
  const documentBuffer = fs.readFileSync(document.path);
  const documentBase64 = documentBuffer.toString("base64");
  const documentName = getDocumentName(document.path);

  // Construct request JSON
  const requestData = {
    documents: [
      {
        documentBase64: documentBase64,
        documentId: "1",
        fileExtension: getDocumentExtension(documentName),
        order: "1",
        pages: document.pageCount, //TODO: get num pages programmatically
        name: documentName,
      },
    ],
  };

  const response = await fetch(
    `${basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${templateId}/documents/1`,
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

  // TODO: create specific error
  if (!response.ok) {
    const respText = await response.text();
    throw new Error(respText);
  }

  console.log("Document updated successfully!");
}


/** Add documents to template.
 *
 * @param {TemplateData} templateId The template ID of template to add documents to.
 * @param {string} basePath The base path URL for the API.
 * @param {string} accessToken The bearer token for authentication.
 *
 * @returns {void}
 */
async function addTabs() {
  const requestData = {
    signHereTabs: [
      {
        anchorString: "sn1",
        anchorUnits: "pixels",
        anchorYOffset: "10",
      },
    ],
  };

  try {
    const response = await fetch(
      `${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${reqBody.templateId}/recipients/1/tabs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reqBody.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const responseText = await response.text();
      console.error("Request failed:", responseText);
      return NextResponse.json({ error: responseText });
    }

    console.log("Tabs added successfully!");
    return NextResponse.json({ message: "Tabs added successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error });
  }
}

/** Takes document path and returns document name.
 *
 * @param {string} documentPath Path to document to add to template.
 *
 * @returns {string} name of file
 */
function getDocumentName(documentPath: string): string {
  return documentPath.split("/").pop() || "";
}

/** Takes document name and returns file extension.
 *
 * @param {string} documentName Path to document to add to template.
 *
 * @returns {string} File extension.
 */
function getDocumentExtension(documentName: string): string {
  return documentName.split(".").pop() || "";
}
