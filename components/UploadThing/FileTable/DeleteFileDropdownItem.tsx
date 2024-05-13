"use client";

import type { File } from "@/utils/uploadthingApi";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeleteFileDropdownItem({ file }: { file: File; }) {
  const [deleteFileKey, setDeleteFileKey] = useState(false);

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
      setDeleteFileKey(false);
    }

    if (deleteFileKey === true) {
      deleteFile();
    }
  }, [deleteFileKey]);

  return (
    <>
      <DropdownMenuItem
        onClick={() => setDeleteFileKey(true)}
      >
        Delete Document
      </DropdownMenuItem>
    </>
  );
}