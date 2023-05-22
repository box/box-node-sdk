# Retention Policies

A retention policy blocks permanent deletion of content for a specified amount of time.
Admins can create retention policies and then later assign them to specific folders or
their entire enterprise. To use this feature, you must have the manage retention
policies scope enabled for your API key via your application management console.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Create Retention Policy](#create-retention-policy)
- [Get Retention Policy](#get-retention-policy)
- [Update Retention Policy](#update-retention-policy)
- [Get Enterprise Retention Policies](#get-enterprise-retention-policies)
- [Get Retention Policy Assignments](#get-retention-policy-assignments)
- [Assign Retention Policy](#assign-retention-policy)
- [Get Retention Policy Assignment](#get-retention-policy-assignment)
- [Delete Retention Policy Assignment](#delete-retention-policy-assignment)
- [Get File Version Retention](#get-file-version-retention)
- [Get File Version Retentions](#get-file-version-retentions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Create Retention Policy

To create a new retention policy, call the
[`retentionPolicies.create(name, type, action, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#create)
method.

<!-- sample post_retention_policies -->

```js
client.retentionPolicies.create(
	'Tax Documents',
	client.retentionPolicies.policyTypes.INDEFINITE,
	client.retentionPolicies.dispositionActions.REMOVE_RETENTION)
).then(policy => {
	/* policy -> {
		type: 'retention_policy',
		id: '123456789',
		policy_name: 'Tax Documents',
		policy_type: 'indefinite',
		retention_length: 'indefinite',
		retention_type: 'modifiable',
		description: 'Policy to retain all reports',
		disposition_action: 'remove_retention',
		can_owner_extend_retention: false,
		status: 'active',
		are_owners_notified: true,
		custom_notification_recipients: []
		assignment_counts: { enterprise: 0, folder: 1, metadata_template: 0 },
		created_by:
		{ type: 'user',
			id: '11111',
			name: 'Example User',
			login: 'user@example.com' },
		created_at: '2015-05-01T11:12:54-07:00',
		modified_at: '2015-06-08T11:11:50-07:00' }
	*/
});
```

## Get Retention Policy

To retrieve information about a specific retention policy, call the
[`retentionPolicies.get(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#get)
method.

<!-- sample get_retention_policies_id -->

```js
client.retentionPolicies.get('123456789').then((policy) => {
	/* policy -> {
			type: 'retention_policy',
			id: '123456789',
			policy_name: 'Tax Documents',
			policy_type: 'indefinite',
			retention_length: 'indefinite',
			retention_type: 'modifiable',
			description: 'Policy to retain all reports',
			disposition_action: 'remove_retention',
			can_owner_extend_retention: false,
			status: 'active',
			are_owners_notified: true,
			custom_notification_recipients: []
			assignment_counts: { enterprise: 0, folder: 1, metadata_template: 0 },
			created_by:
			{ type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2015-05-01T11:12:54-07:00',
			modified_at: '2015-06-08T11:11:50-07:00' }
		*/
});
```

## Update Retention Policy

To update or modify an existing retention policy, call the [`retentionPolicies.update(policyID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#update)
method where `updates` is the set of key-value pairs to be updated on the policy object.

<!-- sample put_retention_policies_id -->

```js
client.retentionPolicies
	.update('123456789', { status: 'retired' })
	.then((policy) => {
		/* policy -> {
			type: 'retention_policy',
			id: '123456789',
			policy_name: 'Tax Documents',
			policy_type: 'indefinite',
			retention_length: 'indefinite',
			retention_type: 'modifiable',
			description: 'Policy to retain all reports',
			disposition_action: 'remove_retention',
			can_owner_extend_retention: false,
			status: 'retired',
			are_owners_notified: true,
			custom_notification_recipients: []
			assignment_counts: { enterprise: 0, folder: 1, metadata_template: 0 },
			created_by:
			{ type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2015-05-01T11:12:54-07:00',
			modified_at: '2015-06-08T11:11:50-07:00' }
		*/
	});
```

## Get Enterprise Retention Policies

To retrieve all of the retention policies for the given enterprise, call the [`retentionPolicies.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAll) method.

<!-- sample get_retention_policies -->

```js
client.retentionPolicies.getAll({ policy_name: 'Tax' }).then((policies) => {
	/* policies -> {
			entries:
			[ { type: 'retention_policy',
				id: '123456789',
				name: 'Tax Documents' } ],
			limit: 100,
			next_marker: 'someMarkerString' }
		*/
});
```

## Get Retention Policy Assignments

To get a list of all retention policy assignments associated with a specified retention policy,
call the [`retentionPolicies.getAssignments(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAssignments)
method.

<!-- sample get_retention_policies_id_assignments -->

```js
client.retentionPolicies
	.getAssignments('123456789', { type: 'folder' })
	.then((assignments) => {
		/* assignments -> {
			entries: [ { type: 'retention_policy_assignment', id: '12345678' } ],
			limit: 100,
			next_marker: 'someMarkerString' }
		*/
	});
```

## Assign Retention Policy

To assign a retention policy, call the [`retentionPolicies.assign(policyID, assignType, assignID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#assign)
method. If assigning to an `enterprise`, no `assignID` should be provided.

<!-- sample post_retention_policy_assignments -->

```js
client.retentionPolicies
	.assign('11111', 'folder', '22222')
	.then((assignment) => {
		/* assignment -> {
			type: 'retention_policy_assignment',
			id: '12345',
			retention_policy:
			{ type: 'retention_policy',
				id: '11111',
				policy_name: 'Tax Documents' },
			assigned_to: { type: 'folder', id: '22222' },
			assigned_by:
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2015-07-20T14:28:09-07:00' }
		*/
	});
```

```js
client.retentionPolicies.assign('98726345', 'enterprise', null, callback);
```

You can also assign a retention policy to a metadata template, with optional field filters.
This will attach the retention policy to any items that have the specified metadata template
applied. If the `filter_fields` option is provided, the retention policy will only apply to
items with the specified value in the metadata field.

> **Note:** Currently, only one filter field can be specified, and only enum metadata fields
> are supported at this time.

```js
var policyID = '1234';
// metadata template is specified by ID
var metadataTemplate = 'cff6f515-5a92-4dca-b4b3-e401ef97cf76';
var options = {
	filter_fields: [
		{
			// fields and enum values are specified by ID
			field: '7475b170-3d5e-4dec-b617-9cfd35ae1ecd',
			value: '59157d60-6fec-419c-b0cc-506391ff51b8',
		},
	],
};
client.retentionPolicies
	.assign(
		policyID,
		client.retentionPolicies.assignmentTypes.METADATA,
		metadataTemplate,
		options
	)
	.then((assignment) => {
		/* assignment -> {
			type: 'retention_policy_assignment',
			id: '12345',
			retention_policy:
			{ type: 'retention_policy',
				id: '11111',
				policy_name: 'Tax Documents' },
			assigned_to: { type: 'metadata_template', id: 'cff6f515-5a92-4dca-b4b3-e401ef97cf76' },
			filter_fields: [
				{ field: '7475b170-3d5e-4dec-b617-9cfd35ae1ecd',
					value: '59157d60-6fec-419c-b0cc-506391ff51b8' } ]
			assigned_by:
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2015-07-20T14:28:09-07:00',
			start_date_field: 'upload_date' }
		*/
	});
```

## Get Retention Policy Assignment

To retrieve information about a retention policy assignment, call the
[`retentionPolicies.getAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAssignment)
method.

<!-- sample get_retention_policy_assignments_id -->

```js
client.retentionPolicies.getAssignment('12345').then((assignment) => {
	/* assignment -> {
			type: 'retention_policy_assignment',
			id: '12345',
			retention_policy:
			{ type: 'retention_policy',
				id: '11111',
				policy_name: 'Tax Documents' },
			assigned_to: { type: 'folder', id: '22222' },
			assigned_by:
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2015-07-20T14:28:09-07:00' }
		*/
});
```

## Delete Retention Policy Assignment

To delete a retention policy assignment, call the
[`retentionPolicies.deleteAssignment(assignmentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#deleteAssignment)
method.

<!-- sample delete_retention_policy_assignments_id -->

```js
client.retentionPolicies.deleteAssignment('12345')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

## Get File Version Retention

A file version retention is a record for a retained file version. To get information
for a specific file version retention record, call the
[`retentionPolicies.getFileVersionRetention(retentionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getFileVersionRetention)
method.

<!-- sample get_file_version_retentions_id -->

```js
client.retentionPolicies.getFileVersionRetention('55555').then((retention) => {
	/* retention -> {
			type: 'file_version_retention',
			id: '55555',
			applied_at: '2015-08-06T22:02:24-07:00',
			disposition_at: '2016-08-06T21:45:28-07:00',
			winning_retention_policy:
			{ type: 'retention_policy',
				id: '11111',
				policy_name: 'Tax Documents' },
			file_version:
			{ type: 'file_version',
				id: '44444',
				sha1: '4262d6250b0e6f440dca43a2337bd4621bad9136' },
			file: { type: 'file', id: '33333', etag: '2' } }
		*/
});
```

## Get File Version Retentions

To retrieve a list of all file version retentions for the given enterprise or to filter for
some category of file version retention records, call the
[`retentionPolicies.getAllFileVersionRetentions(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAllFileVersionRetentions)
method. Optional filters are passed via the `options` parameter.

<!-- sample get_file_version_retentions -->

```js
// Get only the retention records set to delete items before a certain date
var options = {
	disposition_action:
		client.retentionPolicies.dispositionActions.PERMANENTLY_DELETE,
	disposition_before: '2038-01-01T12:34:56-08:00',
};
client.retentionPolicies
	.getAllFileVersionRetentions(options)
	.then((retentions) => {
		/* retentions -> {
			entries:
			[ { type: 'file_version_retention', id: '112725' },
				{ type: 'file_version_retention', id: '112729' },
				{ type: 'file_version_retention', id: '112733' } ],
			limit: 100,
			order: [ { by: 'file_version_id', direction: 'ASC' } ] }
		*/
	});
```

## Get Files Under Retention For Assignment

To retrieve information about files under retention, call the
[`retentionPolicies.getFilesUnderRetentionForAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getFilesUnderRetentionForAssignment) method.

<!-- sample get_retention_policy_assignments_id_files_under_retention -->

```js
client.retentionPolicies
	.getFilesUnderRetentionForAssignment('12345')
	.then((files) => {
		/* files -> {
			entries:
			[ {
				id: 12345,
				etag: 1,
				type: 'file',
				sequence_id: 3,
				name: 'Contract.pdf',
				sha1: '85136C79CBF9FE36BB9D05D0639C70C265C18D37',
				file_version: {
					id: 123456,
					type: 'file_version',
					sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
				},
				applied_at: '2012-12-12T10:53:43-08:00' } ],
			limit: 1000,
			marker: 'some marker' }
		*/
	});
```

## Get File Versions Under Retention For Assignment

To retrieve information about files under retention, call the
[`retentionPolicies.getFileVersionUnderRetentionForAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getFileVersionUnderRetentionForAssignment) method.

<!-- sample get_retention_policy_assignments_id_file_versions_under_retention -->

```js
client.retentionPolicies
	.getFilesVersionUnderRetentionForAssignment('12345')
	.then((fileVersions) => {
		/* fileVersions -> {
			entries:
			[ {
				id: 123456,
				etag: 1,
				type: 'file_version',
				sequence_id: 3,
				name: 'Contract.pdf',
				sha1: '85136C79CBF9FE36BB9D05D0639C70C265C18D37',
				file_version: {
					id: 1234567,
					type: 'file_version',
					sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
				},
				applied_at: '2012-12-12T10:53:43-08:00' } ],
			limit: 1000,
			marker: 'some marker' }
		*/
	});
```
