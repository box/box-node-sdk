Recent Items
============

Recent Items returns information about files that have been accessed by a user not long ago. It keeps track of items that were accessed either in the last 90 days or the last 1000 items accessed (both conditions must be met).

* [Get a User's Recent Items](#get-a-users-recent-items)


Get a User's Recent Items
-------------------------

Get a list of all recent items the user has by calling
[`recentItems.get(options, callback)`](http://opensource.box.com/box-node-sdk/RecentItems.html#get).

```js
client.recentItems.get({limit: 1000}, callback);
```
