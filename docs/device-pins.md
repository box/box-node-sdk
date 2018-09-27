Device Pins
===========

Device pins allow enterprises to control what devices can use native Box applications. To learn more about device
pinning, please see the
[Device Pinning documentation](https://community.box.com/t5/For-Admins/Device-Pinning-Overview-And-FAQs/ta-p/172).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get Device Pin](#get-device-pin)
- [Delete Device Pin](#delete-device-pin)
- [Get All Device Pins](#get-all-device-pins)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get Device Pin
--------------

To get information about a specific device pin, call the
[`devicePins.get(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#get)
method with the ID of the device pin.

```js
client.devicePins.get('11111')
    .then(pin => {
        /* pin -> {
            type: 'device_pinner',
            id: '11111',
            owned_by: 
            {
                type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com'
            },
            product_name: 'iPad'
        }
        */
    });
```

Delete Device Pin
-----------------

To remove a specific device pin, call the
[`devicePins.delete(pinID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#delete)
method with the ID of the device pin.

```js
client.devicePins.delete('28345')
    .then(() => {
        // deletion succeeded — no value returned
    });
```

Get All Device Pins
-------------------

Get all device pins records for the current enterprise by calling the
[`devicePins.getAll(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/DevicePins.html#getAll)
method.

```js
client.devicePins.getAll()
    .then(pins => {
        /* pins -> {
            entries: 
            [ { type: 'device_pinner',
                id: '11111',
                owned_by: 
                    { type: 'user',
                    id: '22222',
                    name: 'Example User',
                    login: 'user@example.com' },
                product_name: 'iPad' },
                { type: 'device_pinner',
                id: '11112',
                owned_by: 
                    { type: 'user',
                    id: '22222',
                    name: 'Example User',
                    login: 'user@example.com' },
                product_name: 'iPhone' } ],
            limit: 100,
            order: [ { by: 'id', direction: 'ASC' } ] }
        */
    });
```
