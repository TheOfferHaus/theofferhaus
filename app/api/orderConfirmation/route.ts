import { NextRequest, NextResponse } from "next/server";
import StripeApi from "@/utils/stripeApi";

/** Webhook route that accepts API calls from Stripe to handle events. Currently
 * console logs basic event data and does not handle any order fulfillment.
 *
 * This allows Stripe to provide information to us upon successful payment.
 *
 * Accepts: JSON stripe event data
 * Returns: JSON {received: true} or { err }
 *
 * Successful payment receives the following event types:
 *  payment_intent.created
 *  charge.succeeded
 *  checkout.session.completed
 *  payment_intent.succeeded
 *  charge.updated
 *
 * Failed payment receives the following event types:
 *  charge.failed
 *  payment_intent.created
 *  payment_intent.payment_failed
 */
export async function POST(req: NextRequest) {
  const buffer = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  const event = await StripeApi.constructStripeEvent(buffer, signature);

  // handles different event types
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent status: ${paymentIntent.status}`);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`,
      );
      break;
    }
    case "charge.succeeded": {
      const charge = event.data.object;
      console.log(`Charge id:`, charge.id);
      break;
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`);
      break;
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ received: "true" });
}
