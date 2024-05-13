import { UploadthingApi } from "@/utils/uploadthingApi";
import { NextResponse, NextRequest } from "next/server";

/** Get URL of file from UploadThing
 *
 * returns url as string
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body: { fileKey: string } = await req.json();
  const url = await UploadthingApi.getUrl(body.fileKey);
  return NextResponse.json(url);
}
