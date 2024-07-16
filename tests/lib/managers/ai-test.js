/**
 * @fileoverview AI manager tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	Promise = require('bluebird'),
	assert = require('chai').assert;

var BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake,
	AIModule,
	aimodule,
	MODULE_AI_PATH = '../../../lib/managers/ai.generated';

describe('AI', function() {
	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		// Register Mocks
		mockery.enable({
			useCleanCache: true,
		});
		mockery.registerAllowable('../util/url-path');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_AI_PATH);
		AIModule = require(MODULE_AI_PATH);
		aimodule = new AIModule(boxClientFake);
	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('ask()', function() {
		const itemId = 12345,
			itemType = 'file',
			mode = 'single_item_qa',
			prompt = 'What is the capital of France?',
			answer = {
				answer: 'Paris',
				created_at: '2013-12-12T10:53:43-08:00',
				completion_reason: 'done',
			};
		it('should make POST request to create a new AI task', function() {
			var expectedParams = {
				body: {
					items: [
						{
							type: itemType,
							id: itemId,
						},
					],
					mode,
					prompt,
				},
				qs: { }
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/ai/ask', expectedParams)
				.returns(Promise.resolve(answer));
			return aimodule.ask({
				items: [{ type: itemType, id: itemId }],
				mode,
				prompt,
			}).then(data => {
				assert.equal(data, answer);
			});
		});
	});

	describe('textGen()', function() {
		const itemId = 12345,
			itemType = 'file',
			dialogueHistory = [
				{
					prompt: 'Make my email about public APIs sound more professional',
					answer:
						'Here is the first draft of your professional email about public APIs',
					created_at: '2013-12-12T10:53:43-08:00',
				},
				{
					prompt: 'Can you add some more information?',
					answer:
						'Public API schemas provide necessary information to integrate with APIs...',
					created_at: '2013-12-12T11:20:43-08:00',
				},
			],
			prompt = 'What is the capital of France?',
			answer = {
				answer: 'Paris',
				created_at: '2013-12-12T10:53:43-08:00',
				completion_reason: 'done',
			};
		it('should make POST request to create a new AI Text Gen', function() {
			var expectedParams = {
				body: {
					items: [
						{
							type: itemType,
							id: itemId,
						},
					],
					dialogue_history: dialogueHistory,
					prompt,
				},
				qs: { }
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/ai/text_gen', expectedParams)
				.returns(Promise.resolve(answer));
			return aimodule.textGen({
				items: [{ type: itemType, id: itemId }],
				dialogue_history: dialogueHistory,
				prompt,
			}).then(data => {
				assert.equal(data, answer);
			});
		});
	});
});
