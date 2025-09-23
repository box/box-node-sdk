# ClassificationsManager

- [List all classifications](#list-all-classifications)
- [Add classification](#add-classification)
- [Update classification](#update-classification)
- [Add initial classifications](#add-initial-classifications)

## List all classifications

Retrieves the classification metadata template and lists all the
classifications available to this enterprise.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.

This operation is performed by calling function `getClassificationTemplate`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-templates-enterprise-securityClassification-6VMVochwUWo-schema/).

<!-- sample get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema -->

```ts
await client.classifications.getClassificationTemplate();
```

### Arguments

- headersInput `GetClassificationTemplateHeadersInput`
  - Headers of getClassificationTemplate method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `ClassificationTemplate`.

Returns the `securityClassification` metadata template, which contains
a `Box__Security__Classification__Key` field that lists all the
classifications available to this enterprise.

## Add classification

Adds one or more new classifications to the list of classifications
available to the enterprise.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.

This operation is performed by calling function `addClassification`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-metadata-templates-enterprise-securityClassification-6VMVochwUWo-schema--add/).

<!-- sample put_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema#add -->

```ts
await client.classifications.addClassification([
  new AddClassificationRequestBody({
    data: {
      key: getUuid(),
      staticConfig: {
        classification: {
          colorId: 4,
          classificationDefinition: 'Other description',
        } satisfies AddClassificationRequestBodyDataStaticConfigClassificationField,
      } satisfies AddClassificationRequestBodyDataStaticConfigField,
    } satisfies AddClassificationRequestBodyDataField,
  }),
]);
```

### Arguments

- requestBody `readonly AddClassificationRequestBody[]`
  - Request body of addClassification method
- optionalsInput `AddClassificationOptionalsInput`

### Returns

This function returns a value of type `ClassificationTemplate`.

Returns the updated `securityClassification` metadata template, which
contains a `Box__Security__Classification__Key` field that lists all
the classifications available to this enterprise.

## Update classification

Updates the labels and descriptions of one or more classifications
available to the enterprise.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.

This operation is performed by calling function `updateClassification`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-metadata-templates-enterprise-securityClassification-6VMVochwUWo-schema--update/).

<!-- sample put_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema#update -->

```ts
await client.classifications.updateClassification([
  new UpdateClassificationRequestBody({
    enumOptionKey: classification.key,
    data: {
      key: updatedClassificationName,
      staticConfig: {
        classification: {
          colorId: 2,
          classificationDefinition: updatedClassificationDescription,
        } satisfies UpdateClassificationRequestBodyDataStaticConfigClassificationField,
      } satisfies UpdateClassificationRequestBodyDataStaticConfigField,
    } satisfies UpdateClassificationRequestBodyDataField,
  }),
]);
```

### Arguments

- requestBody `readonly UpdateClassificationRequestBody[]`
  - Request body of updateClassification method
- optionalsInput `UpdateClassificationOptionalsInput`

### Returns

This function returns a value of type `ClassificationTemplate`.

Returns the updated `securityClassification` metadata template, which
contains a `Box__Security__Classification__Key` field that lists all
the classifications available to this enterprise.

## Add initial classifications

When an enterprise does not yet have any classifications, this API call
initializes the classification template with an initial set of
classifications.

If an enterprise already has a classification, the template will already
exist and instead an API call should be made to add additional
classifications.

This operation is performed by calling function `createClassificationTemplate`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-templates-schema--classifications/).

_Currently we don't have an example for calling `createClassificationTemplate` in integration tests_

### Arguments

- requestBodyInput `CreateClassificationTemplateRequestBodyInput`
  - Request body of createClassificationTemplate method
- optionalsInput `CreateClassificationTemplateOptionalsInput`

### Returns

This function returns a value of type `ClassificationTemplate`.

Returns a new `securityClassification` metadata template, which
contains a `Box__Security__Classification__Key` field that lists all
the classifications available to this enterprise.
