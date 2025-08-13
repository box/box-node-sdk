# ExternalUsersManager

- [Submit job to delete external users](#submit-job-to-delete-external-users)

## Submit job to delete external users

Delete external users from current user enterprise. This will remove each
external user from all invited collaborations within the current enterprise.

This operation is performed by calling function `createExternalUserSubmitDeleteJobV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-external-users-submit-delete-job/).

_Currently we don't have an example for calling `createExternalUserSubmitDeleteJobV2025R0` in integration tests_

### Arguments

- requestBody `ExternalUsersSubmitDeleteJobRequestV2025R0`
  - Request body of createExternalUserSubmitDeleteJobV2025R0 method
- optionalsInput `CreateExternalUserSubmitDeleteJobV2025R0OptionalsInput`

### Returns

This function returns a value of type `ExternalUsersSubmitDeleteJobResponseV2025R0`.
