import { serializeStoragePolicies } from '../schemas/storagePolicies';
import { deserializeStoragePolicies } from '../schemas/storagePolicies';
import { serializeClientError } from '../schemas/clientError';
import { deserializeClientError } from '../schemas/clientError';
import { serializeStoragePolicy } from '../schemas/storagePolicy';
import { deserializeStoragePolicy } from '../schemas/storagePolicy';
import { ResponseFormat } from '../networking/fetchOptions';
import { StoragePolicies } from '../schemas/storagePolicies';
import { ClientError } from '../schemas/clientError';
import { StoragePolicy } from '../schemas/storagePolicy';
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
export class GetStoragePolicyByIdOptionals {
  readonly headers: GetStoragePolicyByIdHeaders =
    new GetStoragePolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetStoragePolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetStoragePolicyByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetStoragePolicyByIdOptionalsInput {
  readonly headers?: GetStoragePolicyByIdHeaders;
  readonly cancellationToken?: CancellationToken;
}
export interface GetStoragePoliciesQueryParams {
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
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetStoragePoliciesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetStoragePoliciesHeaders, 'extraHeaders'> &
      Partial<Pick<GetStoragePoliciesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetStoragePoliciesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetStoragePolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetStoragePolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetStoragePolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetStoragePolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class StoragePoliciesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      StoragePoliciesManager,
      'networkSession' | 'getStoragePolicies' | 'getStoragePolicyById'
    > &
      Partial<Pick<StoragePoliciesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Fetches all the storage policies in the enterprise.
   * @param {GetStoragePoliciesQueryParams} queryParams Query parameters of getStoragePolicies method
   * @param {GetStoragePoliciesHeadersInput} headersInput Headers of getStoragePolicies method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<StoragePolicies>}
   */
  async getStoragePolicies(
    queryParams: GetStoragePoliciesQueryParams = {} satisfies GetStoragePoliciesQueryParams,
    headersInput: GetStoragePoliciesHeadersInput = new GetStoragePoliciesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<StoragePolicies> {
    const headers: GetStoragePoliciesHeaders = new GetStoragePoliciesHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['marker']: toString(queryParams.marker) as string,
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
            '/2.0/storage_policies',
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
      ...deserializeStoragePolicies(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Fetches a specific storage policy.
     * @param {string} storagePolicyId The ID of the storage policy.
    Example: "34342"
     * @param {GetStoragePolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<StoragePolicy>}
     */
  async getStoragePolicyById(
    storagePolicyId: string,
    optionalsInput: GetStoragePolicyByIdOptionalsInput = {},
  ): Promise<StoragePolicy> {
    const optionals: GetStoragePolicyByIdOptionals =
      new GetStoragePolicyByIdOptionals({
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
            '/2.0/storage_policies/',
            (toString(storagePolicyId) as string)!,
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
      ...deserializeStoragePolicy(response.data!),
      rawData: response.data!,
    };
  }
}
export interface StoragePoliciesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
