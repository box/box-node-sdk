/**
 * @fileoverview Box API Client
 */

'use strict';


// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * A collaboration role constant
 * @typedef {string} CollaborationRole
 */

/**
* A Box file or folder type constant
* @typedef {string} ItemType
*/

/**
 * An access level constant. Used for setting and updating shared links, folder upload, etc.
 * @typedef {?Object} AccessLevel
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var util = require('util'),
	qs = require('querystring'),
	errors = require('./util/errors'),
	httpStatusCodes = require('http-status'),
	isIP = require('net').isIP,
	merge = require('merge-options'),
	PagingIterator = require('./util/paging-iterator'),
	Promise = require('bluebird'),
	Readable = require('stream').Readable;

// API Resource Managers
var Users = require('./managers/users'),
	Files = require('./managers/files'),
	Folders = require('./managers/folders'),
	Collaborations = require('./managers/collaborations'),
	Groups = require('./managers/groups'),
	Comments = require('./managers/comments'),
	SharedItems = require('./managers/shared-items'),
	Metadata = require('./managers/metadata'),
	Collections = require('./managers/collections'),
	Events = require('./managers/events'),
	Search = require('./managers/search'),
	Tasks = require('./managers/tasks'),
	Trash = require('./managers/trash'),
	Enterprise = require('./managers/enterprise'),
	LegalHoldPolicies = require('./managers/legal-hold-policies'),
	WebLinks = require('./managers/web-links'),
	RetentionPolicies = require('./managers/retention-policies'),
	DevicePins = require('./managers/device-pins'),
	Webhooks = require('./managers/webhooks'),
	RecentItems = require('./managers/recent-items'),
	TermsOfService = require('./managers/terms-of-service');

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
function buildAuthorizationHeader(accessToken) {
	return HEADER_AUTHORIZATION_PREFIX + accessToken;
}

/**
 * Returns true iff the response is a 401 UNAUTHORIZED that is caused by an expired access token.
 * @param {APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
 * @returns {boolean} - true iff the response is a 401 UNAUTHORIZED caused by an expired access token
 * @private
 */
