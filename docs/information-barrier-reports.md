# Information Barrier Reports

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Information Barrier Reports](#information-barrier-reports)
	- [Get shield information barrier report by ID](#get-shield-information-barrier-report-by-id)
	- [List shield information barrier reports](#list-shield-information-barrier-reports)
	- [Create shield information barrier report](#create-shield-information-barrier-report)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get shield information barrier report by ID

To retrieve a shield information barrier report by its ID, call the [`shieldInformationBarrierReports.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierReportsManager.html#getById)
method.

<!-- sample get_shield_information_barrier_reports_id -->

```js
const barrierReport = await client.shieldInformationBarrierReports.getById({
	shield_information_barrier_report_id: '12345',
});
console.log(`Shield information barrier report id ${barrierReport.id}`);
```

## List shield information barrier reports

To retrieves a list of shield information barrier reports based on provided barrier ID, call the [`shieldInformationBarrierReports.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierReportsManager.html#getAll)
method.

<!-- sample get_shield_information_barrier_reports -->

```js
const result = await client.shieldInformationBarrierReports.getAll({
	shield_information_barrier_id: '123'
});
console.log(`There are ${result.entries.length} shield information barrier reports`);
```

## Create shield information barrier report

To create a shield information barrier report for a given barrier, call the [`shieldInformationBarrierReports.create(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/ShieldInformationBarrierReportsManager.html#create)
method with a `shield_information_barrier` object in the body of the request.

<!-- sample post_shield_information_barrier_reports -->

```js
const barrierReport = await client.shieldInformationBarrierReports.create({
	shield_information_barrier: {
		id: '123',
		type: 'shield_information_barrier'
	}
});
console.log(`Shield information barrier report with id ${barrierReport.id} was created`);
```
