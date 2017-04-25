/**
 * @fileoverview In-Memory Token Store
 * @module box-node-sdk/token-store
 */

'use strict';

var store = new Map();

/**
 * Basic in-memory Token Store, not suitable for use in production!
 * @param {string} ID a unique identifier key for which the token is the value.
 * @constructor
 */
function MemoryTokenStore(id) {

	this.id = id;
}

MemoryTokenStore.prototype = {

	/**
	 * Read the user's tokens from the store
	 * @param {Function} callback Passed the user's tokens
	 * @returns {void}
	 */
	read: function(callback) {
		callback(null, store.get(this.id));
	},

	/**
	 * Write the user's tokens to the store
	 * @param {Object} tokenInfo The user's token info
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	write: function(tokenInfo, callback) {
		store.set(this.id, tokenInfo);
		callback();
	},

	/**
	 * Clears the user's tokens from the store
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	clear: function(callback) {
		store.delete(this.id);
		callback();
	}
};

module.exports = MemoryTokenStore;