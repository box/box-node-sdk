var BoxSDK = require('./lib/box-node-sdk');

// Initialize the SDK with your app credentials


var jsonConfig = require('/Users/mcong/Downloads/960977394_vwtjfilo_config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var client = sdk.getAppAuthClient('user','21941210994');

// Get your own user object from the Box API
// All client methods return a promise that resolves to the results of the API call,
// or rejects when an error occurs
// client.users.get(client.CURRENT_USER_ID)
// 	.then(user => console.log('Hello', user.name, '!'))
// 	.catch(err => console.log('Got an error!', err));

client.folders.getItems('182108528219', {limit: 1000})
    .then(items => console.log('Got items!', items))

async function main() {
    var retention_policy = await client.retentionPolicies.create('main test4', 'finite', 'permanently_delete', {
        retention_length: 1,
        retention_type: 'modifiable',
    });
    var folder = await client.folders.create('0', 'test folder4');
    var retention_policy_assignment = await client.retentionPolicies.assign(retention_policy.id, 'folder', folder.id);
    var files = await client.files.uploadFile(folder.id, 'test.txt', 'test');
    var file = files.entries[0];
    await client.files.get(file.id, {fields: 'disposition_at'})
        .then(file => console.log('Got file!', file))
    await client.files.update(file.id, {disposition_at: '2023-11-18T10:12:02Z', fields: 'disposition_at'})
        .then(file => console.log('Got file!', file))
        .catch(err => console.log('Got an error!', err))
}

main();