/**
 * @fileoverview URL Path Builder
 */

'use strict';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

var ALPHA_NUMERIC = /^[a-zA-Z0-9!@#$%^&*()_+\\/-]*$/;
/**
 * remove leading & trailing slashes from some string. This is useful for
 * removing slashes from the path segments that are actually a part of the
 * path itself. Without this step, these slashes would be uri-encoded.
 *
 * @param {string} segment The path segment (ex: '/users')
 * @returns {string} The path segment with slashes trimmed (ex: 'users')
 * @private
 */
function trimSlashes(segment) {
	return segment.replace(/^\/|\/$/g, '');
}


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * URLPath will create a full URL path from the given array of segments.
 *
 * It also provides the following features:
 * - convert all segments to strings
 * - add/remove slashes between segments, where appropriate
 * - encode each path segment to prevent path manipulation
 *
 * @name URLPath
 * @returns {string} Return a valid URL path comprised of the given path segments
 */
module.exports = function urlPath(/* arguments*/) {
	var args = Array.prototype.slice.call(arguments);
	var path = args.map(x => String(x))
		.map(x => {
			var trimmedX = trimSlashes(x);
			if (ALPHA_NUMERIC.test(trimmedX) || trimmedX.includes('.png') || trimmedX.includes('.jpg')) {
				return trimmedX;
			}
			throw new Error('An invalid path parameter passed in. It must be alphanumeric.');
		})
		.map(x => encodeURIComponent(x))
		.join('/');
	return `/${path}`;
};
