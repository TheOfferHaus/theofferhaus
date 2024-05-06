import Stripe from 'stripe';
import type { NextRequest } from 'next/server';
import type { User } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/** A class for the Stripe api */

class StripeApi {
  /** Creates a Customer object using a name and email, returns customer id */
  static async createCustomer(name: string, email: string): Promise<string> {
    const customer = await stripe.customers.create({
      name, email
    });
    return customer.id;
  }


  /** Creates a Checkout Session object using a customerId and priceId, returns
   * a client secret */
  static async createCheckoutSession(
    customerId: string, priceId: string): Promise<string> {

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      ui_mode: 'embedded',
      saved_payment_method_options: { payment_method_save: 'enabled' },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: process.env.PAYMENT_RETURN_URL
    });
    return session.client_secret as string;
  }


  /** Retrieves a Checkout Session object using a session id, returns a
   * Checkout Session object
   */
  static async retrieveCheckoutSession(
    sessionId: string): Promise<Stripe.Response<Stripe.Checkout.Session>> {

    const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
    return sessionData;
  }

  /** Given an event request body received from Stipe, returns an event object
   * containing relevant event details.
   */
  static async constructStripeEvent(request: NextRequest): Promise<Stripe.Event> {
    const buffer = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    const event = stripe.webhooks.constructEvent(
      buffer,
      signature,
      webhookSecret
    );

    return event;
  }

  /** Accepts a user object and returns a stripe Id. If the user already has an
   * id in the database, that id is returned. If not, a new stripe customer is
   * created and the new id is returned.
   *
   * If userData doesn't exist, an error is thrown.
   */
  static async getStripeCustomerId(user: User): Promise<string> {
    // query the database for user's stripe id
    const username = user.username as string;
    const userData = await prisma.user.findUnique({
      where: {
        username: username
      },
      select: {
        stripeId: true
      }
    });

    // throw error if no user found
    if (!userData) throw new Error("User does not exist.");

    const email = user.emailAddresses[0].emailAddress as string;
    const name = user.fullName as string;

    let stripeCustomerId: string;

    if (userData.stripeId) {
      stripeCustomerId = userData.stripeId;
    } else {
      stripeCustomerId = await StripeApi.createCustomer(name, email);

      const user = await prisma.user.update({
        where: { username: username },
        data: { stripeId: stripeCustomerId },
      });
    }

    return stripeCustomerId;
  }
}

export default StripeApi;