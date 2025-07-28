import { AccessToken } from '../schemas/accessToken.generated.js';
import { NetworkSession } from './network.generated.js';
export interface Authentication {
  /**
   * @param {NetworkSession} networkSession
   * @returns {Promise<AccessToken>}
   */
  retrieveToken(networkSession?: NetworkSession): Promise<AccessToken>;
  /**
   * @param {NetworkSession} networkSession
   * @returns {Promise<AccessToken>}
   */
  refreshToken(networkSession?: NetworkSession): Promise<AccessToken>;
  /**
   * @param {NetworkSession} networkSession
   * @returns {Promise<string>}
   */
  retrieveAuthorizationHeader(networkSession?: NetworkSession): Promise<string>;
  /**
   * @param {NetworkSession} networkSession
   * @returns {Promise<undefined>}
   */
  revokeToken(networkSession?: NetworkSession): Promise<undefined>;
  /**
   * @param {readonly string[]} scopes
   * @param {string} resource
   * @param {string} sharedLink
   * @param {NetworkSession} networkSession
   * @returns {Promise<AccessToken>}
   */
  downscopeToken(
    scopes: readonly string[],
    resource?: string,
    sharedLink?: string,
    networkSession?: NetworkSession,
  ): Promise<AccessToken>;
}
