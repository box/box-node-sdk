// Initialize SDK
var BoxSDK = require('box-node-sdk');

var sdk = new BoxSDK({
  clientID: 'sfcmp6w2dtj590p2lhfww035e8c6aiud',
  clientSecret: '484iKlfErIVcZNSMe1t5OVrfw6IbzQNs'
});

// Create a basic API client
var client = sdk.getBasicClient('USER_ACCESS_TOKEN');

// Get some of that sweet, sweet data!
client.users.get(client.CURRENT_USER_ID, null, function(err, currentUser) {
  if(err) throw err;
  console.log('Hello, ' + currentUser.name + '!');
});

// The SDK also supports Promises
client.users.get(client.CURRENT_USER_ID)
	.then(user => console.log('Hello', user.name, '!'))git 
	.catch(err => console.log('Got an error!', err));