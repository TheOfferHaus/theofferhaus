"use client";

import type { File } from "@/utils/uploadthingApi";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteDocument, revalidateDocuments } from "@/app/actions";

/** Dropdown menu item component for deleting a file
 *
 * State: deleteFileKey (" " | null)
 *
 * Props: file {name, key, status, id}
 */
export default function DeleteFileDropdownItem({ file }: { file: File }) {

  function deleteAndRevalidate() {
    deleteDocument(file);
    revalidateDocuments();
  }

  // const [isDeleteFile, setIsDeleteFile] = useState<boolean>(false);

  // useEffect(() => {
  //   async function deleteUploadThingFile() {
  //     const response = await fetch("/api/uploadthing/deletefiles", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fileKey: file.key,
  //       }),
  //       method: "POST",
  //     });
  //     const msg = await response.json();
  //     setIsDeleteFile(false);
  //   }

  //   if (isDeleteFile === true) {
  //     deleteUploadThingFile();
  //   }
  // }, [isDeleteFile]);

  return (
    <>
      <DropdownMenuItem onClick={deleteAndRevalidate}>
        Delete Document
      </DropdownMenuItem>
    </>
  );
}
