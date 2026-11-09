# DocumentSplitManager

- [Create Document Split job](#create-document-split-job)
- [List Document Split jobs](#list-document-split-jobs)
- [Get Document Split job by ID](#get-document-split-job-by-id)

## Create Document Split job

Initiates a Document Split job for the supplied source file. The job runs
asynchronously; clients can poll the returned job ID to track progress.

All split-specific input lives under `split_input`. When
`split_input.split_type` is `manual`, provide
`split_input.split_definition` (continuous page ranges; `version` may be
omitted or `v_1`). When `split_input.split_type` is `page_selection`,
provide `split_input.page_selection` (non-linear page segments; `version`
may be omitted or `v_2`). `split_input.prompt` must not be provided for
either of those variants. When `split_input.split_type` is `smart`,
`split_input.prompt` is required and neither
`split_input.split_definition` nor `split_input.page_selection` must be
provided.

This operation is performed by calling function `createDocumentSplitV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/post-document-splits/).

<!-- sample post_document_splits_v2026.0 -->

```ts
await client.documentSplit.createDocumentSplitV2026R0({
  sourceFileId: file.id,
  destinationFolderId: folder.id,
  inputSource: 'api' as DocumentSplitCreateRequestV2026R0InputSourceField,
  splitInput: new DocumentSplitCreateRequestManualV2026R0({
    splitType:
      'manual' as DocumentSplitCreateRequestManualV2026R0SplitTypeField,
    splitDefinition: [
      { start: 1, end: 1 } satisfies DocumentSplitPageRangeV2026R0,
    ],
  }),
  externalId: externalId,
} satisfies DocumentSplitCreateRequestV2026R0);
```

### Arguments

- requestBody `DocumentSplitCreateRequestV2026R0`
  - Request body of createDocumentSplitV2026R0 method
- optionalsInput `CreateDocumentSplitV2026R0OptionalsInput`

### Returns

This function returns a value of type `DocumentSplitCreateResponseV2026R0`.

The Document Split job was accepted for processing. Returns a reference
to the newly created job.

## List Document Split jobs

Returns a paginated list of Document Split jobs accessible to the
authenticated user.

This operation is performed by calling function `getDocumentSplitsV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/get-document-splits/).

<!-- sample get_document_splits_v2026.0 -->

```ts
await client.documentSplit.getDocumentSplitsV2026R0({
  limit: 10,
} satisfies GetDocumentSplitsV2026R0QueryParams);
```

### Arguments

- queryParams `GetDocumentSplitsV2026R0QueryParams`
  - Query parameters of getDocumentSplitsV2026R0 method
- headersInput `GetDocumentSplitsV2026R0HeadersInput`
  - Headers of getDocumentSplitsV2026R0 method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `DocumentSplitsV2026R0`.

Returns a paginated list of Document Split jobs.

## Get Document Split job by ID

Returns details for a single Document Split job identified by its ID,
including the current status, the input definition, and any output files
produced by the job.

This operation is performed by calling function `getDocumentSplitByIdV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/get-document-splits-id/).

<!-- sample get_document_splits_id_v2026.0 -->

```ts
await client.documentSplit.getDocumentSplitByIdV2026R0(createdDocumentSplit.id);
```

### Arguments

- documentSplitId `string`
  - The unique identifier for the Document Split job. Example: "1748426"
- optionalsInput `GetDocumentSplitByIdV2026R0OptionalsInput`

### Returns

This function returns a value of type `DocumentSplitV2026R0`.

Returns the Document Split job.
