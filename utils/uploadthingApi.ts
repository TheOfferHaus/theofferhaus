import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

type File = {
  name: string;
  key: string;
  status: "Deletion Pending" | "Failed" | "Uploaded" | "Uploading";
  id: string;
};

class UploadthingApi {
  /** List all files hosted in uploadThing */
  static async listFiles(): Promise<File[]> {
    const response = await utapi.listFiles();
    return response.files as File[];
  }

  /** get URL for single file and open it in browser; takes in key as parameter */
  static async getUrl(fileKey: string) {
    const response = await utapi.getSignedURL(fileKey);
    console.log("url", response.url);
    return response.url;
  }
}

export {UploadthingApi};
export type {File};
