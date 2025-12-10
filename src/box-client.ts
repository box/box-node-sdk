/**
 * @fileoverview Box API Client
 * @deprecated This BoxClient class and the entire manual/legacy sdk package is deprecated and will be removed in the future version.
 * It is recommended to use BoxClient from sdk-gen package instead.
 */

import { Promise } from 'bluebird';
// ------------------------------------------------------------------------------
// API Resource Managers
// ------------------------------------------------------------------------------
import AI from './managers/ai.generated';
import CollaborationAllowlist from './managers/collaboration-allowlist';
import Collaborations from './managers/collaborations';
import Collections from './managers/collections';
import Comments from './managers/comments';
import DevicePins from './managers/device-pins';
import Enterprise from './managers/enterprise';
import Events from './managers/events';
import Files from './managers/files';
import Folders from './managers/folders';
import Groups from './managers/groups';
import LegalHoldPolicies from './managers/legal-hold-policies';
import Metadata from './managers/metadata';
import RecentItems from './managers/recent-items';
import RetentionPolicies from './managers/retention-policies';
import Search from './managers/search';
import SharedItems from './managers/shared-items';
import SignRequests from './managers/sign-requests.generated';
import SignTemplates from './managers/sign-templates.generated';
import StoragePolicies from './managers/storage-policies';
import Tasks from './managers/tasks';
import TermsOfService from './managers/terms-of-service';
import Trash from './managers/trash';
import Users from './managers/users';
import WebLinks from './managers/web-links';
import Webhooks from './managers/webhooks';
import FileRequestsManager from './managers/file-requests-manager';
import ShieldInformationBarriers from './managers/shield-information-barriers.generated';
import ShieldInformationBarrierSegments from './managers/shield-information-barrier-segments.generated';
import ShieldInformationBarrierSegmentMembers from './managers/shield-information-barrier-segment-members.generated';
import ShieldInformationBarrierSegmentRestrictions from './managers/shield-information-barrier-segment-restrictions.generated';
import ShieldInformationBarrierReports from './managers/shield-information-barrier-reports.generated';
import IntegrationMappings from './managers/integration-mappings';

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * A collaboration role constant
 * @typedef {string} CollaborationRole
 */
type CollaborationRole = string;

/**
 * A Box file or folder type constant
 * @typedef {string} ItemType
 */
type ItemType = 'file' | 'folder';

/**
 * An access level constant. Used for setting and updating shared links, folder upload, etc.
 * @typedef {?Object} AccessLevel
 */
type AccessLevel = object | null /* FIXME */;

type APISession = any /* FIXME */;
type APIRequestManager = any /* FIXME */;

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
import util from 'util';
import * as qs from 'querystring';
import errors from './util/errors';
const httpStatusCodes = require('http-status');
import { isIP } from 'net';
import merge from 'merge-options';
import PagingIterator from './util/paging-iterator';
const pkg = require('../package.json');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// The Authorization header label
var HEADER_AUTHORIZATION = 'Authorization',
  // Prefix our token with this string in the Authorization header
  HEADER_AUTHORIZATION_PREFIX = 'Bearer ',
  // The 'BoxApi' header label
  HEADER_BOXAPI = 'BoxApi',
  // The XFF header label - Used to give the API better information for uploads, rate-limiting, etc.
  HEADER_XFF = 'X-Forwarded-For',
  // As-User header
  HEADER_AS_USER = 'As-User',
  // Range of SUCCESS http status codes
  HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE = [200, 299];

/**
 * Build the 'Authorization' Header for the API
 *
 * @param {string} accessToken An OAuth Access Token
 * @returns {string} A properly formatted 'Authorization' header
 * @private
 */
function buildAuthorizationHeader(accessToken: string) {
  return HEADER_AUTHORIZATION_PREFIX + accessToken;
}

/**
 * Returns true iff the response is a 401 UNAUTHORIZED that is caused by an expired access token.
 * @param {APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
 * @returns {boolean} - true iff the response is a 401 UNAUTHORIZED caused by an expired access token
 * @private
 */
function isUnauthorizedDueToExpiredAccessToken(response: any /* FIXME */) {
  // There are three cases to consider:
  // 1) The response body is a Buffer. This indicates that the request was malformed (i.e. malformed url) so return false.
  // 2) The status code is UNAUTHORIZED and the response body is an empty object or null. This indicates that the access tokens are expired, so return true.
  // 3) The status code is UNAUTHORIZED and the response body is a non-empty object. This indicates that the 401 was returned for some reason other
  //    than expired tokens, so return false.

  if (Buffer.isBuffer(response.body)) {
    return false;
  }

  var isResponseStatusCodeUnauthorized =
      response.statusCode === httpStatusCodes.UNAUTHORIZED,
    isResponseBodyEmpty =
      !response.body || Object.getOwnPropertyNames(response.body).length === 0;
  return isResponseStatusCodeUnauthorized && isResponseBodyEmpty;
}

