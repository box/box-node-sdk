Web Links
=========

Web links are objects that point to URLs. These objects are also known as bookmarks within the Box web application.
Web link objects are treated similarly to file objects, so they will also support shared links, copy, permanent delete,
and restore.

* [Create a Web Link](#create-a-web-link)
* [Get a Web Link's Information](#get-a-web-links-information)
* [Update a Web Link](#update-a-web-link)

Create a Web Link
-----------------

To create a web link call the [`weblinks.create(url, parentID, options, callback)`](http://opensource.box.com/box-node-sdk/Weblinks.html#create)
method.

```js
client.weblinks.create(
	'https://www.box.com',
	'1234',
	{
		name: 'Box Website!',
		description: 'Cloud Content Management'
	},
	callback);
```

Get a Web Link's information
----------------------------

```js
client.weblinks.get('1234', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
client.weblinks.get('1234', {fields: 'item_status,path_collection'}, callback);
```

Update a Web Link
-----------------

To update a web link call the [`weblinks.update(weblinkID, options, callback)`](http://opensource.box.com/box-node-sdk/Weblinks.html#update)
method.

```js
client.weblinks.update(
	'1234',
	{
		name: 'Box Website!',
		description: 'Cloud Content Management'
	},
	callback);
```
