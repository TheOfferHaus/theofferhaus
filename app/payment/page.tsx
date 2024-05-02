import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import Stripe from 'stripe';
import Footer from '@/components/Footer';
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
export default async function Payment() {
    let customerId = "cus_Q28jd2XLv2Sfwy"; //will query from db once available

    if (customerId === null) {
        const customer = await stripe.customers.create({
          email: 'test@email.com' // will use queried user data
        })

        customerId = customer.id; // set customer ID to created customer ID

        //update database with customer.id
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        ui_mode: 'embedded',
        saved_payment_method_options: { payment_method_save: 'enabled' },
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of
                // the product you want to sell
                price: "price_1PC4LDRrTWD9lwhqkYBSUPmV",
                quantity: 1,
            },
        ],
        mode: 'payment',
        return_url:
            `http://localhost:3000/paymentConfirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    const clientSecret: string = session.client_secret!;

    return (
        <div id="checkout">
            <PaymentForm clientSecret={clientSecret} />
        </div>
    );
}