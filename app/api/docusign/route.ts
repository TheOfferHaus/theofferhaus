import ApiTokenManager from "@/lib/docusign/ApiTokenManager";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECS_PER_HOUR = 3600;

/**
 * API endpoint for generating token.
 */

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    const accessData = await ApiTokenManager.getAccessKeyAndBaseUri(code);

    console.log(accessData);

    await prisma.accessData.update({
      where: {
        id: 0
      },
      data: {
        baseUri: accessData.baseUri,
        token: accessData.accessToken,
        refreshToken: accessData.refreshToken,
        expirationTime: new Date(new Date().getTime() + accessData.expiresIn - SECS_PER_HOUR)
      }
    });

    return NextResponse.json(await prisma.accessData.findFirst({
      where: {
        id: 0
      }
    }));
  } catch (error: any) {
    console.log("Error creating token:", error.message);

    return new Response(`Error creating token: ${error.message}`, {
      status: 400,
    });
  }
}