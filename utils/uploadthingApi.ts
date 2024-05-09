import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

type Files = readonly {
  name: string;
  key: string;
  status: "Deletion Pending" | "Failed" | "Uploaded" | "Uploading";
  id: string;
}[];

class UploadthingApi {
  /** List all files hosted in uploadThing */
  static async listFiles(): Promise<Files> {
    const response = await utapi.listFiles();
    return response.files;
  }
}

export default UploadthingApi;
