Search
======

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Search for Content](#search-for-content)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Search for Content
------------------

To get a list of items matching a search query, call the
[`search.query(searchQuery, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Search.html#query)
method.  There are many possible options for advanced search filtering, which are
documented in the [Search API Reference](https://docs.box.com/reference#searching-for-content).

```js
// Search for PDF or Word documents matching "Mobile"
client.search.query(
	'Mobile',
	{
		fields: 'name,modified_at,size,extension,permissions,sync_state',
		file_extensions: 'pdf,doc',
		limit: 200,
		offset: 0
	})
	.then(results => {
		/* results -> {
			total_count: 1,
			entries: 
			[ { type: 'file',
				id: '11111',
				sequence_id: '1',
				etag: '1',
				sha1: 'f89d97c5eea0a68e2cec911s932eca34a52355d2',
				name: 'Box for Sales - Empowering Your Mobile Worker White paper 2pg (External).pdf',
				description: '',
				size: 408979,
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
						name: 'Marketing Active Work' } ] },
				created_at: '2014-05-17T12:59:45-07:00',
				modified_at: '2014-05-17T13:00:20-07:00',
				trashed_at: null,
				purged_at: null,
				content_created_at: '2014-05-17T12:58:58-07:00',
				content_modified_at: '2014-05-17T12:58:58-07:00',
				created_by: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' },
				modified_by: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' },
				owned_by: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' },
				shared_link: null,
				parent: 
					{ type: 'folder',
					id: '22222',
					sequence_id: '1',
					etag: '1',
					name: 'Marketing Active Work' },
				item_status: 'active' } ],
			limit: 200,
			offset: 0 }
		*/
	});
```

```js
// Search for all Powerpoint presentations with the TopSecret metadata applied
client.search.query(
	'',
	{
		file_extensions: 'ppt,pptx',
		mdfilters: [
			{
				templateKey: 'TopSecret',
				scope: 'enterprise',
				filters: {}
			}
		]
	})
	.then(results => {
		// ...
	});
```
