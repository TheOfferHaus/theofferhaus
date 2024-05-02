This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## For setting up database with Prisma

Developers will have to:

1. Run `npm install`
2. Create new database called "offerhaus"
3. Set up .env.local to have `DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/offerhaus"` with their relevant information passed in
4. If you are not on a Mac, password will have to be set by going into your database, running \password, and creating a new password.
5. Run `npm run migrate:init`
Now you can use the prisma client to made database queries. For syntax questions ping Max or Ben
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

