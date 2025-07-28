# AuthorizationManager

- [Authorize user](#authorize-user)
- [Request access token](#request-access-token)
- [Refresh access token](#refresh-access-token)
- [Revoke access token](#revoke-access-token)

## Authorize user

Authorize a user by sending them through the [Box](https://box.com)
website and request their permission to act on their behalf.

This is the first step when authenticating a user using
OAuth 2.0. To request a user's authorization to use the Box APIs
on their behalf you will need to send a user to the URL with this
format.

This operation is performed by calling function `authorizeUser`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-authorize/).

_Currently we don't have an example for calling `authorizeUser` in integration tests_

### Arguments

- queryParams `AuthorizeUserQueryParams`
  - Query parameters of authorizeUser method
- optionalsInput `AuthorizeUserOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Does not return any data, but rather should be used in the browser.

## Request access token

Request an Access Token using either a client-side obtained OAuth 2.0
authorization code or a server-side JWT assertion.

An Access Token is a string that enables Box to verify that a
request belongs to an authorized session. In the normal order of
operations you will begin by requesting authentication from the
[authorize](#get-authorize) endpoint and Box will send you an
authorization code.

You will then send this code to this endpoint to exchange it for
an Access Token. The returned Access Token can then be used to to make
Box API calls.

This operation is performed by calling function `requestAccessToken`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-oauth2-token/).

_Currently we don't have an example for calling `requestAccessToken` in integration tests_

### Arguments

- requestBody `PostOAuth2Token`
  - Request body of requestAccessToken method
- optionalsInput `RequestAccessTokenOptionalsInput`

### Returns

This function returns a value of type `AccessToken`.

Returns a new Access Token that can be used to make authenticated
API calls by passing along the token in a authorization header as
follows `Authorization: Bearer <Token>`.

## Refresh access token

Refresh an Access Token using its client ID, secret, and refresh token.

This operation is performed by calling function `refreshAccessToken`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-oauth2-token--refresh/).

_Currently we don't have an example for calling `refreshAccessToken` in integration tests_

### Arguments

- requestBodyInput `PostOAuth2TokenRefreshAccessTokenInput`
  - Request body of refreshAccessToken method
- optionalsInput `RefreshAccessTokenOptionalsInput`

### Returns

This function returns a value of type `AccessToken`.

Returns a new Access Token that can be used to make authenticated
API calls by passing along the token in a authorization header as
follows `Authorization: Bearer <Token>`.

## Revoke access token

Revoke an active Access Token, effectively logging a user out
that has been previously authenticated.

This operation is performed by calling function `revokeAccessToken`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-oauth2-revoke/).

_Currently we don't have an example for calling `revokeAccessToken` in integration tests_

### Arguments

- requestBody `PostOAuth2Revoke`
  - Request body of revokeAccessToken method
- optionalsInput `RevokeAccessTokenOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the token was successfully revoked.
