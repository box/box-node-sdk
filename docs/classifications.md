Classifications
===============

Classfications are a type of metadata that allows users and applications 
to define and assign a content classification to files and folders.

Classifications use the metadata APIs to add and remove classifications, and
assign them to files. For more details on metadata templates please see the
[metadata documentation](./metadata.md).
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Classifications](#classifications)
	- [Add initial classifications](#add-initial-classifications)
	- [List all classifications](#list-all-classifications)
	- [Add another classification](#add-another-classification)
	- [Update a classification](#update-a-classification)
	- [Delete a classification](#delete-a-classification)
	- [Delete all classifications](#delete-all-classifications)
	- [Add classification to file](#add-classification-to-file)
	- [Update classification on file](#update-classification-on-file)
	- [Get classification on file](#get-classification-on-file)
	- [Remove classification from file](#remove-classification-from-file)
	- [Add classification to folder](#add-classification-to-folder)
	- [Update classification on folder](#update-classification-on-folder)
	- [Get classification on folder](#get-classification-on-folder)
	- [Remove classification from folder](#remove-classification-from-folder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Add initial classifications
---------------------------

If an enterprise does not already have a classification defined, the first classification(s)
can be added with the
[`metadata.createTemplate(templateName, fields, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#createTemplate)
method.

<!-- sample post_metadata_templates_schema classifications -->
```js
client.metadata.createTemplate(
		'Classification',
		[
      {
        type: "enum",
        key: "Box__Security__Classification__Key",
        displayName: "Classification",
        hidden: false,
        options: [
         {
           key: "Classified",
           staticConfig: {
             classification: {
               colorID: 7,
               classificationDefinition: "Top Seret"
             }
           }
         }
       ]
      }
    ],
		{
			hidden: false,
			templateKey: 'securityClassification-6VMVochwUWo'
		}
	)
	.then(template => {
		// the new classification template
	});
```

List all classifications
------------------------

To retrieve a list of all the classifications in an enterprise call the
[`metadata.getTemplateSchema(scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#getTemplateSchema)
method to get the classifciations template, which will contain a list of all the 
classifications

<!-- sample get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema -->
```js
client.metadata.getTemplateSchema('enterprise', 'securityClassification-6VMVochwUWo')
	.then(template => {
		// the classification template
	});
```

Add another classification
--------------------------

To add another classification, call the
[`metadata.updateTemplate(scope, template, operations, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#updateTemplate)
method with the an operation to add a new classification to the template. 

<!-- sample put_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema add -->
```js
var operations = [{
  op: "addEnumOption",
  fieldKey: "Box__Security__Classification__Key",
  data: {
    key: "Sensitive",
    classification: {
      classificationDefinition: "Sensitive information that must not be shared.",
      colorID: 4
    }
 }
}];
client.metadata.updateTemplate('enterprise', 'securityClassification-6VMVochwUWo', operations)
	.then(template => {
		// the updated classification template
	});
```

Update a classification
-----------------------

To update an existing classification, call the
[`metadata.updateTemplate(scope, template, operations, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Metadata.html#updateTemplate)
method with the an operation to update the existing classification already present on the template. 

<!-- sample put_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema update -->
```js
var operations = [{
  op: "editEnumOption",
  fieldKey: "Box__Security__Classification__Key",
  enumOptionKey: "Sensitive",
  data: {
    key: "Very Sensitive",
    classification: {
      classificationDefinition: "Sensitive information that must not be shared.",
      colorID: 4
    }
 }
}];
client.metadata.updateTemplate('enterprise', 'securityClassification-6VMVochwUWo', operations)
	.then(template => {
		// the updated classification template
	});
```

Add classification to file
--------------------------

To add a classification to a file, call 
[`files.setMetadata(fileID, scope, template, classification, callback)`][set-metadata]
with the name of the classification template, as well as the details of the classification
to add to the file.

<!-- sample post_files_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
var classification = {
	Box__Security__Classification__Key: "Sensitive"
};
client.files.addMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo', classification)
	.then(metadata => {
		// the classification applied to the file
	});
```

[set-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#setMetadata

Update classification on file
-----------------------------

To update a classification on a file, call 
[`files.setMetadata(fileID, scope, template, classification, callback)`][update-metadata]
with the name of the classification template, as well as the details of the classification
to add to the file.

<!-- sample put_files_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
var classification = {
	Box__Security__Classification__Key: "Sensitive"
};
client.files.addMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo', classification)
	.then(metadata => {
		// the updated classification applied to the file
	});
```

[update-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#updateMetadata

Get classification on file
--------------------------

Retrieve the classification on a file by calling
[`files.getMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getMetadata)
with the ID of the file.

<!-- sample get_files_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
client.files.getMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo')
	.then(metadata => {
		// the metadata instance, which includes the applied metadata
	});
```

Remove classification from file
-------------------------------

A classification can be removed from a file by calling
[`files.deleteMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deleteMetadata).

<!-- sample delete_files_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
client.files.deleteMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo')
	.then(() => {
		// removal succeeded — no value returned
	});;
```



Add classification to folder
----------------------------

To add a classification to a folder, call 
[`folders.setMetadata(folderID, scope, template, classification, callback)`][set-metadata]
with the name of the classification template, as well as the details of the classification
to add to the folder.

<!-- sample post_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
var classification = {
	Box__Security__Classification__Key: "Sensitive"
};
client.folders.addMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo', classification)
	.then(metadata => {
		// the classification applied to the folder
	});
```

[set-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#setMetadata

Update classification on folder
-------------------------------

To update a classification on a folder, call 
[`folders.setMetadata(folderID, scope, template, classification, callback)`][update-metadata]
with the name of the classification template, as well as the details of the classification
to add to the folder.

<!-- sample put_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
var classification = {
	Box__Security__Classification__Key: "Sensitive"
};
client.folders.addMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo', classification)
	.then(metadata => {
		// the updated classification applied to the folder
	});
```

[update-metadata]: http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#updateMetadata

Get classification on folder
----------------------------

Retrieve the classification on a folder by calling
[`folders.getMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getMetadata)
with the ID of the folder.

<!-- sample get_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
client.folders.getMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo')
	.then(metadata => {
		// the metadata instance, which includes the applied metadata
	});
```

Remove classification from folder
---------------------------------

A classification can be removed from a folder by calling
[`folders.deleteMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deleteMetadata).

<!-- sample delete_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->
```js
client.folders.deleteMetadata('11111', 'enterprise', 'securityClassification-6VMVochwUWo')
	.then(() => {
		// removal succeeded — no value returned
	});;
```