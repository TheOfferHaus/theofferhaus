"use client";

import type { File } from "@/utils/uploadthingApi";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

/** Dropdown menu item component for deleting a file
 *
 * State: deleteFileKey (" " | null)
 *
 * Props: file {name, key, status, id}
 */
export default function DeleteFileDropdownItem({ file }: { file: File }) {
  const [deleteFileKey, setDeleteFileKey] = useState<string | null>(null);

  useEffect(() => {
    async function deleteFile() {
      const response = await fetch("/api/uploadthing/deletefiles", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileKey: file.key,
        }),
        method: "POST",
      });
      const msg = await response.json();
      setDeleteFileKey(null);
    }

    if (deleteFileKey === file.key) {
      deleteFile();
    }
  }, [deleteFileKey]);

  return (
    <>
      <DropdownMenuItem onClick={() => setDeleteFileKey(file.key)}>
        Delete Document
      </DropdownMenuItem>
    </>
  );
}
