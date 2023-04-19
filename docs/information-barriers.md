# Information Barriers

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Get shield information barrier with specified ID](#get-shield-information-barrier-with-specified-id)
- [Get all shield information barriers](#get-all-shield-information-barriers)
- [Update shield information barrier status](#update-shield-information-barrier-status)
- [Create shield information barrier](#create-shield-information-barrier)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get shield information barrier with specified ID

Get shield information barrier based on provided ID by [`shieldInformationBarriers.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/ShieldInformationBarrierManager.html#getById)
method.

<!-- sample get_shield_information_barriers_id -->

```js
const barrier = await client.shieldInformationBarriers.getById({
    shield_information_barrier_id: 12345,
});
console.log(
    `Shield information barrier id ${barrier.id}`
);
```

## Get all shield information barriers

Retrieves a list of shield information barrier objects for the enterprise of JWT by [`shieldInformationBarriers.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/ShieldInformationBarrierManager.html#getAll)
method.

<!-- sample get_shield_information_barriers -->

```js
const result = await client.shieldInformationBarriers.getAll();
console.log(`There are ${result.entries.length} shield information barriers`);
```

## Update shield information barrier status

Change status of shield information barrier with the specified ID. [`shieldInformationBarriers.changeStatusById(body, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/ShieldInformationBarrierManager.html#changeStatusById)
method.

<!-- sample post_shield_information_barriers_change_status -->

```js
const barrier = await client.shieldInformationBarriers.changeStatusById({
    id: 12345,
    status: 'pending',
});
console.log(
    `Shield information barrier id ${barrier.id} status is ${barrier.status}`
);
```

## Create shield information barrier

Creates a shield information barrier to separate individuals/groups within the same firm and prevents confidential information passing between them.[`shieldInformationBarriers.create(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/ShieldInformationBarrierManager.html#create)
method.

<!-- sample post_shield_information_barriers -->

```js
const barrier = await client.shieldInformationBarriers.create({
    enterprise: {
        id: '12345',
        type: 'enterprise',
    },
});
console.log(
    `Shield information barrier id ${barrier.id} created`
);
```
