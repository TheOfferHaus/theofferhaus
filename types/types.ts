type OfferObject = {
  property: {
    id: string;
    address: string;
  };
} & {
  id: string;
  envelopeId: string | null;
  typeformId: string | null;
  createdAt: Date;
  updatedAt: Date;
  price: number | null;
  buyerId: string;
  propertyId: string;
  status: string;
};

type USStatesObject = {
  [key: string]: string;
};

type TypeformAnswerObject = {
  field: {
    id: string;
    type: string;
    ref: string;
  };
  type: string;
  boolean?: boolean;
  date?: Date;
  number?: number;
  text?: string;
};

type OfferDetailObject = {
  [key: string]: string | boolean | number | Date;
};

export type {
  OfferObject,
  USStatesObject,
  TypeformAnswerObject,
  OfferDetailObject,
};
