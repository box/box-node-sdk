/**
 * @fileoverview Box API Client
 * @author bemerick
 * @author fschott
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
 * An access level constant. Used for setting and updating shared links, folder upload, etc.
 * @typedef {?Object} AccessLevel
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var util = require('util'),
	errors = require('./util/errors'),
	httpStatusCodes = require('http-status');

// API Resource Managers
var Users = require('./managers/users'),
	Files = require('./managers/files'),
	Folders = require('./managers/folders'),
	Collaborations = require('./managers/collaborations'),
	Comments = require('./managers/comments'),
	SharedItems = require('./managers/shared-items'),
	Metadata = require('./managers/metadata'),
	Collections = require('./managers/collections'),
	Events = require('./managers/events'),
	Search = require('./managers/search');

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
 * Test whether a string represents an IPv4 address
 * @param {string} ipString The string to test
 * @returns {boolean} True if the string is an IPv4 address
 * @private
 */
function isIPv4(ipString) {

	var validOctets = ipString.split('.').filter(function(octet) {
		var octetValue = parseInt(octet, 10);
		return octetValue >= 0 && octetValue <= 255;
	});
	return validOctets.length === 4;
}

/**
 * Validate whether a string represents a valid IPv6 address
 * @param {string} ipString The string to test
 * @returns {boolean} True if the address is valid IPv6
 * @private
 */
function isIPv6(ipString) {

	// Check for obviously invalid strings
	if (ipString.indexOf('::') !== ipString.lastIndexOf('::')) {
		// at most one "::" is allowed in an IPv6 address
		return false;
	}

	var pieces = ipString.split(':');
	if (pieces[pieces.length - 1].indexOf('.') > -1) {
		// Looks like an embedded IPv4 address, which must be validated
		if (isIPv4(pieces[pieces.length - 1])) {

			// embedded IPv4 case, convert to valid IPv6
			var ipv4 = pieces.pop().split('.').map(function(octet) {
					return parseInt(octet, 10);
				}),
				top = (ipv4[0] << 8) + ipv4[1],
				bottom = (ipv4[2] << 8) + ipv4[3];
			pieces.push(top.toString(16));
			pieces.push(bottom.toString(16));
		} else {
			// Invalid embedded address
			return false;
		}
	}

	// Remove leading/trailing empties
	if (pieces[0] === '') {
		pieces.shift();
	}
	if (pieces[pieces.length - 1] === '') {
		pieces.pop();
	}

	var normalized = pieces.map(function(block) {
		if (block === '') {
			// Replace the :: shorthand with the correct number of 0 blocks
			return Array(8 - pieces.length + 1).fill('0000').join(':');
		}

		while (block.length < 4) {
			block = '0' + block;
		}
		return block;
	}).join(':').split(':');

	var validBlocks = normalized.filter(function(block) {
		return /[0-9a-fA-F]{4}/.test(block);
	});

	return validBlocks.length === 8;
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
	// Attach API Resource Managers
	this.users = new Users(this);
	this.files = new Files(this);
	this.folders = new Folders(this);
	this.comments = new Comments(this);
	this.collaborations = new Collaborations(this);
	this.sharedItems = new SharedItems(this);
	this.metadata = new Metadata(this);
	this.collections = new Collections(this);
	this.events = new Events(this);
	this.search = new Search(this);
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
 * @param {APIRequest~Callback} callback - passed response data
 * @returns {void}
 * @private
 */
BoxClient.prototype._makeRequest = function(params, callback) {
	var self = this;

	// Check that tokens are fresh, update if tokens are expired or soon-to-be expired
	this._session.getAccessToken(function(err, accessToken) {
		// Handle Error
		if (err) {
			callback(err);
			return;
		}

		params.headers = self._createHeadersForRequest(params.headers, accessToken);

		if (params.streaming) {
			// streaming is specific to the SDK, so delete it from params before continuing
			delete params.streaming;
			var responseStream = self._requestManager.makeStreamingRequest(params);
			// Listen to 'response' event, so we can cleanup the token store in case when the request is unauthorized
			// due to expired access token
			responseStream.on('response', function(response) {
				self._handleStreamingResponse(response);
			});
			// Callback with the response stream
			callback(null, responseStream);
			return;
		}

		// Make the request to Box, and pass the response to `_handleResponse()` with the original callback
		self._requestManager.makeRequest(params, function handleResponseCallback(responseErr, response) {
			self._handleResponse(responseErr, response, callback);
		});
	});
};

/**
 * Handles the API response for a streaming request. This function will do the necessary clean up if the
 * request is unauthorized due to expired access token.
 *
 * @param {http~IncomingMessage} response - the response info returned by APIRequestManager
 * @returns {void}
 * @private
 */
BoxClient.prototype._handleStreamingResponse = function(response) {
	// All we need to do here is to check if the response is a 401 because of token expiration. We do not care
	// about the callback here since for streaming request, we have already called the callback with the stream object.
	this._handleResponse(null, response, function() {});
};

/**
 * Handles the API response. A response that reaches here has already been auto-retried if possible.
 * If an error still exists in the response, propagates an error. Otherwise, propagates the
 * successful result data.
 *
 * @param {?APIRequest~Error} err - If Error object, API request did not succeed. The Error obj will contain
 *  information about the response, such as statusCode & response information.
 * @param {APIRequest~ResponseObject} response - the response info returned by APIRequestManager
 * @param {APIRequest~Callback} callback - The API Request callback
 * @returns {void}
 * @private
 */
BoxClient.prototype._handleResponse = function(err, response, callback) {

	// Serious Error: The Box client can't do anything else since this is a failed request.
	if (err) {
		callback(err);
		return;
	}

	// Unauthorized Tokens: Tokens haven't expired normally, but are somehow unauthorized. This
	// happens with the tokens are revoked manually (ex: via a webapp logout). In this case
	// we assume the refresh token has also been revoked (this is always the case) so getting a
	// new token isn't an option. Propagate an "expired tokens" error after giving the session a
	// chance to react to the error first.
	if (isUnauthorizedDueToExpiredAccessToken(response)) {
		var expiredTokensError = errors.buildExpiredAuthError(response);

		// Give the session a chance to handle the error (ex: a persistent session will clear the token store)
		if (this._session.handleExpiredTokensError) {
			this._session.handleExpiredTokensError(expiredTokensError, callback);
			return;
		}

		callback(expiredTokensError);
		return;
	}

	// Successful Response: propagate the response
	callback(null, response);
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
		return isIPv4(ipString) || isIPv6(ipString);
	});
	this.setCustomHeader(HEADER_XFF, validIPs.join(', '));
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
 * Revokes the client's access tokens. The client will no longer be tied to a user
 * and will be unable to make calls to the api, rendering it effectively useless.
 *
 * @param {Function} callback Called after revoking, with an error if one existed
 * @returns {void}
 */
