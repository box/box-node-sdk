import { serializeTermsOfServices } from '../schemas/termsOfServices.generated.js';
import { deserializeTermsOfServices } from '../schemas/termsOfServices.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTermsOfService } from '../schemas/termsOfService.generated.js';
import { deserializeTermsOfService } from '../schemas/termsOfService.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { TermsOfServices } from '../schemas/termsOfServices.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { TermsOfService } from '../schemas/termsOfService.generated.js';
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
export class CreateTermsOfServiceOptionals {
  readonly headers: CreateTermsOfServiceHeaders =
    new CreateTermsOfServiceHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateTermsOfServiceOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateTermsOfServiceOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateTermsOfServiceOptionalsInput {
  readonly headers?: CreateTermsOfServiceHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTermsOfServiceByIdOptionals {
  readonly headers: GetTermsOfServiceByIdHeaders =
    new GetTermsOfServiceByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetTermsOfServiceByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetTermsOfServiceByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetTermsOfServiceByIdOptionalsInput {
  readonly headers?: GetTermsOfServiceByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateTermsOfServiceByIdOptionals {
  readonly headers: UpdateTermsOfServiceByIdHeaders =
    new UpdateTermsOfServiceByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateTermsOfServiceByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateTermsOfServiceByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateTermsOfServiceByIdOptionalsInput {
  readonly headers?: UpdateTermsOfServiceByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetTermsOfServiceQueryParamsTosTypeField =
  | 'external'
  | 'managed'
  | string;
export interface GetTermsOfServiceQueryParams {
  /**
   * Limits the results to the terms of service of the given type. */
  readonly tosType?: GetTermsOfServiceQueryParamsTosTypeField;
}
export class GetTermsOfServiceHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTermsOfServiceHeaders, 'extraHeaders'> &
      Partial<Pick<GetTermsOfServiceHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTermsOfServiceHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateTermsOfServiceRequestBodyStatusField =
  | 'enabled'
  | 'disabled'
  | string;
export type CreateTermsOfServiceRequestBodyTosTypeField =
  | 'external'
  | 'managed'
  | string;
export interface CreateTermsOfServiceRequestBody {
  /**
   * Whether this terms of service is active. */
  readonly status: CreateTermsOfServiceRequestBodyStatusField;
  /**
   * The type of user to set the terms of
   * service for. */
  readonly tosType?: CreateTermsOfServiceRequestBodyTosTypeField;
  /**
   * The terms of service text to display to users.
   *
   * The text can be set to empty if the `status` is set to `disabled`. */
  readonly text: string;
  readonly rawData?: SerializedData;
}
export class CreateTermsOfServiceHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateTermsOfServiceHeaders, 'extraHeaders'> &
      Partial<Pick<CreateTermsOfServiceHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateTermsOfServiceHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetTermsOfServiceByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTermsOfServiceByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTermsOfServiceByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTermsOfServiceByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateTermsOfServiceByIdRequestBodyStatusField =
  | 'enabled'
  | 'disabled'
  | string;
export interface UpdateTermsOfServiceByIdRequestBody {
  /**
   * Whether this terms of service is active. */
  readonly status: UpdateTermsOfServiceByIdRequestBodyStatusField;
  /**
   * The terms of service text to display to users.
   *
   * The text can be set to empty if the `status` is set to `disabled`. */
  readonly text: string;
  readonly rawData?: SerializedData;
}
export class UpdateTermsOfServiceByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateTermsOfServiceByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateTermsOfServiceByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateTermsOfServiceByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TermsOfServicesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TermsOfServicesManager,
      | 'networkSession'
      | 'getTermsOfService'
      | 'createTermsOfService'
      | 'getTermsOfServiceById'
      | 'updateTermsOfServiceById'
    > &
      Partial<Pick<TermsOfServicesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns the current terms of service text and settings
   * for the enterprise.
   * @param {GetTermsOfServiceQueryParams} queryParams Query parameters of getTermsOfService method
   * @param {GetTermsOfServiceHeadersInput} headersInput Headers of getTermsOfService method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<TermsOfServices>}
   */
  async getTermsOfService(
    queryParams: GetTermsOfServiceQueryParams = {} satisfies GetTermsOfServiceQueryParams,
    headersInput: GetTermsOfServiceHeadersInput = new GetTermsOfServiceHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<TermsOfServices> {
    const headers: GetTermsOfServiceHeaders = new GetTermsOfServiceHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['tos_type']: toString(queryParams.tosType) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/terms_of_services',
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
      ...deserializeTermsOfServices(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a terms of service for a given enterprise
   * and type of user.
   * @param {CreateTermsOfServiceRequestBody} requestBody Request body of createTermsOfService method
   * @param {CreateTermsOfServiceOptionalsInput} optionalsInput
   * @returns {Promise<TermsOfService>}
   */
  async createTermsOfService(
    requestBody: CreateTermsOfServiceRequestBody,
    optionalsInput: CreateTermsOfServiceOptionalsInput = {},
  ): Promise<TermsOfService> {
    const optionals: CreateTermsOfServiceOptionals =
      new CreateTermsOfServiceOptionals({
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
            '/2.0/terms_of_services',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateTermsOfServiceRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTermsOfService(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Fetches a specific terms of service.
     * @param {string} termsOfServiceId The ID of the terms of service.
    Example: "324234"
     * @param {GetTermsOfServiceByIdOptionalsInput} optionalsInput
     * @returns {Promise<TermsOfService>}
     */
  async getTermsOfServiceById(
    termsOfServiceId: string,
    optionalsInput: GetTermsOfServiceByIdOptionalsInput = {},
  ): Promise<TermsOfService> {
    const optionals: GetTermsOfServiceByIdOptionals =
      new GetTermsOfServiceByIdOptionals({
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
            '/2.0/terms_of_services/',
            toString(termsOfServiceId) as string,
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
      ...deserializeTermsOfService(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a specific terms of service.
     * @param {string} termsOfServiceId The ID of the terms of service.
    Example: "324234"
     * @param {UpdateTermsOfServiceByIdRequestBody} requestBody Request body of updateTermsOfServiceById method
     * @param {UpdateTermsOfServiceByIdOptionalsInput} optionalsInput
     * @returns {Promise<TermsOfService>}
     */
  async updateTermsOfServiceById(
    termsOfServiceId: string,
    requestBody: UpdateTermsOfServiceByIdRequestBody,
    optionalsInput: UpdateTermsOfServiceByIdOptionalsInput = {},
  ): Promise<TermsOfService> {
    const optionals: UpdateTermsOfServiceByIdOptionals =
      new UpdateTermsOfServiceByIdOptionals({
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
            '/2.0/terms_of_services/',
            toString(termsOfServiceId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateTermsOfServiceByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTermsOfService(response.data!),
      rawData: response.data!,
    };
  }
}
export interface TermsOfServicesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetTermsOfServiceQueryParamsTosTypeField(
  val: GetTermsOfServiceQueryParamsTosTypeField,
): SerializedData {
  return val;
}
export function deserializeGetTermsOfServiceQueryParamsTosTypeField(
  val: SerializedData,
): GetTermsOfServiceQueryParamsTosTypeField {
  if (val == 'external') {
    return val;
  }
  if (val == 'managed') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetTermsOfServiceQueryParamsTosTypeField",
  });
}
export function serializeCreateTermsOfServiceRequestBodyStatusField(
  val: CreateTermsOfServiceRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeCreateTermsOfServiceRequestBodyStatusField(
  val: SerializedData,
): CreateTermsOfServiceRequestBodyStatusField {
  if (val == 'enabled') {
    return val;
  }
  if (val == 'disabled') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTermsOfServiceRequestBodyStatusField",
  });
}
export function serializeCreateTermsOfServiceRequestBodyTosTypeField(
  val: CreateTermsOfServiceRequestBodyTosTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateTermsOfServiceRequestBodyTosTypeField(
  val: SerializedData,
): CreateTermsOfServiceRequestBodyTosTypeField {
  if (val == 'external') {
    return val;
  }
  if (val == 'managed') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTermsOfServiceRequestBodyTosTypeField",
  });
}
export function serializeCreateTermsOfServiceRequestBody(
  val: CreateTermsOfServiceRequestBody,
): SerializedData {
  return {
    ['status']: serializeCreateTermsOfServiceRequestBodyStatusField(val.status),
    ['tos_type']:
      val.tosType == void 0
        ? val.tosType
        : serializeCreateTermsOfServiceRequestBodyTosTypeField(val.tosType),
    ['text']: val.text,
  };
}
export function deserializeCreateTermsOfServiceRequestBody(
  val: SerializedData,
): CreateTermsOfServiceRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateTermsOfServiceRequestBody"',
    });
  }
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "CreateTermsOfServiceRequestBody" to be defined',
    });
  }
  const status: CreateTermsOfServiceRequestBodyStatusField =
    deserializeCreateTermsOfServiceRequestBodyStatusField(val.status);
  const tosType: undefined | CreateTermsOfServiceRequestBodyTosTypeField =
    val.tos_type == void 0
      ? void 0
      : deserializeCreateTermsOfServiceRequestBodyTosTypeField(val.tos_type);
  if (val.text == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "text" of type "CreateTermsOfServiceRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.text)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text" of type "CreateTermsOfServiceRequestBody"',
    });
  }
  const text: string = val.text;
  return {
    status: status,
    tosType: tosType,
    text: text,
  } satisfies CreateTermsOfServiceRequestBody;
}
export function serializeUpdateTermsOfServiceByIdRequestBodyStatusField(
  val: UpdateTermsOfServiceByIdRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeUpdateTermsOfServiceByIdRequestBodyStatusField(
  val: SerializedData,
): UpdateTermsOfServiceByIdRequestBodyStatusField {
  if (val == 'enabled') {
    return val;
  }
  if (val == 'disabled') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateTermsOfServiceByIdRequestBodyStatusField",
  });
}
export function serializeUpdateTermsOfServiceByIdRequestBody(
  val: UpdateTermsOfServiceByIdRequestBody,
): SerializedData {
  return {
    ['status']: serializeUpdateTermsOfServiceByIdRequestBodyStatusField(
      val.status,
    ),
    ['text']: val.text,
  };
}
export function deserializeUpdateTermsOfServiceByIdRequestBody(
  val: SerializedData,
): UpdateTermsOfServiceByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateTermsOfServiceByIdRequestBody"',
    });
  }
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "UpdateTermsOfServiceByIdRequestBody" to be defined',
    });
  }
  const status: UpdateTermsOfServiceByIdRequestBodyStatusField =
    deserializeUpdateTermsOfServiceByIdRequestBodyStatusField(val.status);
  if (val.text == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "text" of type "UpdateTermsOfServiceByIdRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.text)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text" of type "UpdateTermsOfServiceByIdRequestBody"',
    });
  }
  const text: string = val.text;
  return {
    status: status,
    text: text,
  } satisfies UpdateTermsOfServiceByIdRequestBody;
}
