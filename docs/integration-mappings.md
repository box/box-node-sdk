# Integration mappings

With integration mappings, you can manage where content from partner apps is stored in Box.

It is well suited for situations in which a particular Slack channel already has a corresponding folder in Box and allows to map it for uploads instead of using the automatically created folder within the default structure.
For more details on Slack mapping please see the [Box as the Content Layer for Slack](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Integration mappings](#integration-mappings)
	- [List Slack integration mappings](#list-slack-integration-mappings)
	- [Create Slack integration mapping](#create-slack-integration-mapping)
	- [Update Slack integration mapping](#update-slack-integration-mapping)
	- [Delete Slack integration mapping](#delete-slack-integration-mapping)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## List Slack integration mappings

To get a list of all Slack integration mappings, call the [`integrationMappings.getSlackIntegrationMappings(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/IntegrationMappingsManager.html#getSlackIntegrationMappings)
method.

<!-- sample get_integration_mappings_slack -->

```js
const integrationMappings = await client.integrationMappings.getSlackIntegrationMappings();
console.log(`There are ${integrationMappings.entries.length} Slack integration mappings`);
```

The API gives you an option to filter the mappings by passing additional parameters.
For example, if you want to get all integration mappings that are mapped to specific folder, you just need to pass the `box_item_id` param like below:

```js
const integrationMappings = await client.integrationMappings.getSlackIntegrationMappings({box_item_id: '123'});
```

On the other hand, if you want to get the mapping that is mapped to specific Slack channel, just pass the `partner_item_id` param, like below:

```js
const integrationMappings = await client.integrationMappings.getSlackIntegrationMappings({partner_item_id: 'C12378991223'});
```

If you want however to get all manually created mappings, you should pass the `is_manually_created` parameter set to true, like this:
```js
const integrationMappings = await client.integrationMappings.getSlackIntegrationMappings({is_manually_created: true});
```

## Create Slack integration mapping

To create a Slack integration mapping by mapping a Slack channel to a Box item, call the [`integrationMappings.createSlackIntegrationMapping(body, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/IntegrationMappingsManager.html#createSlackIntegrationMapping)
method. To correctly create the mapping, `partner_item` and `box_item` properties need to be passed in the body of the request. 
In the `partner_item`, you specify the mapping for the Slack, where `id` is the ID of the channel, `type` should be always `channel` and either `slack_org_id` or `slack_workspace_id` should be passed.
The `box_item` represents the mapping for Box, where `id` is the ID of the folder and `type` should be always set to `folder`. 

<!-- sample post_integration_mappings_slack -->

```js
const mapping = await client.integrationMappings.createSlackIntegrationMapping({
	partner_item: {
		type: 'channel',
		id: 'C12378991223',
		slack_org_id: 'E1234567'
	},
	box_item: {
		id: '12345',
		type: 'folder',
	}
});
console.log(
    `Slack integration mapping with id ${mapping.id} was created`
);
```


When calling a creation slack integration mapping request, you may get response with `400` status code and description like that:
```
Box as File Storage for Slack (user id: 123, user email: AutomationUser_456@boxdevedition.com) must be a collaborator in role co-owner or the owner of the folder 789, before it can be mapped to the channel XYZ. 
Please create a collaboration or ensure the ownership for Box as File Storage for Slack and retry.",
```

In this case, follow the description and add `Box as File Storage for Slack` Service as a collaborator in the role of co-owner role to the folder specified in the mapping.

```js
const collaboration = await client.collaborations.createWithUserID('123', '12345', client.collaborationRoles.CO_OWNER);
```

Then call again te request to create the slack integration mapping, which should now succeed.


## Update Slack integration mapping

To update a Slack integration mapping, call the [`integrationMappings.updateSlackIntegrationMapping(body, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/IntegrationMappingsManager.html#updateSlackIntegrationMapping)
method. You may want to call this method to change the mapping on Box by selecting a different folder or to modify the automatic management of channel member access to the underlying Box item.

<!-- sample put_integration_mappings_slack_id -->

```js
const mapping = await client.integrationMappings.updateSlackIntegrationMapping({
	box_item: {
		id: '12345',
		type: 'folder'
	},
	options: {
		is_access_management_disabled: true
	}
}, {
	integration_mapping_id: integrationMappingId
});

console.log(
    `Slack integration mapping with id ${mapping.id} was updated`
);
```

## Delete Slack integration mapping

To delete a Slack integration mapping based on provided ID [`integrationMappings.deleteSlackIntegrationMappingById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/IntegrationMappingsManager.html#deleteSlackIntegrationMappingById)
method.

<!-- sample delete_integration_mappings_slack_id -->

```js
await client.integrationMappings.deleteSlackIntegrationMappingById({
	integration_mapping_id: 123456
});
```