BoxClient.prototype.revokeTokens = function(callback) {
	this._session.revokeTokens(callback);
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
	params = params || {};
	params.method = 'GET';
	params.url = getFullURL(this._baseURL, path);
	this._makeRequest(params, callback);
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
	params = params || {};
	params.method = 'POST';
	params.url = getFullURL(this._baseURL, path);
	this._makeRequest(params, callback);
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
	params = params || {};
	params.method = 'PUT';
	params.url = getFullURL(this._baseURL, path);
	this._makeRequest(params, callback);
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
	params = params || {};
	params.method = 'DELETE';
	params.url = getFullURL(this._baseURL, path);
	this._makeRequest(params, callback);
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
	params = params || {};
	params.method = 'OPTIONS';
	params.url = getFullURL(this._baseURL, path);

	this._makeRequest(params, callback);
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
	params = params || {};
	params.method = 'POST';
	params.url = getFullURL(this._uploadBaseURL, path);
	params.formData = formData;
	params.timeout = this._uploadRequestTimeoutMS;

	this._makeRequest(params, callback);
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
 * @NOTE(fschott) 2014-05-03: This method will most likely be phased out so that we can provide less
 * generic and more granular responses & errors.
 *
 * @param {Function} callback The original callback given by the consumer
 * @returns {APIRequest~Callback} A new callback that processes the response before passing it to the callback.
 */
BoxClient.prototype.defaultResponseHandler = function(callback) {
	return function(err, response) {
		// Error with Request
		if (err) {
			callback(err);
			return;
		}

		// Successful Response
		if (response.statusCode >= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[0]
			&& response.statusCode <= HTTP_STATUS_CODE_SUCCESS_BLOCK_RANGE[1]) {
			callback(null, response.body);
			return;
		}
		// Unexpected Response
		callback(errors.buildUnexpectedResponseError(response));
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
