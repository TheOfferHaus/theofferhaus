"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { File } from "@/utils/uploadthingApi";

export const FileTableColumns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "File Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [documentUrl, setDocumentUrl] = useState<string | null>(null);

      const file = row.original;

      useEffect(() => {
        async function fetchDocumentUrl() {
          const response = await fetch("/api/uploadthing/geturl", {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fileKey: file.key,
            }),
            method: "POST",
          });
          const data = await response.json();
          setDocumentUrl(data);
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
    },
  },
];
