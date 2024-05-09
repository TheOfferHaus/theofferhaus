import TypeformWidget from "@/components/TypeformWidget";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { validate as isUuid } from "uuid";

const prisma = new PrismaClient();

/** Quiz:  Component for rendering the Quiz page.
 *
 * Quiz -> TypeformWidget
 */

export default async function Quiz({
  searchParams,
}: {
  searchParams: { propertyId: string | undefined; offerId: string | undefined };
}) {
  const { propertyId, offerId } = searchParams;

  // check for undefined query params or invalid UUID format
  if (!propertyId || !offerId || !isUuid(propertyId) || !isUuid(offerId))
    redirect("/address-validate");

  // check if property or offer exists, return null if not
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
    },
  });

  const offer = await prisma.offer.findFirst({
    where: {
      id: offerId,
    },
  });

  // if no property or offer found, redirect to address-validate
  if (!property || !offer) redirect("/address-validate");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TypeformWidget propertyId={propertyId} offerId={offerId} />
    </main>
  );
}
