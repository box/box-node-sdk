import { serializeRecentItems } from '../schemas/recentItems';
import { deserializeRecentItems } from '../schemas/recentItems';
import { serializeClientError } from '../schemas/clientError';
import { deserializeClientError } from '../schemas/clientError';
import { ResponseFormat } from '../networking/fetchOptions';
import { RecentItems } from '../schemas/recentItems';
import { ClientError } from '../schemas/clientError';
import { BoxSdkError } from '../box/errors';
import { Authentication } from '../networking/auth';
import { NetworkSession } from '../networking/network';
import { FetchOptions } from '../networking/fetchOptions';
import { FetchResponse } from '../networking/fetchResponse';
import { prepareParams } from '../internal/utils';
import { toString } from '../internal/utils';
import { ByteStream } from '../internal/utils';
import { CancellationToken } from '../internal/utils';
import { sdToJson } from '../serialization/json';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface GetRecentItemsQueryParams {
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
export class GetRecentItemsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetRecentItemsHeaders, 'extraHeaders'> &
      Partial<Pick<GetRecentItemsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetRecentItemsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class RecentItemsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<RecentItemsManager, 'networkSession' | 'getRecentItems'> &
      Partial<Pick<RecentItemsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns information about the recent items accessed
   * by a user, either in the last 90 days or up to the last
   * 1000 items accessed.
   * @param {GetRecentItemsQueryParams} queryParams Query parameters of getRecentItems method
   * @param {GetRecentItemsHeadersInput} headersInput Headers of getRecentItems method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<RecentItems>}
   */
  async getRecentItems(
    queryParams: GetRecentItemsQueryParams = {} satisfies GetRecentItemsQueryParams,
    headersInput: GetRecentItemsHeadersInput = new GetRecentItemsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<RecentItems> {
    const headers: GetRecentItemsHeaders = new GetRecentItemsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
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
            '/2.0/recent_items',
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
      ...deserializeRecentItems(response.data!),
      rawData: response.data!,
    };
  }
}
export interface RecentItemsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
