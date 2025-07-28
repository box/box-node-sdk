# Handling null values in Box Typescript SDK Gen

While using Box Typescript SDK it's important to understand how null values behave. This document provides a general overview of null value behaviour in Box Typescript SDK to help developers manage data consistently and predictably.

## Understanding null behaviour

The Box Typescript SDK follows a consistent pattern when handling null values in update operations. This behaviour applies to most endpoints that modify resources such as users, files, folders and metadata. The updating field behaves differently depending on weather you omit it, set it to null, or provide a value:

- Omitting the field: The field won't be included in request and the value will remain unchanged
- Setting it to null: Setting a field to null, will cause sending HTTP request with field value set to null, what will result in removing its current value or disassociates it from the resource.
- Providing a value: Providing a non-null value assigns or updates the field to that value.

## Example Usage

The client.files.updateFileById() method demonstrates null handling when modifying the lock field while updating the file:

```ts
async function create_update_file(client) {
  fileId = '12345';

  // locking the file
  const fileWithLock = await client.files.updateFileById(fileId, {
    requestBody: { lock: { access: 'lock' } },
    queryParams: { fields: ['lock'] },
  });
  console.log('File with lock ', fileWithLock);

  // unlocking the file using lock value as null
  const fileWithoutLock = await client.files.updateFileById(fileId, {
    requestBody: { lock: null },
    queryParams: { fields: ['lock'] },
  });
  console.log('File without lock ', fileWithoutLock);
}
```

## Summary

To summarize, if you omit the field, the field remains unchanged. If you set it to null, it clears/removes the value. If you provide a value to that field, the field gets updated to that specified value.
