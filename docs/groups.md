Groups
======

Groups contain a set of users, and can be used in place of individual users in some
operations, such as collaborations.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create Group](#create-group)
- [Get Group](#get-group)
- [Update Group](#update-group)
- [Delete Group](#delete-group)
- [Add a User to a Group](#add-a-user-to-a-group)
- [Get Membership](#get-membership)
- [Get Group Memberships for a User](#get-group-memberships-for-a-user)
- [Update Membership](#update-membership)
- [Remove Membership](#remove-membership)
- [Get Group Memberships](#get-group-memberships)
- [Get Enterprise Groups](#get-enterprise-groups)
- [Get Group Collaborations](#get-group-collaborations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get All Groups
--------------

To get a list of all groups in the calling user's enterprise, call the
[`groups.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getAll)
method.  Note that this requires permission to view an enterprise's groups, which
is reserved for enterprise administrators.

<!-- sample get_groups -->
```js
client.groups.getAll()
	.then(groups => {
		/* groups -> {
			total_count: 1,
			entries: [ { type: 'group', id: '1786931', name: 'friends' } ],
			limit: 100,
			offset: 0 }
		*/
	});
```

Create Group
------------

To create a new group, call the
[`groups.create(name, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#create)
method.

<!-- sample post_groups -->
```js
client.groups.create('My group', {description: 'An example group'})
	.then(group => {
		/* group -> {
			type: 'group',
			id: '119720',
			name: 'Box Employees',
			created_at: '2013-05-16T15:27:57-07:00',
			modified_at: '2013-05-16T15:27:57-07:00' }
		*/
	});
```

Get Group
---------

To retrieve the information for a group, call the
[`groups.get(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#get)
method.

<!-- sample get_groups_id -->
```js
client.groups.get('11111')
	.then(group => {
		/* group -> {
			type: 'group',
			id: '11111',
			name: 'Everyone',
			created_at: '2014-09-15T13:15:35-07:00',
			modified_at: '2014-09-15T13:15:35-07:00' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.groups.get('12345', {fields: 'name,description'})
	.then(group => {
		// ...
	});
```

Update Group
------------

To change the properties of a group object, call the
[`groups.update(groupID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#update)
method with `updates` being the set of properties to update.

<!-- sample put_groups_id -->
```js
client.groups.update('11111', {name: 'New group name'})
	.then(group => {
		/* group -> {
			type: 'group',
			id: '11111',
			name: 'New group name',
			created_at: '2014-09-15T13:15:35-07:00',
			modified_at: '2014-09-16T13:15:35-07:00' }
		*/	
	});
```

Delete Group
------------

To delete a group, call the
[`groups.delete(groupID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#delete)
method.

<!-- sample delete_groups_id -->
```js
client.groups.delete('11111')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

Add a User to a Group
---------------------

To add a user to a group, call the
[`groups.addUser(groupID, userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#addUser)
method.

<!-- sample post_group_memberships -->
```js
var groupID = '11111';
var userID = '22222';
client.groups.addUser(groupID, userID, {role: client.groups.userRoles.MEMBER})
	.then(membership => {
		/* membership -> {
			type: 'group_membership',
			id: '33333',
			user: 
			{ type: 'user',
				id: '22222',
				name: 'Alison Wonderland',
				login: 'alice@example.com' },
			group: { type: 'group', id: '11111', name: 'Employees' },
			role: 'member',
			configurable_permissions: 
			{ can_run_reports: false,
				can_instant_login: false,
				can_create_accounts: false,
				can_edit_accounts: false } }
		*/
	});
```

Get Membership
--------------

To retrieve information about a specific membership record, which shows that a
given user is in the group, call the
[`groups.getMembership(membershipID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getMembership)
method.

<!-- sample get_group_memberships_id -->
```js
client.groups.getMembership('33333')
	.then(membership => {
		/* membership -> {
			type: 'group_membership',
			id: '33333',
			user: 
			{ type: 'user',
				id: '22222',
				name: 'Alison Wonderland',
				login: 'alice@example.com' },
			group: { type: 'group', id: '11111', name: 'Employees' },
			role: 'member',
			configurable_permissions: 
			{ can_run_reports: false,
				can_instant_login: false,
				can_create_accounts: false,
				can_edit_accounts: false },
			created_at: '2013-05-16T15:27:57-07:00',
			modified_at: '2013-05-16T15:27:57-07:00' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.groups.getMembership('33333', {fields: 'user,created_at'})
	.then(membership => {
		/* membership -> {
			type: 'group_membership',
			id: '33333',
			user: 
			{ type: 'user',
				id: '22222',
				name: 'Alison Wonderland',
				login: 'alice@example.com' },
			created_at: '2013-05-16T15:27:57-07:00'
		*/
	});
```

Get Group Memberships for a User
--------------------------------

To get a list of groups to which a user belongs, call the
[`users.getGroupMemberships(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#getGroupMemberships)
method.  Note that this method requires the calling user to have permission to
view groups, which is restricted to enterprise administrators.


<!-- sample get_users_id_memberships -->
```js
var userID = '22222';
client.users.getGroupMemberships(userID)
	.then(memberships => {
		/* memberships -> {
			total_count: 1,
			entries: 
			[ { type: 'group_membership',
				id: '12345',
				user: 
					{ type: 'user',
					id: '22222',
					name: 'Alison Wonderland',
					login: 'alice@example.com' },
				group: { type: 'group', id: '11111', name: 'Employees' },
				role: 'member' } ],
			limit: 100,
			offset: 0 }
		*/
	});
```

Update Membership
-----------------

To update a membership record, call the
[`groups.updateMembership(membershipID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#updateMembership)
method with `updates` being the properties to update.


<!-- sample put_group_memberships_id -->
```js
// Promote a user to group admin
client.groups.updateMembership('12345', {role: client.groups.userRoles.ADMIN})
	.then(membership => {
		/* membership -> {
			type: 'group_membership',
			id: '33333',
			user: 
			{ type: 'user',
				id: '22222',
				name: 'Alison Wonderland',
				login: 'alice@example.com' },
			group: { type: 'group', id: '11111', name: 'Employees' },
			role: 'admin',
			configurable_permissions: 
			{ can_run_reports: false,
				can_instant_login: false,
				can_create_accounts: false,
				can_edit_accounts: false },
			created_at: '2013-05-16T15:27:57-07:00',
			modified_at: '2013-05-16T15:27:57-07:00' }
		*/
	});
```

Remove Membership
-----------------

To remove a specific membership record, which removes a user from the group, call the
[`groups.removeMembership(membershipID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#removeMembership)
method with the ID of the membership record to remove.

<!-- sample delete_group_memberships_id -->
```js
client.groups.removeMembership('33333')
	.then(() => {
		// removal succeeded — no value returned
	});
```

Get Group Memberships
---------------------

To get a list of all memberships to a group, call the
[`groups.getMemberships(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getMemberships)
method with the ID of the group to get the list of memberships for.

<!-- sample get_groups_id_memberships -->
```js
client.groups.getMemberships('11111')
	.then(memberships => {
		/* memberships -> {
			total_count: 2,
			entries: 
			[ { type: 'group_membership',
				id: '44444',
				user: 
					{ type: 'user',
					id: '22222',
					name: 'Alice',
					login: 'alice@example.com' },
				group: { type: 'group', id: '11111', name: 'Employees' },
				role: 'member' },
				{ type: 'group_membership',
				id: '55555',
				user: 
					{ type: 'user',
					id: '66666',
					name: 'White Rabbit',
					login: 'rabbit@example.com' },
				group: { type: 'group', id: '11111', name: 'Employees' },
				role: 'member' } ],
			offset: 0,
			limit: 100 }

		*/
	});
```

Get Group Collaborations
------------------------

To get a list of collaborations for a group, which show which items the group has
access to, call the
[`groups.getCollaborations(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getCollaborations)
method.

<!-- sample get_groups_id_collaborations -->
```js
client.groups.getCollaborations('11111')
	.then(collaborations => {
		/* collaborations -> {
			total_count: 1,
			entries: 
			[ { type: 'collaboration',
				id: '22222',
				created_by: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' },
				created_at: '2013-11-14T16:16:20-08:00',
				modified_at: '2013-11-14T16:16:20-08:00',
				expires_at: null,
				status: 'accepted',
				accessible_by: 
					{ type: 'group',
					id: '11111',
					name: 'Remote Employees' },
				role: 'viewer',
				acknowledged_at: '2013-11-14T16:16:20-08:00',
				item: 
					{ type: 'folder',
					id: '44444',
					sequence_id: '0',
					etag: '0',
					name: 'Documents' } } ],
			offset: 0,
			limit: 100 }
		*/
	});
```

Terminate user group session
----------------------------

To terminate a user's session for a group, call the
[`groups.terminateSession(groupID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#terminateSession) method.

<!-- sample post_groups_terminate_sessions -->
```js
var groupIDs = ['11111', '22222'];

client.groups.terminateSession(groupIDs)
	.then((result) => {
		/* result -> {
			message: 'Request is successful, please check the admin events for the status of the job'
		} */ 
	});
```
