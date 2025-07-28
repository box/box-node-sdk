# RetentionPolicyAssignmentsManager

- [List retention policy assignments](#list-retention-policy-assignments)
- [Assign retention policy](#assign-retention-policy)
- [Get retention policy assignment](#get-retention-policy-assignment)
- [Remove retention policy assignment](#remove-retention-policy-assignment)
- [Get files under retention](#get-files-under-retention)

## List retention policy assignments

Returns a list of all retention policy assignments associated with a specified
retention policy.

This operation is performed by calling function `getRetentionPolicyAssignments`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-retention-policies-id-assignments/).

<!-- sample get_retention_policies_id_assignments -->

```ts
await client.retentionPolicyAssignments.getRetentionPolicyAssignments(
  retentionPolicy.id,
);
```

### Arguments

- retentionPolicyId `string`
  - The ID of the retention policy. Example: "982312"
- optionalsInput `GetRetentionPolicyAssignmentsOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicyAssignments`.

Returns a list of the retention policy assignments associated with the
specified retention policy.

## Assign retention policy

Assigns a retention policy to an item.

This operation is performed by calling function `createRetentionPolicyAssignment`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-retention-policy-assignments/).

<!-- sample post_retention_policy_assignments -->

```ts
await client.retentionPolicyAssignments.createRetentionPolicyAssignment({
  policyId: retentionPolicy.id,
  assignTo: {
    type: 'folder' as CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField,
    id: folder.id,
  } satisfies CreateRetentionPolicyAssignmentRequestBodyAssignToField,
} satisfies CreateRetentionPolicyAssignmentRequestBody);
```

### Arguments

- requestBody `CreateRetentionPolicyAssignmentRequestBody`
  - Request body of createRetentionPolicyAssignment method
- optionalsInput `CreateRetentionPolicyAssignmentOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicyAssignment`.

Returns a new retention policy assignment object.

## Get retention policy assignment

Retrieves a retention policy assignment.

This operation is performed by calling function `getRetentionPolicyAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-retention-policy-assignments-id/).

<!-- sample get_retention_policy_assignments_id -->

```ts
await client.retentionPolicyAssignments.getRetentionPolicyAssignmentById(
  retentionPolicyAssignment.id,
);
```

### Arguments

- retentionPolicyAssignmentId `string`
  - The ID of the retention policy assignment. Example: "1233123"
- optionalsInput `GetRetentionPolicyAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicyAssignment`.

Returns the retention policy assignment object.

## Remove retention policy assignment

Removes a retention policy assignment
applied to content.

This operation is performed by calling function `deleteRetentionPolicyAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-retention-policy-assignments-id/).

<!-- sample delete_retention_policy_assignments_id -->

```ts
await client.retentionPolicyAssignments.deleteRetentionPolicyAssignmentById(
  retentionPolicyAssignment.id,
);
```

### Arguments

- retentionPolicyAssignmentId `string`
  - The ID of the retention policy assignment. Example: "1233123"
- optionalsInput `DeleteRetentionPolicyAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the policy assignment
is successfully deleted.

## Get files under retention

Returns a list of files under retention for a retention policy assignment.

This operation is performed by calling function `getFilesUnderRetentionPolicyAssignment`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-retention-policy-assignments-id-files-under-retention/).

<!-- sample get_retention_policy_assignments_id_files_under_retention -->

```ts
await client.retentionPolicyAssignments.getFilesUnderRetentionPolicyAssignment(
  retentionPolicyAssignment.id,
);
```

### Arguments

- retentionPolicyAssignmentId `string`
  - The ID of the retention policy assignment. Example: "1233123"
- optionalsInput `GetFilesUnderRetentionPolicyAssignmentOptionalsInput`

### Returns

This function returns a value of type `FilesUnderRetention`.

Returns a list of files under retention that are associated with the
specified retention policy assignment.
