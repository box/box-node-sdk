# EnterpriseConfigurationsManager

- [Get enterprise configuration](#get-enterprise-configuration)

## Get enterprise configuration

Retrieves the configuration for an enterprise.

This operation is performed by calling function `getEnterpriseConfigurationByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-enterprise-configurations-id/).

<!-- sample get_enterprise_configurations_id_v2025.0 -->

```ts
await adminClient.enterpriseConfigurations.getEnterpriseConfigurationByIdV2025R0(
  enterpriseId,
  {
    categories: ['user_settings', 'content_and_sharing', 'security', 'shield'],
  } satisfies GetEnterpriseConfigurationByIdV2025R0QueryParams,
);
```

### Arguments

- enterpriseId `string`
  - The ID of the enterprise. Example: "3442311"
- queryParams `GetEnterpriseConfigurationByIdV2025R0QueryParams`
  - Query parameters of getEnterpriseConfigurationByIdV2025R0 method
- optionalsInput `GetEnterpriseConfigurationByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `EnterpriseConfigurationV2025R0`.

Returns the enterprise configuration.
