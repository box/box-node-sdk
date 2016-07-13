Search
======

* [Search for Content](#search-for-content)

Search for Content
------------------

To get a list of items matching a search query, call the [`search.query(searchQuery, qs, callback)`](http://opensource.box.com/box-node-sdk/Search.html#query) method.

```js
client.search.query(
    'keyword search string',
    {
        fields: 'name,modified_at,size,url,extension,permissions,sync_state',
        file_extensions: 'pdf,doc',
        limit: 20,
        offset: 0
    },
    callback
);
```
