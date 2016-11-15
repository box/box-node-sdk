Enterprise
==========

* [Get Enterprise Users](#get-enterprise-users)
* [Invite User to Enterprise](#invite-user-to-enterprise)

Get Enterprise Users
--------------------

Get a list of users in the current enterprise by calling the
[`enterprise.getUser(options, callback)`](http://opensource.box.com/box-node-sdk/Enterprise.html#getUsers)
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
