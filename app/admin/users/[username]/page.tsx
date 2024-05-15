import { DocumentsDataTable } from "@/components/AdminDashboard/AdminUserPage/UserDocumentsTable/DocumentsDataTable";
import { columns } from "@/components/AdminDashboard/AdminUserPage/UserOffersTable/columns";
import { OffersDataTable } from "@/components/AdminDashboard/AdminUserPage/UserOffersTable/OffersDataTable";
import { getClerkUserAndOffers } from "@/lib/adminDashboard/utils";
import Section from "@/components/AdminDashboard/AdminUserPage/Section";

/** Gets user data and displays the user profile page
 *
 * Parameters: url params with username
 */
export default async function UserProfile(data: {
  params: { username: string };
}) {
  const username = data.params.username;
  const { clerkUser, offers } = await getClerkUserAndOffers(username);

  return (
    <div className="m-12">
      <div className="px-4">
        <h3 className="text-4xl">{username}</h3>
        <p className="mt-4 text-xl">Personal details and documents.</p>
      </div>

      <div className="mt-6 border-t-2 border-dark-gray">
        <dl className="divide-y">
          <Section title={"Full name"} description={clerkUser.fullName} />
          <Section
            title={"Email address"}
            description={clerkUser.emailAddresses[0].emailAddress}
          />
          <Section
            title={"Phone number"}
            description={clerkUser.phoneNumbers[0]?.phoneNumber || "None"}
          />
          <Section
            title={"Offers"}
            description={<OffersDataTable columns={columns} data={offers} />}
          />
          <Section title={"Documents"} description={<DocumentsDataTable />} />
        </dl>
      </div>
    </div>
  );
}
