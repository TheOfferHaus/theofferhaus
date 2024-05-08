import ApiTokenDatabaseManager from "./ApiTokenDatabaseManager";
import { getSecretKeyEncoding, calculateNewExpirationTime } from "./utils";

const API_BASE_URL = "https://account-d.docusign.com";

export default class ApiTokenManager {
  expirationTime: Date;
  baseUrl: string;
  accessToken: string;
  refreshToken: string;
  dbManager: ApiTokenDatabaseManager;


  constructor(baseUrl: string, accessToken: string, expirationTime: Date, refreshToken: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.expirationTime = expirationTime;
    this.refreshToken = refreshToken;
    this.dbManager = new ApiTokenDatabaseManager();
  }

  /**
   * Creates an instance of ApiTokenManager using data from the database.
   * @returns {Promise<ApiTokenManager>} - A promise resolving to an instance of ApiTokenManager.
   */
  static async createApiTokenManager(): Promise<ApiTokenManager> {
    // Get tokens from database
    const accessData = await ApiTokenDatabaseManager.getCurrentAccessData();

    // Create new ApiTokenManager instance
    return new ApiTokenManager(
      accessData?.baseUri!,
      accessData?.token!,
      accessData?.expirationTime!,
      accessData?.refreshToken!);
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

    // Request to docusign to refresh tokens
    const response = await fetch(`${API_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${getSecretKeyEncoding()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: this.refreshToken
      })
    });

    // Error handling if API request fails
    if (!response.ok) {
      throw new Error("Refreshing token failed: " + await response.text());
    }

    const newAccessData = await response.json();

    // Update this instance with new tokens
    this.accessToken = newAccessData.access_token;
    this.refreshToken = newAccessData.refresh_token;
    this.expirationTime = calculateNewExpirationTime(newAccessData.expires_in);

    await this.dbManager.updateTokenData(
      this.accessToken,
      this.refreshToken,
      this.expirationTime,
      this.baseUrl
    );
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

      const response = await fetch(`${API_BASE_URL}/oauth/token`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${getSecretKeyEncoding()}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authorizationCode}`,
      });

      if (!response.ok) {
        throw new Error("Getting token failed: " + await response.text());
      }

      return await response.json();
    }

    /** Function for getting base uri */
    async function getBaseUriData(accessToken: string) {
      const response = await fetch(`${API_BASE_URL}/oauth/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Getting base url failed: " + await response.text());
      }

      return await response.json();
    }

    const tokenData = await getTokenData();
    const baseUriData = await getBaseUriData(tokenData.access_token);

    // Update database with token information or insert if it doesnt already exist
    const dbManager = new ApiTokenDatabaseManager();
    await dbManager.updateTokenData(
      tokenData.access_token,
      tokenData.refresh_token,
      calculateNewExpirationTime(tokenData.expires_in),
      baseUriData.accounts[0].base_uri
    );
  }
}

