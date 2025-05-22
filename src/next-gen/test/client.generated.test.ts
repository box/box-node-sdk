import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeBaseUrls } from '../networking/baseUrls.generated.js';
import { deserializeBaseUrls } from '../networking/baseUrls.generated.js';
import { FetchOptionsInput } from '../networking/fetchOptions.generated.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.generated.js';
import { BoxClient } from '../client.generated.js';
import { SerializedData } from '../serialization/json.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { ByteStream } from '../internal/utils.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.generated.js';
import { Buffer } from '../internal/utils.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { bufferEquals } from '../internal/utils.js';
import { generateByteBuffer } from '../internal/utils.js';
import { generateByteStreamFromBuffer } from '../internal/utils.js';
import { readByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { MultipartItem } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { BaseUrls } from '../networking/baseUrls.generated.js';
import { jsonToSerializedData } from '../serialization/json.js';
import { getSdValueByKey } from '../serialization/json.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { Interceptor } from '../networking/interceptors.generated.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
export class InterceptorAddingRoleToFields implements Interceptor {
  constructor(
    fields: Omit<
      InterceptorAddingRoleToFields,
      'beforeRequest' | 'afterRequest'
    >,
  ) {}
  /**
   * @param {FetchOptions} options
   * @returns {FetchOptions}
   */
  beforeRequest(options: FetchOptions): FetchOptions {
    return new FetchOptions({
      url: options.url,
      method: options.method,
      headers: options.headers,
      params: { ...options.params, ...{ ['fields']: 'role' } },
      data: options.data,
      fileStream: options.fileStream,
      multipartData: options.multipartData,
      contentType: options.contentType,
      responseFormat: options.responseFormat,
      auth: options.auth,
      networkSession: options.networkSession,
      cancellationToken: options.cancellationToken,
    });
  }
  /**
   * @param {FetchResponse} response
   * @returns {FetchResponse}
   */
  afterRequest(response: FetchResponse): FetchResponse {
    return response;
  }
}
export class InterceptorThrowingError implements Interceptor {
  constructor(
    fields: Omit<InterceptorThrowingError, 'beforeRequest' | 'afterRequest'>,
  ) {}
  /**
   * @param {FetchOptions} options
   * @returns {FetchOptions}
   */
  beforeRequest(options: FetchOptions): FetchOptions {
    return options;
  }
  /**
   * @param {FetchResponse} response
   * @returns {FetchResponse}
   */
  afterRequest(response: FetchResponse): FetchResponse {
    return {
      url: response.url,
      status: 400,
      data: response.data,
      content: response.content,
      headers: response.headers,
    } satisfies FetchResponse;
  }
}
export class InterceptorChangingResponse implements Interceptor {
  constructor(
    fields: Omit<InterceptorChangingResponse, 'beforeRequest' | 'afterRequest'>,
  ) {}
  /**
   * @param {FetchOptionsInput} optionsInput
   * @returns {FetchOptions}
   */
  beforeRequest(optionsInput: FetchOptionsInput): FetchOptions {
    const options: FetchOptions = new FetchOptions({
      url: optionsInput.url,
      method: optionsInput.method,
      params: optionsInput.params,
      headers: optionsInput.headers,
      data: optionsInput.data,
      fileStream: optionsInput.fileStream,
      multipartData: optionsInput.multipartData,
      contentType: optionsInput.contentType,
      responseFormat: optionsInput.responseFormat,
      auth: optionsInput.auth,
      networkSession: optionsInput.networkSession,
      cancellationToken: optionsInput.cancellationToken,
      followRedirects: optionsInput.followRedirects,
    });
    return options;
  }
  /**
   * @param {FetchResponse} response
   * @returns {FetchResponse}
   */
  afterRequest(response: FetchResponse): FetchResponse {
    return {
      url: response.url,
      status: response.status,
      data: jsonToSerializedData('{"id": "123", "type": "user"}'),
      content: response.content,
      headers: response.headers,
    } satisfies FetchResponse;
  }
}
test('testMakeRequestJsonCRUD', async function testMakeRequestJsonCRUD(): Promise<any> {
  const newFolderName: string = getUuid();
  const requestBodyPost: string = ''.concat(
    '{"name": "',
    newFolderName,
    '", "parent": { "id": "0"}}',
  ) as string;
  const createFolderResponse: FetchResponse = await client.makeRequest({
    method: 'post',
    url: 'https://api.box.com/2.0/folders',
    data: jsonToSerializedData(requestBodyPost),
  } satisfies FetchOptionsInput);
  if (!(createFolderResponse.status == 201)) {
    throw new Error('Assertion failed');
  }
  const createdFolder: SerializedData = createFolderResponse.data!;
  if (!(getSdValueByKey(createdFolder, 'name') == newFolderName)) {
    throw new Error('Assertion failed');
  }
  const updatedName: string = getUuid();
  const requestBodyPut: string = ''.concat(
    '{"name": "',
    updatedName,
    '"}',
  ) as string;
  const updateFolderResponse: FetchResponse = await client.makeRequest({
    method: 'put',
    url: ''.concat(
      'https://api.box.com/2.0/folders/',
      getSdValueByKey(createdFolder, 'id'),
    ) as string,
    data: jsonToSerializedData(requestBodyPut),
  } satisfies FetchOptionsInput);
  if (!(updateFolderResponse.status == 200)) {
    throw new Error('Assertion failed');
  }
  const updatedFolder: SerializedData = updateFolderResponse.data!;
  if (!(getSdValueByKey(updatedFolder, 'name') == updatedName)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      getSdValueByKey(updatedFolder, 'id') ==
      getSdValueByKey(createdFolder, 'id')
    )
  ) {
    throw new Error('Assertion failed');
  }
  const getFolderResponse: FetchResponse = await client.makeRequest({
    url: ''.concat(
      'https://api.box.com/2.0/folders/',
      getSdValueByKey(createdFolder, 'id'),
    ) as string,
    method: 'GET',
  } satisfies FetchOptionsInput);
  if (!(getFolderResponse.status == 200)) {
    throw new Error('Assertion failed');
  }
  const receivedFolder: SerializedData = getFolderResponse.data!;
  if (!(getSdValueByKey(receivedFolder, 'name') == updatedName)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      getSdValueByKey(receivedFolder, 'id') ==
      getSdValueByKey(updatedFolder, 'id')
    )
  ) {
    throw new Error('Assertion failed');
  }
  const deleteFolderResponse: FetchResponse = await client.makeRequest({
    url: ''.concat(
      'https://api.box.com/2.0/folders/',
      getSdValueByKey(receivedFolder, 'id'),
    ) as string,
    method: 'DELETE',
  } satisfies FetchOptionsInput);
  if (!(deleteFolderResponse.status == 204)) {
    throw new Error('Assertion failed');
  }
});
test('testMakeRequestMultipart', async function testMakeRequestMultipart(): Promise<any> {
  const newFolderName: string = getUuid();
  const newFolder: FolderFull = await client.folders.createFolder({
    name: newFolderName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const newFolderId: string = newFolder.id;
  const newFileName: string = ''.concat(getUuid(), '.pdf') as string;
  const fileContentStream: ByteStream = generateByteStream(1024 * 1024);
  const multipartAttributes: string = ''.concat(
    '{"name": "',
    newFileName,
    '", "parent": { "id":',
    newFolderId,
    '}}',
  ) as string;
  const uploadFileResponse: FetchResponse = await client.makeRequest({
    method: 'POST',
    url: 'https://upload.box.com/api/2.0/files/content',
    contentType: 'multipart/form-data',
    multipartData: [
      {
        partName: 'attributes',
        data: jsonToSerializedData(multipartAttributes),
      } satisfies MultipartItem,
      {
        partName: 'file',
        fileStream: fileContentStream,
      } satisfies MultipartItem,
    ],
  } satisfies FetchOptionsInput);
  if (!(uploadFileResponse.status == 201)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(newFolderId, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
});
test('testMakeRequestBinaryFormat', async function testMakeRequestBinaryFormat(): Promise<any> {
  const newFileName: string = getUuid();
  const fileBuffer: Buffer = generateByteBuffer(1024 * 1024);
  const fileContentStream: ByteStream =
    generateByteStreamFromBuffer(fileBuffer);
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: newFileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileContentStream,
  } satisfies UploadFileRequestBody);
  const uploadedFile: FileFull = uploadedFiles.entries![0];
  const downloadFileResponse: FetchResponse = await client.makeRequest({
    method: 'GET',
    url: ''.concat(
      'https://api.box.com/2.0/files/',
      uploadedFile.id,
      '/content',
    ) as string,
    responseFormat: 'binary' as ResponseFormat,
  } satisfies FetchOptionsInput);
  if (!(downloadFileResponse.status == 200)) {
    throw new Error('Assertion failed');
  }
  if (
    !bufferEquals(
      await readByteStream(downloadFileResponse.content!),
      fileBuffer,
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(uploadedFile.id);
});
test('testWithAsUserHeader', async function testWithAsUserHeader(): Promise<any> {
  const userName: string = getUuid();
  const createdUser: UserFull = await client.users.createUser({
    name: userName,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const asUserClient: BoxClient = client.withAsUserHeader(createdUser.id);
  const adminUser: UserFull = await client.users.getUserMe();
  if (!!((toString(adminUser.name) as string) == userName)) {
    throw new Error('Assertion failed');
  }
  const appUser: UserFull = await asUserClient.users.getUserMe();
  if (!((toString(appUser.name) as string) == userName)) {
    throw new Error('Assertion failed');
  }
  await client.users.deleteUserById(createdUser.id);
});
test('testWithSuppressedNotifications', async function testWithSuppressedNotifications(): Promise<any> {
  const newClient: BoxClient = client.withSuppressedNotifications();
  const user: UserFull = await newClient.users.getUserMe();
  if (!!(user.id == '')) {
    throw new Error('Assertion failed');
  }
});
test('testWithExtraHeaders', async function testWithExtraHeaders(): Promise<any> {
  const userName: string = getUuid();
  const createdUser: UserFull = await client.users.createUser({
    name: userName,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const asUserClient: BoxClient = client.withExtraHeaders({
    ['As-User']: createdUser.id,
  });
  const adminUser: UserFull = await client.users.getUserMe();
  if (!!((toString(adminUser.name) as string) == userName)) {
    throw new Error('Assertion failed');
  }
  const appUser: UserFull = await asUserClient.users.getUserMe();
  if (!((toString(appUser.name) as string) == userName)) {
    throw new Error('Assertion failed');
  }
  await client.users.deleteUserById(createdUser.id);
});
test('testWithCustomBaseUrls', async function testWithCustomBaseUrls(): Promise<any> {
  const newBaseUrls: BaseUrls = new BaseUrls({
    baseUrl: 'https://box.com/',
    uploadUrl: 'https://box.com/',
    oauth2Url: 'https://box.com/',
  });
  const customBaseClient: BoxClient = client.withCustomBaseUrls(newBaseUrls);
  await expect(async () => {
    await customBaseClient.users.getUserMe();
  }).rejects.toThrow();
});
test('testWithInterceptors', async function testWithInterceptors(): Promise<any> {
  const user: UserFull = await client.users.getUserMe();
  if (!(user.role == void 0)) {
    throw new Error('Assertion failed');
  }
  const clientWithInterceptor: BoxClient = client.withInterceptors([
    new InterceptorAddingRoleToFields({}),
  ]);
  const newUser: UserFull = await clientWithInterceptor.users.getUserMe();
  if (!!(newUser.role == void 0)) {
    throw new Error('Assertion failed');
  }
  const clientWithTwoInterceptors: BoxClient =
    clientWithInterceptor.withInterceptors([
      new InterceptorChangingResponse({}),
    ]);
  const superNewUser: UserFull =
    await clientWithTwoInterceptors.users.getUserMe();
  if (!(superNewUser.id == '123')) {
    throw new Error('Assertion failed');
  }
});
test('testWithFailingInterceptors', async function testWithFailingInterceptors(): Promise<any> {
  const user: UserFull = await client.users.getUserMe();
  if (!!(user.id == void 0)) {
    throw new Error('Assertion failed');
  }
  const clientWithInterceptor: BoxClient = client.withInterceptors([
    new InterceptorThrowingError({}),
  ]);
  await expect(async () => {
    await clientWithInterceptor.users.getUserMe();
  }).rejects.toThrow();
});
export {};
