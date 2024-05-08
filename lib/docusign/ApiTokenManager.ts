import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECS_PER_HOUR = 3600;
const API_BASE_URL = "https://account-d.docusign.com";

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

  /**
   * Creates an instance of ApiTokenManager using data from the database.
   * @returns {Promise<ApiTokenManager>} - A promise resolving to an instance of ApiTokenManager.
   */
  static async createApiTokenManager(): Promise<ApiTokenManager> {
    // Get tokens from database
    const accessData = await prisma.accessData.findUnique({
      where: {
        id: 0
      }
    });

    return new ApiTokenManager(accessData?.baseUri!, accessData?.token!, accessData?.expirationTime!, accessData?.refreshToken!);
  }

  /**
   * Retrieves the base URL for API requests.
   * @returns {string} - A promise resolving to the base URL.
   */
  getBaseUrl(): string {
    return `${this.baseUrl}/restapi`;
  }

  /**
   * Retrieves the access token for API authorization, refreshing it if necessary.
   * @returns {Promise<string>} - A promise resolving to the access token.
   */
  async getAccessToken(): Promise<string> {
    const now = new Date();

    // Refresh tokens if necessary
    if (now >= this.expirationTime) {
      await this.refreshTokens();
    }

    return this.accessToken;
  }


  /**
   * Refreshes the access and refresh tokens. Updates database and instance
   * with new tokens
   * @returns {Promise<void>} - A promise resolving when tokens are refreshed.
   */
  async refreshTokens(): Promise<void> {

    console.log('refreshing token');

    // Base64 encode the combination of the integration and secret keys
    const encodedKeys = btoa(
      `${process.env.DOCUSIGN_INTEGRATION_KEY}:${process.env.DOCUSIGN_SECRET_KEY}`
    );

    // Request to docusign to refresh tokens
    const response = await fetch(`${API_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${encodedKeys}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: this.refreshToken
      })
    });

    // Error handling if API request fails
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newAccessData = await response.json();

    // Update this instance with new tokens
    this.accessToken = newAccessData.access_token;
    this.refreshToken = newAccessData.refresh_token;
    const now = new Date();
    this.expirationTime = new Date(now.getTime() + (newAccessData.expires_in - SECS_PER_HOUR) * 1000);

    // Update database with new tokens
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
 * Retrieves an access token, refresh token, and the base URI from docusign API from an authentication
 * code that is returned after filling out the consent form. Adds these to database.
 *
 * @param {string} authorizationCode The authorization code received after submitting
 *  the consent form
 *
 * @returns {Promise<void>}
 */

  static async initializeAccessData(authorizationCode: string): Promise<void> {

    /** Function for getting tokens from authorization code */
    async function getTokenData() {
      // Base64 encode the combination of the integration and secret keys
      const encodedKeys = btoa(
        `${process.env.DOCUSIGN_INTEGRATION_KEY}:${process.env.DOCUSIGN_SECRET_KEY}`
      );
      const tokenResp = await fetch(`${API_BASE_URL}/oauth/token`, {
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

      return await tokenResp.json();
    }

    /** Function for getting base uri */
    async function getBaseUriData(accessToken: string) {
      const baseUriResp = await fetch(`${API_BASE_URL}/oauth/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization header
        },
      });

      if (baseUriResp.status > 201) {
        throw new Error("Getting base url failed");
      }

      return await baseUriResp.json();
    }

    const tokenData = await getTokenData();
    const baseUriData = await getBaseUriData(tokenData.access_token);

    const now = new Date();

    // Update database with token information or insert if it doesnt already exist
    await prisma.accessData.upsert({
      where: {
        id: 0
      },
      update: {
        token: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expirationTime: new Date(now.getTime() + (tokenData.expires_in - SECS_PER_HOUR) * 1000),
        baseUri: baseUriData.accounts[0].base_uri
      },
      create: {
        id: 0,
        token: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expirationTime: new Date(now.getTime() + (tokenData.expires_in - SECS_PER_HOUR) * 1000),
        baseUri: baseUriData.accounts[0].base_uri
      }
    });
  }
}

