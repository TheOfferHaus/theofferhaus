"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Configure the Stripe library
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/** Rendering the pre-built Stripe checkout/payment form
 *
 * Props: clientSecret, a string that works as a key to a unique Checkout Session
 *
 * Payment -> PaymentForm
 */
export default function PaymentForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const options = { clientSecret };
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
