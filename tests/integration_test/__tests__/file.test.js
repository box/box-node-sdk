'use strict';

const path = require('path');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFile } = require('../objects/box-test-file');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
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

test('test get file information', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	try {
		let file = await context.client.files.get(testFile.id);
		expect(file.id).toBe(testFile.id);
		expect(file.type).toBe('file');
		expect(file.name).toBe(testFile.name);
		expect(file.size).toBe(testFile.size);
	} finally {
		await testFile.dispose();
	}
});

test('test get file with custom fields', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	try {
		let file = await context.client.files.get(testFile.id, {fields: 'name'});
		expect(file.id).toBe(testFile.id);
		expect(file.type).toBe('file');
		expect(file.name).toBe(testFile.name);
		expect(file.size).toBeUndefined();
	} finally {
		await testFile.dispose();
	}
});
