import type { File } from "@/utils/uploadthingApi";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getDocumentUrl } from "@/app/actions";

/** Dropdown menu item component for viewing a file
 *
 * Takes in file {name, key, status, id}
 */
export default function ViewFileDropdownItem({ file }: { file: File }) {
  async function viewDocument() {
    const url = await getDocumentUrl(file);
    window.open(url as string, "_blank");
  }

  return (
    <DropdownMenuItem onClick={viewDocument}>View Document</DropdownMenuItem>
  );
}
