const DOCUSIGN_API_BASE_URL = "https://account-d.docusign.com";

type ExtractedAnswers = {
  [key: string]: string | boolean;
};

type Answer = {
  field: { ref: string; };
  type: string;
  choice?: { label: string; };
  boolean?: boolean;
  text?: string;
  number?: number;
  date?: string;
  file_url?: string;
  [key: string]: any;
};

type SignerData = {
  email: string;
  name: string;
  userId: string;
};

type EnvelopeData = {
  id: string;
  envelopeId: string;
  url: string;
};

type OfferData = {
  id: string;
  envelopeId: string;
};

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

type DocumentData = {
  path: string;
  pageCount: string;
};

type TokenDataResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type BaseUriDataResponse = {
  accounts: {
    base_uri: string;
  }[];
};

export {
  DOCUSIGN_API_BASE_URL
};

export type {
  BaseUriDataResponse,
  TokenDataResponse,
  ExtractedAnswers,
  Answer,
  SignerData,
  EnvelopeData,
  OfferData,
  TemplateData,
  Signer,
  Recipients,
  DocumentData
};