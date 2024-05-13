import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      isAdmin: true,
    },
  });

  await prisma.user.create({
    data: {
      username: "user",
      isAdmin: false,
    },
  });

  await prisma.property.createMany({
    data: [
      { address: "1234 Rithm Street, San Francisco, CA 92341" },
      { address: "5463 Ben Street, Los Angeles, CA 92312" },
      { address: "2312 Max Street, Chino, CA 92341" },
      { address: "7364 Elie Street, Utah, CA 32134" },
      { address: "1234 Kate Street, Los Angeles, CA 12349" },
    ],
  });

  const properties = await prisma.property.findMany();

  properties.forEach(async (p) => {
    await prisma.offer.create({
      data: { buyerId: "admin", propertyId: p.id },
    });
  });
}

main();
