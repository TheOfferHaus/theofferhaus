const SECS_PER_HOUR = 3600;

/**
 * Generates the Base64-encoded string representation of the
 * DocuSign integration key and secret key combination.
 *
 * @returns {string} - The Base64-encoded string.
 */
function getSecretKeyEncoding(): string {
  return btoa(
    `${process.env.DOCUSIGN_INTEGRATION_KEY}:${process.env.DOCUSIGN_SECRET_KEY}`
  );
}

/**
 * Calculates the new expiration time based on the current time and
 * the duration until expiration.
 *
 * @param {number} expiresIn - The duration until expiration in milliseconds.
 * @returns {Date} - The new expiration time.
 */
function calculateNewExpirationTime(expiresIn: number): Date {
  const now = new Date();
  return new Date(now.getTime() + (expiresIn - SECS_PER_HOUR) * 1000);
}

export {
  getSecretKeyEncoding,
  calculateNewExpirationTime
};