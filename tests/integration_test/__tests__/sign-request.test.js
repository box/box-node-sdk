'use strict';

const path = require('path');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
const { createBoxTestFile } = require('../objects/box-test-file');
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

test('test sign request', async() => {
	let file = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'), 'blank.pdf', context.folder.id);
	try {
		const sr = await context.client.signRequests.create({
			signers: [
				{
					email: 'sdk_integration_test@boxdemo.com',
					role: 'signer',
					redirect_url: 'https://www.box.com/redirect_url_signer_1',
					declined_redirect_url: 'https://www.box.com/declined_redirect_url_singer_1',
				}
			],
			source_files: [
				{
					type: 'file',
					id: file.id,
				}
			],
			parent_folder: {
				id: context.folder.id,
				type: 'folder',
			},
			redirect_url: 'https://www.box.com/redirect_url',
			declined_redirect_url: 'https://www.box.com/declined_redirect_url',
		});
		expect(sr.id).toBeDefined();
		expect(sr.redirect_url).toBe('https://www.box.com/redirect_url');
		expect(sr.declined_redirect_url).toBe('https://www.box.com/declined_redirect_url');
		expect(sr.parent_folder.id).toBe(context.folder.id);
		expect(sr.signers.length).toBe(2);
		for (let signer of sr.signers) {
			if (signer.role === 'signer') {
				expect(signer.email).toBe('sdk_integration_test@boxdemo.com');
				expect(signer.redirect_url).toBe('https://www.box.com/redirect_url_signer_1');
				expect(signer.declined_redirect_url).toBe('https://www.box.com/declined_redirect_url_singer_1');
			} else if (signer.role === 'final_copy_reader') {
				expect(signer.email).toBe(context.user.login.toLowerCase());
				expect(signer.redirect_url).toBe('https://www.box.com/redirect_url');
				expect(signer.declined_redirect_url).toBe('https://www.box.com/declined_redirect_url');
			}
		}
		expect(sr.source_files).toBeDefined();
		expect(sr.source_files.length).toBe(1);
		expect(sr.sign_files.files).toBeDefined();
		expect(sr.sign_files.files.length).toBe(1);
		let sr2 = await context.client.signRequests.getById({
			sign_request_id: sr.id
		});
		expect(sr2.id).toBe(sr.id);
		sr2 = await context.client.signRequests.cancelById({
			sign_request_id: sr.id
		});
		sr2 = await context.client.signRequests.getById({
			sign_request_id: sr.id
		});
		expect(sr2.status).toBe('cancelled');
	} finally {
		await file.dispose();
	}
});

test('test sign request webhook', async() => {
	let file = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'), 'blank.pdf', context.folder.id);
	try {
		const sr = await context.client.signRequests.create({
			signers: [
				{
					email: 'sdk_integration_test@boxdemo.com',
					role: 'signer',
				}
			],
			source_files: [
				{
					type: 'file',
					id: file.id,
				}
			],
			parent_folder: {
				id: context.folder.id,
				type: 'folder',
			},
		});
		expect(sr.id).toBeDefined();
		expect(sr.sign_files.files).toBeDefined();

		// Create a webhook for the sign request
		let signFileId = sr.sign_files.files[0].id;
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
		await context.client.signRequests.cancelById({
			sign_request_id: sr.id
		});
	} finally {
		await file.dispose();
	}
});
