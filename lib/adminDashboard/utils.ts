import type { User } from "@/lib/adminDashboard/types";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/prisma/userMethods";

async function getAdminDashBoardUsers() {
  const userData = await clerkClient.users.getUserList({
    orderBy: "-username",
  });

  const users = await Promise.all(userData.data.map(async (user) => ({
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.emailAddresses[0].emailAddress,
    lastOffer: await prisma.user.findLatestOffer(user.username!)
  })));
  return users
}

export {
  getAdminDashBoardUsers
}