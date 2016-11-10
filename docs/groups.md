Groups
======

Groups contain a set of users, and can be used in place of users in some operations, such as collaborations.

* [Create a Group](#create-a-group)

Create a Group
--------------

To create a group call the [`groups.create(name, options, callback)`](http://opensource.box.com/box-node-sdk/Groups.html#create) method.

```js
client.groups.create(
	'Box Employees',
	{
		provenance: 'Google',
		external_sync_identifier: 'Google-Box-Users',
		description: 'All box Users',
		invitability_level: 'admins_and_members',
		member_viewability_level: 'admins_only'
	},
	callback
);
```
