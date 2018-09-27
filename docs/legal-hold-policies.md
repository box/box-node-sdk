Legal Hold Policies
==================

A legal hold policy blocks permanent deletion of content during ongoing litigation.
Admins can create legal hold policies and then later assign them to specific folders,
files, or users.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create Legal Hold Policy](#create-legal-hold-policy)
- [Get Legal Hold Policy](#get-legal-hold-policy)
- [Update Legal Hold Policy](#update-legal-hold-policy)
- [Delete Legal Hold Policy](#delete-legal-hold-policy)
- [Get Enterprise Legal Hold Policies](#get-enterprise-legal-hold-policies)
- [Get Legal Hold Policy Assignments](#get-legal-hold-policy-assignments)
- [Assign Legal Hold Policy](#assign-legal-hold-policy)
- [Delete Legal Hold Policy Assignment](#delete-legal-hold-policy-assignment)
- [Get Legal Hold Policy Assignment](#get-legal-hold-policy-assignment)
- [Get File Version Legal Hold](#get-file-version-legal-hold)
- [Get File Version Legal Holds](#get-file-version-legal-holds)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create Legal Hold Policy
-----------------------

To create a new legal hold policy, call the
[`legalHoldPolicies.create(name, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#create)
method.

```js
client.legalHoldPolicies.create('IRS Audit')
	.then(policy => {
		/* policy -> {
			type: 'legal_hold_policy',
			id: '11111',
			policy_name: 'IRS Audit',
			description: '',
			status: 'active',
			assignment_counts: { user: 0, folder: 0, file: 0, file_version: 0 },
			is_ongoing: true,
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2017-01-24T16:57:22-08:00',
			modified_at: '2017-01-24T16:57:22-08:00',
			deleted_at: null,
			filter_started_at: null,
			filter_ended_at: null }
		*/
	});
```

Get Legal Hold Policy
--------------------

To retrieve information about a specific legal hold policy, call the
[`legalHoldPolicies.get(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#get)
method.

```js
client.legalHoldPolicies.get('11111')
	.then(policy => {
		/* policy -> {
			type: 'legal_hold_policy',
			id: '11111',
			policy_name: 'IRS Audit',
			description: '',
			status: 'active',
			assignment_counts: { user: 1, folder: 0, file: 0, file_version: 0 },
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-18T10:28:45-07:00',
			modified_at: '2016-05-18T11:25:59-07:00',
			deleted_at: null,
			filter_started_at: '2016-05-17T01:00:00-07:00',
			filter_ended_at: '2016-05-21T01:00:00-07:00' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.legalHoldPolicies.get('12345', {fields: 'policy_name,created_at,created_by'}, callback);
```

Update Legal Hold Policy
------------------------

To update or modify an existing legal hold policy, call the
[`legalHoldPolicies.update(policyID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#update)
method where `updates` is the set of key-value pairs to be updated on the policy object.

```js
client.legalHoldPolicies.update('11111', {description: 'Documents related to IRS audit'})
	.then(policy => {
		/* policy -> {
			type: 'legal_hold_policy',
			id: '11111',
			policy_name: 'IRS Audit',
			description: 'Documents related to IRS audit',
			status: 'active',
			assignment_counts: { user: 1, folder: 0, file: 0, file_version: 0 },
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-18T10:28:45-07:00',
			modified_at: '2016-05-18T11:25:59-07:00',
			deleted_at: null,
			filter_started_at: '2016-05-17T01:00:00-07:00',
			filter_ended_at: '2016-05-21T01:00:00-07:00' }
		*/
	});
```

Delete Legal Hold Policy
------------------------

To delete a legal hold policy, call the
[`legalHoldPolicies.delete(policyID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#delete) method.
Note that this is an asynchronous process - the policy will not be fully deleted
yet when the response comes back.

```js
client.legalHoldPolicies.delete('11111')
	.then(() => {
		// deletion started — no value returned	
	});
```

Get Enterprise Legal Hold Policies
----------------------------------

To retrieve all of the legal hold policies for the given enterprise, call the
[`legalHoldPolicies.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAll) method.

```js
client.legalHoldPolicies.getAll({policy_name: 'Important'})
	.then(policies => {
		/* policies -> {
			entries: 
			[ { type: 'legal_hold_policy',
				id: '11111',
				policy_name: 'Important Policy 1' },
				{ type: 'legal_hold_policy',
				id: '22222',
				policy_name: 'Important Policy 2' } ],
			limit: 100,
			order: [ { by: 'policy_name', direction: 'ASC' } ] }
		*/
	});
```

Get Legal Hold Policy Assignments
---------------------------------

To get a list of all legal hold policy assignments associated with a specified legal hold policy,
call the [`legalHoldPolicies.getAssignments(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAssignments)
method.

```js
client.legalHoldPolicies.getAssignments('8763245', {assign_to_type: 'folder'})
	.then(assignments => {
		/* assignments -> {
			entries: [ { type: 'legal_hold_policy_assignment', id: '22222' } ],
			limit: 100,
			next_marker: 'someMarkerString' }
		*/
	});
```

Assign Legal Hold Policy
-----------------------

To assign a legal hold policy, call the
[`legalHoldPolicies.assign(policyID, assignType, assignID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#assign)
method.

```js
client.legalHoldPolicies.assign('11111', 'folder', '12345')
	.then(assignment => {
		/* assignment -> {
			type: 'legal_hold_policy_assignment',
			id: '22222',
			legal_hold_policy: 
			{ type: 'legal_hold_policy',
				id: '11111',
				policy_name: 'IRS Audit' },
			assigned_to: { type: 'folder', id: '12345' },
			assigned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2016-05-18T17:38:03-07:00',
			deleted_at: null }
		*/
	});
```

Delete Legal Hold Policy Assignment
-----------------------------------

To delete a legal hold assignment and remove a legal hold policy from an item, call the
[`legalHoldPolicies.deleteAssignment(assignmentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#deleteAssignment)
method.  Note that this is an asynchronous process - the assignment will not be fully deleted
yet when the response comes back.

```js
client.legalHoldPolicies.deleteAssignment('22222')
	.then(() => {
		// deletion started — no value returned
	});
```

Get Legal Hold Policy Assignment
--------------------------------

To retrieve information about a legal hold policy assignment, call the
[`legalHoldPolicies.getAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAssignment)
method.

```js
client.legalHoldPolicies.getAssignment('22222')
	.then(assignment => {
		/* assignment -> {
			type: 'legal_hold_policy_assignment',
			id: '22222',
			legal_hold_policy: 
			{ type: 'legal_hold_policy',
				id: '11111',
				policy_name: 'IRS Audit' },
			assigned_to: { type: 'user', id: '33333' },
			assigned_by: 
			{ type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2016-05-18T10:32:19-07:00',
			deleted_at: null }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.legalHoldPolicies.getAssignment('22222', {fields: 'id,assigned_by,assigned_at'})
	.then(assignment => {
		/* assignment -> {
			type: 'legal_hold_policy_assignment',
			id: '22222',
			assigned_by: 
			{ type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com' },
			assigned_at: '2016-05-18T10:32:19-07:00' }
		*/
	});
```

Get File Version Legal Hold
---------------------------

A file version legal hold is a record for a held file version.  To get information
for a specific file version legal hold record, call the
[`legalHoldPolicies.getFileVersionLegalHold(legalHoldID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getFileVersionLegalHold)
method.

```js
client.legalHoldPolicies.getFileVersionLegalHold('55555')
	.then(fileVersionHold => {
		/* fileVersionHold -> {
			type: 'legal_hold',
			id: '55555',
			file_version: { type: 'file_version', id: '123456789' },
			file: { type: 'file', id: '66666', etag: '1' },
			legal_hold_policy_assignments: 
			[ { type: 'legal_hold_policy_assignment', id: '22222' },
				{ type: 'legal_hold_policy_assignment', id: '33333' } ],
			deleted_at: null }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.legalHoldPolicies.getFileVersionLegalHold('8762345', {fields: 'id,file'})
	.then(fileVersionHold => {
		/* fileVersionHold -> {
			type: 'legal_hold',
			id: '55555',
			file: { type: 'file', id: '66666', etag: '1' } }
		*/
	});
```

Get File Version Legal Holds
----------------------------

To retrieve a list of all file version legal holds for a given policy, call the
[`legalHoldPolicies.getAllFileVersionLegalHolds(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAllFileVersionLegalHolds)
method.

```js
client.legalHoldPolicies.getAllFileVersionLegalHolds('11111')
	.then(holds => {
		/* holds -> {
			entries: 
			[ { type: 'legal_hold', id: '22222' },
				{ type: 'legal_hold', id: '33333' },
				{ type: 'legal_hold', id: '44444' } ],
			limit: 100,
			order: 
			[ { by: 'retention_policy_set_id, file_version_id',
				direction: 'ASC' } ] }
		*/
	});
```
