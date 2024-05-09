type OfferObject = {
  property: {
      id: number,
      address: string;
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