"use client";

import { useEffect, useState } from "react";
import UploadthingApi from "@/utils/uploadthingApi";
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
import type File from "@/utils/uploadthingApi";

export const FileTableColumns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "File Name",
  },
  {
    id: "actions",
    cell: () => {
      // const file = row.original;

      const [documentUrl, setDocumentUrl] = useState<string | null>(null);

      useEffect(() => {
        const fetchDocumentUrl = async () => {
          console.log("inside of fetchDocumentUrl");
          const response = await fetch(
            "http://localhost:3000/api/uploadthing/geturl"
          );
          console.log("**response", response);
          const data = await response.json();
          console.log("**data", data);
          setDocumentUrl(data.url);
        };

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
              onClick={() => window.open(documentUrl, "_blank")}
            >
              View Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
