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

1. Include the following API keys in your .env.local: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY

Setting up the Stipe command line interface to listen for webhook events:

Follow these steps in your terminal
1. `brew install stripe/stripe-cli/stripe`
2. `stripe login`
3. Press <Enter> to open a stripe browser window
4. Enter Stripe credentials
5. Click “Allow Access” after checking the pairing code in the browser and terminal match.
6. `stripe` in terminal to see available commands
7. `stripe listen –forward-to localhost:3000/api/paymentConfirmation` to listen for webhook events at the specified URL
8. Copy webhook signing secret from the terminal into your .env.local with the key STRIPE_WEBHOOK_SECRET

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
