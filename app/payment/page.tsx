import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import StripeApi from '../utils/stripeApi';
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

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
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    const name = user?.fullName;
    const username = user?.username!;

    const userData = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    const priceId = "price_1PC4LDRrTWD9lwhqkYBSUPmV"; //will be received from a url param when called

    let stripeCustomerId: string | null = userData!.stripeId;

    if (stripeCustomerId === null && user) {
        stripeCustomerId = await StripeApi.createCustomer(name as string, email as string);

        const user = await prisma.user.update({
            where: { username: username },
            data: { stripeId: stripeCustomerId },
        });
    }
    console.log("customerId after customer creation:", stripeCustomerId);
    // Create Checkout Sessions from body params.
    const session = await StripeApi.createCheckoutSession(stripeCustomerId!, priceId);

    return (
        <div id="checkout">
            <PaymentForm clientSecret={session} />
        </div>
    );
}