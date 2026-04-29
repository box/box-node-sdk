# AutomateWorkflowsManager

- [List Automate workflows defined as callable actions](#list-automate-workflows-defined-as-callable-actions)
- [Start Automate workflow](#start-automate-workflow)

## List Automate workflows defined as callable actions

Returns workflow actions from Automate for a folder, using the
`WORKFLOW` action category.

This operation is performed by calling function `getAutomateWorkflowsV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/get-automate-workflows/).

_Currently we don't have an example for calling `getAutomateWorkflowsV2026R0` in integration tests_

### Arguments

- queryParams `GetAutomateWorkflowsV2026R0QueryParams`
  - Query parameters of getAutomateWorkflowsV2026R0 method
- optionalsInput `GetAutomateWorkflowsV2026R0OptionalsInput`

### Returns

This function returns a value of type `AutomateWorkflowsV2026R0`.

Returns workflow actions that can be manually started.

## Start Automate workflow

Starts an Automate workflow manually by using a workflow action ID and file IDs.

This operation is performed by calling function `createAutomateWorkflowStartV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/post-automate-workflows-id-start/).

_Currently we don't have an example for calling `createAutomateWorkflowStartV2026R0` in integration tests_

### Arguments

- workflowId `string`
  - The ID of the workflow. Example: "12345"
- requestBody `AutomateWorkflowStartRequestV2026R0`
  - Request body of createAutomateWorkflowStartV2026R0 method
- optionalsInput `CreateAutomateWorkflowStartV2026R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

Starts the workflow.
