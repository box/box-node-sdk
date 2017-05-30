Trash
=====

Under normal circumstances, when an item in Box is deleted, it is not actually
erased immediately.  Instead, it is moved to the Trash.  The Trash allows you to
recover files and folders that have been deleted. By default, items in the Trash
will be purged after 30 days.

* [Get Trashed Items](#get-trashed-items)

Get Trashed Items
-----------------

To retrieve files and folders that have been moved to the Trash, call the
[`trash.get(options, callback)`](http://opensource.box.com/box-node-sdk/Trash.html#get)
method.

```js
client.trash.get({fields: 'name,id'}, callback);
```
