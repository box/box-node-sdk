Enterprise
==========

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get Enterprise Users](#get-enterprise-users)
- [Invite User to Enterprise](#invite-user-to-enterprise)
- [Add New User](#add-new-user)
- [Add New App User](#add-new-app-user)
- [Transfer User Content](#transfer-user-content)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get Enterprise Users
--------------------

Get a list of users in the current enterprise by calling the
[`enterprise.getUsers(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Enterprise.html#getUsers)
method. This method supports offset-based pagination and marker-based pagintation. To use offset-based pagination, do not pass in the `usemarker` parameter or set it to `false`. To use marker-based pagination, pass in the `usemarker` parameter as `true`. Use the `fields` option to specify the desired response fields, and `limit` (along with `offset` or `marker`) to control result set paging. Requesting information for only the fields you need can improve performance by reducing the size of the network response.

<!-- sample get_users -->
```js
client.enterprise.getUsers({usemarker: true, marker: 'JFUirotE56hfyr56FH123'})
	.then(users => {
		/* users -> {
			total_count: 1,
			entries: 
			[ { type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com',
				created_at: '2012-05-03T21:39:11-07:00',
				modified_at: '2012-08-23T14:57:48-07:00',
				language: 'en',
				space_amount: 5368709120,
				space_used: 52947,
				max_upload_size: 104857600,
				status: 'active',
				job_title: '',
				phone: '5555551374',
				address: '10 Cloud Way Los Altos CA',
				avatar_url: 'https://app.box.com/api/avatar/large/deprecated' } ] }
		*/
	});
```

Invite User to Enterprise
-------------------------

Invite a user to an enterprise by calling the
[`enterprise.inviteUser(enterpriseID, email, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Enterprise.html#inviteUser)
method with the ID of the enterprise and the user's email address.

<!-- sample post_invites -->
```js
client.enterprise.inviteUser('1345', 'jsmith@box.com', callback);
```

Add New User
------------

To provision a new managed user within the current enterprise, call the
[`enterprise.addUser(login, name, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Enterprise.html#addUser)
method with the email address the user will use to log in and the user's name.

<!-- sample post_users -->
```js
client.enterprise.addUser(
	'eddard@winterfell.example.com',
	'Ned Stark',
	{
		role: client.enterprise.userRoles.COADMIN,
		address: '555 Box Lane',
		status: client.enterprise.userStatuses.CANNOT_DELETE_OR_EDIT
	})
	.then(user => {
		/* user -> {
			type: 'user',
			id: '44444',
			name: 'Ned Stark',
			login: 'eddard@winterfell.example.com',
			created_at: '2012-11-15T16:34:28-08:00',
			modified_at: '2012-11-15T16:34:29-08:00',
			role: 'coadmin',
			language: 'en',
			timezone: 'America/Los_Angeles',
			space_amount: 5368709120,
			space_used: 0,
			max_upload_size: 2147483648,
			status: 'active',
			job_title: '',
			phone: '',
			address: '555 Box Lane',
			avatar_url: 'https://www.box.com/api/avatar/large/deprecated' }
        */
	});
```

Add New App User
----------------

To provision a new app user within the current enterprise, call the
[`enterprise.addAppUser(name, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Enterprise.html#addAppUser)
method with the user's name.

```js
client.enterprise.addAppUser('Daenerys Targaryen', { external_app_user_id: 'external-id' })
	.then(appUser => {
		/* appUser -> {
			type: 'user',
			id: '55555',
			name: 'Daenerys Targaryen',
			login: 'AppUser_59659_vuNs7OCQ7y@box.com',
			created_at: '2015-04-20T20:09:59-07:00',
			modified_at: '2015-04-20T20:09:59-07:00',
			language: 'en',
			timezone: 'America/Los_Angeles',
			space_amount: 5368709120,
			space_used: 0,
			max_upload_size: 16106127360,
			status: 'active',
			job_title: '',
			phone: '',
			address: '',
			avatar_url: '' }
		*/
	});
```

Transfer User Content
---------------------

To transfer one managed user's content to another user's account, call the
[`enterprise.transferUserContent(sourceUserID, destUserID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Enterprise.html#transferUserContent)
method with the IDs of the source and destination users.

<!-- sample put_users_id_folders_id -->
```js
var sourceUserID = '33333';
var destinationUserID = '44444';
client.enterprise.transferUserContent(sourceUserID, destinationUserID)
	.then(movedFolder => {
		/* movedFolder -> {
			type: 'folder',
			id: '123456789',
			sequence_id: '1',
			etag: '1',
			name: 'Other User's Files and Folders',
			created_at: '2018-04-23T11:00:07-07:00',
			modified_at: '2018-04-23T11:00:07-07:00',
			description: 'This folder contains files previously owned by Other User, and were transferred to you by your enterprise administrator. If you have any questions, please contact Enterprise Admin (admin@example.com).',
			size: 0,
			path_collection: 
			{ total_count: 1,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' } ] },
			created_by: 
			{ type: 'user',
				id: '99999',
				name: 'Enterprise Admin',
				login: 'admin@example.com' },
			modified_by: 
			{ type: 'user',
				id: '99999',
				name: 'Enterprise Admin',
				login: 'admin@example.com' },
			trashed_at: null,
			purged_at: null,
			content_created_at: '2018-04-23T11:00:07-07:00',
			content_modified_at: '2018-04-23T11:00:07-07:00',
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			shared_link: null,
			folder_upload_email: null,
			parent: 
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			item_status: 'active' }
		*/
	});
```
