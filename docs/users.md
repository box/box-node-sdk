Users
=====

Users represent an individual's account on Box.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Get User's Information](#get-users-information)
- [Get the Current User's Information](#get-the-current-users-information)
- [Get User Avatar](#get-user-avatar)
- [Set User Avatar](#set-user-avatar)
- [Delete User Avatar](#delete-user-avatar)
- [Update User](#update-user)
- [Delete User](#delete-user)
- [Get Email Aliases](#get-email-aliases)
- [Add Email Alias](#add-email-alias)
- [Delete Email Alias](#delete-email-alias)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get User's Information
----------------------

To get a user call the [`users.get(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#get) method.

<!-- sample get_users_id -->
```js
client.users.get('33333')
    .then(user => {
        /* user -> {
            type: 'user',
            id: '33333',
            name: 'Example User',
            login: 'user@example.com',
            created_at: '2012-03-26T15:43:07-07:00',
            modified_at: '2012-12-12T11:34:29-08:00',
            language: 'en',
            space_amount: 5368709120,
            space_used: 2377016,
            max_upload_size: 262144000,
            status: 'active',
            job_title: 'Employee',
            phone: '5555555555',
            address: '555 Office Drive',
            avatar_url: 'https://app.box.com/api/avatar/deprecated' }
        */
    });
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.users.get('123', {fields: 'name,login'})
    .then(user => {
        /* user -> {
            type: 'user',
            id: '33333',
            name: 'Example User',
            login: 'user@example.com' }
        */
    });
```

Get the Current User's Information
----------------------------------

To get the current user call the [`users.get(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#get) method with the `CURRENT_USER_ID` constant.

<!-- sample get_users_me -->
```js
client.users.get(client.CURRENT_USER_ID)
	.then(currentUser => {
		/* currentUser -> {
            type: 'user',
            id: '33333',
            name: 'Example User',
            login: 'user@example.com',
            created_at: '2012-03-26T15:43:07-07:00',
            modified_at: '2012-12-12T11:34:29-08:00',
            language: 'en',
            space_amount: 5368709120,
            space_used: 2377016,
            max_upload_size: 262144000,
            status: 'active',
            job_title: 'Employee',
            phone: '5555555555',
            address: '555 Office Drive',
            avatar_url: 'https://app.box.com/api/avatar/deprecated' }
        */
	});
```

Get User Avatar
---------------

Calling [`users.getAvatar(userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#getAvatar) will
yield a `Readable` stream over the bytes of the user's avatar image.

<!-- sample get_users_id_avatar -->
```js
client.users.getAvatar('22222')
    .then(avatarImageStream => {

        avatarImageStream.on('data', bytes => {
            // read avatar image bytes
        });
    });
```

Set User Avatar
---------------

Calling [`users.setAvatar(userID, avatar, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#setAvatar) will set user's avatar with the input file.

<!-- sample post_users_id_avatar -->
```js
const fs = require('fs');
var readStream = fs.createReadStream('image.jpg');
client.users.setAvatar('22222', readStream).then(result => {
    // read avatar urls
});
```

Delete User Avatar
---------------

Calling [`users.deleteAvatar(userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#deleteAvatar) will delete the user's avatar.

<!-- sample delete_users_id_avatar -->
```js
client.users.deleteAvatar('22222', () => {
    console.log('User avatar deleted!'); 
});
```

Update User
-----------

To update a user call the
[`users.update(userID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#update)
method where `updates` contains the fields to update.

<!-- sample put_users_id -->
```js
client.users.update('33333', {name: 'New Name', job_title: 'New Title', phone: '555-1111'})
    .then(user => {
        /* user -> {
            type: 'user',
            id: '33333',
            name: 'New Name',
            login: 'user@example.com',
            created_at: '2012-03-26T15:43:07-07:00',
            modified_at: '2012-12-12T11:34:29-08:00',
            language: 'en',
            space_amount: 5368709120,
            space_used: 2377016,
            max_upload_size: 262144000,
            status: 'active',
            job_title: 'New Title',
            phone: '555-1111',
            address: '555 Office Drive',
            avatar_url: 'https://app.box.com/api/avatar/deprecated' }
        */
    });
```

To change a user's login email, update the `login` parameter on the user.  Note
that the new email address must already be added as a verified email alias for the
user.

```js
client.users.update('33333', { login: 'newemail@example.com' })
    .then(user => {
        /* user -> {
            type: 'user',
            id: '33333',
            name: 'New Name',
            login: 'newemail@example.com',
            created_at: '2012-03-26T15:43:07-07:00',
            modified_at: '2012-12-12T11:34:29-08:00',
            language: 'en',
            space_amount: 5368709120,
            space_used: 2377016,
            max_upload_size: 262144000,
            status: 'active',
            job_title: 'New Title',
            phone: '555-1111',
            address: '555 Office Drive',
            avatar_url: 'https://app.box.com/api/avatar/deprecated' }
        */
    });
```

Delete User
-----------

To delete a user call the
[`users.delete(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#delete)
method.  If the user still has files in their account and the `force` parameter
is not sent, an error is returned.

```js
client.users.delete('33333')
    .then(() => {
        // deletion succeeded — no value returned
    });
```

<!-- sample delete_users_id -->
```js
// Delete the user even if they still have files in their account
client.users.delete('123', {force: true})
    .then(() => {
        // deletion succeeded — no value returned
    });
```

Get Email Aliases
-----------------

To get a users email aliases call the [`users.getEmailAliases(userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#getEmailAliases) method.

<!-- sample get_users_id_email_aliases -->
```js
client.users.getEmailAliases('33333')
    .then(emailAliases => {
        /* emailAliases -> {
            total_count: 2,
            entries: 
            [ { type: 'email_alias',
                id: '1234',
                is_confirmed: true,
                email: 'user+foo@example.com' },
                { type: 'email_alias',
                id: '1235',
                is_confirmed: true,
                email: 'user+bar@example.com' } ] }
        */
    });
```

Add Email Alias
---------------

To add an email alias for a user call the
[`users.addEmailAlias(userID, email, callback`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#addEmailAlias)
method.

<!-- sample post_users_id_email_aliases -->
```js
client.users.addEmailAlias('33333', 'user+baz@example.com')
    .then(alias => {
        /* alias -> {
            type: 'email_alias',
            id: '12345',
            is_confirmed: false,
            email: 'user+baz@example.com' }
        */
    });
```

Enterprise admins can automatically confirm the email alias via the `is_confirmed` option:
```js
client.users.addEmailAlias('33333', 'user+quux@example.com', {is_confirmed: true})
    .then(alias => {
        /* alias -> {
            type: 'email_alias',
            id: '12346',
            is_confirmed: true,
            email: 'user+quux@example.com' }
        */
    });
```

Delete Email Alias
------------------

To delete a users email alias call the [`users.removeEmailAlias(userID, aliasID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#removeEmailAlias) method.

<!-- sample delete_users_id_email_aliases_id -->
```js
var userID = '33333';
var aliasID = '12345';
client.users.removeEmailAlias(userID, aliasID)
    .then(() => {
        // removal successful — no value returned
    });
```

Terminate users session
----------------------

To terminate user's sessions call the [`users.terminateSessionByUserIDs(userIDs, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#terminateSessionByUserIDs) or `users.terminateSessionByUserLogins(userLogins, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#terminateSessionByUserLogins) method.

<!-- sample post_users_terminate_sessions -->
```js
var userIDs = ['33333', '44444'];
var userLogins = ['user1@example.com', 'user2@example.com'];

client.users.terminateSessionByUserIDs(userIDs)
    .then((result) => {
        /* result -> {
            message: "Request is successful, please check the admin events for the status of the job" }
        */
    });

client.users.terminateSessionByUserLogins(userLogins)
    .then((result) => {
        /* result -> {
            message: "Request is successful, please check the admin events for the status of the job" }
        */
    });
```