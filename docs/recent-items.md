Recent Items
============

Recent Items returns information about files that have been accessed by a user not long ago. It keeps track of items
that were accessed either in the last 90 days or the last 1000 items accessed (both conditions must be met).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a User's Recent Items](#get-a-users-recent-items)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


Get a User's Recent Items
-------------------------

Get a list of all recent items the user has by calling
[`recentItems.get(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/RecentItems.html#get).

<!-- sample get_recent_items -->
```js
client.recentItems.get({limit: 1000})
	.then(recentItems => {
		/* recentItems -> {
			next_marker: '',
			limit: 1000,
			order: { by: 'interacted_at', direction: 'DESC' },
			entries: 
			[ { type: 'recent_item',
				interaction_type: 'item_preview',
				interacted_at: '2017-06-06T15:46:28-07:00',
				item: 
					{ type: 'file',
					id: '11111',
					file_version: 
					{ type: 'file_version',
						id: '22222',
						sha1: 'd0a8c75ba72bf923bfb0c855bbcf1e8f7cc817dd' },
					sequence_id: '0',
					etag: '0',
					sha1: 'd0a8c75ba72bf923bfb0c855bbcf1e8f7cc817dd',
					name: 'File2.txt' },
				interaction_shared_link: "https://app.box.com/s/27jtnq2g8b7bu30pivpbz6nb2ef47mfs" },
				{ type: 'recent_item',
				interaction_type: 'item_preview',
				interacted_at: '2017-06-06T15:46:27-07:00',
				item: 
					{ type: 'file',
					id: '33333',
					file_version: 
					{ type: 'file_version',
						id: '44444',
						sha1: '12a715416bc96ba3ea860480c815657d5e0809da' },
					sequence_id: '0',
					etag: '0',
					sha1: '12a715416bc96ba3ea860480c815657d5e0809da',
					name: 'Image1.png' },
				interaction_shared_link: null } ] }
		*/
	});
```
