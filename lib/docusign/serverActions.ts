'use server';

import { Envelope } from "./envelope";
import { Template } from "./admin";

type SignerData = {
  email: string;
  name: string;
};

const DEFAULT_TEMPLATE_ID = "5";
const RETURN_URL = "http://localhost:3000";

async function makeAndSendEnvelope(formFields: { [key: string]: string; }, signerData: SignerData, templateId: string = DEFAULT_TEMPLATE_ID) {
  const envelope = await Envelope.createEnvelope(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!, templateId, signerData);
  const documentId = await envelope.getDocGenFormFields(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!);
  await envelope.mergeDataFields(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!, documentId, formFields);
  await envelope.sendSigningEmail(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!);
  return await envelope.getSigningUrl(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!, RETURN_URL, signerData);
}

async function createTemplate() {
  const template = await Template.createTemplate(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!);

  const documentData = {
    path: process.cwd() + "/agreementTemplate.docx",
    pageCount: "7"
  };

  await template.addDocument(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!, documentData);
  await template.addTabs(process.env.BASE_API_PATH!, process.env.ACCESS_TOKEN!);
  return template.id;
}


export {
  makeAndSendEnvelope,
  createTemplate
};