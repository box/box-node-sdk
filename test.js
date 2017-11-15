var boxNodeSDK = require('./lib/box-node-sdk');
var sdk = new boxNodeSDK({clientID: 'test', clientSecret: 'test'});
var client = sdk.getBasicClient('96iMu1NoxWHDd87xvl3xlQbQRsVslugI');

client.files.getRepresentationInfo();