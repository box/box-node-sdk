import { serializeMetadatas } from '../schemas/metadatas.generated.js';
import { deserializeMetadatas } from '../schemas/metadatas.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { deserializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Metadatas } from '../schemas/metadatas.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { MetadataFull } from '../schemas/metadataFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { prepareParams } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetFileMetadataOptionals {
  readonly headers: GetFileMetadataHeaders = new GetFileMetadataHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetFileMetadataOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetFileMetadataOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetFileMetadataOptionalsInput {
  readonly headers?: GetFileMetadataHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileMetadataByIdOptionals {
  readonly headers: GetFileMetadataByIdHeaders = new GetFileMetadataByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetFileMetadataByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetFileMetadataByIdOptionalsInput {
  readonly headers?: GetFileMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateFileMetadataByIdOptionals {
  readonly headers: CreateFileMetadataByIdHeaders =
    new CreateFileMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateFileMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateFileMetadataByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateFileMetadataByIdOptionalsInput {
  readonly headers?: CreateFileMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFileMetadataByIdOptionals {
  readonly headers: UpdateFileMetadataByIdHeaders =
    new UpdateFileMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFileMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateFileMetadataByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateFileMetadataByIdOptionalsInput {
  readonly headers?: UpdateFileMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFileMetadataByIdOptionals {
  readonly headers: DeleteFileMetadataByIdHeaders =
    new DeleteFileMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFileMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteFileMetadataByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteFileMetadataByIdOptionalsInput {
  readonly headers?: DeleteFileMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileMetadataHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileMetadataHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileMetadataHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileMetadataHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetFileMetadataByIdScope = 'global' | 'enterprise' | string;
export class GetFileMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateFileMetadataByIdScope = 'global' | 'enterprise' | string;
export type CreateFileMetadataByIdRequestBody = {
  readonly [key: string]: any;
};
export class CreateFileMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateFileMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<CreateFileMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateFileMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateFileMetadataByIdScope = 'global' | 'enterprise' | string;
export type UpdateFileMetadataByIdRequestBodyOpField =
  | 'add'
  | 'replace'
  | 'remove'
  | 'test'
  | 'move'
  | 'copy'
  | string;
export interface UpdateFileMetadataByIdRequestBody {
  /**
   * The type of change to perform on the template. Some
   * of these are hazardous as they will change existing templates. */
  readonly op?: UpdateFileMetadataByIdRequestBodyOpField;
  /**
   * The location in the metadata JSON object
   * to apply the changes to, in the format of a
   * [JSON-Pointer](https://tools.ietf.org/html/rfc6901).
   *
   * The path must always be prefixed with a `/` to represent the root
   * of the template. The characters `~` and `/` are reserved
   * characters and must be escaped in the key. */
  readonly path?: string;
  /**
   * The value to be set or tested.
   *
   * Required for `add`, `replace`, and `test` operations. For `add`,
   * if the value exists already the previous value will be overwritten
   * by the new value. For `replace`, the value must exist before
   * replacing.
   *
   * For `test`, the existing value at the `path` location must match
   * the specified value. */
  readonly value?: string;
  /**
   * The location in the metadata JSON object to move or copy a value
   * from. Required for `move` or `copy` operations and must be in the
   * format of a [JSON-Pointer](https://tools.ietf.org/html/rfc6901). */
  readonly from?: string;
  readonly rawData?: SerializedData;
}
export class UpdateFileMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateFileMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFileMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFileMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type DeleteFileMetadataByIdScope = 'global' | 'enterprise' | string;
export class DeleteFileMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFileMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFileMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFileMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileMetadataManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileMetadataManager,
      | 'networkSession'
      | 'getFileMetadata'
      | 'getFileMetadataById'
      | 'createFileMetadataById'
      | 'updateFileMetadataById'
      | 'deleteFileMetadataById'
    > &
      Partial<Pick<FileMetadataManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves all metadata for a given file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileMetadataOptionalsInput} optionalsInput
     * @returns {Promise<Metadatas>}
     */
  async getFileMetadata(
    fileId: string,
    optionalsInput: GetFileMetadataOptionalsInput = {},
  ): Promise<Metadatas> {
    const optionals: GetFileMetadataOptionals = new GetFileMetadataOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata',
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadatas(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves the instance of a metadata template that has been applied to a
     * file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileMetadataByIdScope} scope The scope of the metadata template
    Example: "global"
     * @param {string} templateKey The name of the metadata template
    Example: "properties"
     * @param {GetFileMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async getFileMetadataById(
    fileId: string,
    scope: GetFileMetadataByIdScope,
    templateKey: string,
    optionalsInput: GetFileMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: GetFileMetadataByIdOptionals =
      new GetFileMetadataByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Applies an instance of a metadata template to a file.
     *
     * In most cases only values that are present in the metadata template
     * will be accepted, except for the `global.properties` template which accepts
     * any key-value pair.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {CreateFileMetadataByIdScope} scope The scope of the metadata template
    Example: "global"
     * @param {string} templateKey The name of the metadata template
    Example: "properties"
     * @param {CreateFileMetadataByIdRequestBody} requestBody Request body of createFileMetadataById method
     * @param {CreateFileMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async createFileMetadataById(
    fileId: string,
    scope: CreateFileMetadataByIdScope,
    templateKey: string,
    requestBody: CreateFileMetadataByIdRequestBody,
    optionalsInput: CreateFileMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: CreateFileMetadataByIdOptionals =
      new CreateFileMetadataByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateFileMetadataByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a piece of metadata on a file.
     *
     * The metadata instance can only be updated if the template has already been
     * applied to the file before. When editing metadata, only values that match
     * the metadata template schema will be accepted.
     *
     * The update is applied atomically. If any errors occur during the
     * application of the operations, the metadata instance will not be changed.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {UpdateFileMetadataByIdScope} scope The scope of the metadata template
    Example: "global"
     * @param {string} templateKey The name of the metadata template
    Example: "properties"
     * @param {readonly UpdateFileMetadataByIdRequestBody[]} requestBody Request body of updateFileMetadataById method
     * @param {UpdateFileMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async updateFileMetadataById(
    fileId: string,
    scope: UpdateFileMetadataByIdScope,
    templateKey: string,
    requestBody: readonly UpdateFileMetadataByIdRequestBody[],
    optionalsInput: UpdateFileMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: UpdateFileMetadataByIdOptionals =
      new UpdateFileMetadataByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateFileMetadataByIdRequestBody,
          ) as readonly any[],
          contentType: 'application/json-patch+json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a piece of file metadata.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DeleteFileMetadataByIdScope} scope The scope of the metadata template
    Example: "global"
     * @param {string} templateKey The name of the metadata template
    Example: "properties"
     * @param {DeleteFileMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFileMetadataById(
    fileId: string,
    scope: DeleteFileMetadataByIdScope,
    templateKey: string,
    optionalsInput: DeleteFileMetadataByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFileMetadataByIdOptionals =
      new DeleteFileMetadataByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'DELETE',
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
}
export interface FileMetadataManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetFileMetadataByIdScope(
  val: GetFileMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeGetFileMetadataByIdScope(
  val: SerializedData,
): GetFileMetadataByIdScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFileMetadataByIdScope",
  });
}
export function serializeCreateFileMetadataByIdScope(
  val: CreateFileMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeCreateFileMetadataByIdScope(
  val: SerializedData,
): CreateFileMetadataByIdScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateFileMetadataByIdScope",
  });
}
export function serializeCreateFileMetadataByIdRequestBody(
  val: CreateFileMetadataByIdRequestBody,
): SerializedData {
  return Object.fromEntries(
    Object.entries(val).map(([k, v]: [string, any]) => [
      k,
      (function (v: any): any {
        return v;
      })(v),
    ]),
  ) as {
    readonly [key: string]: any;
  };
}
export function deserializeCreateFileMetadataByIdRequestBody(
  val: SerializedData,
): CreateFileMetadataByIdRequestBody {
  return sdIsMap(val)
    ? (Object.fromEntries(
        Object.entries(val).map(([k, v]: [string, any]) => [
          k,
          (function (v: any): any {
            return v;
          })(v),
        ]),
      ) as {
        readonly [key: string]: any;
      })
    : {};
}
export function serializeUpdateFileMetadataByIdScope(
  val: UpdateFileMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeUpdateFileMetadataByIdScope(
  val: SerializedData,
): UpdateFileMetadataByIdScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateFileMetadataByIdScope",
  });
}
export function serializeUpdateFileMetadataByIdRequestBodyOpField(
  val: UpdateFileMetadataByIdRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateFileMetadataByIdRequestBodyOpField(
  val: SerializedData,
): UpdateFileMetadataByIdRequestBodyOpField {
  if (val == 'add') {
    return val;
  }
  if (val == 'replace') {
    return val;
  }
  if (val == 'remove') {
    return val;
  }
  if (val == 'test') {
    return val;
  }
  if (val == 'move') {
    return val;
  }
  if (val == 'copy') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateFileMetadataByIdRequestBodyOpField",
  });
}
export function serializeUpdateFileMetadataByIdRequestBody(
  val: UpdateFileMetadataByIdRequestBody,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeUpdateFileMetadataByIdRequestBodyOpField(val.op),
    ['path']: val.path,
    ['value']: val.value,
    ['from']: val.from,
  };
}
export function deserializeUpdateFileMetadataByIdRequestBody(
  val: SerializedData,
): UpdateFileMetadataByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileMetadataByIdRequestBody"',
    });
  }
  const op: undefined | UpdateFileMetadataByIdRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeUpdateFileMetadataByIdRequestBodyOpField(val.op);
  if (!(val.path == void 0) && !sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "UpdateFileMetadataByIdRequestBody"',
    });
  }
  const path: undefined | string = val.path == void 0 ? void 0 : val.path;
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "UpdateFileMetadataByIdRequestBody"',
    });
  }
  const value: undefined | string = val.value == void 0 ? void 0 : val.value;
  if (!(val.from == void 0) && !sdIsString(val.from)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "from" of type "UpdateFileMetadataByIdRequestBody"',
    });
  }
  const from: undefined | string = val.from == void 0 ? void 0 : val.from;
  return {
    op: op,
    path: path,
    value: value,
    from: from,
  } satisfies UpdateFileMetadataByIdRequestBody;
}
export function serializeDeleteFileMetadataByIdScope(
  val: DeleteFileMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeDeleteFileMetadataByIdScope(
  val: SerializedData,
): DeleteFileMetadataByIdScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DeleteFileMetadataByIdScope",
  });
}
