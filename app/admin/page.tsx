import { clerkClient } from "@clerk/nextjs/server";
import { DataTable } from "@/components/AdminDashboard/AdminUsersTable/data-table";
import {
  columns,
  User,
} from "@/components/AdminDashboard/AdminUsersTable/columns";
import prisma from "@/prisma/userMethods";

/** Gets user data and creates the admin dashboard
 * Parameters: none
 */
export default async function AdminDashboard() {
  const userData = await clerkClient.users.getUserList({
    orderBy: "-username",
  });

  // Could move to a utils folder, but couldn't work through typescript errors, can move later
  let users: User[];
  const mapUserData = async () => {
  users = await Promise.all(userData.data.map(async (user) => ({
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.emailAddresses[0].emailAddress,
    lastOffer: await prisma.user.findLatestOffer(user.username!)
  })));
  return users
}
  users = await mapUserData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
