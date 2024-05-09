"use client";

import UploadButtonArea from "@/components/UploadThing/UploadButtonArea";
import { UploadthingApi } from "@/utils/uploadthingApi";
import { FileTableColumns } from "@/components/UploadThing/FileTable/FileTableColumns";
import { FileTable } from "@/components/UploadThing/FileTable/FileTable";
import { File } from "@/utils/uploadthingApi";
import { useState, useEffect } from "react";

export default function Documents() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchAllFiles() {
      const response = await fetch("/api/uploadthing/getfiles");
      const allFiles = await response.json();
      setFiles(allFiles);
      setIsLoading(false);
    }

    fetchAllFiles();
  }, []);

  function updateFiles(file: File): void {
    setFiles((curr) => [...curr, file]);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen mx-32">
      <UploadButtonArea updateFileState={updateFiles} />
      <FileTable columns={FileTableColumns} data={files} />
    </div>
  );
}
