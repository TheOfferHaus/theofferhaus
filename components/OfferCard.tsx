import Link from "next/link";
import { OfferObject } from "@/types/types";
import { User, currentUser } from "@clerk/nextjs/server";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

/**
 * Component for displaying an offer card. Links to specific offer detail page
 * on click
 *
 * props:
 * - Offer object
 *
 * Offers -> OfferCard
 */

export default async function OfferCard({ offer }: { offer: OfferObject }) {
  const { id, property } = offer;
  const { username } = (await currentUser()) as User;

  return (
    <div className="h-auto w-5/6 mt-4 mb-6">
      <Link href={`/${username}/offers/${id}`} rel="noopener noreferrer">
        <Card className="pb-3">
          <CardHeader>
            <CardTitle className="font-bold text-xl">
              {property.address}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center text-lg">
            Offer ID: {id}
          </CardDescription>
        </Card>
      </Link>
    </div>
  );
}
