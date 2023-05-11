# Information Barrier Segment Restrictions

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Information Barrier Segment Restrictions](#information-barrier-segment-restrictions)
	- [Get shield information barrier segment restriction by ID](#get-shield-information-barrier-segment-restriction-by-id)
	- [List shield information barrier segment restrictions](#list-shield-information-barrier-segment-restrictions)
	- [Create shield information barrier segment restriction](#create-shield-information-barrier-segment-restriction)
	- [Delete shield information barrier segment restriction by ID](#delete-shield-information-barrier-segment-restriction-by-id)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get shield information barrier segment restriction by ID

To retrieve a shield information barrier segment restriction by its ID, call the [`shieldInformationBarrierSegmentRestrictions.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentRestrictionsManager.html#getById)
method.

<!-- sample get_shield_information_barrier_segment_restrictions_id -->

```js
const barrierSegmentRestriction = await client.shieldInformationBarrierSegmentRestrictions.getById({
	shield_information_barrier_segment_restriction_id: '12345',
});
console.log(`Shield information barrier segment restriction id ${barrierSegmentRestriction.id}`);
```

## List shield information barrier segment restrictions

To retrieves a list of shield information barrier segment restrictions based on provided segment ID, call the [`shieldInformationBarrierSegmentRestrictions.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentRestrictionsManager.html#getAll)
method.

<!-- sample get_shield_information_barrier_segment_restrictions -->

```js
const result = await client.shieldInformationBarrierSegmentRestrictions.getAll({
	shield_information_barrier_segment_id: '123'
});
console.log(`There are ${result.entries.length} shield information barrier segment restrictions`);
```

## Create shield information barrier segment restriction

To creates a new shield information barrier segment restriction, call the [`shieldInformationBarrierSegmentRestrictions.create(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentRestrictionsManager.html#create)
method. As a body parameter, you need to pass an object with the properties: `type`, `shield_information_barrier_segment` and `restricted_segment`, like in the following example:

<!-- sample post_shield_information_barrier_segment_restrictions -->

```js
const barrierSegmentRestriction = await client.shieldInformationBarrierSegmentRestrictions.create({
	type: 'shield_information_barrier_segment_restriction',
	shield_information_barrier_segment: {
		type: 'shield_information_barrier_segment',
		id: '1910967'
	},
	restricted_segment: {
		type: 'shield_information_barrier_segment',
		id: '1910968'
	}
});
console.log(`Shield information barrier segment restriction with id ${barrierSegmentRestriction.id} was created`);
```

## Delete shield information barrier segment restriction by ID

To delete the shield information barrier segment restriction based on provided ID, call the [`shieldInformationBarrierSegmentRestrictions.delete(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentRestrictionsManager.html#deleteById)
method.

<!-- sample delete_shield_information_barrier_segment_restrictions_id -->

```js
await client.shieldInformationBarrierSegmentRestrictions.deleteById({
	shield_information_barrier_segment_restriction_id: '12345'
});
```
