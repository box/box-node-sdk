import { SerializedData } from '../serialization/json.js';
import { sanitizeMap } from './utils.js';
import { sanitizeSerializedData } from '../serialization/json.js';
export class DataSanitizer {
  private readonly keysToSanitize: {
    readonly [key: string]: string;
  } = {
    ['authorization']: '',
    ['access_token']: '',
    ['refresh_token']: '',
    ['subject_token']: '',
    ['token']: '',
    ['client_id']: '',
    ['client_secret']: '',
    ['shared_link']: '',
    ['download_url']: '',
    ['jwt_private_key']: '',
    ['jwt_private_key_passphrase']: '',
    ['password']: '',
  };
  constructor(
    fields: Omit<
      DataSanitizer,
      'keysToSanitize' | 'sanitizeHeaders' | 'sanitizeBody'
    >,
  ) {}
  /**
     * @param {{
        readonly [key: string]: string;
    }} headers
     * @returns {{
        readonly [key: string]: string;
    }}
     */
  sanitizeHeaders(headers: { readonly [key: string]: string }): {
    readonly [key: string]: string;
  } {
    return sanitizeMap(headers, this.keysToSanitize);
  }
  /**
   * @param {SerializedData} body
   * @returns {SerializedData}
   */
  sanitizeBody(body: SerializedData): SerializedData {
    return sanitizeSerializedData(body, this.keysToSanitize);
  }
}
export interface DataSanitizerInput {}
