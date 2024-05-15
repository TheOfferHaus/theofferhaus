import React from "react";
import PaymentForm from "@/components/PaymentForm";
import StripeApi from "@/utils/stripeApi";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/** Creates a Customer object and Checkout Session object for the user, providing
 * a client secret to the PaymentForm component
 *
 *
 * Payment -> PaymentForm
 */
export default async function Payment(data: {
  searchParams: { price_id: string };
}) {
  const user = await currentUser();

  if (!user) return redirect("/");

  let stripeCustomerId: string;
  try {
    stripeCustomerId = await StripeApi.getStripeCustomerId(user);
  } catch (err) {
    return redirect("/"); // Database error -> will redirect to generic error page once built
  }

  const priceId = data.searchParams.price_id; //will be received from a url param when called

  // Create Checkout Sessions from body params.
  const session = await StripeApi.createCheckoutSession(
    stripeCustomerId,
    priceId,
  );

  return (
    <>
      <PaymentForm clientSecret={session} />
    </>
  );
}
