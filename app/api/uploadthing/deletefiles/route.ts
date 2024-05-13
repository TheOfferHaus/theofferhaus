import { UploadthingApi } from "@/utils/uploadthingApi";
import { NextRequest, NextResponse } from "next/server";

/** Delete file from uploadThing server
 *
 * returns message "File Deleted"
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body: { fileKey: string } = await req.json();
  const response = await UploadthingApi.deleteFile(body.fileKey);
  return NextResponse.json({ message: "File Deleted" });
}
