import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import Stripe from 'stripe';
import StripeApi from '../utils/stripeApi';
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
    let priceId = "pr_1234";

    if (customerId === null) {
        const customerId= await StripeApi.createCustomer()

        //update database with customer.id
    }

    // Create Checkout Sessions from body params.
    const session = await StripeApi.createCheckoutSession(customerId, priceId);

    return (
        <div id="checkout">
            <PaymentForm clientSecret={session} />
        </div>
    );
}