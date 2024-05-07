import { clerkClient } from "@clerk/nextjs/server";
import { DataTable } from "@/components/data-table";
import { columns, User } from "@/components/columns";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function AdminDashboard() {

    const userData = await clerkClient.users.getUserList({
        orderBy: "-username"
    });

    const databaseUsers = await prisma.user.findMany({include: {offers: true}})

    let users: User[];
    users = userData.data.map(user => ({
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.emailAddresses[0].emailAddress,
        lastOffer: databaseUsers.find( u => u.username === user.username)?.offers[0]?.updatedAt || null
    }))

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} />
        </div>

    );
}