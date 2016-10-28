Web Links
=========

Web links are objects that point to URLs. These objects are also known as bookmarks within the Box web application.
Web link objects are treated similarly to file objects, so they will also support shared links, copy, permanent delete,
and restore.

* [Create a Web Link](#create-a-web-link)

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
