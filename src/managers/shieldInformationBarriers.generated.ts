import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { deserializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { serializeEnterpriseBase } from '../schemas/enterpriseBase.generated.js';
import { deserializeEnterpriseBase } from '../schemas/enterpriseBase.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { EnterpriseBase } from '../schemas/enterpriseBase.generated.js';
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
export class GetShieldInformationBarrierByIdOptionals {
  readonly headers: GetShieldInformationBarrierByIdHeaders =
    new GetShieldInformationBarrierByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierByIdOptionals,
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
export interface GetShieldInformationBarrierByIdOptionalsInput {
  readonly headers?: GetShieldInformationBarrierByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateShieldInformationBarrierStatusOptionals {
  readonly headers: UpdateShieldInformationBarrierStatusHeaders =
    new UpdateShieldInformationBarrierStatusHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateShieldInformationBarrierStatusOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateShieldInformationBarrierStatusOptionals,
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
export interface UpdateShieldInformationBarrierStatusOptionalsInput {
  readonly headers?: UpdateShieldInformationBarrierStatusHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateShieldInformationBarrierOptionals {
  readonly headers: CreateShieldInformationBarrierHeaders =
    new CreateShieldInformationBarrierHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierOptionals,
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
export interface CreateShieldInformationBarrierOptionalsInput {
  readonly headers?: CreateShieldInformationBarrierHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetShieldInformationBarrierByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetShieldInformationBarrierByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateShieldInformationBarrierStatusRequestBodyStatusField =
  | 'pending'
  | 'disabled'
  | string;
export interface UpdateShieldInformationBarrierStatusRequestBody {
  /**
   * The ID of the shield information barrier. */
  readonly id: string;
  /**
   * The desired status for the shield information barrier. */
  readonly status: UpdateShieldInformationBarrierStatusRequestBodyStatusField;
  readonly rawData?: SerializedData;
}
export class UpdateShieldInformationBarrierStatusHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateShieldInformationBarrierStatusHeaders, 'extraHeaders'> &
      Partial<
        Pick<UpdateShieldInformationBarrierStatusHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateShieldInformationBarrierStatusHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetShieldInformationBarriersQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetShieldInformationBarriersHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetShieldInformationBarriersHeaders, 'extraHeaders'> &
      Partial<Pick<GetShieldInformationBarriersHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarriersHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateShieldInformationBarrierRequestBody {
  /**
   * The `type` and `id` of enterprise this barrier is under. */
  readonly enterprise: EnterpriseBase;
  readonly rawData?: SerializedData;
}
export class CreateShieldInformationBarrierHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateShieldInformationBarrierHeaders, 'extraHeaders'> &
      Partial<Pick<CreateShieldInformationBarrierHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateShieldInformationBarrierHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ShieldInformationBarriersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldInformationBarriersManager,
      | 'networkSession'
      | 'getShieldInformationBarrierById'
      | 'updateShieldInformationBarrierStatus'
      | 'getShieldInformationBarriers'
      | 'createShieldInformationBarrier'
    > &
      Partial<Pick<ShieldInformationBarriersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Get shield information barrier based on provided ID.
     * @param {string} shieldInformationBarrierId The ID of the shield information barrier.
    Example: "1910967"
     * @param {GetShieldInformationBarrierByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrier>}
     */
  async getShieldInformationBarrierById(
    shieldInformationBarrierId: string,
    optionalsInput: GetShieldInformationBarrierByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrier> {
    const optionals: GetShieldInformationBarrierByIdOptionals =
      new GetShieldInformationBarrierByIdOptionals({
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
            '/2.0/shield_information_barriers/',
            toString(shieldInformationBarrierId) as string,
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
      ...deserializeShieldInformationBarrier(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Change status of shield information barrier with the specified ID.
   * @param {UpdateShieldInformationBarrierStatusRequestBody} requestBody Request body of updateShieldInformationBarrierStatus method
   * @param {UpdateShieldInformationBarrierStatusOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrier>}
   */
  async updateShieldInformationBarrierStatus(
    requestBody: UpdateShieldInformationBarrierStatusRequestBody,
    optionalsInput: UpdateShieldInformationBarrierStatusOptionalsInput = {},
  ): Promise<ShieldInformationBarrier> {
    const optionals: UpdateShieldInformationBarrierStatusOptionals =
      new UpdateShieldInformationBarrierStatusOptionals({
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
            '/2.0/shield_information_barriers/change_status',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeUpdateShieldInformationBarrierStatusRequestBody(
            requestBody,
          ),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeShieldInformationBarrier(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves a list of shield information barrier objects
   * for the enterprise of JWT.
   * @param {GetShieldInformationBarriersQueryParams} queryParams Query parameters of getShieldInformationBarriers method
   * @param {GetShieldInformationBarriersHeadersInput} headersInput Headers of getShieldInformationBarriers method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<ShieldInformationBarriers>}
   */
  async getShieldInformationBarriers(
    queryParams: GetShieldInformationBarriersQueryParams = {} satisfies GetShieldInformationBarriersQueryParams,
    headersInput: GetShieldInformationBarriersHeadersInput = new GetShieldInformationBarriersHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<ShieldInformationBarriers> {
    const headers: GetShieldInformationBarriersHeaders =
      new GetShieldInformationBarriersHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
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
            '/2.0/shield_information_barriers',
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
      ...deserializeShieldInformationBarriers(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a shield information barrier to
   * separate individuals/groups within the same
   * firm and prevents confidential information passing between them.
   * @param {CreateShieldInformationBarrierRequestBody} requestBody Request body of createShieldInformationBarrier method
   * @param {CreateShieldInformationBarrierOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrier>}
   */
  async createShieldInformationBarrier(
    requestBody: CreateShieldInformationBarrierRequestBody,
    optionalsInput: CreateShieldInformationBarrierOptionalsInput = {},
  ): Promise<ShieldInformationBarrier> {
    const optionals: CreateShieldInformationBarrierOptionals =
      new CreateShieldInformationBarrierOptionals({
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
            '/2.0/shield_information_barriers',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateShieldInformationBarrierRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeShieldInformationBarrier(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldInformationBarriersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(
  val: UpdateShieldInformationBarrierStatusRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(
  val: SerializedData,
): UpdateShieldInformationBarrierStatusRequestBodyStatusField {
  if (val == 'pending') {
    return val;
  }
  if (val == 'disabled') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateShieldInformationBarrierStatusRequestBodyStatusField",
  });
}
export function serializeUpdateShieldInformationBarrierStatusRequestBody(
  val: UpdateShieldInformationBarrierStatusRequestBody,
): SerializedData {
  return {
    ['id']: val.id,
    ['status']:
      serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(
        val.status,
      ),
  };
}
export function deserializeUpdateShieldInformationBarrierStatusRequestBody(
  val: SerializedData,
): UpdateShieldInformationBarrierStatusRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateShieldInformationBarrierStatusRequestBody"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UpdateShieldInformationBarrierStatusRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateShieldInformationBarrierStatusRequestBody"',
    });
  }
  const id: string = val.id;
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "UpdateShieldInformationBarrierStatusRequestBody" to be defined',
    });
  }
  const status: UpdateShieldInformationBarrierStatusRequestBodyStatusField =
    deserializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(
      val.status,
    );
  return {
    id: id,
    status: status,
  } satisfies UpdateShieldInformationBarrierStatusRequestBody;
}
export function serializeCreateShieldInformationBarrierRequestBody(
  val: CreateShieldInformationBarrierRequestBody,
): SerializedData {
  return { ['enterprise']: serializeEnterpriseBase(val.enterprise) };
}
export function deserializeCreateShieldInformationBarrierRequestBody(
  val: SerializedData,
): CreateShieldInformationBarrierRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierRequestBody"',
    });
  }
  if (val.enterprise == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enterprise" of type "CreateShieldInformationBarrierRequestBody" to be defined',
    });
  }
  const enterprise: EnterpriseBase = deserializeEnterpriseBase(val.enterprise);
  return {
    enterprise: enterprise,
  } satisfies CreateShieldInformationBarrierRequestBody;
}
