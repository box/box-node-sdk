Users
=====

Users represent an individual's account on Box.

* [Get User's Information](#get-users-information)
* [Get the Current User's Information](#get-the-current-users-information)
* [Update User](#update-user)
* [Get Email Aliases](#get-email-aliases)
* [Add Email Alias](#add-email-alias)
* [Delete Email Alias](#delete-email-alias)

Get User's Information
----------------------------------

To get a user call the [`users.get(userID, queryString, callback)`](http://opensource.box.com/box-node-sdk/Users.html#get) method.

```js
client.users.get('123', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.users.get('123', {fields: 'name,login'}, callback);
```


Get the Current User's Information
----------------------------------

To get the current user call the [`users.get(userID, queryString, callback)`](http://opensource.box.com/box-node-sdk/Users.html#get) method with the `CURRENT_USER_ID` constant.

```js
client.users.get(client.CURRENT_USER_ID, null, callback);
```


Update User
-----------

To update a user call the [`users.update(userID, options, callback)`](http://opensource.box.com/box-node-sdk/Users.html#update) method where `options` contains the fields to update.

```js
client.users.update('123', {name: 'New Name', job_title: 'New Title', phone: '555-1111'}, callback);
```


Get Email Aliases
-----------------

To get a users email aliases call the [`users.getEmailAliases(userID, callback)`](http://opensource.box.com/box-node-sdk/Users.html#getEmailAliases) method.

```js
client.users.getEmailAliases('123', callback);
```


Add Email Alias
---------------

To add an email alias for a user call the [`users.addEmailAlias(userID, email, callback`](http://opensource.box.com/box-node-sdk/Users.html#addEmailAlias) method.

```js
client.users.addEmailAlias('123', 'user@example.com', callback);
```


Delete Email Alias
------------------

To delete a users email alias call the [`users.removeEmailAlias(userID, aliasID, callback)`](http://opensource.box.com/box-node-sdk/Users.html#removeEmailAlias) method.

```js
client.users.removeEmailAlias('123', '765', callback);
```
