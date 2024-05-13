"use client";

import UploadDropzoneArea from "@/components/UploadThing/UploadDropArea";
import { FileTableColumns } from "@/components/UploadThing/FileTable/FileTableColumns";
import { FileTable } from "@/components/UploadThing/FileTable/FileTable";
import { File } from "@/utils/uploadthingApi";
import { useState, useEffect } from "react";

/** Displays file upload dropzone and documents table
 *
 * State: files: [{name, key, status, id}, ...]
 *        isLoading: boolean
 *
 * Props: none
 *
 */
export default function Documents() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    /** Fetches all files saved in UploadThing */
    async function fetchAllFiles() {
      const response = await fetch("/api/uploadthing/getfiles");
      const allFiles = await response.json();
      setFiles(allFiles);
      setIsLoading(false);
    }

    fetchAllFiles();
  }, []);

  /** Updates state with newly uploaded file. */
  function updateFiles(file: File): void {
    setFiles((curr) => [file, ...curr]);
  }

  function deleteFile(file: File): void {
    setFiles(curr => curr.filter((f => f.key !== file.key)))
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen mx-32">
      <UploadDropzoneArea updateFileState={updateFiles} />
      <FileTable columns={FileTableColumns} data={files} deleteFile={deleteFile} />
    </div>
  );
}
