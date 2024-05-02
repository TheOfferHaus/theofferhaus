import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/** A class for the Stripe api */

class StripeApi {
  /** Creates a Customer object using a name and email, returns customer id */
  static async createCustomer(name: string, email: string) {
    const customer = await stripe.customers.create({
      name, email
    })
    return customer.id;
  }


  /** Creates a Checkout Session object using a customerId and priceId, returns
   * a client secret */
  static async createCheckoutSession(customerId: string, priceId: string){
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
      return_url:
          `http://localhost:3000/paymentConfirmation?session_id={CHECKOUT_SESSION_ID}`,
  });
    return session.client_secret!;
  }


  /** Retrieves a Checkout Session object using a session id, returns a
   * Checkout Session object
   */
  static async retrieveCheckoutSession(sessionId: string){
    const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
    return sessionData;
  }
}

export default StripeApi;