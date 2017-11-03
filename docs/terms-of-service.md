Terms of Service
================

Terms of Service are custom objects that the admin of an enterprise can configure. This will prompt the
end user to accept/re-accept or decline the custom Terms of Service for custom applications built on
Box Platform. 

* [Get a Terms of Service information](#get-terms-of-services)
* [Get a Terms of Service information by ID](#get-a-terms-of-service-by-id)
* [Create a Terms of Service](#create-a-terms-of-service)
* [Update a Terms of Service information](#update-a-terms-of-service)
* [Get User Status on a Terms of Service](#get-user-status-on-terms-of-service)
* [Create User Status on a Terms of Service](#create-user-status-on-terms-of-service)
* [Update User Status on a Terms of SErvice](#update-user-status-on-terms-of-service)



Get Terms of Service
--------------------

To get terms of service call the [`termsOfService.getTermsOfServices(options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#get-terms-of-services)
method.

```js
client.termsOfService.getTermsOfServices(callback);
```
Alternatively, you can specify the Terms of Service type. There are currently two options. 'managed' returns terms of service that exists within an enterprise and 'external' returns 
terms of service that exists outside of the current enterprise

```js
client.termsOfService.getTermsOfServices(
	{
		tosType: 'managed'
	},
	callback);
```

Get a Terms of Service By ID
----------------------------

To get the terms of service with an ID call the [`termsOfService.getTermsOfServicesByID(termsOfServicesID, options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#get-terms-of-service-by-id)
method.

```js
client.termsOfService.getTermsOfServicesByID('1234', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

Update a Terms of Service
-------------------------

To update a terms of service call the [`termsOfService.updateTermsOfServices(termsOfServicesID, termsOfServicesStatus, termsOfServicesText, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#update-a-terms-of-service)
method.

```js
client.termsOfService.updateTermsOfServices('1234', 'enabled', 'This is an example text', callback);
```
The termsOfServicesStatus can be set to 'enabled' or 'disabled'. You can also specify the conditions of the
terms of service in the termsOfServicesText parameter. 

Create a Terms of Service
-------------------------

To create a terms of service call the [`termsOfService.createTermsOfServices(termsOfServicesType, termsOfServicesStatus, termsOfServicesText, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#create-a-terms-of-service)
method.

```js
client.termsOfService.creteTermsOfServices('managed', 'enabled', 'This is a new terms of service', callback);
```

```js
client.termsOfService.creteTermsOfServices('external', 'disabled', 'This is a new terms of service but disabled', callback);
```

It is important to note that only two terms of service can exist per enterprise. One managed terms of service and one external terms of service. If you wish to make another terms of service please use the PUT endpoint to update your current terms of service. 

Get User Status on Terms of Service
-----------------------------------

To get user status on a terms of service call the [`termsOfService.getTermsOfServiceUserStatuses(termsOfStatusID, options, callback)`](http://opensource.box.com/box-node-sdk/TermsOfServiceUserStatuses.html#get-user-status-on-terms-of-service)
method.

```js
client.termsOfService.getTermsOfServiceUserStatuses('1234', callback);
```
Alternatively, you can specify the user ID if you know for which user you want to retrieve their 
terms of service status on.

```js
client.termsOfService.getTermsOfServiceUserStatuses('1234',
	{
		user_id: '5678'
	},
	callback);
```

Update User Status on Terms of Service 
--------------------------------------

To update user status on a terms of service call the [`termsOfService.updateTermsOfServiceUserStatuses(termsOfServiceUserStatusesID, isAccepted, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#update-user-status-on-a-terms-of-service)
method.

```js
client.termsOfService.updateTermsOfServiceUserStatuses('5678', true, callback);
```

Create User Status on Terms of Service 
--------------------------------------

To create user status on a terms of service call the [`termsOfService.createTermsOfServiceUserStatuses(termsOfServices, isAccepted, termsOfServiceUser, callback)`](http://opensource.box.com/box-node-sdk/TermsOfService.html#create-user-status-on-a-terms-of-service)
method.

```js
client.termsOfService.createTermsOfServiceUserStatuses(termsOfServicesObject, true, userObject, callback);
```
