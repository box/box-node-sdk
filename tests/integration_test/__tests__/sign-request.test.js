'use strict';

const path = require('path');
const Promise = require('bluebird');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser } = require('../objects/box-test-user');
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
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

test('test sign request', async() => {
	let file = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
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
		// Wait for sign request finish converting
		// eslint-disable-next-line promise/avoid-new
		await new Promise((resolve, reject) => {
			let counter = 0;
			let interval = setInterval(async() => {
				let sr3 = await context.client.signRequests.getById({
					sign_request_id: sr.id
				});
				if (sr3.sign_files.files[0].status !== 'converting') {
					clearInterval(interval);
					resolve();
				}
				counter += 1;
				if (counter > 10) {
					clearInterval(interval);
					reject(new Error('Timeout waiting for sign request to finish converting'));
				}
			}, 1000);
		});
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
