import { DataTable } from "@/components/AdminDashboard/AdminUsersTable/data-table";
import { columns } from "@/components/AdminDashboard/AdminUsersTable/columns";
import type { User } from "@/lib/adminDashboard/types";
import { getAdminDashBoardUsers } from "@/lib/adminDashboard/utils";

/** Gets user data and displays the users table */
export default async function AdminDashboard() {
  const users: User[] = await getAdminDashBoardUsers();

  return (
    <div className="mx-12 my-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
