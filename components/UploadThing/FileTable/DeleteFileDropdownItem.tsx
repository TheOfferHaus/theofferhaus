import type { File } from "@/utils/uploadthingApi";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  deleteDocument,
  revalidateDocuments,
} from "@/app/admin/documents/actions";

/** Dropdown menu item component for deleting a file
 *
 * Takes in file {name, key, status, id}
 */
export default function DeleteFileDropdownItem({ file }: { file: File }) {
  function deleteAndRevalidate() {
    deleteDocument(file);
    revalidateDocuments();
  }

  return (
    <DropdownMenuItem onClick={deleteAndRevalidate}>
      Delete Document
    </DropdownMenuItem>
  );
}
