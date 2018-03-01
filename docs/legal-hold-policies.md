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
client.legalHoldPolicies.create('IRS Audit', null, callback);
```

Get Legal Hold Policy
--------------------

To retrieve information about a specific legal hold policy, call the [`legalHoldPolicies.get(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#get)
method.

```js
client.legalHoldPolicies.get('12345', null, callback);
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
client.legalHoldPolicies.update('893465', {release_notes: 'Retired'}, callback);
```

Delete Legal Hold Policy
------------------------

To delete a legal hold policy, call the
[`legalHoldPolicies.delete(policyID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#delete) method.
Note that this is an asynchronous process - the policy will not be fully deleted
yet when the response comes back.

```js
client.legalHoldPolicies.delete('876235', callback);
```

Get Enterprise Legal Hold Policies
----------------------------------

To retrieve all of the legal hold policies for the given enterprise, call the
[`legalHoldPolicies.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAll) method.

```js
client.legalHoldPolicies.getAll({policy_name: 'Important'}, callback);
```

Get Legal Hold Policy Assignments
---------------------------------

To get a list of all legal hold policy assignments associated with a specified legal hold policy,
call the [`legalHoldPolicies.getAssignments(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAssignments)
method.

```js
client.legalHoldPolicies.getAssignments('8763245', {assign_to_type: 'folder'}, callback);
```

Assign Legal Hold Policy
-----------------------

To assign a legal hold policy, call the [`legalHoldPolicies.assign(policyID, assignType, assignID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#assign)
method.

```js
client.legalHoldPolicies.assign('98726345', 'folder', '876334', callback);
```

Delete Legal Hold Policy Assignment
-----------------------------------

To delete a legal hold assignment and remove a legal hold policy from an item, call the
[`legalHoldPolicies.deleteAssignment(assignmentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#deleteAssignment)
method.  Note that this is an asynchronous process - the assignment will not be fully deleted
yet when the response comes back.

```js
client.legalHoldPolicies.deleteAssignment('876345', callback);
```

Get Legal Hold Policy Assignment
--------------------------------

To retrieve information about a legal hold policy assignment, call the
[`legalHoldPolicies.getAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAssignment)
method.

```js
client.legalHoldPolicies.getAssignment('8762345', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.legalHoldPolicies.getAssignment('8762345', {fields: 'id,assigned_by,assigned_at'}, callback);
```

Get File Version Legal Hold
---------------------------

A file version legal hold is a record for a held file version.  To get information
for a specific file version legal hold record, call the
[`legalHoldPolicies.getFileVersionLegalHold(legalHoldID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getFileVersionLegalHold)
method.

```js
client.legalHoldPolicies.getFileVersionLegalHold('23645789', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.legalHoldPolicies.getFileVersionLegalHold('8762345', {fields: 'id,file'}, callback);
```

Get File Version Legal Holds
----------------------------

To retrieve a list of all file version legal holds for a given policy, call the
[`legalHoldPolicies.getAllFileVersionLegalHolds(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/LegalHoldPolicies.html#getAllFileVersionLegalHolds)
method.

```js
client.legalHoldPolicies.getAllFileVersionLegalHolds('873645', null, callback);
```
