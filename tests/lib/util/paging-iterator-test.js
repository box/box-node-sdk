/**
 * @fileoverview Paging Iterator Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	mockery = require('mockery'),
	Promise = require('bluebird'),
	leche = require('leche'),
	BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

var sandbox = sinon.sandbox.create(),
	PagingIterator,
	clientFake,
	MODULE_FILE_PATH = '../../../lib/util/paging-iterator';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('PagingIterator', function() {

	beforeEach(function() {
		clientFake = leche.fake(BoxClient.prototype);

		// Enable Mockery
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});

		// Register Module Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);

		// Setup File Under Test
		PagingIterator = require(MODULE_FILE_PATH);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});


	describe('constructor', function() {

		it('should throw an error when response is not a collection', function() {

			var response = {
				body: {
					id: '1234',
					name: 'thing 1'
				},
				request: {
					method: 'GET'
				}
			};

			assert.throws(function() {
				/* eslint-disable no-unused-vars*/
				var iterator = new PagingIterator(response, clientFake);
				/* eslint-enable no-unused-vars*/
			}, Error);
		});

		it('should throw an error when response paging strategy cannot be determined', function() {

			var response = {
				body: {
					entries: []
				},
				request: {
					method: 'GET'
				}
			};

			assert.throws(function() {
				/* eslint-disable no-unused-vars*/
				var iterator = new PagingIterator(response, clientFake);
				/* eslint-enable no-unused-vars*/
			}, Error);
		});

		it('should correctly set up iterator when response is limit/offset type', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?limit=1',
					uri: {
						query: 'limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk,
					total_count: 100,
					limit: 1,
					offset: 0
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			assert.propertyVal(iterator, 'limit', 1);
			assert.propertyVal(iterator, 'done', false);
			assert.propertyVal(iterator, 'nextChunk', chunk);
			assert.propertyVal(iterator, 'nextField', 'offset');
			assert.propertyVal(iterator, 'nextValue', 1);
			assert.deepPropertyVal(iterator, 'options.qs.limit', 1);
			assert.deepPropertyVal(iterator, 'options.qs.offset', 1);
			assert.notDeepProperty(iterator, 'options.headers.Authorization');
		});

		it('should correctly set up iterator when limit/offset response fits in one page', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?limit=1',
					uri: {
						query: 'limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk,
					total_count: 1,
					limit: 1,
					offset: 0
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			assert.propertyVal(iterator, 'limit', 1);
			assert.propertyVal(iterator, 'done', true);
			assert.propertyVal(iterator, 'nextChunk', chunk);
			assert.propertyVal(iterator, 'nextField', 'offset');
			assert.propertyVal(iterator, 'nextValue', 1);
			assert.deepPropertyVal(iterator, 'options.qs.limit', 1);
			assert.deepPropertyVal(iterator, 'options.qs.offset', 1);
			assert.notDeepProperty(iterator, 'options.headers.Authorization');
		});

		it('should correctly set up iterator when response is marker type', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			assert.propertyVal(iterator, 'limit', 1);
			assert.propertyVal(iterator, 'done', false);
			assert.propertyVal(iterator, 'nextChunk', chunk);
			assert.propertyVal(iterator, 'nextField', 'marker');
			assert.propertyVal(iterator, 'nextValue', 'vwxyz');
			assert.deepPropertyVal(iterator, 'options.qs.limit', 1);
			assert.deepPropertyVal(iterator, 'options.qs.marker', 'vwxyz');
			assert.notDeepProperty(iterator, 'options.headers.Authorization');
		});

		it('should correctly set up iterator when marker response fits on one page', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					next_marker: null,
					entries: chunk,
					limit: 1
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			assert.propertyVal(iterator, 'limit', 1);
			assert.propertyVal(iterator, 'done', true);
			assert.propertyVal(iterator, 'nextChunk', chunk);
			assert.propertyVal(iterator, 'nextField', 'marker');
			assert.propertyVal(iterator, 'nextValue', null);
			assert.deepPropertyVal(iterator, 'options.qs.limit', 1);
			assert.deepPropertyVal(iterator, 'options.qs.marker', null);
			assert.notDeepProperty(iterator, 'options.headers.Authorization');
		});
	});

	describe('next()', function() {

		it('should return the original page of results when called for the first time', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			return iterator.next()
				.then(data => {
					assert.propertyVal(data, 'done', false);
					assert.propertyVal(data, 'value', chunk);
				});
		});

		it('should return the original page of results and done flag when all results fit on one page', function() {

			var chunk = [{}];
			var response = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk,
					limit: 1,
					next_marker: ''
				}
			};

			var iterator = new PagingIterator(response, clientFake);

			return iterator.next()
				.then(data => {
					assert.propertyVal(data, 'done', true);
					assert.propertyVal(data, 'value', chunk);
				});
		});

		it('should fetch second page of results when called a second time', function() {

			var chunk1 = [{foo: 'bar'}],
				chunk2 = [{foo: 'baz'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};
			var response2 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=vwxyz&limit=1',
					uri: {
						query: 'marker=vwxyz&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk2,
					limit: 1,
					next_marker: 'qwerty'
				}
			};

			var expectedURL = 'https://api.box.com/2.0/items';
			var expectedOptions = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'vwxyz'
				}
			};

			sandbox.mock(clientFake).expects('get').withArgs(expectedURL, expectedOptions).yieldsAsync(null, response2);

			var iterator = new PagingIterator(response1, clientFake);

			return iterator.next()
				.then(() => iterator.next())
				.then(data => {
					assert.propertyVal(data, 'done', false);
					assert.propertyVal(data, 'value', chunk2);
				});
		});

		it('should return rejected promise when fetching page of results fails', function() {

			var chunk1 = [{foo: 'bar'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};

			var error = new Error('Could not connect to API');

			sandbox.stub(clientFake, 'get').yieldsAsync(error);

			var iterator = new PagingIterator(response1, clientFake);

			return iterator.next()
				.then(() => iterator.next())
				.catch(err => assert.instanceOf(err, Error));
		});

		it('should return rejected promise when fetching page of results returns non-200 status code', function() {

			var chunk1 = [{foo: 'bar'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};

			var errorResponse = {
				statusCode: 400
			};

			sandbox.stub(clientFake, 'get').yieldsAsync(null, errorResponse);

			var iterator = new PagingIterator(response1, clientFake);

			return iterator.next()
				.then(() => iterator.next())
				.catch(err => assert.instanceOf(err, Error));
		});

		it('should fetch next page of results when called a third time', function() {

			var chunk1 = [{foo: 'bar'}],
				chunk2 = [{foo: 'baz'}],
				chunk3 = [{foo: 'quux'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};
			var response2 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=vwxyz&limit=1',
					uri: {
						query: 'marker=vwxyz&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk2,
					limit: 1,
					next_marker: 'qwerty'
				}
			};
			var response3 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=qwerty&limit=1',
					uri: {
						query: 'marker=qwerty&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk3,
					limit: 1,
					next_marker: 'blargh'
				}
			};

			var expectedURL = 'https://api.box.com/2.0/items';
			var expectedOptions1 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'vwxyz'
				}
			};
			var expectedOptions2 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'qwerty'
				}
			};

			var clientMock = sandbox.mock(clientFake);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions1).yieldsAsync(null, response2);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions2).yieldsAsync(null, response3);

			var iterator = new PagingIterator(response1, clientFake);

			return iterator.next()
				.then(() => iterator.next())
				.then(() => iterator.next())
				.then(data => {
					assert.propertyVal(data, 'done', false);
					assert.propertyVal(data, 'value', chunk3);
				});
		});

		it('should return done when end of collection is reached', function() {

			var chunk1 = [{foo: 'bar'}],
				chunk2 = [{foo: 'baz'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};
			var response2 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=vwxyz&limit=1',
					uri: {
						query: 'marker=vwxyz&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk2,
					limit: 1,
					next_marker: 'qwerty'
				}
			};
			var response3 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=qwerty&limit=1',
					uri: {
						query: 'marker=qwerty&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: [],
					limit: 1,
					next_marker: null
				}
			};

			var expectedURL = 'https://api.box.com/2.0/items';
			var expectedOptions1 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'vwxyz'
				}
			};
			var expectedOptions2 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'qwerty'
				}
			};

			var clientMock = sandbox.mock(clientFake);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions1).yieldsAsync(null, response2);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions2).yieldsAsync(null, response3);

			var iterator = new PagingIterator(response1, clientFake);

			return iterator.next()
				.then(() => iterator.next())
				.then(() => iterator.next())
				.then(data => {
					assert.propertyVal(data, 'done', true);
					// assert.notProperty(data, 'value');
				});
		});

		it('should queue requests when called consecutively', function() {


			var chunk1 = [{foo: 'bar'}],
				chunk2 = [{foo: 'baz'}];
			var response1 = {
				request: {
					href: 'https://api.box.com/2.0/items?marker=abcdef&limit=1',
					uri: {
						query: 'marker=abcdef&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk1,
					limit: 1,
					next_marker: 'vwxyz'
				}
			};
			var response2 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=vwxyz&limit=1',
					uri: {
						query: 'marker=vwxyz&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: chunk2,
					limit: 1,
					next_marker: 'qwerty'
				}
			};
			var response3 = {
				statusCode: 200,
				request: {
					href: 'https://api.box.com/2.0/items?marker=qwerty&limit=1',
					uri: {
						query: 'marker=qwerty&limit=1'
					},
					headers: {},
					method: 'GET'
				},
				body: {
					entries: [],
					limit: 1,
					next_marker: null
				}
			};

			var expectedURL = 'https://api.box.com/2.0/items';
			var expectedOptions1 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'vwxyz'
				}
			};
			var expectedOptions2 = {
				headers: {},
				qs: {
					limit: 1,
					marker: 'qwerty'
				}
			};

			var clientMock = sandbox.mock(clientFake);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions1).yieldsAsync(null, response2);
			clientMock.expects('get').withArgs(expectedURL, expectedOptions2).yieldsAsync(null, response3);

			var iterator = new PagingIterator(response1, clientFake);

			return Promise.all([
				iterator.next()
					.then(data => {
						assert.propertyVal(data, 'done', false);
						assert.propertyVal(data, 'value', chunk1);
					}),
				iterator.next()
					.then(data => {
						assert.propertyVal(data, 'done', false);
						assert.propertyVal(data, 'value', chunk2);
					}),
				iterator.next()
					.then(data => {
						assert.propertyVal(data, 'done', true);
					})
			]);
		});
	});
});
