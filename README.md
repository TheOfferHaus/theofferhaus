This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## FIRST TIME SETUP

### Before anything
1. Run `npm install`
2. Set up your .env.local (see .env.example)

### Set up a tunnel
1. Install localtunnel globally with `npm install -g localtunnel`
2. In your terminal, run `lt --port 3000`. ***This should be the port your next app is running on***
3. The url generated in your terminal will be what you want to use when adding a webhook to Clerk and Typeform
4. Any time you exit localtunnel in your terminal or restart your local tunnel, update your Clerk and Typeform webhooks with the newly generated URL

***If you have ngrok installed, feel free to use it instead of local tunnel.***

### Set up database
#### Set up database with Prisma
1. Create new database called "offerhaus"
2. Set up .env.local to have `DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/offerhaus"` with their relevant information passed in
3. If you are not on a Mac, password will have to be set by going into your database, running \password, and creating a new password
4. Run `npm run migrate:init`
5. Now you can use the prisma client to made database queries. For syntax questions ping the auth team

#### Set Up Users Seed Data and Clerk
1. Run `npm run migrate:reset`. This drops the database, recreates it, and then runs the seed file
2. Check database to confirm that an admin user and regular user have been created
3. For Clerk, update .env.local to include the keys added to .env.example
4. Keys and signin info for both users will be provided by auth team
5. If you want to use prisma studio to easily see database records, run `npm run prisma:studio`

#### Set Up Clerk To Add User to Personal Database on Signup
1. Head to Clerk Dashboard(https://dashboard.clerk.com/), log in, and click on 'webhooks'
2. In the Clerk webhook dashboard, click 'Add Endpoint'
3. Paste your tunnel URL to the 'Endpoint Url' section
4. Add /api/users to the end of the url
5. In the description, add '{YOUR NAME}'s endpoint'
6. Scroll to the bottom of the filtering events section, under the user section, check 'user.created'
7. Click Create
8. Now when you make a new account in the app, make sure your localtunnel is running, and the user is added to your database
***NOTE: When a user is created in the app, anyone with an active webhook will see that user added to their own database***

### Add Webhook to Typeform in Order to Receive the Response Data
1. Navigate to Typeform Dashboard
2. Go to The Offer Haus Offer Quiz Dev
3. Click on the Connect tab
4. Click on the Webhooks tab
5. Click Add a Webhook
6. Paste in your tunnel URL
7. Add `/api/typeform` to the end of the url
8. Click 'Save Webhook' and make sure to also click the Webhook ON slider to enable it. ***NOTE: When a typeform submission is made, all active webhooks will receive the resulting request.***

### Set up Stripe
#### Set up the Stripe command line interface to listen for webhook events
1. `brew install stripe/stripe-cli/stripe`
2. `stripe login`
3. Press <Enter> to open a stripe browser window
4. Enter Stripe credentials
5. Click “Allow Access” after checking the pairing code in the browser and terminal match.
6. `stripe` in terminal to see available commands
7. `stripe listen --forward-to localhost:3000/api/orderConfirmation` to listen for webhook events at the specified URL
8. Copy webhook signing secret from the terminal into your .env.local with the key STRIPE_WEBHOOK_SECRET
9. Run a test payment to trigger a webhook. Alternatively you can use the command `stripe trigger <event>` to trigger a specific event type.

#### Additional info:
- Access the payment page with the following URLs:
   - Offer price: http://localhost:3000/payment?price_id=price_1PC4LDRrTWD9lwhqkYBSUPmV
   - Full package price: http://localhost:3000/payment?price_id=price_1PDYmLRrTWD9lwhqo9kMOWBi
- To make a test payment, you can use the following credit card info:
   Card number: 4242 4242 4242 4242
   MM/YY: any future date
   CVC: any three numbers
   Name: any
   Zip: any
- Additional test payment methods can be found here: https://docs.stripe.com/testing

### Set up Docusign
1. Navigate to http://localhost:PORT/admin/docusign
2. Click on "Get token"
3. Sign in to docusign using theofferhaus@gmail.com
4. You should be redirected to http://localhost:PORT/admin/docusign
5. Check prisma studio to see if a token was added to your DB (contact coopnissa if it wasn't)

## GETTING STARTED

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## EVERY TIME START UP APP (AFTER FIRST TIME SETUP)
1. Run `lt --port 3000` or `ngrok http http://localhost:3000` to generate your new tunnel URL for that work session
2. Navigate to Clerk webhook dashboard and update your endpoint with the new URL
3. Navigate to Typeform webhook dashboard and update your endpoint with the new URL
4. Follow steps 7-9 of 'Set up the Stripe command line interface to listen for webhook events'

## EVERY TIME A NEW BRANCH IS MERGED
1. Run `npm install`
2. Run `npm run migrate:dev`
3. If you want to re-seed your database, run `npm run migrate:reset`
4. Restart app with `npm run dev`
6. Follow steps 3-7 of 'Set Up Docusign'
5. Follow 'EVERY TIME START UP APP'

## EVERY TIME SCHEMA IS UPDATED
1. Run `npm run migrate:dev` and follow terminal prompts
2. Run `npm run migrate:reset` to reseed database
3. Steps '3-7 of Set Up Docusign'
4. Follow 'EVERY TIME START UP APP'

## RESEEDING THE DATABASE
1. Run `npm run migrate:reset` to reseed database
2. Steps 3-7 of 'Set Up Docusign'
3. Follow 'EVERY TIME START UP APP'


