# HubCollaborationsManager

- [Get Box Hub collaborations](#get-box-hub-collaborations)
- [Create Box Hub collaboration](#create-box-hub-collaboration)
- [Get Box Hub collaboration by collaboration ID](#get-box-hub-collaboration-by-collaboration-id)
- [Update Box Hub collaboration](#update-box-hub-collaboration)
- [Remove Box Hub collaboration](#remove-box-hub-collaboration)

## Get Box Hub collaborations

Retrieves all collaborations for a Box Hub.

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

Retrieves the collaborations associated with the specified Box Hub.

## Create Box Hub collaboration

Adds a collaboration for a single user or a single group to a Box Hub.

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

Returns a new Box Hub collaboration object.

## Get Box Hub collaboration by collaboration ID

Retrieves details for a Box Hub collaboration by collaboration ID.

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

Returns a Box Hub collaboration object.

## Update Box Hub collaboration

Updates a Box Hub collaboration.
Can be used to change the Box Hub role.

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

Returns an updated Box Hub collaboration object.

## Remove Box Hub collaboration

Deletes a single Box Hub collaboration.

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

A blank response is returned if the Box Hub collaboration was
successfully deleted.
