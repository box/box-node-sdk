# HubsManager

- [List all Box Hubs](#list-all-box-hubs)
- [Create Box Hub](#create-box-hub)
- [List all Box Hubs for requesting enterprise](#list-all-box-hubs-for-requesting-enterprise)
- [Get Box Hub information by ID](#get-box-hub-information-by-id)
- [Update Box Hub information by ID](#update-box-hub-information-by-id)
- [Delete Box Hub](#delete-box-hub)
- [Copy Box Hub](#copy-box-hub)

## List all Box Hubs

Retrieves all Box Hubs for requesting user.

This operation is performed by calling function `getHubsV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hubs/).

<!-- sample get_hubs_v2025.0 -->

```ts
await client.hubs.getHubsV2025R0({
  scope: 'all',
  sort: 'name',
  direction: 'ASC' as GetHubsV2025R0QueryParamsDirectionField,
} satisfies GetHubsV2025R0QueryParams);
```

### Arguments

- queryParams `GetHubsV2025R0QueryParams`
  - Query parameters of getHubsV2025R0 method
- headersInput `GetHubsV2025R0HeadersInput`
  - Headers of getHubsV2025R0 method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `HubsV2025R0`.

Returns all Box Hubs for the given user or enterprise.

## Create Box Hub

Creates a new Box Hub.

This operation is performed by calling function `createHubV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-hubs/).

<!-- sample post_hubs_v2025.0 -->

```ts
await client.hubs.createHubV2025R0({
  title: hubTitle,
  description: hubDescription,
} satisfies HubCreateRequestV2025R0);
```

### Arguments

- requestBody `HubCreateRequestV2025R0`
  - Request body of createHubV2025R0 method
- optionalsInput `CreateHubV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubV2025R0`.

Returns a new Hub object.

## List all Box Hubs for requesting enterprise

Retrieves all Box Hubs for a given enterprise.

Admins or Hub Co-admins of an enterprise
with GCM scope can make this call.

This operation is performed by calling function `getEnterpriseHubsV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-enterprise-hubs/).

<!-- sample get_enterprise_hubs_v2025.0 -->

```ts
await client.hubs.getEnterpriseHubsV2025R0({
  sort: 'name',
  direction: 'ASC' as GetEnterpriseHubsV2025R0QueryParamsDirectionField,
} satisfies GetEnterpriseHubsV2025R0QueryParams);
```

### Arguments

- queryParams `GetEnterpriseHubsV2025R0QueryParams`
  - Query parameters of getEnterpriseHubsV2025R0 method
- headersInput `GetEnterpriseHubsV2025R0HeadersInput`
  - Headers of getEnterpriseHubsV2025R0 method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `HubsV2025R0`.

Returns all Box Hubs for the given user or enterprise.

## Get Box Hub information by ID

Retrieves details for a Box Hub by its ID.

This operation is performed by calling function `getHubByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hubs-id/).

<!-- sample get_hubs_id_v2025.0 -->

```ts
await client.hubs.getHubByIdV2025R0(hubId);
```

### Arguments

- hubId `string`
  - The unique identifier that represent a hub. The ID for any hub can be determined by visiting this hub in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/hubs/123` the `hub_id` is `123`. Example: "12345"
- optionalsInput `GetHubByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubV2025R0`.

Returns a hub object.

## Update Box Hub information by ID

Updates a Box Hub. Can be used to change title, description, or Box Hub settings.

This operation is performed by calling function `updateHubByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/put-hubs-id/).

<!-- sample put_hubs_id_v2025.0 -->

```ts
await client.hubs.updateHubByIdV2025R0(hubId, {
  title: newHubTitle,
  description: newHubDescription,
} satisfies HubUpdateRequestV2025R0);
```

### Arguments

- hubId `string`
  - The unique identifier that represent a hub. The ID for any hub can be determined by visiting this hub in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/hubs/123` the `hub_id` is `123`. Example: "12345"
- requestBody `HubUpdateRequestV2025R0`
  - Request body of updateHubByIdV2025R0 method
- optionalsInput `UpdateHubByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubV2025R0`.

Returns a Hub object.

## Delete Box Hub

Deletes a single Box Hub.

This operation is performed by calling function `deleteHubByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/delete-hubs-id/).

<!-- sample delete_hubs_id_v2025.0 -->

```ts
await client.hubs.deleteHubByIdV2025R0(hubId);
```

### Arguments

- hubId `string`
  - The unique identifier that represent a hub. The ID for any hub can be determined by visiting this hub in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/hubs/123` the `hub_id` is `123`. Example: "12345"
- optionalsInput `DeleteHubByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

A blank response is returned if the hub was
successfully deleted.

## Copy Box Hub

Creates a copy of a Box Hub.

The original Box Hub will not be modified.

This operation is performed by calling function `copyHubV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-hubs-id-copy/).

<!-- sample post_hubs_id_copy_v2025.0 -->

```ts
await client.hubs.copyHubV2025R0(createdHub.id, {
  title: copiedHubTitle,
  description: copiedHubDescription,
} satisfies HubCopyRequestV2025R0);
```

### Arguments

- hubId `string`
  - The unique identifier that represent a hub. The ID for any hub can be determined by visiting this hub in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/hubs/123` the `hub_id` is `123`. Example: "12345"
- requestBody `HubCopyRequestV2025R0`
  - Request body of copyHubV2025R0 method
- optionalsInput `CopyHubV2025R0OptionalsInput`

### Returns

This function returns a value of type `HubV2025R0`.

Returns a new Hub object.
