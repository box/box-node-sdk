Comments
========

Comment objects represent a user-created comment on a file. They can be added
directly to a file.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a Comment's Information](#get-a-comments-information)
- [Get the Comments on a File](#get-the-comments-on-a-file)
- [Add a Comment to a File](#add-a-comment-to-a-file)
- [Reply to a Comment](#reply-to-a-comment)
- [Change a Comment's Message](#change-a-comments-message)
- [Delete a Comment](#delete-a-comment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a Comment's Information
---------------------------

Calling
[`comments.get(commentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#get)
on a comment returns a snapshot of the comment's info.

<!-- sample get_comments_id -->
```js
client.comments.get('11111')
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '11111',
            is_reply_comment: false,
            message: 'Great work!',
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            created_at: '2012-12-12T11:25:01-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-12T11:25:01-08:00' }
        */
    });
```

Get the Comments on a File
--------------------------

You can get all of the comments on a file by calling the
[`files.getComments(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getComments) method.

<!-- sample get_files_id_comments -->
```js
var fileID = '12345';
client.files.getComments(fileID)
    .then(comments => {
        /* comments -> {
            total_count: 1,
            entries: 
            [ { type: 'comment',
                id: '11111',
                is_reply_comment: false,
                message: 'Great work!',
                created_by: 
                    { type: 'user',
                    id: '22222',
                    name: 'Example User',
                    login: 'user@example.com' },
                created_at: '2012-12-12T11:25:01-08:00',
                item: { id: '33333', type: 'file' },
                modified_at: '2012-12-12T11:25:01-08:00' } ] }
        */
    });
```

Add a Comment to a File
-----------------------

A comment can be added to a file with the [`comments.create(fileID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#create)
method.

<!-- sample post_comments -->
```js
client.comments.create('33333', 'Is this the latest version?')
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '11111',
            is_reply_comment: false,
            message: 'Is this the latest version?',
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            created_at: '2012-12-12T11:25:01-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-12T11:25:01-08:00' }
        */
    });
```

A comment's message can also contain @mentions by using the string
`@[userid:username]` anywhere within the message, where userid and username are
the ID and username of the person being mentioned.
[See the documentation](https://developers.box.com/docs/#comments-comment-object) on the
`tagged_message` field for more information on @mentions.  To make a tagged comment,
use the [`comments.createTaggedComment(fileID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#createTaggedComment)
method.

```js
client.comments.createTaggedComment('33333', '@[23560:Bob] Is this the latest version?')
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '11111',
            is_reply_comment: false,
            tagged_message: '@[23560:Bob] Is this the latest version?',
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            created_at: '2012-12-12T11:25:01-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-12T11:25:01-08:00' }
        */
    });
```

Reply to a Comment
------------------

To reply to a comment, call
[`comments.reply(commentID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#reply)
with the ID of the comment to reply to and the text of the reply comment.

```js
// Reply to the comment with ID 11111
client.comments.reply('11111', 'Yes, this is the latest version.')
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '44444',
            is_reply_comment: true,
            message: 'Yes, this is the latest version',
            created_by: 
            { type: 'user',
                id: '55555',
                name: 'Example User 2',
                login: 'user2@example.com' },
            created_at: '2012-12-13T07:19:08-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-13T07:19:08-08:00' }
        */
    });
```

A comment's message can also contain at-mentions by using the string
`@[userid:username]` anywhere within the message, where `userid` and `username` are
the ID and username of the person being mentioned.
[See the documentation](https://developers.box.com/docs/#comments-comment-object) on the
`tagged_message` field for more information on at-mentions.  To make a tagged reply,
use the [`comments.createTaggedReply(commentID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#createTaggedReply)
method.

```js
client.comments.createTaggedReply('11111', '@[22222:Sam] Yes, this is the most recent version!')
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '44444',
            is_reply_comment: false,
            tagged_message: '@[22222:Sam] Yes, this is the most recent version!',
            created_by: 
            { type: 'user',
                id: '55555',
                name: 'Example User 2',
                login: 'user2@example.com' },
            created_at: '2012-12-13T07:19:08-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-13T07:19:08-08:00' }
        */
    });
```

Change a Comment's Message
--------------------------

The message of a comment can be changed with the
[`comments.update(commentID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#update)
method.

<!-- sample put_comments_id -->
```js
client.comments.update('11111', {message: 'New message'})
    .then(comment => {
        /* comment -> {
            type: 'comment',
            id: '11111',
            is_reply_comment: false,
            message: 'New message',
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            created_at: '2012-12-12T11:25:01-08:00',
            item: { id: '33333', type: 'file' },
            modified_at: '2012-12-12T11:25:01-08:00' }
        */
    });
```

Delete a Comment
----------------

A comment can be deleted with the
[`comments.delete(commentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#delete)
method.

<!-- sample delete_comments_id -->
```js
client.comments.delete('11111')
    .then(() => {
        // deletion successful — no value returned
    });
```
