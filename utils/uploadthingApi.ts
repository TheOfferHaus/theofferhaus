import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

export type File = {
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
}

export default UploadthingApi;
