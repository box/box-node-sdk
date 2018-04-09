Comments
========

Comment objects represent a user-created comment on a file. They can be added
directly to a file.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a Comment's Information](#get-a-comments-information)
- [Get the Comments on a File](#get-the-comments-on-a-file)
- [Add a Comment to a File](#add-a-comment-to-a-file)
- [Change a Comment's Message](#change-a-comments-message)
- [Delete a Comment](#delete-a-comment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a Comment's Information
---------------------------

Calling
[`comments.get(commentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#get)
on a comment returns a snapshot of the comment's info.

```js
client.comments.get('56788', {fields: 'created_by,created_at,tagged_message'}, callback);
```

Get the Comments on a File
--------------------------

You can get all of the comments on a file by calling the
[`files.getComments(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getComments) method.

```js
client.files.getComments('98765', {fields: 'created_by,created_at,tagged_message'}, callback);
```

Add a Comment to a File
-----------------------

A comment can be added to a file with the [`comments.create(fileID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#create)
method.

```js
client.comments.create('45678', 'Is this the latest version?', callback);
```

A comment's message can also contain @mentions by using the string
@[userid:username] anywhere within the message, where userid and username are
the ID and username of the person being mentioned. [See the documentation]
(https://developers.box.com/docs/#comments-comment-object) on the
`tagged_message` field for more information on @mentions.  To make a tagged comment,
use the [`comments.createTaggedComment(fileID, text, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#createTaggedComment)
method.

```js
client.comments.createTaggedComment('45678', '@[23560:Bob] Is this the latest version?', callback);
```

Change a Comment's Message
--------------------------

The message of a comment can be changed with the
[`comments.update(commentID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#update)
method.

```js
client.comments.update('45678', {message: 'Is this the newest version?'}, callback);
```

Delete a Comment
----------------

A comment can be deleted with the
[`comments.delete(commentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Comments.html#delete)
method.

```js
client.comments.delete('45678', callback);
```
