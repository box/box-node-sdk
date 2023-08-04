'use strict';

const path = require('path');


const { createBoxTestFile } = require('../objects/box-test-file');
const BoxSDK = require('box-node-sdk');
const {createBoxTestFolder} = require('../objects/box-test-folder');
const {Promise} = require('bluebird');
const context = {};

beforeAll(async() => {

	var sdk = new BoxSDK({
		clientID: 'CLIENT_ID',
		clientSecret: 'CLIENT_SECRET'
	});

	// AI api works currently only with developer token
	context.client = sdk.getBasicClient('GO1Z2nzoX4zKVtmbaizagPN2lkU1FyMw');
	context.folder = await createBoxTestFolder(context.client);
});


test('test ai json', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	let answer = await context.client.ai.ask('text_gen', 'Summarize this file', [{id: testFile.id, type: 'file'}]);
	expect(answer.answer).toBe("I'm sorry, but I cannot summarize a file without knowing its content. Could you please provide me with the specific details or key points that you would like to include in the summary?");
});

test('test ai stream', async() => {
	let testFile = await createBoxTestFile(context.client, path.join(__dirname, '../resources/blank.pdf'));
	let streamAnswer = await context.client.ai.askStream('text_gen', 'Summarize this file', [{id: testFile.id, type: 'file'}]);
	let buffer = await new Promise((resolve, reject) => {
		let chunks = [];
		streamAnswer.on('data', chunk => {
			chunks.push(chunk);
		});
		streamAnswer.on('end', () => {
			resolve(Buffer.concat(chunks));
		});
		streamAnswer.on('error', error => {
			reject(error);
		});
	});
	expect(buffer.toString()).toContain('{"answer":"I","created_at"');
	expect(buffer.toString()).toContain('{"answer":"\'m","created_at"');
});