/**
 * Returns a full URL. If the url argument begins with http:// or https://, then url is simply returned.
 * Otherwise, the defaultBasePath is prepended to url and returned.
 *
 * @param {string} defaultBasePath The default root URL that will be prepended if `url` is a partial url
 * @param {string} url A full or partial URL that will be used to construct the final URL
 * @returns {string} The final URL
 * @private
 */
function getFullURL(defaultBasePath: string, url: string) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  return defaultBasePath + url;
}

/**
 * Construct the X-Box-UA header to send analytics identifiers
 * @param {Object} [client] Analytics client information
 * @returns {string} The header value
 */
function constructBoxUAHeader(client: any /* FIXME */) {
  var analyticsIdentifiers = {
    agent: `box-node-sdk/${pkg.version}`,
    env: `Node/${process.version.replace('v', '')}`,
  } as Record<string, string>;

  if (client) {
    analyticsIdentifiers.client = `${client.name}/${client.version}`;
  }

  return Object.keys(analyticsIdentifiers)
    .map((k) => `${k}=${analyticsIdentifiers[k]}`)
    .join('; ');
}

/**
 * @deprecated This BoxClient class and the entire manual/legacy SDK package is deprecated and will be removed in the future version.
 * It is recommended to use BoxClient from sdk-gen package instead.
 */
class BoxClient {
  _session: APISession;
  _requestManager: APIRequestManager;
  _customHeaders: any;

  _baseURL: any;
  _uploadBaseURL: any;
  _uploadRequestTimeoutMS: any;
  _useIterators: any;
  _analyticsClient: any;
  _tokenOptions: any;

  ai: AI;
  users: any;
  files: Files;
  fileRequests: FileRequestsManager;
  folders: Folders;
  comments: any;
  collaborations: Collaborations;
  groups: any;
  sharedItems: any;
  metadata: any;
  collections: any;
  events: Events;
  search: any;
  tasks: any;
  trash: any;
  enterprise: any;
  legalHoldPolicies: any;
  weblinks: any;
  retentionPolicies: any;
  devicePins: any;
  webhooks: Webhooks;
  recentItems: any;
  collaborationAllowlist: any;
  termsOfService: any;
  storagePolicies: any;
  signRequests: SignRequests;
  signTemplates: SignTemplates;
  shieldInformationBarriers: ShieldInformationBarriers;
  shieldInformationBarrierSegments: ShieldInformationBarrierSegments;
  shieldInformationBarrierSegmentMembers: ShieldInformationBarrierSegmentMembers;
  shieldInformationBarrierSegmentRestrictions: ShieldInformationBarrierSegmentRestrictions;
  shieldInformationBarrierReports: ShieldInformationBarrierReports;
  integrationMappings: IntegrationMappings;

  /* prototype properties assigned below the class declaration */
  collaborationRoles!: Record<string, CollaborationRole>;
  itemTypes!: Record<string, ItemType>;
  accessLevels!: Record<string, AccessLevel>;
  CURRENT_USER_ID!: string;

  /**
   * The BoxClient can make API calls on behalf of a valid API Session. It is responsible
   * for formatting the requests and handling the response. Its goal is to deliver
   * sensible results to the user.
   *
   * @param {APISession} apiSession An initialized API Session, used to get/revoke tokens and handle
   * unauthorized responses from the API.
   * @param {Config} config The SDK configuration options
   * @param {APIRequestManager} requestManager The API Request Manager
   * @constructor
   */
  constructor(
    apiSession: APISession,
    config: any /* FIXME */,
    requestManager: APIRequestManager
  ) {
    // Runtime deprecation warning
    process.emitWarning(
      'DEPRECATION WARNING: This BoxClient class and the entire manual/legacy SDK package is deprecated and will be removed in the future version. ' +
        'Please use the new BoxClient from "box-node-sdk/sdk-gen/client" instead. '
    );

    // the API Session used by the client for authentication
    this._session = apiSession;

    // Attach a request manager instance for making requests
    this._requestManager = requestManager;

    // An object of custom headers to apply to every request. Modified via BoxClient.setCustomHeader().
    this._customHeaders = {};
    // Attach the configured properties
    this._baseURL = util.format('%s/%s', config.apiRootURL, config.apiVersion);
    this._uploadBaseURL = util.format(
      '%s/%s',
      config.uploadAPIRootURL,
      config.apiVersion
    );
    this._uploadRequestTimeoutMS = config.uploadRequestTimeoutMS;
    this._useIterators = config.iterators;
    this._analyticsClient = config.analyticsClient;

    // Attach API Resource Managers
    this.ai = new AI(this);
    this.users = new Users(this);
    this.files = new Files(this);
    this.fileRequests = new FileRequestsManager(this);
    this.folders = new Folders(this);
    this.comments = new Comments(this);
    this.collaborations = new Collaborations(this);
    this.groups = new Groups(this);
    this.sharedItems = new SharedItems(this);
    this.metadata = new Metadata(this);
    this.collections = new Collections(this);
    this.events = new Events(this);
    this.search = new Search(this);
    this.tasks = new Tasks(this);
    this.trash = new Trash(this);
    this.enterprise = new Enterprise(this);
    this.legalHoldPolicies = new LegalHoldPolicies(this);
    this.weblinks = new WebLinks(this);
    this.retentionPolicies = new RetentionPolicies(this);
    this.devicePins = new DevicePins(this);
    this.webhooks = new Webhooks(this);
    this.recentItems = new RecentItems(this);
    this.collaborationAllowlist = new CollaborationAllowlist(this);
    this.termsOfService = new TermsOfService(this);
    this.storagePolicies = new StoragePolicies(this);
    this.signRequests = new SignRequests(this);
    this.signTemplates = new SignTemplates(this);
    this.shieldInformationBarriers = new ShieldInformationBarriers(this);
    this.shieldInformationBarrierSegments =
      new ShieldInformationBarrierSegments(this);
    this.shieldInformationBarrierSegmentMembers =
      new ShieldInformationBarrierSegmentMembers(this);
    this.shieldInformationBarrierSegmentRestrictions =
      new ShieldInformationBarrierSegmentRestrictions(this);
    this.shieldInformationBarrierReports = new ShieldInformationBarrierReports(
      this
    );
    this.integrationMappings = new IntegrationMappings(this);
  }

