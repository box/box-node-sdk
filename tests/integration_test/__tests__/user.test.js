'use strict';

const { getAppClient, getUserClient } = require('../context');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');

const context = {};

beforeAll(async() => {
	let appClient = getAppClient();
	let user = await createBoxTestUser(appClient);
	let userClient = getUserClient(user.id);
	context.user = user;
	context.appClient = appClient;
	context.client = userClient;
});

afterAll(async() => {
	await clearUserContent(context.client);
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

test('test session termination with user ID', async() => {
	let result = await context.appClient.users.terminateSessionByUserIDs([context.user.id]);
	expect(result).toBeDefined();
	expect(result.message).toBeDefined();
});

test('test session termination with user login', async() => {
	let result = await context.appClient.users.terminateSessionByUserLogins([context.user.login]);
	expect(result).toBeDefined();
	expect(result.message).toBeDefined();
});
