import { serializeItems } from '../schemas/items.generated.js';
import { deserializeItems } from '../schemas/items.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Items } from '../schemas/items.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
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
export type GetTrashedItemsQueryParamsDirectionField = 'ASC' | 'DESC' | string;
export type GetTrashedItemsQueryParamsSortField =
  | 'name'
  | 'date'
  | 'size'
  | string;
export interface GetTrashedItemsQueryParams {
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
  /**
   * Specifies whether to use marker-based pagination instead of
   * offset-based pagination. Only one pagination method can
   * be used at a time.
   *
   * By setting this value to true, the API will return a `marker` field
   * that can be passed as a parameter to this endpoint to get the next
   * page of the response. */
  readonly usemarker?: boolean;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetTrashedItemsQueryParamsDirectionField;
  /**
   * Defines the **second** attribute by which items
   * are sorted.
   *
   * Items are always sorted by their `type` first, with
   * folders listed before files, and files listed
   * before web links.
   *
   * This parameter is not supported when using marker-based pagination. */
  readonly sort?: GetTrashedItemsQueryParamsSortField;
}
export class GetTrashedItemsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTrashedItemsHeaders, 'extraHeaders'> &
      Partial<Pick<GetTrashedItemsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTrashedItemsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TrashedItemsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<TrashedItemsManager, 'networkSession' | 'getTrashedItems'> &
      Partial<Pick<TrashedItemsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves the files and folders that have been moved
   * to the trash.
   *
   * Any attribute in the full files or folders objects can be passed
   * in with the `fields` parameter to retrieve those specific
   * attributes that are not returned by default.
   *
   * This endpoint defaults to use offset-based pagination, yet also supports
   * marker-based pagination using the `marker` parameter.
   * @param {GetTrashedItemsQueryParams} queryParams Query parameters of getTrashedItems method
   * @param {GetTrashedItemsHeadersInput} headersInput Headers of getTrashedItems method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<Items>}
   */
  async getTrashedItems(
    queryParams: GetTrashedItemsQueryParams = {} satisfies GetTrashedItemsQueryParams,
    headersInput: GetTrashedItemsHeadersInput = new GetTrashedItemsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<Items> {
    const headers: GetTrashedItemsHeaders = new GetTrashedItemsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['limit']: toString(queryParams.limit) as string,
      ['offset']: toString(queryParams.offset) as string,
      ['usemarker']: toString(queryParams.usemarker) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['sort']: toString(queryParams.sort) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/folders/trash/items',
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
      ...deserializeItems(response.data!),
      rawData: response.data!,
    };
  }
}
export interface TrashedItemsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetTrashedItemsQueryParamsDirectionField(
  val: GetTrashedItemsQueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetTrashedItemsQueryParamsDirectionField(
  val: SerializedData,
): GetTrashedItemsQueryParamsDirectionField {
  if (val == 'ASC') {
    return val;
  }
  if (val == 'DESC') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetTrashedItemsQueryParamsDirectionField",
  });
}
export function serializeGetTrashedItemsQueryParamsSortField(
  val: GetTrashedItemsQueryParamsSortField,
): SerializedData {
  return val;
}
export function deserializeGetTrashedItemsQueryParamsSortField(
  val: SerializedData,
): GetTrashedItemsQueryParamsSortField {
  if (val == 'name') {
    return val;
  }
  if (val == 'date') {
    return val;
  }
  if (val == 'size') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetTrashedItemsQueryParamsSortField",
  });
}