  /**
   * Returns an object containing the given headers as well as other headers (like the authorization header and
   * custom headers) that should be included in a request.
   * @param {?Object} callerHeaders - headers that the caller wishes to include in the request. This method will not
   * override these headers with its own. Thus, if all the headers that this method was planning to add are already
   * specified here, this method will return an object with exactly the same headers.
   * @param {string} accessToken - the access token that will be used to make the request
   * @returns {Object} - a new object with the headers needed for the request
   * @private
   */
  _createHeadersForRequest(callerHeaders: object | null, accessToken: string) {
    var headers: Record<string, string> = {};

    // 'Authorization' - contains your valid access token for authorization
    headers[HEADER_AUTHORIZATION] = buildAuthorizationHeader(accessToken);

    // We copy our own custom headers (XFF, BoxApi, etc.) before copying over the caller-specified headers so that
    // the caller-specified headers will take precedence.
    Object.assign(headers, this._customHeaders, callerHeaders);

    // Add analytics headers last so they cannot be overwritten
    Object.assign(headers, {
      'X-Box-UA': constructBoxUAHeader(this._analyticsClient),
    });

    return headers;
  }

  /**
   * Makes an API request to the Box API on behalf of the client. Before executing
   * the request, it first ensures the user has usable tokens. Will be called again
   * if the request returns a temporary error. Will propogate error if request returns
   * a permanent error, or if usable tokens are not available.
   *
   * @param {Object} params - Request lib params to configure the request
   * @param {Function} [callback] - passed response data
   * @returns {Promise} Promise resolving to the response
   * @private
   */
  _makeRequest(params: any /* FIXME */, callback?: Function) {
    var promise = this._session
      .getAccessToken(this._tokenOptions)
      .then((accessToken: string) => {
        params.headers = this._createHeadersForRequest(
          params.headers,
          accessToken
        );

        if (params.streaming) {
          // streaming is specific to the SDK, so delete it from params before continuing
          delete params.streaming;
          var responseStream =
            this._requestManager.makeStreamingRequest(params);
          // Listen to 'response' event, so we can cleanup the token store in case when the request is unauthorized
          // due to expired access token
          responseStream.on('response', (response: any /* FIXME */) => {
            if (isUnauthorizedDueToExpiredAccessToken(response)) {
              var expiredTokensError = errors.buildAuthError(response);

              // Give the session a chance to handle the error (ex: a persistent session will clear the token store)
              if (this._session.handleExpiredTokensError) {
                this._session.handleExpiredTokensError(expiredTokensError);
              }
            }
          });

          return responseStream;
        }

        // Make the request to Box, and perform standard response handling
        return this._requestManager.makeRequest(params);
      });

    return promise
      .then((response: any /* FIXME */) => {
        if (!response.statusCode) {
          // Response is not yet complete, and is just a stream that will return the response later
          // Just return the stream, since it doesn't need further response handling
          return response;
        }

        if (isUnauthorizedDueToExpiredAccessToken(response)) {
          var expiredTokensError = errors.buildAuthError(response);

          // Give the session a chance to handle the error (ex: a persistent session will clear the token store)
          if (this._session.handleExpiredTokensError) {
            return this._session.handleExpiredTokensError(expiredTokensError);
          }

          throw expiredTokensError;
        }

        return response;
      })
      .asCallback(callback);
  }

  /**
   * Set a custom header. A custom header is applied to every request for the life of the client. To
   * remove a header, set it's value to null.
   *
   * @param {string} header The name of the custom header to set.
   * @param {*} value The value of the custom header. Set to null to remove the given header.
   * @returns {void}
   */
  setCustomHeader(header: string, value: any) {
    if (value) {
      this._customHeaders[header] = value;
    } else {
      delete this._customHeaders[header];
    }
  }

