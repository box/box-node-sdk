# HubCollaborationsManager

- [Get hub collaborations](#get-hub-collaborations)
- [Create hub collaboration](#create-hub-collaboration)
- [Get hub collaboration by collaboration ID](#get-hub-collaboration-by-collaboration-id)
- [Update hub collaboration](#update-hub-collaboration)
- [Remove hub collaboration](#remove-hub-collaboration)

## Get hub collaborations

Retrieves all collaborations for a hub.

This operation is performed by calling function `getHubCollaborationsV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hub-collaborations/).

<!-- sample get_hub_collaborations_v2025.0 -->

```ts
await client.hubCollaborations.getHubCollaborationsV2025R0({
  hubId: hub.id,
} satisfies GetHubCollaborationsV2025R0QueryParams);
```

### Arguments

- queryParams `GetHubCollaborationsV2025R0QueryParams`
  - Query parameters of getHubCollaborationsV2025R0 method
- optionalsInput `GetHubCollaborationsV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubCollaborationsV2025R0`.

Retrieves the collaborations associated with the specified hub.

## Create hub collaboration

Adds a collaboration for a single user or a single group to a hub.

Collaborations can be created using email address, user IDs, or group IDs.

This operation is performed by calling function `createHubCollaborationV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-hub-collaborations/).

<!-- sample post_hub_collaborations_v2025.0 -->

```ts
await client.hubCollaborations.createHubCollaborationV2025R0({
  hub: new HubCollaborationCreateRequestV2025R0HubField({ id: hub.id }),
  accessibleBy: {
    type: 'user',
    id: user.id,
  } satisfies HubCollaborationCreateRequestV2025R0AccessibleByField,
  role: 'viewer',
} satisfies HubCollaborationCreateRequestV2025R0);
```

### Arguments

- requestBody `HubCollaborationCreateRequestV2025R0`
  - Request body of createHubCollaborationV2025R0 method
- optionalsInput `CreateHubCollaborationV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubCollaborationV2025R0`.

Returns a new hub collaboration object.

## Get hub collaboration by collaboration ID

Retrieves details for a hub collaboration by collaboration ID.

This operation is performed by calling function `getHubCollaborationByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hub-collaborations-id/).

<!-- sample get_hub_collaborations_id_v2025.0 -->

```ts
await client.hubCollaborations.getHubCollaborationByIdV2025R0(
  createdCollaboration.id,
);
```

### Arguments

- hubCollaborationId `string`
  - The ID of the hub collaboration. Example: "1234"
- optionalsInput `GetHubCollaborationByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubCollaborationV2025R0`.

Returns a hub collaboration object.

## Update hub collaboration

Updates a hub collaboration.
Can be used to change the hub role.

This operation is performed by calling function `updateHubCollaborationByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/put-hub-collaborations-id/).

<!-- sample put_hub_collaborations_id_v2025.0 -->

```ts
await client.hubCollaborations.updateHubCollaborationByIdV2025R0(
  createdCollaboration.id,
  { role: 'editor' } satisfies HubCollaborationUpdateRequestV2025R0,
);
```

### Arguments

- hubCollaborationId `string`
  - The ID of the hub collaboration. Example: "1234"
- requestBody `HubCollaborationUpdateRequestV2025R0`
  - Request body of updateHubCollaborationByIdV2025R0 method
- optionalsInput `UpdateHubCollaborationByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubCollaborationV2025R0`.

Returns an updated hub collaboration object.

## Remove hub collaboration

Deletes a single hub collaboration.

This operation is performed by calling function `deleteHubCollaborationByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/delete-hub-collaborations-id/).

<!-- sample delete_hub_collaborations_id_v2025.0 -->

```ts
await client.hubCollaborations.deleteHubCollaborationByIdV2025R0(
  createdCollaboration.id,
);
```

### Arguments

- hubCollaborationId `string`
  - The ID of the hub collaboration. Example: "1234"
- optionalsInput `DeleteHubCollaborationByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

A blank response is returned if the hub collaboration was
successfully deleted.
