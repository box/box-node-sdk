# UsersManager

- [List enterprise users](#list-enterprise-users)
- [Create user](#create-user)
- [Get current user](#get-current-user)
- [Get user](#get-user)
- [Update user](#update-user)
- [Delete user](#delete-user)

## List enterprise users

Returns a list of all users for the Enterprise along with their `user_id`,
`public_name`, and `login`.

The application and the authenticated user need to
have the permission to look up users in the entire
enterprise.

This operation is performed by calling function `getUsers`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-users/).

<!-- sample get_users -->

```ts
await client.users.getUsers();
```

### Arguments

- queryParams `GetUsersQueryParams`
  - Query parameters of getUsers method
- headersInput `GetUsersHeadersInput`
  - Headers of getUsers method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `Users`.

Returns all of the users in the enterprise.

## Create user

Creates a new managed user in an enterprise. This endpoint
is only available to users and applications with the right
admin permissions.

This operation is performed by calling function `createUser`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-users/).

<!-- sample post_users -->

```ts
await client.users.createUser({
  name: userName,
  login: userLogin,
  isPlatformAccessOnly: true,
} satisfies CreateUserRequestBody);
```

### Arguments

- requestBody `CreateUserRequestBody`
  - Request body of createUser method
- optionalsInput `CreateUserOptionalsInput`

### Returns

This function returns a value of type `UserFull`.

Returns a user object for the newly created user.

## Get current user

Retrieves information about the user who is currently authenticated.

In the case of a client-side authenticated OAuth 2.0 application
this will be the user who authorized the app.

In the case of a JWT, server-side authenticated application
this will be the service account that belongs to the application
by default.

Use the `As-User` header to change who this API call is made on behalf of.

This operation is performed by calling function `getUserMe`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-users-me/).

<!-- sample get_users_me -->

```ts
await client.users.getUserMe();
```

### Arguments

- queryParams `GetUserMeQueryParams`
  - Query parameters of getUserMe method
- headersInput `GetUserMeHeadersInput`
  - Headers of getUserMe method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `UserFull`.

Returns a single user object.

## Get user

Retrieves information about a user in the enterprise.

The application and the authenticated user need to
have the permission to look up users in the entire
enterprise.

This endpoint also returns a limited set of information
for external users who are collaborated on content
owned by the enterprise for authenticated users with the
right scopes. In this case, disallowed fields will return
null instead.

This operation is performed by calling function `getUserById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-users-id/).

<!-- sample get_users_id -->

```ts
await client.users.getUserById(user.id);
```

### Arguments

- userId `string`
  - The ID of the user. Example: "12345"
- optionalsInput `GetUserByIdOptionalsInput`

### Returns

This function returns a value of type `UserFull`.

Returns a single user object.

Not all available fields are returned by default. Use the
[fields](#param-fields) query parameter to explicitly request
any specific fields using the [fields](#get-users-id--request--fields)
parameter.

## Update user

Updates a managed or app user in an enterprise. This endpoint
is only available to users and applications with the right
admin permissions.

This operation is performed by calling function `updateUserById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-users-id/).

<!-- sample put_users_id -->

```ts
await client.users.updateUserById(user.id, {
  requestBody: { name: updatedUserName } satisfies UpdateUserByIdRequestBody,
} satisfies UpdateUserByIdOptionalsInput);
```

### Arguments

- userId `string`
  - The ID of the user. Example: "12345"
- optionalsInput `UpdateUserByIdOptionalsInput`

### Returns

This function returns a value of type `UserFull`.

Returns the updated user object.

## Delete user

Deletes a user. By default this will fail if the user
still owns any content. Move their owned content first
before proceeding, or use the `force` field to delete
the user and their files.

This operation is performed by calling function `deleteUserById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-users-id/).

<!-- sample delete_users_id -->

```ts
await client.users.deleteUserById(user.id);
```

### Arguments

- userId `string`
  - The ID of the user. Example: "12345"
- optionalsInput `DeleteUserByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Removes the user and returns an empty response.
