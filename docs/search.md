Search
======

* [Search for Content](#search-for-content)

Search for Content
------------------

To get a list of items matching a search query, call the
[`search.query(searchQuery, options, callback)`](http://opensource.box.com/box-node-sdk/Search.html#query)
method.  There are many possible options for advanced search filtering, which are
documented in the [Search API Reference](https://docs.box.com/reference#searching-for-content).

```js
// Search for PDF or Word documents matching "Meeting Notes"
client.search.query(
		'Meeting Notes',
		{
			fields: 'name,modified_at,size,extension,permissions,sync_state',
			file_extensions: 'pdf,doc',
			limit: 200,
			offset: 0
		},
		callback
	);
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
	    },
	    callback
	);
```
