Enterprise
==========

Enterprise represents the organization using Box.

* [Create an User](#create-an-user)

Create an User
--------------

To create an user within enterprise call the [`enterprise.createUser(login, name, options, callback)`](http://opensource.box.com/box-node-sdk/Enterprise.html#createUser) method.

```js
client.enterprise.createUser(
	'eddard@box.com',
	'Ned Stark',
	{
		role: client.enterprise.userRoles.COADMIN,
		address: '555 Box Lane',
		status: client.enterprise.userStatuses.CANNOT_DELETE_EDIT
	},
	callback
);
```
