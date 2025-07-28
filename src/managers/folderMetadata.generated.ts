import { serializeMetadatas } from '../schemas/metadatas.generated.js';
import { deserializeMetadatas } from '../schemas/metadatas.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { deserializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { serializeMetadataError } from '../schemas/metadataError.generated.js';
import { deserializeMetadataError } from '../schemas/metadataError.generated.js';
import { serializeMetadataInstanceValue } from '../schemas/metadataInstanceValue.generated.js';
import { deserializeMetadataInstanceValue } from '../schemas/metadataInstanceValue.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Metadatas } from '../schemas/metadatas.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { MetadataFull } from '../schemas/metadataFull.generated.js';
import { MetadataError } from '../schemas/metadataError.generated.js';
import { MetadataInstanceValue } from '../schemas/metadataInstanceValue.generated.js';
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
export class GetFolderMetadataOptionals {
  readonly headers: GetFolderMetadataHeaders = new GetFolderMetadataHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetFolderMetadataOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<GetFolderMetadataOptionals, 'headers' | 'cancellationToken'>
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
export interface GetFolderMetadataOptionalsInput {
  readonly headers?: GetFolderMetadataHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFolderMetadataByIdOptionals {
  readonly headers: GetFolderMetadataByIdHeaders =
    new GetFolderMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFolderMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetFolderMetadataByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetFolderMetadataByIdOptionalsInput {
  readonly headers?: GetFolderMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateFolderMetadataByIdOptionals {
  readonly headers: CreateFolderMetadataByIdHeaders =
    new CreateFolderMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateFolderMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateFolderMetadataByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateFolderMetadataByIdOptionalsInput {
  readonly headers?: CreateFolderMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFolderMetadataByIdOptionals {
  readonly headers: UpdateFolderMetadataByIdHeaders =
    new UpdateFolderMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFolderMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateFolderMetadataByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateFolderMetadataByIdOptionalsInput {
  readonly headers?: UpdateFolderMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFolderMetadataByIdOptionals {
  readonly headers: DeleteFolderMetadataByIdHeaders =
    new DeleteFolderMetadataByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFolderMetadataByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteFolderMetadataByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteFolderMetadataByIdOptionalsInput {
  readonly headers?: DeleteFolderMetadataByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFolderMetadataHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderMetadataHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderMetadataHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderMetadataHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetFolderMetadataByIdScope = 'global' | 'enterprise' | string;
export class GetFolderMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateFolderMetadataByIdScope = 'global' | 'enterprise' | string;
export type CreateFolderMetadataByIdRequestBody = {
  readonly [key: string]: any;
};
export class CreateFolderMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateFolderMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<CreateFolderMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateFolderMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateFolderMetadataByIdScope = 'global' | 'enterprise' | string;
export type UpdateFolderMetadataByIdRequestBodyOpField =
  | 'add'
  | 'replace'
  | 'remove'
  | 'test'
  | 'move'
  | 'copy'
  | string;
export interface UpdateFolderMetadataByIdRequestBody {
  /**
   * The type of change to perform on the template. Some
   * of these are hazardous as they will change existing templates. */
  readonly op?: UpdateFolderMetadataByIdRequestBodyOpField;
  /**
   * The location in the metadata JSON object
   * to apply the changes to, in the format of a
   * [JSON-Pointer](https://tools.ietf.org/html/rfc6901).
   *
   * The path must always be prefixed with a `/` to represent the root
   * of the template. The characters `~` and `/` are reserved
   * characters and must be escaped in the key. */
  readonly path?: string;
  readonly value?: MetadataInstanceValue;
  /**
   * The location in the metadata JSON object to move or copy a value
   * from. Required for `move` or `copy` operations and must be in the
   * format of a [JSON-Pointer](https://tools.ietf.org/html/rfc6901). */
  readonly from?: string;
  readonly rawData?: SerializedData;
}
export class UpdateFolderMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateFolderMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFolderMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFolderMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type DeleteFolderMetadataByIdScope = 'global' | 'enterprise' | string;
export class DeleteFolderMetadataByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFolderMetadataByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFolderMetadataByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFolderMetadataByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FolderMetadataManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FolderMetadataManager,
      | 'networkSession'
      | 'getFolderMetadata'
      | 'getFolderMetadataById'
      | 'createFolderMetadataById'
      | 'updateFolderMetadataById'
      | 'deleteFolderMetadataById'
    > &
      Partial<Pick<FolderMetadataManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves all metadata for a given folder. This can not be used on the root
     * folder with ID `0`.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetFolderMetadataOptionalsInput} optionalsInput
     * @returns {Promise<Metadatas>}
     */
  async getFolderMetadata(
    folderId: string,
    optionalsInput: GetFolderMetadataOptionalsInput = {},
  ): Promise<Metadatas> {
    const optionals: GetFolderMetadataOptionals =
      new GetFolderMetadataOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
     * folder. This can not be used on the root folder with ID `0`.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetFolderMetadataByIdScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {GetFolderMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async getFolderMetadataById(
    folderId: string,
    scope: GetFolderMetadataByIdScope,
    templateKey: string,
    optionalsInput: GetFolderMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: GetFolderMetadataByIdOptionals =
      new GetFolderMetadataByIdOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
     * Applies an instance of a metadata template to a folder.
     *
     * In most cases only values that are present in the metadata template
     * will be accepted, except for the `global.properties` template which accepts
     * any key-value pair.
     *
     * To display the metadata template in the Box web app the enterprise needs to be
     * configured to enable **Cascading Folder Level Metadata** for the user in the
     * admin console.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {CreateFolderMetadataByIdScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {CreateFolderMetadataByIdRequestBody} requestBody Request body of createFolderMetadataById method
     * @param {CreateFolderMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async createFolderMetadataById(
    folderId: string,
    scope: CreateFolderMetadataByIdScope,
    templateKey: string,
    requestBody: CreateFolderMetadataByIdRequestBody,
    optionalsInput: CreateFolderMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: CreateFolderMetadataByIdOptionals =
      new CreateFolderMetadataByIdOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateFolderMetadataByIdRequestBody(requestBody),
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
     * Updates a piece of metadata on a folder.
     *
     * The metadata instance can only be updated if the template has already been
     * applied to the folder before. When editing metadata, only values that match
     * the metadata template schema will be accepted.
     *
     * The update is applied atomically. If any errors occur during the
     * application of the operations, the metadata instance will not be changed.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {UpdateFolderMetadataByIdScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {readonly UpdateFolderMetadataByIdRequestBody[]} requestBody Request body of updateFolderMetadataById method
     * @param {UpdateFolderMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataFull>}
     */
  async updateFolderMetadataById(
    folderId: string,
    scope: UpdateFolderMetadataByIdScope,
    templateKey: string,
    requestBody: readonly UpdateFolderMetadataByIdRequestBody[],
    optionalsInput: UpdateFolderMetadataByIdOptionalsInput = {},
  ): Promise<MetadataFull> {
    const optionals: UpdateFolderMetadataByIdOptionals =
      new UpdateFolderMetadataByIdOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '/metadata/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateFolderMetadataByIdRequestBody,
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
     * Deletes a piece of folder metadata.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {DeleteFolderMetadataByIdScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {DeleteFolderMetadataByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFolderMetadataById(
    folderId: string,
    scope: DeleteFolderMetadataByIdScope,
    templateKey: string,
    optionalsInput: DeleteFolderMetadataByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFolderMetadataByIdOptionals =
      new DeleteFolderMetadataByIdOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
export interface FolderMetadataManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetFolderMetadataByIdScope(
  val: GetFolderMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeGetFolderMetadataByIdScope(
  val: SerializedData,
): GetFolderMetadataByIdScope {
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
    message: "Can't deserialize GetFolderMetadataByIdScope",
  });
}
export function serializeCreateFolderMetadataByIdScope(
  val: CreateFolderMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeCreateFolderMetadataByIdScope(
  val: SerializedData,
): CreateFolderMetadataByIdScope {
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
    message: "Can't deserialize CreateFolderMetadataByIdScope",
  });
}
export function serializeCreateFolderMetadataByIdRequestBody(
  val: CreateFolderMetadataByIdRequestBody,
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
export function deserializeCreateFolderMetadataByIdRequestBody(
  val: SerializedData,
): CreateFolderMetadataByIdRequestBody {
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
export function serializeUpdateFolderMetadataByIdScope(
  val: UpdateFolderMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeUpdateFolderMetadataByIdScope(
  val: SerializedData,
): UpdateFolderMetadataByIdScope {
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
    message: "Can't deserialize UpdateFolderMetadataByIdScope",
  });
}
export function serializeUpdateFolderMetadataByIdRequestBodyOpField(
  val: UpdateFolderMetadataByIdRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateFolderMetadataByIdRequestBodyOpField(
  val: SerializedData,
): UpdateFolderMetadataByIdRequestBodyOpField {
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
    message: "Can't deserialize UpdateFolderMetadataByIdRequestBodyOpField",
  });
}
export function serializeUpdateFolderMetadataByIdRequestBody(
  val: UpdateFolderMetadataByIdRequestBody,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeUpdateFolderMetadataByIdRequestBodyOpField(val.op),
    ['path']: val.path,
    ['value']:
      val.value == void 0
        ? val.value
        : serializeMetadataInstanceValue(val.value),
    ['from']: val.from,
  };
}
export function deserializeUpdateFolderMetadataByIdRequestBody(
  val: SerializedData,
): UpdateFolderMetadataByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFolderMetadataByIdRequestBody"',
    });
  }
  const op: undefined | UpdateFolderMetadataByIdRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeUpdateFolderMetadataByIdRequestBodyOpField(val.op);
  if (!(val.path == void 0) && !sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "UpdateFolderMetadataByIdRequestBody"',
    });
  }
  const path: undefined | string = val.path == void 0 ? void 0 : val.path;
  const value: undefined | MetadataInstanceValue =
    val.value == void 0 ? void 0 : deserializeMetadataInstanceValue(val.value);
  if (!(val.from == void 0) && !sdIsString(val.from)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "from" of type "UpdateFolderMetadataByIdRequestBody"',
    });
  }
  const from: undefined | string = val.from == void 0 ? void 0 : val.from;
  return {
    op: op,
    path: path,
    value: value,
    from: from,
  } satisfies UpdateFolderMetadataByIdRequestBody;
}
export function serializeDeleteFolderMetadataByIdScope(
  val: DeleteFolderMetadataByIdScope,
): SerializedData {
  return val;
}
export function deserializeDeleteFolderMetadataByIdScope(
  val: SerializedData,
): DeleteFolderMetadataByIdScope {
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
    message: "Can't deserialize DeleteFolderMetadataByIdScope",
  });
}
