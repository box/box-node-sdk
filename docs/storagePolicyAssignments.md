# StoragePolicyAssignmentsManager

- [List storage policy assignments](#list-storage-policy-assignments)
- [Assign storage policy](#assign-storage-policy)
- [Get storage policy assignment](#get-storage-policy-assignment)
- [Update storage policy assignment](#update-storage-policy-assignment)
- [Unassign storage policy](#unassign-storage-policy)

## List storage policy assignments

Fetches all the storage policy assignment for an enterprise or user.

This operation is performed by calling function `getStoragePolicyAssignments`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-storage-policy-assignments/).

<!-- sample get_storage_policy_assignments -->

```ts
await client.storagePolicyAssignments.getStoragePolicyAssignments({
  resolvedForType:
    'user' as GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField,
  resolvedForId: userId,
} satisfies GetStoragePolicyAssignmentsQueryParams);
```

### Arguments

- queryParams `GetStoragePolicyAssignmentsQueryParams`
  - Query parameters of getStoragePolicyAssignments method
- optionalsInput `GetStoragePolicyAssignmentsOptionalsInput`

### Returns

This function returns a value of type `StoragePolicyAssignments`.

Returns a collection of storage policies for
the enterprise or user.

## Assign storage policy

Creates a storage policy assignment for an enterprise or user.

This operation is performed by calling function `createStoragePolicyAssignment`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-storage-policy-assignments/).

<!-- sample post_storage_policy_assignments -->

```ts
await client.storagePolicyAssignments.createStoragePolicyAssignment({
  storagePolicy: new CreateStoragePolicyAssignmentRequestBodyStoragePolicyField(
    { id: policyId },
  ),
  assignedTo: {
    id: userId,
    type: 'user' as CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField,
  } satisfies CreateStoragePolicyAssignmentRequestBodyAssignedToField,
} satisfies CreateStoragePolicyAssignmentRequestBody);
```

### Arguments

- requestBody `CreateStoragePolicyAssignmentRequestBody`
  - Request body of createStoragePolicyAssignment method
- optionalsInput `CreateStoragePolicyAssignmentOptionalsInput`

### Returns

This function returns a value of type `StoragePolicyAssignment`.

Returns the new storage policy assignment created.

## Get storage policy assignment

Fetches a specific storage policy assignment.

This operation is performed by calling function `getStoragePolicyAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-storage-policy-assignments-id/).

<!-- sample get_storage_policy_assignments_id -->

```ts
await client.storagePolicyAssignments.getStoragePolicyAssignmentById(
  storagePolicyAssignment.id,
);
```

### Arguments

- storagePolicyAssignmentId `string`
  - The ID of the storage policy assignment. Example: "932483"
- optionalsInput `GetStoragePolicyAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `StoragePolicyAssignment`.

Returns a storage policy assignment object.

## Update storage policy assignment

Updates a specific storage policy assignment.

This operation is performed by calling function `updateStoragePolicyAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-storage-policy-assignments-id/).

<!-- sample put_storage_policy_assignments_id -->

```ts
await client.storagePolicyAssignments.updateStoragePolicyAssignmentById(
  storagePolicyAssignment.id,
  {
    storagePolicy:
      new UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField({
        id: storagePolicy2.id,
      }),
  } satisfies UpdateStoragePolicyAssignmentByIdRequestBody,
);
```

### Arguments

- storagePolicyAssignmentId `string`
  - The ID of the storage policy assignment. Example: "932483"
- requestBody `UpdateStoragePolicyAssignmentByIdRequestBody`
  - Request body of updateStoragePolicyAssignmentById method
- optionalsInput `UpdateStoragePolicyAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `StoragePolicyAssignment`.

Returns an updated storage policy assignment object.

## Unassign storage policy

Delete a storage policy assignment.

Deleting a storage policy assignment on a user
will have the user inherit the enterprise's default
storage policy.

There is a rate limit for calling this endpoint of only
twice per user in a 24 hour time frame.

This operation is performed by calling function `deleteStoragePolicyAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-storage-policy-assignments-id/).

<!-- sample delete_storage_policy_assignments_id -->

```ts
await client.storagePolicyAssignments.deleteStoragePolicyAssignmentById(
  storagePolicyAssignment.id,
);
```

### Arguments

- storagePolicyAssignmentId `string`
  - The ID of the storage policy assignment. Example: "932483"
- optionalsInput `DeleteStoragePolicyAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the storage policy
assignment is successfully deleted.
