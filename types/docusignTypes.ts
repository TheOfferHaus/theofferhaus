type ExtractedAnswers = {
  [key: string]: string | boolean;
};

type Answer = {
  field: { ref: string };
  type: string;
  choice?: { label: string };
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

export type {
  Answer,
  ExtractedAnswers,
  SignerData,
  EnvelopeData,
  OfferData,
  DocumentData,
  TemplateData,
  Recipients,
  Signer,
};
