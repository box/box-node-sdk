Terms of Service
================

Terms of Service are custom objects that the admin of an enterprise can configure. This will prompt the
end user to accept/re-accept or decline the custom Terms of Service for custom applications built on
Box Platform. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get Terms of Service for an Enterprise](#get-terms-of-service-for-an-enterprise)
- [Get a Terms of Service By ID for an Enterprise](#get-a-terms-of-service-by-id-for-an-enterprise)
- [Update a Terms of Service for an Enterprise](#update-a-terms-of-service-for-an-enterprise)
- [Create a Terms of Service for an Enterprise](#create-a-terms-of-service-for-an-enterprise)
- [Get Terms of Service Status for User](#get-terms-of-service-status-for-user)
- [Create User Status on Terms of Service](#create-user-status-on-terms-of-service)
- [Update User Status on Terms of Service](#update-user-status-on-terms-of-service)
- [Accept or Decline a Terms of Service](#accept-or-decline-a-terms-of-service)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get Terms of Service for an Enterprise
--------------------------------------

To get terms of service call the [`termsOfService.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#getAll)
method.

```js
client.termsOfService.getAll()
	.then(termsOfService => {
		/* termsOfService -> {
			entries: [
				total_count: 1,
				{ type: 'terms_of_service',
				id: '12345',
				status: 'disabled',
				enterprise: { type: 'enterprise', id: '55555' },
				tos_type: 'managed',
				text: 'By using this service, you agree to ...',
				created_at: '2018-04-19T13:55:09-07:00',
				modified_at: '2018-04-19T13:55:09-07:00' }
			]
		*/
	});
```
Alternatively, you can specify the Terms of Service type. You can either specify "managed" or "external". This
field specifies the type of user the Terms of Service applies to. 

```js
client.termsOfService.getAll({ tos_type: 'managed' })
	.then(termsOfService => {
		/* termsOfService -> {
			entries: [
				total_count: 1,
				{ type: 'terms_of_service',
				id: '12345',
				status: 'disabled',
				enterprise: { type: 'enterprise', id: '55555' },
				tos_type: 'managed',
				text: 'By using this service, you agree to ...',
				created_at: '2018-04-19T13:55:09-07:00',
				modified_at: '2018-04-19T13:55:09-07:00' }
			]
		*/
	});
```

Get a Terms of Service By ID
----------------------------

To get the terms of service with an ID call the
[`termsOfService.get(termsOfServicesID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#get)
method.

```js
client.termsOfService.get('12345')
	.then(tos => {
		/* tos -> {
			type: 'terms_of_service',
			id: '12345',
			status: 'disabled',
			enterprise: { type: 'enterprise', id: '55555' },
			tos_type: 'managed',
			text: 'By using this service, you agree to ...',
			created_at: '2018-04-19T13:55:09-07:00',
			modified_at: '2018-04-19T13:55:09-07:00' }
		*/
	});
```

Update a Terms of Service for an Enterprise
-------------------------------------------

To update a terms of service call the [`termsOfService.update(termsOfServicesID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#update)
method with the fields to update and their new values.

```js
client.termsOfService.update('12345', { status: 'disabled' })
	.then(tos => {
		/* tos -> {
			type: 'terms_of_service',
			id: '12345',
			status: 'disabled',
			enterprise: { type: 'enterprise', id: '55555' },
			tos_type: 'managed',
			text: 'By using this service, you agree to ...',
			created_at: '2018-04-19T13:55:09-07:00',
			modified_at: '2018-04-19T13:55:09-07:00' }
		*/
	});
```

The termsOfServicesStatus can be set to 'enabled' or 'disabled'. You can also specify the conditions of the terms of service in the termsOfServicesText parameter. 

Create a Terms of Service for an Enterprise
-------------------------------------------

To create a terms of service call the
[`termsOfService.create(termsOfServicesType, termsOfServicesStatus, termsOfServicesText, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#create)
method.

> __Note:__ Only two terms of service can exist per enterprise: one managed terms of service and one external terms of
> service. If you wish to have a different terms of service, update one of the existing terms of service. 

```js
client.termsOfService.create('managed', 'enabled', 'By using this service, you agree to ...')
	.then(tos => {
		/* tos -> {
			type: 'terms_of_service',
			id: '12345',
			status: 'enabled',
			enterprise: { type: 'enterprise', id: '55555' },
			tos_type: 'managed',
			text: 'By using this service, you agree to ...',
			created_at: '2018-04-19T13:55:09-07:00',
			modified_at: '2018-04-19T13:55:09-07:00' }
		*/
	});
```

```js
client.termsOfService.create('external', 'disabled', 'This is a new terms of service but disabled')
	.then(tos => {
		/* tos -> {
			type: 'terms_of_service',
			id: '12346',
			status: 'disabled',
			enterprise: { type: 'enterprise', id: '55555' },
			tos_type: 'external',
			text: 'This is a new terms of service but disabled',
			created_at: '2018-04-19T13:55:09-07:00',
			modified_at: '2018-04-19T13:55:09-07:00' }
		*/
	});
```


Get Terms of Service Status for User
------------------------------------

To get user status on a terms of service call the [`termsOfService.getUserStatus(termsOfStatusID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#getUserStatus)
method.

If no `user_id` option is specified, this will default to current user.

```js
client.termsOfService.getUserStatus('11111', { user_id: '22222' })
	.then(tosStatus => {
		/* tosStatus -> {
			type: 'terms_of_service_user_status',
			id: '12345',
			tos: { type: 'terms_of_service', id: '11111' },
			user: { type: 'user', id: '22222' },
			is_accepted: true,
			created_at: '2018-04-11T15:33:49-07:00',
			modified_at: '2018-04-11T15:33:49-07:00' }
		*/
	});
```


Create User Status on Terms of Service 
--------------------------------------

To accept or decline a terms of service for a user who has never accepted/decline this terms of service before call the [`termsOfService.createUserStatus(termsOfServicesID, isAccepted, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#createUserStatus)
method.

```js
client.termsOfService.createUserStatus('11111', true, {user_id: '22222'})
	.then(tosStatus => {
		/* tosStatus -> {
			type: 'terms_of_service_user_status',
			id: '12345',
			tos: { type: 'terms_of_service', id: '11111' },
			user: { type: 'user', id: '22222' },
			is_accepted: true,
			created_at: '2018-04-11T15:33:49-07:00',
			modified_at: '2018-04-11T15:33:49-07:00' }
		*/
	});
```
It is important to note that this will accept or decline a custom terms of service for a user that has 
never taken action on this terms of service before. For a user that has, this will return a 409 Conflict Error.

If no user is specified, this will default to current user.

Update User Status on Terms of Service 
--------------------------------------

To update user status on a terms of service call the [`termsOfService.updateUserStatus(termsOfServiceUserStatusID, isAccepted, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#updateUserStatus)
method.

```js
client.termsOfService.updateUserStatus('5678', false)
	.then(tosStatus => {
		/* tosStatus -> {
			type: 'terms_of_service_user_status',
			id: '12345',
			tos: { type: 'terms_of_service', id: '11111' },
			user: { type: 'user', id: '22222' },
			is_accepted: false,
			created_at: '2018-04-11T15:33:49-07:00',
			modified_at: '2018-04-11T15:33:49-07:00' }
		*/
	});
```

It is important to note that this will accept or decline a custom terms of service for a user. For a user that has taken action in this terms of service, this will update their status. If the user has never taken action on this terms of service then this will return a 404 Not Found Error. 

Accept or Decline a Terms of Service
------------------------------------

To create user/terms of service association and accept/decline call the [`termsOfService.setUserStatus(termsOfServicesID, isAccepted, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/TermsOfService.html#setUserStatus))
method.

```js
client.termsOfService.setUserStatus('1234', true, 
	{
		user_id: '5678'
	},
	callback);
)
```

It is important to note that regardless of whether the user has taken action on this terms of service. This will create and update the user status on the terms of service. 