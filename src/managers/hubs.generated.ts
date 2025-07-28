import { serializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { deserializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { serializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { deserializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { serializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { deserializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { serializeHubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { deserializeHubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { serializeHubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
import { deserializeHubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { HubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { HubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { HubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { HubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { HubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
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
export class CreateHubV2025R0Optionals {
  readonly headers: CreateHubV2025R0Headers = new CreateHubV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateHubV2025R0Optionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateHubV2025R0Optionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateHubV2025R0OptionalsInput {
  readonly headers?: CreateHubV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetHubByIdV2025R0Optionals {
  readonly headers: GetHubByIdV2025R0Headers = new GetHubByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetHubByIdV2025R0Optionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<GetHubByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface GetHubByIdV2025R0OptionalsInput {
  readonly headers?: GetHubByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateHubByIdV2025R0Optionals {
  readonly headers: UpdateHubByIdV2025R0Headers =
    new UpdateHubByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateHubByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateHubByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface UpdateHubByIdV2025R0OptionalsInput {
  readonly headers?: UpdateHubByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteHubByIdV2025R0Optionals {
  readonly headers: DeleteHubByIdV2025R0Headers =
    new DeleteHubByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteHubByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteHubByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface DeleteHubByIdV2025R0OptionalsInput {
  readonly headers?: DeleteHubByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CopyHubV2025R0Optionals {
  readonly headers: CopyHubV2025R0Headers = new CopyHubV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CopyHubV2025R0Optionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CopyHubV2025R0Optionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CopyHubV2025R0OptionalsInput {
  readonly headers?: CopyHubV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetHubsV2025R0QueryParamsDirectionField = 'ASC' | 'DESC' | string;
export interface GetHubsV2025R0QueryParams {
  /**
   * The query string to search for hubs. */
  readonly query?: string;
  /**
   * The scope of the hubs to retrieve. Possible values include `editable`,
   * `view_only`, and `all`. Default is `all`. */
  readonly scope?: string;
  /**
   * The field to sort results by.
   * Possible values include `name`, `updated_at`,
   * `last_accessed_at`, `view_count`, and `relevance`.
   * Default is `relevance`. */
  readonly sort?: string;
  /**
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetHubsV2025R0QueryParamsDirectionField;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetHubsV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetHubsV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<GetHubsV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetHubsV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateHubV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateHubV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<CreateHubV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateHubV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetEnterpriseHubsV2025R0QueryParamsDirectionField =
  | 'ASC'
  | 'DESC'
  | string;
export interface GetEnterpriseHubsV2025R0QueryParams {
  /**
   * The query string to search for hubs. */
  readonly query?: string;
  /**
   * The field to sort results by.
   * Possible values include `name`, `updated_at`,
   * `last_accessed_at`, `view_count`, and `relevance`.
   * Default is `relevance`. */
  readonly sort?: string;
  /**
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetEnterpriseHubsV2025R0QueryParamsDirectionField;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetEnterpriseHubsV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetEnterpriseHubsV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetEnterpriseHubsV2025R0Headers, 'boxVersion' | 'extraHeaders'>
      >,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetEnterpriseHubsV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetHubByIdV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<GetHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetHubByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class UpdateHubByIdV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<UpdateHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateHubByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteHubByIdV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<DeleteHubByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteHubByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CopyHubV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CopyHubV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<CopyHubV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CopyHubV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class HubsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      HubsManager,
      | 'networkSession'
      | 'getHubsV2025R0'
      | 'createHubV2025R0'
      | 'getEnterpriseHubsV2025R0'
      | 'getHubByIdV2025R0'
      | 'updateHubByIdV2025R0'
      | 'deleteHubByIdV2025R0'
      | 'copyHubV2025R0'
    > &
      Partial<Pick<HubsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all hubs for requesting user.
   * @param {GetHubsV2025R0QueryParams} queryParams Query parameters of getHubsV2025R0 method
   * @param {GetHubsV2025R0HeadersInput} headersInput Headers of getHubsV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<HubsV2025R0>}
   */
  async getHubsV2025R0(
    queryParams: GetHubsV2025R0QueryParams = {} satisfies GetHubsV2025R0QueryParams,
    headersInput: GetHubsV2025R0HeadersInput = new GetHubsV2025R0Headers({}),
    cancellationToken?: CancellationToken,
  ): Promise<HubsV2025R0> {
    const headers: GetHubsV2025R0Headers = new GetHubsV2025R0Headers({
      boxVersion: headersInput.boxVersion,
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['query']: toString(queryParams.query) as string,
      ['scope']: toString(queryParams.scope) as string,
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs',
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
      ...deserializeHubsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new Hub.
   * @param {HubCreateRequestV2025R0} requestBody Request body of createHubV2025R0 method
   * @param {CreateHubV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<HubV2025R0>}
   */
  async createHubV2025R0(
    requestBody: HubCreateRequestV2025R0,
    optionalsInput: CreateHubV2025R0OptionalsInput = {},
  ): Promise<HubV2025R0> {
    const optionals: CreateHubV2025R0Optionals = new CreateHubV2025R0Optionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeHubCreateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeHubV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves all hubs for a given enterprise.
   *
   * Admins or Hub Co-admins of an enterprise
   * with GCM scope can make this call.
   * @param {GetEnterpriseHubsV2025R0QueryParams} queryParams Query parameters of getEnterpriseHubsV2025R0 method
   * @param {GetEnterpriseHubsV2025R0HeadersInput} headersInput Headers of getEnterpriseHubsV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<HubsV2025R0>}
   */
  async getEnterpriseHubsV2025R0(
    queryParams: GetEnterpriseHubsV2025R0QueryParams = {} satisfies GetEnterpriseHubsV2025R0QueryParams,
    headersInput: GetEnterpriseHubsV2025R0HeadersInput = new GetEnterpriseHubsV2025R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<HubsV2025R0> {
    const headers: GetEnterpriseHubsV2025R0Headers =
      new GetEnterpriseHubsV2025R0Headers({
        boxVersion: headersInput.boxVersion,
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['query']: toString(queryParams.query) as string,
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/enterprise_hubs',
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
      ...deserializeHubsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves details for a hub by its ID.
     * @param {string} hubId The unique identifier that represent a hub.
    
    The ID for any hub can be determined
    by visiting this hub in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/hubs/123`
    the `hub_id` is `123`.
    Example: "12345"
     * @param {GetHubByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<HubV2025R0>}
     */
  async getHubByIdV2025R0(
    hubId: string,
    optionalsInput: GetHubByIdV2025R0OptionalsInput = {},
  ): Promise<HubV2025R0> {
    const optionals: GetHubByIdV2025R0Optionals =
      new GetHubByIdV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs/',
            toString(hubId) as string,
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
      ...deserializeHubV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a Hub. Can be used to change title, description, or Hub settings.
     * @param {string} hubId The unique identifier that represent a hub.
    
    The ID for any hub can be determined
    by visiting this hub in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/hubs/123`
    the `hub_id` is `123`.
    Example: "12345"
     * @param {HubUpdateRequestV2025R0} requestBody Request body of updateHubByIdV2025R0 method
     * @param {UpdateHubByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<HubV2025R0>}
     */
  async updateHubByIdV2025R0(
    hubId: string,
    requestBody: HubUpdateRequestV2025R0,
    optionalsInput: UpdateHubByIdV2025R0OptionalsInput = {},
  ): Promise<HubV2025R0> {
    const optionals: UpdateHubByIdV2025R0Optionals =
      new UpdateHubByIdV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs/',
            toString(hubId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeHubUpdateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeHubV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a single hub.
     * @param {string} hubId The unique identifier that represent a hub.
    
    The ID for any hub can be determined
    by visiting this hub in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/hubs/123`
    the `hub_id` is `123`.
    Example: "12345"
     * @param {DeleteHubByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteHubByIdV2025R0(
    hubId: string,
    optionalsInput: DeleteHubByIdV2025R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteHubByIdV2025R0Optionals =
      new DeleteHubByIdV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs/',
            toString(hubId) as string,
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
     * Creates a copy of a Hub.
     *
     * The original Hub will not be modified.
     * @param {string} hubId The unique identifier that represent a hub.
    
    The ID for any hub can be determined
    by visiting this hub in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/hubs/123`
    the `hub_id` is `123`.
    Example: "12345"
     * @param {HubCopyRequestV2025R0} requestBody Request body of copyHubV2025R0 method
     * @param {CopyHubV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<HubV2025R0>}
     */
  async copyHubV2025R0(
    hubId: string,
    requestBody: HubCopyRequestV2025R0,
    optionalsInput: CopyHubV2025R0OptionalsInput = {},
  ): Promise<HubV2025R0> {
    const optionals: CopyHubV2025R0Optionals = new CopyHubV2025R0Optionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/hubs/',
            toString(hubId) as string,
            '/copy',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeHubCopyRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeHubV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface HubsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetHubsV2025R0QueryParamsDirectionField(
  val: GetHubsV2025R0QueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetHubsV2025R0QueryParamsDirectionField(
  val: SerializedData,
): GetHubsV2025R0QueryParamsDirectionField {
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
    message: "Can't deserialize GetHubsV2025R0QueryParamsDirectionField",
  });
}
export function serializeGetEnterpriseHubsV2025R0QueryParamsDirectionField(
  val: GetEnterpriseHubsV2025R0QueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetEnterpriseHubsV2025R0QueryParamsDirectionField(
  val: SerializedData,
): GetEnterpriseHubsV2025R0QueryParamsDirectionField {
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
    message:
      "Can't deserialize GetEnterpriseHubsV2025R0QueryParamsDirectionField",
  });
}
