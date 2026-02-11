import { serializeSignRequest } from '../schemas/signRequest';
import { deserializeSignRequest } from '../schemas/signRequest';
import { serializeClientError } from '../schemas/clientError';
import { deserializeClientError } from '../schemas/clientError';
import { serializeSignRequestCancelRequest } from '../schemas/signRequestCancelRequest';
import { deserializeSignRequestCancelRequest } from '../schemas/signRequestCancelRequest';
import { serializeSignRequests } from '../schemas/signRequests';
import { deserializeSignRequests } from '../schemas/signRequests';
import { serializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest';
import { deserializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest';
import { ResponseFormat } from '../networking/fetchOptions';
import { SignRequest } from '../schemas/signRequest';
import { ClientError } from '../schemas/clientError';
import { SignRequestCancelRequest } from '../schemas/signRequestCancelRequest';
import { SignRequests } from '../schemas/signRequests';
import { SignRequestCreateRequest } from '../schemas/signRequestCreateRequest';
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
export class CancelSignRequestOptionals {
  readonly requestBody?: SignRequestCancelRequest = void 0;
  readonly headers: CancelSignRequestHeaders = new CancelSignRequestHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CancelSignRequestOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CancelSignRequestOptionals,
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
export interface CancelSignRequestOptionalsInput {
  readonly requestBody?: SignRequestCancelRequest;
  readonly headers?: CancelSignRequestHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class ResendSignRequestOptionals {
  readonly headers: ResendSignRequestHeaders = new ResendSignRequestHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<ResendSignRequestOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<ResendSignRequestOptionals, 'headers' | 'cancellationToken'>
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
export interface ResendSignRequestOptionalsInput {
  readonly headers?: ResendSignRequestHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetSignRequestByIdOptionals {
  readonly headers: GetSignRequestByIdHeaders = new GetSignRequestByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetSignRequestByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<GetSignRequestByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetSignRequestByIdOptionalsInput {
  readonly headers?: GetSignRequestByIdHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class CreateSignRequestOptionals {
  readonly headers: CreateSignRequestHeaders = new CreateSignRequestHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateSignRequestOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<CreateSignRequestOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateSignRequestOptionalsInput {
  readonly headers?: CreateSignRequestHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class CancelSignRequestHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CancelSignRequestHeaders, 'extraHeaders'> &
      Partial<Pick<CancelSignRequestHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CancelSignRequestHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class ResendSignRequestHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<ResendSignRequestHeaders, 'extraHeaders'> &
      Partial<Pick<ResendSignRequestHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface ResendSignRequestHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetSignRequestByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSignRequestByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetSignRequestByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSignRequestByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetSignRequestsQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * A list of sender emails to filter the signature requests by sender.
   * If provided, `shared_requests` must be set to `true`. */
  readonly senders?: readonly string[];
  /**
   * If set to `true`, only includes requests that user is not an owner,
   * but user is a collaborator. Collaborator access is determined by the
   * user access level of the sign files of the request.
   * Default is `false`. Must be set to `true` if `senders` are provided. */
  readonly sharedRequests?: boolean;
}
export class GetSignRequestsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSignRequestsHeaders, 'extraHeaders'> &
      Partial<Pick<GetSignRequestsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSignRequestsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class CreateSignRequestHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateSignRequestHeaders, 'extraHeaders'> &
      Partial<Pick<CreateSignRequestHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateSignRequestHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class SignRequestsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SignRequestsManager,
      | 'networkSession'
      | 'cancelSignRequest'
      | 'resendSignRequest'
      | 'getSignRequestById'
      | 'getSignRequests'
      | 'createSignRequest'
    > &
      Partial<Pick<SignRequestsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Cancels a sign request.
     * @param {string} signRequestId The ID of the signature request.
    Example: "33243242"
     * @param {CancelSignRequestOptionalsInput} optionalsInput
     * @returns {Promise<SignRequest>}
     */
  async cancelSignRequest(
    signRequestId: string,
    optionalsInput: CancelSignRequestOptionalsInput = {},
  ): Promise<SignRequest> {
    const optionals: CancelSignRequestOptionals =
      new CancelSignRequestOptionals({
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
            '/2.0/sign_requests/',
            (toString(signRequestId) as string)!,
            '/cancel',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: !(requestBody == void 0)
            ? serializeSignRequestCancelRequest(requestBody)
            : void 0,
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeSignRequest(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Resends a signature request email to all outstanding signers.
     * @param {string} signRequestId The ID of the signature request.
    Example: "33243242"
     * @param {ResendSignRequestOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async resendSignRequest(
    signRequestId: string,
    optionalsInput: ResendSignRequestOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: ResendSignRequestOptionals =
      new ResendSignRequestOptionals({
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
            '/2.0/sign_requests/',
            (toString(signRequestId) as string)!,
            '/resend',
          ) as string,
          method: 'POST',
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
     * Gets a sign request by ID.
     * @param {string} signRequestId The ID of the signature request.
    Example: "33243242"
     * @param {GetSignRequestByIdOptionalsInput} optionalsInput
     * @returns {Promise<SignRequest>}
     */
  async getSignRequestById(
    signRequestId: string,
    optionalsInput: GetSignRequestByIdOptionalsInput = {},
  ): Promise<SignRequest> {
    const optionals: GetSignRequestByIdOptionals =
      new GetSignRequestByIdOptionals({
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
            '/2.0/sign_requests/',
            (toString(signRequestId) as string)!,
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
      ...deserializeSignRequest(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Gets signature requests created by a user. If the `sign_files` and/or
   * `parent_folder` are deleted, the signature request will not return in the list.
   * @param {GetSignRequestsQueryParams} queryParams Query parameters of getSignRequests method
   * @param {GetSignRequestsHeadersInput} headersInput Headers of getSignRequests method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<SignRequests>}
   */
  async getSignRequests(
    queryParams: GetSignRequestsQueryParams = {} satisfies GetSignRequestsQueryParams,
    headersInput: GetSignRequestsHeadersInput = new GetSignRequestsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<SignRequests> {
    const headers: GetSignRequestsHeaders = new GetSignRequestsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['senders']: queryParams.senders
        ? queryParams.senders.map(toString).join(',')
        : undefined,
      ['shared_requests']: toString(queryParams.sharedRequests) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/sign_requests',
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
      ...deserializeSignRequests(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a signature request. This involves preparing a document for signing and
   * sending the signature request to signers.
   * @param {SignRequestCreateRequest} requestBody Request body of createSignRequest method
   * @param {CreateSignRequestOptionalsInput} optionalsInput
   * @returns {Promise<SignRequest>}
   */
  async createSignRequest(
    requestBody: SignRequestCreateRequest,
    optionalsInput: CreateSignRequestOptionalsInput = {},
  ): Promise<SignRequest> {
    const optionals: CreateSignRequestOptionals =
      new CreateSignRequestOptionals({
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
            '/2.0/sign_requests',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeSignRequestCreateRequest(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeSignRequest(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SignRequestsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
