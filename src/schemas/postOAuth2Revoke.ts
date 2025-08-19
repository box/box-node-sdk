import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface PostOAuth2Revoke {
  /**
   * The Client ID of the application requesting to revoke the
   * access token. */
  readonly clientId?: string;
  /**
   * The client secret of the application requesting to revoke
   * an access token. */
  readonly clientSecret?: string;
  /**
   * The access token to revoke. */
  readonly token?: string;
  readonly rawData?: SerializedData;
}
export function serializePostOAuth2Revoke(
  val: PostOAuth2Revoke,
): SerializedData {
  return {
    ['client_id']: val.clientId,
    ['client_secret']: val.clientSecret,
    ['token']: val.token,
  };
}
export function deserializePostOAuth2Revoke(
  val: SerializedData,
): PostOAuth2Revoke {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "PostOAuth2Revoke"',
    });
  }
  if (!(val.client_id == void 0) && !sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "client_id" of type "PostOAuth2Revoke"',
    });
  }
  const clientId: undefined | string =
    val.client_id == void 0 ? void 0 : val.client_id;
  if (!(val.client_secret == void 0) && !sdIsString(val.client_secret)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_secret" of type "PostOAuth2Revoke"',
    });
  }
  const clientSecret: undefined | string =
    val.client_secret == void 0 ? void 0 : val.client_secret;
  if (!(val.token == void 0) && !sdIsString(val.token)) {
    throw new BoxSdkError({
      message: 'Expecting string for "token" of type "PostOAuth2Revoke"',
    });
  }
  const token: undefined | string = val.token == void 0 ? void 0 : val.token;
  return {
    clientId: clientId,
    clientSecret: clientSecret,
    token: token,
  } satisfies PostOAuth2Revoke;
}
