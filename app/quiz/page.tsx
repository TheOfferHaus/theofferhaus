import TypeformWidget from "@/components/TypeformWidget";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { validate as isUuid } from "uuid";
import { User, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

/** Quiz:  Component for rendering the Quiz page.
 *
 * Quiz -> TypeformWidget
 */

export default async function Quiz({
  searchParams,
}: {
  searchParams: {
    username: string | undefined;
    propertyId: string | undefined;
    offerId: string | undefined;
  };
}) {
  const { username, propertyId, offerId } = searchParams;
  const currUser = (await currentUser()) as User;

  if (username !== currUser.username) redirect(`/${currUser.username}/offers`);

  // check for undefined query params or invalid UUID format
  if (
    !propertyId ||
    !offerId ||
    !username ||
    !isUuid(propertyId) ||
    !isUuid(offerId)
  )
    redirect(`/${currUser.username}/offers`);

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
  if (!property || !offer) redirect(`/${currUser.username}/offers`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TypeformWidget
        propertyId={propertyId}
        offerId={offerId}
        username={username}
      />
    </main>
  );
}
