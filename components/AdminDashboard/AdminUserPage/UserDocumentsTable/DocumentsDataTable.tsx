import { Document } from "@/components/AdminDashboard/AdminUserPage/UserDocumentsTable/Document";

/** Document table component in user page for admin dashboard
 *  renders variable amount of document components  */
export function DocumentsDataTable() {
  return (
    <ul
      role="list"
      className="divide-y border border-dark-gray bg-custom-white"
    >
      {/* hardcoding documents for now - needs to be dynamically mapped from document source */}
      <Document name={"resume_back_end_developer.pdf"} link={"#"} />
      <Document name={"coverletter_back_end_developer.pdf"} link={"#"} />
    </ul>
  );
}
