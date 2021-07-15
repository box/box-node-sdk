Collaborations
==============

Collaborations are used to share folders and files between users or groups. They also define what permissions a user
has for a folder or file.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Add a Collaboration](#add-a-collaboration)
- [Edit a Collaboration](#edit-a-collaboration)
- [Remove a Collaboration](#remove-a-collaboration)
- [Get a Collaboration's Information](#get-a-collaborations-information)
- [Get the Collaborations on a Folder](#get-the-collaborations-on-a-folder)
- [Get the Collaborations on a File](#get-the-collaborations-on-a-file)
- [Get Pending Collaborations](#get-pending-collaborations)
- [Respond to Pending Collaborations](#respond-to-pending-collaborations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Add a Collaboration
-------------------

A collaboration can be added for an existing user with
[`collaborations.createWithUserID(userID, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#createWithUserID).
The `role` parameter determines what permissions the collaborator will have on the
folder.  You can create a collaboration on a file by setting the `type` option to `'file'`.

<!-- sample post_collaborations -->
```js
// Invite user 123456 to collaborate on folder 987654
client.collaborations.createWithUserID('123456', '987654', client.collaborationRoles.EDITOR)
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '11111',
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Inviting User',
				login: 'inviter@example.com' },
			created_at: '2016-11-16T21:33:31-08:00',
			modified_at: '2016-11-16T21:33:31-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: 
			{ type: 'user',
				id: '123456',
				name: 'Collaborator User',
				login: 'collaborator@example.com' },
			role: 'editor',
			acknowledged_at: '2016-11-16T21:33:31-08:00',
			item: 
			{ type: 'folder',
				id: '987654',
				sequence_id: '0',
				etag: '0',
				name: 'Collaborated Folder' } }
		*/
	});
```

```js
// Invite user 123456 to collaborate on file 987654
var options = {
	type: client.itemTypes.FILE
};
client.collaborations.createWithUserID('123456', '987654', client.collaborationRoles.EDITOR, options)
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '11111',
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Inviting User',
				login: 'inviter@example.com' },
			created_at: '2016-11-16T21:33:31-08:00',
			modified_at: '2016-11-16T21:33:31-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: 
			{ type: 'user',
				id: '123456',
				name: 'Collaborator User',
				login: 'collaborator@example.com' },
			role: 'editor',
			acknowledged_at: '2016-11-16T21:33:31-08:00',
			item: 
			{ type: 'file',
				id: '987654',
				sequence_id: '0',
				etag: '0',
				name: 'Collaborated File' } }
		*/
	});
```

You can also add a collaboration by providing an email address with
[`collaborations.createWithUserEmail(email, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#createWithUserEmail). If the recipient
doesn't have a Box account, they will be asked create one.

```js
client.collaborations.createWithUserEmail('collaborator@example.com', '987654', client.collaborationRoles.VIEWER)
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '11111',
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Inviting User',
				login: 'inviter@example.com' },
			created_at: '2016-11-16T21:33:31-08:00',
			modified_at: '2016-11-16T21:33:31-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: 
			{ type: 'user',
				id: '33333',
				name: 'Collaborator User',
				login: 'collaborator@example.com' },
			role: 'viewer',
			acknowledged_at: '2016-11-16T21:33:31-08:00',
			item: 
			{ type: 'folder',
				id: '987654',
				sequence_id: '0',
				etag: '0',
				name: 'Collaborated Folder' } }
		*/
```

Groups can also be added as collaborators by providing the group ID to
[`collaborations.createWithGroupID(groupID, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#createWithGroupID).
All members of the group will receive the same role and permissions.

<!-- sample post_collaborations group -->
```js
client.collaborations.createWithGroupID('56473', '987654', client.collaborationRoles.UPLOADER)
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '11111',
			created_by: null,
			created_at: '2016-11-16T21:48:44-08:00',
			modified_at: '2016-11-16T21:48:44-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: { type: 'group', id: '56473', name: 'My Group' },
			role: 'uploader',
			acknowledged_at: '2016-11-16T21:48:44-08:00',
			item: 
			{ type: 'folder',
				id: '987654',
				sequence_id: '0',
				etag: '0',
				name: 'Collaborated Folder' } }
		*/
	});
