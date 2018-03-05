Metadata
========

Metadata allows users and applications to define and store custom data associated
with their files/folders. Metadata consists of key:value pairs that belong to
files/folders. For example, an important contract may have key:value pairs of
`"clientNumber":"820183"` and `"clientName":"bioMedicalCorp"`.

Metadata that belongs to a file/folder is grouped by templates. Templates allow
the metadata service to provide a multitude of services, such as pre-defining sets
of key:value pairs or schema enforcement on specific fields.

Each file/folder can have multiple distinct template instances associated with it,
and templates are also grouped by scopes. Currently, the only scopes support are
`enterprise` and `global`. Enterprise scopes are defined on a per enterprises basis,
whereas global scopes are Box application-wide.

In addition to `enterprise` scoped templates, every file on Box has access to the
`global` `properties` template. The Properties template is a bucket of free form
key:value string pairs, with no additional schema associated with it. Properties
are ideal for scenarios where applications want to write metadata to file objects
in a flexible way, without pre-defined template structure.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create Metadata Template](#create-metadata-template)
- [Get Metadata Template](#get-metadata-template)
- [Update Metadata Template](#update-metadata-template)
- [Get Enterprise Metadata Templates](#get-enterprise-metadata-templates)
- [Delete Metadata Template](#delete-metadata-template)
- [Add Metadata to a File](#add-metadata-to-a-file)
- [Get Metadata on a File](#get-metadata-on-a-file)
- [Update Metadata on a File](#update-metadata-on-a-file)
- [Remove Metadata from a File](#remove-metadata-from-a-file)
- [Add Metadata to a Folder](#add-metadata-to-a-folder)
- [Get Metadata on a Folder](#get-metadata-on-a-folder)
- [Update Metadata on a Folder](#update-metadata-on-a-folder)
- [Remove Metadata from a Folder](#remove-metadata-from-a-folder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create Metadata Template
------------------------

To create a new metadata template, call the
[`metadata.createTemplate(templateName, fields, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#createTemplate)
method.

```js
// Create a new template, but hide it for now until it's ready for use
client.metadata.createTemplate(
		'Vendor Contract',
		[
			{
				type: 'date',
				key: 'signed',
				displayName: 'Date Signed'
			},
			{
				type: 'string',
				key: 'vendor',
				displayName: 'Vendor'
			},
			{
				type: 'enum',
				key: 'fy',
				displayName: 'Fiscal Year',
				options: [
					{key: 'FY17'},
					{key: 'FY18'},
					{key: 'FY19'}
				]
			}
		],
		{
			hidden: true,
			templateKey: 'vcontract'
		},
		callback
	);
```

Get Metadata Template
---------------------

To retrieve a specific metadata template, call the
[`metadata.getTemplateSchema(scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplateSchema)
method with the scope and template key.

```js
client.metadata.getTemplateSchema('enterprise', 'vcontract', callback);
```

Update Metadata Template
------------------------

To update a metadata template, call the
[`metadata.updateTemplate(scope, template, operations, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#updateTemplate)
method with the operations to perform on the template.  See the
[API Documentation](https://docs.box.com/reference#update-metadata-schema)
for more information on the operations available.

```js
// Add a new option to the Fiscal Year field, and un-hide the template
var operations = [
	{
		op: 'addEnumOption',
		fieldKey: 'fy',
		data: {key: 'FY20'}
	},
	{
		op: 'editTemplate',
		data: {hidden: false}
	}
];
client.metadata.updateTemplate('enterprise', 'vcontract', operations, callback);
```

Get Enterprise Metadata Templates
---------------------------------

Get all metadata templates for the current enterprise and scope by calling the
[`metadata.getTemplates(scope, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplates)
method.

```js
client.metadata.getTemplates('enterprise', callback);
```

Delete Metadata Template
------------------------

To delete a metadata template call the
[`metadata.deleteTemplate(scope, template, callback)`](http://opensoure.box.com/box-node-sdk/Metadata.html#deleteTemplate)
method with the template scope and template name.

```js
client.metadata.deleteTemplate('enterprise', 'testtemplate', callback);
```

Add Metadata to a File
----------------------

Metadata can be created on a file by calling
[`files.addMetadata(fileID, scope, template, metadata, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#addMetadata)
with a metadata template and an object of key/value pairs to add as metadata.

```js
var metadata = {foo: 'bar'};
client.files.addMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, metadata, callback);
```

Get Metadata on a File
----------------------

Retrieve a file's metadata by calling
[`files.getAllMetadata(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getAllMetadata),
to retrieve all metadata, or
[`files.getMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getMetadata)
to retrieve a single template.

```js
client.files.getMetadata('67890', client.metadata.scopes.ENTERPRISE, 'productSpec', callback);
```

Update Metadata on a File
-------------------------

Update a file's metadata by calling
[`files.updateMetadata(fileID, scope, template, patch, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#updateMetadata)
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

```js
var patch = [{
	op: 'add',
	path: '/baz',
	value: 'quux'
}];
client.files.updateMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, patch, callback);
```

Remove Metadata from a File
---------------------------

A file's metadata can be removed by calling
[`files.deleteMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deleteMetadata).

```js
client.files.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, callback);
```

Add Metadata to a Folder
------------------------

Metadata can be created on a folder by calling
[`folders.addMetadata(folderID, scope, template, metadata, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#addMetadata)
with a metadata template and an object of key/value pairs to add as metadata.

```js
var metadata = {foo: 'bar'};
client.folders.addMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, metadata, callback);
```

Get Metadata on a Folder
------------------------

Retrieve a folder's metadata by calling
[`folders.getAllMetadata(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getAllMetadata),
to retrieve all metadata, or
[`folders.getMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getMetadata)
to retrieve a single template.

```js
client.folders.getMetadata('67890', client.metadata.scopes.ENTERPRISE, 'productSpec', callback);
```

Update Metadata on a Folder
---------------------------

Update a folder's metadata by calling
[`folders.updateMetadata(folderID, scope, template, patch, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#updateMetadata)
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

```js
var patch = [{
	op: 'add',
	path: '/baz',
	value: 'quux'
}];
client.folders.updateMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, patch, callback);
```

Remove Metadata from a Folder
-----------------------------

A folder's metadata can be removed by calling
[`folders.deleteMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deleteMetadata).

```js
client.folders.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, callback);
```
