Device Pins
===========

* [Get Device Pin](#get-device-pin)
* [Delete Device Pin](#delete-device-pin)

Get Device Pin
--------------

To get information about a specific device pin, call the
[`devicePins.get(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/DevicePins.html#get)
method with the ID of the device pin.

```js
client.devicePins.get('28345', null, callback);
```

Delete Device Pin
-----------------

To remove a specific device pin, call the
[`devicePins.delete(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/DevicePins.html#delete)
method with the ID of the device pin.

```js
client.devicePins.delete('28345', null, callback);
```
