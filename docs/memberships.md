# MembershipsManager

- [List user's groups](#list-users-groups)
- [List members of group](#list-members-of-group)
- [Add user to group](#add-user-to-group)
- [Get group membership](#get-group-membership)
- [Update group membership](#update-group-membership)
- [Remove user from group](#remove-user-from-group)

## List user's groups

Retrieves all the groups for a user. Only members of this
group or users with admin-level permissions will be able to
use this API.

This operation is performed by calling function `getUserMemberships`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-users-id-memberships/).

<!-- sample get_users_id_memberships -->

```ts
await client.memberships.getUserMemberships(user.id);
```

### Arguments

- userId `string`
  - The ID of the user. Example: "12345"
- optionalsInput `GetUserMembershipsOptionalsInput`

### Returns

This function returns a value of type `GroupMemberships`.

Returns a collection of membership objects. If there are no
memberships, an empty collection will be returned.

## List members of group

Retrieves all the members for a group. Only members of this
group or users with admin-level permissions will be able to
use this API.

This operation is performed by calling function `getGroupMemberships`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-groups-id-memberships/).

<!-- sample get_groups_id_memberships -->

```ts
await client.memberships.getGroupMemberships(group.id);
```

### Arguments

- groupId `string`
  - The ID of the group. Example: "57645"
- optionalsInput `GetGroupMembershipsOptionalsInput`

### Returns

This function returns a value of type `GroupMemberships`.

Returns a collection of membership objects. If there are no
memberships, an empty collection will be returned.

## Add user to group

Creates a group membership. Only users with
admin-level permissions will be able to use this API.

This operation is performed by calling function `createGroupMembership`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-group-memberships/).

<!-- sample post_group_memberships -->

```ts
await client.memberships.createGroupMembership({
  user: { id: user.id } satisfies CreateGroupMembershipRequestBodyUserField,
  group: { id: group.id } satisfies CreateGroupMembershipRequestBodyGroupField,
} satisfies CreateGroupMembershipRequestBody);
```

### Arguments

- requestBody `CreateGroupMembershipRequestBody`
  - Request body of createGroupMembership method
- optionalsInput `CreateGroupMembershipOptionalsInput`

### Returns

This function returns a value of type `GroupMembership`.

Returns a new group membership object.

## Get group membership

Retrieves a specific group membership. Only admins of this
group or users with admin-level permissions will be able to
use this API.

This operation is performed by calling function `getGroupMembershipById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-group-memberships-id/).

<!-- sample get_group_memberships_id -->

```ts
await client.memberships.getGroupMembershipById(groupMembership.id!);
```

### Arguments

- groupMembershipId `string`
  - The ID of the group membership. Example: "434534"
- optionalsInput `GetGroupMembershipByIdOptionalsInput`

### Returns

This function returns a value of type `GroupMembership`.

Returns the group membership object.

## Update group membership

Updates a user's group membership. Only admins of this
group or users with admin-level permissions will be able to
use this API.

This operation is performed by calling function `updateGroupMembershipById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-group-memberships-id/).

<!-- sample put_group_memberships_id -->

```ts
await client.memberships.updateGroupMembershipById(groupMembership.id!, {
  requestBody: {
    role: 'admin' as UpdateGroupMembershipByIdRequestBodyRoleField,
  } satisfies UpdateGroupMembershipByIdRequestBody,
} satisfies UpdateGroupMembershipByIdOptionalsInput);
```

### Arguments

- groupMembershipId `string`
  - The ID of the group membership. Example: "434534"
- optionalsInput `UpdateGroupMembershipByIdOptionalsInput`

### Returns

This function returns a value of type `GroupMembership`.

Returns a new group membership object.

## Remove user from group

Deletes a specific group membership. Only admins of this
group or users with admin-level permissions will be able to
use this API.

This operation is performed by calling function `deleteGroupMembershipById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-group-memberships-id/).

<!-- sample delete_group_memberships_id -->

```ts
await client.memberships.deleteGroupMembershipById(groupMembership.id!);
```

### Arguments

- groupMembershipId `string`
  - The ID of the group membership. Example: "434534"
- optionalsInput `DeleteGroupMembershipByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

A blank response is returned if the membership was
successfully deleted.
