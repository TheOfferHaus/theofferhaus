import { clerkClient } from "@clerk/nextjs/server";
import { DataTable } from "@/components/data-table";
import { columnDef } from "@/components/columns";
// leaving for when we need to query the db
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();


export default async function AdminDashboard() {

    const userData = await clerkClient.users.getUserList({
        orderBy: "-username"
    });

    const users = userData.data;

    return (
        <>
            <DataTable columns={columnDef} data={users} />
        </>

    );
}