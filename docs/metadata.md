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
  - [Get by template scope and key](#get-by-template-scope-and-key)
  - [Get by ID](#get-by-id)
- [Update Metadata Template](#update-metadata-template)
- [Get Enterprise Metadata Templates](#get-enterprise-metadata-templates)
- [Delete Metadata Template](#delete-metadata-template)
- [Set Metadata on a File](#set-metadata-on-a-file)
- [Get Metadata on a File](#get-metadata-on-a-file)
- [Remove Metadata from a File](#remove-metadata-from-a-file)
- [Set Metadata on a Folder](#set-metadata-on-a-folder)
- [Get Metadata on a Folder](#get-metadata-on-a-folder)
- [Remove Metadata from a Folder](#remove-metadata-from-a-folder)
- [Create Cascade Policy](#create-cascade-policy)
- [Get Cascade Policy](#get-cascade-policy)
- [Get All Cascade Policies For a Folder](#get-all-cascade-policies-for-a-folder)
- [Force Apply Cascade Policy](#force-apply-cascade-policy)
- [Delete Cascade Policy](#delete-cascade-policy)
- [Query](#query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create Metadata Template
------------------------

To create a new metadata template, call the
[`metadata.createTemplate(templateName, fields, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#createTemplate)
method.

<!-- sample post_metadata_templates_schema -->
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
		}
	)
	.then(template => {
		/* template -> {
			id: '17f2d715-6acb-45f2-b96a-28b15efc9faa',
			templateKey: 'vcontract',
			scope: 'enterprise_12345',
			displayName: 'Vendor Contract',
			hidden: true,
			fields: 
			[ { type: 'date',
				key: 'signed',
				displayName: 'Date Signed',
				hidden: false },
				{ type: 'string',
				key: 'vendor',
				displayName: 'Vendor',
				hidden: false },
				{ type: 'enum',
				key: 'fy',
				displayName: 'Fiscal Year',
				options: 
					[ { key: 'FY17' },
					{ key: 'FY18' },
					{ key: 'FY19' } ],
				hidden: false } ] }
		*/
	});
```

Get Metadata Template
---------------------

### Get by template scope and key

To retrieve a specific metadata template by its scope and template key, call the
[`metadata.getTemplateSchema(scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplateSchema)
method with the scope and template key.

<!-- sample get_metadata_templates_id_id_schema -->
```js
client.metadata.getTemplateSchema('enterprise', 'vcontract')
	.then(template => {
		/* template -> {
			id: '17f2d715-6acb-45f2-b96a-28b15efc9faa',
			templateKey: 'vcontract',
			scope: 'enterprise_12345',
			displayName: 'Vendor Contract',
			hidden: true,
			fields: 
			[ { type: 'date',
				key: 'signed',
				displayName: 'Date Signed',
				hidden: false },
				{ type: 'string',
				key: 'vendor',
				displayName: 'Vendor',
				hidden: false },
				{ type: 'enum',
				key: 'fy',
				displayName: 'Fiscal Year',
				options: 
					[ { key: 'FY17' },
					{ key: 'FY18' },
					{ key: 'FY19' } ],
				hidden: false } ] }
		*/
	});
```

### Get by ID

To get a specific metadata template by its ID, call the
[`metadata.getTemplateByID(templateID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplateByID)
method with the ID of the template.

<!-- sample get_metadata_templates_id -->
```js
client.metadata.getTemplateByID('17f2d715-6acb-45f2-b96a-28b15efc9faa')
	.then(template => {
		/* template -> {
			id: '17f2d715-6acb-45f2-b96a-28b15efc9faa',
			templateKey: 'vcontract',
			scope: 'enterprise_12345',
			displayName: 'Vendor Contract',
			hidden: true,
			fields: 
			[ { type: 'date',
				key: 'signed',
				displayName: 'Date Signed',
				hidden: false },
				{ type: 'string',
				key: 'vendor',
				displayName: 'Vendor',
				hidden: false },
				{ type: 'enum',
				key: 'fy',
				displayName: 'Fiscal Year',
				options: 
					[ { key: 'FY17' },
					{ key: 'FY18' },
					{ key: 'FY19' } ],
				hidden: false } ] }
		*/
	});
```

Update Metadata Template
------------------------

To update a metadata template, call the
[`metadata.updateTemplate(scope, template, operations, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#updateTemplate)
method with the operations to perform on the template.  See the
[API Documentation](https://developer.box.com/en/reference/put-metadata-templates-id-id-schema/)
for more information on the operations available.

<!-- sample put_metadata_templates_id_id_schema -->
```js
// Add a new option to the Fiscal Year field, and un-hide the template
var operations = [
	{
		op: 'addEnumOption',
		fieldKey: 'fy',
		data: { key: 'FY20' }
	},
	{
		op: 'editTemplate',
		data: { hidden: false }
	}
];
client.metadata.updateTemplate('enterprise', 'vcontract', operations)
	.then(template => {
		/* template -> {
			templateKey: 'vcontract',
			scope: 'enterprise_12345',
			displayName: 'Vendor Contract',
			hidden: false,
			fields: 
			[ { type: 'date',
				key: 'signed',
				displayName: 'Date Signed',
				hidden: false },
				{ type: 'string',
				key: 'vendor',
				displayName: 'Vendor',
				hidden: false },
				{ type: 'enum',
				key: 'fy',
				displayName: 'Fiscal Year',
				options: 
					[ { key: 'FY17' },
					{ key: 'FY18' },
					{ key: 'FY19' },
					{ key: 'FY20' } ],
				hidden: false } ] }
		*/
	});
```

Get Enterprise Metadata Templates
---------------------------------

Get all metadata templates for the current enterprise and scope by calling the
[`metadata.getTemplates(scope, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplates)
method.

<!-- sample get_metadata_templates_enterprise -->
```js
client.metadata.getTemplates('enterprise')
	.then(templates => {
		/* templates -> {
			limit: 100,
			entries: 
			[ { templateKey: 'documentFlow',
				scope: 'enterprise_12345',
				displayName: 'Document Flow',
				hidden: false,
				fields: 
					[ { type: 'string',
						key: 'currentDocumentStage',
						displayName: 'Current Document Stage',
						hidden: false }
					{ type: 'string',
						key: 'needsApprovalFrom',
						displayName: 'Needs Approval From',
						hidden: false },
					{ type: 'string',
						key: 'nextDocumentStage',
						displayName: 'Next Document Stage',
						hidden: false }
					{ type: 'float',
						key: 'maximumDaysAllowedInCurrentStage',
						displayName: 'Maximum Days Allowed In Current Stage',
						hidden: false }
				{ templateKey: 'marketingCollateral',
				scope: 'enterprise_12345',
				displayName: 'Marketing Collateral',
				hidden: false,
				fields: 
					[ { type: 'string',
						key: 'audience1',
						displayName: 'Audience',
						hidden: false },
					{ type: 'string',
						key: 'previousState',
						displayName: 'Previous State',
						hidden: false } ] },
				{ templateKey: 'productInfo',
				scope: 'enterprise_12345',
				displayName: 'Product Info',
				hidden: false,
				fields: 
					[ { type: 'float',
						key: 'skuNumber',
						displayName: 'SKU Number',
						hidden: false },
					{ type: 'enum',
						key: 'department',
						displayName: 'Department',
						hidden: false,
						options: 
						[ { key: 'Beauty' },
						{ key: 'Shoes' },
						{ key: 'Accessories' },
						{ key: 'Clothing' },
						{ key: 'Handbags' },
						{ key: 'Bedding' },
						{ key: 'Watches' } ] },
					{ type: 'date',
						key: 'displayDate',
						displayName: 'Display Date',
						hidden: false } ] } ],
			next_marker: null,
			prev_marker: null }
		*/
	});
```

Similarly, to get all metadata templates that are available to all
enterprises use the `global` scope.

<!-- sample get_metadata_templates_global -->
```js
client.metadata.getTemplates('global')
	.then(templates => {
		// ...
	});
```


Delete Metadata Template
------------------------

To delete a metadata template call the
[`metadata.deleteTemplate(scope, template, callback)`](http://opensoure.box.com/box-node-sdk/Metadata.html#deleteTemplate)
method with the template scope and template name.

<!-- sample delete_metadata_templates_id_id_schema -->
```js
client.metadata.deleteTemplate('enterprise', 'testtemplate', callback);
```

Set Metadata on a File
----------------------

To set metadata on a file, call [`files.setMetadata(fileID, scope, template, metadata, callback)`][set-metadata]
with the scope and template key of the metadata template, as well as an `Object` containing the metadata keys
and values to set.

> __Note:__ This method will unconditionally apply the provided metadata, overwriting existing metadata
> for the keys provided.  To specifically create or update metadata, see the `addMetadata()` and `updateMetadata()`
> methods below.

```js
var metadataValues = {
	audience: "internal",
	documentType: "Q1 plans",
	competitiveDocument: "no",
	status: "active",
	author: "Jones",
	currentState: "proposal"
};
client.files.setMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", metadataValues)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'file_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

To add new metadata to a file, call [`files.addMetadata(fileID, scope, template, metadata, callback)`][add-metadata]
with a metadata template and an object of key/value pairs to add as metadata.

> __Note:__: This method will only succeed if the provided metadata template is not current applied to the file,
> otherwise it will fail with a Conflict error.

<!-- sample post_files_id_metadata_id_id -->
```js
var metadataValues = {
	audience: "internal",
	documentType: "Q1 plans",
	competitiveDocument: "no",
	status: "active",
	author: "Jones",
	currentState: "proposal"
};
client.files.addMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", metadataValues)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'file_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

Update a file's existing metadata by calling
[`files.updateMetadata(fileID, scope, template, patch, callback)`][update-metadata]
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

> __Note:__ This method will only succeed if the provided metadata template has already been applied to
> the file; if the file does not have existing metadata, this method will fail with a Not Found error.
> This is useful in cases where you know the file will already have metadata applied, since it will
> save an API call compared to `setMetadata()`.

<!-- sample put_files_id_metadata_id_id -->
```js
var updates = [
	{ op: 'test', path: '/competitiveDocument', value: 'no' },
	{ op: 'remove', path: '/competitiveDocument' },
	{ op: 'test', path: '/status', value: 'active' },
	{ op: 'replace', path: '/status', value: 'inactive' },
	{ op: 'test', path: '/author', value: 'Jones' },
	{ op: 'copy', from: '/author', path: '/editor' },
	{ op: 'test', path: '/currentState', value: 'proposal' },
	{ op: 'move', from: '/currentState', path: '/previousState' },
	{ op: 'add', path: '/currentState', value: 'reviewed' }
];
client.files.updateMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", updates)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			status: 'inactive',
			author: 'Jones',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'file_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 1,
			'$typeVersion': 0,
			editor: 'Jones',
			previousState: 'proposal',
			currentState: 'reviewed',
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

[set-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#setMetadata
[add-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#addMetadata
[update-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#updateMetadata

Get Metadata on a File
----------------------

Retrieve a specific metadata template on a file by calling
[`files.getMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getMetadata)
with the ID of the file and which template to fetch.

<!-- sample get_files_id_metadata_id_id -->
```js
client.files.getMetadata('11111', client.metadata.scopes.ENTERPRISE, 'marketingCollateral')
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'file_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

You can retrieve all metadata on a file by calling
[`files.getAllMetadata(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getAllMetadata).

<!-- sample get_files_id_metadata -->
```js
client.files.getAllMetadata('11111')
	.then(metadata => {
		/* metadata -> {
			entries: 
			[ { currentDocumentStage: 'Init',
				'$type': 'documentFlow-452b4c9d-c3ad-4ac7-b1ad-9d5192f2fc5f',
				'$parent': 'file_11111',
				'$id': '50ba0dba-0f89-4395-b867-3e057c1f6ed9',
				'$version': 4,
				'$typeVersion': 2,
				needsApprovalFrom: 'Smith',
				'$template': 'documentFlow',
				'$scope': 'enterprise_12345' },
				{ '$type': 'productInfo-9d7b6993-b09e-4e52-b197-e42f0ea995b9',
				'$parent': 'file_11111',
				'$id': '15d1014a-06c2-47ad-9916-014eab456194',
				'$version': 2,
				'$typeVersion': 1,
				skuNumber: 45334223,
				description: 'Watch',
				'$template': 'productInfo',
				'$scope': 'enterprise_12345' },
				{ Popularity: '25',
				'$type': 'properties',
				'$parent': 'file_11111',
				'$id': 'b6f36cbc-fc7a-4eda-8889-130f350cc057',
				'$version': 0,
				'$typeVersion': 2,
				'$template': 'properties',
				'$scope': 'global' } ],
			limit: 100 }
		*/
	});
```

Remove Metadata from a File
---------------------------

A metadata template can be removed from a file by calling
[`files.deleteMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deleteMetadata).

<!-- sample delete_files_id_metadata_id_id -->
```js
client.files.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES)
	.then(() => {
		// removal succeeded — no value returned
	});;
```

Set Metadata on a Folder
------------------------

To set metadata on a folder, call [`folders.setMetadata(folderID, scope, template, metadata, callback)`][set-metadata]
with the scope and template key of the metadata template, as well as an `Object` containing the metadata keys
and values to set.

> __Note:__ This method will unconditionally apply the provided metadata, overwriting existing metadata
> for the keys provided.  To specifically create or update metadata, see the `addMetadata()` and `updateMetadata()`
> methods below.

```js
var metadataValues = {
	audience: "internal",
	documentType: "Q1 plans",
	competitiveDocument: "no",
	status: "active",
	author: "Jones",
	currentState: "proposal"
};
client.folders.setMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", metadataValues)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'folder_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

To add new metadata to a folder, call
[`folders.addMetadata(folderID, scope, template, metadata, callback)`][add-metadata]
with a metadata template and an object of key/value pairs to add as metadata.

> __Note:__: This method will only succeed if the provided metadata template is not current applied to the folder,
> otherwise it will fail with a Conflict error.

<!-- sample post_folders_id_metadata_id_id -->
```js
var metadataValues = {
	audience: "internal",
	documentType: "Q1 plans",
	competitiveDocument: "no",
	status: "active",
	author: "Jones",
	currentState: "proposal"
};
client.folders.addMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", metadataValues)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'folder_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

Update a folder's existing metadata by calling
[`folders.updateMetadata(fileID, scope, template, patch, callback)`][update-metadata]
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

> __Note:__ This method will only succeed if the provided metadata template has already been applied to
> the folder; if the folder does not have existing metadata, this method will fail with a Not Found error.
> This is useful in cases where you know the folder will already have metadata applied, since it will
> save an API call compared to `setMetadata()`.

<!-- sample put_folders_id_metadata_id_id -->
```js
var updates = [
	{ op: 'test', path: '/competitiveDocument', value: 'no' },
	{ op: 'remove', path: '/competitiveDocument' },
	{ op: 'test', path: '/status', value: 'active' },
	{ op: 'replace', path: '/status', value: 'inactive' },
	{ op: 'test', path: '/author', value: 'Jones' },
	{ op: 'copy', from: '/author', path: '/editor' },
	{ op: 'test', path: '/currentState', value: 'proposal' },
	{ op: 'move', from: '/currentState', path: '/previousState' },
	{ op: 'add', path: '/currentState', value: 'reviewed' }
];
client.folders.updateMetadata('11111', client.metadata.scopes.ENTERPRISE, "marketingCollateral", updates)
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			status: 'inactive',
			author: 'Jones',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'folder_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 1,
			'$typeVersion': 0,
			editor: 'Jones',
			previousState: 'proposal',
			currentState: 'reviewed',
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

[set-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#setMetadata
[add-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#addMetadata
[update-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#updateMetadata

Get Metadata on a Folder
------------------------

Retrieve a specific metadata template on a folder by calling
[`folders.getMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getMetadata)
with the ID of the folder and which template to fetch.

<!-- sample get_folders_id_metadata_id_id -->
```js
client.folders.getMetadata('11111', client.metadata.scopes.ENTERPRISE, 'marketingCollateral')
	.then(metadata => {
		/* metadata -> {
			audience: 'internal',
			documentType: 'Q1 plans',
			competitiveDocument: 'no',
			status: 'active',
			author: 'Jones',
			currentState: 'proposal',
			'$type': 'marketingCollateral-d086c908-2498-4d3e-8a1f-01e82bfc2abe',
			'$parent': 'folder_11111',
			'$id': '2094c584-68e1-475c-a581-534a4609594e',
			'$version': 0,
			'$typeVersion': 0,
			'$template': 'marketingCollateral',
			'$scope': 'enterprise_12345' }
		*/
	});
```

You can retrieve all metadata on a folder by calling
[`folders.getAllMetadata(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getAllMetadata).

<!-- sample get_folders_id_metadata -->
```js
client.folders.getAllMetadata('11111')
	.then(metadata => {
		/* metadata -> {
			entries: 
			[ { currentDocumentStage: 'Init',
				'$type': 'documentFlow-452b4c9d-c3ad-4ac7-b1ad-9d5192f2fc5f',
				'$parent': 'folder_11111',
				'$id': '50ba0dba-0f89-4395-b867-3e057c1f6ed9',
				'$version': 4,
				'$typeVersion': 2,
				needsApprovalFrom: 'Smith',
				'$template': 'documentFlow',
				'$scope': 'enterprise_12345' },
				{ '$type': 'productInfo-9d7b6993-b09e-4e52-b197-e42f0ea995b9',
				'$parent': 'folder_11111',
				'$id': '15d1014a-06c2-47ad-9916-014eab456194',
				'$version': 2,
				'$typeVersion': 1,
				skuNumber: 45334223,
				description: 'Watch',
				'$template': 'productInfo',
				'$scope': 'enterprise_12345' },
				{ Popularity: '25',
				'$type': 'properties',
				'$parent': 'folder_11111',
				'$id': 'b6f36cbc-fc7a-4eda-8889-130f350cc057',
				'$version': 0,
				'$typeVersion': 2,
				'$template': 'properties',
				'$scope': 'global' } ],
			limit: 100 }
		*/
	});
```

Remove Metadata from a Folder
-----------------------------

A folder's metadata can be removed by calling
[`folders.deleteMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deleteMetadata).

<!-- sample delete_folders_id_metadata_id_id -->
```js
client.folders.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES)
	.then(() => {
		// removal succeeded — no value returned
	});
```

Create Cascade Policy
---------------------

To set a metadata cascade policy, which applies metadata values on a folder to new items in the folder,
call [`metadata.createCascadePolicy(scope, templateKey, folderID, callback)`][create-cascade-policy]
with the scope and template key of the metadata template to be cascaded, and the ID of the folder to apply
the policy to.

<!-- sample post_metadata_cascade_policies -->
```js
var folderID = '22222';
client.metadata.createCascadePolicy('enterprise', 'testTemplate', folderID)
	.then(cascadePolicy => {
		/* cascadePolicy -> {
			id: '84113349-794d-445c-b93c-d8481b223434',
			type: 'metadata_cascade_policy',
			owner_enterprise: {
				type: 'enterprise',
				id: '11111'
			},
			parent: {
				type: 'folder',
				id: '22222'
			},
			scope: 'enterprise_11111',
			templateKey: 'testTemplate'
		}
		*/
	});
```

[create-cascade-policy]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#createCascadePolicy

Get Cascade Policy
------------------

To retrieve information about a specific metadata cascade policy, call
[`metadata.getCascadePolicy(policyID, callback)`][get-cascade-policy]
with the ID of the cascade policy.

<!-- sample get_metadata_cascade_policies_id -->
```js
var policyID = '84113349-794d-445c-b93c-d8481b223434';
client.metadata.getCascadePolicy(policyID)
	.then(cascadePolicy => {
		/* cascadePolicy -> {
			id: '84113349-794d-445c-b93c-d8481b223434',
			type: 'metadata_cascade_policy',
			owner_enterprise: {
				type: 'enterprise',
				id: '11111'
			},
			parent: {
				type: 'folder',
				id: '22222'
			},
			scope: 'enterprise_11111',
			templateKey: 'testTemplate'
		}
		*/
	});
```

[get-cascade-policy]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getCascadePolicy

Get All Cascade Policies For a Folder
-------------------------------------

To get a list of all cascade policies for a folder, which show the metadata templates that
are being applied to all items in that folder, call
[`metadata.getCascadePolicies(folderID, options, callback)`][get-cascade-policies]
with the ID of the folder.  You can set the `owner_enterprise_id` option to retrieve
only cascade policies owned by a specific enterprise (defaults to the current enterprise).

<!-- sample get_metadata_cascade_policies -->
```js
var folderID = '22222';
client.metadata.getCascadePolicies(folderID)
	.then(cascadePolicies => {
		/* cascadePolicies -> {
			limit: 100,
			entries: [
				{
					id: '84113349-794d-445c-b93c-d8481b223434',
					type: 'metadata_cascade_policy',
					owner_enterprise: {
						type: 'enterprise',
						id: '11111'
					},
					parent: {
						type: 'folder',
						id: '22222'
					},
					scope: 'enterprise_11111',
					templateKey: 'testTemplate'
				}
			],
			next_marker: null,
			prev_marker: null
		}
		*/
	});
```

[get-cascade-policies]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getCascadePolicies

Force Apply Cascade Policy
--------------------------

To force apply a metadata cascade policy and apply metadata values to all existing items in the affected
folder, call [`metadata.forceApplyCascadePolicy(policyID, resolutionMethod, callback)`][force-apply-cascade]
with the ID of the cascade policy to force apply and the conflict resolution method for dealing with items that
already have a metadata value that conflicts with the folder.  Specifying a resolution value of `'none'` will
preserve the existing values on items, and specifying `'overwrite'` will overwrite values on the items in the
folder with the metadata value from the folder.

<!-- sample post_metadata_cascade_policies_id_apply -->
```js
var policyID = '84113349-794d-445c-b93c-d8481b223434';
client.metadata.forceApplyCascadePolicy(policyID, client.metadata.cascadeResolution.PRESERVE_EXISTING)
	.then(() => {
		// application started — no value returned
	});
```

[force-apply-cascade]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#forceApplyCascadePolicy

Delete Cascade Policy
---------------------

To remove a cascade policy and stop applying metadata from a folder to items in the folder,
call [`metadata.deleteCascadePolicy(policyID, callback)`][delete-cascade-policy] with the ID
of the cascade policy to delete.

<!-- sample delete_metadata_cascade_policies_id -->
```js
var policyID = '84113349-794d-445c-b93c-d8481b223434';
client.metadata.deleteCascadePolicy(policyID)
	.then(() => {
		// deletion succeeded — no value returned
	});
```

[delete-cascade-policy]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#deleteCascadePolicy

Query
---------------------

To query Box items based on their metadata, call [`metadata.query(from, ancestorFolderId, options, callback)`][query] with the metadata template and the folder ID to restrain the query. Additional options like a specific query, a marker, etc. can be passed in through the options object. **Important**: One of two possible response types are returned, based on whether the fields parameter is passed into the options parameter or not. The example directly below shows the response if the fields parameter is not passed in.

<!-- sample post_metadata_queries_execute_read -->
```js
var from = 'enterprise_12345.someTemplate',
	ancestorFolderId = '5555',
	options = {
		query: 'amount >= :arg',
		query_params: {
			arg: 100
		},
		use_index: 'amountAsc',
		order_by: [
			{
				field_key: 'amount',
				direction: 'asc'
			}
		],
		limit: 100,
		marker: 'AAAAAmVYB1FWec8GH6yWu2nwmanfMh07IyYInaa7DZDYjgO1H4KoLW29vPlLY173OKsci6h6xGh61gG73gnaxoS+o0BbI1/h6le6cikjlupVhASwJ2Cj0tOD9wlnrUMHHw3/ISf+uuACzrOMhN6d5fYrbidPzS6MdhJOejuYlvsg4tcBYzjauP3+VU51p77HFAIuObnJT0ff'
	};
client.metadata.query(from, ancestorFolderId, options)
	.then(items => {
		/* items -> {
			"entries": [
				{
					"item": {
						"type": "file",
						"id": "1617554169109",
						"file_version": {
							"type": "file_version",
							"id": "1451884469385",
							"sha1": "69888bb1bff455d1b2f8afea75ed1ff0b4879bf6"
						},
						"sequence_id": "0",
						"etag": "0",
						"sha1": "69888bb1bff455d1b2f8afea75ed1ff0b4879bf6",
						"name": "My Contract.docx",
						"description": "",
						"size": 25600,
						"path_collection": {
							"total_count": 4,
							"entries": [
								{
									"type": "folder",
									"id": "0",
									"sequence_id": null,
									"etag": null,
									"name": "All Files"
								},
								{
									"type": "folder",
									"id": "15017998644",
									"sequence_id": "0",
									"etag": "0",
									"name": "Contracts"
								},
								{
									"type": "folder",
									"id": "15286891196",
									"sequence_id": "1",
									"etag": "1",
									"name": "North America"
								},
								{
									"type": "folder",
									"id": "16125613433",
									"sequence_id": "0",
									"etag": "0",
									"name": "2017"
								}
							]
						},
						"created_at": "2017-04-20T12:55:27-07:00",
						"modified_at": "2017-04-20T12:55:27-07:00",
						"trashed_at": null,
						"purged_at": null,
						"content_created_at": "2017-01-06T17:59:01-08:00",
						"content_modified_at": "2017-01-06T17:59:01-08:00",
						"created_by": {
							"type": "user",
							"id": "193973366",
							"name": "Box Admin",
							"login": "admin@company.com"
						},
						"modified_by": {
							"type": "user",
							"id": "193973366",
							"name": "Box Admin",
							"login": "admin@company.com"
						},
						"owned_by": {
							"type": "user",
							"id": "193973366",
							"name": "Box Admin",
							"login": "admin@company.com"
						},
						"shared_link": null,
						"parent": {
							"type": "folder",
							"id": "16125613433",
							"sequence_id": "0",
							"etag": "0",
							"name": "2017"
						},
						"item_status": "active"
					},
					"metadata": {
						"enterprise_12345": {
							"someTemplate": {
								"$parent": "file_161753469109",
								"$version": 0,
								"customerName": "Phoenix Corp",
								"$type": "someTemplate-3d5fcaca-f496-4bb6-9046-d25c37bc5594",
								"$typeVersion": 0,
								"$id": "ba52e2cc-371d-4659-8d53-50f1ac642e35",
								"amount": 100,
								"claimDate": "2016-04-10T00:00:00Z",
								"region": "West",
								"$typeScope": "enterprise_123456"
							}
						}
					}
				}
			],
			"next_marker": ""
		}
		*/
	});
```

This second example shows the response if the fields parameter is passed in.

```js
var from = 'enterprise_12345.someTemplate',
	ancestorFolderId = '5555',
	options = {
		query: 'amount >= :arg',
		query_params: {
			arg: 100
		},
		use_index: 'amountAsc',
		order_by: [
			{
				field_key: 'amount',
				direction: 'asc'
			}
		],
		fields: [
			"id",
			"name",
			"sha1",
			"metadata.enterprise12345.someTemplate.amount"
		]
		limit: 100,
		marker: 'AAAAAmVYB1FWec8GH6yWu2nwmanfMh07IyYInaa7DZDYjgO1H4KoLW29vPlLY173OKsci6h6xGh61gG73gnaxoS+o0BbI1/h6le6cikjlupVhASwJ2Cj0tOD9wlnrUMHHw3/ISf+uuACzrOMhN6d5fYrbidPzS6MdhJOejuYlvsg4tcBYzjauP3+VU51p77HFAIuObnJT0ff'
	};
client.metadata.query(from, ancestorFolderId, options)
	.then(items => {
		/* items -> {
			"entries":[
				{
					"type": "file",
					"id": "1617554169109",
					"sha1": "69888bb1bff455d1b2f8afea75ed1ff0b4879bf6",
					"name": "My Contract.docx",
					"metadata": {
						"enterprise_12345": {
							"someTemplate": {
								"$parent": "file_161753469109",
								"$version": 0,
								"$type": "someTemplate-3d5fcaca-f496-4bb6-9046-d25c37bc5594",
								"$typeVersion": 0,
								"$id": "ba52e2cc-371d-4659-8d53-50f1ac642e35",
								"amount": 100,
								"$typeScope": "enterprise_123456"
							}
						}
					}
				}
			],
			"next_marker":""
		}
		*/
	});
```

[query]: http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#query
