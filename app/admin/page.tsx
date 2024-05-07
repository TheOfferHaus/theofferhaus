import { clerkClient } from "@clerk/nextjs/server";
import { DataTable } from "@/components/data-table";
import { columns, User } from "@/components/columns";
// leaving for when we need to query the db
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();


export default async function AdminDashboard() {

    const userData = await clerkClient.users.getUserList({
        orderBy: "-username"
    });

    let users: User[];
    users = userData.data.map(user => ({
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.emailAddresses[0].emailAddress
    }))

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} />
        </div>

    );
}