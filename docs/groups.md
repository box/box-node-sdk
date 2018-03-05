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

Create Group
------------

To create a new group, call the
[`groups.create(name, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#create)
method.

```js
client.groups.create('My group', {description: 'An example group'}, callback);
```

Get Group
---------

To retrieve the information for a group, call the
[`groups.get(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#get)
method.

```js
client.groups.get('78346', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.groups.get('12345', {fields: 'name,description'}, callback);
```

Update Group
------------

To change the properties of a group object, call the
[`groups.update(groupID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#update)
method with `updates` being the set of properties to update.

```js
client.groups.update('873645', {name: 'New group name'}, callback);
```

Delete Group
------------

To delete a group, call the
[`groups.delete(groupID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#delete)
method.

```js
client.groups.delete('238475', callback);
```

Add a User to a Group
---------------------

To add a user to a group, call the
[`groups.addUser(groupID, userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#addUser)
method.

```js
client.groups.addUser('12345', '54321', {role: client.groups.userRoles.MEMBER}, callback);
```

Get Membership
--------------

To retrieve information about a specific membership record, which shows that a
given user is in the group, call the
[`groups.getMembership(membershipID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getMembership)
method.

```js
client.groups.getMembership('38456', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Get a list of users in the group and when they were added
client.groups.getMembership('12345', {fields: 'user,created_at'}, callback);
```

Get Group Memberships for a User
--------------------------------

To get a list of groups to which a user belongs, call the
[`users.getGroupMemberships(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#getGroupMemberships)
method.  Note that this method requires the calling user to have permission to
view groups, which is restricted to enterprise administrators.

```js
client.users.getGroupMemberships('873645', null, callback);
```

Update Membership
-----------------

To update a membership record, call the
[`groups.updateMembership(membershipID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#updateMembership)
method with `updates` being the properties to update.

```js
// Promote a user to group admin
client.groups.updateMembership('12345', {role: client.groups.userRoles.ADMIN}, callback);
```

Remove Membership
-----------------

To remove a specific membership record, which removes a user from the group, call the
[`groups.removeMembership(membershipID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#removeMembership)
method with the ID of the membership record to remove.

```js
client.groups.removeMembership('12345', callback);
```

Get Group Memberships
---------------------

To get a list of all memberships to a group, call the
[`groups.getMemberships(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getMemberships)
method with the ID of the group to get the list of memberships for.

```js
client.groups.getMemberships('12345', {limit: 100}, callback);
```

Get Enterprise Groups
---------------------

To get a list of all groups in the calling user's enterprise, call the
[`groups.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getAll)
method.  Note that this requires permission to view an enterprise's groups, which
is reserved for enterprise administrators.

```js
client.groups.getAll({limit: 100}, callback);
```

Get Group Collaborations
------------------------

To get a list of collaborations for a group, which show which items the group has
access to, call the
[`groups.getCollaborations(groupID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Groups.html#getCollaborations)
method.

```js
client.groups.getCollaborations('12345', {fields: 'item,role'}, callback);
```
