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


## Setting Up Users Seed Data and Clerk

1. Run `npm install`
2. Run `npm run migrate:reset`. This drops the database, recreates it, and then runs the seed file
3. Check database to confirm that an admin user and regular user have been created
4. For Clerk, update .env.local to include the keys added to .env.example
5. Keys and signin info for both users will be provided by auth team

## Setting up Shadcn command line interface

1. In your terminal: `npx shadcn-ui@latest init`
2. In your terminal: `npx shadcn-ui@latest add table`


## Tell everyone for updated DB
1. npm run migrate:add add-clerkid-to-users
2. npm run migrate:reset
3. If you check PSQL and query for all users, you should see the clerk_id as a
column
