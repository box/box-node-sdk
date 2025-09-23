# LegalHoldPoliciesManager

- [List all legal hold policies](#list-all-legal-hold-policies)
- [Create legal hold policy](#create-legal-hold-policy)
- [Get legal hold policy](#get-legal-hold-policy)
- [Update legal hold policy](#update-legal-hold-policy)
- [Remove legal hold policy](#remove-legal-hold-policy)

## List all legal hold policies

Retrieves a list of legal hold policies that belong to
an enterprise.

This operation is performed by calling function `getLegalHoldPolicies`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-legal-hold-policies/).

<!-- sample get_legal_hold_policies -->

```ts
await client.legalHoldPolicies.getLegalHoldPolicies();
```

### Arguments

- queryParams `GetLegalHoldPoliciesQueryParams`
  - Query parameters of getLegalHoldPolicies method
- headersInput `GetLegalHoldPoliciesHeadersInput`
  - Headers of getLegalHoldPolicies method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `LegalHoldPolicies`.

Returns a list of legal hold policies.

## Create legal hold policy

Create a new legal hold policy.

This operation is performed by calling function `createLegalHoldPolicy`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-legal-hold-policies/).

<!-- sample post_legal_hold_policies -->

```ts
await client.legalHoldPolicies.createLegalHoldPolicy({
  policyName: legalHoldPolicyName,
  description: legalHoldDescription,
  isOngoing: false,
  filterStartedAt: filterStartedAt,
  filterEndedAt: filterEndedAt,
} satisfies CreateLegalHoldPolicyRequestBody);
```

### Arguments

- requestBody `CreateLegalHoldPolicyRequestBody`
  - Request body of createLegalHoldPolicy method
- optionalsInput `CreateLegalHoldPolicyOptionalsInput`

### Returns

This function returns a value of type `LegalHoldPolicy`.

Returns a new legal hold policy object.

## Get legal hold policy

Retrieve a legal hold policy.

This operation is performed by calling function `getLegalHoldPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-legal-hold-policies-id/).

<!-- sample get_legal_hold_policies_id -->

```ts
await client.legalHoldPolicies.getLegalHoldPolicyById(legalHoldPolicyId);
```

### Arguments

- legalHoldPolicyId `string`
  - The ID of the legal hold policy. Example: "324432"
- optionalsInput `GetLegalHoldPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `LegalHoldPolicy`.

Returns a legal hold policy object.

## Update legal hold policy

Update legal hold policy.

This operation is performed by calling function `updateLegalHoldPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-legal-hold-policies-id/).

<!-- sample put_legal_hold_policies_id -->

```ts
await client.legalHoldPolicies.updateLegalHoldPolicyById(legalHoldPolicyId, {
  requestBody: {
    policyName: updatedLegalHoldPolicyName,
  } satisfies UpdateLegalHoldPolicyByIdRequestBody,
} satisfies UpdateLegalHoldPolicyByIdOptionalsInput);
```

### Arguments

- legalHoldPolicyId `string`
  - The ID of the legal hold policy. Example: "324432"
- optionalsInput `UpdateLegalHoldPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `LegalHoldPolicy`.

Returns a new legal hold policy object.

## Remove legal hold policy

Delete an existing legal hold policy.

This is an asynchronous process. The policy will not be
fully deleted yet when the response returns.

This operation is performed by calling function `deleteLegalHoldPolicyById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-legal-hold-policies-id/).

<!-- sample delete_legal_hold_policies_id -->

```ts
await client.legalHoldPolicies.deleteLegalHoldPolicyById(legalHoldPolicy.id);
```

### Arguments

- legalHoldPolicyId `string`
  - The ID of the legal hold policy. Example: "324432"
- optionalsInput `DeleteLegalHoldPolicyByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

A blank response is returned if the policy was
successfully deleted.
