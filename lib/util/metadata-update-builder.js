/**
 * @fileoverview Utility for building the metadata patch request
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('assert');

/**
 * Utility for building the metadata patch request for files and folders
 *
 * @constructor
 * @returns {void}
 */
function MetadataUpdateBuilder() {
	this.body = [];
}

/**
 * Insert add operation to the request body.
 *
 * @param {string} path - path designates the key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.add = function(path, value) {
	this.insertPath('add', path, value);
};

/**
 * Insert replace operation to the request body.
 *
 * @param {string} path - path designates the key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.replace = function(path, value) {
	this.insertPath('replace', path, value);
};

/**
 * Insert remove operation to the request body.
 *
 * @param {string} path - path designates the key. it must be prefixed with /.
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.remove = function(path) {
	assert(typeof path === 'string' && path.length > 0 && path.indexOf('/') === 0,
			'path designates the key. It is mandatory.');

	var item = {
		op: 'remove',
		path: path
	};
	this.body.push(item);
};

/**
 * Insert test operation to the request body.
 *
 * @param {string} path - path designates the key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.test = function(path, value) {
	this.insertPath('test', path, value);
};

/**
 * Insert move operation to the request body.
 *
 * @param {string} from - from designates the source key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.move = function(from, value) {
	this.insertFrom('move', from, value);
};

/**
 * Insert copy operation to the request body.
 *
 * @param {string} from - from designates the source key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.copy = function(from, value) {
	this.insertFrom('copy', from, value);
};

/**
 * Insert path based operation in to the request body.
 *
 * @param {String} op - The possible operations are add, replace, test.
 * @param {string} path - path designates the key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.insertPath = function(op, path, value) {
	assert(typeof op === 'string' && op.length > 0, 'op designates the operation. It is mandatory.');
	assert(typeof path === 'string' && path.length > 0 && path.indexOf('/') === 0,
			'path designates the key that starts with /. It is mandatory.');

	assert(value !== undefined, 'value should be specified.');

	var item = {
		op: op,
		path: path,
		value: value
	};
	this.body.push(item);
};

/**
 * Insert from based operation in to the request body.
 *
 * @param {String} op - The possible operations are add, replace, test.
 * @param {string} from - from designates the source key. it must be prefixed with /.
 * @param {object} value - the value could any one of the types string, enum, float, and date (RFC 3339).
 * @returns {void}
 */
MetadataUpdateBuilder.prototype.insertFrom = function(op, from, value) {
	assert(typeof op === 'string' && op.length > 0, 'op designates the operation. It is mandatory.');
	assert(typeof from === 'string' && from.length > 0 && from.indexOf('/') === 0,
			'from designates the key that starts with /. It is mandatory.');

	assert(value !== undefined, 'value should be specified.');

	var item = {
		op: op,
		from: from,
		value: value
	};
	this.body.push(item);
};

/**
 * Get the request body. It contains array of opertions.
 *
 * @returns {array} the array of operations.
 */
MetadataUpdateBuilder.prototype.getPatch = function() {
	return this.body;
};

/**
 * @module box-node-sdk/lib/util/UpdateMetadataBuilder
 * @see {@Link UpdateMetadataBuilder}
 */
module.exports = MetadataUpdateBuilder;
