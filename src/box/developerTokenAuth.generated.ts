import { PostOAuth2TokenGrantTypeField } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2TokenSubjectTokenTypeField } from '../schemas/postOAuth2Token.generated.js';
import { AccessToken } from '../schemas/accessToken.generated.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { BoxSdkError } from './errors.js';
import { TokenStorage } from './tokenStorage.generated.js';
import { InMemoryTokenStorage } from './tokenStorage.generated.js';
import { AuthorizationManager } from '../managers/authorization.generated.js';
import { PostOAuth2Token } from '../schemas/postOAuth2Token.generated.js';
import { PostOAuth2Revoke } from '../schemas/postOAuth2Revoke.generated.js';
export interface DeveloperTokenConfig {
  readonly clientId?: string;
  readonly clientSecret?: string;
}
export class BoxDeveloperTokenAuth implements Authentication {
  readonly token!: string;
  /**
   * Configuration object of DeveloperTokenAuth. */
  readonly config: DeveloperTokenConfig = {} satisfies DeveloperTokenConfig;
  /**
   * An object responsible for storing token. If no custom implementation provided, the token will be stored in memory. */
  readonly tokenStorage: TokenStorage;
  constructor(
    fields: Omit<
      BoxDeveloperTokenAuth,
      | 'tokenStorage'
      | 'config'
      | 'retrieveToken'
      | 'refreshToken'
      | 'retrieveAuthorizationHeader'
      | 'revokeToken'
      | 'downscopeToken'
    > &
      Partial<Pick<BoxDeveloperTokenAuth, 'config'>>,
  ) {
    if (fields.token !== undefined) {
      this.token = fields.token;
    }
    if (fields.config !== undefined) {
      this.config = fields.config;
    }
    this.tokenStorage = new InMemoryTokenStorage({
      token: { accessToken: this.token } satisfies AccessToken,
    });
  }
  /**
   * Retrieves stored developer token
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async retrieveToken(networkSession?: NetworkSession): Promise<AccessToken> {
    const token: undefined | AccessToken = await this.tokenStorage.get();
    if (token == void 0) {
      throw new BoxSdkError({ message: 'No access token is available.' });
    }
    return token!;
  }
  /**
   * Developer token cannot be refreshed
   * @param {NetworkSession} networkSession An object to keep network session state
   * @returns {Promise<AccessToken>}
   */
  async refreshToken(networkSession?: NetworkSession): Promise<AccessToken> {
    throw new BoxSdkError({
      message: 'Developer token has expired. Please provide a new one.',
    });
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
    await this.tokenStorage.clear();
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
