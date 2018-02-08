Storage Policies
================

Storage policies allow enterprise administrators to choose where their content is physically stored;
different policies can be purchased and assigned either as the default policy for the entire enterprise
or on a per-user basis.

Get Available Storage Policies for an Enterprise
------------------------------------------------

To get a list of the storage policies that are available for the current user's enterprise,
call the [`storagePolicies.getAll(options, callback)`][getAll] method.

```js
var options = {
    fields: 'name'
};

client.storagePolicies.getAll(options, callback);
```

[getAll]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#getAll

Get Information About a Specific Storage Policy
-----------------------------------------------

Information about a specific storage policy (by its ID) can be retrieved by calling
the [`storagePolicies.get(storagePolicyID, options, callback)`][get] method with the
ID of the assignment object.

```js
var options = {
    fields: 'name'
};
client.storagePolicies.get('1', options, callback);
```

[get]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#get

Assign a Storage Policy to a User
---------------------------------

To assign a storage policy to a user, call the [`storagePolicies.assign(storagePolicyID, userID, callback)`][assign]
method with the ID of the storage policy to assign and the ID of the user to which it should be assigned.

```js
client.storagePolicies.assign('4', '5678', callback);
```

[assign]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#assign

Get Information About a Specific Storage Policy Assignment
----------------------------------------------------------

To get information about a specific storage policy assignment by ID, call the
[`storagePolicies.getAssignment(asisgnmentID, callback)`][getAssignment] method
with the ID of the storage policy assignment.

```js
client.storagePolicies.getAssignment('user_1234', callback);
```

[getAssignment]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#getAssignment

Get the Storage Policy Assigned to a User
-----------------------------------------

To determine which storage policy is assigned to a user, call
[`storagePolicies.getAssignmentForTarget(userID, callback)`][getAssignmentForTarget]
with the ID of the user.

```js
client.storagePolicies.getAssignmentForTarget('1234', callback);
```

[getAssignmentForTarget]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#getAssignmentForTarget

Update a Storage Policy Assignment
----------------------------------

To update a storage policy assignment, for example to update which storage policy is
asisgned to a user, call the [`storagePolicies.updateAssignment(assignmentID, updates, callback)`][updateAssignment]
method with the ID of the assignment to update and an object containing key/value mapping of fields
to update on the assignment.

```js
// Reassign user 1234 to storage policy 7
var assignmentID = 'user_1234';
var updates = {
    storage_policy: {
        type: 'storage_policy',
        id: '7'
    }
};
client.storagePolicies.updateAssignment(assignmentID, updates, callback);
```

[updateAssignment]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#updateAssignment

Remove a Storage Policy Assignment
----------------------------------

To remove a storage policy assignment and return the user it was assigned to to the
default storage policy for the enterprise, call
[`storagePolicies.removeAssignment(assignmentID, callback)`][removeAssignment] with
the ID of the assignment to remove.

```js
client.storagePolicies.removeAssignment(assignmentID, callback);
```

[removeAssignment]: http://opensource.box.com/box-node-sdk/jsdoc/StoragePolicies.html#removeAssignment
