import * as BoxSDK from 'sdk';
import { BoxClient, BoxDeveloperTokenAuth } from 'sdk';
import { FileFull } from 'sdk/lib/schemas/index';
import { File } from 'sdk/lib/schemas/file';

// Assert that all imports are not undefined
if (BoxSDK.BoxClient === undefined) throw new Error('BoxSDK is undefined');
if (BoxClient === undefined) throw new Error('BoxClient is undefined');
if (BoxDeveloperTokenAuth === undefined)
  throw new Error('BoxDeveloperTokenAuth is undefined');
if (FileFull === undefined) throw new Error('FileFull is undefined');
if (File === undefined) throw new Error('File is undefined');
