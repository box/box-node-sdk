'use strict';

const path = require('path');
const { Promise } = require('bluebird');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFile } = require('../objects/box-test-file');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestRetentionPolicy } = require('../objects/box-test-retention-policy');
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

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

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

test('test get file with custom dispostion time', async() => {
	let testRetentionPolicy = await createBoxTestRetentionPolicy(context.appClient);
	let testFolder = await createBoxTestFolder(context.appClient);
	let testFile;
	let retentionPolicyAssignment;
	try {
		retentionPolicyAssignment = await context.appClient.retentionPolicies.assign(testRetentionPolicy.id, testFolder.type, testFolder.id);
		testFile = await createBoxTestFile(context.appClient, path.join(__dirname, '../resources/blank.pdf'), 'testfile.pdf', testFolder.id);

		let file = await context.appClient.files.get(testFile.id, {fields: 'created_at,disposition_at'});
		expect(file.id).toBe(testFile.id);
		expect(file.disposition_at).not.toBeNull();
		let disposeAt = new Date(file.disposition_at);
		let createdAt = new Date(file.created_at);
		expect(createdAt.addDays(1).toLocaleDateString()).toBe(disposeAt.toLocaleDateString());

		let newDisposeAt = new Date(createdAt.addDays(2));
		await context.appClient.files.update(testFile.id, {disposition_at: newDisposeAt.toISOString().replace('.000Z', 'Z'), fields: 'disposition_at'});
		file = await context.appClient.files.get(testFile.id, {fields: 'disposition_at'});
		disposeAt = new Date(file.disposition_at);
		expect(newDisposeAt.toLocaleDateString()).toBe(disposeAt.toLocaleDateString());
	} finally {
		if (retentionPolicyAssignment) {
			await context.appClient.retentionPolicies.deleteAssignment(retentionPolicyAssignment.id);
		}
		await testRetentionPolicy.dispose();
		await testFolder.dispose();
	}
});

test('test get file by stream', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	try {
		let stream = await context.client.files.getReadStream(testFile.id);
		// eslint-disable-next-line promise/avoid-new
		let buffer = await new Promise((resolve, reject) => {
			let chunks = [];
			stream.on('data', chunk => {
				chunks.push(chunk);
			});
			stream.on('end', () => {
				resolve(Buffer.concat(chunks));
			});
			stream.on('error', error => {
				reject(error);
			});
		});
		expect(buffer.length).toBe(testFile.size);
	} finally {
		await testFile.dispose();
	}
});

test('test get file by stream with delay read', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	try {
		let stream = await context.client.files.getReadStream(testFile.id);
		// delay 3s to read the stream
		// eslint-disable-next-line promise/avoid-new
		await new Promise(resolve => setTimeout(resolve, 500));
		// eslint-disable-next-line promise/avoid-new
		let buffer = await new Promise((resolve, reject) => {
			let chunks = [];
			stream.on('data', chunk => {
				chunks.push(chunk);
			});
			stream.on('end', () => {
				resolve(Buffer.concat(chunks));
			});
			stream.on('error', error => {
				reject(error);
			});
		});
		expect(buffer.length).toBe(testFile.size);
	} finally {
		await testFile.dispose();
	}
});
