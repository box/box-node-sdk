# SignRequestsManager

- [Cancel Box Sign request](#cancel-box-sign-request)
- [Resend Box Sign request](#resend-box-sign-request)
- [Get Box Sign request by ID](#get-box-sign-request-by-id)
- [List Box Sign requests](#list-box-sign-requests)
- [Create Box Sign request](#create-box-sign-request)

## Cancel Box Sign request

Cancels a sign request.

This operation is performed by calling function `cancelSignRequest`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-sign-requests-id-cancel/).

<!-- sample post_sign_requests_id_cancel -->

```ts
await client.signRequests.cancelSignRequest(createdSignRequest.id!);
```

### Arguments

- signRequestId `string`
  - The ID of the signature request. Example: "33243242"
- optionalsInput `CancelSignRequestOptionalsInput`

### Returns

This function returns a value of type `SignRequest`.

Returns a Sign Request object.

## Resend Box Sign request

Resends a signature request email to all outstanding signers.

This operation is performed by calling function `resendSignRequest`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-sign-requests-id-resend/).

_Currently we don't have an example for calling `resendSignRequest` in integration tests_

### Arguments

- signRequestId `string`
  - The ID of the signature request. Example: "33243242"
- optionalsInput `ResendSignRequestOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the API call was successful.
The email notifications will be sent asynchronously.

## Get Box Sign request by ID

Gets a sign request by ID.

This operation is performed by calling function `getSignRequestById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-sign-requests-id/).

<!-- sample get_sign_requests_id -->

```ts
await client.signRequests.getSignRequestById(createdSignRequest.id!);
```

### Arguments

- signRequestId `string`
  - The ID of the signature request. Example: "33243242"
- optionalsInput `GetSignRequestByIdOptionalsInput`

### Returns

This function returns a value of type `SignRequest`.

Returns a signature request.

## List Box Sign requests

Gets signature requests created by a user. If the `sign_files` and/or
`parent_folder` are deleted, the signature request will not return in the list.

This operation is performed by calling function `getSignRequests`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-sign-requests/).

<!-- sample get_sign_requests -->

```ts
await client.signRequests.getSignRequests();
```

### Arguments

- queryParams `GetSignRequestsQueryParams`
  - Query parameters of getSignRequests method
- headersInput `GetSignRequestsHeadersInput`
  - Headers of getSignRequests method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `SignRequests`.

Returns a collection of sign requests.

## Create Box Sign request

Creates a signature request. This involves preparing a document for signing and
sending the signature request to signers.

This operation is performed by calling function `createSignRequest`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-sign-requests/).

<!-- sample post_sign_requests -->

```ts
await client.signRequests.createSignRequest({
  signers: [
    {
      email: signerEmail,
      suppressNotifications: true,
      declinedRedirectUrl: 'https://www.box.com',
      embedUrlExternalUserId: '123',
      isInPerson: false,
      loginRequired: false,
      password: 'password',
      role: 'signer' as SignRequestCreateSignerRoleField,
    } satisfies SignRequestCreateSigner,
  ],
  areRemindersEnabled: true,
  areTextSignaturesEnabled: true,
  daysValid: 30,
  declinedRedirectUrl: 'https://www.box.com',
  emailMessage: 'Please sign this document',
  emailSubject: 'Sign this document',
  externalId: '123',
  externalSystemName: 'BoxSignIntegration',
  isDocumentPreparationNeeded: false,
  name: 'Sign Request',
  parentFolder: new FolderMini({ id: destinationFolder.id }),
  redirectUrl: 'https://www.box.com',
  prefillTags: [
    {
      dateValue: dateFromString('2035-01-01'),
      documentTagId: '0',
    } satisfies SignRequestPrefillTag,
  ],
  sourceFiles: [new FileBase({ id: fileToSign.id })],
} satisfies SignRequestCreateRequest);
```

### Arguments

- requestBody `SignRequestCreateRequest`
  - Request body of createSignRequest method
- optionalsInput `CreateSignRequestOptionalsInput`

### Returns

This function returns a value of type `SignRequest`.

Returns a Box Sign request object.
