import { NextRequest, NextResponse } from "next/server";
import { UploadthingApi } from "@/utils/uploadthingApi";

export async function GET(req: NextRequest, res: NextResponse) {
  const files = await UploadthingApi.listFiles();
  return NextResponse.json(files);
}
