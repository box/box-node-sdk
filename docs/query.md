# QueryManager

- [Query for Box items](#query-for-box-items)
- [Create insights for Box items](#create-insights-for-box-items)

## Query for Box items

Runs a query to discover Box items using a logical predicate that can filter
across item fields and metadata templates. Results can be sorted, paginated,
and shaped to include additional item or metadata fields.

This operation is performed by calling function `createQueryV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/post-query/).

<!-- sample post_query_v2026.0 -->

```ts
await client.query.createQueryV2026R0({
  query: {
    predicate: predicate,
    params: { ['name']: 'John', ['age']: 50 },
    ancestors: [
      { id: '0', type: 'folder' } satisfies QueryAncestorReferenceV2026R0,
    ],
  } satisfies QueryRequestBodyV2026R0QueryField,
  limit: 10,
  fields: ['box:item:name', searchFrom],
} satisfies QueryRequestBodyV2026R0);
```

### Arguments

- requestBody `QueryRequestBodyV2026R0`
  - Request body of createQueryV2026R0 method
- optionalsInput `CreateQueryV2026R0OptionalsInput`

### Returns

This function returns a value of type `QueryResultsV2026R0`.

Returns a paginated list of items matching the query.

## Create insights for Box items

Computes aggregated metrics over Box items matching a query predicate.
Filters are applied first, followed by optional grouping, after which the
requested metrics (such as `sum`, `avg`, `min`, `max`, and `count`) are
computed for each resulting group or over the entire filtered dataset.

This operation is performed by calling function `createQueryInsightV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/post-query-insights/).

<!-- sample post_query_insights_v2026.0 -->

```ts
await client.query.createQueryInsightV2026R0({
  query: {
    predicate: predicate,
    params: { ['minAmount']: 0 },
    ancestors: [
      { id: '0', type: 'folder' } satisfies QueryAncestorReferenceV2026R0,
    ],
    groupBy: [
      {
        field: ''.concat(mdPrefix, '.category') as string,
        bucketLimit: 5,
      } satisfies QueryInsightsGroupByV2026R0,
    ],
  } satisfies QueryInsightsRequestBodyV2026R0QueryField,
  metrics: metrics,
} satisfies QueryInsightsRequestBodyV2026R0);
```

### Arguments

- requestBody `QueryInsightsRequestBodyV2026R0`
  - Request body of createQueryInsightV2026R0 method
- optionalsInput `CreateQueryInsightV2026R0OptionalsInput`

### Returns

This function returns a value of type `QueryInsightsV2026R0`.

Returns the computed insight entries.