  /**
   * Sets the list of requesting IP addresses for the X-Forwarded-For header. Used to give the API
   * better information for uploads, rate-limiting, etc.
   *
   * @param {string[]} ips - Array of IP Addresses
   * @returns {void}
   */
  setIPs(ips: string[]) {
    var validIPs = ips.filter((ipString: string) => isIP(ipString)).join(', ');

    this.setCustomHeader(HEADER_XFF, validIPs);

    this._tokenOptions = { ip: validIPs };
  }

  /**
   * Sets the shared item context on the API Session. Overwrites any current context.
   *
   * @param {string} url The shared link url
   * @param {?string} password The shared link password, null if no password exists.
   * @returns {void}
   */
  setSharedContext(url: string, password: string | null) {
    var sharedContextAuthHeader = this.buildSharedItemAuthHeader(url, password);
    this.setCustomHeader(HEADER_BOXAPI, sharedContextAuthHeader);
  }

  /**
   * Removes any current shared item context from API Session.
   *
   * @returns {void}
   */
  revokeSharedContext() {
    this.setCustomHeader(HEADER_BOXAPI, null);
  }

  /**
   * Set up the As-User context, which is used by enterprise admins to
   * impersonate their managed users and perform actions on their behalf.
   *
   * @param {string} userID - The ID of the user to impersonate
   * @returns {void}
   */
  asUser(userID: string) {
    this.setCustomHeader(HEADER_AS_USER, userID);
  }

  /**
   * Revoke the As-User context and return to making calls on behalf of the user
   * who owns the client's access token.
   *
   * @returns {void}
   */
  asSelf() {
    this.setCustomHeader(HEADER_AS_USER, null);
  }

  /**
   * Revokes the client's access tokens. The client will no longer be tied to a user
   * and will be unable to make calls to the API, rendering it effectively useless.
   *
   * @param {Function} [callback] Called after revoking, with an error if one existed
   * @returns {Promise} A promise resolving when the client's access token is revoked
   */
  revokeTokens(callback: Function) {
    return this._session.revokeTokens(this._tokenOptions).asCallback(callback);
  }

  /**
   * Exchange the client access token for one with lower scope
   * @param {string|string[]} scopes The scope(s) requested for the new token
   * @param {string} [resource] The absolute URL of an API resource to scope the new token to
   * @param {Object} [options] - Optional parameters
   * @param {ActorParams} [options.actor] - Optional actor parameters for creating annotator tokens with Token Auth client
   * @param {SharedLinkParams} [options.sharedLink] - Optional shared link parameters for creating tokens using shared links
   * @param {Function} [callback] Called with the new token
   * @returns {Promise<TokenInfo>} A promise resolving to the exchanged token info
   */
  exchangeToken(
    scopes: string | string[],
    resource?: string,
    options?: Function | object,
    callback?: Function
  ) {
    // Shuffle optional parameters
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    var opts = Object.assign(
      { tokenRequestOptions: this._tokenOptions || null },
      options
    );

    return this._session
      .exchangeToken(scopes, resource, opts)
      .asCallback(callback);
  }

  /**
   * Makes GET request to Box API V2 endpoint
   *
   * @param {string} path - path to a certain API endpoint (ex: /file)
   * @param {?Object} params - object containing parameters for the request, such as query strings and headers
   * @param {Function} [callback] - passed final API response or err if request failed
   * @returns {void}
   */
  get(path: string, params?: object | null, callback?: Function) {
    var newParams = merge({}, params || {});
    newParams.method = 'GET';
    newParams.url = getFullURL(this._baseURL, path);

    return this._makeRequest(newParams, callback);
  }

  /**
   * Makes POST request to Box API V2 endpoint
   *
   * @param {string} path - path to a certain API endpoint (ex: /file)
   * @param {?Object} params - object containing parameters for the request, such as query strings and headers
   * @param {Function} [callback] - passed final API response or err if request failed
   * @returns {void}
   */
  post(path: string, params: object | null, callback?: Function) {
    var newParams = merge({}, params || {});
    newParams.method = 'POST';
    newParams.url = getFullURL(this._baseURL, path);
    return this._makeRequest(newParams, callback);
  }

  /**
   * Makes PUT request to Box API V2 endpoint
   *
   * @param {string} path - path to a certain API endpoint (ex: /file)
   * @param {?Object} params - object containing parameters for the request, such as query strings and headers
   * @param {Function} callback - passed final API response or err if request failed
   * @returns {void}
   */
  put(path: string, params?: object | null, callback?: Function) {
    var newParams = merge({}, params || {});
    newParams.method = 'PUT';
    newParams.url = getFullURL(this._baseURL, path);
    return this._makeRequest(newParams, callback);
  }

