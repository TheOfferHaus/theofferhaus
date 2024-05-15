import { PrismaClient } from "@prisma/client";

/** Prisma client extension with a class method that finds the most recent offer
 * made on a property
 * Parameters: username (string)
 */

const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async findLatestOffer(username: string) {
        const databaseUser = await prisma.user.findUnique({
          where: { username: username },
          include: { offers: true },
        });
        if (!databaseUser || databaseUser.offers.length < 1) {
          return null;
        }
        let latestOffer = databaseUser.offers[0].updatedAt;
        for (let offer of databaseUser.offers) {
          if (offer.updatedAt < latestOffer) {
            latestOffer = offer.updatedAt;
          }
        }
        return latestOffer;
      },
    },
  },
});

export default prisma;
