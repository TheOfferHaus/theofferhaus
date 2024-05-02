import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      isAdmin: true
    },
  });

  await prisma.user.create({
    data: {
      username: "user",
      isAdmin: false
    },
  });
}

main();