  /**
   * Makes DELETE request to Box API V2 endpoint
   *
   * @param {string} path - path to a certain API endpoint (ex: /file)
   * @param {?Object} params - object containing parameters for the request, such as query strings and headers
   * @param {Function} callback - passed final API response or err if request failed
   * @returns {void}
   */
  del(path: string, params: object | null, callback?: Function) {
    var newParams = merge({}, params || {});
    newParams.method = 'DELETE';
    newParams.url = getFullURL(this._baseURL, path);
    return this._makeRequest(newParams, callback);
  }

  /**
   * Makes an OPTIONS call to a Box API V2 endpoint
   *
   * @param {string} path - Path to an API endpoint (e.g. /files/content)
   * @param {?Object} params - An optional object containing request parameters
   * @param {Function} callback - Called with API call results, or err if call failed
   * @returns {void}
   */
  options(path: string, params: object | null, callback?: Function) {
    var newParams = merge({}, params || {});
    newParams.method = 'OPTIONS';
    newParams.url = getFullURL(this._baseURL, path);

    return this._makeRequest(newParams, callback);
  }

  /**
   * Makes a POST call to a Box API V2 upload endpoint
   * @param {string} path - path to an upload API endpoint
   * @param {?Object} params - an optional object containing request parameters
   * @param {?Object} formData - multipart form data to include in the upload request {@see https://github.com/mikeal/request#multipartform-data-multipart-form-uploads}
   * @param {Function} callback - called with API call results, or an error if the call failed
   * @returns {void}
   */
  upload(
    path: string,
    params: object | null,
    formData: object | null,
    callback: Function
  ) {
    var defaults = {
      method: 'POST',
    };
    var newParams = merge(defaults, params || {});
    newParams.url = getFullURL(this._uploadBaseURL, path);
    newParams.formData = formData;
    newParams.timeout = this._uploadRequestTimeoutMS;

    return this._makeRequest(newParams, callback);
  }

  /**
   * Build the 'BoxApi' Header used for authenticating access to a shared item
   *
   * @param {string} url The shared link url
   * @param {string} [password] The shared link password
   * @returns {string} A properly formatted 'BoxApi' header
   */
  buildSharedItemAuthHeader(url: string, password: string | null) {
    var encodedURL = encodeURIComponent(url),
      encodedPassword = encodeURIComponent(password ?? '');

    if (password) {
      return util.format(
        'shared_link=%s&shared_link_password=%s',
        encodedURL,
        encodedPassword
      );
    }

    return util.format('shared_link=%s', encodedURL);
  }

  /**
   * Return a callback that properly handles a successful response code by passing the response
   * body to the original callback. Any request error or unsuccessful response codes are propagated
   * back to the callback as errors. This is the standard behavior of most endpoints.
   *
   * @param {Function} callback The original callback given by the consumer
   * @returns {?Function} A new callback that processes the response before passing it to the callback.
   */
  defaultResponseHandler(callback: Function) {
    var self = this;

    if (!callback) {
      return null;
    }

    return function (err: any, response: any /* FIXME */) {
      // Error with Request
      if (err) {
        callback(err);
        return;
      }

      // Successful Response
      if (
        response.statusCode >= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[0] &&
        response.statusCode <= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[1]
      ) {
        if (self._useIterators && PagingIterator.isIterable(response)) {
          callback(null, new PagingIterator(response, self));
          return;
        }

        callback(null, response.body);
        return;
      }
      // Unexpected Response
      callback(errors.buildUnexpectedResponseError(response));
    };
  }

  /**
   * Wrap a client method with the default handler for both callback and promise styles
   * @param {Function} method The client method (e.g. client.get)
   * @returns {Function}  The wrapped method
   */
  wrapWithDefaultHandler(method: Function): Function {
    var self = this;
    return function wrappedClientMethod(/* arguments */) {
      // Check if the last argument is a callback
      var lastArg = arguments[arguments.length - 1],
        callback;
      if (typeof lastArg === 'function') {
        callback = self.defaultResponseHandler(lastArg);
        arguments[arguments.length - 1] = callback;
      }

      var ret = method.apply(self, arguments);

      if (ret instanceof Promise) {
        ret = ret.then((response) => {
          if (
            response.statusCode >= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[0] &&
            response.statusCode <= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[1]
          ) {
            if (self._useIterators && PagingIterator.isIterable(response)) {
              return new PagingIterator(response, self);
            }

            return response.body;
          }

          throw errors.buildUnexpectedResponseError(response);
        });
      }

      if (callback) {
        // If the callback will handle any errors, don't worry about the promise
        ret.suppressUnhandledRejections();
      }

      return ret;
    };
  }

