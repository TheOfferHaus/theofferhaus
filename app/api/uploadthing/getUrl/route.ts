import {UploadthingApi} from "@/utils/uploadthingApi";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: {fileKey: string} = await req.json();
  console.log("******body in API", body);
  const url = await UploadthingApi.getUrl(body.fileKey);

  return NextResponse.json(url);
}
