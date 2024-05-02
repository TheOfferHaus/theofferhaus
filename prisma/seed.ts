import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      isAdmin: true
    },
  });

  console.log(`Created new user: ${adminUser.username}`);

  const notAdminUser = await prisma.user.create({
    data: {
      username: "user",
      isAdmin: false
    },
  });

  console.log(`Created new user: ${notAdminUser.username}`);
}

main();




/**username     String      @id @unique
  isAdmin      Boolean     @default(false) @map("is_admin")
  createdAt    DateTime    @default(now()) @map("created_at")
  updatedAt    DateTime    @updatedAt      @map("updated_at")
  stripeId     String?                     @map("stripe_id")
  offers       Offer[] */