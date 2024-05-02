import React from 'react';
import PaymentForm from './PaymentForm';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/** Creates a Customer object and Checkout Session object for the user, providing
 * a client secret to the PaymentForm component
 *
 * State: None
 *
 * Props: None
 *
 * Payments -> PaymentForm
*/
export default async function Payments() {
    // const customer = await stripe.customers.create({
    //   email: 'dav@id.com'
    // })

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer: "cus_Q1qfFUP3tx0BVj",
        ui_mode: 'embedded',
        payment_intent_data: { setup_future_usage: 'off_session' },
        saved_payment_method_options: { payment_method_save: 'enabled' },
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of
                // the product you want to sell
                price: "price ID placeholder",
                quantity: 1,
            },
        ],
        mode: 'payment',
        return_url:
            `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    const clientSecret: string = session.client_secret!;

    return (
        <div id="checkout">
            <PaymentForm clientSecret={clientSecret} />
        </div>
    );
}