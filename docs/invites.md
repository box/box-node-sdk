# InvitesManager

- [Create user invite](#create-user-invite)
- [Get user invite status](#get-user-invite-status)

## Create user invite

Invites an existing external user to join an enterprise.

The existing user can not be part of another enterprise and
must already have a Box account. Once invited, the user will receive an
email and are prompted to accept the invitation within the
Box web application.

This method requires the "Manage An Enterprise" scope enabled for
the application, which can be enabled within the developer console.

This operation is performed by calling function `createInvite`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-invites/).

<!-- sample post_invites -->

```ts
await client.invites.createInvite({
  enterprise: {
    id: currentUser.enterprise!.id!,
  } satisfies CreateInviteRequestBodyEnterpriseField,
  actionableBy: {
    login: email,
  } satisfies CreateInviteRequestBodyActionableByField,
} satisfies CreateInviteRequestBody);
```

### Arguments

- requestBody `CreateInviteRequestBody`
  - Request body of createInvite method
- optionalsInput `CreateInviteOptionalsInput`

### Returns

This function returns a value of type `Invite`.

Returns a new invite object.

## Get user invite status

Returns the status of a user invite.

This operation is performed by calling function `getInviteById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-invites-id/).

<!-- sample get_invites_id -->

```ts
await client.invites.getInviteById(invitation.id);
```

### Arguments

- inviteId `string`
  - The ID of an invite. Example: "213723"
- optionalsInput `GetInviteByIdOptionalsInput`

### Returns

This function returns a value of type `Invite`.

Returns an invite object.
