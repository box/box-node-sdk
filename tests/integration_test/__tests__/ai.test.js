'use strict';

const path = require('path');
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
		'blank.pdf',
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
	});

	expect(response).toBeDefined();
	expect(response.answer.indexOf('east')).toBeGreaterThan(-1);
});

test('test AI text gen', async() => {
	const file = await createBoxTestFile(
		context.client,
		path.join(__dirname, '../resources/blank.pdf'),
		'blank.pdf',
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
	});

	expect(response).toBeDefined();
	expect(response.answer.toLowerCase().indexOf('api')).toBeGreaterThan(-1);
});
