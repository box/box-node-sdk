import * as BoxSDK from 'sdk';
import { BoxClient, BoxDeveloperTokenAuth } from 'sdk';
import { FileFull } from 'sdk/lib/schemas/index';
import { File } from 'sdk/lib/schemas/file';
import { Folder } from 'sdk/schemas';
import { FileMini } from 'sdk/schemas/fileMini';

// Assert that all imports are not undefined
if (BoxSDK === undefined) throw new Error('BoxSDK is undefined');
if (BoxClient === undefined) throw new Error('BoxClient is undefined');
if (FileFull === undefined) throw new Error('FileFull is undefined');
if (File === undefined) throw new Error('File is undefined');
if (Folder === undefined) throw new Error('Folder is undefined');
if (FileMini === undefined) throw new Error('FileMini is undefined');

const client = new BoxClient({
  auth: new BoxDeveloperTokenAuth({ token: 'YOUR_DEVELOPER_TOKEN' }),
});
