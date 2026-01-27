import * as BoxSDK from 'sdk';
import { BoxClient, BoxDeveloperTokenAuth } from 'sdk';
import { FileFull } from 'sdk/schemas';
import { File } from 'sdk/schemas/file';

// Assert that all imports are not undefined
if (BoxSDK === undefined) throw new Error('BoxSDK is undefined');
if (BoxClient === undefined) throw new Error('BoxClient is undefined');
if (FileFull === undefined) throw new Error('FileFull is undefined');
if (File === undefined) throw new Error('File is undefined');

const client = new BoxClient({
  auth: new BoxDeveloperTokenAuth({ token: 'YOUR_DEVELOPER_TOKEN' }),
});
