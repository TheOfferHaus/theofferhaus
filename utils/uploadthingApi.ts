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

  /** get URL for single file and open it in browser; takes in key as parameter */
  static async getUrl(
    fileKey = "d5a6d073-abf8-4962-93a2-0694ca62e063-4g1ptq.jpeg"
  ) {
    const response = await utapi.getFileUrls(fileKey);
    console.log("url", response.data[0].url);
    return response.data[0].url;
  }
}

export default UploadthingApi;
