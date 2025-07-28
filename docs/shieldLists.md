# ShieldListsManager

- [Get all shield lists in enterprise](#get-all-shield-lists-in-enterprise)
- [Create shield list](#create-shield-list)
- [Get single shield list by shield list id](#get-single-shield-list-by-shield-list-id)
- [Delete single shield list by shield list id](#delete-single-shield-list-by-shield-list-id)
- [Update shield list](#update-shield-list)

## Get all shield lists in enterprise

Retrieves all shield lists in the enterprise.

This operation is performed by calling function `getShieldListsV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-shield-lists/).

<!-- sample get_shield_lists_v2025.0 -->

```ts
await client.shieldLists.getShieldListsV2025R0();
```

### Arguments

- headersInput `GetShieldListsV2025R0HeadersInput`
  - Headers of getShieldListsV2025R0 method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `ShieldListsV2025R0`.

Returns the list of shield list objects.

## Create shield list

Creates a shield list.

This operation is performed by calling function `createShieldListV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-shield-lists/).

<!-- sample post_shield_lists_v2025.0 -->

```ts
await client.shieldLists.createShieldListV2025R0({
  name: shieldListCountryName,
  description: 'A list of things that are shielded',
  content: new ShieldListContentCountryV2025R0({
    type: 'country' as ShieldListContentCountryV2025R0TypeField,
    countryCodes: ['US', 'PL'],
  }),
} satisfies ShieldListsCreateV2025R0);
```

### Arguments

- requestBody `ShieldListsCreateV2025R0`
  - Request body of createShieldListV2025R0 method
- optionalsInput `CreateShieldListV2025R0OptionalsInput`

### Returns

This function returns a value of type `ShieldListV2025R0`.

Returns the shield list object.

## Get single shield list by shield list id

Retrieves a single shield list by its ID.

This operation is performed by calling function `getShieldListByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-shield-lists-id/).

<!-- sample get_shield_lists_id_v2025.0 -->

```ts
await client.shieldLists.getShieldListByIdV2025R0(shieldListCountry.id);
```

### Arguments

- shieldListId `string`
  - The unique identifier that represents a shield list. The ID for any Shield List can be determined by the response from the endpoint fetching all shield lists for the enterprise. Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
- optionalsInput `GetShieldListByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `ShieldListV2025R0`.

Returns the shield list object.

## Delete single shield list by shield list id

Delete a single shield list by its ID.

This operation is performed by calling function `deleteShieldListByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/delete-shield-lists-id/).

<!-- sample delete_shield_lists_id_v2025.0 -->

```ts
await client.shieldLists.deleteShieldListByIdV2025R0(shieldListCountry.id);
```

### Arguments

- shieldListId `string`
  - The unique identifier that represents a shield list. The ID for any Shield List can be determined by the response from the endpoint fetching all shield lists for the enterprise. Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
- optionalsInput `DeleteShieldListByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

Shield List correctly removed. No content in response.

## Update shield list

Updates a shield list.

This operation is performed by calling function `updateShieldListByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/put-shield-lists-id/).

<!-- sample put_shield_lists_id_v2025.0 -->

```ts
await client.shieldLists.updateShieldListByIdV2025R0(shieldListCountry.id, {
  name: shieldListCountryName,
  description: 'Updated description',
  content: new ShieldListContentCountryV2025R0({
    type: 'country' as ShieldListContentCountryV2025R0TypeField,
    countryCodes: ['US'],
  }),
} satisfies ShieldListsUpdateV2025R0);
```

### Arguments

- shieldListId `string`
  - The unique identifier that represents a shield list. The ID for any Shield List can be determined by the response from the endpoint fetching all shield lists for the enterprise. Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
- requestBody `ShieldListsUpdateV2025R0`
  - Request body of updateShieldListByIdV2025R0 method
- optionalsInput `UpdateShieldListByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `ShieldListV2025R0`.

Returns the shield list object.
