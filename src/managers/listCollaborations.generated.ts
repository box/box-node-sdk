import { serializeCollaborations } from '../schemas/collaborations.generated.js';
import { deserializeCollaborations } from '../schemas/collaborations.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeCollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
import { deserializeCollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Collaborations } from '../schemas/collaborations.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { CollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
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
export class GetFileCollaborationsOptionals {
  readonly queryParams: GetFileCollaborationsQueryParams =
    {} satisfies GetFileCollaborationsQueryParams;
  readonly headers: GetFileCollaborationsHeaders =
    new GetFileCollaborationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileCollaborationsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileCollaborationsOptionals,
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
export interface GetFileCollaborationsOptionalsInput {
  readonly queryParams?: GetFileCollaborationsQueryParams;
  readonly headers?: GetFileCollaborationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFolderCollaborationsOptionals {
  readonly queryParams: GetFolderCollaborationsQueryParams =
    {} satisfies GetFolderCollaborationsQueryParams;
  readonly headers: GetFolderCollaborationsHeaders =
    new GetFolderCollaborationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFolderCollaborationsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFolderCollaborationsOptionals,
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
export interface GetFolderCollaborationsOptionalsInput {
  readonly queryParams?: GetFolderCollaborationsQueryParams;
  readonly headers?: GetFolderCollaborationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetCollaborationsOptionals {
  readonly headers: GetCollaborationsHeaders = new GetCollaborationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetCollaborationsOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<GetCollaborationsOptionals, 'headers' | 'cancellationToken'>
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
export interface GetCollaborationsOptionalsInput {
  readonly headers?: GetCollaborationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetGroupCollaborationsOptionals {
  readonly queryParams: GetGroupCollaborationsQueryParams =
    {} satisfies GetGroupCollaborationsQueryParams;
  readonly headers: GetGroupCollaborationsHeaders =
    new GetGroupCollaborationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetGroupCollaborationsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetGroupCollaborationsOptionals,
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
export interface GetGroupCollaborationsOptionalsInput {
  readonly queryParams?: GetGroupCollaborationsQueryParams;
  readonly headers?: GetGroupCollaborationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetFileCollaborationsQueryParams {
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
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
}
export class GetFileCollaborationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileCollaborationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileCollaborationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileCollaborationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetFolderCollaborationsQueryParams {
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
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
}
export class GetFolderCollaborationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderCollaborationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderCollaborationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderCollaborationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetCollaborationsQueryParamsStatusField = 'pending' | string;
export interface GetCollaborationsQueryParams {
  /**
   * The status of the collaborations to retrieve. */
  readonly status: GetCollaborationsQueryParamsStatusField;
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
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetCollaborationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetCollaborationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetCollaborationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetGroupCollaborationsQueryParams {
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
export class GetGroupCollaborationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGroupCollaborationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetGroupCollaborationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGroupCollaborationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ListCollaborationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ListCollaborationsManager,
      | 'networkSession'
      | 'getFileCollaborations'
      | 'getFolderCollaborations'
      | 'getCollaborations'
      | 'getGroupCollaborations'
    > &
      Partial<Pick<ListCollaborationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves a list of pending and active collaborations for a
     * file. This returns all the users that have access to the file
     * or have been invited to the file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileCollaborationsOptionalsInput} optionalsInput
     * @returns {Promise<Collaborations>}
     */
  async getFileCollaborations(
    fileId: string,
    optionalsInput: GetFileCollaborationsOptionalsInput = {},
  ): Promise<Collaborations> {
    const optionals: GetFileCollaborationsOptionals =
      new GetFileCollaborationsOptionals({
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
      ['marker']: toString(queryParams.marker) as string,
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
            '/collaborations',
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
      ...deserializeCollaborations(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a list of pending and active collaborations for a
     * folder. This returns all the users that have access to the folder
     * or have been invited to the folder.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    Example: "12345"
     * @param {GetFolderCollaborationsOptionalsInput} optionalsInput
     * @returns {Promise<Collaborations>}
     */
  async getFolderCollaborations(
    folderId: string,
    optionalsInput: GetFolderCollaborationsOptionalsInput = {},
  ): Promise<Collaborations> {
    const optionals: GetFolderCollaborationsOptionals =
      new GetFolderCollaborationsOptionals({
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
      ['marker']: toString(queryParams.marker) as string,
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
            '/collaborations',
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
      ...deserializeCollaborations(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves all pending collaboration invites for this user.
   * @param {GetCollaborationsQueryParams} queryParams Query parameters of getCollaborations method
   * @param {GetCollaborationsOptionalsInput} optionalsInput
   * @returns {Promise<CollaborationsOffsetPaginated>}
   */
  async getCollaborations(
    queryParams: GetCollaborationsQueryParams,
    optionalsInput: GetCollaborationsOptionalsInput = {},
  ): Promise<CollaborationsOffsetPaginated> {
    const optionals: GetCollaborationsOptionals =
      new GetCollaborationsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['status']: toString(queryParams.status) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['offset']: toString(queryParams.offset) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/collaborations',
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
      ...deserializeCollaborationsOffsetPaginated(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves all the collaborations for a group. The user
     * must have admin permissions to inspect enterprise's groups.
     *
     * Each collaboration object has details on which files or
     * folders the group has access to and with what role.
     * @param {string} groupId The ID of the group.
    Example: "57645"
     * @param {GetGroupCollaborationsOptionalsInput} optionalsInput
     * @returns {Promise<CollaborationsOffsetPaginated>}
     */
  async getGroupCollaborations(
    groupId: string,
    optionalsInput: GetGroupCollaborationsOptionalsInput = {},
  ): Promise<CollaborationsOffsetPaginated> {
    const optionals: GetGroupCollaborationsOptionals =
      new GetGroupCollaborationsOptionals({
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
            '/2.0/groups/',
            toString(groupId) as string,
            '/collaborations',
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
      ...deserializeCollaborationsOffsetPaginated(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ListCollaborationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetCollaborationsQueryParamsStatusField(
  val: GetCollaborationsQueryParamsStatusField,
): SerializedData {
  return val;
}
export function deserializeGetCollaborationsQueryParamsStatusField(
  val: SerializedData,
): GetCollaborationsQueryParamsStatusField {
  if (val == 'pending') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetCollaborationsQueryParamsStatusField",
  });
}
