'use strict';

/**
 * Class representing the parameters for a request to the Box API.
 * This is intended to just hold data, no behavior is currently implemented.
 */
class Request {

	/**
	 * @constructor
	 * @param {string} method The HTTP method for the request
	 * @param {string} url The URL for the request
	 * @param {Object} [options] Optional parameters
	 */
	constructor(method, url, options) {

		options = options || {};

		this.method = method;
		this.url = url;

		this.headers = Object.assign({}, options.headers);
		this.body = options.data || undefined;
	}
}

module.exports = Request;
