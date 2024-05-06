'use server';

import { Envelope } from "./envelope";
import { Template } from "./admin";
import { env } from "process";

type SignerData = {
  email: string;
  name: string;
};

type EnvelopeData = {
  id: string,
  envelopeId: string,
  url: string
}

type OfferData = {
  id: string,
  envelopeId: string
}

const DEFAULT_TEMPLATE_ID = "fc833cdb-2228-4cdf-8a6a-e67d1b236f75";
const RETURN_URL = "http://localhost:3000";

async function makeAndSendEnvelope(formFields: { [key: string]: string; }, signerData: SignerData, templateId: string = DEFAULT_TEMPLATE_ID) {
  const envelope = await Envelope.createEnvelope(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!, templateId, signerData);
  const documentData = await envelope.getDocGenFormFields(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!);
  console.log("Here");
  await envelope.mergeDataFields(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!, documentData.docGenFormFields[0].documentId, formFields);
  console.log("There");
  await envelope.sendSigningEmail(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!);
  console.log("everywhere");
  return await envelope.getSigningUrl(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!, RETURN_URL, signerData);
}

async function createTemplate() {
  const template = await Template.createTemplate(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!);

  const documentData = {
    path: process.cwd() + "/public/agreementTemplate.docx",
    pageCount: "7"
  };

  await template.addDocument(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!, documentData);
  await template.addTabs(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!);
  return template.id;
}

async function getEnvelopeUrls(offers: OfferData[], signerData: SignerData): Promise<EnvelopeData[]> {
  const envelopePromises = offers.map(o => {
    const envelope = new Envelope(o.envelopeId, 'sent');
    return envelope.getSigningUrl(process.env.DOCUSIGN_BASE_API_PATH!, process.env.DOCUSIGN_ACCESS_TOKEN!, RETURN_URL, signerData);
  });

  const envelopeUrls = await Promise.all(envelopePromises);

  console.log(envelopeUrls);

  return envelopeUrls.map((e, idx) => ({id: offers[idx].id, envelopeId: offers[idx].envelopeId, url: e}));
}


export {
  makeAndSendEnvelope,
  createTemplate,
  getEnvelopeUrls
};