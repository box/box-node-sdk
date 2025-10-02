# ExternalUsersManager

- [Submit job to delete external users](#submit-job-to-delete-external-users)

## Submit job to delete external users

Delete external users from current user enterprise. This will remove each
external user from all invited collaborations within the current enterprise.

This operation is performed by calling function `submitJobToDeleteExternalUsersV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-external-users-submit-delete-job/).

<!-- sample post_external_users_submit_delete_job_v2025.0 -->

```ts
await client.externalUsers.submitJobToDeleteExternalUsersV2025R0({
  externalUsers: [
    new UserReferenceV2025R0({ id: getEnvVar('BOX_EXTERNAL_USER_ID') }),
  ],
} satisfies ExternalUsersSubmitDeleteJobRequestV2025R0);
```

### Arguments

- requestBody `ExternalUsersSubmitDeleteJobRequestV2025R0`
  - Request body of submitJobToDeleteExternalUsersV2025R0 method
- optionalsInput `SubmitJobToDeleteExternalUsersV2025R0OptionalsInput`

### Returns

This function returns a value of type `ExternalUsersSubmitDeleteJobResponseV2025R0`.
