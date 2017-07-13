/**
 * @fileoverview Token Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('assert'),
	sinon = require('sinon'),
	mockery = require('mockery'),
	jwt = require('jsonwebtoken'),
	leche = require('leche');

var APIRequestManager = require('../../lib/api-request-manager'),
	Config = require('../../lib/util/config');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

var sandbox = sinon.sandbox.create();

var MODULE_FILE_PATH = '../../lib/token-manager',
	API_ROOT_URL = 'api.box.com',
	BOX_CLIENT_ID = 'fakeId',
	BOX_CLIENT_SECRET = 'fakeSecret',
	GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code',
	GRANT_TYPE_REFRESH_TOKEN = 'refresh_token',
	GRANT_TYPE_CLIENT_CREDENTIALS = 'client_credentials';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------
describe('token-manager', function() {

	var requestManagerFake,
		jwtFake,
		config,
		TokenManager,
		tokenManager;

	beforeEach(function() {

		// Setup Dependencies
		requestManagerFake = leche.fake(APIRequestManager.prototype);
		jwtFake = leche.fake(jwt);

		config = new Config({
			clientID: BOX_CLIENT_ID,
			clientSecret: BOX_CLIENT_SECRET,
			apiRootURL: API_ROOT_URL
		});

		// Register Mocks
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});
		mockery.registerMock('jsonwebtoken', jwtFake);
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		// Setup File Under Test
		TokenManager = require(MODULE_FILE_PATH);
		tokenManager = new TokenManager(config, requestManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getTokens()', function() {

		it('should make a POST request against the OAuth token endpoint when called', function() {

			// Setup Data
			var formParams = { myGet: 'tokenParams' };

			// Stub out the API request
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				method: 'POST',
				url: 'api.box.com/oauth2/token',
				form: formParams
			}));

			// Test the response
			tokenManager.getTokens(formParams, null);
		});

		leche.withData({
			'auth code grant': [GRANT_TYPE_AUTHORIZATION_CODE, {access_token: 'at', refresh_token: 'rt', expires_in: 234234}],
			'refresh token grant': [GRANT_TYPE_REFRESH_TOKEN, {access_token: 'at', refresh_token: 'rt', expires_in: 234234}],
			'client credentials grant': [GRANT_TYPE_CLIENT_CREDENTIALS, {access_token: 'at', expires_in: 234234}]
		}, function(grantType, successfulResponseBody) {

			it('should properly parse the OAuth token response', function(done) {

				// Setup Data
				var expectedTokenInfoObject = {
						access_token: successfulResponseBody.access_token,
						refresh_token: successfulResponseBody.refresh_token,
						accessTokenTTLMS: successfulResponseBody.expires_in * 1000,
						acquiredAtMS: Date.now()
					},
					formParams = {grant_type: grantType},
					responseInfo = {statusCode: 200, body: successfulResponseBody};

				// Stub out the API request
				sandbox.stub(requestManagerFake, 'makeRequest').yieldsAsync(null, responseInfo);

				// Test the response
				tokenManager.getTokens(formParams, null, function(err, tokenInfo) {
					assert.strictEqual(tokenInfo.accessToken, expectedTokenInfoObject.access_token,
						'Expected result tokenInfo to contain access token from grant response body');
					assert.strictEqual(tokenInfo.refreshToken, expectedTokenInfoObject.refresh_token,
						'Expected result tokenInfo to contain refresh token from grant response body');
					assert.strictEqual(tokenInfo.accessTokenTTLMS, expectedTokenInfoObject.accessTokenTTLMS,
						'Expected result tokenInfo to contain access token TTL from grant response body');
					// getTokensFromGrantResponse uses Date.now() directly. So, we can't assert against that exact time,
					// but we can verify close by ensuring the time is between pre-call time and now.
					assert((tokenInfo.acquiredAtMS >= expectedTokenInfoObject.acquiredAtMS) && (tokenInfo.acquiredAtMS <= Date.now()),
						'Expected result tokenInfo to contain acquire-time that is between call time and NOW.');
					done();
				});
			});

		});

		it('should propagate an error when request encounters an error', function(done) {
			var requestError = new Error(),
				responseBody = 'responseStuff',
				responseInfo = {statusCode: 400, body: responseBody};
			requestError.response = responseInfo;

			sandbox.mock(requestManagerFake).expects('makeRequest').yieldsAsync(requestError);

			tokenManager.getTokens({}, null, function(err) {
				assert.strictEqual(err, requestError, 'Expected getTokens() to propagate an err when make request passes err');
				done();
			});
		});

		it('should propagate an "Expired Auth" error when request returns an invalid token grant response error', function(done) {
			var responseBody = {error: 'invalid_grant'},
				responseInfo = {statusCode: 403, body: responseBody};

			sandbox.mock(requestManagerFake).expects('makeRequest').yieldsAsync(null, responseInfo);

			tokenManager.getTokens({}, null, function(err) {
				assert(err, 'An error is returned');
				assert.strictEqual(err.message, 'Expired Auth: Auth code or refresh token has expired.');
				done();
			});
		});

		it('should propagate an "Unexpected Response" error when a request returns without JSON', function(done) {
			var responseBody = new Buffer(1),
				responseInfo = {statusCode: 200, body: responseBody};

			sandbox.mock(requestManagerFake).expects('makeRequest').yieldsAsync(null, responseInfo, responseBody);

			tokenManager.getTokens({}, null, function(err) {
				assert.strictEqual(err.message, 'Unexpected API Response [200 OK]');
				done();
			});
		});

		leche.withData({
			'missing access token': [GRANT_TYPE_CLIENT_CREDENTIALS, {expires_in: '1234567', refresh_token: 'rt'}],
			'invalid access token': [GRANT_TYPE_AUTHORIZATION_CODE, {access_token: '', expires_in: '1234567', refresh_token: 'rt'}],
			'invalid expiration': [GRANT_TYPE_AUTHORIZATION_CODE, {access_token: 'at', expires_in: 'abc', refresh_token: 'rt'}],
			'missing refresh token': [GRANT_TYPE_REFRESH_TOKEN, {access_token: 'at', expires_in: '1234567'}],
			'invalid refresh token': [GRANT_TYPE_REFRESH_TOKEN, {access_token: 'at', expires_in: '1234567', refresh_token: ''}]
		}, function(grantType, responseBody) {

			it('should propagate a response error', function(done) {
				var responseInfo = {statusCode: 200, body: responseBody};

				sandbox.mock(requestManagerFake).expects('makeRequest').yieldsAsync(null, responseInfo);

				tokenManager.getTokens({}, null, function(err) {
					assert.strictEqual(err.message, 'Token format from response invalid');
					done();
				});
			});

		});

		it('should set the X-Forwarded-For header when options.ip is set', function() {
			var optionsIP = {
				ip: '123.456.789.0'
			};

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				headers: {
					'X-Forwarded-For': '123.456.789.0'
				}
			}));

			tokenManager.getTokens({}, optionsIP);
		});


	});

	describe('isAccessTokenValid()', function() {

		leche.withData({
			'current time greater than expired time without buffer': [300, 200, 0, false],
			'current time less than than expired time without buffer': [100, 200, 0, true],
			'current time less than expired time but within range of buffer': [175, 200, 50, false],
			'an object that has no time properties': [300, null, null, false]
		}, function(currentTime, expiredTime, bufferTime, expectedResult) {
			it('should return true when access token is valid within given buffer', function() {
				var tokenInfo = {
					acquiredAtMS: 0,
					accessTokenTTLMS: expiredTime
				};
				sandbox.stub(Date, 'now').returns(currentTime);
				var atualResult = tokenManager.isAccessTokenValid(tokenInfo, bufferTime);
				assert.strictEqual(atualResult, expectedResult);
			});
		});
	});

	describe('getTokensAuthorizationCodeGrant()', function() {
		it('should acquire token info when given valid authorization code', function(done) {
			var authorizationCode = 'abc';
			sandbox.mock(tokenManager).expects('getTokens').withExactArgs({
				grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
				code: authorizationCode
			}, null, done).yields();

			tokenManager.getTokensAuthorizationCodeGrant(authorizationCode, null, done);
		});

		it('should return an error when the authorization code is missing', function(done) {

			tokenManager.getTokensAuthorizationCodeGrant(null, null, function(err) {
				assert.strictEqual(err.message, 'Invalid authorization code.');
				done();
			});

		});

		it('should return an error when the authorization code is an empty string', function(done) {

			tokenManager.getTokensAuthorizationCodeGrant('', null, function(err) {
				assert.strictEqual(err.message, 'Invalid authorization code.');
				done();
			});

		});
	});

	describe('getTokensClientCredentialsGrant', function() {
		it('should acquire token info using the client credentials grant', function(done) {

			sandbox.mock(tokenManager).expects('getTokens').withExactArgs({
				grant_type: GRANT_TYPE_CLIENT_CREDENTIALS
			}, null, done).yields();

			tokenManager.getTokensClientCredentialsGrant(null, done);
		});

		it('should acquire token info using the client credentials grant with options.ip', function(done) {

			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManager).expects('getTokens').withExactArgs({
				grant_type: GRANT_TYPE_CLIENT_CREDENTIALS
			}, options, done).yields();

			tokenManager.getTokensClientCredentialsGrant(options, done);
		});
	});

	describe('getTokensRefreshGrant()', function() {
		it('should acquire token info when given valid refresh token', function(done) {
			var refreshToken = 'refresh';
			sandbox.mock(tokenManager).expects('getTokens').withExactArgs({
				grant_type: GRANT_TYPE_REFRESH_TOKEN,
				refresh_token: refreshToken
			}, null, done).yields();

			tokenManager.getTokensRefreshGrant(refreshToken, null, done);
		});

		it('should acquire token info when given valid refresh token with options', function(done) {
			var refreshToken = 'refresh';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManager).expects('getTokens').withExactArgs({
				grant_type: GRANT_TYPE_REFRESH_TOKEN,
				refresh_token: refreshToken
			}, options, done).yields();

			tokenManager.getTokensRefreshGrant(refreshToken, options, done);
		});

		it('should return error when given null refresh token', function(done) {
			tokenManager.getTokensRefreshGrant(null, null, function(err) {
				assert.strictEqual(err.message, 'Invalid refresh token.');
				done();
			});
		});

		it('should return error when given an empty-string refresh token', function(done) {
			tokenManager.getTokensRefreshGrant('', null, function(err) {
				assert.strictEqual(err.message, 'Invalid refresh token.');
				done();
			});
		});

	});

	describe('getTokensJWTGrant()', function() {

		var TEST_KEY = 'Test key',
			TEST_PASSPHRASE = 'secret password',
			TEST_ID = '873645827345',
			TEST_KEY_ID = 'jhbxg87f4',
			TEST_WEB_TOKEN = 'laksduh5q3ufygqergtwehrg8w95tw9dhfgwr5';

		beforeEach(function() {
			var appAuthConfig = config.extend({
				appAuth: {
					keyID: TEST_KEY_ID,
					privateKey: TEST_KEY,
					passphrase: TEST_PASSPHRASE,
					expirationTime: 1,
					verifyTimestamp: true
				}
			});

			tokenManager = new TokenManager(appAuthConfig, requestManagerFake);
		});

		it('should create JWT assertion with correct parameters when called', function(done) {

			sandbox.useFakeTimers(100000);

			var expectedClaims = {
				exp: 101,
				box_sub_type: 'user'
			};
			var keyParams = {
				key: TEST_KEY,
				passphrase: TEST_PASSPHRASE
			};
			var expectedOptions = {
				algorithm: 'RS256',
				audience: 'https://api.box.com/oauth2/token',
				subject: TEST_ID,
				issuer: config.clientID,
				noTimestamp: false,
				headers: {
					kid: TEST_KEY_ID
				}
			};
			sandbox.stub(tokenManager, 'getTokens').yieldsAsync();
			sandbox.mock(jwtFake).expects('sign').withArgs(expectedClaims, keyParams, sinon.match(expectedOptions)).returns(TEST_WEB_TOKEN);

			tokenManager.getTokensJWTGrant('user', TEST_ID, done);
		});

		it('should return error when JWT computation throws error', function(done) {

			var error = new Error('Some crypto stuff failed!');
			sandbox.stub(jwtFake, 'sign').throws(error);

			tokenManager.getTokensJWTGrant('user', TEST_ID, null, function(err) {
				assert.equal(err, error);
				done();
			});
		});

		it('should acquire token info when JWT creation succeeds', function(done) {

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: TEST_WEB_TOKEN
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.stub(jwtFake, 'sign').returns(TEST_WEB_TOKEN);

			sandbox.mock(tokenManager).expects('getTokens').withArgs(sinon.match(expectedTokenParams), null).yieldsAsync(null, tokenInfo);

			tokenManager.getTokensJWTGrant('user', TEST_ID, null, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should acquire token info when JWT creation succeeds with options.ip', function(done) {

			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: TEST_WEB_TOKEN
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.stub(jwtFake, 'sign').returns(TEST_WEB_TOKEN);

			sandbox.mock(tokenManager).expects('getTokens').withArgs(sinon.match(expectedTokenParams), options).yieldsAsync(null, tokenInfo);

			tokenManager.getTokensJWTGrant('user', TEST_ID, options, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should retry with new JWT using server date when server rejects exp claim', function(done) {

			sandbox.useFakeTimers(100000);

			var firstTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: TEST_WEB_TOKEN
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			var serverDate = 'Sat, 01 Apr 2017 16:56:53 GMT'; // 1491065813
			var newJWT = 'jhdhioeiu4yo34875twudgshdgr';

			var secondTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: newJWT
			};

			var serverError = {
				statusCode: 400,
				authExpired: true,
				response: {
					body: {
						error: 'invalid_grant',
						error_description: 'Please check the \'exp\' claim.'
					},
					headers: {
						date: serverDate
					}
				}
			};

			var jwtStub = sandbox.stub(jwtFake, 'sign');
			jwtStub.withArgs(sinon.match({exp: 101})).returns(TEST_WEB_TOKEN);
			jwtStub.withArgs(sinon.match({exp: 1491065813 + 1})).returns(newJWT);
			var getTokensMock = sandbox.mock(tokenManager);
			getTokensMock.expects('getTokens').withArgs(sinon.match(firstTokenParams), null).yieldsAsync(serverError);
			getTokensMock.expects('getTokens').withArgs(sinon.match(secondTokenParams), null).yieldsAsync(null, tokenInfo);

			tokenManager.getTokensJWTGrant('user', TEST_ID, null, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should call callback with error when the API returns any other error', function(done) {

			var error = new Error('Could not get tokens');

			sandbox.stub(jwtFake, 'sign').returns(TEST_WEB_TOKEN);
			sandbox.stub(tokenManager, 'getTokens').yieldsAsync(error);

			tokenManager.getTokensJWTGrant('user', TEST_ID, null, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});

	describe('exchangeToken()', function() {

		var TEST_ACCESS_TOKEN = 'poiudafjdbfjygsdfg',
			TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/files/12345';

		it('should exchange access token for lower scope when only scope is passed', function(done) {

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
				subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
				subject_token: TEST_ACCESS_TOKEN,
				scope: TEST_SCOPE
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.mock(tokenManager).expects('getTokens').withArgs(expectedTokenParams, null).yieldsAsync(null, tokenInfo);

			tokenManager.exchangeToken(TEST_ACCESS_TOKEN, TEST_SCOPE, null, null, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should exchange access token for lower scope when only scope is passed with options.ip', function(done) {

			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
				subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
				subject_token: TEST_ACCESS_TOKEN,
				scope: TEST_SCOPE
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.mock(tokenManager).expects('getTokens').withArgs(expectedTokenParams, options).yieldsAsync(null, tokenInfo);

			tokenManager.exchangeToken(TEST_ACCESS_TOKEN, TEST_SCOPE, null, options, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should exchange access token for lower scopes when multiple scopes are passed', function(done) {

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
				subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
				subject_token: TEST_ACCESS_TOKEN,
				scope: 'item_preview,item_read'
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.mock(tokenManager).expects('getTokens').withArgs(expectedTokenParams, null).yieldsAsync(null, tokenInfo);

			tokenManager.exchangeToken(TEST_ACCESS_TOKEN, ['item_preview', 'item_read'], null, null, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should exchange access token for resource-restricted token when scope and resource are passed', function(done) {

			var expectedTokenParams = {
				grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
				subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
				subject_token: TEST_ACCESS_TOKEN,
				scope: TEST_SCOPE,
				resource: TEST_RESOURCE
			};

			var tokenInfo = {
				accessToken: 'lsdjhgo87w3h4tbd87fg54'
			};

			sandbox.mock(tokenManager).expects('getTokens').withArgs(expectedTokenParams, null).yieldsAsync(null, tokenInfo);

			tokenManager.exchangeToken(TEST_ACCESS_TOKEN, TEST_SCOPE, TEST_RESOURCE, null, function(err, tokens) {

				assert.ifError(err);
				assert.equal(tokens, tokenInfo);
				done();
			});
		});

		it('should call callback with error when call to exchange tokens fails', function(done) {

			var exchangeError = new Error('Exchange failed');
			sandbox.stub(tokenManager, 'getTokens').yieldsAsync(exchangeError);

			tokenManager.exchangeToken(TEST_ACCESS_TOKEN, TEST_SCOPE, null, null, function(err) {

				assert.equal(err, exchangeError);
				done();
			});
		});
	});

	describe('revokeTokens()', function() {
		it('should make request to revoke tokens with expected revoke params when called', function(done) {
			var refreshToken = 'rt';

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				method: 'POST',
				url: 'api.box.com/oauth2/revoke',
				form: {
					token: refreshToken,
					client_id: BOX_CLIENT_ID,
					client_secret: BOX_CLIENT_SECRET
				}
			}).yieldsAsync();

			tokenManager.revokeTokens(refreshToken, null, done);
		});

		it('should make request to revoke tokens with expected revoke params when called with options', function(done) {
			var refreshToken = 'rt';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				method: 'POST',
				url: 'api.box.com/oauth2/revoke',
				form: {
					token: refreshToken,
					client_id: BOX_CLIENT_ID,
					client_secret: BOX_CLIENT_SECRET
				},
				headers: {
					'X-Forwarded-For': options.ip
				}
			}).yieldsAsync();

			tokenManager.revokeTokens(refreshToken, options, done);
		});
	});
});
