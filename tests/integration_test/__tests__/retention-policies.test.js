'use strict';
const {getAppClient} = require('../context');
const {createBoxTestFolder} = require('../objects/box-test-folder');
const {createBoxTestRetentionPolicy} = require('../objects/box-test-retention-policy');
const utils = require('../lib/utils');
const context = {};

beforeAll(async() => {
	context.appClient = await getAppClient();
});

test('test retention policy', async() => {
	let policyName = `policy-${utils.randomName()}`;
	let retentionPolicy;

	try {
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
	} catch (err) {
		// TODO: 21-10-2022, @arjankowski
		// There is an error on backend side, which will return 409 status code "conflict"
		// but retention policy still created.
		// Delete this try-catch after the issue is fixed.

		let policies = await context.appClient.retentionPolicies.getAll({policy_name: policyName});
		if (policies.entries.length === 1) {
			retentionPolicy = await context.appClient.retentionPolicies.get(policies.entries[0].id);
		} else {
			throw err;
		}
	}
	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('modifiable');
	expect(retentionPolicy.retention_length).toBe('2');
	expect(retentionPolicy.description).toBe('The additional text description of the retention policy');

	try {
		retentionPolicy = await context.appClient.retentionPolicies.update(
			retentionPolicy.id,
			{
				retention_length: 1,
				retention_type: 'non_modifiable',
				status: 'retired',
				description: 'The modified text description of the retention policy',
			},
		);
	} catch (err) {
		// TODO: 12-09-2022, @arjankowski
		// There is an error on backend side, which will return 500 status code "Internal Server Error"
		// but retention policy still updated.
		// Delete this try-catch after the issue is fixed
	}

	retentionPolicy = await context.appClient.retentionPolicies.get(retentionPolicy.id);
	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('non_modifiable');
	expect(retentionPolicy.retention_length).toBe('1');
	expect(retentionPolicy.description).toBe('The modified text description of the retention policy');
}, 180000);

test('test retention policy assignment', async() => {
	let metadataTemplate = await createBoxTestMetadataTemplate(context.appClient);
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
