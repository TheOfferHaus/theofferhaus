import { ColumnDef } from "@tanstack/react-table";

import type { File } from "@/utils/uploadthingApi";
import FileTableCell from "@/components/UploadThing/FileTable/FileTableCell";

/** Column definitions for the UploadThing file table */
export const FileTableColumns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "File Name",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return (
        <FileTableCell file={row.original} deleteFile={table.options.meta!.deleteFile!} />
      );
    }
  },
];
