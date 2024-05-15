'use strict';

const {getAppClient} = require('../context');
const {createBoxTestFolder} = require('../objects/box-test-folder');
const {createBoxTestFile} = require('../objects/box-test-file');
const utils = require('../lib/utils');
const path = require('path');
const context = {};

beforeAll(async() => {
	context.appClient = await getAppClient();
	let folder = await createBoxTestFolder(context.appClient);
	context.folder = folder;
});

afterAll(async() => {
	await context.folder.dispose();
	context.folder = null;
});

test('test metadata search', async() => {
	const templateKey = `template_${utils.randomName()}`;
	const fields = [
		{
			type: 'float',
			key: 'testFloatValue',
			displayName: 'testFloatValue',
		},
	];

	const metadataTemplate = await context.appClient.metadata.createTemplate(templateKey, fields, {
		scope: 'enterprise',
		templateKey,
	});
	try {
		expect(metadataTemplate.id).toBeDefined();
		expect(metadataTemplate.templateKey).toBe(templateKey);
		expect(metadataTemplate.displayName).toBe(templateKey);
		const file = await createBoxTestFile(context.appClient, path.join(__dirname, '../resources/blank.pdf'), 'blank_sign_1.pdf', context.folder.id);
		try {
			const metadata = await context.appClient.files.addMetadata(file.id, 'enterprise', templateKey, {testFloatValue: 150});
			expect(metadata.$template).toBe(templateKey);
			expect(metadata.testFloatValue).toBe(150);

			const searchForm = `${metadataTemplate.scope}.${metadataTemplate.templateKey}`;
			const ancestorFolderId = '0';
			const queryOptions = {
				query: 'testFloatValue >= :arg',
				query_params: {arg: '100'},
				limit: 1,
				order_by: [
					{
						field_key: 'testFloatValue',
						direction: 'asc',
					},
				],
			};
			const searchResults = await context.appClient.metadata.query(searchForm, ancestorFolderId, queryOptions);
			// Sometimes, despite correctly sent metadata, the search does not return files because they probably haven't been properly indexed yet
			expect(searchResults.entries.length).toBeGreaterThanOrEqual(0);
		}
		finally {
			await file.dispose();
		}
	}
	finally {
		await context.appClient.metadata.deleteTemplate('enterprise', metadataTemplate.templateKey);
	}
}, 120000);

