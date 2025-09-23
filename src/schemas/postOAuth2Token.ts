import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type PostOAuth2TokenGrantTypeField =
  | 'authorization_code'
  | 'refresh_token'
  | 'client_credentials'
  | 'urn:ietf:params:oauth:grant-type:jwt-bearer'
  | 'urn:ietf:params:oauth:grant-type:token-exchange'
  | string;
export type PostOAuth2TokenSubjectTokenTypeField =
  | 'urn:ietf:params:oauth:token-type:access_token'
  | string;
export type PostOAuth2TokenActorTokenTypeField =
  | 'urn:ietf:params:oauth:token-type:id_token'
  | string;
export type PostOAuth2TokenBoxSubjectTypeField = 'enterprise' | 'user' | string;
export interface PostOAuth2Token {
  /**
   * The type of request being made, either using a client-side obtained
   * authorization code, a refresh token, a JWT assertion, client credentials
   * grant or another access token for the purpose of downscoping a token. */
  readonly grantType: PostOAuth2TokenGrantTypeField;
  /**
   * The Client ID of the application requesting an access token.
   *
   * Used in combination with `authorization_code`, `client_credentials`, or
   * `urn:ietf:params:oauth:grant-type:jwt-bearer` as the `grant_type`. */
  readonly clientId?: string;
  /**
   * The client secret of the application requesting an access token.
   *
   * Used in combination with `authorization_code`, `client_credentials`, or
   * `urn:ietf:params:oauth:grant-type:jwt-bearer` as the `grant_type`. */
  readonly clientSecret?: string;
  /**
   * The client-side authorization code passed to your application by
   * Box in the browser redirect after the user has successfully
   * granted your application permission to make API calls on their
   * behalf.
   *
   * Used in combination with `authorization_code` as the `grant_type`. */
  readonly code?: string;
  /**
   * A refresh token used to get a new access token with.
   *
   * Used in combination with `refresh_token` as the `grant_type`. */
  readonly refreshToken?: string;
  /**
   * A JWT assertion for which to request a new access token.
   *
   * Used in combination with `urn:ietf:params:oauth:grant-type:jwt-bearer`
   * as the `grant_type`. */
  readonly assertion?: string;
  /**
   * The token to exchange for a downscoped token. This can be a regular
   * access token, a JWT assertion, or an app token.
   *
   * Used in combination with `urn:ietf:params:oauth:grant-type:token-exchange`
   * as the `grant_type`. */
  readonly subjectToken?: string;
  /**
   * The type of `subject_token` passed in.
   *
   * Used in combination with `urn:ietf:params:oauth:grant-type:token-exchange`
   * as the `grant_type`. */
  readonly subjectTokenType?: PostOAuth2TokenSubjectTokenTypeField;
  /**
   * The token used to create an annotator token.
   * This is a JWT assertion.
   *
   * Used in combination with `urn:ietf:params:oauth:grant-type:token-exchange`
   * as the `grant_type`. */
  readonly actorToken?: string;
  /**
   * The type of `actor_token` passed in.
   *
   * Used in combination with `urn:ietf:params:oauth:grant-type:token-exchange`
   * as the `grant_type`. */
  readonly actorTokenType?: PostOAuth2TokenActorTokenTypeField;
  /**
   * The space-delimited list of scopes that you want apply to the
   * new access token.
   *
   * The `subject_token` will need to have all of these scopes or
   * the call will error with **401 Unauthorized**.. */
  readonly scope?: string;
  /**
   * Full URL for the file that the token should be generated for. */
  readonly resource?: string;
  /**
   * Used in combination with `client_credentials` as the `grant_type`. */
  readonly boxSubjectType?: PostOAuth2TokenBoxSubjectTypeField;
  /**
   * Used in combination with `client_credentials` as the `grant_type`.
   * Value is determined by `box_subject_type`. If `user` use user ID and if
   * `enterprise` use enterprise ID. */
  readonly boxSubjectId?: string;
  /**
   * Full URL of the shared link on the file or folder
   * that the token should be generated for. */
  readonly boxSharedLink?: string;
  readonly rawData?: SerializedData;
}
export function serializePostOAuth2TokenGrantTypeField(
  val: PostOAuth2TokenGrantTypeField,
): SerializedData {
  return val;
}
export function deserializePostOAuth2TokenGrantTypeField(
  val: SerializedData,
): PostOAuth2TokenGrantTypeField {
  if (val == 'authorization_code') {
    return val;
  }
  if (val == 'refresh_token') {
    return val;
  }
  if (val == 'client_credentials') {
    return val;
  }
  if (val == 'urn:ietf:params:oauth:grant-type:jwt-bearer') {
    return val;
  }
  if (val == 'urn:ietf:params:oauth:grant-type:token-exchange') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize PostOAuth2TokenGrantTypeField",
  });
}
export function serializePostOAuth2TokenSubjectTokenTypeField(
  val: PostOAuth2TokenSubjectTokenTypeField,
): SerializedData {
  return val;
}
export function deserializePostOAuth2TokenSubjectTokenTypeField(
  val: SerializedData,
): PostOAuth2TokenSubjectTokenTypeField {
  if (val == 'urn:ietf:params:oauth:token-type:access_token') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize PostOAuth2TokenSubjectTokenTypeField",
  });
}
export function serializePostOAuth2TokenActorTokenTypeField(
  val: PostOAuth2TokenActorTokenTypeField,
): SerializedData {
  return val;
}
export function deserializePostOAuth2TokenActorTokenTypeField(
  val: SerializedData,
): PostOAuth2TokenActorTokenTypeField {
  if (val == 'urn:ietf:params:oauth:token-type:id_token') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize PostOAuth2TokenActorTokenTypeField",
  });
}
export function serializePostOAuth2TokenBoxSubjectTypeField(
  val: PostOAuth2TokenBoxSubjectTypeField,
): SerializedData {
  return val;
}
export function deserializePostOAuth2TokenBoxSubjectTypeField(
  val: SerializedData,
): PostOAuth2TokenBoxSubjectTypeField {
  if (val == 'enterprise') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize PostOAuth2TokenBoxSubjectTypeField",
  });
}
export function serializePostOAuth2Token(val: PostOAuth2Token): SerializedData {
  return {
    ['grant_type']: serializePostOAuth2TokenGrantTypeField(val.grantType),
    ['client_id']: val.clientId,
    ['client_secret']: val.clientSecret,
    ['code']: val.code,
    ['refresh_token']: val.refreshToken,
    ['assertion']: val.assertion,
    ['subject_token']: val.subjectToken,
    ['subject_token_type']:
      val.subjectTokenType == void 0
        ? val.subjectTokenType
        : serializePostOAuth2TokenSubjectTokenTypeField(val.subjectTokenType),
    ['actor_token']: val.actorToken,
    ['actor_token_type']:
      val.actorTokenType == void 0
        ? val.actorTokenType
        : serializePostOAuth2TokenActorTokenTypeField(val.actorTokenType),
    ['scope']: val.scope,
    ['resource']: val.resource,
    ['box_subject_type']:
      val.boxSubjectType == void 0
        ? val.boxSubjectType
        : serializePostOAuth2TokenBoxSubjectTypeField(val.boxSubjectType),
    ['box_subject_id']: val.boxSubjectId,
    ['box_shared_link']: val.boxSharedLink,
  };
}
export function deserializePostOAuth2Token(
  val: SerializedData,
): PostOAuth2Token {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "PostOAuth2Token"' });
  }
  if (val.grant_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "grant_type" of type "PostOAuth2Token" to be defined',
    });
  }
  const grantType: PostOAuth2TokenGrantTypeField =
    deserializePostOAuth2TokenGrantTypeField(val.grant_type);
  if (!(val.client_id == void 0) && !sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "client_id" of type "PostOAuth2Token"',
    });
  }
  const clientId: undefined | string =
    val.client_id == void 0 ? void 0 : val.client_id;
  if (!(val.client_secret == void 0) && !sdIsString(val.client_secret)) {
    throw new BoxSdkError({
      message: 'Expecting string for "client_secret" of type "PostOAuth2Token"',
    });
  }
  const clientSecret: undefined | string =
    val.client_secret == void 0 ? void 0 : val.client_secret;
  if (!(val.code == void 0) && !sdIsString(val.code)) {
    throw new BoxSdkError({
      message: 'Expecting string for "code" of type "PostOAuth2Token"',
    });
  }
  const code: undefined | string = val.code == void 0 ? void 0 : val.code;
  if (!(val.refresh_token == void 0) && !sdIsString(val.refresh_token)) {
    throw new BoxSdkError({
      message: 'Expecting string for "refresh_token" of type "PostOAuth2Token"',
    });
  }
  const refreshToken: undefined | string =
    val.refresh_token == void 0 ? void 0 : val.refresh_token;
  if (!(val.assertion == void 0) && !sdIsString(val.assertion)) {
    throw new BoxSdkError({
      message: 'Expecting string for "assertion" of type "PostOAuth2Token"',
    });
  }
  const assertion: undefined | string =
    val.assertion == void 0 ? void 0 : val.assertion;
  if (!(val.subject_token == void 0) && !sdIsString(val.subject_token)) {
    throw new BoxSdkError({
      message: 'Expecting string for "subject_token" of type "PostOAuth2Token"',
    });
  }
  const subjectToken: undefined | string =
    val.subject_token == void 0 ? void 0 : val.subject_token;
  const subjectTokenType: undefined | PostOAuth2TokenSubjectTokenTypeField =
    val.subject_token_type == void 0
      ? void 0
      : deserializePostOAuth2TokenSubjectTokenTypeField(val.subject_token_type);
  if (!(val.actor_token == void 0) && !sdIsString(val.actor_token)) {
    throw new BoxSdkError({
      message: 'Expecting string for "actor_token" of type "PostOAuth2Token"',
    });
  }
  const actorToken: undefined | string =
    val.actor_token == void 0 ? void 0 : val.actor_token;
  const actorTokenType: undefined | PostOAuth2TokenActorTokenTypeField =
    val.actor_token_type == void 0
      ? void 0
      : deserializePostOAuth2TokenActorTokenTypeField(val.actor_token_type);
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "scope" of type "PostOAuth2Token"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  if (!(val.resource == void 0) && !sdIsString(val.resource)) {
    throw new BoxSdkError({
      message: 'Expecting string for "resource" of type "PostOAuth2Token"',
    });
  }
  const resource: undefined | string =
    val.resource == void 0 ? void 0 : val.resource;
  const boxSubjectType: undefined | PostOAuth2TokenBoxSubjectTypeField =
    val.box_subject_type == void 0
      ? void 0
      : deserializePostOAuth2TokenBoxSubjectTypeField(val.box_subject_type);
  if (!(val.box_subject_id == void 0) && !sdIsString(val.box_subject_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "box_subject_id" of type "PostOAuth2Token"',
    });
  }
  const boxSubjectId: undefined | string =
    val.box_subject_id == void 0 ? void 0 : val.box_subject_id;
  if (!(val.box_shared_link == void 0) && !sdIsString(val.box_shared_link)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "box_shared_link" of type "PostOAuth2Token"',
    });
  }
  const boxSharedLink: undefined | string =
    val.box_shared_link == void 0 ? void 0 : val.box_shared_link;
  return {
    grantType: grantType,
    clientId: clientId,
    clientSecret: clientSecret,
    code: code,
    refreshToken: refreshToken,
    assertion: assertion,
    subjectToken: subjectToken,
    subjectTokenType: subjectTokenType,
    actorToken: actorToken,
    actorTokenType: actorTokenType,
    scope: scope,
    resource: resource,
    boxSubjectType: boxSubjectType,
    boxSubjectId: boxSubjectId,
    boxSharedLink: boxSharedLink,
  } satisfies PostOAuth2Token;
}
