import { SerializedData } from '../serialization/json';
import { sanitizeMap } from './utils';
import { sanitizeSerializedData } from '../serialization/json';
import { sanitizeFormEncodedBodyFromString } from '../serialization/json';
import { jsonToSerializedData } from '../serialization/json';
import { sdToJson } from '../serialization/json';
export class DataSanitizer {
  readonly keysToSanitize: {
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
      | 'keysToSanitize'
      | 'sanitizeHeaders'
      | 'sanitizeBody'
      | 'sanitizeFormEncodedBody'
      | 'sanitizeStringBody'
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
  /**
   * @param {string} body
   * @returns {string}
   */
  sanitizeFormEncodedBody(body: string): string {
    return sanitizeFormEncodedBodyFromString(body, this.keysToSanitize);
  }
  /**
   * @param {string} body
   * @param {string} contentType
   * @returns {string}
   */
  sanitizeStringBody(body: string, contentType?: string): string {
    if (
      contentType == 'application/json' ||
      contentType == 'application/json-patch+json'
    ) {
      try {
        return sdToJson(this.sanitizeBody(jsonToSerializedData(body)));
      } catch (error) {
        return body;
      } finally {
      }
    }
    if (contentType == 'application/x-www-form-urlencoded') {
      return this.sanitizeFormEncodedBody(body);
    }
    return body;
  }
}
export interface DataSanitizerInput {}
