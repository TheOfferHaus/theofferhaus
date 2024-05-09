type OfferObject = {
  property: {
      id: string,
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
}

export type {
  OfferObject
}