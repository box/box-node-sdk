/**
 * @fileoverview Errors Helper
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var qs = require('querystring'),
	httpStatusCodes = require('http-status');


// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * An generic error propagated when the response has caused an error.
 * @typedef {Error} Errors~ResponseError
 * @property {APIRequest~ResponseObject} response The response object that generated the error
 * @property {int} statusCode A shortcut to the status code of the response
 */

/**
 * Error propagated whenever the SDK is unable to successfully complete an action
 * due to an expired access token (and refresh token, if one was provided).
 * @typedef {Errors~ResponseError} Errors~AuthError
 * @property {boolean} authExpired - always true
 */

/**
 * Request structure for error objects
 * @param {Object} req The request object
 * @constructor
 * @private
 */
function Request(req) {
	this.method = req.method;
	this.url = {
		protocol: req.uri.protocol,
		host: req.uri.host,
		path: req.uri.pathname,
		query: qs.parse(req.uri.query),
		fragment: req.uri.hash
	};
	this.httpVersion = req.response.httpVersion;
	this.headers = req.headers;
	this.body = req.body;
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A Helper for building errors across the SDK. Makes sure that easily-forgotten
 * fields aren't missed, and that everything is formatted properly to return to the
 * consumer.
 *
 * @name Errors
 * @module box-node-sdk/lib/util/errors
 */
module.exports = {

	/**
	 * Build a response error with the given message, and attaching meta data from the
	 * response data.
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @param {string} message - the response error message
	 * @returns {Errors~ResponseError} an error describing the response error
	 */
	buildResponseError(response, message) {
		response = response || {};
		message = message || 'API Response Error';

		var statusCode = response.statusCode;
		var requestID = '';
		if (response.body && response.body.request_id) {
			requestID = ` | ${response.body.request_id}`;
		}

		var apiMessage = '';
		if (response.body && response.body.code) {
			apiMessage += ` ${response.body.code}`;
		}

		if (response.body && response.body.message) {
			apiMessage += ` - ${response.body.message}`;
		}

		var errorMessage = `${message} [${statusCode} ${httpStatusCodes[statusCode]}${requestID}]${apiMessage}`;
		var responseError = new Error(errorMessage);

		responseError.statusCode = response.statusCode;
		responseError.response = response;
		responseError.request = response.request ? new Request(response.request) : {};

		return responseError;
	},

	/**
	 * Build an authentication error. {@see Errors~AuthError}
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @param {string} [message] - Optional message for the error
	 * @returns {Errors~AuthError} A properly formatted authentication error
	 */
	buildAuthError(response, message) {

		message = message || 'Expired Auth: Auth code or refresh token has expired';
		var responseError = this.buildResponseError(response, message);
		responseError.authExpired = true;
		return responseError;
	},

	/**
	 * Build the error for an "Unexpected Response" from the API. This is a shortcut for
	 * responseError built specifically for the 401 UNEXPECTED response case. It
	 * should be called and the error should be propogated to the consumer
	 * whenever an unexpected response was recieved from the API.
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @returns {Errors~ResponseError} an error describing the response error
	 */
	buildUnexpectedResponseError(response) {
		return this.buildResponseError(response, 'Unexpected API Response');
	},

	/**
	 * Unwrap a Bluebird error and throw it, or just re-throw if the error
	 * is not a Bluebird error.  This is necessary to preserve errors when
	 * a function is promisified.
	 * @param {Error} error The error to unwrap
	 * @returns {void}
	 * @throws {Error} The unwrapped error
	 */
	unwrapAndThrow(error) {

		if (error.cause) {
			throw error.cause;
		}

		throw error;
	}

};
