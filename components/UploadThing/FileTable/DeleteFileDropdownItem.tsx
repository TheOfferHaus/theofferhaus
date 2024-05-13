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
export default function DeleteFileDropdownItem({ file, deleteFile }: { file: File, deleteFile: (file: File) => void}) {
  const [isDeleteFile, setIsDeleteFile] = useState<boolean>(false);

  useEffect(() => {
    async function deleteUploadThingFile() {
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
      deleteFile(file);
      setIsDeleteFile(false);
    }

    if (isDeleteFile === true) {
      deleteUploadThingFile();
    }
  }, [isDeleteFile]);

  return (
    <>
      <DropdownMenuItem onClick={() => setIsDeleteFile(true)}>
        Delete Document
      </DropdownMenuItem>
    </>
  );
}
