import { serializeTrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { deserializeTrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTrashFile } from '../schemas/trashFile.generated.js';
import { deserializeTrashFile } from '../schemas/trashFile.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { TrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { TrashFile } from '../schemas/trashFile.generated.js';
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
export class RestoreFileFromTrashOptionals {
  readonly requestBody: RestoreFileFromTrashRequestBody =
    {} satisfies RestoreFileFromTrashRequestBody;
  readonly queryParams: RestoreFileFromTrashQueryParams =
    {} satisfies RestoreFileFromTrashQueryParams;
  readonly headers: RestoreFileFromTrashHeaders =
    new RestoreFileFromTrashHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RestoreFileFromTrashOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          RestoreFileFromTrashOptionals,
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
export interface RestoreFileFromTrashOptionalsInput {
  readonly requestBody?: RestoreFileFromTrashRequestBody;
  readonly queryParams?: RestoreFileFromTrashQueryParams;
  readonly headers?: RestoreFileFromTrashHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTrashedFileByIdOptionals {
  readonly queryParams: GetTrashedFileByIdQueryParams =
    {} satisfies GetTrashedFileByIdQueryParams;
  readonly headers: GetTrashedFileByIdHeaders = new GetTrashedFileByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetTrashedFileByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetTrashedFileByIdOptionals,
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
export interface GetTrashedFileByIdOptionalsInput {
  readonly queryParams?: GetTrashedFileByIdQueryParams;
  readonly headers?: GetTrashedFileByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTrashedFileByIdOptionals {
  readonly headers: DeleteTrashedFileByIdHeaders =
    new DeleteTrashedFileByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteTrashedFileByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteTrashedFileByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteTrashedFileByIdOptionalsInput {
  readonly headers?: DeleteTrashedFileByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface RestoreFileFromTrashRequestBodyParentField {
  /**
   * The ID of parent item. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface RestoreFileFromTrashRequestBody {
  /**
   * An optional new name for the file. */
  readonly name?: string;
  readonly parent?: RestoreFileFromTrashRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export interface RestoreFileFromTrashQueryParams {
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
export class RestoreFileFromTrashHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RestoreFileFromTrashHeaders, 'extraHeaders'> &
      Partial<Pick<RestoreFileFromTrashHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RestoreFileFromTrashHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetTrashedFileByIdQueryParams {
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
export class GetTrashedFileByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTrashedFileByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTrashedFileByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTrashedFileByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTrashedFileByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTrashedFileByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTrashedFileByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTrashedFileByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TrashedFilesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TrashedFilesManager,
      | 'networkSession'
      | 'restoreFileFromTrash'
      | 'getTrashedFileById'
      | 'deleteTrashedFileById'
    > &
      Partial<Pick<TrashedFilesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Restores a file that has been moved to the trash.
     *
     * An optional new parent ID can be provided to restore the file to in case the
     * original folder has been deleted.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {RestoreFileFromTrashOptionalsInput} optionalsInput
     * @returns {Promise<TrashFileRestored>}
     */
  async restoreFileFromTrash(
    fileId: string,
    optionalsInput: RestoreFileFromTrashOptionalsInput = {},
  ): Promise<TrashFileRestored> {
    const optionals: RestoreFileFromTrashOptionals =
      new RestoreFileFromTrashOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRestoreFileFromTrashRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTrashFileRestored(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a file that has been moved to the trash.
     *
     * Please note that only if the file itself has been moved to the
     * trash can it be retrieved with this API call. If instead one of
     * its parent folders was moved to the trash, only that folder
     * can be inspected using the
     * [`GET /folders/:id/trash`](e://get_folders_id_trash) API.
     *
     * To list all items that have been moved to the trash, please
     * use the [`GET /folders/trash/items`](e://get-folders-trash-items/)
     * API.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetTrashedFileByIdOptionalsInput} optionalsInput
     * @returns {Promise<TrashFile>}
     */
  async getTrashedFileById(
    fileId: string,
    optionalsInput: GetTrashedFileByIdOptionalsInput = {},
  ): Promise<TrashFile> {
    const optionals: GetTrashedFileByIdOptionals =
      new GetTrashedFileByIdOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
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
      ...deserializeTrashFile(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes a file that is in the trash.
     * This action cannot be undone.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DeleteTrashedFileByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTrashedFileById(
    fileId: string,
    optionalsInput: DeleteTrashedFileByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTrashedFileByIdOptionals =
      new DeleteTrashedFileByIdOptionals({
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
export interface TrashedFilesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeRestoreFileFromTrashRequestBodyParentField(
  val: RestoreFileFromTrashRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeRestoreFileFromTrashRequestBodyParentField(
  val: SerializedData,
): RestoreFileFromTrashRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RestoreFileFromTrashRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "RestoreFileFromTrashRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { id: id } satisfies RestoreFileFromTrashRequestBodyParentField;
}
export function serializeRestoreFileFromTrashRequestBody(
  val: RestoreFileFromTrashRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeRestoreFileFromTrashRequestBodyParentField(val.parent),
  };
}
export function deserializeRestoreFileFromTrashRequestBody(
  val: SerializedData,
): RestoreFileFromTrashRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RestoreFileFromTrashRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "RestoreFileFromTrashRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const parent: undefined | RestoreFileFromTrashRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeRestoreFileFromTrashRequestBodyParentField(val.parent);
  return {
    name: name,
    parent: parent,
  } satisfies RestoreFileFromTrashRequestBody;
}
