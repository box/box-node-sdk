'use strict';

const { getAppClient, getUserClient } = require('../context');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
const { createBoxTestGroup } = require('../objects/box-test-group');

const context = {};

beforeAll(async() => {
	let appClient = getAppClient();
	let user = await createBoxTestUser(appClient);
	let userClient = getUserClient(user.id);
	let group = await createBoxTestGroup(appClient);
	context.user = user;
	context.appClient = appClient;
	context.client = userClient;
	context.group = group;
});

afterAll(async() => {
	await context.group.dispose();
	await clearUserContent(context.client);
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

test('test session termination with group ID', async() => {
	await context.appClient.groups.addUser(context.group.id, context.user.id, {
		role: context.client.groups.userRoles.MEMBER,
	});

	let result = await context.appClient.groups.terminateSessionByGroupIDs([context.group.id]);
	expect(result).toBeDefined();
});
