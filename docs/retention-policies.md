Retention Policies
==================

A retention policy blocks permanent deletion of content for a specified amount of time.
Admins can create retention policies and then later assign them to specific folders or
their entire enterprise. To use this feature, you must have the manage retention
policies scope enabled for your API key via your application management console.

* [Create Retention Policy](#create-retention-policy)
* [Get Retention Policy](#get-retention-policy)
* [Update Retention Policy](#update-retention-policy)
* [Get Enterprise Retention Policies](#get-enterprise-retention-policies)
* [Get Retention Policy Assignments](#get-retention-policy-assignments)
* [Assign Retention Policy](#assign-retention-policy)
* [Get Retention Policy Assignment](#get-retention-policy-assignment)
* [Get File Version Retention](#get-file-version-retention)
* [Get Enterprise File Version Retentions](#get-file-version-retentions)

Create Retention Policy
-----------------------

To create a new retention policy, call the [`retentionPolicies.create(name, type, action, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#create)
method.

```js
client.retentionPolicies.create('Important Files!', client.retentionPolicies.policyTypes.INDEFINITE, client.retentionPolicies.dispositionActions.REMOVE_RETENTION, null, callback);
```

Get Retention Policy
--------------------

To retrieve information about a specific retention policy, call the [`retentionPolicies.get(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#get)
method.

```js
client.retentionPolicies.get('12345', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.retentionPolicies.get('12345', {fields: 'policy_name,created_at,created_by'}, callback);
```

Update Retention Policy
-----------------------

To update or modify an existing retention policy, call the [`retentionPolicies.update(policyID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#update)
method where `updates` is the set of key-value pairs to be updated on the policy object.

```js
client.retentionPolicies.update('893465', {status: 'retired'}, callback);
```

Get Enterprise Retention Policies
---------------------------------

To retrieve all of the retention policies for the given enterprise, call the [`retentionPolicies.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAll) method.

```js
client.retentionPolicies.getAll({policy_name: 'Important'}, callback);
```

Get Retention Policy Assignments
--------------------------------

To get a list of all retention policy assignments associated with a specified retention policy,
call the [`retentionPolicies.getAssignments(policyID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAssignments)
method.

```js
client.retentionPolicies.getAssignments('8763245', {type: 'enterprise'}, callback);
```

Assign Retention Policy
-----------------------

To assign a retention policy, call the [`retentionPolicies.assign(policyID, assignType, assignID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#assign)
method.  If assigning to an `enterprise`, no `assignID` should be provided.

```js
client.retentionPolicies.assign('98726345', 'folder', '876334', callback);
```

```js
client.retentionPolicies.assign('98726345', 'enterprise', null, callback);
```

Get Retention Policy Assignment
-------------------------------

To retrieve information about a retention policy assignment, call the
[`retentionPolicies.getAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAssignment)
method.

```js
client.retentionPolicies.getAssignment('8762345', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.retentionPolicies.getAssignment('8762345', {fields: 'id,assigned_by,assigned_at'}, callback);
```

Get File Version Retention
--------------------------

A file version retention is a record for a retained file version.  To get information
for a specific file version retention record, call the
[`retentionPolicies.getFileVersionRetention(retentionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getFileVersionRetention)
method.

```js
client.retentionPolicies.getFileVersionRetention('23645789', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.retentionPolicies.getFileVersionRetention('8762345', {fields: 'id,winning_retention_policy'}, callback);
```

Get File Version Retentions
---------------------------

To retrieve a list of all file version retentions for the given enterprise or to filter for
some category of file version retention records, call the
[`retentionPolicies.getAllFileVersionRetentions(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RetentionPolicies.html#getAllFileVersionRetentions)
method.  Filters are passed via the `options` parameter.

```js
// Get all retention records
client.retentionPolicies.getAllFileVersionRetentions(null, callback);
```

```js
// Get only the retention records set to delete items before a certain date
var options = {
	disposition_action: client.retentionPolicies.dispositionActions.PERMANENTLY_DELETE,
	disposition_before: '2038-01-01T12:34:56-08:00'
};
client.retentionPolicies.getAllFileVersionRetentions(options, callback);
```
