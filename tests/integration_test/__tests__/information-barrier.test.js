'use strict';

const { getAppClient, getAdminClient } = require('../context');
const context = {};

beforeAll(() => {
	context.appClient = getAppClient();
	context.adminClient = getAdminClient();
	context.client = context.adminClient;
});

test('test information barrier', async() => {
	const ibs = await context.adminClient.shieldInformationBarriers.getAll();
	expect(ibs).toBeDefined();
	expect(ibs.entries).toBeDefined();
});
