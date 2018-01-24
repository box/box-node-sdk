Collections
===========

Collections are used to store a custom user-defined set of items that may not
all be in the same folder.

* [Get a User's Collections](#get-a-users-collections)
* [Get the Items in a Collection](#get-the-items-in-a-collection)

Get a User's Collections
------------------------

Get a list of all collections the user has defined by calling [`collections.getAll(callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getAll).
A user always has a default collection called "Favorites" which they can add
items to.

```js
client.collections.getAll(callback);
```

Get the Items in a Collection
-----------------------------

Get a list of the items in a collection by passing the ID of the collection to
[`collections.getItems(collectionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getItems).

```js
client.collections.getItems('81934', {fields: 'name'}, callback);
```
