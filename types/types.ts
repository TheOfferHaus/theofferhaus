export type UserObject = {
  username: string,
  isAdmin: boolean,
  createdAt: string,
  updatedAt: string,
  stripeId: string;
};

export type OfferObject = {
  id: number,
  createdAt: string,
  updatedAt: string,
  price: number,
  buyerId: string,
  buyer: UserObject,
  propertyId: number,
  property: PropertyObject;
};

export type PropertyObject = {
  id: number;
};