"use client";

import type { File } from "@/utils/uploadthingApi";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getDocumentUrl } from "@/app/actions";

/** Dropdown menu item component for viewing a file
 *
 * State: documentUrl (" " | null)
 *
 * Props: file {name, key, status, id}
 */
export default function ViewFileDropdownItem({ file }: { file: File }) {
  async function viewDocument() {
    const url  = await getDocumentUrl(file);
    window.open(url as string, "_blank")
  }

  //const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchDocumentUrl() {
  //     const response = await fetch("/api/uploadthing/getUrl", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fileKey: file.key,
  //       }),
  //       method: "POST",
  //     });
  //     const url = await response.json();
  //     setDocumentUrl(url);
  //   }

  //   fetchDocumentUrl();
  // }, []);

  return (
    <DropdownMenuItem
      onClick={viewDocument}
    >
      View Document
    </DropdownMenuItem>
  );
}
