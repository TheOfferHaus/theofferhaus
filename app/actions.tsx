"use server";

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { User, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

/** redirects to offer form specific to inputted property */
async function navigateToQuiz(propertyId: string, offerId: string) {
  const { username } = (await currentUser()) as User;

  redirect(
    `/quiz?username=${username}&propertyId=${propertyId}&offerId=${offerId}`
  );
}

/** adds property to the database */
async function createProperty(address: string) {
  const property = await prisma.property.upsert({
    where: {
      address: address,
    },
    update: {},
    create: {
      address: address,
    },
  });

  return property.id;
}

/** adds offer to the database */
async function createOffer(propertyId: string) {
  const currUser = (await currentUser()) as User;

  const offer = await prisma.offer.create({
    data: {
      buyerId: currUser.username as string,
      propertyId: propertyId,
    },
  });

  return offer.id;
}

/** updates user's offerFormInProgress to true */
async function setFormInProgressTrue() {
  const currUser = (await currentUser()) as User;
  const username = currUser.username as string;

  await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      offerFormInProgress: true,
    },
  });
}

/** updates user's offerFormInProgress to false */
async function setFormInProgressFalse() {
  const currUser = (await currentUser()) as User;
  const username = currUser.username as string;

  await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      offerFormInProgress: false,
    },
  });
}

export {
  navigateToQuiz,
  createProperty,
  createOffer,
  setFormInProgressTrue,
  setFormInProgressFalse,
};
