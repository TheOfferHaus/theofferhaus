"use client";

import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
const UploadDropzone = generateUploadDropzone<OurFileRouter>();
import { revalidateDocuments } from "@/app/admin/documents/actions";

/** File add dropzone area
 *
 * State: none
 * Props: updateFileState: f()
 *
 */
export default function UploadDropzoneArea() {
  return (
    <div className="flex flex-col items-center justify-between p-8">
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={revalidateDocuments}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="bg-custom-white ut-button:bg-dark-gray ut-button:hover:scale-105"
      />
    </div>
  );
}
