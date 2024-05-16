import Link from "next/link";
import { OfferObject } from "@/types/types";
import { User, currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

/**
 * Component for displaying an offer card. Links to specific offer detail page
 * on click
 *
 * props:
 * - Offer object
 *
 * Offers -> OfferCard
 */

export default async function OfferCard({ offer, knowCompleted }: { offer: OfferObject; knowCompleted: boolean; }) {
  const { id, property, typeformId } = offer;
  const { username } = (await currentUser()) as User;

  // Brings user to quiz if offer in progress, brings user to offer detail page
  // otherwise
  return (
    <div className="h-auto w-5/6 mt-4 mb-6">
      <Link
        href={
          !typeformId
            ? `/quiz?username=${username}&propertyId=${property.id}&offerId=${id}`
            : `/${username}/offers/${id}`
        }
        target={!typeformId? "_blank" : ""}
        rel="noopener noreferrer"
      >
        <Card className="pb-3">
          <CardHeader>
            <CardTitle className="font-bold text-xl">
              {property.address}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center text-lg">
            Offer ID: {id}
          </CardDescription>
          {!knowCompleted && !typeformId ? (
            <p className="text-completed-blue p-0 text-lg font-bold">
              In Progress
            </p>
          ) : (
            <p className="text-success-green p-0 text-lg font-bold">
              Completed
            </p>
          )}
        </Card>
      </Link>
    </div>
  );
}
