import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      clerkId: "user_2fvNBFD2qaonTD0iSgP6AKcUOwL",
      isAdmin: true
    },
  });

  await prisma.user.create({
    data: {
      username: "user",
      clerkId: "user_2fvNHfnwTnyKWjiT5AivVg9AeIn",
      isAdmin: false
    },
  });

  await prisma.property.create({
    data: {
      id: 1
    }
  })

  await prisma.offer.create({
    data: {
      price: 100,
      buyerId: "user",
      propertyId: 1
    }
  })
}

main();
