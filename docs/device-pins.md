Device Pins
===========

* [Get Device Pin](#get-device-pin)
* [Delete Device Pin](#delete-device-pin)
* [Get All Device Pins](#get-all-device-pins)

Get Device Pin
--------------

To get information about a specific device pin, call the
[`devicePins.get(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#get)
method with the ID of the device pin.

```js
client.devicePins.get('28345', null, callback);
```

Delete Device Pin
-----------------

To remove a specific device pin, call the
[`devicePins.delete(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#delete)
method with the ID of the device pin.

```js
client.devicePins.delete('28345', null, callback);
```

Get All Device Pins
-------------------

Get all device pins records for the current enterprise by calling the
[`devicePins.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#getAll)
method.

```js
client.devicePins.getAll({limit: 500}, callback);
```
