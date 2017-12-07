Collaboration Whitelists
========================

Collaboration Whitelists are used to determine specific domains or users that can collaborate 
with a Box Enterprise. 

* [Add a Domain to Collaboration Whitelist](#add-a-domain-to-collaboration-whitelist)
* [Get a Domain Collaboration Whitelist's Information](#get-a-domain-collaboration-whitelists-information)
* [Get the Domain Collaboration Whitelists for an Enterprise](#get-the-domain-collaboration-whitelists-for-an-enterprise)
* [Remove a Domain from Collaboration Whitelist](#remove-a-domain-from-collaboration-whitelist)
* [Add a User to Collaboration Whitelist](#add-a-user-to-collaboration-whitelist)
* [Get a User Collaboration Whitelist's Information](#get-a-user-collaboration-whitelists-information)
* [Get the User Collaboration Whitelists for an Enterprise](#get-the-user-collaboration-whitelists-for-an=enterprise)
* [Remove a User from Collaboration Whiteslists](#remove-a-user-from-collaboration-whitelists)

Add a Domain to Collaboration Whitelist
---------------------------------------

You can whitelist only certain domains to collaboration with an enterprise with
[`collaborationWhitelists.create(domain, direction, callback)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#create).

The `direction` parameter determines the level of restriction on which way the collaboration flows. Set to `inbound` will allow users outside of our enterprise to collaboration with content inside your enterprise. Set to `outbound` will allow users inside your enterprise to collaboration with content owned by someone outside your enterprise. Set to `both` will allow both `inbound` and `outbound`.

```js
client.collaborationWhitelists.create('test.com', client.collaborationWhitelistDirections.INBOUND, callback);
```

Get a Domain Collaboration Whitelist's Information
--------------------------------------------------

A collaboration whitelist's information can be retrieved by ID with
[`collaborationWhitelists.get(collaborationWhitelistID, qs, callback)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#get).

```js
client.collaborationWhitelists.get('12345', qs, callback);
```

Get the Domain Collaboration Whitelists for an Enterprise
---------------------------------------------------------

You can retrieve all collaboration whitelists for an enterprise with
[`collaborationWhitelists.getAll(options)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#getAll).

```js
client.collaborationWhitelists.getAll(callback);
```

Alternatively you can limit the number of collaboration whitelists you wish to retrieve by setting a limit, the default is 100 entries and the maximum is 1000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationWhitelists.getAll(options, callback);
```

Remove a Domain from Collaboration Whitelist
--------------------------------------------

You can remove a domain from collaboration whitelist with
[`collaborationWhitelists.delete(collaborationWhitelistID)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#delete).

```js
client.collaborationWhitelists.delete('12345', callback);
```

Add a User to Collaboration Whitelist
-------------------------------------

Alternatively, you can added a specific Box User to a collaboration whitelist with[`collaborationWhitelists.addUser(userID, callback)`]
(http://opensource.box.com/box-node-sdk/Collaborations.html#addUser).

```js
client.collaborationWhitelists.addUser('5678', callback);
```

Get a User Collaboration Whitelist's Information
------------------------------------------------

To retrieve a specific collaboration whitelist's information for a user you can use[`collaborationWhitelists.getForUser(userWhitelistID, qs, callback)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#getForUser).

```js
client.collaborationWhitelists.getForUser(`12345`, callback);
```

Get the User Collaboration Whitelists for an Enterprise
-------------------------------------------------------

To retrieve all user collaboration whitelist's informations for an enterprise use
[`collaborationWhitelists.getForAllUsers(options, callback)`]
(http://opensource.box.com/box-node-sdk/CollaborationWhitelists.html#getForAllUsers).

```js
client.colllaborationWhitelists.getForAllUsers(options, callback);
```

Alternatively you can limit the number of user collaboration whitelists you wish to retrieve by setting a limit, the default is 100 entries and the maximum is 1000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationWhitelists.getForAllUsers(options, callback);
```