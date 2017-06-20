RecentItems
===========

Recent Items returns information about files that have been accessed by a user not long ago. It keeps track of items that were accessed either in the last 90 days or the last 1000 items accessed (both conditions must be met).

* [Get a User's RecentItems](#get-a-users-recentItems)


Get a User's RecentItems
------------------------

Get a list of all recentItems the user has by calling [`recentItems.get(callback)`](http://opensource.box.com/box-node-sdk/RecentItems.html#get).

```js
client.recentItems.get(callback);
```
