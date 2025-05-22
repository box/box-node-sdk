import { serializeFileVersions } from '../schemas/fileVersions.generated.js';
import { deserializeFileVersions } from '../schemas/fileVersions.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeFileVersionFull } from '../schemas/fileVersionFull.generated.js';
import { deserializeFileVersionFull } from '../schemas/fileVersionFull.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FileVersions } from '../schemas/fileVersions.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { FileVersionFull } from '../schemas/fileVersionFull.generated.js';
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
export class GetFileVersionsOptionals {
  readonly queryParams: GetFileVersionsQueryParams =
    {} satisfies GetFileVersionsQueryParams;
  readonly headers: GetFileVersionsHeaders = new GetFileVersionsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileVersionsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileVersionsOptionals,
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
export interface GetFileVersionsOptionalsInput {
  readonly queryParams?: GetFileVersionsQueryParams;
  readonly headers?: GetFileVersionsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileVersionByIdOptionals {
  readonly queryParams: GetFileVersionByIdQueryParams =
    {} satisfies GetFileVersionByIdQueryParams;
  readonly headers: GetFileVersionByIdHeaders = new GetFileVersionByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileVersionByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileVersionByIdOptionals,
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
export interface GetFileVersionByIdOptionalsInput {
  readonly queryParams?: GetFileVersionByIdQueryParams;
  readonly headers?: GetFileVersionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFileVersionByIdOptionals {
  readonly headers: DeleteFileVersionByIdHeaders =
    new DeleteFileVersionByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFileVersionByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteFileVersionByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteFileVersionByIdOptionalsInput {
  readonly headers?: DeleteFileVersionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFileVersionByIdOptionals {
  readonly requestBody: UpdateFileVersionByIdRequestBody =
    {} satisfies UpdateFileVersionByIdRequestBody;
  readonly headers: UpdateFileVersionByIdHeaders =
    new UpdateFileVersionByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFileVersionByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateFileVersionByIdOptionals,
          'requestBody' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateFileVersionByIdOptionalsInput {
  readonly requestBody?: UpdateFileVersionByIdRequestBody;
  readonly headers?: UpdateFileVersionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class PromoteFileVersionOptionals {
  readonly requestBody: PromoteFileVersionRequestBody =
    {} satisfies PromoteFileVersionRequestBody;
  readonly queryParams: PromoteFileVersionQueryParams =
    {} satisfies PromoteFileVersionQueryParams;
  readonly headers: PromoteFileVersionHeaders = new PromoteFileVersionHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      PromoteFileVersionOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          PromoteFileVersionOptionals,
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
export interface PromoteFileVersionOptionalsInput {
  readonly requestBody?: PromoteFileVersionRequestBody;
  readonly queryParams?: PromoteFileVersionQueryParams;
  readonly headers?: PromoteFileVersionHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetFileVersionsQueryParams {
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
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
}
export class GetFileVersionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetFileVersionByIdQueryParams {
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
export class GetFileVersionByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteFileVersionByIdHeaders {
  /**
   * Ensures this item hasn't recently changed before
   * making changes.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `412 Precondition Failed` if it
   * has changed since. */
  readonly ifMatch?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFileVersionByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFileVersionByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFileVersionByIdHeadersInput {
  /**
   * Ensures this item hasn't recently changed before
   * making changes.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `412 Precondition Failed` if it
   * has changed since. */
  readonly ifMatch?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateFileVersionByIdRequestBody {
  /**
   * Set this to `null` to clear
   * the date and restore the file. */
  readonly trashedAt?: string | null;
  readonly rawData?: SerializedData;
}
export class UpdateFileVersionByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateFileVersionByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFileVersionByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFileVersionByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type PromoteFileVersionRequestBodyTypeField = 'file_version';
export interface PromoteFileVersionRequestBody {
  /**
   * The file version ID */
  readonly id?: string;
  /**
   * The type to promote */
  readonly type?: PromoteFileVersionRequestBodyTypeField;
  readonly rawData?: SerializedData;
}
export interface PromoteFileVersionQueryParams {
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
export class PromoteFileVersionHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<PromoteFileVersionHeaders, 'extraHeaders'> &
      Partial<Pick<PromoteFileVersionHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface PromoteFileVersionHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileVersionsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileVersionsManager,
      | 'networkSession'
      | 'getFileVersions'
      | 'getFileVersionById'
      | 'deleteFileVersionById'
      | 'updateFileVersionById'
      | 'promoteFileVersion'
    > &
      Partial<Pick<FileVersionsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieve a list of the past versions for a file.
     *
     * Versions are only tracked by Box users with premium accounts. To fetch the ID
     * of the current version of a file, use the `GET /file/:id` API.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileVersionsOptionalsInput} optionalsInput
     * @returns {Promise<FileVersions>}
     */
  async getFileVersions(
    fileId: string,
    optionalsInput: GetFileVersionsOptionalsInput = {},
  ): Promise<FileVersions> {
    const optionals: GetFileVersionsOptionals = new GetFileVersionsOptionals({
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
      ['limit']: toString(queryParams.limit) as string,
      ['offset']: toString(queryParams.offset) as string,
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
            '/versions',
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
      ...deserializeFileVersions(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieve a specific version of a file.
     *
     * Versions are only tracked for Box users with premium accounts.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {string} fileVersionId The ID of the file version
    Example: "1234"
     * @param {GetFileVersionByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileVersionFull>}
     */
  async getFileVersionById(
    fileId: string,
    fileVersionId: string,
    optionalsInput: GetFileVersionByIdOptionalsInput = {},
  ): Promise<FileVersionFull> {
    const optionals: GetFileVersionByIdOptionals =
      new GetFileVersionByIdOptionals({
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
            '/versions/',
            toString(fileVersionId) as string,
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
      ...deserializeFileVersionFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Move a file version to the trash.
     *
     * Versions are only tracked for Box users with premium accounts.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {string} fileVersionId The ID of the file version
    Example: "1234"
     * @param {DeleteFileVersionByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFileVersionById(
    fileId: string,
    fileVersionId: string,
    optionalsInput: DeleteFileVersionByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFileVersionByIdOptionals =
      new DeleteFileVersionByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['if-match']: toString(headers.ifMatch) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/versions/',
            toString(fileVersionId) as string,
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
  /**
     * Restores a specific version of a file after it was deleted.
     * Don't use this endpoint to restore Box Notes,
     * as it works with file formats such as PDF, DOC,
     * PPTX or similar.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {string} fileVersionId The ID of the file version
    Example: "1234"
     * @param {UpdateFileVersionByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileVersionFull>}
     */
  async updateFileVersionById(
    fileId: string,
    fileVersionId: string,
    optionalsInput: UpdateFileVersionByIdOptionalsInput = {},
  ): Promise<FileVersionFull> {
    const optionals: UpdateFileVersionByIdOptionals =
      new UpdateFileVersionByIdOptionals({
        requestBody: optionalsInput.requestBody,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
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
            '/versions/',
            toString(fileVersionId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateFileVersionByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFileVersionFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Promote a specific version of a file.
     *
     * If previous versions exist, this method can be used to
     * promote one of the older versions to the top of the version history.
     *
     * This creates a new copy of the old version and puts it at the
     * top of the versions history. The file will have the exact same contents
     * as the older version, with the the same hash digest, `etag`, and
     * name as the original.
     *
     * Other properties such as comments do not get updated to their
     * former values.
     *
     * Don't use this endpoint to restore Box Notes,
     * as it works with file formats such as PDF, DOC,
     * PPTX or similar.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {PromoteFileVersionOptionalsInput} optionalsInput
     * @returns {Promise<FileVersionFull>}
     */
  async promoteFileVersion(
    fileId: string,
    optionalsInput: PromoteFileVersionOptionalsInput = {},
  ): Promise<FileVersionFull> {
    const optionals: PromoteFileVersionOptionals =
      new PromoteFileVersionOptionals({
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
            '/versions/current',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializePromoteFileVersionRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFileVersionFull(response.data!),
      rawData: response.data!,
    };
  }
}
export interface FileVersionsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateFileVersionByIdRequestBody(
  val: UpdateFileVersionByIdRequestBody,
): SerializedData {
  return { ['trashed_at']: val.trashedAt };
}
export function deserializeUpdateFileVersionByIdRequestBody(
  val: SerializedData,
): UpdateFileVersionByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileVersionByIdRequestBody"',
    });
  }
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "trashed_at" of type "UpdateFileVersionByIdRequestBody"',
    });
  }
  const trashedAt: undefined | string =
    val.trashed_at == void 0 ? void 0 : val.trashed_at;
  return { trashedAt: trashedAt } satisfies UpdateFileVersionByIdRequestBody;
}
export function serializePromoteFileVersionRequestBodyTypeField(
  val: PromoteFileVersionRequestBodyTypeField,
): SerializedData {
  return val;
}
export function deserializePromoteFileVersionRequestBodyTypeField(
  val: SerializedData,
): PromoteFileVersionRequestBodyTypeField {
  if (val == 'file_version') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize PromoteFileVersionRequestBodyTypeField",
  });
}
export function serializePromoteFileVersionRequestBody(
  val: PromoteFileVersionRequestBody,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializePromoteFileVersionRequestBodyTypeField(val.type),
  };
}
export function deserializePromoteFileVersionRequestBody(
  val: SerializedData,
): PromoteFileVersionRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "PromoteFileVersionRequestBody"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "PromoteFileVersionRequestBody"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | PromoteFileVersionRequestBodyTypeField =
    val.type == void 0
      ? void 0
      : deserializePromoteFileVersionRequestBodyTypeField(val.type);
  return { id: id, type: type } satisfies PromoteFileVersionRequestBody;
}
