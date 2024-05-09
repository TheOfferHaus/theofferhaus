import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ApiTokenDatabaseManager {

  /** Updates database with new token information
   *
   * @param token
   * @param refreshToken
   * @param expirationTime
   * @param baseUri
   */
  async updateTokenData(
    token: string,
    refreshToken: string,
    expirationTime: Date,
    baseUri: string
  ) {

    await prisma.accessData.upsert({
      where: {
        id: 0
      },
      update: {
        token,
        refreshToken,
        expirationTime,
        baseUri: baseUri,
      },
      create: {
        id: 0,
        token,
        refreshToken,
        expirationTime,
        baseUri,
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