```

Edit a Collaboration
--------------------

A collaboration can be edited by calling [`collaborations.update(collaborationID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#update)
with the fields to be updated.  For example, to change the role of a collaboration:

<!-- sample put_collaborations_id -->
```js
client.collaborations.update('11111', {role: client.collaborationRoles.PREVIEWER})
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '11111',
			created_by: 
			{ type: 'user',
				id: '22222',
				name: 'Inviting User',
				login: 'inviter@example.com' },
			created_at: '2015-11-03T18:36:37-08:00',
			modified_at: '2016-11-16T21:01:19-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: 
			{ type: 'user',
				id: '33333',
				name: 'Collaborated User',
				login: 'collaborator@example.com' },
			role: 'previewer',
			acknowledged_at: '2015-11-03T18:36:37-08:00',
			item: 
			{ type: 'folder',
				id: '44444',
				sequence_id: '1',
				etag: '1',
				name: 'Collaborated Folder' } }
	 */
	});
```

Remove a Collaboration
----------------------

A collaboration can be removed by calling [`collaborations.delete(collaborationID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#delete).

<!-- sample delete_collaborations_id -->
```js
client.collaborations.delete('56473')
	.then(() => {
		// removal succeeded — no value provided
	});
```

Get a Collaboration's Information
---------------------------------

Calling [`collaborations.get(collaborationID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#get) on a
collaboration returns a snapshot of the collaboration's info.

<!-- sample get_collaborations_id -->
```js
var collaborationID = '22222';
client.collaborations.get(collaborationID)
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '22222',
			created_by: {
				type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com'
			},
			created_at: '2012-12-12T10:54:37-08:00',
			modified_at: '2012-12-12T11:30:43-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: {
				type: 'user',
				id: '33333',,
				name: 'Collaborator User',
				login: 'collaborator@example.com'
			},
			role: 'editor',
			acknowledged_at: '2012-12-12T11:30:43-08:00',
			item: {
				type: 'folder',
				id: '12345',
				sequence_id: '0',
				etag: '0',
				name: 'Shared Pictures'
			}
		}
		*/
	});
```

Get the Collaborations on a Folder
----------------------------------

You can get all of the collaborations on a folder by calling
[`folders.getCollaborations(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getCollaborations)
on the folder.

<!-- sample get_folders_id_collaborations -->
```js
var folderID = '12345';
client.folders.getCollaborations(folderID)
	.then(collaborations => {
		/* collaborations -> {
			total_count: 1,
			entries: [
				{
					type: 'collaboration',
					id: '11111',
					created_by: {
						type: 'user',
						id: '22222',
						name: 'Example User',
						login: 'user@example.com'
					},
					created_at: '2011-11-29T12:56:35-08:00',
					modified_at: '2012-09-11T15:12:32-07:00',
					expires_at: null,
					status: 'accepted',
					accessible_by: {
						type: 'user',
						id: '33333',
						name: 'Collaborator User',
						login: 'collaborator@example.com'
					},
					role: 'editor',
					acknowledged_at: '2011-11-29T12:59:40-08:00',
					item: null
				}
			]
		}
		*/
	});
```

Get the Collaborations on a File
--------------------------------

You can get the collection of collaborations on a file by calling
[`files.getCollaborations(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getCollaborations)
with the ID of the file.

<!-- sample get_files_id_collaborations -->
```js
var fileID = '98765';
client.files.getCollaborations(fileID)
	.then(collaborations => {
		/* collaborations -> {
			total_count: 1,
			entries: [
				{
					type: 'collaboration',
					id: '11111',
					created_by: {
						type: 'user',
						id: '22222',
						name: 'Example User',
						login: 'user@example.com'
					},
					created_at: '2011-11-29T12:56:35-08:00',
					modified_at: '2012-09-11T15:12:32-07:00',
					expires_at: null,
					status: 'accepted',
					accessible_by: {
						type: 'user',
						id: '33333',
						name: 'Collaborator User',
						login: 'collaborator@example.com'
					},
					role: 'editor',
					acknowledged_at: '2011-11-29T12:59:40-08:00',
					item: null
				}
			]
		}
		*/
	});
```

Get Pending Collaborations
--------------------------

A collection of all the user's pending collaborations can be retrieved with
[`collaborations.getPending(callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#getPending).

<!-- sample get_collaborations -->
```js
client.collaborations.getPending()
	.then(collaborations => {
		/* collaborations -> {
			total_count: 1,
			entries: [
				{
					type: 'collaboration',
					id: '11111',
					created_by: {
						type: 'user',
						id: '22222',
						name: 'Example User',
						login: 'user@example.com'
					},
					created_at: '2011-11-29T12:56:35-08:00',
					modified_at: '2012-09-11T15:12:32-07:00',
					expires_at: null,
					status: 'pending',
					accessible_by: {
						type: 'user',
						id: '33333',
						name: 'Collaborator User',
						login: 'collaborator@example.com'
					},
					role: 'editor',
					acknowledged_at: '2011-11-29T12:59:40-08:00',
					item: null
				}
			]
		}
		*/
	});
```

Respond to Pending Collaborations
---------------------------------

You can accept or reject a pending collaboration by calling
[`collaborations.respondToPending(collaborationID,newStatus, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#respondToPending)
with a status of `'accepted'` or `'rejected'`.

<!-- sample put_collaborations_id accept_reject -->
```js
var collaborationID = '22222';
client.collaborations.respondToPending(collaborationID, 'accepted')
	.then(collaboration => {
		/* collaboration -> {
			type: 'collaboration',
			id: '22222',
			created_by: {
				type: 'user',
				id: '11111',
				name: 'Example User',
				login: 'user@example.com'
			},
			created_at: '2012-12-12T10:54:37-08:00',
			modified_at: '2012-12-12T11:30:43-08:00',
			expires_at: null,
			status: 'accepted',
			accessible_by: {
				type: 'user',
				id: '33333',,
				name: 'Collaborator User',
				login: 'collaborator@example.com'
			},
			role: 'editor',
			acknowledged_at: '2012-12-12T11:30:43-08:00',
			item: {
				type: 'folder',
				id: '12345',
				sequence_id: '0',
				etag: '0',
				name: 'Shared Pictures'
			}
		}
		*/
	});
```
