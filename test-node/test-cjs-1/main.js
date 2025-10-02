const BoxSDK = require('sdk');
const { BoxClient, BoxDeveloperTokenAuth } = require('sdk');
const { FileFull } = require('sdk/schemas');
const { File } = require('sdk/schemas/file');
const { FileMini } = require('sdk/lib/schemas/fileMini');

// Assert that all imports are not undefined
if (BoxSDK === undefined) throw new Error('BoxSDK is undefined');
if (BoxClient === undefined) throw new Error('BoxClient is undefined');
if (FileFull === undefined) throw new Error('FileFull is undefined');
if (File === undefined) throw new Error('File is undefined');
if (FileMini === undefined) throw new Error('FileMini is undefined');

const client = new BoxClient({
  auth: new BoxDeveloperTokenAuth({ token: 'YOUR_DEVELOPER_TOKEN' }),
});
