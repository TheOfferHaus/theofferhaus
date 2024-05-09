"use client";

import { UploadButton } from "@/components/UploadThing/UploadHelpers";

export default function UploadButtonArea(
  { updateFileState } : { updateFileState: Function}) {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
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
