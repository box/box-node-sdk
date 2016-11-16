Collections
===========

Collections are used to store a custom user-defined set of items that may not
all be in the same folder.

* [Get a User's Collections](#get-a-users-collections)
* [Get the Items in a Collection](#edit-a-collaboration)
* [Update the Items in a Collection](#update-the-items-in-a-collection)

Get a User's Collections
------------------------

Get a list of all collections the user has defined by calling [`collections.getAll(callback)`](http://opensource.box.com/box-node-sdk/Collections.html#getAll).
A user always has a default collection called "Favorites" which they can add
items to.

```js
client.collections.getAll(callback);
```

Get the Items in a Collection
-----------------------------

Get a list of the items in a collection by passing the ID of the collection to
[`collections.getItems(collectionID, qs, callback)`](http://opensource.box.com/box-node-sdk/Collections.html#getItems).

```js
client.collections.getItems('81934', {fields: 'name'}, callback);
```

Update the Items in a Collection
--------------------------------

To add items into collection call the [`collections.update(folderID, collectionIDs, callback)`](http://opensource.box.com/box-node-sdk/Collections.html#update) method with the list of collection IDs that
item should belong to. Currently the only collection available is the favorites collection.

```js
client.collections.update('81934', ['1234', '5678'], callback);
```

To remove the item from all collections call the method with an empty array.
```js
client.collections.update('81934', [], callback);
```
