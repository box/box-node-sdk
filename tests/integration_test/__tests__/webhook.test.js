'use strict';

const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
const { createBoxTestSignRequest } = require('../objects/box-test-sign-request');
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

test('test create delete webhook', async() => {
	const webhook = await context.client.webhooks.create(
		context.folder.id,
		context.client.itemTypes.FOLDER,
		'https://example.com/sign_webhook',
		['FILE.UPLOADED'],
	);
	expect(webhook.id).toBeDefined();
	expect(webhook.address).toBe('https://example.com/sign_webhook');
	expect(webhook.triggers.length).toBe(1);
	expect(webhook.triggers[0]).toBe('FILE.UPLOADED');

	await context.client.webhooks.delete(webhook.id);
	try {
		await context.client.webhooks.get(webhook.id);
	} catch (err) {
		expect(err.statusCode).toBe(404);
	}
});

test('test sign request webhook', async() => {
	const signRequest = await createBoxTestSignRequest(context.client, context.folder.id);
	try {
		let signFileId = signRequest.sign_files.files[0].id;
		let webhook = await context.client.webhooks.create(
			signFileId,
			context.client.itemTypes.FILE,
			'https://example.com/sign_webhook',
			[
				context.client.webhooks.triggerTypes.SIGN_REQUEST.COMPLETED,
				context.client.webhooks.triggerTypes.SIGN_REQUEST.DECLINED,
				context.client.webhooks.triggerTypes.SIGN_REQUEST.EXPIRED,
			]
		);
		expect(webhook.id).toBeDefined();
		expect(webhook.target.id).toBe(signFileId);
		expect(webhook.address).toBe('https://example.com/sign_webhook');
		expect(webhook.triggers.length).toBe(3);

		webhook = await context.client.webhooks.update(
			webhook.id,
			{
				address: 'https://example.com/sign_webhook_updated',
				triggers: [
					context.client.webhooks.triggerTypes.SIGN_REQUEST.COMPLETED,
					context.client.webhooks.triggerTypes.SIGN_REQUEST.EXPIRED,
				]
			}
		);
		expect(webhook.id).toBeDefined();
		expect(webhook.address).toBe('https://example.com/sign_webhook_updated');
		expect(webhook.triggers.length).toBe(2);

		webhook = await context.client.webhooks.get(webhook.id);
		expect(webhook.id).toBeDefined();

		await context.client.webhooks.delete(webhook.id);
		try {
			await context.client.webhooks.get(webhook.id);
		} catch (err) {
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await signRequest.dispose();
	}
});
