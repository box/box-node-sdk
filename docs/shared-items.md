Shared Items
============

Shared Items represent files and folders on Box accessed via a shared link.

* [Get a Shared Item](#get-a-shared-item)

Get a Shared Item
-----------------

To get the file or folder information for a shared link, call the [`sharedItems.get(url, password, options, callback)`](http://opensource.box.com/box-node-sdk/SharedItems.html#get) method. The `password` parameter should be passed as a `null` value if none is required.

```js
client.sharedItems.get(
    'https://app.box.com/s/1a2b3c4d5e',
    null,
    {fields: 'type,id,parent,extension,shared_link'},
    callback
);
```
