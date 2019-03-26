Web Links
=========

Web links are objects that point to URLs. These objects are also known as bookmarks within the Box web application.
Web link objects are treated similarly to file objects, so they will also support shared links, copy, permanent delete,
and restore.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create a Web Link](#create-a-web-link)
- [Get a Web Link's information](#get-a-web-links-information)
- [Update a Web Link](#update-a-web-link)
- [Delete a Web Link](#delete-a-web-link)
- [Copy a Web Link](#copy-a-web-link)
- [Move a Web Link](#move-a-web-link)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create a Web Link
-----------------

To create a web link call the [`weblinks.create(url, parentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#create)
method.

```js
client.weblinks.create(
	'https://www.box.com',
	'22222',
	{
		name: 'Box Website!',
		description: 'Cloud Content Management'
	})
	.then(weblink => {
		/* weblink -> {
			type: 'web_link',
			id: '11111',
			sequence_id: '0',
			etag: '0',
			name: 'Box Website!',
			url: 'https://www.box.com',
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2015-05-07T15:00:01-07:00',
			modified_at: '2015-05-07T15:00:01-07:00',
			parent: 
			{ type: 'folder',
				id: '22222',
				sequence_id: '1',
				etag: '1',
				name: 'Bookmarks' },
			description: 'Enterprise Cloud Content Management',
			item_status: 'active',
			trashed_at: null,
			purged_at: null,
			shared_link: null,
			path_collection: 
			{ total_count: 2,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' },
					{ type: 'folder',
					id: '22222',
					sequence_id: '1',
					etag: '1',
					name: 'Bookmarks' } ] },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

Get a Web Link's information
----------------------------

You can request a web link object by ID by calling
[`weblinks.get(weblinkID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#get).

```js
client.weblinks.get('11111')
	.then(weblink => {
		/* weblink -> {
			type: 'web_link',
			id: '11111',
			sequence_id: '0',
			etag: '0',
			name: 'Box Website!',
			url: 'https://www.box.com',
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2015-05-07T15:00:01-07:00',
			modified_at: '2015-05-07T15:00:01-07:00',
			parent: 
			{ type: 'folder',
				id: '22222',
				sequence_id: '1',
				etag: '1',
				name: 'Bookmarks' },
			description: 'Enterprise Cloud Content Management',
			item_status: 'active',
			trashed_at: null,
			purged_at: null,
			shared_link: null,
			path_collection: 
			{ total_count: 2,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' },
					{ type: 'folder',
					id: '22222',
					sequence_id: '1',
					etag: '1',
					name: 'Bookmarks' } ] },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.weblinks.get('11111', {fields: 'url,name,description'})
	.then(weblink => {
		/* weblink -> {
			type: 'web_link',
			id: '11111',
			sequence_id: '0',
			etag: '0',
			name: 'Box Website!',
			url: 'https://www.box.com',
			description: 'Enterprise Cloud Content Management' }
		*/
	});
```

Update a Web Link
-----------------

To update a web link call the [`weblinks.update(weblinkID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#update)
method with the fields to update and their new values.

```js
client.weblinks.update(
	'11111',
	{
		name: 'Box Marketing Site',
		description: 'First page that customers land on'
	})
	.then(weblink => {
		/* weblink -> {
			type: 'web_link',
			id: '11111',
			sequence_id: '0',
			etag: '0',
			name: 'Box Marketing Site',
			url: 'https://www.box.com',
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2015-05-07T15:00:01-07:00',
			modified_at: '2017-06-13T12:34:51-07:00',
			parent: 
			{ type: 'folder',
				id: '22222',
				sequence_id: '1',
				etag: '1',
				name: 'Bookmarks' },
			description: 'First page that customers land on',
			item_status: 'active',
			trashed_at: null,
			purged_at: null,
			shared_link: null,
			path_collection: 
			{ total_count: 2,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' },
					{ type: 'folder',
					id: '22222',
					sequence_id: '1',
					etag: '1',
					name: 'Bookmarks' } ] },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

Delete a Web Link
-----------------

To move a web link to the trash call the [`weblinks.delete(weblinkID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#delete)
method.

```js
client.weblinks.delete('11111')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

Copy a Web Link
---------------

Call the
[`weblinks.copy(webLinkID, destinationFolderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#copy)
method to copy a web link into another folder.

```js
client.weblinks.copy('11111', '0')
    .then(webLinkCopy => {
       /* webLinkCopy -> {
		    type: 'web_link',
			id: '11112',
			sequence_id: '0',
			etag: '0',
			name: 'Renamed web link copy',
			url: 'http://example.com',
			created_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2019-03-26T12:49:06-07:00',
			modified_at: '2019-03-26T12:49:06-07:00',
			parent:
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			description: '',
			item_status: 'active',
			trashed_at: null,
			purged_at: null,
			shared_link: null,
			path_collection:
			{ total_count: 1,
				entries:
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' } ] },
			modified_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' } }
        */
    });
```

An optional `name` parameter can also be passed to rename the folder on copy.  This can be
used to avoid a name conflict when there is already an item with the same name in the
target folder.

```js
client.weblinks.copy('12345', '0', {name: 'Renamed web link'})
    .then(webLinkCopy => {
        // ...
    });
```

Move a Web Link
---------------

Call the [`weblinks.move(webLinkID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#move) method with the destination you want the folder moved to.

```js
var webLinkID = '88888';
var destinationFolderID = '0';
client.weblinks.move(webLinkID, destinationFolderID)
    .then(webLink => {
       /* webLink -> {
		    type: 'web_link',
			id: '88888',
			sequence_id: '0',
			etag: '0',
			name: 'Example Web Link',
			url: 'http://example.com',
			created_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2019-03-26T12:49:06-07:00',
			modified_at: '2019-03-26T12:49:06-07:00',
			parent:
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			description: '',
			item_status: 'active',
			trashed_at: null,
			purged_at: null,
			shared_link: null,
			path_collection:
			{ total_count: 1,
				entries:
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' } ] },
			modified_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by:
			{ type: 'user',
				id: '22222',
				name: 'Example User',
				login: 'user@example.com' } }
        */
    });
```
