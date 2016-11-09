/**
 * @fileoverview URL Path Builder
 */

'use strict';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

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
	var path = args.map(String).map(trimSlashes).map(encodeURIComponent).join('/');
	return '/' + path;
};
