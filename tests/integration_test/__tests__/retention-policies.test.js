'use strict';
const {getAppClient} = require('../context');
const {createBoxTestMetadataTemplate} = require('../objects/box-test-metadata-template');
const {createBoxTestRetentionPolicy} = require('../objects/box-test-retention-policy');
const {createBoxTestFolder} = require('../objects/box-test-folder');
const utils = require('../lib/utils');
const context = {};

beforeAll(async() => {
	context.appClient = await getAppClient();
});

test('test retention policy', async() => {
	let policyName = `policy-${utils.randomName()}`;
	let retentionPolicy;

	retentionPolicy = await context.appClient.retentionPolicies.create(
		policyName,
		'finite',
		'permanently_delete',
		{
			retention_length: 2,
			retention_type: 'modifiable',
			description: 'The additional text description of the retention policy',
		},
	);

	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('modifiable');
	expect(retentionPolicy.retention_length).toBe('2');
	expect(retentionPolicy.description).toBe('The additional text description of the retention policy');

	retentionPolicy = await context.appClient.retentionPolicies.update(
		retentionPolicy.id,
		{
			retention_length: 1,
			retention_type: 'non_modifiable',
			status: 'retired',
			description: 'The modified text description of the retention policy',
		},
	);

	retentionPolicy = await context.appClient.retentionPolicies.get(retentionPolicy.id);
	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('non_modifiable');
	expect(retentionPolicy.retention_length).toBe('1');
	expect(retentionPolicy.description).toBe('The modified text description of the retention policy');
}, 180000);

test('test retention policy assignment for folder', async() => {
	let testFolder = await createBoxTestFolder(context.appClient);
	let testRetentionPolicy = await createBoxTestRetentionPolicy(context.appClient);
	try {
		let assignment = await context.appClient.retentionPolicies.assign(
			testRetentionPolicy.id,
			'folder',
			testFolder.id,
		);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('folder');
		expect(assignment.assigned_to.id).toBe(testFolder.id);

		assignment = await context.appClient.retentionPolicies.getAssignment(assignment.id);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('folder');
		expect(assignment.assigned_to.id).toBe(testFolder.id);

		await context.appClient.retentionPolicies.deleteAssignment(assignment.id);
		try {
			await context.appClient.retentionPolicies.getAssignment(assignment.id);
		} catch (err) {
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await testRetentionPolicy.dispose();
		await testFolder.dispose();
	}
}, 180000);

test('test retention policy assignment for metadata template with start_date_field set to upload_date', async() => {
	let metadataTemplate = await createBoxTestMetadataTemplate(context.appClient, `template_${utils.randomName()}`);
	let testRetentionPolicy = await createBoxTestRetentionPolicy(context.appClient);
	try {
		let assignment = await context.appClient.retentionPolicies.assign(
			testRetentionPolicy.id,
			'metadata_template',
			metadataTemplate.id,
			{
				start_date_field: 'upload_date'
			},
		);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('metadata_template');
		expect(assignment.assigned_to.id).toBe(metadataTemplate.id);
		expect(assignment.start_date_field).toBe('upload_date');

		assignment = await context.appClient.retentionPolicies.getAssignment(assignment.id);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('metadata_template');
		expect(assignment.assigned_to.id).toBe(metadataTemplate.id);
		expect(assignment.start_date_field).toBe('upload_date');

		await context.appClient.retentionPolicies.deleteAssignment(assignment.id);
		try {
			await context.appClient.retentionPolicies.getAssignment(assignment.id);
		} catch (err) {
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await testRetentionPolicy.dispose();
		await metadataTemplate.dispose();
	}
}, 180000);

test('test retention policy assignment for metadata template with start_date_field from metadata field', async() => {
	let metadataTemplate = await createBoxTestMetadataTemplate(
		context.appClient,
		`template_${utils.randomName()}`,
		[
			{
				type: 'date',
				key: 'test_date_field',
				displayName: 'test_date_field'
			}
		]);
	let testRetentionPolicy = await createBoxTestRetentionPolicy(context.appClient);
	try {
		let assignment = await context.appClient.retentionPolicies.assign(
			testRetentionPolicy.id,
			'metadata_template',
			metadataTemplate.id,
			{
				start_date_field: metadataTemplate.fields[0].id
			},
		);

		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('metadata_template');
		expect(assignment.assigned_to.id).toBe(metadataTemplate.id);
		expect(assignment.start_date_field).toBe(metadataTemplate.fields[0].id);

		assignment = await context.appClient.retentionPolicies.getAssignment(assignment.id);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('metadata_template');
		expect(assignment.assigned_to.id).toBe(metadataTemplate.id);
		expect(assignment.start_date_field).toBe(metadataTemplate.fields[0].id);

		await context.appClient.retentionPolicies.deleteAssignment(assignment.id);
		try {
			await context.appClient.retentionPolicies.getAssignment(assignment.id);
		} catch (err) {
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await testRetentionPolicy.dispose();
		await metadataTemplate.dispose();
	}
}, 180000);
