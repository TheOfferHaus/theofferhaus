import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECS_PER_HOUR = 3600;

type ApiAccessData = { accessToken: string, baseUri: string, refreshToken: string, expiresIn: number; };


export default class ApiTokenManager {
  expirationTime: Date;
  baseUrl: string;
  accessToken: string;
  refreshToken: string;


  constructor(baseUrl: string, accessToken: string, expirationTime: Date, refreshToken: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.expirationTime = expirationTime;
    this.refreshToken = refreshToken;
  }

  static async createApiTokenManager() {
    const accessData = await prisma.accessData.findUnique({
      where: {
        id: 0
      }
    });

    return new ApiTokenManager(accessData?.baseUri!, accessData?.token!, accessData?.expirationTime!, accessData?.refreshToken!);
  }

  async getBaseUrl() {
    return this.baseUrl;
  }

  async getAccessToken() {
    const now = new Date();
    if (now >= this.expirationTime) {
      await this.refreshTokens();
    }

    return this.accessToken;
  }

  async refreshTokens() {
    // Base64 encode the combination of the integration and secret keys
    const encodedKeys = btoa(`${process.env.DOCUSIGN_INTEGRATION_KEY}:${process.env.DOCUSIGN_SECRET_KEY}`);

    const response = await fetch("https://account-d.docusign.com/oauth/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${encodedKeys}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: this.refreshToken
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newAccessData = await response.json();

    this.accessToken = newAccessData.access_token;
    this.refreshToken = newAccessData.refresh_token;
    const now = new Date();
    this.expirationTime = new Date(now.getTime() + newAccessData.expires_in - SECS_PER_HOUR);

    await prisma.accessData.update({
      where: {
        id: 0
      },
      data: {
        token: this.accessToken,
        refreshToken: this.refreshToken,
        expirationTime: this.expirationTime
      }
    });
  }

  /**
 * Retrieves an access token and the base URI from docusign API from an authentication
 * code that is returned after filling out the consent form
 *
 * @param {string} authorizationCode The authorization code received after submitting
 *  the consent form
 *
 * @returns {Promise<ApiAccessData>} A promise that resolves with an object containing the `access_token`
 * and `base_uri` of the user's primary account. This information is used for further interactions with the API.
 * If either request fails, the function will throw an error with a detailed message based on the server's response.
 */

  static async getAccessKeyAndBaseUri(authorizationCode: string): Promise<ApiAccessData> {
    const encodedKeys = btoa(
      `${process.env.DOCUSIGN_INTEGRATION_KEY}:${process.env.DOCUSIGN_SECRET_KEY}`
    );
    const tokenResp = await fetch("https://account-d.docusign.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedKeys}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authorizationCode}`,
    });

    if (tokenResp.status > 201) {
      throw new Error("Getting token failed");
    }

    const tokenData = await tokenResp.json();

    const baseUriResp = await fetch(
      "https://account-d.docusign.com/oauth/userinfo",
      {
        method: "GET", // HTTP method
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`, // Authorization header
        },
      }
    );

    if (baseUriResp.status > 201) {
      throw new Error("Getting base url failed");
    }

    const baseUriData = await baseUriResp.json();

    return {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      baseUri: baseUriData.accounts[0].base_uri
    };
  }

}

