"use client";

import type { File } from "@/utils/uploadthingApi";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

/** Dropdown menu item component for viewing a file
 *
 * State: documentUrl (" " | null)
 *
 * Props: file {name, key, status, id}
 */
export default function ViewFileDropdownItem({ file }: { file: File }) {
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocumentUrl() {
      const response = await fetch("/api/uploadthing/getUrl", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileKey: file.key,
        }),
        method: "POST",
      });
      const url = await response.json();
      setDocumentUrl(url);
    }

    fetchDocumentUrl();
  }, []);

  return (
    <DropdownMenuItem
      onClick={() => window.open(documentUrl as string, "_blank")}
    >
      View Document
    </DropdownMenuItem>
  );
}
