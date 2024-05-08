import TypeformWidget from "@/components/TypeformWidget";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Quiz:  Component for rendering the Quiz page.
 *
 * Quiz -> FormWidget
 */

export default async function Quiz({
  searchParams,
}: {
  searchParams: { propertyId: string | null; offerId: string | null };
}) {
  const { propertyId, offerId } = searchParams;

  if (!propertyId || !offerId) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TypeformWidget propertyId={propertyId} offerId={offerId} />
    </main>
  );
}
