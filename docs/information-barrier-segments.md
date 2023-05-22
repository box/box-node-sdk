# Information Barrier Segments

Information barrier segments (or just segments) are defined groups of users. They are different from user groups, however, because with segments, a user can be a member of one, and only one, segment.
This requirement for uniqueness in segments also means that you can add only individual users to segments, not user groups.

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Information Barrier Segments](#information-barrier-segments)
	- [Get shield information barrier segment with specified ID](#get-shield-information-barrier-segment-with-specified-id)
	- [List shield information barrier segments](#list-shield-information-barrier-segments)
	- [Create shield information barrier segment](#create-shield-information-barrier-segment)
	- [Update shield information barrier segment](#update-shield-information-barrier-segment)
	- [Delete shield information barrier segment](#delete-shield-information-barrier-segment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get shield information barrier segment with specified ID

To get a shield information barrier segment based on provided ID by, call the [`shieldInformationBarrierSegments.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentsManager.html#getById)
method.

<!-- sample get_shield_information_barrier_segments_id -->

```js
const barrierSegment = await client.shieldInformationBarrierSegments.getById({
	shield_information_barrier_segment_id: '12345',
});
console.log(`Shield information barrier segment id ${barrierSegment.id}`);
```

## List shield information barrier segments

To retrieve a list of shield information barrier segment objects for the specified Information Barrier ID, call the [`shieldInformationBarrierSegments.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentsManager.html#getAll)
method.

<!-- sample get_shield_information_barrier_segments -->

```js
const result = await client.shieldInformationBarrierSegments.getAll({
	shield_information_barrier_id: '123'
});
console.log(`There are ${result.entries.length} shield information barrier segments`);
```

## Create shield information barrier segment

To create a shield information barrier segment, call the [`shieldInformationBarrierSegments.create(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentsManager.html#create)
method. The `name` and `shield_information_barrier` fields are required in the body, and the description is optional.

<!-- sample post_shield_information_barrier_segments -->

```js
const barrierSegment = await client.shieldInformationBarrierSegments.create({
	name: 'barrier segment name',
	description: 'barrier segment description',
	shield_information_barrier: {
		id: '123',
		type: 'shield_information_barrier'
	},
});
console.log(`Shield information barrier segment id ${barrierSegment.id} created`);
```

## Update shield information barrier segment

Updates the shield information barrier segment based on provided ID by calling [`shieldInformationBarrierSegments.update(body, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentsManager.html#update)
method.

<!-- sample put_shield_information_barrier_segments_id -->

```js
const barrierSegment = await client.shieldInformationBarrierSegments.update({
	name: 'updated name',
	description: 'updated description',
}, {
	shield_information_barrier_segment_id: '12345'
});
console.log(`Shield information barrier segment id ${barrierSegment.id} updated`);
```

## Delete shield information barrier segment

To delete the shield information barrier segment based on provided ID, call the [`shieldInformationBarrierSegments.delete(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentsManager.html#deleteById)
method.

<!-- sample delete_shield_information_barrier_segments_id -->

```js
await client.shieldInformationBarrierSegments.deleteById({
	shield_information_barrier_segment_id: '12345'
});
```
