Terms of Service
================

Terms of Service are custom objects that the admin of an enterprise can configure. This will prompt the
end user to accept/re-accept or decline the custom Terms of Service for custom applications built on
Box Platform. 

* [Get a Terms of Service for an Enterprise](#get-terms-of-services-for-enterprise)
* [Get a Terms of Service for an Enterprise by ID](#get-a-terms-of-service-by-id-for-enterprise)
* [Create a Terms of Service for an Enterprise](#create-a-terms-of-service-for-enterprise)
* [Update a Terms of Service for an Enterprise](#update-a-terms-of-service-for-enterprise)
* [Get Terms of Service Status for User](#get-user-status-on-terms-of-service)
* [Create User Status on Terms of Service](#create-user-status-on-terms-of-service)
* [Accept or Decline a Terms of Service](#accept-decline-a-terms-of-service)
* [Create and Accept or Decline a Terms of Service](#create-accept-decline-a-terms-of-service)



Get Terms of Service for an Enterprise
--------------------------------------

To get terms of service call the [`termsOfService.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#get-terms-of-service-for-enterprise)
method.

```js
client.termsOfService.getAll(callback);
```
Alternatively, you can specify the Terms of Service type. You can either specify "managed" or "external". This
field specifies the type of user the Terms of Service applies to. 

```js
client.termsOfService.getAll
	{
		tosType: 'managed'
	},
	callback);
```

Get a Terms of Service By ID for an Enterprise
----------------------------------------------

To get the terms of service with an ID call the [`termsOfService.get(termsOfServicesID, options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#get-terms-of-service-by-id-for-enterprise)
method.

```js
client.termsOfService.get('1234', null, callback);
```

Requesting information for only the fields you need with the `option` query
string parameter can improve performance and reduce the size of the network
request.

Update a Terms of Service for an Enterprise
-------------------------------------------

To update a terms of service call the [`termsOfService.update(termsOfServicesID, termsOfServicesStatus, termsOfServicesText, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#update-a-terms-of-service-for-enterprise)
method.

```js
client.termsOfService.update('1234', 'enabled', 'This is an example text', callback);
```
The termsOfServicesStatus can be set to 'enabled' or 'disabled'. You can also specify the conditions of the
terms of service in the termsOfServicesText parameter. 

Create a Terms of Service
-------------------------

To create a terms of service call the [`termsOfService.create(termsOfServicesType, termsOfServicesStatus, termsOfServicesText, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#create-a-terms-of-service-for-enterprise)
method.

```js
client.termsOfService.create('managed', 'enabled', 'This is a new terms of service', callback);
```

```js
client.termsOfService.create('external', 'disabled', 'This is a new terms of service but disabled', callback);
```

It is important to note that only two terms of service can exist per enterprise. One managed terms of service and one external terms of service. If you wish to make another terms of service please use the PUT endpoint to update your current terms of service. 

Get Terms of Service Status for User
------------------------------------

To get user status on a terms of service call the [`termsOfService.getUserStatuses(termsOfStatusID, options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfServiceUserStatuses.html#get-user-status-on-terms-of-service)
method.

```js
client.termsOfService.getUserStatuses('1234', callback);
```
Alternatively, you can specify the user ID if you know for which user you want to retrieve their 
terms of service status on.

```js
client.termsOfService.getUserStatuses('1234',
	{
		user_id: '5678'
	},
	callback);
```

Accept or Decline User Status on Terms of Service 
-------------------------------------------------

To update user status on a terms of service call the [`termsOfService.updateUserStatuses(termsOfServiceUserStatusesID, isAccepted, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#accept-decline-a-terms-of-service)
method.

```js
client.termsOfService.updateUserStatuses('5678', true, callback);
```

Create User Status on Terms of Service 
--------------------------------------

To create user status on a terms of service call the [`termsOfService.createUserStatuses(termsOfServicesID, isAccepted, userID, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#create-user-status-on-terms-of-service)
method.

```js
client.termsOfService.createUserStatuses('1234', true, '5678', callback);
```

Create and Accept/Decline a Terms of Service
--------------------------------------------

To create user/terms of service association and accept/decline call the [`termsOfService.setUserStatuses(termsOfServicesID, isAccepted, userID, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#create-accept-decline-a-terms-of-service)
method.

```js
client.termsOfService.setUserStatuses('1234', true, '5678', callback);
```

It is important to note that this combines the creation of an user status on a terms of service and 
accept/decline. If a user creates a terms of service user status when one already exists within an enterprise this function will make a call to update the status on the terms of service with the fields specified.