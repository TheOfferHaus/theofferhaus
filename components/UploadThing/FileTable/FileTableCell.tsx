"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { File } from "@/utils/uploadthingApi";

/** Cell in the UploadThin file table */
export default function FileTableCell ({ file }: {file: File}) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => window.open(documentUrl as string, "_blank")}
        >
          View Document
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}