Webhooks
========

A webhook object enables you to attach events triggers to Box files and folders. These
event triggers monitor events on Box objects and notify your application, via HTTP
requests to a URL of your choosing, when they occur.

* [Create Webhook on File](#create-a-file-webhook)
* [Create Webhook on Folder](#create-a-folder-webhook)
* [Get a Webhooks Information](#get-a-webhooks-information)
* [Get all Webhooks Information](#get-all-webhooks-information)
* [Update a Webhook](#update-a-webhook)
* [Delete a Webhook](#delete-a-webhook)

Create a Webhook on a Box File
------------------------------

Calling
[`webhooks.create(fileID, objectType, notificationURL, triggerTypes, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#createFileWebhook)
on a file attaches an event trigger with a URL to send notifications to

```js
client.webhooks.create('759371', 'FILE', 'https://www.YOURWEBSITE.com', [eventTriggers.FILE.UPLOADED, eventTriggers.FILE.DOWNLOADED], callback)
```

The notification URL must be a valid HTTPS URL that you specify when you create a
webhook.

The triggerTypes param is an array of strings. Available options are documented here
(https://docs.box.com/reference#event-triggers)

Create a Webhook on a Box Folder
--------------------------------

alternatively, you can attach a webhook to a folder by calling
[`webhooks.create(folderID, objectType, notificationURL, triggerTypes, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#createFolderWebhook)

```js
client.webhooks.create('123456', 'FOLDER', 'https://www.YOURWEBSITE.com', [eventTriggers.FOLDER.CREATED, eventTriggers.FOLDER.DOWNLOADED], callback)
```

The notification URL must be a valid HTTPS URL that you specify when you create a
webhook.

The triggerTypes param is an array of strings. Available options are documented here
(https://docs.box.com/reference#event-triggers)

Get Webhook
-----------

Retrieve a file or folder's webhook by calling
[`webhooks.get(webhookID, qs, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#get),
to retrieve a webhook by ID, or
[`webhooks.getAll(qs, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#getAll)
to retrieve all defined webhooks for the requesting application and user up to the limit.

The maximum limit per page of results is 200, Box uses the default limit of 100.

```js
client.webhooks.get('67890', null, callback);
```

Update Webhook
---------------

Update a file or folder's webhook by calling
[`webhooks.update(webhookID, options, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#upate)
with the field you want to update as options.address or options.trigger.

```js
client.webhooks.update('678901', ??, callback);
```

Delete Webhook
---------------

A file or folder's webhook can be removed by calling
[`webhooks.delete(webhookID, callback)`](http://opensource.box.com/box-node-sdk/Webhooks.html#delete).

```js
client.webhooks.delete('678901', callback);
```
