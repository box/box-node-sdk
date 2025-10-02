# SharedLinksAppItemsManager

- [Find app item for shared link](#find-app-item-for-shared-link)

## Find app item for shared link

Returns the app item represented by a shared link.

The link can originate from the current enterprise or another.

This operation is performed by calling function `findAppItemForSharedLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shared-items--app-items/).

<!-- sample get_shared_items#app_items -->

```ts
await client.sharedLinksAppItems.findAppItemForSharedLink({
  boxapi: ''.concat('shared_link=', appItemSharedLink) as string,
} satisfies FindAppItemForSharedLinkHeadersInput);
```

### Arguments

- headersInput `FindAppItemForSharedLinkHeadersInput`
  - Headers of findAppItemForSharedLink method
- optionalsInput `FindAppItemForSharedLinkOptionalsInput`

### Returns

This function returns a value of type `AppItem`.

Returns a full app item resource if the shared link is valid and
the user has access to it.
