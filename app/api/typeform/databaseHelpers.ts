import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setOfferFormInProgressFalse(username: string) {
  await prisma.user.update({
    where: {
      username,
    },
    data: {
      offerFormInProgress: false,
    },
  });
}

async function updateOfferOnFormSubmission(
  offerId: string,
  envelopeId: string,
  typeformId: string,
  propertyId: string) {

  await prisma.offer.update({
    where: {
      id: offerId,
    },
    data: {
      envelopeId,
      typeformId,
      propertyId,
    },
  });
}


export {
  setOfferFormInProgressFalse,
  updateOfferOnFormSubmission
};