import { redirect } from "next/navigation";
import Stripe from "stripe";
import StripeApi from "@/utils/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/** Retrieves Checkout Session data through a session id and, based on the status property,
 * either returns a redirect or displays a payment success page
 *
 * Parameters: Query string with a session ID
 */
export default async function Return(data: {
  searchParams: { session_id: string };
}) {
  const sessionId = data.searchParams.session_id;
  const sessionData = await StripeApi.retrieveCheckoutSession(sessionId);

  if (sessionData!.status !== "complete") {
    return redirect("/");
  }

  // returns generic success message. Need to update.
  return (
    <section id="success">
      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {sessionData!.customer_details!.email}. If you have any questions,
        please email <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
    </section>
  );
}
