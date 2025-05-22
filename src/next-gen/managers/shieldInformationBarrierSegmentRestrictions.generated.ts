import { serializeShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.generated.js';
import { deserializeShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.generated.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.generated.js';
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
export class GetShieldInformationBarrierSegmentRestrictionByIdOptionals {
  readonly headers: GetShieldInformationBarrierSegmentRestrictionByIdHeaders =
    new GetShieldInformationBarrierSegmentRestrictionByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentRestrictionByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentRestrictionByIdOptionals,
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
export interface GetShieldInformationBarrierSegmentRestrictionByIdOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentRestrictionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteShieldInformationBarrierSegmentRestrictionByIdOptionals {
  readonly headers: DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders =
    new DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentRestrictionByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteShieldInformationBarrierSegmentRestrictionByIdOptionals,
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
export interface DeleteShieldInformationBarrierSegmentRestrictionByIdOptionalsInput {
  readonly headers?: DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentRestrictionsOptionals {
  readonly headers: GetShieldInformationBarrierSegmentRestrictionsHeaders =
    new GetShieldInformationBarrierSegmentRestrictionsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentRestrictionsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentRestrictionsOptionals,
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
export interface GetShieldInformationBarrierSegmentRestrictionsOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentRestrictionsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateShieldInformationBarrierSegmentRestrictionOptionals {
  readonly headers: CreateShieldInformationBarrierSegmentRestrictionHeaders =
    new CreateShieldInformationBarrierSegmentRestrictionHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentRestrictionOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierSegmentRestrictionOptionals,
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
export interface CreateShieldInformationBarrierSegmentRestrictionOptionalsInput {
  readonly headers?: CreateShieldInformationBarrierSegmentRestrictionHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentRestrictionByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentRestrictionByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentRestrictionByIdHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentRestrictionByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteShieldInformationBarrierSegmentRestrictionByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetShieldInformationBarrierSegmentRestrictionsQueryParams {
  /**
   * The ID of the shield information barrier segment. */
  readonly shieldInformationBarrierSegmentId: string;
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
export class GetShieldInformationBarrierSegmentRestrictionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentRestrictionsHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentRestrictionsHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentRestrictionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField =
  'shield_information_barrier_segment_restriction';
export type CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField =
  'shield_information_barrier_segment';
export interface CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField {
  /**
   * The ID reference of the requesting
   * shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the shield barrier segment for this member. */
  readonly type?: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField;
  readonly rawData?: SerializedData;
}
export type CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField =
  'shield_information_barrier_segment';
export interface CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField {
  /**
   * The ID reference of the restricted
   * shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the restricted shield
   * information barrier segment. */
  readonly type?: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField;
  readonly rawData?: SerializedData;
}
export class CreateShieldInformationBarrierSegmentRestrictionRequestBody {
  /**
   * The type of the shield barrier segment
   * restriction for this member. */
  readonly type: CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField =
    'shield_information_barrier_segment_restriction' as CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField;
  readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
  /**
   * The `type` and `id` of the requested
   * shield information barrier segment. */
  readonly shieldInformationBarrierSegment!: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField;
  /**
   * The `type` and `id` of the restricted
   * shield information barrier segment. */
  readonly restrictedSegment!: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentRestrictionRequestBody,
      'type'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierSegmentRestrictionRequestBody,
          'type'
        >
      >,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.shieldInformationBarrier !== undefined) {
      this.shieldInformationBarrier = fields.shieldInformationBarrier;
    }
    if (fields.shieldInformationBarrierSegment !== undefined) {
      this.shieldInformationBarrierSegment =
        fields.shieldInformationBarrierSegment;
    }
    if (fields.restrictedSegment !== undefined) {
      this.restrictedSegment = fields.restrictedSegment;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput {
  /**
   * The type of the shield barrier segment
   * restriction for this member. */
  readonly type?: CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField;
  readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
  /**
   * The `type` and `id` of the requested
   * shield information barrier segment. */
  readonly shieldInformationBarrierSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField;
  /**
   * The `type` and `id` of the restricted
   * shield information barrier segment. */
  readonly restrictedSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField;
  readonly rawData?: SerializedData;
}
export class CreateShieldInformationBarrierSegmentRestrictionHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentRestrictionHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierSegmentRestrictionHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateShieldInformationBarrierSegmentRestrictionHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ShieldInformationBarrierSegmentRestrictionsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldInformationBarrierSegmentRestrictionsManager,
      | 'networkSession'
      | 'getShieldInformationBarrierSegmentRestrictionById'
      | 'deleteShieldInformationBarrierSegmentRestrictionById'
      | 'getShieldInformationBarrierSegmentRestrictions'
      | 'createShieldInformationBarrierSegmentRestriction'
    > &
      Partial<
        Pick<
          ShieldInformationBarrierSegmentRestrictionsManager,
          'networkSession'
        >
      >,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves a shield information barrier segment
     * restriction based on provided ID.
     * @param {string} shieldInformationBarrierSegmentRestrictionId The ID of the shield information barrier segment Restriction.
    Example: "4563"
     * @param {GetShieldInformationBarrierSegmentRestrictionByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrierSegmentRestriction>}
     */
  async getShieldInformationBarrierSegmentRestrictionById(
    shieldInformationBarrierSegmentRestrictionId: string,
    optionalsInput: GetShieldInformationBarrierSegmentRestrictionByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentRestriction> {
    const optionals: GetShieldInformationBarrierSegmentRestrictionByIdOptionals =
      new GetShieldInformationBarrierSegmentRestrictionByIdOptionals({
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
            '/2.0/shield_information_barrier_segment_restrictions/',
            toString(shieldInformationBarrierSegmentRestrictionId) as string,
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
      ...deserializeShieldInformationBarrierSegmentRestriction(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete shield information barrier segment restriction
     * based on provided ID.
     * @param {string} shieldInformationBarrierSegmentRestrictionId The ID of the shield information barrier segment Restriction.
    Example: "4563"
     * @param {DeleteShieldInformationBarrierSegmentRestrictionByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteShieldInformationBarrierSegmentRestrictionById(
    shieldInformationBarrierSegmentRestrictionId: string,
    optionalsInput: DeleteShieldInformationBarrierSegmentRestrictionByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteShieldInformationBarrierSegmentRestrictionByIdOptionals =
      new DeleteShieldInformationBarrierSegmentRestrictionByIdOptionals({
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
            '/2.0/shield_information_barrier_segment_restrictions/',
            toString(shieldInformationBarrierSegmentRestrictionId) as string,
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
   * Lists shield information barrier segment restrictions
   * based on provided segment ID.
   * @param {GetShieldInformationBarrierSegmentRestrictionsQueryParams} queryParams Query parameters of getShieldInformationBarrierSegmentRestrictions method
   * @param {GetShieldInformationBarrierSegmentRestrictionsOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegmentRestrictions>}
   */
  async getShieldInformationBarrierSegmentRestrictions(
    queryParams: GetShieldInformationBarrierSegmentRestrictionsQueryParams,
    optionalsInput: GetShieldInformationBarrierSegmentRestrictionsOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentRestrictions> {
    const optionals: GetShieldInformationBarrierSegmentRestrictionsOptionals =
      new GetShieldInformationBarrierSegmentRestrictionsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['shield_information_barrier_segment_id']: toString(
        queryParams.shieldInformationBarrierSegmentId,
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
            '/2.0/shield_information_barrier_segment_restrictions',
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
      ...deserializeShieldInformationBarrierSegmentRestrictions(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a shield information barrier
   * segment restriction object.
   * @param {CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput} requestBodyInput Request body of createShieldInformationBarrierSegmentRestriction method
   * @param {CreateShieldInformationBarrierSegmentRestrictionOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegmentRestriction>}
   */
  async createShieldInformationBarrierSegmentRestriction(
    requestBodyInput: CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput,
    optionalsInput: CreateShieldInformationBarrierSegmentRestrictionOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentRestriction> {
    const requestBody: CreateShieldInformationBarrierSegmentRestrictionRequestBody =
      new CreateShieldInformationBarrierSegmentRestrictionRequestBody({
        type: requestBodyInput.type,
        shieldInformationBarrier: requestBodyInput.shieldInformationBarrier,
        shieldInformationBarrierSegment:
          requestBodyInput.shieldInformationBarrierSegment,
        restrictedSegment: requestBodyInput.restrictedSegment,
      });
    const optionals: CreateShieldInformationBarrierSegmentRestrictionOptionals =
      new CreateShieldInformationBarrierSegmentRestrictionOptionals({
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
            '/2.0/shield_information_barrier_segment_restrictions',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody(
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
      ...deserializeShieldInformationBarrierSegmentRestriction(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldInformationBarrierSegmentRestrictionsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField {
  if (val == 'shield_information_barrier_segment_restriction') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField",
  });
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField",
  });
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField;
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField",
  });
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField;
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBody,
): SerializedData {
  return {
    ['type']:
      serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
        val.type,
      ),
    ['shield_information_barrier']:
      val.shieldInformationBarrier == void 0
        ? val.shieldInformationBarrier
        : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
    ['shield_information_barrier_segment']:
      serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
        val.shieldInformationBarrierSegment,
      ),
    ['restricted_segment']:
      serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
        val.restrictedSegment,
      ),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBody(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentRestrictionRequestBody"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBody" to be defined',
    });
  }
  const type: CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField =
    deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
      val.type,
    );
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (val.shield_information_barrier_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier_segment" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBody" to be defined',
    });
  }
  const shieldInformationBarrierSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField =
    deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
      val.shield_information_barrier_segment,
    );
  if (val.restricted_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "restricted_segment" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBody" to be defined',
    });
  }
  const restrictedSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField =
    deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
      val.restricted_segment,
    );
  return {
    type: type,
    shieldInformationBarrier: shieldInformationBarrier,
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    restrictedSegment: restrictedSegment,
  } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBody;
}
export function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyInput(
  val: CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
            val.type,
          ),
    ['shield_information_barrier']:
      val.shieldInformationBarrier == void 0
        ? val.shieldInformationBarrier
        : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
    ['shield_information_barrier_segment']:
      serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
        val.shieldInformationBarrierSegment,
      ),
    ['restricted_segment']:
      serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
        val.restrictedSegment,
      ),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyInput(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput"',
    });
  }
  const type:
    | undefined
    | CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(
          val.type,
        );
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (val.shield_information_barrier_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier_segment" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput" to be defined',
    });
  }
  const shieldInformationBarrierSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField =
    deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(
      val.shield_information_barrier_segment,
    );
  if (val.restricted_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "restricted_segment" of type "CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput" to be defined',
    });
  }
  const restrictedSegment: CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField =
    deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(
      val.restricted_segment,
    );
  return {
    type: type,
    shieldInformationBarrier: shieldInformationBarrier,
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    restrictedSegment: restrictedSegment,
  } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput;
}
