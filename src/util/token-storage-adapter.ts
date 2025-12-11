/**
 * @fileoverview Token Storage Adapter
 * 
 * Provides the method to convert between:
 * 1. Legacy TokenStore (callback-based) to SDK-Gen TokenStorage (promise-based)
 * 2. Legacy TokenInfo structure to sdk-gen AccessToken structure
 */

import { AccessToken } from '../sdk-gen/schemas/accessToken';
import { TokenStorage } from '../sdk-gen/box/tokenStorage';

/**
 * Legacy TokenInfo structure from the old SDK
 */
export interface LegacyTokenInfo {
  accessToken: string;
  refreshToken?: string;
  accessTokenTTLMS: number;
  acquiredAtMS: number;
}

/**
 * Legacy TokenStore interface (callback-based)
 */
export interface LegacyTokenStore {
  read(callback: (err: Error | null, tokenInfo: LegacyTokenInfo | null) => void): void;
  write(tokenInfo: LegacyTokenInfo, callback: (err: Error | null) => void): void;
  clear(callback: (err: Error | null) => void): void;
}

export function convertLegacyTokenInfoToAccessToken(
  legacyTokenInfo: LegacyTokenInfo | null
): AccessToken | undefined {
  if (!legacyTokenInfo) {
    return undefined;
  }

  // Calculate expiresIn (seconds) from TTL and acquired time
  const currentTimeMS = Date.now();
  const expiresAtMS = legacyTokenInfo.acquiredAtMS + legacyTokenInfo.accessTokenTTLMS;
  const remainingMS = expiresAtMS - currentTimeMS;
  const expiresInSeconds = Math.max(0, Math.floor(remainingMS / 1000));

  return {
    accessToken: legacyTokenInfo.accessToken,
    refreshToken: legacyTokenInfo.refreshToken,
    expiresIn: expiresInSeconds,
    tokenType: 'bearer',
  };
}

/**
 * Convert sdk-gen AccessToken to legacy TokenInfo
 * 
 * @param accessToken The sdk-gen AccessToken
 * @param acquiredAtMS Optional timestamp of when token was acquired (defaults to now)
 */
export function convertAccessTokenToLegacyTokenInfo(
  accessToken: AccessToken | null | undefined,
  acquiredAtMS?: number
): LegacyTokenInfo | null {
  if (!accessToken || !accessToken.accessToken) {
    return null;
  }

  const acquired = acquiredAtMS || Date.now();
  // Convert expiresIn (seconds) to accessTokenTTLMS (milliseconds)
  const ttlMS = (accessToken.expiresIn || 3600) * 1000;

  return {
    accessToken: accessToken.accessToken,
    refreshToken: accessToken.refreshToken,
    accessTokenTTLMS: ttlMS,
    acquiredAtMS: acquired,
  };
}

/**
 * Adapter class that wraps a legacy callback-based TokenStore
 * and makes it compatible with sdk-gen's promise-based TokenStorage interface
 */
export class LegacyTokenStoreAdapter implements TokenStorage {
  private legacyStore: LegacyTokenStore;

  constructor(legacyStore: LegacyTokenStore) {
    this.legacyStore = legacyStore;
  }

  /**
   * Store an AccessToken by converting it to legacy TokenInfo format
   */
  async store(token: AccessToken): Promise<undefined> {
    const legacyTokenInfo = convertAccessTokenToLegacyTokenInfo(token);
    
    if (!legacyTokenInfo) {
      throw new Error('Cannot store invalid token');
    }

    return new Promise((resolve, reject) => {
      this.legacyStore.write(legacyTokenInfo, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  /**
   * Retrieve an AccessToken by reading legacy TokenInfo and converting it
   */
  async get(): Promise<AccessToken | undefined> {
    return new Promise((resolve, reject) => {
      this.legacyStore.read((err, legacyTokenInfo) => {
        if (err) {
          reject(err);
        } else {
          const accessToken = convertLegacyTokenInfoToAccessToken(legacyTokenInfo);
          resolve(accessToken);
        }
      });
    });
  }

  /**
   * Clear the token store
   */
  async clear(): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.legacyStore.clear((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}

/**
 * Convenience function to wrap a legacy TokenStore as sdk-gen TokenStorage
 */
export function wrapLegacyTokenStore(
  legacyStore: LegacyTokenStore
): TokenStorage {
  return new LegacyTokenStoreAdapter(legacyStore);
}


