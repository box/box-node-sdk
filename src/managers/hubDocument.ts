import { serializeHubDocumentPagesV2025R0 } from '../schemas/v2025R0/hubDocumentPagesV2025R0';
import { deserializeHubDocumentPagesV2025R0 } from '../schemas/v2025R0/hubDocumentPagesV2025R0';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { serializeHubDocumentBlocksV2025R0 } from '../schemas/v2025R0/hubDocumentBlocksV2025R0';
import { deserializeHubDocumentBlocksV2025R0 } from '../schemas/v2025R0/hubDocumentBlocksV2025R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { HubDocumentPagesV2025R0 } from '../schemas/v2025R0/hubDocumentPagesV2025R0';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { HubDocumentBlocksV2025R0 } from '../schemas/v2025R0/hubDocumentBlocksV2025R0';
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
export class GetHubDocumentPagesV2025R0Optionals {
  readonly headers: GetHubDocumentPagesV2025R0Headers =
    new GetHubDocumentPagesV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetHubDocumentPagesV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetHubDocumentPagesV2025R0Optionals,
          'headers' | 'cancellationToken'
        >
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
export interface GetHubDocumentPagesV2025R0OptionalsInput {
  readonly headers?: GetHubDocumentPagesV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class GetHubDocumentBlocksV2025R0Optionals {
  readonly headers: GetHubDocumentBlocksV2025R0Headers =
    new GetHubDocumentBlocksV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetHubDocumentBlocksV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetHubDocumentBlocksV2025R0Optionals,
          'headers' | 'cancellationToken'
        >
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
export interface GetHubDocumentBlocksV2025R0OptionalsInput {
  readonly headers?: GetHubDocumentBlocksV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export interface GetHubDocumentPagesV2025R0QueryParams {
  /**
   * The unique identifier that represent a hub.
   *
   * The ID for any hub can be determined
   * by visiting this hub in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/hubs/123`
   * the `hub_id` is `123`. */
  readonly hubId: string;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetHubDocumentPagesV2025R0Headers {
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
      GetHubDocumentPagesV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetHubDocumentPagesV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetHubDocumentPagesV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetHubDocumentBlocksV2025R0QueryParams {
  /**
   * The unique identifier that represent a hub.
   *
   * The ID for any hub can be determined
   * by visiting this hub in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/hubs/123`
   * the `hub_id` is `123`. */
  readonly hubId: string;
  /**
   * The unique identifier of a page within the Box Hub. */
  readonly pageId: string;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetHubDocumentBlocksV2025R0Headers {
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
      GetHubDocumentBlocksV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetHubDocumentBlocksV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetHubDocumentBlocksV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class HubDocumentManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      HubDocumentManager,
      | 'networkSession'
      | 'getHubDocumentPagesV2025R0'
      | 'getHubDocumentBlocksV2025R0'
    > &
      Partial<Pick<HubDocumentManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves a list of Hub Document Pages for the specified hub.
   * Includes both root-level pages and sub pages.
   * @param {GetHubDocumentPagesV2025R0QueryParams} queryParams Query parameters of getHubDocumentPagesV2025R0 method
   * @param {GetHubDocumentPagesV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<HubDocumentPagesV2025R0>}
   */
  async getHubDocumentPagesV2025R0(
    queryParams: GetHubDocumentPagesV2025R0QueryParams,
    optionalsInput: GetHubDocumentPagesV2025R0OptionalsInput = {},
  ): Promise<HubDocumentPagesV2025R0> {
    const optionals: GetHubDocumentPagesV2025R0Optionals =
      new GetHubDocumentPagesV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['hub_id']: toString(queryParams.hubId) as string,
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
            '/2.0/hub_document_pages',
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
      ...deserializeHubDocumentPagesV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves a sorted list of all Hub Document Blocks on a specified page in the hub document, excluding items.
   * Blocks are hierarchically organized by their `parent_id`.
   * Blocks are sorted in order based on user specification in the user interface.
   * The response will only include content blocks that belong to the specified page. This will not include sub pages or sub page content blocks.
   * @param {GetHubDocumentBlocksV2025R0QueryParams} queryParams Query parameters of getHubDocumentBlocksV2025R0 method
   * @param {GetHubDocumentBlocksV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<HubDocumentBlocksV2025R0>}
   */
  async getHubDocumentBlocksV2025R0(
    queryParams: GetHubDocumentBlocksV2025R0QueryParams,
    optionalsInput: GetHubDocumentBlocksV2025R0OptionalsInput = {},
  ): Promise<HubDocumentBlocksV2025R0> {
    const optionals: GetHubDocumentBlocksV2025R0Optionals =
      new GetHubDocumentBlocksV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['hub_id']: toString(queryParams.hubId) as string,
      ['page_id']: toString(queryParams.pageId) as string,
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
            '/2.0/hub_document_blocks',
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
      ...deserializeHubDocumentBlocksV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface HubDocumentManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
