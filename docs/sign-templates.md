# Sign Templates

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get sign template by ID

Gets a sign template by ID [`signTemplates.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/SignTemplatesManager.html#getById)
method.

<!-- sample get_sign_templates_id -->

```js
const sr = await client.signTemplates.getById({
	sign_request_id: 12345,
});
console.log(
	`Sign request id ${sr.id} contains ${sr.source_files.length} files`
);
```

## List sign templates

Gets sign templates created by a user [`signTemplates.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/SignTemplatesManager.html#getAll)
method.

<!-- sample get_sign_templates -->

```js
const result = await client.signTemplates.getAll();
console.log(`There are ${result.count} sign templates`);
```
