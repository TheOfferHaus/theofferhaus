import { Status } from "@prisma/client";

/** User type for the admin dashboard User table */
type User = {
  username: string | null;
  lastName: string | null;
  firstName: string | null;
  email: string | null;
  lastOffer: Date | null;
};

/** Offer type */
type Offer = {
  propertyId: string;
  buyerId: string;
  updatedAt: Date;
  status: string;
  price: number | null;
};

export type { User, Offer };
