import FormWidget from "@/components/TypeformWidget";
import { redirect } from "next/navigation";

/** Quiz:  Component for rendering the Quiz page.
 *
 * Quiz -> FormWidget
 */

function Quiz({ searchParams }: { searchParams: { propertyId: string | null; }; }) {
  const propertyId = searchParams.propertyId;

  if (!propertyId) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormWidget propertyId={propertyId} />
    </main>
  );
}

export default Quiz;
