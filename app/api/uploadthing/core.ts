import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

/** UploadThing FileRouter **/
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // This code RUNS ON YOUR SERVER after upload
    .onUploadComplete(async ({ file }) => {
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedFile: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
