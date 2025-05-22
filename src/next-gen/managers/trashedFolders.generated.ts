import { serializeTrashFolderRestored } from '../schemas/trashFolderRestored.generated.js';
import { deserializeTrashFolderRestored } from '../schemas/trashFolderRestored.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTrashFolder } from '../schemas/trashFolder.generated.js';
import { deserializeTrashFolder } from '../schemas/trashFolder.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { TrashFolderRestored } from '../schemas/trashFolderRestored.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { TrashFolder } from '../schemas/trashFolder.generated.js';
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
export class RestoreFolderFromTrashOptionals {
  readonly requestBody: RestoreFolderFromTrashRequestBody =
    {} satisfies RestoreFolderFromTrashRequestBody;
  readonly queryParams: RestoreFolderFromTrashQueryParams =
    {} satisfies RestoreFolderFromTrashQueryParams;
  readonly headers: RestoreFolderFromTrashHeaders =
    new RestoreFolderFromTrashHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RestoreFolderFromTrashOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          RestoreFolderFromTrashOptionals,
          'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface RestoreFolderFromTrashOptionalsInput {
  readonly requestBody?: RestoreFolderFromTrashRequestBody;
  readonly queryParams?: RestoreFolderFromTrashQueryParams;
  readonly headers?: RestoreFolderFromTrashHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTrashedFolderByIdOptionals {
  readonly queryParams: GetTrashedFolderByIdQueryParams =
    {} satisfies GetTrashedFolderByIdQueryParams;
  readonly headers: GetTrashedFolderByIdHeaders =
    new GetTrashedFolderByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetTrashedFolderByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetTrashedFolderByIdOptionals,
          'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetTrashedFolderByIdOptionalsInput {
  readonly queryParams?: GetTrashedFolderByIdQueryParams;
  readonly headers?: GetTrashedFolderByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTrashedFolderByIdOptionals {
  readonly headers: DeleteTrashedFolderByIdHeaders =
    new DeleteTrashedFolderByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteTrashedFolderByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteTrashedFolderByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteTrashedFolderByIdOptionalsInput {
  readonly headers?: DeleteTrashedFolderByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface RestoreFolderFromTrashRequestBodyParentField {
  /**
   * The ID of parent item */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface RestoreFolderFromTrashRequestBody {
  /**
   * An optional new name for the folder. */
  readonly name?: string;
  readonly parent?: RestoreFolderFromTrashRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export interface RestoreFolderFromTrashQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class RestoreFolderFromTrashHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RestoreFolderFromTrashHeaders, 'extraHeaders'> &
      Partial<Pick<RestoreFolderFromTrashHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RestoreFolderFromTrashHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetTrashedFolderByIdQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class GetTrashedFolderByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTrashedFolderByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTrashedFolderByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTrashedFolderByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTrashedFolderByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTrashedFolderByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTrashedFolderByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTrashedFolderByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TrashedFoldersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TrashedFoldersManager,
      | 'networkSession'
      | 'restoreFolderFromTrash'
      | 'getTrashedFolderById'
      | 'deleteTrashedFolderById'
    > &
      Partial<Pick<TrashedFoldersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Restores a folder that has been moved to the trash.
     *
     * An optional new parent ID can be provided to restore the folder to in case the
     * original folder has been deleted.
     *
     * During this operation, part of the file tree will be locked, mainly
     * the source folder and all of its descendants, as well as the destination
     * folder.
     *
     * For the duration of the operation, no other move, copy, delete, or restore
     * operation can performed on any of the locked folders.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {RestoreFolderFromTrashOptionalsInput} optionalsInput
     * @returns {Promise<TrashFolderRestored>}
     */
  async restoreFolderFromTrash(
    folderId: string,
    optionalsInput: RestoreFolderFromTrashOptionalsInput = {},
  ): Promise<TrashFolderRestored> {
    const optionals: RestoreFolderFromTrashOptionals =
      new RestoreFolderFromTrashOptionals({
        requestBody: optionalsInput.requestBody,
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
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
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRestoreFolderFromTrashRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTrashFolderRestored(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a folder that has been moved to the trash.
     *
     * Please note that only if the folder itself has been moved to the
     * trash can it be retrieved with this API call. If instead one of
     * its parent folders was moved to the trash, only that folder
     * can be inspected using the
     * [`GET /folders/:id/trash`](e://get_folders_id_trash) API.
     *
     * To list all items that have been moved to the trash, please
     * use the [`GET /folders/trash/items`](e://get-folders-trash-items/)
     * API.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetTrashedFolderByIdOptionalsInput} optionalsInput
     * @returns {Promise<TrashFolder>}
     */
  async getTrashedFolderById(
    folderId: string,
    optionalsInput: GetTrashedFolderByIdOptionalsInput = {},
  ): Promise<TrashFolder> {
    const optionals: GetTrashedFolderByIdOptionals =
      new GetTrashedFolderByIdOptionals({
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
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
            '/trash',
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
      ...deserializeTrashFolder(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes a folder that is in the trash.
     * This action cannot be undone.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {DeleteTrashedFolderByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTrashedFolderById(
    folderId: string,
    optionalsInput: DeleteTrashedFolderByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTrashedFolderByIdOptionals =
      new DeleteTrashedFolderByIdOptionals({
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
            '/trash',
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
export interface TrashedFoldersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeRestoreFolderFromTrashRequestBodyParentField(
  val: RestoreFolderFromTrashRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeRestoreFolderFromTrashRequestBodyParentField(
  val: SerializedData,
): RestoreFolderFromTrashRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RestoreFolderFromTrashRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "RestoreFolderFromTrashRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { id: id } satisfies RestoreFolderFromTrashRequestBodyParentField;
}
export function serializeRestoreFolderFromTrashRequestBody(
  val: RestoreFolderFromTrashRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeRestoreFolderFromTrashRequestBodyParentField(val.parent),
  };
}
export function deserializeRestoreFolderFromTrashRequestBody(
  val: SerializedData,
): RestoreFolderFromTrashRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RestoreFolderFromTrashRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "RestoreFolderFromTrashRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const parent: undefined | RestoreFolderFromTrashRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeRestoreFolderFromTrashRequestBodyParentField(val.parent);
  return {
    name: name,
    parent: parent,
  } satisfies RestoreFolderFromTrashRequestBody;
}
