import { serializeDevicePinner } from '../schemas/devicePinner.generated.js';
import { deserializeDevicePinner } from '../schemas/devicePinner.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeDevicePinners } from '../schemas/devicePinners.generated.js';
import { deserializeDevicePinners } from '../schemas/devicePinners.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { DevicePinner } from '../schemas/devicePinner.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { DevicePinners } from '../schemas/devicePinners.generated.js';
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
export class GetDevicePinnerByIdOptionals {
  readonly headers: GetDevicePinnerByIdHeaders = new GetDevicePinnerByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDevicePinnerByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetDevicePinnerByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetDevicePinnerByIdOptionalsInput {
  readonly headers?: GetDevicePinnerByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteDevicePinnerByIdOptionals {
  readonly headers: DeleteDevicePinnerByIdHeaders =
    new DeleteDevicePinnerByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteDevicePinnerByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteDevicePinnerByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteDevicePinnerByIdOptionalsInput {
  readonly headers?: DeleteDevicePinnerByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetEnterpriseDevicePinnersOptionals {
  readonly queryParams: GetEnterpriseDevicePinnersQueryParams =
    {} satisfies GetEnterpriseDevicePinnersQueryParams;
  readonly headers: GetEnterpriseDevicePinnersHeaders =
    new GetEnterpriseDevicePinnersHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetEnterpriseDevicePinnersOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetEnterpriseDevicePinnersOptionals,
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
export interface GetEnterpriseDevicePinnersOptionalsInput {
  readonly queryParams?: GetEnterpriseDevicePinnersQueryParams;
  readonly headers?: GetEnterpriseDevicePinnersHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDevicePinnerByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetDevicePinnerByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetDevicePinnerByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetDevicePinnerByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteDevicePinnerByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteDevicePinnerByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteDevicePinnerByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteDevicePinnerByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetEnterpriseDevicePinnersQueryParamsDirectionField =
  | 'ASC'
  | 'DESC'
  | string;
export interface GetEnterpriseDevicePinnersQueryParams {
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
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetEnterpriseDevicePinnersQueryParamsDirectionField;
}
export class GetEnterpriseDevicePinnersHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetEnterpriseDevicePinnersHeaders, 'extraHeaders'> &
      Partial<Pick<GetEnterpriseDevicePinnersHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetEnterpriseDevicePinnersHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DevicePinnersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      DevicePinnersManager,
      | 'networkSession'
      | 'getDevicePinnerById'
      | 'deleteDevicePinnerById'
      | 'getEnterpriseDevicePinners'
    > &
      Partial<Pick<DevicePinnersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves information about an individual device pin.
     * @param {string} devicePinnerId The ID of the device pin
    Example: "2324234"
     * @param {GetDevicePinnerByIdOptionalsInput} optionalsInput
     * @returns {Promise<DevicePinner>}
     */
  async getDevicePinnerById(
    devicePinnerId: string,
    optionalsInput: GetDevicePinnerByIdOptionalsInput = {},
  ): Promise<DevicePinner> {
    const optionals: GetDevicePinnerByIdOptionals =
      new GetDevicePinnerByIdOptionals({
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
            '/2.0/device_pinners/',
            toString(devicePinnerId) as string,
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
      ...deserializeDevicePinner(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes an individual device pin.
     * @param {string} devicePinnerId The ID of the device pin
    Example: "2324234"
     * @param {DeleteDevicePinnerByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteDevicePinnerById(
    devicePinnerId: string,
    optionalsInput: DeleteDevicePinnerByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteDevicePinnerByIdOptionals =
      new DeleteDevicePinnerByIdOptionals({
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
            '/2.0/device_pinners/',
            toString(devicePinnerId) as string,
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
     * Retrieves all the device pins within an enterprise.
     *
     * The user must have admin privileges, and the application
     * needs the "manage enterprise" scope to make this call.
     * @param {string} enterpriseId The ID of the enterprise
    Example: "3442311"
     * @param {GetEnterpriseDevicePinnersOptionalsInput} optionalsInput
     * @returns {Promise<DevicePinners>}
     */
  async getEnterpriseDevicePinners(
    enterpriseId: string,
    optionalsInput: GetEnterpriseDevicePinnersOptionalsInput = {},
  ): Promise<DevicePinners> {
    const optionals: GetEnterpriseDevicePinnersOptionals =
      new GetEnterpriseDevicePinnersOptionals({
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
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['direction']: toString(queryParams.direction) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/enterprises/',
            toString(enterpriseId) as string,
            '/device_pinners',
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
      ...deserializeDevicePinners(response.data!),
      rawData: response.data!,
    };
  }
}
export interface DevicePinnersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetEnterpriseDevicePinnersQueryParamsDirectionField(
  val: GetEnterpriseDevicePinnersQueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetEnterpriseDevicePinnersQueryParamsDirectionField(
  val: SerializedData,
): GetEnterpriseDevicePinnersQueryParamsDirectionField {
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
      "Can't deserialize GetEnterpriseDevicePinnersQueryParamsDirectionField",
  });
}
