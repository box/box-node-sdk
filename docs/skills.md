# SkillsManager

- [List Box Skill cards on file](#list-box-skill-cards-on-file)
- [Create Box Skill cards on file](#create-box-skill-cards-on-file)
- [Update Box Skill cards on file](#update-box-skill-cards-on-file)
- [Remove Box Skill cards from file](#remove-box-skill-cards-from-file)
- [Update all Box Skill cards on file](#update-all-box-skill-cards-on-file)

## List Box Skill cards on file

List the Box Skills metadata cards that are attached to a file.

This operation is performed by calling function `getBoxSkillCardsOnFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-files-id-metadata-global-boxSkillsCards/).

<!-- sample get_files_id_metadata_global_boxSkillsCards -->

```ts
await client.skills.getBoxSkillCardsOnFile(file.id);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- optionalsInput `GetBoxSkillCardsOnFileOptionalsInput`

### Returns

This function returns a value of type `SkillCardsMetadata`.

Returns all the metadata associated with a file.

This API does not support pagination and will therefore always return
all of the metadata associated to the file.

## Create Box Skill cards on file

Applies one or more Box Skills metadata cards to a file.

This operation is performed by calling function `createBoxSkillCardsOnFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-files-id-metadata-global-boxSkillsCards/).

<!-- sample post_files_id_metadata_global_boxSkillsCards -->

```ts
await client.skills.createBoxSkillCardsOnFile(file.id, {
  cards: cardsToCreate,
} satisfies CreateBoxSkillCardsOnFileRequestBody);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `CreateBoxSkillCardsOnFileRequestBody`
  - Request body of createBoxSkillCardsOnFile method
- optionalsInput `CreateBoxSkillCardsOnFileOptionalsInput`

### Returns

This function returns a value of type `SkillCardsMetadata`.

Returns the instance of the template that was applied to the file,
including the data that was applied to the template.

## Update Box Skill cards on file

Updates one or more Box Skills metadata cards to a file.

This operation is performed by calling function `updateBoxSkillCardsOnFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-files-id-metadata-global-boxSkillsCards/).

<!-- sample put_files_id_metadata_global_boxSkillsCards -->

```ts
await client.skills.updateBoxSkillCardsOnFile(file.id, [
  {
    op: 'replace' as UpdateBoxSkillCardsOnFileRequestBodyOpField,
    path: '/cards/0',
    value: cardToUpdate,
  } satisfies UpdateBoxSkillCardsOnFileRequestBody,
]);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `readonly UpdateBoxSkillCardsOnFileRequestBody[]`
  - Request body of updateBoxSkillCardsOnFile method
- optionalsInput `UpdateBoxSkillCardsOnFileOptionalsInput`

### Returns

This function returns a value of type `SkillCardsMetadata`.

Returns the updated metadata template, with the
custom template data included.

## Remove Box Skill cards from file

Removes any Box Skills cards metadata from a file.

This operation is performed by calling function `deleteBoxSkillCardsFromFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-files-id-metadata-global-boxSkillsCards/).

<!-- sample delete_files_id_metadata_global_boxSkillsCards -->

```ts
await client.skills.deleteBoxSkillCardsFromFile(file.id);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- optionalsInput `DeleteBoxSkillCardsFromFileOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the cards are
successfully deleted.

## Update all Box Skill cards on file

An alternative method that can be used to overwrite and update all Box Skill
metadata cards on a file.

This operation is performed by calling function `updateAllSkillCardsOnFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-skill-invocations-id/).

_Currently we don't have an example for calling `updateAllSkillCardsOnFile` in integration tests_

### Arguments

- skillId `string`
  - The ID of the skill to apply this metadata for. Example: "33243242"
- requestBody `UpdateAllSkillCardsOnFileRequestBody`
  - Request body of updateAllSkillCardsOnFile method
- optionalsInput `UpdateAllSkillCardsOnFileOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the card has been successfully updated.
