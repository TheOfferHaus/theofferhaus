import { clerkClient } from "@clerk/nextjs/server";
// leaving for when we need to query the db
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();


export default async function AdminDashboard() {

    const users = await clerkClient.users.getUserList({
        orderBy: "-username"
    });

    return (
        <div>Admins only!</div>
    );
}