"use client";

import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
const UploadDropzone = generateUploadDropzone<OurFileRouter>();

/** File add dropzone area
 *
 * State: none
 * Props: updateFileState: f()
*
*/
export default function UploadDropzoneArea(
  { updateFileState }: { updateFileState: Function; }) {

  return (
    <div className="flex flex-col items-center justify-between p-8">
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          updateFileState(res[0]);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}