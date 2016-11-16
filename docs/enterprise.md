Enterprise
==========

* [Get Enterprise Users](#get-enterprise-users)
* [Invite User to Enterprise](#invite-user-to-enterprise)
* [Add New User](#add-new-user)

Get Enterprise Users
--------------------

Get a list of users in the current enterprise by calling the
[`enterprise.getUsers(options, callback)`](http://opensource.box.com/box-node-sdk/Enterprise.html#getUsers)
method.

```js
client.enterprise.getUsers(null, callback);
```

Invite User to Enterprise
-------------------------

Invite a user to an enterprise by calling the
[`enterprise.inviteUser(enterpriseID, email, callback)`](http://opensource.box.com/box-node-sdk/Enterprise.html#inviteUser)
method with the ID of the enterprise and the user's email address.

```js
client.enterprise.inviteUser('1345', 'jsmith@box.com', callback);
```

Add New User
------------

To provision a new user within the current enterprise, call the
[`enterprise.addUser(login, name, options, callback)`](http://opensource.box.com/box-node-sdk/Enterprise.html#addUser)
method with the email address the user will use to log in and the user's name.

```js
client.enterprise.addUser(
	'eddard@box.com',
	'Ned Stark',
	{
		role: client.enterprise.userRoles.COADMIN,
		address: '555 Box Lane',
		status: client.enterprise.userStatuses.CANNOT_DELETE_OR_EDIT
	},
	callback
);
```