  /**
   * Add a SDK plugin. Warning: This will modify the box-client interface and can override existing properties.
   * @param {string} name Plugin name. Will be accessible via client.<plugin-name>
   * @param {Function} plugin The SDK plugin to add
   * @param {Object} [options] Plugin-specific options
   * @returns {void}
   * @throws Will throw an error if plugin name matches an existing method on box-client
   */
  plug(name: string, plugin: Function, options: object) {
    options = options || {};

    if (name in this && typeof (this as any)[name] === 'function') {
      throw new Error(
        'You cannot define a plugin that overrides an existing method on the client'
      );
    }

    // Create plugin and export plugin onto client.
    (this as any)[name] = plugin(this, options);
  }

  /**
   * Get an sdk-gen Authentication object configured with the current client's authentication settings.
   * This allows reusing authentication configuration between the legacy SDK and sdk-gen SDK.
   * 
   * @param {Object} [options] Optional configuration
   * @param {TokenStorage} [options.tokenStorage] Optional custom token storage (sdk-gen format)
   * @returns {Authentication} A configured sdk-gen Authentication object
   * @throws {Error} If the authentication type cannot be determined or is not supported
   */
  getAuthentication(options?: { tokenStorage?: any }): any {
    const { BoxDeveloperTokenAuth } = require('./sdk-gen/box/developerTokenAuth');
    const { BoxOAuth, OAuthConfig } = require('./sdk-gen/box/oauth');
    const { BoxJwtAuth, JwtConfig } = require('./sdk-gen/box/jwtAuth');
    const { BoxCcgAuth, CcgConfig } = require('./sdk-gen/box/ccgAuth');
    const { InMemoryTokenStorage } = require('./sdk-gen/box/tokenStorage');
    const {
      wrapLegacyTokenStore,
      convertLegacyTokenInfoToAccessToken,
    } = require('./util/token-storage-adapter');

    const BasicAPISession = require('./sessions/basic-session').default;
    const PersistentAPISession = require('./sessions/persistent-session').default;
    const AppAuthSession = require('./sessions/app-auth-session').default;
    const CCGAPISession = require('./sessions/ccg-session').default;

    // Determine token storage to use
    let tokenStorage = options?.tokenStorage;

    // Case 1: BasicAPISession (simple access token)
    if (this._session instanceof BasicAPISession) {
      // For basic session, use DeveloperTokenAuth
      // Create token storage with the current access token
      if (!tokenStorage) {
        tokenStorage = new InMemoryTokenStorage({
          token: { accessToken: (this._session as any)._accessToken },
        });
      }

      return new BoxDeveloperTokenAuth({
        token: (this._session as any)._accessToken,
        config: {
          clientId: (this._session as any)._tokenManager?._config?.clientID || '',
          clientSecret: (this._session as any)._tokenManager?._config?.clientSecret || '',
        },
      });
    }

    // Case 2: PersistentAPISession (OAuth with refresh token)
    if (this._session instanceof PersistentAPISession) {
      const session = this._session as any;

      // Get token storage - either provided or wrap the legacy one
      if (!tokenStorage) {
        if (session._tokenStore) {
          // Wrap legacy token store
          tokenStorage = wrapLegacyTokenStore(session._tokenStore);
        } else {
          // Create in-memory storage with current tokens
          const currentToken = convertLegacyTokenInfoToAccessToken(
            session._tokenInfo
          );
          tokenStorage = new InMemoryTokenStorage({
            token: currentToken,
          });
        }
      }

      const config = new OAuthConfig({
        clientId: session._config.clientID,
        clientSecret: session._config.clientSecret,
        tokenStorage: tokenStorage,
      });

      return new BoxOAuth({ config });
    }

    // Case 3: AppAuthSession (JWT App Auth)
    if (this._session instanceof AppAuthSession) {
      const session = this._session as any;
      const appAuthConfig = session._config.appAuth;

      if (!appAuthConfig) {
        throw new Error(
          'AppAuth configuration not found. Cannot create Authentication object.'
        );
      }

      // Get token storage - either provided or wrap the legacy one
      if (!tokenStorage) {
        if (session._tokenStore) {
          tokenStorage = wrapLegacyTokenStore(session._tokenStore);
        } else {
          // Pre-populate with existing token if available to avoid unnecessary token generation
          const existingToken = session._tokenInfo
            ? convertLegacyTokenInfoToAccessToken(session._tokenInfo)
            : undefined;
          tokenStorage = new InMemoryTokenStorage({
            token: existingToken,
          });
        }
      }

      const jwtConfig = new JwtConfig({
        clientId: session._config.clientID,
        clientSecret: session._config.clientSecret,
        jwtKeyId: appAuthConfig.keyID,
        privateKey: appAuthConfig.privateKey,
        privateKeyPassphrase: appAuthConfig.passphrase,
        enterpriseId:
          session._type === 'enterprise' ? session._id : undefined,
        userId: session._type === 'user' ? session._id : undefined,
        tokenStorage: tokenStorage,
      });

      return new BoxJwtAuth({ config: jwtConfig });
    }

    // Case 4: CCGAPISession (Client Credentials Grant)
    if (this._session instanceof CCGAPISession) {
      const session = this._session as any;

      if (!tokenStorage) {
        // Pre-populate with existing token if available to avoid unnecessary token request
        const existingToken = session._tokenInfo
          ? convertLegacyTokenInfoToAccessToken(session._tokenInfo)
          : undefined;
        tokenStorage = new InMemoryTokenStorage({
          token: existingToken,
        });
      }

      // Determine enterprise or user ID from config
      const config = session._config;
      const ccgConfig = new CcgConfig({
        clientId: config.clientID,
        clientSecret: config.clientSecret,
        enterpriseId:
          config.boxSubjectType === 'enterprise'
            ? config.boxSubjectId
            : undefined,
        userId:
          config.boxSubjectType === 'user' ? config.boxSubjectId : undefined,
        tokenStorage: tokenStorage,
      });

      return new BoxCcgAuth({ config: ccgConfig });
    }

    // Unknown session type
    throw new Error(
      `Unknown session type. Cannot create Authentication object from ${this._session?.constructor?.name || 'unknown session'}.`
    );
  }

