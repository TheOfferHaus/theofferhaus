import { NextRequest, NextResponse } from "next/server";
import { UploadthingApi } from "@/utils/uploadthingApi";

/** Gets all files saved in UploadThing
 *
 * Returns json: [{name, key, status, id}, ...]
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const files = await UploadthingApi.listFiles();
  return NextResponse.json(files);
}
