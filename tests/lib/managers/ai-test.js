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
				qs: {},
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/ai/ask', expectedParams)
				.returns(Promise.resolve(answer));
			return aimodule
				.ask({
					items: [{ type: itemType, id: itemId }],
					mode,
					prompt,
				})
				.then(data => {
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
				qs: {},
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/ai/text_gen', expectedParams)
				.returns(Promise.resolve(answer));
			return aimodule
				.textGen({
					items: [{ type: itemType, id: itemId }],
					dialogue_history: dialogueHistory,
					prompt,
				})
				.then(data => {
					assert.equal(data, answer);
				});
		});
	});

	describe('getDefaultAiAgent()', function() {
		const agent = {
			type: 'ai_agent_ask',
			basic_text: {
				llm_endpoint_params: {
					type: 'openai_params',
					frequency_penalty: 1.5,
					presence_penalty: 1.5,
					stop: '<|im_end|>',
					temperature: 0,
					top_p: 1,
				},
				model: 'openai__gpt_3_5_turbo',
				num_tokens_for_completion: 8400,
				prompt_template:
					'It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?',
				system_message:
					'You are a helpful travel assistant specialized in budget travel',
			},
			basic_text_multi: {
				llm_endpoint_params: {
					type: 'openai_params',
					frequency_penalty: 1.5,
					presence_penalty: 1.5,
					stop: '<|im_end|>',
					temperature: 0,
					top_p: 1,
				},
				model: 'openai__gpt_3_5_turbo',
				num_tokens_for_completion: 8400,
				prompt_template:
					'It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?',
				system_message:
					'You are a helpful travel assistant specialized in budget travel',
			},
			long_text: {
				embeddings: {
					model: 'openai__text_embedding_ada_002',
					strategy: {
						id: 'basic',
						num_tokens_per_chunk: 64,
					},
				},
				llm_endpoint_params: {
					type: 'openai_params',
					frequency_penalty: 1.5,
					presence_penalty: 1.5,
					stop: '<|im_end|>',
					temperature: 0,
					top_p: 1,
				},
				model: 'openai__gpt_3_5_turbo',
				num_tokens_for_completion: 8400,
				prompt_template:
					'It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?',
				system_message:
					'You are a helpful travel assistant specialized in budget travel',
			},
			long_text_multi: {
				embeddings: {
					model: 'openai__text_embedding_ada_002',
					strategy: {
						id: 'basic',
						num_tokens_per_chunk: 64,
					},
				},
				llm_endpoint_params: {
					type: 'openai_params',
					frequency_penalty: 1.5,
					presence_penalty: 1.5,
					stop: '<|im_end|>',
					temperature: 0,
					top_p: 1,
				},
				model: 'openai__gpt_3_5_turbo',
				num_tokens_for_completion: 8400,
				prompt_template:
					'It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?',
				system_message:
					'You are a helpful travel assistant specialized in budget travel',
			},
		};
		it('should make GET request to get default AI agent', function() {
			const expected_params = {
				qs: {
					mode: 'ask',
					language: 'en',
					model: 'openai__gpt_3_5_turbo',
				},
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/ai_agent_default', expected_params)
				.returns(Promise.resolve(agent));
			return aimodule.getDefaultAiAgent({
				mode: 'ask',
				language: 'en',
				model: 'openai__gpt_3_5_turbo',
			}).then(data => {
				assert.equal(data, agent);
			});
		});
	});
});
