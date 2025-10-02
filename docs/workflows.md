# WorkflowsManager

- [List workflows](#list-workflows)
- [Starts workflow based on request body](#starts-workflow-based-on-request-body)

## List workflows

Returns list of workflows that act on a given `folder ID`, and
have a flow with a trigger type of `WORKFLOW_MANUAL_START`.

You application must be authorized to use the `Manage Box Relay` application
scope within the developer console in to use this endpoint.

This operation is performed by calling function `getWorkflows`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-workflows/).

<!-- sample get_workflows -->

```ts
await adminClient.workflows.getWorkflows({
  folderId: workflowFolderId,
} satisfies GetWorkflowsQueryParams);
```

### Arguments

- queryParams `GetWorkflowsQueryParams`
  - Query parameters of getWorkflows method
- optionalsInput `GetWorkflowsOptionalsInput`

### Returns

This function returns a value of type `Workflows`.

Returns the workflow.

## Starts workflow based on request body

Initiates a flow with a trigger type of `WORKFLOW_MANUAL_START`.

You application must be authorized to use the `Manage Box Relay` application
scope within the developer console.

This operation is performed by calling function `startWorkflow`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-workflows-id-start/).

<!-- sample post_workflows_id_start -->

```ts
await adminClient.workflows.startWorkflow(workflowToRun.id!, {
  type: 'workflow_parameters' as StartWorkflowRequestBodyTypeField,
  flow: {
    type: 'flow',
    id: workflowToRun.flows![0].id!,
  } satisfies StartWorkflowRequestBodyFlowField,
  files: [
    {
      type: 'file' as StartWorkflowRequestBodyFilesTypeField,
      id: workflowFileId,
    } satisfies StartWorkflowRequestBodyFilesField,
  ],
  folder: {
    type: 'folder' as StartWorkflowRequestBodyFolderTypeField,
    id: workflowFolderId,
  } satisfies StartWorkflowRequestBodyFolderField,
} satisfies StartWorkflowRequestBody);
```

### Arguments

- workflowId `string`
  - The ID of the workflow. Example: "12345"
- requestBody `StartWorkflowRequestBody`
  - Request body of startWorkflow method
- optionalsInput `StartWorkflowOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Starts the workflow.
