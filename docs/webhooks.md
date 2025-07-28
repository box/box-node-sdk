# WebhooksManager

- [List all webhooks](#list-all-webhooks)
- [Create webhook](#create-webhook)
- [Get webhook](#get-webhook)
- [Update webhook](#update-webhook)
- [Remove webhook](#remove-webhook)
- [Validate a webhook message](#validate-a-webhook-message)

## List all webhooks

Returns all defined webhooks for the requesting application.

This API only returns webhooks that are applied to files or folders that are
owned by the authenticated user. This means that an admin can not see webhooks
created by a service account unless the admin has access to those folders, and
vice versa.

This operation is performed by calling function `getWebhooks`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-webhooks/).

<!-- sample get_webhooks -->

```ts
await client.webhooks.getWebhooks();
```

### Arguments

- queryParams `GetWebhooksQueryParams`
  - Query parameters of getWebhooks method
- headersInput `GetWebhooksHeadersInput`
  - Headers of getWebhooks method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `Webhooks`.

Returns a list of webhooks.

## Create webhook

Creates a webhook.

This operation is performed by calling function `createWebhook`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-webhooks/).

<!-- sample post_webhooks -->

```ts
await client.webhooks.createWebhook({
  target: {
    id: folder.id,
    type: 'folder' as CreateWebhookRequestBodyTargetTypeField,
  } satisfies CreateWebhookRequestBodyTargetField,
  address: 'https://example.com/new-webhook',
  triggers: ['FILE.UPLOADED' as CreateWebhookRequestBodyTriggersField],
} satisfies CreateWebhookRequestBody);
```

### Arguments

- requestBody `CreateWebhookRequestBody`
  - Request body of createWebhook method
- optionalsInput `CreateWebhookOptionalsInput`

### Returns

This function returns a value of type `Webhook`.

Returns the new webhook object.

## Get webhook

Retrieves a specific webhook.

This operation is performed by calling function `getWebhookById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-webhooks-id/).

<!-- sample get_webhooks_id -->

```ts
await client.webhooks.getWebhookById(webhook.id!);
```

### Arguments

- webhookId `string`
  - The ID of the webhook. Example: "3321123"
- optionalsInput `GetWebhookByIdOptionalsInput`

### Returns

This function returns a value of type `Webhook`.

Returns a webhook object.

## Update webhook

Updates a webhook.

This operation is performed by calling function `updateWebhookById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-webhooks-id/).

<!-- sample put_webhooks_id -->

```ts
await client.webhooks.updateWebhookById(webhook.id!, {
  requestBody: {
    address: 'https://example.com/updated-webhook',
  } satisfies UpdateWebhookByIdRequestBody,
} satisfies UpdateWebhookByIdOptionalsInput);
```

### Arguments

- webhookId `string`
  - The ID of the webhook. Example: "3321123"
- optionalsInput `UpdateWebhookByIdOptionalsInput`

### Returns

This function returns a value of type `Webhook`.

Returns the new webhook object.

## Remove webhook

Deletes a webhook.

This operation is performed by calling function `deleteWebhookById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-webhooks-id/).

<!-- sample delete_webhooks_id -->

```ts
await client.webhooks.deleteWebhookById(webhook.id!);
```

### Arguments

- webhookId `string`
  - The ID of the webhook. Example: "3321123"
- optionalsInput `DeleteWebhookByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

An empty response will be returned when the webhook
was successfully deleted.

## Validate a webhook message

Validate a webhook message by verifying the signature and the delivery timestamp

This operation is performed by calling function `validateMessage`.

```ts
await WebhooksManager.validateMessage(
  body,
  headersWithCorrectDatetime,
  primaryKey,
  { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
);
```

### Arguments

- body `string`
  - The request body of the webhook message
- headers `{
    readonly [key: string]: string;
}`
  - The headers of the webhook message
- primaryKey `string`
  - The primary signature to verify the message with
- optionalsInput `ValidateMessageOptionalsInput`

### Returns

This function returns a value of type `boolean`.
