import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**POST request to api/users
 *
 * Adds user to the database using the Prisma Client
 */

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("In POST request");
  await prisma.user.create({
    data: {
      username: body.data.username,
    }
  });

  return NextResponse.json({ created: true }, { status: 201 });
}