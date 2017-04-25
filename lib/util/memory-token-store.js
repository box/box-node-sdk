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
function MemoryTokenStore(ID) {

	this.ID = ID;
}

MemoryTokenStore.prototype = {

	/**
	 * Read the user's tokens from the store
	 * @param {Function} callback Passed the user's tokens
	 * @returns {void}
	 */
	read: function(callback) {
		callback(null, store.get(this.ID));
	},

	/**
	 * Write the user's tokens to the store
	 * @param {Object} tokenInfo The user's token info
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	write: function(tokenInfo, callback) {
		store.set(this.ID, tokenInfo);
		callback();
	},

	/**
	 * Clears the user's tokens from the store
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	clear: function(callback) {
		store.delete(this.ID);
		callback();
	}
};

module.exports = MemoryTokenStore;