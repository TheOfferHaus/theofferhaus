'use server';

import Envelope from "./Envelope";
import Template from "./Template";
import ApiTokenManager from "./ApiTokenManager";
import { SignerData, EnvelopeData, OfferData } from "@/types/docusignTypes";

const DEFAULT_TEMPLATE_ID = "fc833cdb-2228-4cdf-8a6a-e67d1b236f75";
const RETURN_URL = "http://localhost:3000";

/**
 * Creates a new template in DocuSign and adds a document and tabs to it.
 *
 * @returns {Promise<string>} The ID of the created template.
 */
async function createTemplate(): Promise<string> {
  const template = await Template.createTemplate();

  const documentData = {
    path: process.cwd() + "/public/agreementTemplate.docx",
    pageCount: "7"
  };

  await template.addDocument(documentData);
  await template.addTabs();
  return template.id;
}

/**
 * Creates an envelope in DocuSign using a template and merges form fields into it.
 *
 * @param {Object} formFields - An object where the keys are field names and the values are field values to be merged into the envelope.
 * @param {SignerData} signerData - The data of the signer.
 * @param {string} [templateId=DEFAULT_TEMPLATE_ID] - The ID of the template to use for the envelope.
 * @returns {Promise<string>} The ID of the created envelope.
 */
async function makeEnvelope(
  formFields: { [key: string]: string; },
  signerData: SignerData,
  templateId: string = DEFAULT_TEMPLATE_ID
): Promise<string> {
  const envelope = await Envelope.createEnvelope(templateId, signerData);
  const documentData = await envelope.getDocGenFormFields();
  await envelope.mergeDataFields(documentData.docGenFormFields[0].documentId, formFields);
  return envelope.envelopeId;
}

/**
 * Sends a signing email for an existing envelope in DocuSign.
 *
 * @param {string} envelopeId - The ID of the envelope to send the signing email for.
 * @returns {Promise<void>}
 */
async function sendEnvelopeEmail(envelopeId: string): Promise<void> {
  const tokenManager = await ApiTokenManager.createApiTokenManager();
  const envelope = new Envelope(envelopeId, tokenManager);
  await envelope.sendSigningEmail();
}

/**
 * Generates a signing URL for a signer in an existing envelope in DocuSign.
 * IMPORTANT: THIS ONLY WORKS IF sendEnvelopeEmail HAS BEEN CALLED ON THE
 * ENVELOPE ID ALREADY
 *
 * @param {string} envelopeId - The ID of the envelope to generate the signing URL for.
 * @param {SignerData} signerData - The data of the signer.
 * @returns {Promise<string>} The generated signing URL.
 */
async function getEnvelopeUrl(envelopeId: string, signerData: SignerData): Promise<string> {
  const tokenManager = await ApiTokenManager.createApiTokenManager();
  const envelope = new Envelope(envelopeId, tokenManager);
  return await envelope.getSigningUrl(RETURN_URL, signerData);
}

/**
 * Generates signing URLs for multiple offers in DocuSign.
 *
 * @param {OfferData[]} offers - An array of offer data objects.
 * @param {SignerData} signerData - The data of the signer.
 * @returns {Promise<EnvelopeData[]>} An array of envelope data objects containing ID, envelope ID, and signing URL.
 */
async function getEnvelopeUrls(offers: OfferData[], signerData: SignerData): Promise<EnvelopeData[]> {
  const tokenManager = await ApiTokenManager.createApiTokenManager();
  const envelopePromises = offers.map(o => {
    const envelope = new Envelope(o.envelopeId, tokenManager);
    return envelope.getSigningUrl(RETURN_URL, signerData);
  });

  const envelopeUrls = await Promise.all(envelopePromises);
  return envelopeUrls.map((e, idx) => ({ id: offers[idx].id, envelopeId: offers[idx].envelopeId, url: e }));
}


/**
 * Initializes access data in ApiTokenManager to use in API calls to Docusign.
 *
 * @param {string} code - Code given as search param once give consent to Docusign.
 */

async function generateAccessDataAfterConsent(code: string) {
  await ApiTokenManager.initializeAccessData(code);
}


export {
  makeEnvelope,
  sendEnvelopeEmail,
  createTemplate,
  getEnvelopeUrl,
  getEnvelopeUrls,
  generateAccessDataAfterConsent
};