function isUnauthorizedDueToExpiredAccessToken(response) {
	// There are three cases to consider:
	// 1) The response body is a Buffer. This indicates that the request was malformed (i.e. malformed url) so return false.
	// 2) The status code is UNAUTHORIZED and the response body is an empty object or null. This indicates that the access tokens are expired, so return true.
	// 3) The status code is UNAUTHORIZED and the response body is a non-empty object. This indicates that the 401 was returned for some reason other
	//    than expired tokens, so return false.

	if (Buffer.isBuffer(response.body)) {
		return false;
	}

	var isResponseStatusCodeUnauthorized = response.statusCode === httpStatusCodes.UNAUTHORIZED,
		isResponseBodyEmpty = !response.body || Object.getOwnPropertyNames(response.body).length === 0;
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
function getFullURL(defaultBasePath, url) {
	if (/^https?:\/\//.test(url)) {
		return url;
	}
	return defaultBasePath + url;
}

/**
 * Create a valid request object for the Batch API from a standard request
 * params object
 * @param {Object} params The request params
 * @returns {Object} The batch API request object
 * @private
 */
function formatRequestForBatch(params) {

	var relativePath = params.url.replace(/^http.*?\/\d\.\d\//, '/');

	return {
		method: params.method,
		relative_url: relativePath + (params.qs ? '?' + qs.stringify(params.qs) : ''),
		body: params.body,
		headers: params.headers
	};
}

/**
 * Format a Batch API response object into a standard request response
 * for use in response handling
 * @param {Object} response The batch API response object
 * @returns {Object} The standard response object
 * @private
 */
function formatResponseForBatch(response) {

	return {
		statusCode: response.status,
		headers: response.headers,
		body: response.response
	};
}

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
function BoxClient(apiSession, config, requestManager) {
	// the API Session used by the client for authentication
	this._session = apiSession;

	// Attach a request manager instance for making requests
	this._requestManager = requestManager;

	// An object of custom headers to apply to every request. Modified via BoxClient.setCustomHeader().
	this._customHeaders = {};
	// Attach the configured properties
	this._baseURL = util.format('%s/%s', config.apiRootURL, config.apiVersion);
	this._uploadBaseURL = util.format('%s/%s', config.uploadAPIRootURL, config.apiVersion);
	this._uploadRequestTimeoutMS = config.uploadRequestTimeoutMS;
	this._useIterators = config.iterators;

	// Attach API Resource Managers
	this.users = new Users(this);
	this.files = new Files(this);
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
	this.termsOfService = new TermsOfService(this);

	// Array of requests when in batch mode, null otherwise
	this._batch = null;
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
BoxClient.prototype._createHeadersForRequest = function(callerHeaders, accessToken) {
	var headers = {};

	// 'Authorization' - contains your valid access token for authorization
	headers[HEADER_AUTHORIZATION] = buildAuthorizationHeader(accessToken);

	// We copy our own custom headers (XFF, BoxApi, etc.) before copying over the caller-specified headers so that
	// the caller-specified headers will take precedence.
	Object.assign(headers, this._customHeaders);
	Object.assign(headers, callerHeaders);

	return headers;
};

/**
 * Makes an API request to the Box API on behalf of the client. Before executing
 * the request, it first ensures the user has usable tokens. Will be called again
 * if the request returns a temporary error. Will propogate error if request returns
 * a permanent error, or if usable tokens are not available.
 *
 * @param {Object} params - Request lib params to configure the request
 * @param {APIRequest~Callback} [callback] - passed response data
 * @returns {Promise} Promise resolving to the response
 * @private
 */
BoxClient.prototype._makeRequest = function(params, callback) {

	var promise;

	if (this._batch) {

		promise = new Promise((resolve, reject) => {
			this._batch.push({ params, resolve, reject });
		});
	} else {

		// Check that tokens are fresh, update if tokens are expired or soon-to-be expired
		promise = this._session.getAccessToken(this._tokenOptions)
			.then(accessToken => {

				params.headers = this._createHeadersForRequest(params.headers, accessToken);

				if (params.streaming) {
					// streaming is specific to the SDK, so delete it from params before continuing
					delete params.streaming;
					var responseStream = this._requestManager.makeStreamingRequest(params);
					// Listen to 'response' event, so we can cleanup the token store in case when the request is unauthorized
					// due to expired access token
					responseStream.on('response', response => {
						if (isUnauthorizedDueToExpiredAccessToken(response)) {

							var expiredTokensError = errors.buildExpiredAuthError(response);

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
	}

	return promise
		.then(response => {

			if (response instanceof Readable) {
				// Just return the stream, it doesn't need further response handling
				return response;
			}

			if (isUnauthorizedDueToExpiredAccessToken(response)) {
				var expiredTokensError = errors.buildExpiredAuthError(response);

				// Give the session a chance to handle the error (ex: a persistent session will clear the token store)
				if (this._session.handleExpiredTokensError) {
					return this._session.handleExpiredTokensError(expiredTokensError);
				}

				throw expiredTokensError;
			}

			return response;
		})
		.asCallback(callback);
};

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
	OWNER: 'owner'
};

/**
 * Enum of Box item types
 *
 * @readonly
 * @enum {ItemType}
 */
BoxClient.prototype.itemTypes = {
	FILE: 'file',
	FOLDER: 'folder'
};

/**
 * Enum of valid values for setting different access levels. To be used when
 * creating and editting shared links, upload emails, etc.
 *
 * @readonly
 * @type {AccessLevel}
 */
BoxClient.prototype.accessLevels = {
	OPEN: {access: 'open'},
	COLLABORATORS: {access: 'collaborators'},
	COMPANY: {access: 'company'},
	DEFAULT: {},
	DISABLED: null
};

/** @const {string} */
BoxClient.prototype.CURRENT_USER_ID = Users.prototype.CURRENT_USER_ID;

/**
 * Set a custom header. A custom header is applied to every request for the life of the client. To
 * remove a header, set it's value to null.
 *
 * @param {string} header The name of the custom header to set.
 * @param {*} value The value of the custom header. Set to null to remove the given header.
 * @returns {void}
 */
BoxClient.prototype.setCustomHeader = function(header, value) {
	if (value) {
		this._customHeaders[header] = value;
	} else {
		delete this._customHeaders[header];
	}
};

/**
 * Sets the list of requesting IP addresses for the X-Forwarded-For header. Used to give the API
 * better information for uploads, rate-limiting, etc.
 *
 * @param {string[]} ips - Array of IP Addresses
 * @returns {void}
 */
BoxClient.prototype.setIPs = function(ips) {
	var validIPs = ips.filter(function(ipString) {
		return isIP(ipString);
	}).join(', ');

	this.setCustomHeader(HEADER_XFF, validIPs);

	this._tokenOptions = {ip: validIPs};
};

/**
 * Sets the shared item context on the API Session. Overwrites any current context.
 *
 * @param {string} url The shared link url
 * @param {?string} password The shared link password, null if no password exists.
 * @returns {void}
 */
BoxClient.prototype.setSharedContext = function(url, password) {
	var sharedContextAuthHeader = this.buildSharedItemAuthHeader(url, password);
	this.setCustomHeader(HEADER_BOXAPI, sharedContextAuthHeader);
};

/**
 * Removes any current shared item context from API Session.
 *
 * @returns {void}
 */
BoxClient.prototype.revokeSharedContext = function() {
	this.setCustomHeader(HEADER_BOXAPI, null);
};

/**
 * Set up the As-User context, which is used by enterprise admins to
 * impersonate their managed users and perform actions on their behalf.
 *
 * @param {string} userID - The ID of the user to impersonate
 * @returns {void}
 */
BoxClient.prototype.asUser = function(userID) {

	this.setCustomHeader(HEADER_AS_USER, userID);
};

/**
 * Revoke the As-User context and return to making calls on behalf of the user
 * who owns the client's access token.
 *
 * @returns {void}
 */
BoxClient.prototype.asSelf = function() {

	this.setCustomHeader(HEADER_AS_USER, null);
};

/**
 * Revokes the client's access tokens. The client will no longer be tied to a user
 * and will be unable to make calls to the API, rendering it effectively useless.
 *
 * @param {Function} [callback] Called after revoking, with an error if one existed
 * @returns {Promise} A promise resolving when the client's access token is revoked
 */
BoxClient.prototype.revokeTokens = function(callback) {

	return this._session.revokeTokens(this._tokenOptions)
		.asCallback(callback);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
 * @param {Function} [callback] Called with the new token
 * @returns {Promise<TokenInfo>} A promise resolving to the exchanged token info
 */
BoxClient.prototype.exchangeToken = function(scopes, resource, callback) {

	return this._session.exchangeToken(scopes, resource, this._tokenOptions)
		.asCallback(callback);
};

/**
 * Makes GET request to Box API V2 endpoint
 *
 * @param {string} path - path to a certain API endpoint (ex: /file)
 * @param {?Object} params - object containing parameters for the request, such as query strings and headers
 * @param {APIRequest~Callback} callback - passed final API response or err if request failed
 * @returns {void}
 */
BoxClient.prototype.get = function(path, params, callback) {
	var newParams = merge({}, params || {});
	newParams.method = 'GET';
	newParams.url = getFullURL(this._baseURL, path);

	return this._makeRequest(newParams, callback);
};

/**
 * Makes POST request to Box API V2 endpoint
 *
 * @param {string} path - path to a certain API endpoint (ex: /file)
 * @param {?Object} params - object containing parameters for the request, such as query strings and headers
 * @param {APIRequest~Callback} callback - passed final API response or err if request failed
 * @returns {void}
 */
BoxClient.prototype.post = function(path, params, callback) {
	var newParams = merge({}, params || {});
	newParams.method = 'POST';
	newParams.url = getFullURL(this._baseURL, path);
	return this._makeRequest(newParams, callback);
};

/**
 * Makes PUT request to Box API V2 endpoint
 *
 * @param {string} path - path to a certain API endpoint (ex: /file)
 * @param {?Object} params - object containing parameters for the request, such as query strings and headers
 * @param {APIRequest~Callback} callback - passed final API response or err if request failed
 * @returns {void}
 */
BoxClient.prototype.put = function(path, params, callback) {
	var newParams = merge({}, params || {});
	newParams.method = 'PUT';
	newParams.url = getFullURL(this._baseURL, path);
	return this._makeRequest(newParams, callback);
};

/**
 * Makes DELETE request to Box API V2 endpoint
 *
 * @param {string} path - path to a certain API endpoint (ex: /file)
 * @param {?Object} params - object containing parameters for the request, such as query strings and headers
 * @param {APIRequest~Callback} callback - passed final API response or err if request failed
 * @returns {void}
 */
BoxClient.prototype.del = function(path, params, callback) {
	var newParams = merge({}, params || {});
	newParams.method = 'DELETE';
	newParams.url = getFullURL(this._baseURL, path);
	return this._makeRequest(newParams, callback);
};


/**
 * Makes an OPTIONS call to a Box API V2 endpoint
 *
 * @param {string} path - Path to an API endpoint (e.g. /files/content)
 * @param {?Object} params - An optional object containing request parameters
 * @param {APIRequest~Callback} callback - Called with API call results, or err if call failed
 * @returns {void}
 */
BoxClient.prototype.options = function(path, params, callback) {
	var newParams = merge({}, params || {});
	newParams.method = 'OPTIONS';
	newParams.url = getFullURL(this._baseURL, path);

	return this._makeRequest(newParams, callback);
};

/**
 * Makes a POST call to a Box API V2 upload endpoint
 * @param {string} path - path to an upload API endpoint
 * @param {?Object} params - an optional object containing request parameters
 * @param {?Object} formData - multipart form data to include in the upload request {@see https://github.com/mikeal/request#multipartform-data-multipart-form-uploads}
 * @param {APIRequest~Callback} callback - called with API call results, or an error if the call failed
 * @returns {void}
 */
BoxClient.prototype.upload = function(path, params, formData, callback) {

	var defaults = {
		method: 'POST'
	};
	var newParams = merge(defaults, params || {});
	newParams.url = getFullURL(this._uploadBaseURL, path);
	newParams.formData = formData;
	newParams.timeout = this._uploadRequestTimeoutMS;

	return this._makeRequest(newParams, callback);
};

/**
 * Puts the client into batch mode, which will queue calls instead of
 * immediately making the API request.
 * @returns {BoxClient} Current client object
 */
BoxClient.prototype.batch = function() {

	this._batch = [];
	return this;
};

BoxClient.prototype.batchExec = function(callback) {

	if (!this._batch) {
		return Promise.reject(new Error('Must start a batch before executing'))
			.asCallback(callback);
	}

	var params = {
		body: {
			requests: this._batch.map(batchReq => formatRequestForBatch(batchReq.params))
		}
	};

	var batch = this._batch;
	this._batch = null;
	return this.post('/batch', params)
		.then(res => {

			var responses = res.body.responses;

			responses.map(formatResponseForBatch).forEach((response, index) => {
				batch[index].resolve(response);
			});

			return res.body;
		})
		.catch(err => {
			batch.forEach(req => req.reject(err));

			throw err;
		})
		.asCallback(callback);
};

/**
 * Build the 'BoxApi' Header used for authenticating access to a shared item
 *
 * @param {string} url The shared link url
 * @param {string} [password] The shared link password
 * @returns {string} A properly formatted 'BoxApi' header
 */
BoxClient.prototype.buildSharedItemAuthHeader = function(url, password) {
	var encodedURL = encodeURIComponent(url),
		encodedPassword = encodeURIComponent(password);

	if (password) {
		return util.format('shared_link=%s&shared_link_password=%s', encodedURL, encodedPassword);
	}

	return util.format('shared_link=%s', encodedURL);
};

/**
 * Return a callback that properly handles a successful response code by passing the response
 * body to the original callback. Any request error or unsuccessful response codes are propagated
 * back to the callback as errors. This is the standard behavior of most endpoints.
 *
 * @param {Function} callback The original callback given by the consumer
 * @returns {?APIRequest~Callback} A new callback that processes the response before passing it to the callback.
 */
BoxClient.prototype.defaultResponseHandler = function(callback) {


	var self = this;

	if (!callback) {
		return null;
	}


	return function(err, response) {
		// Error with Request
		if (err) {
			callback(err);
			return;
		}

		// Successful Response
		if (response.statusCode >= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[0]
			&& response.statusCode <= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[1]) {

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
};

/**
 * Wrap a client method with the default handler for both callback and promise styles
 * @param {Function} method The client method (e.g. client.get)
 * @returns {Function}  The wrapped method
 */
BoxClient.prototype.wrapWithDefaultHandler = function(method) {

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

			ret = ret.then(response => {

				if (response.statusCode >= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[0]
						&& response.statusCode <= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[1]) {

					if (self._useIterators && PagingIterator.isIterable(response)) {
						return new PagingIterator(response, self);
					}

					return response.body;
				}

				throw errors.buildResponseError(response);
			});
		}

		if (callback) {
			// If the callback will handle any errors, don't worry about the promise
			ret.suppressUnhandledRejections();
		}

		return ret;
	};
};

/**
 * Add a SDK plugin. Warning: This will modify the box-client interface and can override existing properties.
 * @param {string} name Plugin name. Will be accessible via client.<plugin-name>
 * @param {Function} plugin The SDK plugin to add
 * @param {Object} [options] Plugin-specific options
 * @returns {void}
 * @throws Will throw an error if plugin name matches an existing method on box-client
 */
BoxClient.prototype.plug = function(name, plugin, options) {
	options = options || {};

	if ((name in this) && (typeof this[name] === 'function')) {
		throw new Error('You cannot define a plugin that overrides an existing method on the client');
	}

	// Create plugin and export plugin onto client.
	this[name] = plugin(this, options);
};


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * @module box-node-sdk/lib/box-client
 * @see {@Link BoxClient}
 */
module.exports = BoxClient;
