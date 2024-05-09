import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ApiTokenDatabaseManager {

  /** Updates database with new token information
   *
   * @param accessToken
   * @param refreshToken
   * @param expirationTime
   */
  async updateTokenData(
    accessToken: string,
    refreshToken: string,
    expirationTime: Date,
    baseUri: string
  ) {

    await prisma.accessData.upsert({
      where: {
        id: 0
      },
      update: {
        token: accessToken,
        refreshToken: refreshToken,
        expirationTime: expirationTime,
        baseUri: baseUri,
      },
      create: {
        id: 0,
        token: accessToken,
        refreshToken: refreshToken,
        expirationTime: expirationTime,
        baseUri: baseUri,
      }
    });
  }

  async getCurrentAccessData() {
    return await prisma.accessData.findUnique({
      where: {
        id: 0
      }
    });
  }

}