# CollaborationAllowlistEntriesManager

- [List allowed collaboration domains](#list-allowed-collaboration-domains)
- [Add domain to list of allowed collaboration domains](#add-domain-to-list-of-allowed-collaboration-domains)
- [Get allowed collaboration domain](#get-allowed-collaboration-domain)
- [Remove domain from list of allowed collaboration domains](#remove-domain-from-list-of-allowed-collaboration-domains)

## List allowed collaboration domains

Returns the list domains that have been deemed safe to create collaborations
for within the current enterprise.

This operation is performed by calling function `getCollaborationWhitelistEntries`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-collaboration-whitelist-entries/).

<!-- sample get_collaboration_whitelist_entries -->

```ts
await client.collaborationAllowlistEntries.getCollaborationWhitelistEntries();
```

### Arguments

- queryParams `GetCollaborationWhitelistEntriesQueryParams`
  - Query parameters of getCollaborationWhitelistEntries method
- headersInput `GetCollaborationWhitelistEntriesHeadersInput`
  - Headers of getCollaborationWhitelistEntries method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `CollaborationAllowlistEntries`.

Returns a collection of domains that are allowed for collaboration.

## Add domain to list of allowed collaboration domains

Creates a new entry in the list of allowed domains to allow
collaboration for.

This operation is performed by calling function `createCollaborationWhitelistEntry`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-collaboration-whitelist-entries/).

<!-- sample post_collaboration_whitelist_entries -->

```ts
await client.collaborationAllowlistEntries.createCollaborationWhitelistEntry({
  direction:
    'inbound' as CreateCollaborationWhitelistEntryRequestBodyDirectionField,
  domain: domain,
} satisfies CreateCollaborationWhitelistEntryRequestBody);
```

### Arguments

- requestBody `CreateCollaborationWhitelistEntryRequestBody`
  - Request body of createCollaborationWhitelistEntry method
- optionalsInput `CreateCollaborationWhitelistEntryOptionalsInput`

### Returns

This function returns a value of type `CollaborationAllowlistEntry`.

Returns a new entry on the list of allowed domains.

## Get allowed collaboration domain

Returns a domain that has been deemed safe to create collaborations
for within the current enterprise.

This operation is performed by calling function `getCollaborationWhitelistEntryById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-collaboration-whitelist-entries-id/).

<!-- sample get_collaboration_whitelist_entries_id -->

```ts
await client.collaborationAllowlistEntries.getCollaborationWhitelistEntryById(
  newEntry.id!,
);
```

### Arguments

- collaborationWhitelistEntryId `string`
  - The ID of the entry in the list. Example: "213123"
- optionalsInput `GetCollaborationWhitelistEntryByIdOptionalsInput`

### Returns

This function returns a value of type `CollaborationAllowlistEntry`.

Returns an entry on the list of allowed domains.

## Remove domain from list of allowed collaboration domains

Removes a domain from the list of domains that have been deemed safe to create
collaborations for within the current enterprise.

This operation is performed by calling function `deleteCollaborationWhitelistEntryById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-collaboration-whitelist-entries-id/).

<!-- sample delete_collaboration_whitelist_entries_id -->

```ts
await client.collaborationAllowlistEntries.deleteCollaborationWhitelistEntryById(
  entry.id!,
);
```

### Arguments

- collaborationWhitelistEntryId `string`
  - The ID of the entry in the list. Example: "213123"
- optionalsInput `DeleteCollaborationWhitelistEntryByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

A blank response is returned if the entry was
successfully deleted.
