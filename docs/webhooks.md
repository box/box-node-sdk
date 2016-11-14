Webhooks
========

A webhook object enables you to attach events triggers to Box files and folders. These
event triggers monitor events on Box objects and notify your application, via HTTP
requests to a URL of your choosing, when they occur.

* [Create Webhook](#create-a-webhook)
* [Get a Webhook's Information](#get-a-webhooks-information)
* [Get all Webhooks Information](#get-all-webhooks-information)
* [Update a Webhook](#update-a-webhook)
* [Delete a Webhook](#delete-a-webhook)

Create a Webhook
----------------

To attach a webhook to an item, call the
[`webhooks.create(fileID, targetType, notificationURL, triggerTypes, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#create)
method with the type and ID of the item, a URL to send notifications to, and a list
of triggers.

```js
// Attach a webhook that sends a notification to https://YOURWEBSITE.com/ when
//   file 759371 is uploaded or downloaded.
client.webhooks.create(
		'759371',
		client.itemTypes.FILE,
		'https://www.YOURWEBSITE.com/',
		[
			client.webhooks.triggerTypes.FILE.UPLOADED,
			client.webhooks.triggerTypes.FILE.DOWNLOADED
		],
		callback
	);
```

```js
// Attach a webhook that sends a notification to https://YOURWEBSITE.com/ when
//   folders are created or downloaded within folder 15937321.
client.webhooks.create(
		'15937321',
		client.itemTypes.FOLDER,
		'https://www.YOURWEBSITE.com.',
		[
			client.webhooks.triggerTypes.FOLDER.CREATED,
			client.webhooks.triggerTypes.FOLDER.DOWNLOADED
		],
		callback
	);
```

The notification URL must be a valid HTTPS URL that you specify when you create a
webhook.

The triggerTypes param is an array of strings. Available options are documented here
(https://docs.box.com/reference#event-triggers)


Get a Webhook's Information
---------------------------

Retrieve information about a specific webhook by calling
[`webhooks.get(webhookID, qs, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#get)
to retrieve a webhook by ID.

```js
client.webhooks.get('67890', null, callback);
```

Get all Webhooks Information
-----------------------------

Get a list of all webhooks for the requesting application and user by calling the
[`webhooks.getAll(qs, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#getAll)
method.  The maximum limit per page of results is 200, Box uses the default limit of 100.

```js
client.webhooks.getAll({limit: 100}, callback);
```

Update a Webhook
----------------

Update a file or folder's webhook by calling
[`webhooks.update(webhookID, options, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#update)
with the field you want to update as `options.address` or `options.trigger`.

```js
client.webhooks.update('678901', {address: "https://NEWWEBSITE.com"}, callback);
```

Delete a Webhook
----------------

A file or folder's webhook can be removed by calling
[`webhooks.delete(webhookID, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#delete).

```js
client.webhooks.delete('678901', callback);
```
