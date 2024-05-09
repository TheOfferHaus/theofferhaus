import Link from "next/link";
import { OfferObject } from "@/types/types";
import { User, currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

/** Component for displaying an offer card with a offer ID
 *
 *
 * props:
 * - Offer object
 */

export default async function OfferCard({ offer }: { offer: OfferObject }) {
  const { id, property } = offer;
  const { username } = (await currentUser()) as User;

  return (
    <div>
      <Link href={`/${username}/offers/${id}`} rel="noopener noreferrer" className="h-auto w-96">
        <Card className="">
          <CardHeader>
            <CardTitle className="font-bold text-xl">
              {property.address}
            </CardTitle>
          </CardHeader>
          <CardFooter>Offer ID: {id}</CardFooter>
        </Card>
      </Link>
    </div>
  );
}
