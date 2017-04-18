Collaborations
==============

Collaborations are used to share folders between users or groups. They also
define what permissions a user has for a folder.

* [Add a Collaboration](#add-a-collaboration)
* [Edit a Collaboration](#edit-a-collaboration)
* [Remove a Collaboration](#remove-a-collaboration)
* [Get a Collaboration's Information](#get-a-collaborations-information)
* [Get the Collaborations on a Folder](#get-the-collaborations-on-a-folder)
* [Get the Collaborations on a File](#get-the-collaborations-on-a-file)
* [Get Pending Collaborations](#get-pending-collaborations)
* [Respond to Pending Collaborations](#respond-to-pending-collaborations)

Add a Collaboration
-------------------

A collaboration can be added for an existing user with
[`collaborations.createWithUserID(userID, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithUserID).
The `role` parameter determines what permissions the collaborator will have on the
folder.  You can create a collaboration on a file by setting the `type` option to `'file'`.

```js
// Invite user 123456 to collaborate on folder 987654
client.collaborations.createWithUserID('123456', '987654', client.collaborationRoles.EDITOR, callback);
```

```js
// Invite user 123456 to collaborate on file 987654
client.collaborations.createWithUserID(
		'123456',
		'987654',
		client.collaborationRoles.EDITOR,
		{
			type: client.itemTypes.FILE
		},
		callback
	);
```

You can also add a collaboration by providing an email address with
[`collaborations.createWithUserEmail(email, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithUserEmail). If the recipient
doesn't have a Box account, they will be asked create one.

```js
client.collaborations.createWithUserEmail('user@example.com', '987654', client.collaborationRoles.VIEWER, callback);
```

Groups can also be added as collaborators by providing the group ID to
[`collaborations.createWithGroupID(groupID, itemID, role, options, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithGroupID).
All members of the group will receive the same role and permissions.

```js
client.collaborations.createWithGroupID('56473', '987654', client.collaborationRoles.UPLOADER, callback);
```

Edit a Collaboration
--------------------

A collaboration can be edited by calling [`collaborations.update(collaborationID, options, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#update)
with the fields to be updated.  For example, to change the role of a collaboration:

```js
client.collaborations.update('56473', {role: client.collaborationRoles.PREVIEWER}, callback);
```

Remove a Collaboration
----------------------

A collaboration can be removed by calling [`collaborations.delete(collaborationID, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#delete).

```js
client.collaborations.delete('56473', callback);
```

Get a Collaboration's Information
---------------------------------

Calling [`collaborations.get(collaborationID, qs, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#get) on a
collaboration returns a snapshot of the collaboration's info.

```js
client.collaborations.get('12345', {fields: 'accessible_by,role,item'}, callback);
```

Get the Collaborations on a Folder
----------------------------------

You can get all of the collaborations on a folder by calling
[`folders.getCollaborations(folderID, qs, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getCollaborations)
on the folder.

```js
client.folders.getCollaborations('11111', {fields: 'accessible_by,role'}, callback);
```

Get the Collaborations on a File
--------------------------------

You can get the collection of collaborations on a file by calling
[`files.getCollaborations(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getCollaborations)
with the ID of the file.

```js
client.files.getCollaborations('22222', {limit: 100, offset: 200}, callback);
```

Get Pending Collaborations
--------------------------

A collection of all the user's pending collaborations can be retrieved with
[`collaborations.getPending(callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#getPending).

```js
client.collaborations.getPending(callback);
```

Respond to Pending Collaborations
---------------------------------

You can accept or reject a pending collaboration by calling
[`collaborations.respondToPending(collaborationID,newStatus, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#respondToPending)
with a status of `'accepted'` or `'rejected'`.

```js
client.collaborations.respondToPending('98493', 'accepted', callback);
```
