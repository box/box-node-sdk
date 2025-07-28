import { serializeHubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.generated.js';
import { deserializeHubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.generated.js';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { serializeHubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.generated.js';
import { deserializeHubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.generated.js';
import { serializeHubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.generated.js';
import { deserializeHubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.generated.js';
import { serializeHubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.generated.js';
import { deserializeHubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { HubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.generated.js';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { HubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.generated.js';
import { HubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.generated.js';
import { HubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.generated.js';
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
export class GetHubCollaborationsV2025R0Optionals {
  readonly headers: GetHubCollaborationsV2025R0Headers =
    new GetHubCollaborationsV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetHubCollaborationsV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetHubCollaborationsV2025R0Optionals,
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
export interface GetHubCollaborationsV2025R0OptionalsInput {
  readonly headers?: GetHubCollaborationsV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateHubCollaborationV2025R0Optionals {
  readonly headers: CreateHubCollaborationV2025R0Headers =
    new CreateHubCollaborationV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateHubCollaborationV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateHubCollaborationV2025R0Optionals,
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
export interface CreateHubCollaborationV2025R0OptionalsInput {
  readonly headers?: CreateHubCollaborationV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetHubCollaborationByIdV2025R0Optionals {
  readonly headers: GetHubCollaborationByIdV2025R0Headers =
    new GetHubCollaborationByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetHubCollaborationByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetHubCollaborationByIdV2025R0Optionals,
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
export interface GetHubCollaborationByIdV2025R0OptionalsInput {
  readonly headers?: GetHubCollaborationByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateHubCollaborationByIdV2025R0Optionals {
  readonly headers: UpdateHubCollaborationByIdV2025R0Headers =
    new UpdateHubCollaborationByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateHubCollaborationByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateHubCollaborationByIdV2025R0Optionals,
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
export interface UpdateHubCollaborationByIdV2025R0OptionalsInput {
  readonly headers?: UpdateHubCollaborationByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteHubCollaborationByIdV2025R0Optionals {
  readonly headers: DeleteHubCollaborationByIdV2025R0Headers =
    new DeleteHubCollaborationByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteHubCollaborationByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteHubCollaborationByIdV2025R0Optionals,
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
export interface DeleteHubCollaborationByIdV2025R0OptionalsInput {
  readonly headers?: DeleteHubCollaborationByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetHubCollaborationsV2025R0QueryParams {
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
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetHubCollaborationsV2025R0Headers {
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
      GetHubCollaborationsV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetHubCollaborationsV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetHubCollaborationsV2025R0HeadersInput {
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
export class CreateHubCollaborationV2025R0Headers {
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
      CreateHubCollaborationV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          CreateHubCollaborationV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface CreateHubCollaborationV2025R0HeadersInput {
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
export class GetHubCollaborationByIdV2025R0Headers {
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
      GetHubCollaborationByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          GetHubCollaborationByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface GetHubCollaborationByIdV2025R0HeadersInput {
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
export class UpdateHubCollaborationByIdV2025R0Headers {
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
      UpdateHubCollaborationByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          UpdateHubCollaborationByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface UpdateHubCollaborationByIdV2025R0HeadersInput {
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
export class DeleteHubCollaborationByIdV2025R0Headers {
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
      DeleteHubCollaborationByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          DeleteHubCollaborationByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface DeleteHubCollaborationByIdV2025R0HeadersInput {
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
export class HubCollaborationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      HubCollaborationsManager,
      | 'networkSession'
      | 'getHubCollaborationsV2025R0'
      | 'createHubCollaborationV2025R0'
      | 'getHubCollaborationByIdV2025R0'
      | 'updateHubCollaborationByIdV2025R0'
      | 'deleteHubCollaborationByIdV2025R0'
    > &
      Partial<Pick<HubCollaborationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all collaborations for a hub.
   * @param {GetHubCollaborationsV2025R0QueryParams} queryParams Query parameters of getHubCollaborationsV2025R0 method
   * @param {GetHubCollaborationsV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<HubCollaborationsV2025R0>}
   */
  async getHubCollaborationsV2025R0(
    queryParams: GetHubCollaborationsV2025R0QueryParams,
    optionalsInput: GetHubCollaborationsV2025R0OptionalsInput = {},
  ): Promise<HubCollaborationsV2025R0> {
    const optionals: GetHubCollaborationsV2025R0Optionals =
      new GetHubCollaborationsV2025R0Optionals({
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
            '/2.0/hub_collaborations',
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
      ...deserializeHubCollaborationsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Adds a collaboration for a single user or a single group to a hub.
   *
   * Collaborations can be created using email address, user IDs, or group IDs.
   * @param {HubCollaborationCreateRequestV2025R0} requestBody Request body of createHubCollaborationV2025R0 method
   * @param {CreateHubCollaborationV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<HubCollaborationV2025R0>}
   */
  async createHubCollaborationV2025R0(
    requestBody: HubCollaborationCreateRequestV2025R0,
    optionalsInput: CreateHubCollaborationV2025R0OptionalsInput = {},
  ): Promise<HubCollaborationV2025R0> {
    const optionals: CreateHubCollaborationV2025R0Optionals =
      new CreateHubCollaborationV2025R0Optionals({
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
            '/2.0/hub_collaborations',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeHubCollaborationCreateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeHubCollaborationV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves details for a hub collaboration by collaboration ID.
     * @param {string} hubCollaborationId The ID of the hub collaboration.
    Example: "1234"
     * @param {GetHubCollaborationByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<HubCollaborationV2025R0>}
     */
  async getHubCollaborationByIdV2025R0(
    hubCollaborationId: string,
    optionalsInput: GetHubCollaborationByIdV2025R0OptionalsInput = {},
  ): Promise<HubCollaborationV2025R0> {
    const optionals: GetHubCollaborationByIdV2025R0Optionals =
      new GetHubCollaborationByIdV2025R0Optionals({
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
            '/2.0/hub_collaborations/',
            toString(hubCollaborationId) as string,
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
      ...deserializeHubCollaborationV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a hub collaboration.
     * Can be used to change the hub role.
     * @param {string} hubCollaborationId The ID of the hub collaboration.
    Example: "1234"
     * @param {HubCollaborationUpdateRequestV2025R0} requestBody Request body of updateHubCollaborationByIdV2025R0 method
     * @param {UpdateHubCollaborationByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<HubCollaborationV2025R0>}
     */
  async updateHubCollaborationByIdV2025R0(
    hubCollaborationId: string,
    requestBody: HubCollaborationUpdateRequestV2025R0,
    optionalsInput: UpdateHubCollaborationByIdV2025R0OptionalsInput = {},
  ): Promise<HubCollaborationV2025R0> {
    const optionals: UpdateHubCollaborationByIdV2025R0Optionals =
      new UpdateHubCollaborationByIdV2025R0Optionals({
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
            '/2.0/hub_collaborations/',
            toString(hubCollaborationId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeHubCollaborationUpdateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeHubCollaborationV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a single hub collaboration.
     * @param {string} hubCollaborationId The ID of the hub collaboration.
    Example: "1234"
     * @param {DeleteHubCollaborationByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteHubCollaborationByIdV2025R0(
    hubCollaborationId: string,
    optionalsInput: DeleteHubCollaborationByIdV2025R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteHubCollaborationByIdV2025R0Optionals =
      new DeleteHubCollaborationByIdV2025R0Optionals({
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
            '/2.0/hub_collaborations/',
            toString(hubCollaborationId) as string,
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
export interface HubCollaborationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
