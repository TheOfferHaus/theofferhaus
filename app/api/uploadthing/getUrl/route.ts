import UploadthingApi from "@/utils/uploadthingApi";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("inside of API rpute");
  const url = await UploadthingApi.getUrl();
  console.log("url from APi route", url);
  return NextResponse.json(url);
}
