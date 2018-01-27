'use strict';

var crypto = require('rusha');
/* node:start */
crypto = require('crypto');
/* node:end */

module.exports = {

	createHash(algo) {
		return crypto.createHash(algo);
	}
};
