Collaborations
==============

Collaborations are used to share folders between users or groups. They also
define what permissions a user has for a folder.

* [Add a Collaboration](#add-a-collaboration)
* [Edit a Collaboration](#edit-a-collaboration)
* [Remove a Collaboration](#remove-a-collaboration)
* [Get a Collaboration's Information](#get-a-collaborations-information)
* [Get the Collaborations on a Folder](#get-the-collaborations-on-a-folder)
* [Get Pending Collaborations](#get-pending-collaborations)
* [Respond to Pending Collaborations](#respond-to-pending-collaborations)

Add a Collaboration
-------------------

A collaboration can be added for an existing user with
[`collaborations.createWithUserID(userID, folderID, role, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithUserID).
The `role` parameter determines what permissions the collaborator will have on the
folder.

```js
client.collaborations.createWithUserID('123456', '987654', client.collaborationRoles.EDITOR, callback);
```

You can also add a collaboration by providing an email address with
[`collaborations.createWithUserEmail(email, folderID, role, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithUserEmail). If the recipient
doesn't have a Box account, they will be asked create one.

```js
client.collaborations.createWithUserEmail('user@example.com', '987654', client.collaborationRoles.VIEWER, callback);
```

Groups can also be added as collaborators by providing the group ID to
[`collaborations.createWithGroupID(groupID, folderID, role, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#createWithGroupID).
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

A collaboration can be removed by calling [`collaborations.delete(collaborationID, qs, callback)`](http://opensource.box.com/box-node-sdk/Collaborations.html#delete).

```js
client.collaborations.delete('56473', null, callback);
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
