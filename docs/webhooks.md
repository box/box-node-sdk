Webhooks
========

A webhook object enables you to attach events triggers to Box files and folders. These
event triggers monitor events on Box objects and notify your application, via HTTP
requests to a URL of your choosing, when they occur.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create a Webhook](#create-a-webhook)
- [Get a Webhook's Information](#get-a-webhooks-information)
- [Get all Webhooks Information](#get-all-webhooks-information)
- [Update a Webhook](#update-a-webhook)
- [Delete a Webhook](#delete-a-webhook)
- [Validate a Webhook Message](#validate-a-webhook-message)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create a Webhook
----------------

To attach a webhook to an item, call the
[`webhooks.create(fileID, targetType, notificationURL, triggerTypes, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#create)
method with the type and ID of the item, a URL to send notifications to, and a list
of triggers.

The notification URL must be a valid HTTPS URL that you specify when you create a
webhook.

The triggerTypes param is an array of strings. Available options are documented here:
<https://developer.box.com/guides/webhooks/triggers/>

<!-- sample post_webhooks -->
```js
// Attach a webhook that sends a notification to https://example.com/webhook when
//   file 11111 is renamed or downloaded.
client.webhooks.create(
	'11111',
	client.itemTypes.FILE,
	'https://example.com/webhook',
	[
		client.webhooks.triggerTypes.FILE.RENAMED,
		client.webhooks.triggerTypes.FILE.DOWNLOADED
	])
	.then(webhook => {
		/* webhook -> {
			id: '12345',
			type: 'webhook',
			target: { id: '11111', type: 'file' },
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-09T17:41:27-07:00',
			address: 'https://example.com/webhook',
			triggers: [ 'FILE.RENAMED', 'FILE.UPLOADED' ] }
		*/
	});
```

<!-- sample post_webhooks for_folder -->
```js
// Attach a webhook that sends a notification to https://example.com/webhook when
//   files are uploaded or downloaded within folder 22222.
client.webhooks.create(
	'22222',
	client.itemTypes.FOLDER,
	'https://example.com/webhook',
	[
		client.webhooks.triggerTypes.FILE.UPLOADED,
		client.webhooks.triggerTypes.FILE.DOWNLOADED
	])
	.then(webhook => {
		/* webhook -> {
			id: '1234',
			type: 'webhook',
			target: { id: '22222', type: 'folder' },
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-09T17:41:27-07:00',
			address: 'https://example.com/webhook',
			triggers: [ 'FILE.DOWNLOADED', 'FILE.UPLOADED' ] }
		*/
	});
```

Get a Webhook's Information
---------------------------

Retrieve information about a specific webhook by calling
[`webhooks.get(webhookID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#get)
to retrieve a webhook by ID.

<!-- sample get_webhooks_id -->
```js
client.webhooks.get('1234')
	.then(webhook => {
		/* webhook -> {
			id: '1234',
			type: 'webhook',
			target: { id: '22222', type: 'folder' },
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-09T17:41:27-07:00',
			address: 'https://example.com/webhook',
			triggers: [ 'FILE.DOWNLOADED', 'FILE.UPLOADED' ] }
		*/
	});
```

Get all Webhooks Information
-----------------------------

Get a list of all webhooks for the requesting application and user by calling the
[`webhooks.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#getAll)
method.  The maximum limit per page of results is 200, Box uses the default limit of 100.

<!-- sample get_webhooks -->
```js
client.webhooks.getAll()
	.then(webhooks => {
		/* webhooks -> {
			next_marker: 'ZmlQZS0xLTE%3D',
			entries: 
			[ { id: '1234',
				type: 'webhook',
				target: { id: '22222', type: 'folder' } },
				{ id: '5678',
				type: 'webhook',
				target: { id: '11111', type: 'file' } } ],
			limit: 2 }
		*/
	});
```

Update a Webhook
----------------

Update a file or folder's webhook by calling
[`webhooks.update(webhookID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#update)
with the field you want to update as `updates.address` or `updates.trigger`.

<!-- sample put_webhooks_id -->
```js
client.webhooks.update('678901', {address: "https://example.com/webhooks/fileActions"})
	.then(webhook => {
		/* webhook -> {
			id: '1234',
			type: 'webhook',
			target: { id: '22222', type: 'folder' },
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2016-05-09T17:41:27-07:00',
			address: 'https://example.com/webhooks/fileActions',
			triggers: [ 'FILE.DOWNLOADED', 'FILE.UPLOADED' ] }
		*/
	});
```

Delete a Webhook
----------------

A file or folder's webhook can be removed by calling
[`webhooks.delete(webhookID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#delete).

<!-- sample delete_webhooks_id -->
```js
client.webhooks.delete('1234')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

Validate a Webhook Message
--------------------------

When you receive a webhook message from Box, you should validate it by calling
[`BoxSDK.validateWebhookMessage(body, headers, primarySignatureKey, secondarySignatureKey, maxMessageAge)`](http://opensource.box.com/box-node-sdk/jsdoc/Webhooks.html#.validateMessage),
also available as `webhooks.validateMessage(body, headers, primarySignatureKey, secondarySignatureKey, maxMessageAge)`.

<!-- sample x_webhooks validate_signatures -->
```js
const BoxSDK = require('box-node-sdk');
let body = '{"type":"webhook_event","webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"Test.txt"}}',
	headers = {
		'box-delivery-id': 'f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f',
		'box-delivery-timestamp': '2020-01-01T00:00:00-07:00',
		'box-signature-algorithm': 'HmacSHA256',
		'box-signature-primary': '6TfeAW3A1PASkgboxxA5yqHNKOwFyMWuEXny/FPD5hI=',
		'box-signature-secondary': 'v+1CD1Jdo3muIcbpv5lxxgPglOqMfsNHPV899xWYydo=',
		'box-signature-version': '1'
	},
	primaryKey = 'SamplePrimaryKey',
	secondaryKey = 'SampleSecondaryKey';

let isValid = BoxSDK.validateWebhookMessage(body, headers, primaryKey, secondaryKey);
if (isValid) {
	// message is valid, accept
} else {
	// message is NOT valid, reject
}
```
