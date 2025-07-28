# SharedLinksWebLinksManager

- [Find web link for shared link](#find-web-link-for-shared-link)
- [Get shared link for web link](#get-shared-link-for-web-link)
- [Add shared link to web link](#add-shared-link-to-web-link)
- [Update shared link on web link](#update-shared-link-on-web-link)
- [Remove shared link from web link](#remove-shared-link-from-web-link)

## Find web link for shared link

Returns the web link represented by a shared link.

A shared web link can be represented by a shared link,
which can originate within the current enterprise or within another.

This endpoint allows an application to retrieve information about a
shared web link when only given a shared link.

This operation is performed by calling function `findWebLinkForSharedLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shared-items--web-links/).

<!-- sample get_shared_items#web_links -->

```ts
await userClient.sharedLinksWebLinks.findWebLinkForSharedLink(
  {} satisfies FindWebLinkForSharedLinkQueryParams,
  {
    boxapi: ''.concat(
      'shared_link=',
      webLinkFromApi.sharedLink!.url,
      '&shared_link_password=Secret123@',
    ) as string,
  } satisfies FindWebLinkForSharedLinkHeadersInput,
);
```

### Arguments

- queryParams `FindWebLinkForSharedLinkQueryParams`
  - Query parameters of findWebLinkForSharedLink method
- headersInput `FindWebLinkForSharedLinkHeadersInput`
  - Headers of findWebLinkForSharedLink method
- optionalsInput `FindWebLinkForSharedLinkOptionalsInput`

### Returns

This function returns a value of type `WebLink`.

Returns a full web link resource if the shared link is valid and
the user has access to it.

## Get shared link for web link

Gets the information for a shared link on a web link.

This operation is performed by calling function `getSharedLinkForWebLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-web-links-id--get-shared-link/).

<!-- sample get_web_links_id#get_shared_link -->

```ts
await client.sharedLinksWebLinks.getSharedLinkForWebLink(webLinkId, {
  fields: 'shared_link',
} satisfies GetSharedLinkForWebLinkQueryParams);
```

### Arguments

- webLinkId `string`
  - The ID of the web link. Example: "12345"
- queryParams `GetSharedLinkForWebLinkQueryParams`
  - Query parameters of getSharedLinkForWebLink method
- optionalsInput `GetSharedLinkForWebLinkOptionalsInput`

### Returns

This function returns a value of type `WebLink`.

Returns the base representation of a web link with the
additional shared link information.

## Add shared link to web link

Adds a shared link to a web link.

This operation is performed by calling function `addShareLinkToWebLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-web-links-id--add-shared-link/).

<!-- sample put_web_links_id#add_shared_link -->

```ts
await client.sharedLinksWebLinks.addShareLinkToWebLink(
  webLinkId,
  {
    sharedLink: {
      access: 'open' as AddShareLinkToWebLinkRequestBodySharedLinkAccessField,
      password: 'Secret123@',
    } satisfies AddShareLinkToWebLinkRequestBodySharedLinkField,
  } satisfies AddShareLinkToWebLinkRequestBody,
  { fields: 'shared_link' } satisfies AddShareLinkToWebLinkQueryParams,
);
```

### Arguments

- webLinkId `string`
  - The ID of the web link. Example: "12345"
- requestBody `AddShareLinkToWebLinkRequestBody`
  - Request body of addShareLinkToWebLink method
- queryParams `AddShareLinkToWebLinkQueryParams`
  - Query parameters of addShareLinkToWebLink method
- optionalsInput `AddShareLinkToWebLinkOptionalsInput`

### Returns

This function returns a value of type `WebLink`.

Returns the base representation of a web link with a new shared
link attached.

## Update shared link on web link

Updates a shared link on a web link.

This operation is performed by calling function `updateSharedLinkOnWebLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-web-links-id--update-shared-link/).

<!-- sample put_web_links_id#update_shared_link -->

```ts
await client.sharedLinksWebLinks.updateSharedLinkOnWebLink(
  webLinkId,
  {
    sharedLink: {
      access:
        'collaborators' as UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField,
    } satisfies UpdateSharedLinkOnWebLinkRequestBodySharedLinkField,
  } satisfies UpdateSharedLinkOnWebLinkRequestBody,
  { fields: 'shared_link' } satisfies UpdateSharedLinkOnWebLinkQueryParams,
);
```

### Arguments

- webLinkId `string`
  - The ID of the web link. Example: "12345"
- requestBody `UpdateSharedLinkOnWebLinkRequestBody`
  - Request body of updateSharedLinkOnWebLink method
- queryParams `UpdateSharedLinkOnWebLinkQueryParams`
  - Query parameters of updateSharedLinkOnWebLink method
- optionalsInput `UpdateSharedLinkOnWebLinkOptionalsInput`

### Returns

This function returns a value of type `WebLink`.

Returns a basic representation of the web link, with the updated shared
link attached.

## Remove shared link from web link

Removes a shared link from a web link.

This operation is performed by calling function `removeSharedLinkFromWebLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-web-links-id--remove-shared-link/).

<!-- sample put_web_links_id#remove_shared_link -->

```ts
await client.sharedLinksWebLinks.removeSharedLinkFromWebLink(
  webLinkId,
  { sharedLink: createNull() } satisfies RemoveSharedLinkFromWebLinkRequestBody,
  { fields: 'shared_link' } satisfies RemoveSharedLinkFromWebLinkQueryParams,
);
```

### Arguments

- webLinkId `string`
  - The ID of the web link. Example: "12345"
- requestBody `RemoveSharedLinkFromWebLinkRequestBody`
  - Request body of removeSharedLinkFromWebLink method
- queryParams `RemoveSharedLinkFromWebLinkQueryParams`
  - Query parameters of removeSharedLinkFromWebLink method
- optionalsInput `RemoveSharedLinkFromWebLinkOptionalsInput`

### Returns

This function returns a value of type `WebLink`.

Returns a basic representation of a web link, with the
shared link removed.
