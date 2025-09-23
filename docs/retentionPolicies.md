# RetentionPoliciesManager

- [List retention policies](#list-retention-policies)
- [Create retention policy](#create-retention-policy)
- [Get retention policy](#get-retention-policy)
- [Update retention policy](#update-retention-policy)
- [Delete retention policy](#delete-retention-policy)

## List retention policies

Retrieves all of the retention policies for an enterprise.

This operation is performed by calling function `getRetentionPolicies`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-retention-policies/).

<!-- sample get_retention_policies -->

```ts
await client.retentionPolicies.getRetentionPolicies();
```

### Arguments

- queryParams `GetRetentionPoliciesQueryParams`
  - Query parameters of getRetentionPolicies method
- headersInput `GetRetentionPoliciesHeadersInput`
  - Headers of getRetentionPolicies method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `RetentionPolicies`.

Returns a list retention policies in the enterprise.

## Create retention policy

Creates a retention policy.

This operation is performed by calling function `createRetentionPolicy`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-retention-policies/).

<!-- sample post_retention_policies -->

```ts
await client.retentionPolicies.createRetentionPolicy({
  policyName: retentionPolicyName,
  policyType: 'finite' as CreateRetentionPolicyRequestBodyPolicyTypeField,
  areOwnersNotified: true,
  canOwnerExtendRetention: true,
  description: retentionDescription,
  dispositionAction:
    'remove_retention' as CreateRetentionPolicyRequestBodyDispositionActionField,
  retentionLength: '1',
  retentionType:
    'modifiable' as CreateRetentionPolicyRequestBodyRetentionTypeField,
} satisfies CreateRetentionPolicyRequestBody);
```

### Arguments

- requestBody `CreateRetentionPolicyRequestBody`
  - Request body of createRetentionPolicy method
- optionalsInput `CreateRetentionPolicyOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicy`.

Returns a new retention policy object.

## Get retention policy

Retrieves a retention policy.

This operation is performed by calling function `getRetentionPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-retention-policies-id/).

<!-- sample get_retention_policies_id -->

```ts
await client.retentionPolicies.getRetentionPolicyById(retentionPolicy.id);
```

### Arguments

- retentionPolicyId `string`
  - The ID of the retention policy. Example: "982312"
- optionalsInput `GetRetentionPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicy`.

Returns the retention policy object.

## Update retention policy

Updates a retention policy.

This operation is performed by calling function `updateRetentionPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-retention-policies-id/).

<!-- sample put_retention_policies_id -->

```ts
await client.retentionPolicies.updateRetentionPolicyById(retentionPolicy.id, {
  requestBody: {
    policyName: updatedRetentionPolicyName,
  } satisfies UpdateRetentionPolicyByIdRequestBody,
} satisfies UpdateRetentionPolicyByIdOptionalsInput);
```

### Arguments

- retentionPolicyId `string`
  - The ID of the retention policy. Example: "982312"
- optionalsInput `UpdateRetentionPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `RetentionPolicy`.

Returns the updated retention policy object.

## Delete retention policy

Permanently deletes a retention policy.

This operation is performed by calling function `deleteRetentionPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-retention-policies-id/).

<!-- sample delete_retention_policies_id -->

```ts
await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
```

### Arguments

- retentionPolicyId `string`
  - The ID of the retention policy. Example: "982312"
- optionalsInput `DeleteRetentionPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the policy has been deleted.
