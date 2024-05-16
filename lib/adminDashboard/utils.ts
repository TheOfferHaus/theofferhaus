import type { User as DashUser, Offer } from "@/lib/adminDashboard/types";
import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import prisma from "@/prisma/userMethods";


async function getAdminDashBoardUsers(): Promise<DashUser[]> {

  const userCount = await clerkClient.users.getCount();
  const numQueries = Math.ceil(userCount / 500);

  const userData: User[] = [];

  for (let i = 0; i < numQueries; i++) {
    const usersResponse = await clerkClient.users.getUserList({
      orderBy: "username",
      offset: i * 500,
      limit: 500 //max allowed by Clerk
    });

    userData.push(...usersResponse.data);
  }

  const users = await Promise.all(
    userData.map(async (user) => ({
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.emailAddresses[0].emailAddress,
      lastOffer: await prisma.user.findLatestOffer(user.username!),
    }))
  );

  return users;
}

async function getClerkUserAndOffers(username: string) {
  const databaseUser = await prisma.user.findUnique({
    where: { username: username },
    include: { offers: true },
  });

  const clerkUser = await clerkClient.users.getUser(databaseUser!.clerkId);

  const offers = databaseUser!.offers.map((offer) => ({
    propertyId: offer.propertyId,
    buyerId: offer.buyerId,
    updatedAt: offer.updatedAt,
    status: offer.status as string,
    price: offer.price,
  }));

  return { clerkUser, offers };
}

export { getAdminDashBoardUsers, getClerkUserAndOffers };
