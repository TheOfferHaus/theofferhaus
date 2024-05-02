import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/** Webhook route that accepts API calls from Stripe to handle events. Currently
 * console logs basic event data and does not handle any order fulfillment.
 *
 * This allows Stripe to provide information to us upon successful payment.
 *
 * Accepts: JSON stripe event data
 * Returns: JSON {received: true} or { err }
 */
export async function POST(req: NextRequest) {

  // creates a usable event from the req body
  const buf = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      webhookSecret
    );
  } catch (err) {
    // On error, log and return the error message.
    console.log(`❌ Error message: ${err}`);
    return NextResponse.json({ err }, { status: 400 });
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  // handles different event types
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent status: ${paymentIntent.status}`);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case 'charge.succeeded': {
      const charge = event.data.object;
      console.log(`Charge id:`, charge);
      break;
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`);
      break;
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ received: "true" });
};