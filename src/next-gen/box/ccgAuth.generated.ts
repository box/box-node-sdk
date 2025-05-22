import { PostOAuth2TokenGrantTypeField } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2TokenSubjectTokenTypeField } from '../schemas/postOAuth2Token.generated.js';
import { AccessToken } from '../schemas/accessToken.generated.js';
import { PostOAuth2TokenBoxSubjectTypeField } from '../schemas/postOAuth2Token.generated.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { TokenStorage } from './tokenStorage.generated.js';
import { InMemoryTokenStorage } from './tokenStorage.generated.js';
import { AuthorizationManager } from '../managers/authorization.generated.js';
import { BoxSdkError } from './errors.js';
import { PostOAuth2Token } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2Revoke } from '../schemas/postOAuth2Revoke.generated.js';
export class CcgConfig {
  /**
   * Box API key used for identifying the application the user is authenticating with */
  readonly clientId!: string;
  /**
   * Box API secret used for making auth requests. */
  readonly clientSecret!: string;
  /**
   * The ID of the Box Developer Edition enterprise. */
  readonly enterpriseId?: string;
  /**
   * The user id to authenticate. This value is not required. But if it is provided, then the user will be auto-authenticated at the time of the first API call. */
  readonly userId?: string;
  /**
   * Object responsible for storing token. If no custom implementation provided,the token will be stored in memory. */
  readonly tokenStorage: TokenStorage = new InMemoryTokenStorage({});
  constructor(
    fields: Omit<CcgConfig, 'tokenStorage'> &
      Partial<Pick<CcgConfig, 'tokenStorage'>>,
  ) {
    if (fields.clientId !== undefined) {
      this.clientId = fields.clientId;
    }
    if (fields.clientSecret !== undefined) {
      this.clientSecret = fields.clientSecret;
    }
    if (fields.enterpriseId !== undefined) {
      this.enterpriseId = fields.enterpriseId;
    }
    if (fields.userId !== undefined) {
      this.userId = fields.userId;
    }
    if (fields.tokenStorage !== undefined) {
      this.tokenStorage = fields.tokenStorage;
    }
  }
}
export interface CcgConfigInput {
  /**
   * Box API key used for identifying the application the user is authenticating with */
  readonly clientId: string;
  /**
   * Box API secret used for making auth requests. */
  readonly clientSecret: string;
  /**
   * The ID of the Box Developer Edition enterprise. */
  readonly enterpriseId?: string;
  /**
   * The user id to authenticate. This value is not required. But if it is provided, then the user will be auto-authenticated at the time of the first API call. */
  readonly userId?: string;
  /**
   * Object responsible for storing token. If no custom implementation provided,the token will be stored in memory. */
  readonly tokenStorage?: TokenStorage;
}
export class BoxCcgAuth implements Authentication {
  /**
   * Configuration object of Client Credentials Grant auth. */
  readonly config!: CcgConfig;
  /**
   * An object responsible for storing token. If no custom implementation provided, the token will be stored in memory. */
  readonly tokenStorage: TokenStorage;
  /**
   * The ID of the user or enterprise to authenticate as. If not provided, defaults to the enterprise ID if set, otherwise defaults to the user ID. */
  readonly subjectId?: string;
  /**
   * The type of the subject ID provided. Must be either 'user' or 'enterprise'. */
  readonly subjectType?: PostOAuth2TokenBoxSubjectTypeField;
  constructor(
    fields: Omit<
      BoxCcgAuth,
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
    this.subjectId = !(this.config.userId == void 0)
      ? this.config.userId
      : this.config.enterpriseId;
    this.subjectType = !(this.config.userId == void 0)
      ? ('user' as PostOAuth2TokenBoxSubjectTypeField)
      : ('enterprise' as PostOAuth2TokenBoxSubjectTypeField);
  }
  /**
   * Get a new access token using CCG auth
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async refreshToken(networkSession?: NetworkSession): Promise<AccessToken> {
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    const token: AccessToken = await authManager.requestAccessToken({
      grantType: 'client_credentials' as PostOAuth2TokenGrantTypeField,
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      boxSubjectType: this.subjectType,
      boxSubjectId: this.subjectId,
    } satisfies PostOAuth2Token);
    await this.tokenStorage.store(token);
    return token;
  }
  /**
   * Return a current token or get a new one when not available.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async retrieveToken(networkSession?: NetworkSession): Promise<AccessToken> {
    const oldToken: undefined | AccessToken = await this.tokenStorage.get();
    if (oldToken == void 0) {
      const newToken: AccessToken = await this.refreshToken(networkSession);
      return newToken;
    }
    return oldToken!;
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
   * Create a new BoxCCGAuth instance that uses the provided user ID as the subject ID.
   * May be one of this application's created App User. Depending on the configured User Access Level, may also be any other App User or Managed User in the enterprise.
   * <https://developer.box.com/en/guides/applications/>
   * <https://developer.box.com/en/guides/authentication/select/>
   * @param {string} userId The id of the user to authenticate
   * @param {TokenStorage} tokenStorage Object responsible for storing token in newly created BoxCCGAuth. If no custom implementation provided, the token will be stored in memory.
   * @returns {BoxCcgAuth}
   */
  withUserSubject(
    userId: string,
    tokenStorage: TokenStorage = new InMemoryTokenStorage({}),
  ): BoxCcgAuth {
    const newConfig: CcgConfig = new CcgConfig({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      enterpriseId: this.config.enterpriseId,
      userId: userId,
      tokenStorage: tokenStorage,
    });
    return new BoxCcgAuth({ config: newConfig });
  }
  /**
   * Create a new BoxCCGAuth instance that uses the provided enterprise ID as the subject ID.
   * @param {string} enterpriseId The id of the enterprise to authenticate
   * @param {TokenStorage} tokenStorage Object responsible for storing token in newly created BoxCCGAuth. If no custom implementation provided, the token will be stored in memory.
   * @returns {BoxCcgAuth}
   */
  withEnterpriseSubject(
    enterpriseId: string,
    tokenStorage: TokenStorage = new InMemoryTokenStorage({}),
  ): BoxCcgAuth {
    const newConfig: CcgConfig = new CcgConfig({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      enterpriseId: enterpriseId,
      userId: void 0,
      tokenStorage: tokenStorage,
    });
    return new BoxCcgAuth({ config: newConfig });
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
    const token: undefined | AccessToken = await this.tokenStorage.get();
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
      subjectToken: token!.accessToken,
      subjectTokenType:
        'urn:ietf:params:oauth:token-type:access_token' as PostOAuth2TokenSubjectTokenTypeField,
      scope: scopes.join(' ') as string,
      resource: resource,
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
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      token: oldToken!.accessToken,
    } satisfies PostOAuth2Revoke);
    await this.tokenStorage.clear();
    return void 0;
  }
}
