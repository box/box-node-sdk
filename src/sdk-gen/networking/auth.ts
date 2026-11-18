import { serializeAccessToken } from '../schemas/accessToken';
import { deserializeAccessToken } from '../schemas/accessToken';
import { AccessToken } from '../schemas/accessToken';
import { NetworkSession } from './network';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
    networkSession?: NetworkSession
  ): Promise<AccessToken>;
}
