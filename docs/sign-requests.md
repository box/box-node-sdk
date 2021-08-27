# Sign Requests

<!-- TODO autogenerate description -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Get sign request by ID](#get-sign-request-by-id)
- [List sign requests](#list-sign-requests)
- [Create sign request](#create-sign-request)
- [Cancel sign request](#cancel-sign-request)
- [Resend sign request](#resend-sign-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TODO autogenerate -->

## Get sign request by ID

Gets a sign request by ID [`signRequests.getById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/SignRequestsManager.html#getById)
method.

<!-- sample get_sign_requests_id -->

```js
const sr = await client.signRequests.getById({
	sign_request_id: 12345,
});
console.log(
	`Sign request id ${sr.id} contains ${sr.source_files.length} files`
);
```

## List sign requests

Gets sign requests created by a user [`signRequests.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/SignRequestsManager.html#getAll)
method.

<!-- sample get_sign_requests -->

```js
const result = await client.signRequests.getAll();
console.log(`There are ${result.count} sign requests`);
```

## Create sign request

Creates a sign request. This involves preparing a document for signing and sending the sign request to signers. [`signRequests.create(body, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/SignRequestsManager.html#create)
method.

<!-- sample post_sign_requests -->

```js
const signRequest = await client.signRequests.create({
	signers: [
		{
			role: 'signer',
			email: 'user@example.com',
		},
	],
	source_files: [
		{
			type: 'file',
			id: '12345',
		},
	],
	parent_folder: {
		type: 'folder',
		id: '1234567',
	},
});
console.log(`Created a new sign request id ${signRequest.id}`);
```

## Cancel sign request

Cancels a sign request [`signRequests.cancelById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/SignRequestsManager.html#cancelById)
method.

<!-- sample post_sign_requests_id_cancel -->

```js
const signRequest = await client.signRequests.cancelById({
	sign_request_id: 12345,
});
console.log(`Sign request id ${sr.id} cancelled`);
```

## Resend sign request

Resends a sign request email to all outstanding signers [`signRequests.resendById(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/jsdoc/SignRequestsManager.html#resendById)
method.

<!-- sample post_sign_requests_id_resend -->

```js
const id = 12345;
await client.signRequests.resendById({ sign_request_id: id });
console.log(`Sign request id ${sr.id} resent`);
```
