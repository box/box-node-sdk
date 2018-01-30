/**
 * @fileoverview Util function to determine which type of test to run: unit or end-to-end
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var configVars = require('../../../tests/config/test-config.json');

module.exports = function testClientConfiguration() {
	// Default use dummy credentials for unit testing.
	var clientVarsObject = {
		clientID: 'TEST_CLIENT_ID',
		clientSecret: 'TEST_CLIENT_SECRET',
		accessToken: 'TEST_ACCESS_TOKEN'
	};
	// If NOCK has been turned off, read in real config vars for end-to-end testing.
	if (process.env.NOCK_OFF === 'true') {
		clientVarsObject.clientID = configVars.clientID;
		clientVarsObject.clientSecret = configVars.clientSecret;
		clientVarsObject.accessToken = configVars.accessToken;
	}
	return clientVarsObject;
};
