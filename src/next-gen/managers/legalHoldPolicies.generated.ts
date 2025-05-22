import { serializeLegalHoldPolicies } from '../schemas/legalHoldPolicies.generated.js';
import { deserializeLegalHoldPolicies } from '../schemas/legalHoldPolicies.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeLegalHoldPolicy } from '../schemas/legalHoldPolicy.generated.js';
import { deserializeLegalHoldPolicy } from '../schemas/legalHoldPolicy.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { LegalHoldPolicies } from '../schemas/legalHoldPolicies.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { LegalHoldPolicy } from '../schemas/legalHoldPolicy.generated.js';
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
import { DateTime } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class CreateLegalHoldPolicyOptionals {
  readonly headers: CreateLegalHoldPolicyHeaders =
    new CreateLegalHoldPolicyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateLegalHoldPolicyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateLegalHoldPolicyOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateLegalHoldPolicyOptionalsInput {
  readonly headers?: CreateLegalHoldPolicyHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetLegalHoldPolicyByIdOptionals {
  readonly headers: GetLegalHoldPolicyByIdHeaders =
    new GetLegalHoldPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetLegalHoldPolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetLegalHoldPolicyByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetLegalHoldPolicyByIdOptionalsInput {
  readonly headers?: GetLegalHoldPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateLegalHoldPolicyByIdOptionals {
  readonly requestBody: UpdateLegalHoldPolicyByIdRequestBody =
    {} satisfies UpdateLegalHoldPolicyByIdRequestBody;
  readonly headers: UpdateLegalHoldPolicyByIdHeaders =
    new UpdateLegalHoldPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateLegalHoldPolicyByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateLegalHoldPolicyByIdOptionals,
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
export interface UpdateLegalHoldPolicyByIdOptionalsInput {
  readonly requestBody?: UpdateLegalHoldPolicyByIdRequestBody;
  readonly headers?: UpdateLegalHoldPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteLegalHoldPolicyByIdOptionals {
  readonly headers: DeleteLegalHoldPolicyByIdHeaders =
    new DeleteLegalHoldPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteLegalHoldPolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteLegalHoldPolicyByIdOptionals,
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
export interface DeleteLegalHoldPolicyByIdOptionalsInput {
  readonly headers?: DeleteLegalHoldPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetLegalHoldPoliciesQueryParams {
  /**
   * Limits results to policies for which the names start with
   * this search term. This is a case-insensitive prefix. */
  readonly policyName?: string;
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
export class GetLegalHoldPoliciesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetLegalHoldPoliciesHeaders, 'extraHeaders'> &
      Partial<Pick<GetLegalHoldPoliciesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetLegalHoldPoliciesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateLegalHoldPolicyRequestBody {
  /**
   * The name of the policy. */
  readonly policyName: string;
  /**
   * A description for the policy. */
  readonly description?: string;
  /**
   * The filter start date.
   *
   * When this policy is applied using a `custodian` legal
   * hold assignments, it will only apply to file versions
   * created or uploaded inside of the
   * date range. Other assignment types, such as folders and
   * files, will ignore the date filter.
   *
   * Required if `is_ongoing` is set to `false`. */
  readonly filterStartedAt?: DateTime;
  /**
   * The filter end date.
   *
   * When this policy is applied using a `custodian` legal
   * hold assignments, it will only apply to file versions
   * created or uploaded inside of the
   * date range. Other assignment types, such as folders and
   * files, will ignore the date filter.
   *
   * Required if `is_ongoing` is set to `false`. */
  readonly filterEndedAt?: DateTime;
  /**
   * Whether new assignments under this policy should
   * continue applying to files even after initialization.
   *
   * When this policy is applied using a legal hold assignment,
   * it will continue applying the policy to any new file versions
   * even after it has been applied.
   *
   * For example, if a legal hold assignment is placed on a user
   * today, and that user uploads a file tomorrow, that file will
   * get held. This will continue until the policy is retired.
   *
   * Required if no filter dates are set. */
  readonly isOngoing?: boolean;
  readonly rawData?: SerializedData;
}
export class CreateLegalHoldPolicyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateLegalHoldPolicyHeaders, 'extraHeaders'> &
      Partial<Pick<CreateLegalHoldPolicyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateLegalHoldPolicyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetLegalHoldPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetLegalHoldPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetLegalHoldPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetLegalHoldPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateLegalHoldPolicyByIdRequestBody {
  /**
   * The name of the policy. */
  readonly policyName?: string;
  /**
   * A description for the policy. */
  readonly description?: string;
  /**
   * Notes around why the policy was released. */
  readonly releaseNotes?: string;
  readonly rawData?: SerializedData;
}
export class UpdateLegalHoldPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateLegalHoldPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateLegalHoldPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateLegalHoldPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteLegalHoldPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteLegalHoldPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteLegalHoldPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteLegalHoldPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class LegalHoldPoliciesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      LegalHoldPoliciesManager,
      | 'networkSession'
      | 'getLegalHoldPolicies'
      | 'createLegalHoldPolicy'
      | 'getLegalHoldPolicyById'
      | 'updateLegalHoldPolicyById'
      | 'deleteLegalHoldPolicyById'
    > &
      Partial<Pick<LegalHoldPoliciesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves a list of legal hold policies that belong to
   * an enterprise.
   * @param {GetLegalHoldPoliciesQueryParams} queryParams Query parameters of getLegalHoldPolicies method
   * @param {GetLegalHoldPoliciesHeadersInput} headersInput Headers of getLegalHoldPolicies method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<LegalHoldPolicies>}
   */
  async getLegalHoldPolicies(
    queryParams: GetLegalHoldPoliciesQueryParams = {} satisfies GetLegalHoldPoliciesQueryParams,
    headersInput: GetLegalHoldPoliciesHeadersInput = new GetLegalHoldPoliciesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<LegalHoldPolicies> {
    const headers: GetLegalHoldPoliciesHeaders =
      new GetLegalHoldPoliciesHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['policy_name']: toString(queryParams.policyName) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
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
            '/2.0/legal_hold_policies',
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
      ...deserializeLegalHoldPolicies(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Create a new legal hold policy.
   * @param {CreateLegalHoldPolicyRequestBody} requestBody Request body of createLegalHoldPolicy method
   * @param {CreateLegalHoldPolicyOptionalsInput} optionalsInput
   * @returns {Promise<LegalHoldPolicy>}
   */
  async createLegalHoldPolicy(
    requestBody: CreateLegalHoldPolicyRequestBody,
    optionalsInput: CreateLegalHoldPolicyOptionalsInput = {},
  ): Promise<LegalHoldPolicy> {
    const optionals: CreateLegalHoldPolicyOptionals =
      new CreateLegalHoldPolicyOptionals({
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
            '/2.0/legal_hold_policies',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateLegalHoldPolicyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeLegalHoldPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieve a legal hold policy.
     * @param {string} legalHoldPolicyId The ID of the legal hold policy
    Example: "324432"
     * @param {GetLegalHoldPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<LegalHoldPolicy>}
     */
  async getLegalHoldPolicyById(
    legalHoldPolicyId: string,
    optionalsInput: GetLegalHoldPolicyByIdOptionalsInput = {},
  ): Promise<LegalHoldPolicy> {
    const optionals: GetLegalHoldPolicyByIdOptionals =
      new GetLegalHoldPolicyByIdOptionals({
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
            '/2.0/legal_hold_policies/',
            toString(legalHoldPolicyId) as string,
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
      ...deserializeLegalHoldPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Update legal hold policy.
     * @param {string} legalHoldPolicyId The ID of the legal hold policy
    Example: "324432"
     * @param {UpdateLegalHoldPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<LegalHoldPolicy>}
     */
  async updateLegalHoldPolicyById(
    legalHoldPolicyId: string,
    optionalsInput: UpdateLegalHoldPolicyByIdOptionalsInput = {},
  ): Promise<LegalHoldPolicy> {
    const optionals: UpdateLegalHoldPolicyByIdOptionals =
      new UpdateLegalHoldPolicyByIdOptionals({
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
            '/2.0/legal_hold_policies/',
            toString(legalHoldPolicyId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateLegalHoldPolicyByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeLegalHoldPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete an existing legal hold policy.
     *
     * This is an asynchronous process. The policy will not be
     * fully deleted yet when the response returns.
     * @param {string} legalHoldPolicyId The ID of the legal hold policy
    Example: "324432"
     * @param {DeleteLegalHoldPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteLegalHoldPolicyById(
    legalHoldPolicyId: string,
    optionalsInput: DeleteLegalHoldPolicyByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteLegalHoldPolicyByIdOptionals =
      new DeleteLegalHoldPolicyByIdOptionals({
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
            '/2.0/legal_hold_policies/',
            toString(legalHoldPolicyId) as string,
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
export interface LegalHoldPoliciesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateLegalHoldPolicyRequestBody(
  val: CreateLegalHoldPolicyRequestBody,
): SerializedData {
  return {
    ['policy_name']: val.policyName,
    ['description']: val.description,
    ['filter_started_at']:
      val.filterStartedAt == void 0
        ? val.filterStartedAt
        : serializeDateTime(val.filterStartedAt),
    ['filter_ended_at']:
      val.filterEndedAt == void 0
        ? val.filterEndedAt
        : serializeDateTime(val.filterEndedAt),
    ['is_ongoing']: val.isOngoing,
  };
}
export function deserializeCreateLegalHoldPolicyRequestBody(
  val: SerializedData,
): CreateLegalHoldPolicyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateLegalHoldPolicyRequestBody"',
    });
  }
  if (val.policy_name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "policy_name" of type "CreateLegalHoldPolicyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_name" of type "CreateLegalHoldPolicyRequestBody"',
    });
  }
  const policyName: string = val.policy_name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateLegalHoldPolicyRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (
    !(val.filter_started_at == void 0) &&
    !sdIsString(val.filter_started_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "filter_started_at" of type "CreateLegalHoldPolicyRequestBody"',
    });
  }
  const filterStartedAt: undefined | DateTime =
    val.filter_started_at == void 0
      ? void 0
      : deserializeDateTime(val.filter_started_at);
  if (!(val.filter_ended_at == void 0) && !sdIsString(val.filter_ended_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "filter_ended_at" of type "CreateLegalHoldPolicyRequestBody"',
    });
  }
  const filterEndedAt: undefined | DateTime =
    val.filter_ended_at == void 0
      ? void 0
      : deserializeDateTime(val.filter_ended_at);
  if (!(val.is_ongoing == void 0) && !sdIsBoolean(val.is_ongoing)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_ongoing" of type "CreateLegalHoldPolicyRequestBody"',
    });
  }
  const isOngoing: undefined | boolean =
    val.is_ongoing == void 0 ? void 0 : val.is_ongoing;
  return {
    policyName: policyName,
    description: description,
    filterStartedAt: filterStartedAt,
    filterEndedAt: filterEndedAt,
    isOngoing: isOngoing,
  } satisfies CreateLegalHoldPolicyRequestBody;
}
export function serializeUpdateLegalHoldPolicyByIdRequestBody(
  val: UpdateLegalHoldPolicyByIdRequestBody,
): SerializedData {
  return {
    ['policy_name']: val.policyName,
    ['description']: val.description,
    ['release_notes']: val.releaseNotes,
  };
}
export function deserializeUpdateLegalHoldPolicyByIdRequestBody(
  val: SerializedData,
): UpdateLegalHoldPolicyByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateLegalHoldPolicyByIdRequestBody"',
    });
  }
  if (!(val.policy_name == void 0) && !sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_name" of type "UpdateLegalHoldPolicyByIdRequestBody"',
    });
  }
  const policyName: undefined | string =
    val.policy_name == void 0 ? void 0 : val.policy_name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateLegalHoldPolicyByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.release_notes == void 0) && !sdIsString(val.release_notes)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "release_notes" of type "UpdateLegalHoldPolicyByIdRequestBody"',
    });
  }
  const releaseNotes: undefined | string =
    val.release_notes == void 0 ? void 0 : val.release_notes;
  return {
    policyName: policyName,
    description: description,
    releaseNotes: releaseNotes,
  } satisfies UpdateLegalHoldPolicyByIdRequestBody;
}
