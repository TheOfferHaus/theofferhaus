import { recordTraceEvents } from "next/dist/trace";


type SignerData = {
  email: string;
  name: string;
};

type RecipientData = {
  email: string,
  username: string;
};

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
 * @returns {Promise<string>} Returns a promise that resolves with the envelope ID if the request is successful.
 * If the request fails, it throws an error with the server's response text.
 */

async function createEnvelope(
  baseApiPath: string,
  accessToken: string,
  templateId: string,
  signerData: SignerData
) {

  const requestData = {
    templateId: templateId,
    templateRoles: [
      {
        email: signerData.email,
        name: signerData.name,
        roleName: "signer"
      }
    ],
    status: "created"
  };

  const response = await fetch(`${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });

  if (response.status > 201) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseData = await response.json();
  return responseData.envelopeId;
}


/**
 * Retrieves the document generation form fields for a specified envelope
 *
 * @param {string} baseApiPath The base URL for the API.
 * @param {string} accessToken The bearer token for authentication.
 * @param {string} envelopeId The unique identifier for the envelope whose document generation form fields are to be retrieved.
 *
 * @returns {Promise<any>} Returns a promise that resolves with the JSON-parsed form field data if the request is successful.
 * If the request fails, it throws an error containing the server's error message.
 */

async function getDocGenFormFields(
  baseApiPath: string,
  accessToken: string,
  envelopeId: string,
) {

  const response = await fetch(`${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${envelopeId}/docGenFormFields`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

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
 * @param {string} envelopeId The unique identifier for the envelope containing the document.
 * @param {string} documentId The unique identifier for the document to update form fields within.
 *
 * @returns {Promise<void>} A promise that resolves if the update is successful, and throws an error with a detailed
 * message if it fails.
 */

async function mergeDataFields(
  baseApiPath: string,
  accessToken: string,
  envelopeId: string,
  documentId: string
) {

  const name = "Hard coded name"; //TODO: change this
  const favColor = "Hard coded color";

  const requestData = {
    docGenFormFields: [
      {
        documentId: documentId,
        docGenFormFieldList: [
          {
            name: "name",
            value: name
          },
          {
            name: "favColor",
            value: favColor
          },
        ]
      }
    ]
  };

  const response = await fetch(`${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${envelopeId}/docgenformfields`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });

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
 * @param {string} envelopeId The unique identifier for the envelope that the signature request will be sent for.
 *
 * @returns {Promise<void>} A promise that resolves if the request is successful. If the request fails,
 * an error is thrown detailing the server's response.
 */

async function sendSigningEmail(
  baseApiPath: string,
  accessToken: string,
  envelopeId: string
) {

  const requestData = {
    status: "sent"
  };

  const response = await fetch(`${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${envelopeId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });

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
 * @param {string} envelopeId The unique identifier for the envelope that needs a signing view.
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

async function getSigningUrl(
  baseApiPath: string,
  accessToken: string,
  envelopeId: string,
  returnUrl: string,
  recipientData: RecipientData
) {

  const payload = {
    returnUrl: returnUrl,
    authenticationMethod: "none",
    email: recipientData.email,
    userName: recipientData.username,
  };

  const signingUrlResp = await fetch(
    `${baseApiPath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${envelopeId}/views/recipient`,
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
  return signingUrlData.url;
}

