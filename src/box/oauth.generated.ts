import { PostOAuth2TokenGrantTypeField } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2TokenSubjectTokenTypeField } from '../schemas/postOAuth2Token.generated.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { AccessToken } from '../schemas/accessToken.generated.js';
import { PostOAuth2Token } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2Revoke } from '../schemas/postOAuth2Revoke.generated.js';
import { AuthorizationManager } from '../managers/authorization.generated.js';
import { TokenStorage } from './tokenStorage.generated.js';
import { InMemoryTokenStorage } from './tokenStorage.generated.js';
import { sdToUrlParams } from '../serialization/json.js';
import { prepareParams } from '../internal/utils.js';
import { BoxSdkError } from './errors.js';
import { SerializedData } from '../serialization/json.js';
export class OAuthConfig {
  readonly clientId!: string;
  readonly clientSecret!: string;
  readonly tokenStorage: TokenStorage = new InMemoryTokenStorage({});
  constructor(
    fields: Omit<OAuthConfig, 'tokenStorage'> &
      Partial<Pick<OAuthConfig, 'tokenStorage'>>,
  ) {
    if (fields.clientId !== undefined) {
      this.clientId = fields.clientId;
    }
    if (fields.clientSecret !== undefined) {
      this.clientSecret = fields.clientSecret;
    }
    if (fields.tokenStorage !== undefined) {
      this.tokenStorage = fields.tokenStorage;
    }
  }
}
export interface OAuthConfigInput {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly tokenStorage?: TokenStorage;
}
export interface GetAuthorizeUrlOptions {
  /**
   * Box API key used for identifying the application the user is authenticating with */
  readonly clientId?: string;
  /**
   * The URI to which Box redirects the browser after the user has granted or denied the application permission. This URI match one of the redirect URIs in the configuration of your application. */
  readonly redirectUri?: string;
  /**
   * The type of response we would like to receive. */
  readonly responseType?: string;
  /**
   * A custom string of your choice. Box will pass the same string to the redirect URL when authentication is complete. This parameter can be used to identify a user on redirect, as well as protect against hijacked sessions and other exploits. */
  readonly state?: string;
  /**
   * A space-separated list of application scopes you'd like to authenticate the user for. This defaults to all the scopes configured for the application in its configuration page. */
  readonly scope?: string;
}
export class BoxOAuth implements Authentication {
  /**
   * Configuration object of OAuth. */
  readonly config!: OAuthConfig;
  /**
   * An object responsible for storing token. If no custom implementation provided, the token will be stored in memory. */
  readonly tokenStorage: TokenStorage;
  constructor(
    fields: Omit<
      BoxOAuth,
      | 'tokenStorage'
      | 'getAuthorizeUrl'
      | 'getTokensAuthorizationCodeGrant'
      | 'retrieveToken'
      | 'refreshToken'
      | 'retrieveAuthorizationHeader'
      | 'revokeToken'
      | 'downscopeToken'
    >,
  ) {
    if (fields.config !== undefined) {
      this.config = fields.config;
    }
    this.tokenStorage = this.config.tokenStorage;
  }
  /**
   * Get the authorization URL for the app user.
   * @param {GetAuthorizeUrlOptions} options
   * @returns {string}
   */
  getAuthorizeUrl(
    options: GetAuthorizeUrlOptions = {} satisfies GetAuthorizeUrlOptions,
  ): string {
    const paramsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['client_id']: !(options.clientId == void 0)
        ? options.clientId
        : this.config.clientId,
      ['response_type']: !(options.responseType == void 0)
        ? options.responseType
        : 'code',
      ['redirect_uri']: options.redirectUri,
      ['state']: options.state,
      ['scope']: options.scope,
    });
    return ''.concat(
      'https://account.box.com/api/oauth2/authorize?',
      sdToUrlParams(JSON.stringify(paramsMap) as SerializedData),
    ) as string;
  }
  /**
   * Acquires token info using an authorization code.
   * @param {string} authorizationCode The authorization code to use to get tokens.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async getTokensAuthorizationCodeGrant(
    authorizationCode: string,
    networkSession?: NetworkSession,
  ): Promise<AccessToken> {
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    const token: AccessToken = await authManager.requestAccessToken({
      grantType: 'authorization_code' as PostOAuth2TokenGrantTypeField,
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      code: authorizationCode,
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
    const token: undefined | AccessToken = await this.tokenStorage.get();
    if (token == void 0) {
      throw new BoxSdkError({
        message:
          'Access and refresh tokens not available. Authenticate before making any API call first.',
      });
    }
    return token!;
  }
  /**
   * Get a new access token for the platform app user.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async refreshToken(networkSession?: NetworkSession): Promise<AccessToken> {
    const oldToken: undefined | AccessToken = await this.tokenStorage.get();
    const tokenUsedForRefresh: undefined | string = !(oldToken == void 0)
      ? oldToken!.refreshToken
      : void 0;
    const authManager: AuthorizationManager = new AuthorizationManager({
      networkSession: !(networkSession == void 0)
        ? networkSession!
        : new NetworkSession({}),
    });
    const token: AccessToken = await authManager.requestAccessToken({
      grantType: 'refresh_token' as PostOAuth2TokenGrantTypeField,
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      refreshToken: tokenUsedForRefresh,
    } satisfies PostOAuth2Token);
    await this.tokenStorage.store(token);
    return token;
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
   * Revoke an active Access Token, effectively logging a user out that has been previously authenticated.
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<undefined>}
   */
  async revokeToken(networkSession?: NetworkSession): Promise<undefined> {
    const token: undefined | AccessToken = await this.tokenStorage.get();
    if (token == void 0) {
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
      token: token!.accessToken,
    } satisfies PostOAuth2Revoke);
    return void 0;
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
    if (token == void 0 || token!.accessToken == void 0) {
      throw new BoxSdkError({ message: 'No access token is available.' });
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
}
