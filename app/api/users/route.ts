import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**POST request to api/users
 *
 * When a user is created, Clerk sends a POST request via webhook to this API
 * endpoint to insert the new user into the database
 */

export async function POST(req: NextRequest) {
  const body = await req.json();

  await prisma.user.create({
    data: {
      username: body.data.username,
    }
  });

  return NextResponse.json({ created: true }, { status: 201 });
}