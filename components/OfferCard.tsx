import Link from "next/link";
import { User, currentUser } from "@clerk/nextjs/server";

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

/** Component for displaying an offer card with a offer ID
 *
 *
 * props:
 * - Offer object
 */

export default async function OfferCard({ offer } : { offer: OfferObject }) {
  const { id } = offer;
  const { username } = await currentUser() as User;

  return (
    <div className="OfferCard">
      <Link
        href={`/${username}/offers/${id}`}
        rel="noopener noreferrer">
        <div>
          <h2>Offer ID: {id}</h2>
        </div>
      </Link>
    </div>
  );
}
