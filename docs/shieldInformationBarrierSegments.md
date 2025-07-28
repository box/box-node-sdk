# ShieldInformationBarrierSegmentsManager

- [Get shield information barrier segment with specified ID](#get-shield-information-barrier-segment-with-specified-id)
- [Delete shield information barrier segment](#delete-shield-information-barrier-segment)
- [Update shield information barrier segment with specified ID](#update-shield-information-barrier-segment-with-specified-id)
- [List shield information barrier segments](#list-shield-information-barrier-segments)
- [Create shield information barrier segment](#create-shield-information-barrier-segment)

## Get shield information barrier segment with specified ID

Retrieves shield information barrier segment based on provided ID..

This operation is performed by calling function `getShieldInformationBarrierSegmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shield-information-barrier-segments-id/).

<!-- sample get_shield_information_barrier_segments_id -->

```ts
await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegmentById(
  segmentId,
);
```

### Arguments

- shieldInformationBarrierSegmentId `string`
  - The ID of the shield information barrier segment. Example: "3423"
- optionalsInput `GetShieldInformationBarrierSegmentByIdOptionalsInput`

### Returns

This function returns a value of type `ShieldInformationBarrierSegment`.

Returns the shield information barrier segment object.

## Delete shield information barrier segment

Deletes the shield information barrier segment
based on provided ID.

This operation is performed by calling function `deleteShieldInformationBarrierSegmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-shield-information-barrier-segments-id/).

<!-- sample delete_shield_information_barrier_segments_id -->

```ts
await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
  segmentId,
);
```

### Arguments

- shieldInformationBarrierSegmentId `string`
  - The ID of the shield information barrier segment. Example: "3423"
- optionalsInput `DeleteShieldInformationBarrierSegmentByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Empty body in response.

## Update shield information barrier segment with specified ID

Updates the shield information barrier segment based on provided ID..

This operation is performed by calling function `updateShieldInformationBarrierSegmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-shield-information-barrier-segments-id/).

<!-- sample put_shield_information_barrier_segments_id -->

```ts
await client.shieldInformationBarrierSegments.updateShieldInformationBarrierSegmentById(
  segmentId,
  {
    requestBody: {
      description: updatedSegmentDescription,
    } satisfies UpdateShieldInformationBarrierSegmentByIdRequestBody,
  } satisfies UpdateShieldInformationBarrierSegmentByIdOptionalsInput,
);
```

### Arguments

- shieldInformationBarrierSegmentId `string`
  - The ID of the shield information barrier segment. Example: "3423"
- optionalsInput `UpdateShieldInformationBarrierSegmentByIdOptionalsInput`

### Returns

This function returns a value of type `ShieldInformationBarrierSegment`.

Returns the updated shield information barrier segment object.

## List shield information barrier segments

Retrieves a list of shield information barrier segment objects
for the specified Information Barrier ID.

This operation is performed by calling function `getShieldInformationBarrierSegments`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shield-information-barrier-segments/).

<!-- sample get_shield_information_barrier_segments -->

```ts
await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegments(
  {
    shieldInformationBarrierId: barrierId,
  } satisfies GetShieldInformationBarrierSegmentsQueryParams,
);
```

### Arguments

- queryParams `GetShieldInformationBarrierSegmentsQueryParams`
  - Query parameters of getShieldInformationBarrierSegments method
- optionalsInput `GetShieldInformationBarrierSegmentsOptionalsInput`

### Returns

This function returns a value of type `ShieldInformationBarrierSegments`.

Returns a paginated list of shield information barrier segment objects.

## Create shield information barrier segment

Creates a shield information barrier segment.

This operation is performed by calling function `createShieldInformationBarrierSegment`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-shield-information-barrier-segments/).

<!-- sample post_shield_information_barrier_segments -->

```ts
await client.shieldInformationBarrierSegments.createShieldInformationBarrierSegment(
  {
    shieldInformationBarrier: {
      id: barrierId,
      type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
    } satisfies ShieldInformationBarrierBase,
    name: segmentName,
    description: segmentDescription,
  } satisfies CreateShieldInformationBarrierSegmentRequestBody,
);
```

### Arguments

- requestBody `CreateShieldInformationBarrierSegmentRequestBody`
  - Request body of createShieldInformationBarrierSegment method
- optionalsInput `CreateShieldInformationBarrierSegmentOptionalsInput`

### Returns

This function returns a value of type `ShieldInformationBarrierSegment`.

Returns a new shield information barrier segment object.