  /**
   * Get an sdk-gen NetworkSession configured with the current SDK's network settings.
   * This allows reusing network configuration between the legacy SDK and sdk-gen SDK.
   *
   * Properties mapped from legacy SDK:
   * - Base URLs (API, Upload, OAuth)
   * - Proxy configuration
   * - Custom headers
   * - Agent options
   * - Retry settings (maxRetries, retryInterval)
   *
   * Properties only in SDK-Gen (provided via options):
   * - networkClient: Custom network client implementation
   * - retryStrategy: Custom retry strategy (overrides legacy retry config)
   * - dataSanitizer: Data sanitization for logging
   * - interceptors: Request/response interceptors
   *
   * @param {Object} [options] Optional configuration for SDK-Gen-only properties
   * @param {NetworkClient} [options.networkClient] Custom network client
   * @param {RetryStrategy} [options.retryStrategy] Custom retry strategy
   * @param {DataSanitizer} [options.dataSanitizer] Custom data sanitizer
   * @param {Interceptor[]} [options.interceptors] Request interceptors
   * @param {Object} [options.additionalHeaders] Extra headers (merged with legacy)
   * @returns {NetworkSession} Configured NetworkSession for sdk-gen
   *
   * @example
   * // Basic usage - extracts all settings from legacy SDK
   * const networkSession = legacyClient.getNetworkSession();
   * const sdkGenClient = new SdkGenBoxClient({ auth, networkSession });
   *
   * @example
   * // With custom options
   * const networkSession = legacyClient.getNetworkSession({
   *   retryStrategy: new BoxRetryStrategy({ maxAttempts: 10 }),
   *   additionalHeaders: { 'X-Custom-Header': 'value' }
   * });
   */
  getNetworkSession(options?: {
    networkClient?: any;
    retryStrategy?: any;
    dataSanitizer?: any;
    interceptors?: any[];
    additionalHeaders?: { [key: string]: string };
  }): any {
    // Import sdk-gen types dynamically to avoid circular dependencies
    const { NetworkSession } = require('./sdk-gen/networking/network');
    const { BaseUrls } = require('./sdk-gen/networking/baseUrls');
    const { BoxRetryStrategy } = require('./sdk-gen/networking/retries');
    const { BoxNetworkClient } = require('./sdk-gen/networking/boxNetworkClient');
    const { DataSanitizer } = require('./sdk-gen/internal/logging');
    const { createAgent } = require('./sdk-gen/internal/utils');

    // Get config from session (same approach as getAuthentication)
    const session = this._session as any;
    const config = session._config || {};

    // Step 1: Build BaseUrls from legacy config
    // Legacy authorizeRootURL is 'https://account.box.com/api'
    // SDK-Gen oauth2Url should be 'https://account.box.com/api/oauth2'
    let oauth2Url = 'https://account.box.com/api/oauth2';
    if (config.authorizeRootURL) {
      // If legacy has custom authorizeRootURL, append /oauth2 if not present
      oauth2Url = config.authorizeRootURL.endsWith('/oauth2')
        ? config.authorizeRootURL
        : `${config.authorizeRootURL}/oauth2`;
    }

    const baseUrls = new BaseUrls({
      baseUrl: config.apiRootURL || 'https://api.box.com',
      uploadUrl: config.uploadAPIRootURL || 'https://upload.box.com/api',
      oauth2Url: oauth2Url,
    });

    // Step 2: Build ProxyConfig from legacy config
    let proxyConfig:
      | { url: string; username?: string; password?: string }
      | undefined;
    if (config.proxy?.url) {
      proxyConfig = {
        url: config.proxy.url,
        username: config.proxy.username || undefined,
        password: config.proxy.password || undefined,
      };
    }

    // Step 3: Build additionalHeaders from legacy request.headers
    const legacyHeaders = config.request?.headers || {};
    const additionalHeaders = {
      ...legacyHeaders,
      ...(options?.additionalHeaders || {}),
    };

    // Step 4: Build RetryStrategy from legacy config or use provided
    const retryStrategy =
      options?.retryStrategy ||
      new BoxRetryStrategy({
        maxAttempts: config.numMaxRetries || 5,
        // Convert retryIntervalMS (milliseconds) to retryBaseInterval (seconds)
        retryBaseInterval: (config.retryIntervalMS || 2000) / 1000,
      });

    // Step 5: Extract agent options from legacy config
    const agentOptions = config.request?.agentOptions || { keepAlive: true };

    // Step 6: Create and return NetworkSession
    return new NetworkSession({
      additionalHeaders: additionalHeaders,
      baseUrls: baseUrls,
      interceptors: options?.interceptors || [],
      agent: createAgent(agentOptions, proxyConfig),
      agentOptions: agentOptions,
      proxyConfig: proxyConfig,
      networkClient: options?.networkClient || new BoxNetworkClient({}),
      retryStrategy: retryStrategy,
      dataSanitizer: options?.dataSanitizer || new DataSanitizer({}),
    });
  }

