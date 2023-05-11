# Information Barrier Segment Members

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Information Barrier Segment Members](#information-barrier-segment-members)
	- [Get shield information barrier segment member by ID](#get-shield-information-barrier-segment-member-by-id)
	- [List shield information barrier segment members](#list-shield-information-barrier-segment-members)
	- [Create shield information barrier segment member](#create-shield-information-barrier-segment-member)
	- [Delete shield information barrier segment member by ID](#delete-shield-information-barrier-segment-member-by-ID)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get shield information barrier segment member by ID

To retrieve a shield information barrier segment member by its ID, call the [`shieldInformationBarrierSegmentMembers.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentMembersManager.html#getById)
method.

<!-- sample get_shield_information_barrier_segment_members_id -->

```js
const barrierSegmentMember = await client.shieldInformationBarrierSegmentMembers.getById({
	shield_information_barrier_segment_member_id: '12345',
});
console.log(`Shield information barrier segment member id ${barrierSegmentMember.id}`);
```

## List shield information barrier segment members

To retrieves a list shield information barrier segment members based on provided segment IDs, call the [`shieldInformationBarrierSegmentMembers.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentMembersManager.html#getAll)
method.

<!-- sample get_shield_information_barrier_segment_members -->

```js
const result = await client.shieldInformationBarrierSegmentMembers.getAll({
	shield_information_barrier_segment_id: '123'
});
console.log(`There are ${result.entries.length} shield information barrier segment members`);
```

## Create shield information barrier segment member

To creates a new shield information barrier segment member, call the [`shieldInformationBarrierSegmentMembers.create(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentMembersManager.html#create)
method with two objects in the body of the request, `barrer segment` and `user` where only `id` and `type` properties are required in each of them.

<!-- sample post_shield_information_barrier_segment_members -->

```js
const barrierSegmentMember = await client.shieldInformationBarrierSegmentMembers.create({
	shield_information_barrier_segment: {
		id: '234',
		type: 'shield_information_barrier_segment'
	},
	user: {
		id: '456',
		type: 'user'
	}
});
console.log(`Shield information barrier segment member id ${barrierSegmentMember.id} created`);
```

## Delete shield information barrier segment member by ID

To delete the shield information barrier segment member based on provided ID, call the [`shieldInformationBarrierSegmentMembers.delete(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierSegmentMembersManager.html#deleteById)
method.

<!-- sample delete_shield_information_barrier_segment_members_id -->

```js
await client.shieldInformationBarrierSegmentMembers.deleteById({
	shield_information_barrier_segment_member_id: '12345'
});
```
