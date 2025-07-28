import { serializeInvite } from '../schemas/invite.generated.js';
import { deserializeInvite } from '../schemas/invite.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Invite } from '../schemas/invite.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
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
export class CreateInviteOptionals {
  readonly queryParams: CreateInviteQueryParams =
    {} satisfies CreateInviteQueryParams;
  readonly headers: CreateInviteHeaders = new CreateInviteHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateInviteOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateInviteOptionals,
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
export interface CreateInviteOptionalsInput {
  readonly queryParams?: CreateInviteQueryParams;
  readonly headers?: CreateInviteHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetInviteByIdOptionals {
  readonly queryParams: GetInviteByIdQueryParams =
    {} satisfies GetInviteByIdQueryParams;
  readonly headers: GetInviteByIdHeaders = new GetInviteByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetInviteByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetInviteByIdOptionals,
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
export interface GetInviteByIdOptionalsInput {
  readonly queryParams?: GetInviteByIdQueryParams;
  readonly headers?: GetInviteByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface CreateInviteRequestBodyEnterpriseField {
  /**
   * The ID of the enterprise. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateInviteRequestBodyActionableByField {
  /**
   * The login of the invited user. */
  readonly login?: string;
  readonly rawData?: SerializedData;
}
export interface CreateInviteRequestBody {
  /**
   * The enterprise to invite the user to. */
  readonly enterprise: CreateInviteRequestBodyEnterpriseField;
  /**
   * The user to invite. */
  readonly actionableBy: CreateInviteRequestBodyActionableByField;
  readonly rawData?: SerializedData;
}
export interface CreateInviteQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class CreateInviteHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateInviteHeaders, 'extraHeaders'> &
      Partial<Pick<CreateInviteHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateInviteHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetInviteByIdQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class GetInviteByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetInviteByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetInviteByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetInviteByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class InvitesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      InvitesManager,
      'networkSession' | 'createInvite' | 'getInviteById'
    > &
      Partial<Pick<InvitesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Invites an existing external user to join an enterprise.
   *
   * The existing user can not be part of another enterprise and
   * must already have a Box account. Once invited, the user will receive an
   * email and are prompted to accept the invitation within the
   * Box web application.
   *
   * This method requires the "Manage An Enterprise" scope enabled for
   * the application, which can be enabled within the developer console.
   * @param {CreateInviteRequestBody} requestBody Request body of createInvite method
   * @param {CreateInviteOptionalsInput} optionalsInput
   * @returns {Promise<Invite>}
   */
  async createInvite(
    requestBody: CreateInviteRequestBody,
    optionalsInput: CreateInviteOptionalsInput = {},
  ): Promise<Invite> {
    const optionals: CreateInviteOptionals = new CreateInviteOptionals({
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
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/invites',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateInviteRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeInvite(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns the status of a user invite.
     * @param {string} inviteId The ID of an invite.
    Example: "213723"
     * @param {GetInviteByIdOptionalsInput} optionalsInput
     * @returns {Promise<Invite>}
     */
  async getInviteById(
    inviteId: string,
    optionalsInput: GetInviteByIdOptionalsInput = {},
  ): Promise<Invite> {
    const optionals: GetInviteByIdOptionals = new GetInviteByIdOptionals({
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
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/invites/',
            toString(inviteId) as string,
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
      ...deserializeInvite(response.data!),
      rawData: response.data!,
    };
  }
}
export interface InvitesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateInviteRequestBodyEnterpriseField(
  val: CreateInviteRequestBodyEnterpriseField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateInviteRequestBodyEnterpriseField(
  val: SerializedData,
): CreateInviteRequestBodyEnterpriseField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateInviteRequestBodyEnterpriseField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateInviteRequestBodyEnterpriseField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateInviteRequestBodyEnterpriseField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CreateInviteRequestBodyEnterpriseField;
}
export function serializeCreateInviteRequestBodyActionableByField(
  val: CreateInviteRequestBodyActionableByField,
): SerializedData {
  return { ['login']: val.login };
}
export function deserializeCreateInviteRequestBodyActionableByField(
  val: SerializedData,
): CreateInviteRequestBodyActionableByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateInviteRequestBodyActionableByField"',
    });
  }
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "login" of type "CreateInviteRequestBodyActionableByField"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  return { login: login } satisfies CreateInviteRequestBodyActionableByField;
}
export function serializeCreateInviteRequestBody(
  val: CreateInviteRequestBody,
): SerializedData {
  return {
    ['enterprise']: serializeCreateInviteRequestBodyEnterpriseField(
      val.enterprise,
    ),
    ['actionable_by']: serializeCreateInviteRequestBodyActionableByField(
      val.actionableBy,
    ),
  };
}
export function deserializeCreateInviteRequestBody(
  val: SerializedData,
): CreateInviteRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateInviteRequestBody"',
    });
  }
  if (val.enterprise == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enterprise" of type "CreateInviteRequestBody" to be defined',
    });
  }
  const enterprise: CreateInviteRequestBodyEnterpriseField =
    deserializeCreateInviteRequestBodyEnterpriseField(val.enterprise);
  if (val.actionable_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "actionable_by" of type "CreateInviteRequestBody" to be defined',
    });
  }
  const actionableBy: CreateInviteRequestBodyActionableByField =
    deserializeCreateInviteRequestBodyActionableByField(val.actionable_by);
  return {
    enterprise: enterprise,
    actionableBy: actionableBy,
  } satisfies CreateInviteRequestBody;
}