  /**
   * Get a fully configured sdk-gen BoxClient that shares authentication and
   * network settings with this legacy client.
   *
   * This is a convenience method that internally calls:
   * - getAuthentication() to extract auth configuration
   * - getNetworkSession() to extract network configuration
   *
   * @param {Object} [options] Optional configuration
   * @param {Object} [options.authOptions] Options to pass to getAuthentication()
   * @param {TokenStorage} [options.authOptions.tokenStorage] Custom token storage
   * @param {Object} [options.networkOptions] Options to pass to getNetworkSession()
   * @param {NetworkClient} [options.networkOptions.networkClient] Custom network client
   * @param {RetryStrategy} [options.networkOptions.retryStrategy] Custom retry strategy
   * @param {DataSanitizer} [options.networkOptions.dataSanitizer] Custom data sanitizer
   * @param {Interceptor[]} [options.networkOptions.interceptors] Request interceptors
   * @param {Object} [options.networkOptions.additionalHeaders] Extra headers
   * @returns {BoxClient} A fully configured sdk-gen BoxClient
   *
   * @example
   * // Basic usage - one line to get a fully configured SDK-Gen client!
   * const sdkGenClient = legacyClient.getSdkGenClient();
   * const user = await sdkGenClient.users.getUserMe();
   *
   * @example
   * // With custom options
   * const sdkGenClient = legacyClient.getSdkGenClient({
   *   authOptions: { tokenStorage: myTokenStorage },
   *   networkOptions: {
   *     additionalHeaders: { 'X-Request-ID': 'tracking-123' },
   *     retryStrategy: customRetryStrategy
   *   }
   * });
   */
  getSdkGenClient(options?: {
    authOptions?: {
      tokenStorage?: any;
    };
    networkOptions?: {
      networkClient?: any;
      retryStrategy?: any;
      dataSanitizer?: any;
      interceptors?: any[];
      additionalHeaders?: { [key: string]: string };
    };
  }): any {
    // Import sdk-gen BoxClient dynamically to avoid circular dependencies
    const { BoxClient: SdkGenBoxClient } = require('./sdk-gen/client');

    // Get authentication using getAuthentication() method
    const auth = this.getAuthentication(options?.authOptions);

    // Get network session using getNetworkSession() method
    const networkSession = this.getNetworkSession(options?.networkOptions);

    // Create and return the fully configured sdk-gen BoxClient
    return new SdkGenBoxClient({
      auth: auth,
      networkSession: networkSession,
    });
  }
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Enum of valid collaboration roles
 *
 * @readonly
 * @enum {CollaborationRole}
 */
BoxClient.prototype.collaborationRoles = {
  EDITOR: 'editor',
  VIEWER: 'viewer',
  PREVIEWER: 'previewer',
  UPLOADER: 'uploader',
  PREVIEWER_UPLOADER: 'previewer uploader',
  VIEWER_UPLOADER: 'viewer uploader',
  CO_OWNER: 'co-owner',
  OWNER: 'owner',
};

/**
 * Enum of Box item types
 *
 * @readonly
 * @enum {ItemType}
 */
BoxClient.prototype.itemTypes = {
  FILE: 'file',
  FOLDER: 'folder',
};

/**
 * Enum of valid values for setting different access levels. To be used when
 * creating and editting shared links, upload emails, etc.
 *
 * @readonly
 * @type {AccessLevel}
 */
BoxClient.prototype.accessLevels = {
  OPEN: { access: 'open' },
  COLLABORATORS: { access: 'collaborators' },
  COMPANY: { access: 'company' },
  DEFAULT: {},
  DISABLED: null,
};

/** @const {string} */
BoxClient.prototype.CURRENT_USER_ID = Users.prototype.CURRENT_USER_ID;

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * @deprecated This module is deprecated. Please use box-node-sdk/sdk-gen/client instead.
 * @module box-node-sdk/lib/box-client
 * @see {@Link BoxClient}
 */
export default BoxClient;
