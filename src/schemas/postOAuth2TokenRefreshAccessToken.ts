import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type PostOAuth2TokenRefreshAccessTokenGrantTypeField =
  | 'refresh_token'
  | string;
export class PostOAuth2TokenRefreshAccessToken {
  /**
   * The type of request being made, in this case a refresh request. */
  readonly grantType: PostOAuth2TokenRefreshAccessTokenGrantTypeField =
    'refresh_token' as PostOAuth2TokenRefreshAccessTokenGrantTypeField;
  /**
   * The client ID of the application requesting to refresh the token. */
  readonly clientId!: string;
  /**
   * The client secret of the application requesting to refresh the token. */
  readonly clientSecret!: string;
  /**
   * The refresh token to refresh. */
  readonly refreshToken!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<PostOAuth2TokenRefreshAccessToken, 'grantType'> &
      Partial<Pick<PostOAuth2TokenRefreshAccessToken, 'grantType'>>,
  ) {
    if (fields.grantType !== undefined) {
      this.grantType = fields.grantType;
    }
    if (fields.clientId !== undefined) {
      this.clientId = fields.clientId;
    }
    if (fields.clientSecret !== undefined) {
      this.clientSecret = fields.clientSecret;
    }
    if (fields.refreshToken !== undefined) {
      this.refreshToken = fields.refreshToken;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface PostOAuth2TokenRefreshAccessTokenInput {
  /**
   * The type of request being made, in this case a refresh request. */
  readonly grantType?: PostOAuth2TokenRefreshAccessTokenGrantTypeField;
  /**
   * The client ID of the application requesting to refresh the token. */
  readonly clientId: string;
  /**
   * The client secret of the application requesting to refresh the token. */
  readonly clientSecret: string;
  /**
   * The refresh token to refresh. */
  readonly refreshToken: string;
  readonly rawData?: SerializedData;
}
export function serializePostOAuth2TokenRefreshAccessTokenGrantTypeField(
  val: PostOAuth2TokenRefreshAccessTokenGrantTypeField,
): SerializedData {
  return val;
}
export function deserializePostOAuth2TokenRefreshAccessTokenGrantTypeField(
  val: SerializedData,
): PostOAuth2TokenRefreshAccessTokenGrantTypeField {
  if (val == 'refresh_token') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize PostOAuth2TokenRefreshAccessTokenGrantTypeField",
  });
}
export function serializePostOAuth2TokenRefreshAccessToken(
  val: PostOAuth2TokenRefreshAccessToken,
): SerializedData {
  return {
    ['grant_type']: serializePostOAuth2TokenRefreshAccessTokenGrantTypeField(
      val.grantType,
    ),
    ['client_id']: val.clientId,
    ['client_secret']: val.clientSecret,
    ['refresh_token']: val.refreshToken,
  };
}
export function deserializePostOAuth2TokenRefreshAccessToken(
  val: SerializedData,
): PostOAuth2TokenRefreshAccessToken {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "PostOAuth2TokenRefreshAccessToken"',
    });
  }
  if (val.grant_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "grant_type" of type "PostOAuth2TokenRefreshAccessToken" to be defined',
    });
  }
  const grantType: PostOAuth2TokenRefreshAccessTokenGrantTypeField =
    deserializePostOAuth2TokenRefreshAccessTokenGrantTypeField(val.grant_type);
  if (val.client_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "client_id" of type "PostOAuth2TokenRefreshAccessToken" to be defined',
    });
  }
  if (!sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_id" of type "PostOAuth2TokenRefreshAccessToken"',
    });
  }
  const clientId: string = val.client_id;
  if (val.client_secret == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "client_secret" of type "PostOAuth2TokenRefreshAccessToken" to be defined',
    });
  }
  if (!sdIsString(val.client_secret)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_secret" of type "PostOAuth2TokenRefreshAccessToken"',
    });
  }
  const clientSecret: string = val.client_secret;
  if (val.refresh_token == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "refresh_token" of type "PostOAuth2TokenRefreshAccessToken" to be defined',
    });
  }
  if (!sdIsString(val.refresh_token)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "refresh_token" of type "PostOAuth2TokenRefreshAccessToken"',
    });
  }
  const refreshToken: string = val.refresh_token;
  return {
    grantType: grantType,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
  } satisfies PostOAuth2TokenRefreshAccessToken;
}
export function serializePostOAuth2TokenRefreshAccessTokenInput(
  val: PostOAuth2TokenRefreshAccessTokenInput,
): SerializedData {
  return {
    ['grantType']:
      val.grantType == void 0
        ? val.grantType
        : serializePostOAuth2TokenRefreshAccessTokenGrantTypeField(
            val.grantType,
          ),
    ['client_id']: val.clientId,
    ['client_secret']: val.clientSecret,
    ['refresh_token']: val.refreshToken,
  };
}
export function deserializePostOAuth2TokenRefreshAccessTokenInput(
  val: SerializedData,
): PostOAuth2TokenRefreshAccessTokenInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "PostOAuth2TokenRefreshAccessTokenInput"',
    });
  }
  const grantType: undefined | PostOAuth2TokenRefreshAccessTokenGrantTypeField =
    val.grantType == void 0
      ? void 0
      : deserializePostOAuth2TokenRefreshAccessTokenGrantTypeField(
          val.grantType,
        );
  if (val.client_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "client_id" of type "PostOAuth2TokenRefreshAccessTokenInput" to be defined',
    });
  }
  if (!sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_id" of type "PostOAuth2TokenRefreshAccessTokenInput"',
    });
  }
  const clientId: string = val.client_id;
  if (val.client_secret == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "client_secret" of type "PostOAuth2TokenRefreshAccessTokenInput" to be defined',
    });
  }
  if (!sdIsString(val.client_secret)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_secret" of type "PostOAuth2TokenRefreshAccessTokenInput"',
    });
  }
  const clientSecret: string = val.client_secret;
  if (val.refresh_token == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "refresh_token" of type "PostOAuth2TokenRefreshAccessTokenInput" to be defined',
    });
  }
  if (!sdIsString(val.refresh_token)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "refresh_token" of type "PostOAuth2TokenRefreshAccessTokenInput"',
    });
  }
  const refreshToken: string = val.refresh_token;
  return {
    grantType: grantType,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
  } satisfies PostOAuth2TokenRefreshAccessTokenInput;
}
