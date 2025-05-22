import { serializeShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.generated.js';
import { deserializeShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.generated.js';
import { deserializeShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.generated.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { serializeUserBase } from '../schemas/userBase.generated.js';
import { deserializeUserBase } from '../schemas/userBase.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.generated.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { UserBase } from '../schemas/userBase.generated.js';
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
export class GetShieldInformationBarrierSegmentMemberByIdOptionals {
  readonly headers: GetShieldInformationBarrierSegmentMemberByIdHeaders =
    new GetShieldInformationBarrierSegmentMemberByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentMemberByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentMemberByIdOptionals,
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
export interface GetShieldInformationBarrierSegmentMemberByIdOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentMemberByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteShieldInformationBarrierSegmentMemberByIdOptionals {
  readonly headers: DeleteShieldInformationBarrierSegmentMemberByIdHeaders =
    new DeleteShieldInformationBarrierSegmentMemberByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentMemberByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteShieldInformationBarrierSegmentMemberByIdOptionals,
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
export interface DeleteShieldInformationBarrierSegmentMemberByIdOptionalsInput {
  readonly headers?: DeleteShieldInformationBarrierSegmentMemberByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentMembersOptionals {
  readonly headers: GetShieldInformationBarrierSegmentMembersHeaders =
    new GetShieldInformationBarrierSegmentMembersHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentMembersOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentMembersOptionals,
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
export interface GetShieldInformationBarrierSegmentMembersOptionalsInput {
  readonly headers?: GetShieldInformationBarrierSegmentMembersHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateShieldInformationBarrierSegmentMemberOptionals {
  readonly headers: CreateShieldInformationBarrierSegmentMemberHeaders =
    new CreateShieldInformationBarrierSegmentMemberHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentMemberOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierSegmentMemberOptionals,
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
export interface CreateShieldInformationBarrierSegmentMemberOptionalsInput {
  readonly headers?: CreateShieldInformationBarrierSegmentMemberHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierSegmentMemberByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentMemberByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierSegmentMemberByIdHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentMemberByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteShieldInformationBarrierSegmentMemberByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteShieldInformationBarrierSegmentMemberByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          DeleteShieldInformationBarrierSegmentMemberByIdHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteShieldInformationBarrierSegmentMemberByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetShieldInformationBarrierSegmentMembersQueryParams {
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
export class GetShieldInformationBarrierSegmentMembersHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetShieldInformationBarrierSegmentMembersHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetShieldInformationBarrierSegmentMembersHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierSegmentMembersHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField =
  'shield_information_barrier_segment_member';
export type CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField =
  'shield_information_barrier_segment';
export interface CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField {
  /**
   * The ID reference of the
   * requesting shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the shield barrier segment for this member. */
  readonly type?: CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField;
  readonly rawData?: SerializedData;
}
export interface CreateShieldInformationBarrierSegmentMemberRequestBody {
  /**
   * -| A type of the shield barrier segment member. */
  readonly type?: CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField;
  readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
  /**
   * The `type` and `id` of the
   * requested shield information barrier segment. */
  readonly shieldInformationBarrierSegment: CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField;
  /**
   * User to which restriction will be applied. */
  readonly user: UserBase;
  readonly rawData?: SerializedData;
}
export class CreateShieldInformationBarrierSegmentMemberHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierSegmentMemberHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<CreateShieldInformationBarrierSegmentMemberHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateShieldInformationBarrierSegmentMemberHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ShieldInformationBarrierSegmentMembersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldInformationBarrierSegmentMembersManager,
      | 'networkSession'
      | 'getShieldInformationBarrierSegmentMemberById'
      | 'deleteShieldInformationBarrierSegmentMemberById'
      | 'getShieldInformationBarrierSegmentMembers'
      | 'createShieldInformationBarrierSegmentMember'
    > &
      Partial<
        Pick<ShieldInformationBarrierSegmentMembersManager, 'networkSession'>
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
     * Retrieves a shield information barrier
     * segment member by its ID.
     * @param {string} shieldInformationBarrierSegmentMemberId The ID of the shield information barrier segment Member.
    Example: "7815"
     * @param {GetShieldInformationBarrierSegmentMemberByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrierSegmentMember>}
     */
  async getShieldInformationBarrierSegmentMemberById(
    shieldInformationBarrierSegmentMemberId: string,
    optionalsInput: GetShieldInformationBarrierSegmentMemberByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentMember> {
    const optionals: GetShieldInformationBarrierSegmentMemberByIdOptionals =
      new GetShieldInformationBarrierSegmentMemberByIdOptionals({
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
            '/2.0/shield_information_barrier_segment_members/',
            toString(shieldInformationBarrierSegmentMemberId) as string,
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
      ...deserializeShieldInformationBarrierSegmentMember(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a shield information barrier
     * segment member based on provided ID.
     * @param {string} shieldInformationBarrierSegmentMemberId The ID of the shield information barrier segment Member.
    Example: "7815"
     * @param {DeleteShieldInformationBarrierSegmentMemberByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteShieldInformationBarrierSegmentMemberById(
    shieldInformationBarrierSegmentMemberId: string,
    optionalsInput: DeleteShieldInformationBarrierSegmentMemberByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteShieldInformationBarrierSegmentMemberByIdOptionals =
      new DeleteShieldInformationBarrierSegmentMemberByIdOptionals({
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
            '/2.0/shield_information_barrier_segment_members/',
            toString(shieldInformationBarrierSegmentMemberId) as string,
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
   * Lists shield information barrier segment members
   * based on provided segment IDs.
   * @param {GetShieldInformationBarrierSegmentMembersQueryParams} queryParams Query parameters of getShieldInformationBarrierSegmentMembers method
   * @param {GetShieldInformationBarrierSegmentMembersOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegmentMembers>}
   */
  async getShieldInformationBarrierSegmentMembers(
    queryParams: GetShieldInformationBarrierSegmentMembersQueryParams,
    optionalsInput: GetShieldInformationBarrierSegmentMembersOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentMembers> {
    const optionals: GetShieldInformationBarrierSegmentMembersOptionals =
      new GetShieldInformationBarrierSegmentMembersOptionals({
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
            '/2.0/shield_information_barrier_segment_members',
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
      ...deserializeShieldInformationBarrierSegmentMembers(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new shield information barrier segment member.
   * @param {CreateShieldInformationBarrierSegmentMemberRequestBody} requestBody Request body of createShieldInformationBarrierSegmentMember method
   * @param {CreateShieldInformationBarrierSegmentMemberOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierSegmentMember>}
   */
  async createShieldInformationBarrierSegmentMember(
    requestBody: CreateShieldInformationBarrierSegmentMemberRequestBody,
    optionalsInput: CreateShieldInformationBarrierSegmentMemberOptionalsInput = {},
  ): Promise<ShieldInformationBarrierSegmentMember> {
    const optionals: CreateShieldInformationBarrierSegmentMemberOptionals =
      new CreateShieldInformationBarrierSegmentMemberOptionals({
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
            '/2.0/shield_information_barrier_segment_members',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateShieldInformationBarrierSegmentMemberRequestBody(
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
      ...deserializeShieldInformationBarrierSegmentMember(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldInformationBarrierSegmentMembersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(
  val: CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField {
  if (val == 'shield_information_barrier_segment_member') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField",
  });
}
export function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(
  val: CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField",
  });
}
export function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(
  val: CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField;
}
export function serializeCreateShieldInformationBarrierSegmentMemberRequestBody(
  val: CreateShieldInformationBarrierSegmentMemberRequestBody,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(
            val.type,
          ),
    ['shield_information_barrier']:
      val.shieldInformationBarrier == void 0
        ? val.shieldInformationBarrier
        : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
    ['shield_information_barrier_segment']:
      serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(
        val.shieldInformationBarrierSegment,
      ),
    ['user']: serializeUserBase(val.user),
  };
}
export function deserializeCreateShieldInformationBarrierSegmentMemberRequestBody(
  val: SerializedData,
): CreateShieldInformationBarrierSegmentMemberRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateShieldInformationBarrierSegmentMemberRequestBody"',
    });
  }
  const type:
    | undefined
    | CreateShieldInformationBarrierSegmentMemberRequestBodyTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(
          val.type,
        );
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (val.shield_information_barrier_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier_segment" of type "CreateShieldInformationBarrierSegmentMemberRequestBody" to be defined',
    });
  }
  const shieldInformationBarrierSegment: CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField =
    deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(
      val.shield_information_barrier_segment,
    );
  if (val.user == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user" of type "CreateShieldInformationBarrierSegmentMemberRequestBody" to be defined',
    });
  }
  const user: UserBase = deserializeUserBase(val.user);
  return {
    type: type,
    shieldInformationBarrier: shieldInformationBarrier,
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    user: user,
  } satisfies CreateShieldInformationBarrierSegmentMemberRequestBody;
}
