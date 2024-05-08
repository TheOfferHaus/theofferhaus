type OfferObject = {
  property: {
      id: number;
  };
} & {
  id: number;
  envelopeId: string;
  typeformId: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  buyerId: string;
  propertyId: number;
  status: string;
}

export type {
  OfferObject
}