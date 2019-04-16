Shared Items
============

Shared Items represent files and folders on Box accessed via a shared link.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a Shared Item](#get-a-shared-item)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a Shared Item
-----------------

To get the file or folder information for a shared link, call the [`sharedItems.get(url, password, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/SharedItems.html#get) method. The `password` parameter should be passed as a `null` value if none is required.

<!-- sample get_shared_items -->
```js
client.sharedItems.get(
    'https://app.box.com/s/1a2b3c4d5e',
    null,
    {fields: 'type,id,parent,extension,shared_link'},
    callback
);
```
