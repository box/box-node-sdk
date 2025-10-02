# DevicePinnersManager

- [Get device pin](#get-device-pin)
- [Remove device pin](#remove-device-pin)
- [List enterprise device pins](#list-enterprise-device-pins)

## Get device pin

Retrieves information about an individual device pin.

This operation is performed by calling function `getDevicePinnerById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-device-pinners-id/).

<!-- sample get_device_pinners_id -->

```ts
await client.devicePinners.getDevicePinnerById(devicePinnerId);
```

### Arguments

- devicePinnerId `string`
  - The ID of the device pin. Example: "2324234"
- optionalsInput `GetDevicePinnerByIdOptionalsInput`

### Returns

This function returns a value of type `DevicePinner`.

Returns information about a single device pin.

## Remove device pin

Deletes an individual device pin.

This operation is performed by calling function `deleteDevicePinnerById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-device-pinners-id/).

<!-- sample delete_device_pinners_id -->

```ts
await client.devicePinners.deleteDevicePinnerById(devicePinnerId);
```

### Arguments

- devicePinnerId `string`
  - The ID of the device pin. Example: "2324234"
- optionalsInput `DeleteDevicePinnerByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the pin has been deleted.

## List enterprise device pins

Retrieves all the device pins within an enterprise.

The user must have admin privileges, and the application
needs the "manage enterprise" scope to make this call.

This operation is performed by calling function `getEnterpriseDevicePinners`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-enterprises-id-device-pinners/).

<!-- sample get_enterprises_id_device_pinners -->

```ts
await client.devicePinners.getEnterpriseDevicePinners(enterpriseId);
```

### Arguments

- enterpriseId `string`
  - The ID of the enterprise. Example: "3442311"
- optionalsInput `GetEnterpriseDevicePinnersOptionalsInput`

### Returns

This function returns a value of type `DevicePinners`.

Returns a list of device pins for a given enterprise.
