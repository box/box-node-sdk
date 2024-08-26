'use strict';

const path = require('path');
const uuid = require('uuid');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFile } = require('../objects/box-test-file');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const {
	createBoxTestUser,
	clearUserContent,
} = require('../objects/box-test-user');
const context = {};

beforeAll(async() => {
	let appClient = getAppClient();
	let user = await createBoxTestUser(appClient);
	let userClient = getUserClient(user.id);
	let folder = await createBoxTestFolder(userClient);
	context.user = user;
	context.appClient = appClient;
	context.client = userClient;
	context.folder = folder;
});

afterAll(async() => {
	await context.folder.dispose();
	await clearUserContent(context.client);
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

test('test AI send ask', async() => {
	const file = await createBoxTestFile(
		context.client,
		path.join(__dirname, '../resources/blank.pdf'),
		`${uuid.v4()}.pdf`,
		context.folder.id
	);
	const response = await context.client.ai.ask({
		mode: 'multiple_item_qa',
		prompt: 'Which direction sun rises?',
		items: [
			{
				id: file.id,
				type: 'file',
				content: 'The sun rises in the east',
			},
		],
		ai_agent: {
			type: 'ai_agent_ask',
			basic_text_multi: {
				model: 'openai__gpt_3_5_turbo'
			}
		}
	});

	expect(response).toBeDefined();
	expect(response.answer.indexOf('east')).toBeGreaterThan(-1);
});

test('test AI text gen', async() => {
	const file = await createBoxTestFile(
		context.client,
		path.join(__dirname, '../resources/blank.pdf'),
		`${uuid.v4()}.pdf`,
		context.folder.id
	);
	const dialogueHistory = [
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
	];
	const response = await context.client.ai.textGen({
		prompt: 'What is public API?',
		items: [
			{
				id: file.id,
				type: 'file',
			},
		],
		dialogue_history: dialogueHistory,
		ai_agent: {
			type: 'ai_agent_text_gen',
			basic_gen: {
				model: 'openai__gpt_3_5_turbo_16k'
			}
		}
	});

	expect(response).toBeDefined();
	expect(response.answer.toLowerCase().indexOf('api')).toBeGreaterThan(-1);
});


test('test AI get default agent', async() => {
	const agent = await context.client.ai.getAiAgentDefaultConfig({
		mode: 'text_gen',
		language: 'en',
		model: 'openai__gpt_3_5_turbo'
	});
	expect(agent.type).toBe('ai_agent_text_gen');
	expect(agent.basic_gen.model).toBe('openai__gpt_3_5_turbo');
});
