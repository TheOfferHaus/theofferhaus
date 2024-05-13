import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

type File = {
  name: string;
  key: string;
  status: "Deletion Pending" | "Failed" | "Uploaded" | "Uploading";
  id: string;
};

/** Uploadthing Api calls */
class UploadthingApi {
  /** Get all files hosted in uploadThing */
  static async listFiles(): Promise<File[]> {
    const response = await utapi.listFiles();
    return response.files as File[];
  }

  /** Get URL for single file and open it in browser; takes in key as parameter */
  static async getUrl(fileKey: string) {
    const response = await utapi.getSignedURL(fileKey);
    return response.url;
  }


  /** Delete file from UploadThing server; takes in key as parameter */
  static async deleteFile(fileKey: string) {
    const response = await utapi.deleteFiles(fileKey);
    return NextResponse.json(response);
  }
}

export { UploadthingApi };
export type { File };
