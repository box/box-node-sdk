import { serializeAccessToken } from '../schemas/accessToken';
import { deserializeAccessToken } from '../schemas/accessToken';
import { AccessToken } from '../schemas/accessToken';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface TokenStorage {
  /**
   * @param {AccessToken} token
   * @returns {Promise<undefined>}
   */
  store(token: AccessToken): Promise<undefined>;
  /**
   * @returns {Promise<undefined | AccessToken>}
   */
  get(): Promise<undefined | AccessToken>;
  /**
   * @returns {Promise<undefined>}
   */
  clear(): Promise<undefined>;
}
export class InMemoryTokenStorage implements TokenStorage {
  token?: AccessToken = void 0;
  constructor(
    fields: Omit<InMemoryTokenStorage, 'token' | 'store' | 'get' | 'clear'> &
      Partial<Pick<InMemoryTokenStorage, 'token'>>,
  ) {
    if (fields.token !== undefined) {
      this.token = fields.token;
    }
  }
  /**
   * @param {AccessToken} token
   * @returns {Promise<undefined>}
   */
  async store(token: AccessToken): Promise<undefined> {
    this.token = token;
    return void 0;
  }
  /**
   * @returns {Promise<undefined | AccessToken>}
   */
  async get(): Promise<undefined | AccessToken> {
    return this.token;
  }
  /**
   * @returns {Promise<undefined>}
   */
  async clear(): Promise<undefined> {
    this.token = void 0;
    return void 0;
  }
}
