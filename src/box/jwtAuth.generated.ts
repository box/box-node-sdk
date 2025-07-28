import { PostOAuth2TokenGrantTypeField } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2TokenSubjectTokenTypeField } from '../schemas/postOAuth2Token.generated.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { AccessToken } from '../schemas/accessToken.generated.js';
import { PostOAuth2Token } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2Revoke } from '../schemas/postOAuth2Revoke.generated.js';
import { TokenStorage } from './tokenStorage.generated.js';
import { InMemoryTokenStorage } from './tokenStorage.generated.js';
import { jsonToSerializedData } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { getUuid } from '../internal/utils.js';
import { readTextFromFile } from '../internal/utils.js';
import { isBrowser } from '../internal/utils.js';
import { getEpochTimeInSeconds } from '../internal/utils.js';
import { createJwtAssertion } from '../internal/utils.js';
import { JwtSignOptions } from '../internal/utils.js';
import { JwtKey } from '../internal/utils.js';
import { JwtAlgorithm } from '../internal/utils.js';
import { PrivateKeyDecryptor } from '../internal/utils.js';
import { DefaultPrivateKeyDecryptor } from '../internal/utils.js';
import { AuthorizationManager } from '../managers/authorization.generated.js';
import { BoxSdkError } from './errors.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface JwtConfigAppSettingsAppAuth {
  /**
   * Public key ID */
  readonly publicKeyId: string;
  /**
   * Private key */
  readonly privateKey: string;
  /**
   * Passphrase */
  readonly passphrase: string;
  readonly rawData?: SerializedData;
}
export interface JwtConfigAppSettings {
  /**
   * App client ID */
  readonly clientId: string;
  /**
   * App client secret */
  readonly clientSecret: string;
  /**
   * App auth settings */
  readonly appAuth: JwtConfigAppSettingsAppAuth;
  readonly rawData?: SerializedData;
}
export interface JwtConfigFile {
  /**
   * Enterprise ID */
  readonly enterpriseId?: string;
  /**
   * User ID */
  readonly userId?: string;
  /**
   * App settings */
  readonly boxAppSettings: JwtConfigAppSettings;
  readonly rawData?: SerializedData;
}
export class JwtConfig {
  /**
   * App client ID */
  readonly clientId!: string;
  /**
   * App client secret */
  readonly clientSecret!: string;
  /**
   * Public key ID */
  readonly jwtKeyId!: string;
  /**
   * Private key */
  readonly privateKey!: string;
  /**
   * Passphrase */
  readonly privateKeyPassphrase!: string;
  /**
   * Enterprise ID */
  readonly enterpriseId?: string;
  /**
   * User ID */
  readonly userId?: string;
  readonly algorithm?: JwtAlgorithm = 'RS256' as JwtAlgorithm;
  readonly tokenStorage: TokenStorage = new InMemoryTokenStorage({});
  readonly privateKeyDecryptor: PrivateKeyDecryptor =
    new DefaultPrivateKeyDecryptor({});
  constructor(
    fields: Omit<
      JwtConfig,
      | 'algorithm'
      | 'tokenStorage'
      | 'privateKeyDecryptor'
      | 'fromConfigJsonString'
      | 'fromConfigFile'
    > &
      Partial<
        Pick<JwtConfig, 'algorithm' | 'tokenStorage' | 'privateKeyDecryptor'>
      >,
  ) {
    if (fields.clientId !== undefined) {
      this.clientId = fields.clientId;
    }
    if (fields.clientSecret !== undefined) {
      this.clientSecret = fields.clientSecret;
    }
    if (fields.jwtKeyId !== undefined) {
      this.jwtKeyId = fields.jwtKeyId;
    }
    if (fields.privateKey !== undefined) {
      this.privateKey = fields.privateKey;
    }
    if (fields.privateKeyPassphrase !== undefined) {
      this.privateKeyPassphrase = fields.privateKeyPassphrase;
    }
    if (fields.enterpriseId !== undefined) {
      this.enterpriseId = fields.enterpriseId;
    }
    if (fields.userId !== undefined) {
      this.userId = fields.userId;
    }
    if (fields.algorithm !== undefined) {
      this.algorithm = fields.algorithm;
    }
    if (fields.tokenStorage !== undefined) {
      this.tokenStorage = fields.tokenStorage;
    }
    if (fields.privateKeyDecryptor !== undefined) {
      this.privateKeyDecryptor = fields.privateKeyDecryptor;
    }
  }
  /**
   * Create an auth instance as defined by a string content of JSON file downloaded from the Box Developer Console.
   * See https://developer.box.com/en/guides/authentication/jwt/ for more information.
   * @param {string} configJsonString String content of JSON file containing the configuration.
   * @param {TokenStorage} tokenStorage Object responsible for storing token. If no custom implementation provided, the token will be stored in memory
   * @param {PrivateKeyDecryptor} privateKeyDecryptor Object responsible for decrypting private key for jwt auth. If no custom implementation provided, the DefaultPrivateKeyDecryptor will be used.
   * @returns {JwtConfig}
   */
  static fromConfigJsonString(
    configJsonString: string,
    tokenStorage?: TokenStorage,
    privateKeyDecryptor?: PrivateKeyDecryptor,
  ): JwtConfig {
    const configJson: JwtConfigFile = {
      ...deserializeJwtConfigFile(jsonToSerializedData(configJsonString)),
      rawData: jsonToSerializedData(configJsonString),
    };
    const tokenStorageToUse: undefined | TokenStorage =
      tokenStorage == void 0 ? new InMemoryTokenStorage({}) : tokenStorage;
    const privateKeyDecryptorToUse: undefined | PrivateKeyDecryptor =
      privateKeyDecryptor == void 0
        ? new DefaultPrivateKeyDecryptor({})
        : privateKeyDecryptor;
    const newConfig: JwtConfig = new JwtConfig({
      clientId: configJson.boxAppSettings.clientId,
      clientSecret: configJson.boxAppSettings.clientSecret,
      enterpriseId: configJson.enterpriseId,
      userId: configJson.userId,
      jwtKeyId: configJson.boxAppSettings.appAuth.publicKeyId,
      privateKey: configJson.boxAppSettings.appAuth.privateKey,
      privateKeyPassphrase: configJson.boxAppSettings.appAuth.passphrase,
      tokenStorage: tokenStorageToUse,
      privateKeyDecryptor: privateKeyDecryptorToUse,
    });
    return newConfig;
  }
  /**
   * Create an auth instance as defined by a JSON file downloaded from the Box Developer Console.
   * See https://developer.box.com/en/guides/authentication/jwt/ for more information.
   * @param {string} configFilePath Path to the JSON file containing the configuration.
   * @param {TokenStorage} tokenStorage Object responsible for storing token. If no custom implementation provided, the token will be stored in memory.
   * @param {PrivateKeyDecryptor} privateKeyDecryptor Object responsible for decrypting private key for jwt auth. If no custom implementation provided, the DefaultPrivateKeyDecryptor will be used.
   * @returns {JwtConfig}
   */
  static fromConfigFile(
    configFilePath: string,
    tokenStorage?: TokenStorage,
    privateKeyDecryptor?: PrivateKeyDecryptor,
  ): JwtConfig {
    const configJsonString: string = readTextFromFile(configFilePath);
    return JwtConfig.fromConfigJsonString(
      configJsonString,
      tokenStorage,
      privateKeyDecryptor,
    );
  }
}
export interface JwtConfigInput {
  /**
   * App client ID */
  readonly clientId: string;
  /**
   * App client secret */
  readonly clientSecret: string;
  /**
   * Public key ID */
  readonly jwtKeyId: string;
  /**
   * Private key */
  readonly privateKey: string;
  /**
   * Passphrase */
  readonly privateKeyPassphrase: string;
  /**
   * Enterprise ID */
  readonly enterpriseId?: string;
  /**
   * User ID */
  readonly userId?: string;
  readonly algorithm?: undefined | JwtAlgorithm;
  readonly tokenStorage?: TokenStorage;
  readonly privateKeyDecryptor?: PrivateKeyDecryptor;
}
export class BoxJwtAuth implements Authentication {
  /**
   * An object containing all JWT configuration to use for authentication */
  readonly config!: JwtConfig;
  /**
   * An object responsible for storing token. If no custom implementation provided, the token will be stored in memory. */
  readonly tokenStorage: TokenStorage;
  /**
   * The ID of the user or enterprise to authenticate as. If not provided, defaults to the enterprise ID if set, otherwise defaults to the user ID. */
  readonly subjectId?: string;
  /**
   * The type of the subject ID provided. Must be either 'user' or 'enterprise'. */
  readonly subjectType?: string;
  constructor(
    fields: Omit<
      BoxJwtAuth,
      | 'tokenStorage'
      | 'subjectId'
      | 'subjectType'
      | 'refreshToken'
      | 'retrieveToken'
      | 'retrieveAuthorizationHeader'
      | 'withUserSubject'
      | 'withEnterpriseSubject'
      | 'downscopeToken'
      | 'revokeToken'
    >,
  ) {
    if (fields.config !== undefined) {
      this.config = fields.config;
    }
    this.tokenStorage = this.config.tokenStorage;
    this.subjectId = !(this.config.enterpriseId == void 0)
      ? this.config.enterpriseId
      : this.config.userId;
    this.subjectType = !(this.config.enterpriseId == void 0)
      ? 'enterprise'
      : 'user';
  }
  /**
   * Get new access token using JWT auth.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async refreshToken(networkSession?: NetworkSession): Promise<AccessToken> {
    if (isBrowser()) {
      throw new BoxSdkError({
        message: 'JWT auth is not supported in browser environment.',
      });
    }
    const alg: JwtAlgorithm = !(this.config.algorithm == void 0)
      ? this.config.algorithm!
      : ('RS256' as JwtAlgorithm);
    const claims: {
      readonly [key: string]: any;
    } = {
      ['exp']: getEpochTimeInSeconds() + 30,
      ['box_sub_type']: this.subjectType,
    };
    const jwtOptions: JwtSignOptions = {
      algorithm: alg,
      audience: 'https://api.box.com/oauth2/token',
      subject: this.subjectId,
      issuer: this.config.clientId,
      jwtid: getUuid(),
      keyid: this.config.jwtKeyId,
      privateKeyDecryptor: this.config.privateKeyDecryptor,
    } satisfies JwtSignOptions;
    const jwtKey: JwtKey = {
      key: this.config.privateKey,
      passphrase: this.config.privateKeyPassphrase,
    } satisfies JwtKey;
    const assertion: string = await createJwtAssertion(
      claims,
      jwtKey,
      jwtOptions,
    );
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    const token: AccessToken = await authManager.requestAccessToken({
      grantType:
        'urn:ietf:params:oauth:grant-type:jwt-bearer' as PostOAuth2TokenGrantTypeField,
      assertion: assertion,
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
    } satisfies PostOAuth2Token);
    await this.tokenStorage.store(token);
    return token;
  }
  /**
   * Get the current access token. If the current access token is expired or not found, this method will attempt to refresh the token.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async retrieveToken(networkSession?: NetworkSession): Promise<AccessToken> {
    const oldToken: undefined | AccessToken = await this.tokenStorage.get();
    if (oldToken == void 0) {
      const newToken: AccessToken = await this.refreshToken(networkSession);
      return newToken;
    }
    return oldToken;
  }
  /**
   * @param {NetworkSession} networkSession
   * @returns {Promise<string>}
   */
  async retrieveAuthorizationHeader(
    networkSession?: NetworkSession,
  ): Promise<string> {
    const token: AccessToken = await this.retrieveToken(networkSession);
    return ''.concat('Bearer ', token.accessToken!) as string;
  }
  /**
   * Create a new BoxJWTAuth instance that uses the provided user ID as the subject of the JWT assertion.
   * May be one of this application's created App User. Depending on the configured User Access Level, may also be any other App User or Managed User in the enterprise.
   * <https://developer.box.com/en/guides/applications/>
   * <https://developer.box.com/en/guides/authentication/select/>
   * @param {string} userId The id of the user to authenticate
   * @param {TokenStorage} tokenStorage Object responsible for storing token in newly created BoxJWTAuth. If no custom implementation provided, the token will be stored in memory.
   * @returns {BoxJwtAuth}
   */
  withUserSubject(
    userId: string,
    tokenStorage: TokenStorage = new InMemoryTokenStorage({}),
  ): BoxJwtAuth {
    const newConfig: JwtConfig = new JwtConfig({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      enterpriseId: void 0,
      userId: userId,
      jwtKeyId: this.config.jwtKeyId,
      privateKey: this.config.privateKey,
      privateKeyPassphrase: this.config.privateKeyPassphrase,
      tokenStorage: tokenStorage,
    });
    const newAuth: BoxJwtAuth = new BoxJwtAuth({ config: newConfig });
    return newAuth;
  }
  /**
   * Create a new BoxJWTAuth instance that uses the provided enterprise ID as the subject of the JWT assertion.
   * @param {string} enterpriseId The id of the enterprise to authenticate
   * @param {TokenStorage} tokenStorage Object responsible for storing token in newly created BoxJWTAuth. If no custom implementation provided, the token will be stored in memory.
   * @returns {BoxJwtAuth}
   */
  withEnterpriseSubject(
    enterpriseId: string,
    tokenStorage: TokenStorage = new InMemoryTokenStorage({}),
  ): BoxJwtAuth {
    const newConfig: JwtConfig = new JwtConfig({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      enterpriseId: enterpriseId,
      userId: void 0,
      jwtKeyId: this.config.jwtKeyId,
      privateKey: this.config.privateKey,
      privateKeyPassphrase: this.config.privateKeyPassphrase,
      tokenStorage: tokenStorage,
    });
    const newAuth: BoxJwtAuth = new BoxJwtAuth({ config: newConfig });
    return newAuth;
  }
  /**
   * Downscope access token to the provided scopes. Returning a new access token with the provided scopes, with the original access token unchanged.
   * @param {readonly string[]} scopes The scope(s) to apply to the resulting token.
   * @param {string} resource The file or folder to get a downscoped token for. If None and shared_link None, the resulting token will not be scoped down to just a single item. The resource should be a full URL to an item, e.g. https://api.box.com/2.0/files/123456.
   * @param {string} sharedLink The shared link to get a downscoped token for. If None and item None, the resulting token will not be scoped down to just a single item.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async downscopeToken(
    scopes: readonly string[],
    resource?: string,
    sharedLink?: string,
    networkSession?: NetworkSession,
  ): Promise<AccessToken> {
    const token: undefined | AccessToken =
      await this.retrieveToken(networkSession);
    if (token == void 0) {
      throw new BoxSdkError({
        message:
          'No access token is available. Make an API call to retrieve a token before calling this method.',
      });
    }
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    const downscopedToken: AccessToken = await authManager.requestAccessToken({
      grantType:
        'urn:ietf:params:oauth:grant-type:token-exchange' as PostOAuth2TokenGrantTypeField,
      subjectToken: token.accessToken,
      subjectTokenType:
        'urn:ietf:params:oauth:token-type:access_token' as PostOAuth2TokenSubjectTokenTypeField,
      resource: resource,
      scope: scopes.join(' ') as string,
      boxSharedLink: sharedLink,
    } satisfies PostOAuth2Token);
    return downscopedToken;
  }
  /**
   * Revoke the current access token and remove it from token storage.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<undefined>}
   */
  async revokeToken(networkSession?: NetworkSession): Promise<undefined> {
    const oldToken: undefined | AccessToken = await this.tokenStorage.get();
    if (oldToken == void 0) {
      return void 0;
    }
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    await authManager.revokeAccessToken({
      token: oldToken.accessToken,
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
    } satisfies PostOAuth2Revoke);
    await this.tokenStorage.clear();
    return void 0;
  }
}
export function serializeJwtConfigAppSettingsAppAuth(
  val: JwtConfigAppSettingsAppAuth,
): SerializedData {
  return {
    ['publicKeyID']: val.publicKeyId,
    ['privateKey']: val.privateKey,
    ['passphrase']: val.passphrase,
  };
}
export function deserializeJwtConfigAppSettingsAppAuth(
  val: SerializedData,
): JwtConfigAppSettingsAppAuth {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "JwtConfigAppSettingsAppAuth"',
    });
  }
  if (val.publicKeyID == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "publicKeyID" of type "JwtConfigAppSettingsAppAuth" to be defined',
    });
  }
  if (!sdIsString(val.publicKeyID)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "publicKeyID" of type "JwtConfigAppSettingsAppAuth"',
    });
  }
  const publicKeyId: string = val.publicKeyID;
  if (val.privateKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "privateKey" of type "JwtConfigAppSettingsAppAuth" to be defined',
    });
  }
  if (!sdIsString(val.privateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "privateKey" of type "JwtConfigAppSettingsAppAuth"',
    });
  }
  const privateKey: string = val.privateKey;
  if (val.passphrase == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "passphrase" of type "JwtConfigAppSettingsAppAuth" to be defined',
    });
  }
  if (!sdIsString(val.passphrase)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "passphrase" of type "JwtConfigAppSettingsAppAuth"',
    });
  }
  const passphrase: string = val.passphrase;
  return {
    publicKeyId: publicKeyId,
    privateKey: privateKey,
    passphrase: passphrase,
  } satisfies JwtConfigAppSettingsAppAuth;
}
export function serializeJwtConfigAppSettings(
  val: JwtConfigAppSettings,
): SerializedData {
  return {
    ['clientID']: val.clientId,
    ['clientSecret']: val.clientSecret,
    ['appAuth']: serializeJwtConfigAppSettingsAppAuth(val.appAuth),
  };
}
export function deserializeJwtConfigAppSettings(
  val: SerializedData,
): JwtConfigAppSettings {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "JwtConfigAppSettings"',
    });
  }
  if (val.clientID == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "clientID" of type "JwtConfigAppSettings" to be defined',
    });
  }
  if (!sdIsString(val.clientID)) {
    throw new BoxSdkError({
      message: 'Expecting string for "clientID" of type "JwtConfigAppSettings"',
    });
  }
  const clientId: string = val.clientID;
  if (val.clientSecret == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "clientSecret" of type "JwtConfigAppSettings" to be defined',
    });
  }
  if (!sdIsString(val.clientSecret)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "clientSecret" of type "JwtConfigAppSettings"',
    });
  }
  const clientSecret: string = val.clientSecret;
  if (val.appAuth == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "appAuth" of type "JwtConfigAppSettings" to be defined',
    });
  }
  const appAuth: JwtConfigAppSettingsAppAuth =
    deserializeJwtConfigAppSettingsAppAuth(val.appAuth);
  return {
    clientId: clientId,
    clientSecret: clientSecret,
    appAuth: appAuth,
  } satisfies JwtConfigAppSettings;
}
export function serializeJwtConfigFile(val: JwtConfigFile): SerializedData {
  return {
    ['enterpriseID']: val.enterpriseId,
    ['userID']: val.userId,
    ['boxAppSettings']: serializeJwtConfigAppSettings(val.boxAppSettings),
  };
}
export function deserializeJwtConfigFile(val: SerializedData): JwtConfigFile {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "JwtConfigFile"' });
  }
  if (!(val.enterpriseID == void 0) && !sdIsString(val.enterpriseID)) {
    throw new BoxSdkError({
      message: 'Expecting string for "enterpriseID" of type "JwtConfigFile"',
    });
  }
  const enterpriseId: undefined | string =
    val.enterpriseID == void 0 ? void 0 : val.enterpriseID;
  if (!(val.userID == void 0) && !sdIsString(val.userID)) {
    throw new BoxSdkError({
      message: 'Expecting string for "userID" of type "JwtConfigFile"',
    });
  }
  const userId: undefined | string = val.userID == void 0 ? void 0 : val.userID;
  if (val.boxAppSettings == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "boxAppSettings" of type "JwtConfigFile" to be defined',
    });
  }
  const boxAppSettings: JwtConfigAppSettings = deserializeJwtConfigAppSettings(
    val.boxAppSettings,
  );
  return {
    enterpriseId: enterpriseId,
    userId: userId,
    boxAppSettings: boxAppSettings,
  } satisfies JwtConfigFile;
}
