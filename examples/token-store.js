/**
 * @fileoverview In-Memory Token Store
 * @author mwiller
 * @module box-node-sdk/token-store
 */

'use strict';

var store = new Map();

/**
 * Basic in-memory Token Store, not suitable for use in production!
 * @param {string} userID The ID of the user whose tokens will be stored
 * @constructor
 */
function TokenStore(userID) {

	this.userID = userID;
}

TokenStore.prototype = {

	/**
	 * Read the user's tokens from the store
	 * @param {Function} callback Passed the user's tokens
	 * @returns {void}
	 */
	read: function(callback) {
		callback(null, store.get(this.userID));
	},

	/**
	 * Write the user's tokens to the store
	 * @param {Object} tokenInfo The user's token info
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	write: function(tokenInfo, callback) {
		store.set(this.userID, tokenInfo);
		callback();
	},

	/**
	 * Clears the user's tokens from the store
	 * @param {Function} callback The callback
	 * @returns {void}
	 */
	clear: function(callback) {
		store.delete(this.userID);
		callback();
	}
};

module.exports = TokenStore;
