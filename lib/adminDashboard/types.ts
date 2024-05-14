/** User type for the admin dashboard User table */
type User = {
  username: string | null;
  lastName: string | null;
  firstName: string | null;
  email: string | null;
  lastOffer: Date | null;
};

export type {
  User
};