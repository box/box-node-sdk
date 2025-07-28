import { serializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { deserializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { deserializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
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
export class GetShieldInformationBarrierSegmentByIdOptionals {
  readonly headers: GetShieldInformationBarrierSegmentByIdHeaders =
    new GetShieldInformationBarrierSegmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentByIdOptionals,
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
export interface GetShieldInformationBarrierSegmentByIdOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteShieldInformationBarrierSegmentByIdOptionals {
  readonly headers: DeleteShieldInformationBarrierSegmentByIdHeaders =
    new DeleteShieldInformationBarrierSegmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteShieldInformationBarrierSegmentByIdOptionals,
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
export interface DeleteShieldInformationBarrierSegmentByIdOptionalsInput {
  readonly headers?: DeleteShieldInformationBarrierSegmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateShieldInformationBarrierSegmentByIdOptionals {
  readonly requestBody: UpdateShieldInformationBarrierSegmentByIdRequestBody =
    {} satisfies UpdateShieldInformationBarrierSegmentByIdRequestBody;
  readonly headers: UpdateShieldInformationBarrierSegmentByIdHeaders =
    new UpdateShieldInformationBarrierSegmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateShieldInformationBarrierSegmentByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateShieldInformationBarrierSegmentByIdOptionals,
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
export interface UpdateShieldInformationBarrierSegmentByIdOptionalsInput {
  readonly requestBody?: UpdateShieldInformationBarrierSegmentByIdRequestBody;
  readonly headers?: UpdateShieldInformationBarrierSegmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentsOptionals {
  readonly headers: GetShieldInformationBarrierSegmentsHeaders =
    new GetShieldInformationBarrierSegmentsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentsOptionals,
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
export interface GetShieldInformationBarrierSegmentsOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateShieldInformationBarrierSegmentOptionals {
  readonly headers: CreateShieldInformationBarrierSegmentHeaders =
    new CreateShieldInformationBarrierSegmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierSegmentOptionals,
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
export interface CreateShieldInformationBarrierSegmentOptionalsInput {
  readonly headers?: CreateShieldInformationBarrierSegmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetShieldInformationBarrierSegmentByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteShieldInformationBarrierSegmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<DeleteShieldInformationBarrierSegmentByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteShieldInformationBarrierSegmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateShieldInformationBarrierSegmentByIdRequestBody {
  /**
   * The updated name for the shield information barrier segment. */
  readonly name?: string;
  /**
   * The updated description for
   * the shield information barrier segment. */
  readonly description?: string | null;
  readonly rawData?: SerializedData;
}
export class UpdateShieldInformationBarrierSegmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      UpdateShieldInformationBarrierSegmentByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<UpdateShieldInformationBarrierSegmentByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateShieldInformationBarrierSegmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetShieldInformationBarrierSegmentsQueryParams {
  /**
   * The ID of the shield information barrier. */
  readonly shieldInformationBarrierId: string;
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
export class GetShieldInformationBarrierSegmentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetShieldInformationBarrierSegmentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetShieldInformationBarrierSegmentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateShieldInformationBarrierSegmentRequestBody {
  readonly shieldInformationBarrier: ShieldInformationBarrierBase;
  /**
   * Name of the shield information barrier segment. */
  readonly name: string;
  /**
   * Description of the shield information barrier segment. */
  readonly description?: string;
  readonly rawData?: SerializedData;
}
export class CreateShieldInformationBarrierSegmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateShieldInformationBarrierSegmentHeaders, 'extraHeaders'> &
      Partial<
        Pick<CreateShieldInformationBarrierSegmentHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateShieldInformationBarrierSegmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ShieldInformationBarrierSegmentsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldInformationBarrierSegmentsManager,
      | 'networkSession'
      | 'getShieldInformationBarrierSegmentById'
      | 'deleteShieldInformationBarrierSegmentById'
      | 'updateShieldInformationBarrierSegmentById'
      | 'getShieldInformationBarrierSegments'
      | 'createShieldInformationBarrierSegment'
    > &
      Partial<Pick<ShieldInformationBarrierSegmentsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves shield information barrier segment based on provided ID..
     * @param {string} shieldInformationBarrierSegmentId The ID of the shield information barrier segment.
    Example: "3423"
     * @param {GetShieldInformationBarrierSegmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrierSegment>}
     */
  async getShieldInformationBarrierSegmentById(
    shieldInformationBarrierSegmentId: string,
    optionalsInput: GetShieldInformationBarrierSegmentByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegment> {
    const optionals: GetShieldInformationBarrierSegmentByIdOptionals =
      new GetShieldInformationBarrierSegmentByIdOptionals({
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
            '/2.0/shield_information_barrier_segments/',
            toString(shieldInformationBarrierSegmentId) as string,
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
      ...deserializeShieldInformationBarrierSegment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes the shield information barrier segment
     * based on provided ID.
     * @param {string} shieldInformationBarrierSegmentId The ID of the shield information barrier segment.
    Example: "3423"
     * @param {DeleteShieldInformationBarrierSegmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteShieldInformationBarrierSegmentById(
    shieldInformationBarrierSegmentId: string,
    optionalsInput: DeleteShieldInformationBarrierSegmentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteShieldInformationBarrierSegmentByIdOptionals =
      new DeleteShieldInformationBarrierSegmentByIdOptionals({
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
            '/2.0/shield_information_barrier_segments/',
            toString(shieldInformationBarrierSegmentId) as string,
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
     * Updates the shield information barrier segment based on provided ID..
     * @param {string} shieldInformationBarrierSegmentId The ID of the shield information barrier segment.
    Example: "3423"
     * @param {UpdateShieldInformationBarrierSegmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrierSegment>}
     */
  async updateShieldInformationBarrierSegmentById(
    shieldInformationBarrierSegmentId: string,
    optionalsInput: UpdateShieldInformationBarrierSegmentByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegment> {
    const optionals: UpdateShieldInformationBarrierSegmentByIdOptionals =
      new UpdateShieldInformationBarrierSegmentByIdOptionals({
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
            '/2.0/shield_information_barrier_segments/',
            toString(shieldInformationBarrierSegmentId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateShieldInformationBarrierSegmentByIdRequestBody(
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
      ...deserializeShieldInformationBarrierSegment(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves a list of shield information barrier segment objects
   * for the specified Information Barrier ID.
   * @param {GetShieldInformationBarrierSegmentsQueryParams} queryParams Query parameters of getShieldInformationBarrierSegments method
   * @param {GetShieldInformationBarrierSegmentsOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegments>}
   */
  async getShieldInformationBarrierSegments(
    queryParams: GetShieldInformationBarrierSegmentsQueryParams,
    optionalsInput: GetShieldInformationBarrierSegmentsOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegments> {
    const optionals: GetShieldInformationBarrierSegmentsOptionals =
      new GetShieldInformationBarrierSegmentsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['shield_information_barrier_id']: toString(
        queryParams.shieldInformationBarrierId,
      ) as string,
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
            '/2.0/shield_information_barrier_segments',
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
      ...deserializeShieldInformationBarrierSegments(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a shield information barrier segment.
   * @param {CreateShieldInformationBarrierSegmentRequestBody} requestBody Request body of createShieldInformationBarrierSegment method
   * @param {CreateShieldInformationBarrierSegmentOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegment>}
   */
  async createShieldInformationBarrierSegment(
    requestBody: CreateShieldInformationBarrierSegmentRequestBody,
    optionalsInput: CreateShieldInformationBarrierSegmentOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegment> {
    const optionals: CreateShieldInformationBarrierSegmentOptionals =
      new CreateShieldInformationBarrierSegmentOptionals({
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
            '/2.0/shield_information_barrier_segments',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateShieldInformationBarrierSegmentRequestBody(
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
      ...deserializeShieldInformationBarrierSegment(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldInformationBarrierSegmentsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateShieldInformationBarrierSegmentByIdRequestBody(
  val: UpdateShieldInformationBarrierSegmentByIdRequestBody,
): SerializedData {
  return { ['name']: val.name, ['description']: val.description };
}
export function deserializeUpdateShieldInformationBarrierSegmentByIdRequestBody(
  val: SerializedData,
): UpdateShieldInformationBarrierSegmentByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateShieldInformationBarrierSegmentByIdRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateShieldInformationBarrierSegmentByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateShieldInformationBarrierSegmentByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    name: name,
    description: description,
  } satisfies UpdateShieldInformationBarrierSegmentByIdRequestBody;
}
export function serializeCreateShieldInformationBarrierSegmentRequestBody(
  val: CreateShieldInformationBarrierSegmentRequestBody,
): SerializedData {
  return {
    ['shield_information_barrier']: serializeShieldInformationBarrierBase(
      val.shieldInformationBarrier,
    ),
    ['name']: val.name,
    ['description']: val.description,
  };
}
export function deserializeCreateShieldInformationBarrierSegmentRequestBody(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentRequestBody"',
    });
  }
  if (val.shield_information_barrier == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier" of type "CreateShieldInformationBarrierSegmentRequestBody" to be defined',
    });
  }
  const shieldInformationBarrier: ShieldInformationBarrierBase =
    deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "CreateShieldInformationBarrierSegmentRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "CreateShieldInformationBarrierSegmentRequestBody"',
    });
  }
  const name: string = val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateShieldInformationBarrierSegmentRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    shieldInformationBarrier: shieldInformationBarrier,
    name: name,
    description: description,
  } satisfies CreateShieldInformationBarrierSegmentRequestBody;
}
