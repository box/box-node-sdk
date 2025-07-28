import { serializeFolderLocks } from '../schemas/folderLocks.generated.js';
import { deserializeFolderLocks } from '../schemas/folderLocks.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeFolderLock } from '../schemas/folderLock.generated.js';
import { deserializeFolderLock } from '../schemas/folderLock.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FolderLocks } from '../schemas/folderLocks.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { FolderLock } from '../schemas/folderLock.generated.js';
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
export class GetFolderLocksOptionals {
  readonly headers: GetFolderLocksHeaders = new GetFolderLocksHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetFolderLocksOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetFolderLocksOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetFolderLocksOptionalsInput {
  readonly headers?: GetFolderLocksHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateFolderLockOptionals {
  readonly headers: CreateFolderLockHeaders = new CreateFolderLockHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateFolderLockOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateFolderLockOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateFolderLockOptionalsInput {
  readonly headers?: CreateFolderLockHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFolderLockByIdOptionals {
  readonly headers: DeleteFolderLockByIdHeaders =
    new DeleteFolderLockByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFolderLockByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteFolderLockByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteFolderLockByIdOptionalsInput {
  readonly headers?: DeleteFolderLockByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetFolderLocksQueryParams {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting this folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folder/123`
   * the `folder_id` is `123`.
   *
   * The root folder of a Box account is
   * always represented by the ID `0`. */
  readonly folderId: string;
}
export class GetFolderLocksHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderLocksHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderLocksHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderLocksHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateFolderLockRequestBodyLockedOperationsField {
  /**
   * Whether moving the folder should be locked. */
  readonly move: boolean;
  /**
   * Whether deleting the folder should be locked. */
  readonly delete: boolean;
  readonly rawData?: SerializedData;
}
export interface CreateFolderLockRequestBodyFolderField {
  /**
   * The content type the lock is being applied to. Only `folder`
   * is supported. */
  readonly type: string;
  /**
   * The ID of the folder. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateFolderLockRequestBody {
  /**
   * The operations to lock for the folder. If `locked_operations` is
   * included in the request, both `move` and `delete` must also be
   * included and both set to `true`. */
  readonly lockedOperations?: CreateFolderLockRequestBodyLockedOperationsField;
  /**
   * The folder to apply the lock to. */
  readonly folder: CreateFolderLockRequestBodyFolderField;
  readonly rawData?: SerializedData;
}
export class CreateFolderLockHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateFolderLockHeaders, 'extraHeaders'> &
      Partial<Pick<CreateFolderLockHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateFolderLockHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteFolderLockByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFolderLockByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFolderLockByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFolderLockByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FolderLocksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FolderLocksManager,
      | 'networkSession'
      | 'getFolderLocks'
      | 'createFolderLock'
      | 'deleteFolderLockById'
    > &
      Partial<Pick<FolderLocksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves folder lock details for a given folder.
   *
   * You must be authenticated as the owner or co-owner of the folder to
   * use this endpoint.
   * @param {GetFolderLocksQueryParams} queryParams Query parameters of getFolderLocks method
   * @param {GetFolderLocksOptionalsInput} optionalsInput
   * @returns {Promise<FolderLocks>}
   */
  async getFolderLocks(
    queryParams: GetFolderLocksQueryParams,
    optionalsInput: GetFolderLocksOptionalsInput = {},
  ): Promise<FolderLocks> {
    const optionals: GetFolderLocksOptionals = new GetFolderLocksOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['folder_id']: toString(queryParams.folderId) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/folder_locks',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderLocks(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a folder lock on a folder, preventing it from being moved and/or
   * deleted.
   *
   * You must be authenticated as the owner or co-owner of the folder to
   * use this endpoint.
   * @param {CreateFolderLockRequestBody} requestBody Request body of createFolderLock method
   * @param {CreateFolderLockOptionalsInput} optionalsInput
   * @returns {Promise<FolderLock>}
   */
  async createFolderLock(
    requestBody: CreateFolderLockRequestBody,
    optionalsInput: CreateFolderLockOptionalsInput = {},
  ): Promise<FolderLock> {
    const optionals: CreateFolderLockOptionals = new CreateFolderLockOptionals({
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
            '/2.0/folder_locks',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateFolderLockRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderLock(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a folder lock on a given folder.
     *
     * You must be authenticated as the owner or co-owner of the folder to
     * use this endpoint.
     * @param {string} folderLockId The ID of the folder lock.
    Example: "12345"
     * @param {DeleteFolderLockByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFolderLockById(
    folderLockId: string,
    optionalsInput: DeleteFolderLockByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFolderLockByIdOptionals =
      new DeleteFolderLockByIdOptionals({
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
            '/2.0/folder_locks/',
            toString(folderLockId) as string,
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
export interface FolderLocksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateFolderLockRequestBodyLockedOperationsField(
  val: CreateFolderLockRequestBodyLockedOperationsField,
): SerializedData {
  return { ['move']: val.move, ['delete']: val.delete };
}
export function deserializeCreateFolderLockRequestBodyLockedOperationsField(
  val: SerializedData,
): CreateFolderLockRequestBodyLockedOperationsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateFolderLockRequestBodyLockedOperationsField"',
    });
  }
  if (val.move == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "move" of type "CreateFolderLockRequestBodyLockedOperationsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.move)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "move" of type "CreateFolderLockRequestBodyLockedOperationsField"',
    });
  }
  const move: boolean = val.move;
  if (val.delete == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "delete" of type "CreateFolderLockRequestBodyLockedOperationsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.delete)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "delete" of type "CreateFolderLockRequestBodyLockedOperationsField"',
    });
  }
  const _delete: boolean = val.delete;
  return {
    move: move,
    delete: _delete,
  } satisfies CreateFolderLockRequestBodyLockedOperationsField;
}
export function serializeCreateFolderLockRequestBodyFolderField(
  val: CreateFolderLockRequestBodyFolderField,
): SerializedData {
  return { ['type']: val.type, ['id']: val.id };
}
export function deserializeCreateFolderLockRequestBodyFolderField(
  val: SerializedData,
): CreateFolderLockRequestBodyFolderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateFolderLockRequestBodyFolderField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateFolderLockRequestBodyFolderField" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "CreateFolderLockRequestBodyFolderField"',
    });
  }
  const type: string = val.type;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateFolderLockRequestBodyFolderField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateFolderLockRequestBodyFolderField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateFolderLockRequestBodyFolderField;
}
export function serializeCreateFolderLockRequestBody(
  val: CreateFolderLockRequestBody,
): SerializedData {
  return {
    ['locked_operations']:
      val.lockedOperations == void 0
        ? val.lockedOperations
        : serializeCreateFolderLockRequestBodyLockedOperationsField(
            val.lockedOperations,
          ),
    ['folder']: serializeCreateFolderLockRequestBodyFolderField(val.folder),
  };
}
export function deserializeCreateFolderLockRequestBody(
  val: SerializedData,
): CreateFolderLockRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateFolderLockRequestBody"',
    });
  }
  const lockedOperations:
    | undefined
    | CreateFolderLockRequestBodyLockedOperationsField =
    val.locked_operations == void 0
      ? void 0
      : deserializeCreateFolderLockRequestBodyLockedOperationsField(
          val.locked_operations,
        );
  if (val.folder == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "folder" of type "CreateFolderLockRequestBody" to be defined',
    });
  }
  const folder: CreateFolderLockRequestBodyFolderField =
    deserializeCreateFolderLockRequestBodyFolderField(val.folder);
  return {
    lockedOperations: lockedOperations,
    folder: folder,
  } satisfies CreateFolderLockRequestBody;
}
