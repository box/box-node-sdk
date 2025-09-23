# IntegrationMappingsManager

- [List Slack integration mappings](#list-slack-integration-mappings)
- [Create Slack integration mapping](#create-slack-integration-mapping)
- [Update Slack integration mapping](#update-slack-integration-mapping)
- [Delete Slack integration mapping](#delete-slack-integration-mapping)
- [List Teams integration mappings](#list-teams-integration-mappings)
- [Create Teams integration mapping](#create-teams-integration-mapping)
- [Update Teams integration mapping](#update-teams-integration-mapping)
- [Delete Teams integration mapping](#delete-teams-integration-mapping)

## List Slack integration mappings

Lists [Slack integration mappings](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack) in a users' enterprise.

You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `getSlackIntegrationMapping`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-integration-mappings-slack/).

<!-- sample get_integration_mappings_slack -->

```ts
await userClient.integrationMappings.getSlackIntegrationMapping();
```

### Arguments

- queryParams `GetSlackIntegrationMappingQueryParams`
  - Query parameters of getSlackIntegrationMapping method
- headersInput `GetSlackIntegrationMappingHeadersInput`
  - Headers of getSlackIntegrationMapping method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `IntegrationMappings`.

Returns a collection of integration mappings.

## Create Slack integration mapping

Creates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack)
by mapping a Slack channel to a Box item.

You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `createSlackIntegrationMapping`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-integration-mappings-slack/).

<!-- sample post_integration_mappings_slack -->

```ts
await userClient.integrationMappings.createSlackIntegrationMapping({
  partnerItem: new IntegrationMappingPartnerItemSlack({
    id: slackPartnerItemId,
    slackOrgId: slackOrgId,
  }),
  boxItem: new IntegrationMappingBoxItemSlack({ id: folder.id }),
} satisfies IntegrationMappingSlackCreateRequest);
```

### Arguments

- requestBody `IntegrationMappingSlackCreateRequest`
  - Request body of createSlackIntegrationMapping method
- optionalsInput `CreateSlackIntegrationMappingOptionalsInput`

### Returns

This function returns a value of type `IntegrationMapping`.

Returns the created integration mapping.

## Update Slack integration mapping

Updates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
Supports updating the Box folder ID and options.

You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `updateSlackIntegrationMappingById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-integration-mappings-slack-id/).

<!-- sample put_integration_mappings_slack_id -->

```ts
await userClient.integrationMappings.updateSlackIntegrationMappingById(
  slackIntegrationMapping.id,
  {
    requestBody: {
      boxItem: new IntegrationMappingBoxItemSlack({ id: folder.id }),
    } satisfies UpdateSlackIntegrationMappingByIdRequestBody,
  } satisfies UpdateSlackIntegrationMappingByIdOptionalsInput,
);
```

### Arguments

- integrationMappingId `string`
  - An ID of an integration mapping. Example: "11235432"
- optionalsInput `UpdateSlackIntegrationMappingByIdOptionalsInput`

### Returns

This function returns a value of type `IntegrationMapping`.

Returns the updated integration mapping object.

## Delete Slack integration mapping

Deletes a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).

You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `deleteSlackIntegrationMappingById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-integration-mappings-slack-id/).

<!-- sample delete_integration_mappings_slack_id -->

```ts
await userClient.integrationMappings.deleteSlackIntegrationMappingById(
  slackIntegrationMapping.id,
);
```

### Arguments

- integrationMappingId `string`
  - An ID of an integration mapping. Example: "11235432"
- optionalsInput `DeleteSlackIntegrationMappingByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Empty body in response.

## List Teams integration mappings

Lists [Teams integration mappings](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams) in a users' enterprise.
You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `getTeamsIntegrationMapping`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-integration-mappings-teams/).

<!-- sample get_integration_mappings_teams -->

```ts
await userClient.integrationMappings.getTeamsIntegrationMapping();
```

### Arguments

- queryParams `GetTeamsIntegrationMappingQueryParams`
  - Query parameters of getTeamsIntegrationMapping method
- headersInput `GetTeamsIntegrationMappingHeadersInput`
  - Headers of getTeamsIntegrationMapping method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `IntegrationMappingsTeams`.

Returns a collection of integration mappings.

## Create Teams integration mapping

Creates a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams)
by mapping a Teams channel to a Box item.
You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `createTeamsIntegrationMapping`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-integration-mappings-teams/).

<!-- sample post_integration_mappings_teams -->

```ts
await userClient.integrationMappings.createTeamsIntegrationMapping({
  partnerItem: {
    type: 'channel' as IntegrationMappingPartnerItemTeamsCreateRequestTypeField,
    id: partnerItemId,
    tenantId: tenantId,
    teamId: teamId,
  } satisfies IntegrationMappingPartnerItemTeamsCreateRequest,
  boxItem: new FolderReference({ id: folder.id }),
} satisfies IntegrationMappingTeamsCreateRequest);
```

### Arguments

- requestBody `IntegrationMappingTeamsCreateRequest`
  - Request body of createTeamsIntegrationMapping method
- optionalsInput `CreateTeamsIntegrationMappingOptionalsInput`

### Returns

This function returns a value of type `IntegrationMappingTeams`.

Returns the created integration mapping.

## Update Teams integration mapping

Updates a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams).
Supports updating the Box folder ID and options.
You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `updateTeamsIntegrationMappingById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-integration-mappings-teams-id/).

<!-- sample put_integration_mappings_teams_id -->

```ts
await userClient.integrationMappings.updateTeamsIntegrationMappingById(
  integrationMappingId,
  {
    requestBody: {
      boxItem: new FolderReference({ id: '1234567' }),
    } satisfies UpdateTeamsIntegrationMappingByIdRequestBody,
  } satisfies UpdateTeamsIntegrationMappingByIdOptionalsInput,
);
```

### Arguments

- integrationMappingId `string`
  - An ID of an integration mapping. Example: "11235432"
- optionalsInput `UpdateTeamsIntegrationMappingByIdOptionalsInput`

### Returns

This function returns a value of type `IntegrationMappingTeams`.

Returns the updated integration mapping object.

## Delete Teams integration mapping

Deletes a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams).
You need Admin or Co-Admin role to
use this endpoint.

This operation is performed by calling function `deleteTeamsIntegrationMappingById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-integration-mappings-teams-id/).

<!-- sample delete_integration_mappings_teams_id -->

```ts
await userClient.integrationMappings.deleteTeamsIntegrationMappingById(
  integrationMappingId,
);
```

### Arguments

- integrationMappingId `string`
  - An ID of an integration mapping. Example: "11235432"
- optionalsInput `DeleteTeamsIntegrationMappingByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Empty body in response.
