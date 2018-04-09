Recent Items
============

Recent Items returns information about files that have been accessed by a user not long ago. It keeps track of items that were accessed either in the last 90 days or the last 1000 items accessed (both conditions must be met).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a User's Recent Items](#get-a-users-recent-items)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


Get a User's Recent Items
-------------------------

Get a list of all recent items the user has by calling
[`recentItems.get(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RecentItems.html#get).

```js
client.recentItems.get({limit: 1000}, callback);
```
