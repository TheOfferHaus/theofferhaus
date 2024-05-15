This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For setting up database with Prisma

Developers will have to:

1. Run `npm install`
2. Create new database called "offerhaus"
3. Set up .env.local to have `DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/offerhaus"` with their relevant information passed in
4. If you are not on a Mac, password will have to be set by going into your database, running \password, and creating a new password.
5. Run `npm run migrate:init`
   Now you can use the prisma client to made database queries. For syntax questions ping the auth team
6. If you want to use prisma studio to easily see database records, run `npm run prisma:studio`
7. Everytime the schema is updated, in order to update the database accordingly run `npm run migrate:add` followed by `your-migration-name` to describe the change in that format with hyphens between each word. For example, if the schema was updated to add a column called "firstName" to the database, you would run something like `npm run migrate:add add-first-name-column-to-user`

## For setting up Stripe

Setup to make Stripe embedded payment form functional:

1. Include the following API keys in your .env.local: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=... get from David & Sam
   STRIPE_SECRET_KEY=... get from David & Sam
   OFFER_PRICE_ID=price_1PC4LDRrTWD9lwhqkYBSUPmV
   FULL_PACKAGE_PRICE_ID=price_1PDYmLRrTWD9lwhqo9kMOWBi
   PAYMENT_RETURN_URL=http://localhost:3000/paymentConfirmation?session_id={CHECKOUT_SESSION_ID}
   STRIPE_WEBHOOK_SECRET=... see below on getting the value for this key

Setting up the Stipe command line interface to listen for webhook events:

Follow these steps in your terminal

1. `brew install stripe/stripe-cli/stripe`
2. `stripe login`
3. Press <Enter> to open a stripe browser window
4. Enter Stripe credentials
5. Click “Allow Access” after checking the pairing code in the browser and terminal match.
6. `stripe` in terminal to see available commands
7. `stripe listen --forward-to localhost:3000/api/orderConfirmation` to listen for webhook events at the specified URL
8. Copy webhook signing secret from the terminal into your .env.local with the key STRIPE_WEBHOOK_SECRET
9. Run a test payment to trigger a webhook. Alternatively you can use the command `stripe trigger <event>` to trigger a specific event type.

Access the payment page with the following URLs:

Offer price: http://localhost:3000/payment?price_id=price_1PC4LDRrTWD9lwhqkYBSUPmV

Full package price: http://localhost:3000/payment?price_id=price_1PDYmLRrTWD9lwhqo9kMOWBi

To make a test payment, you can use the following credit card info:

Card number: 4242 4242 4242 4242
MM/YY: any future date
CVC: any three numbers
Name: any
Zip: any

Additional test payment methods can be found here: https://docs.stripe.com/testing.

## Setting Up Users Seed Data and Clerk

1. Run `npm install`
2. Run `npm run migrate:reset`. This drops the database, recreates it, and then runs the seed file
3. Check database to confirm that an admin user and regular user have been created
4. For Clerk, update .env.local to include the keys added to .env.example
5. Keys and signin info for both users will be provided by auth team

## Tell everyone for updated DB

1. npm run migrate:add add-clerkid-to-users
2. npm run migrate:reset
3. If you check PSQL and query for all users, you should see the clerk_id as a
   column

## Setting Up Clerk To Add User to Personal Database on Signup
1. Run `npm install`
2. Make sure you also install localtunnel globally with `npm install -g localtunnel`
3. Head to Clerk Dashboard(https://dashboard.clerk.com/), log in, and click on 'webhooks'
4. In your terminal, run `lt --port 3000` ***this should be the port your next app is running on***
5. Copy the url generated in your terminal
6. In the Clerk webhook dashboard, click 'Add Endpoint'
7. Paste the url from your terminal to the 'Endpoint Url' section
8. Add /api/users to the end of the url
9. In the description, add '{YOUR NAME}'s endpoint'
10. Scroll to the bottom of the filtering events section, under the user section, check 'user.created'
11. Click Create
12. Now when you make a new account in the app, make sure your localtunnel is running, and the user is added to your database
13. Any time you exit localtunnel in your terminal, and want to create a new user in the app, you'll need to repeat step 3 and replace your URL in the clerk webhook dashboard
14. We recommend you have a separate terminal tab running localtunnel
***NOTE: When a user is created in the app, anyone with an active webhook will see that user added to their own database***

## Adding localtunnel URL to Typeform Webhook in Order to Receive the Response Data
1. Navigate to Typeform Dashboard
2. Go to The Offer Haus Offer Quiz
3. Click on the Connect tab
4. Click on the Webhooks tab
5. Click Add a Webhook
6. Paste in your localtunnel URL and add `/api/typeform` to the end of it
7. Click 'Save Webbook' and make sure to also click the Webhook ON slider to enable it

## Setting Up Docusign
0. Run `npm install`
1. Run `npm run migrate:add add-model-for-docusign-access-tokens`
2. Run `npm run migrate:reset`
3. Navigate to http://localhost:PORT/admin/docusign
4. Click on "Get token"
5. Sign in to docusign using theofferhaus@gmail.com
6. You should be redirected to http://localhost:PORT/admin/docusign
7. Check prisma studio to see if a token was added to your DB (contact coopnissa if it wasn't)

You only have to do the above a single time, it should refresh automatically afterwards.

## THINGS TO DO EVERY TIME YOU START UP THE APP:
1. Run `lt --port 3000` to generate your new localtunnel URL for that work session
2. Navigate to Clerk webhook dashboard and update your endpoint with the new URL (if you've made one before).
   If not, follow Steps 5-14 in 'Setting Up Clerk To Add User to Personal Database on Signup'
3. Follow Steps 1-4 in 'Adding localtunnel URL to Typeform Webhook in Order to Receive the Response Data'.
   If you already have your old URL there, you can just update it, otherwise follow Steps 5-7.

## THINGS TO DO EVERY TIME YOU RUN `npm run migrate:reset`
0. Restart app with `npm run dev`
1. Steps 3-7 of Setting Up Docusign


