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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create a Web Link
-----------------

To create a web link call the [`weblinks.create(url, parentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Weblinks.html#create)
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

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.weblinks.get('1234', {fields: 'item_status,path_collection'}, callback);
```

Update a Web Link
-----------------

To update a web link call the [`weblinks.update(weblinkID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Weblinks.html#update)
method with the fields to update and their new values.

```js
client.weblinks.update(
	'1234',
	{
		name: 'Box Website!',
		description: 'Cloud Content Management'
	},
	callback);
```

Delete a Web Link
-----------------

To move a web link to the trash call the [`weblinks.delete(weblinkID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Weblinks.html#delete)
method.

```js
client.weblinks.delete('1234',callback);
```
