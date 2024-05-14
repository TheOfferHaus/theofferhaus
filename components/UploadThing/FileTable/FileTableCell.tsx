import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { File } from "@/utils/uploadthingApi";
import DeleteFileDropdownItem from "./DeleteFileDropdownItem";
import ViewFileDropdownItem from "./ViewFileDropdownItem";

/** Cell in the UploadThing file table
 *
 * Takes file as parameter: {name, key, status, id}
 */
export default function FileTableCell({ file }: { file: File }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-off-white" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ViewFileDropdownItem file={file} />
        <DeleteFileDropdownItem file={file} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
