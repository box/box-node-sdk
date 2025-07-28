import { serializeRetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { deserializeRetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeRetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { deserializeRetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { serializeUserMini } from '../schemas/userMini.generated.js';
import { deserializeUserMini } from '../schemas/userMini.generated.js';
import { serializeUserBase } from '../schemas/userBase.generated.js';
import { deserializeUserBase } from '../schemas/userBase.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { RetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { UserMini } from '../schemas/userMini.generated.js';
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
export class CreateRetentionPolicyOptionals {
  readonly headers: CreateRetentionPolicyHeaders =
    new CreateRetentionPolicyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateRetentionPolicyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateRetentionPolicyOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateRetentionPolicyOptionalsInput {
  readonly headers?: CreateRetentionPolicyHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetRetentionPolicyByIdOptionals {
  readonly queryParams: GetRetentionPolicyByIdQueryParams =
    {} satisfies GetRetentionPolicyByIdQueryParams;
  readonly headers: GetRetentionPolicyByIdHeaders =
    new GetRetentionPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetRetentionPolicyByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetRetentionPolicyByIdOptionals,
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
export interface GetRetentionPolicyByIdOptionalsInput {
  readonly queryParams?: GetRetentionPolicyByIdQueryParams;
  readonly headers?: GetRetentionPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateRetentionPolicyByIdOptionals {
  readonly requestBody: UpdateRetentionPolicyByIdRequestBody =
    {} satisfies UpdateRetentionPolicyByIdRequestBody;
  readonly headers: UpdateRetentionPolicyByIdHeaders =
    new UpdateRetentionPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateRetentionPolicyByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateRetentionPolicyByIdOptionals,
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
export interface UpdateRetentionPolicyByIdOptionalsInput {
  readonly requestBody?: UpdateRetentionPolicyByIdRequestBody;
  readonly headers?: UpdateRetentionPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteRetentionPolicyByIdOptionals {
  readonly headers: DeleteRetentionPolicyByIdHeaders =
    new DeleteRetentionPolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteRetentionPolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteRetentionPolicyByIdOptionals,
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
export interface DeleteRetentionPolicyByIdOptionalsInput {
  readonly headers?: DeleteRetentionPolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetRetentionPoliciesQueryParamsPolicyTypeField =
  | 'finite'
  | 'indefinite'
  | string;
export interface GetRetentionPoliciesQueryParams {
  /**
   * Filters results by a case sensitive prefix of the name of
   * retention policies. */
  readonly policyName?: string;
  /**
   * Filters results by the type of retention policy. */
  readonly policyType?: GetRetentionPoliciesQueryParamsPolicyTypeField;
  /**
   * Filters results by the ID of the user who created policy. */
  readonly createdByUserId?: string;
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
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
}
export class GetRetentionPoliciesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetRetentionPoliciesHeaders, 'extraHeaders'> &
      Partial<Pick<GetRetentionPoliciesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetRetentionPoliciesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateRetentionPolicyRequestBodyPolicyTypeField =
  | 'finite'
  | 'indefinite'
  | string;
export type CreateRetentionPolicyRequestBodyDispositionActionField =
  | 'permanently_delete'
  | 'remove_retention'
  | string;
export type CreateRetentionPolicyRequestBodyRetentionTypeField =
  | 'modifiable'
  | 'non_modifiable'
  | string;
export interface CreateRetentionPolicyRequestBody {
  /**
   * The name for the retention policy. */
  readonly policyName: string;
  /**
   * The additional text description of the retention policy. */
  readonly description?: string;
  /**
   * The type of the retention policy. A retention
   * policy type can either be `finite`, where a
   * specific amount of time to retain the content is known
   * upfront, or `indefinite`, where the amount of time
   * to retain the content is still unknown. */
  readonly policyType: CreateRetentionPolicyRequestBodyPolicyTypeField;
  /**
   * The disposition action of the retention policy.
   * `permanently_delete` deletes the content
   * retained by the policy permanently.
   * `remove_retention` lifts retention policy
   * from the content, allowing it to be deleted
   * by users once the retention policy has expired. */
  readonly dispositionAction: CreateRetentionPolicyRequestBodyDispositionActionField;
  /**
   * The length of the retention policy. This value
   * specifies the duration in days that the retention
   * policy will be active for after being assigned to
   * content.  If the policy has a `policy_type` of
   * `indefinite`, the `retention_length` will also be
   * `indefinite`. */
  readonly retentionLength?: string;
  /**
   * Specifies the retention type:
   *
   * * `modifiable`: You can modify the retention policy. For example,
   * you can add or remove folders, shorten or lengthen
   * the policy duration, or delete the assignment.
   * Use this type if your retention policy
   * is not related to any regulatory purposes.
   *
   * * `non_modifiable`: You can modify the retention policy
   * only in a limited way: add a folder, lengthen the duration,
   * retire the policy, change the disposition action
   * or notification settings. You cannot perform other actions,
   * such as deleting the assignment or shortening the
   * policy duration. Use this type to ensure
   * compliance with regulatory retention policies. */
  readonly retentionType?: CreateRetentionPolicyRequestBodyRetentionTypeField;
  /**
   * Whether the owner of a file will be allowed to
   * extend the retention. */
  readonly canOwnerExtendRetention?: boolean;
  /**
   * Whether owner and co-owners of a file are notified
   * when the policy nears expiration. */
  readonly areOwnersNotified?: boolean;
  /**
   * A list of users notified when
   * the retention policy duration is about to end. */
  readonly customNotificationRecipients?: readonly UserMini[];
  readonly rawData?: SerializedData;
}
export class CreateRetentionPolicyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateRetentionPolicyHeaders, 'extraHeaders'> &
      Partial<Pick<CreateRetentionPolicyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateRetentionPolicyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetRetentionPolicyByIdQueryParams {
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
export class GetRetentionPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetRetentionPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetRetentionPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetRetentionPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateRetentionPolicyByIdRequestBody {
  /**
   * The name for the retention policy. */
  readonly policyName?: string | null;
  /**
   * The additional text description of the retention policy. */
  readonly description?: string | null;
  /**
   * The disposition action of the retention policy.
   * This action can be `permanently_delete`, which
   * will cause the content retained by the policy
   * to be permanently deleted, or `remove_retention`,
   * which will lift the retention policy from the content,
   * allowing it to be deleted by users,
   * once the retention policy has expired.
   * You can use `null` if you don't want to change `disposition_action`. */
  readonly dispositionAction?: string;
  /**
   * Specifies the retention type:
   *
   * * `modifiable`: You can modify the retention policy. For example,
   * you can add or remove folders, shorten or lengthen
   * the policy duration, or delete the assignment.
   * Use this type if your retention policy
   * is not related to any regulatory purposes.
   * * `non-modifiable`: You can modify the retention policy
   * only in a limited way: add a folder, lengthen the duration,
   * retire the policy, change the disposition action
   * or notification settings. You cannot perform other actions,
   * such as deleting the assignment or shortening the
   * policy duration. Use this type to ensure
   * compliance with regulatory retention policies.
   *
   * When updating a retention policy, you can use
   * `non-modifiable` type only. You can convert a
   * `modifiable` policy to `non-modifiable`, but
   * not the other way around. */
  readonly retentionType?: string | null;
  /**
   * The length of the retention policy. This value
   * specifies the duration in days that the retention
   * policy will be active for after being assigned to
   * content.  If the policy has a `policy_type` of
   * `indefinite`, the `retention_length` will also be
   * `indefinite`. */
  readonly retentionLength?: string;
  /**
   * Used to retire a retention policy.
   *
   * If not retiring a policy, do not include this parameter
   * or set it to `null`. */
  readonly status?: string | null;
  /**
   * Determines if the owner of items under the policy
   * can extend the retention when the original retention
   * duration is about to end. */
  readonly canOwnerExtendRetention?: boolean | null;
  /**
   * Determines if owners and co-owners of items
   * under the policy are notified when
   * the retention duration is about to end. */
  readonly areOwnersNotified?: boolean | null;
  /**
   * A list of users notified when the retention duration is about to end. */
  readonly customNotificationRecipients?: readonly UserBase[] | null;
  readonly rawData?: SerializedData;
}
export class UpdateRetentionPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateRetentionPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateRetentionPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateRetentionPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteRetentionPolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteRetentionPolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteRetentionPolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteRetentionPolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class RetentionPoliciesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      RetentionPoliciesManager,
      | 'networkSession'
      | 'getRetentionPolicies'
      | 'createRetentionPolicy'
      | 'getRetentionPolicyById'
      | 'updateRetentionPolicyById'
      | 'deleteRetentionPolicyById'
    > &
      Partial<Pick<RetentionPoliciesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all of the retention policies for an enterprise.
   * @param {GetRetentionPoliciesQueryParams} queryParams Query parameters of getRetentionPolicies method
   * @param {GetRetentionPoliciesHeadersInput} headersInput Headers of getRetentionPolicies method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<RetentionPolicies>}
   */
  async getRetentionPolicies(
    queryParams: GetRetentionPoliciesQueryParams = {} satisfies GetRetentionPoliciesQueryParams,
    headersInput: GetRetentionPoliciesHeadersInput = new GetRetentionPoliciesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<RetentionPolicies> {
    const headers: GetRetentionPoliciesHeaders =
      new GetRetentionPoliciesHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['policy_name']: toString(queryParams.policyName) as string,
      ['policy_type']: toString(queryParams.policyType) as string,
      ['created_by_user_id']: toString(queryParams.createdByUserId) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/retention_policies',
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
      ...deserializeRetentionPolicies(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a retention policy.
   * @param {CreateRetentionPolicyRequestBody} requestBody Request body of createRetentionPolicy method
   * @param {CreateRetentionPolicyOptionalsInput} optionalsInput
   * @returns {Promise<RetentionPolicy>}
   */
  async createRetentionPolicy(
    requestBody: CreateRetentionPolicyRequestBody,
    optionalsInput: CreateRetentionPolicyOptionalsInput = {},
  ): Promise<RetentionPolicy> {
    const optionals: CreateRetentionPolicyOptionals =
      new CreateRetentionPolicyOptionals({
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
            '/2.0/retention_policies',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateRetentionPolicyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeRetentionPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a retention policy.
     * @param {string} retentionPolicyId The ID of the retention policy.
    Example: "982312"
     * @param {GetRetentionPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<RetentionPolicy>}
     */
  async getRetentionPolicyById(
    retentionPolicyId: string,
    optionalsInput: GetRetentionPolicyByIdOptionalsInput = {},
  ): Promise<RetentionPolicy> {
    const optionals: GetRetentionPolicyByIdOptionals =
      new GetRetentionPolicyByIdOptionals({
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
            '/2.0/retention_policies/',
            toString(retentionPolicyId) as string,
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
      ...deserializeRetentionPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a retention policy.
     * @param {string} retentionPolicyId The ID of the retention policy.
    Example: "982312"
     * @param {UpdateRetentionPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<RetentionPolicy>}
     */
  async updateRetentionPolicyById(
    retentionPolicyId: string,
    optionalsInput: UpdateRetentionPolicyByIdOptionalsInput = {},
  ): Promise<RetentionPolicy> {
    const optionals: UpdateRetentionPolicyByIdOptionals =
      new UpdateRetentionPolicyByIdOptionals({
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
            '/2.0/retention_policies/',
            toString(retentionPolicyId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateRetentionPolicyByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeRetentionPolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes a retention policy.
     * @param {string} retentionPolicyId The ID of the retention policy.
    Example: "982312"
     * @param {DeleteRetentionPolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteRetentionPolicyById(
    retentionPolicyId: string,
    optionalsInput: DeleteRetentionPolicyByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteRetentionPolicyByIdOptionals =
      new DeleteRetentionPolicyByIdOptionals({
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
            '/2.0/retention_policies/',
            toString(retentionPolicyId) as string,
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
export interface RetentionPoliciesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetRetentionPoliciesQueryParamsPolicyTypeField(
  val: GetRetentionPoliciesQueryParamsPolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeGetRetentionPoliciesQueryParamsPolicyTypeField(
  val: SerializedData,
): GetRetentionPoliciesQueryParamsPolicyTypeField {
  if (val == 'finite') {
    return val;
  }
  if (val == 'indefinite') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetRetentionPoliciesQueryParamsPolicyTypeField",
  });
}
export function serializeCreateRetentionPolicyRequestBodyPolicyTypeField(
  val: CreateRetentionPolicyRequestBodyPolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateRetentionPolicyRequestBodyPolicyTypeField(
  val: SerializedData,
): CreateRetentionPolicyRequestBodyPolicyTypeField {
  if (val == 'finite') {
    return val;
  }
  if (val == 'indefinite') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateRetentionPolicyRequestBodyPolicyTypeField",
  });
}
export function serializeCreateRetentionPolicyRequestBodyDispositionActionField(
  val: CreateRetentionPolicyRequestBodyDispositionActionField,
): SerializedData {
  return val;
}
export function deserializeCreateRetentionPolicyRequestBodyDispositionActionField(
  val: SerializedData,
): CreateRetentionPolicyRequestBodyDispositionActionField {
  if (val == 'permanently_delete') {
    return val;
  }
  if (val == 'remove_retention') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateRetentionPolicyRequestBodyDispositionActionField",
  });
}
export function serializeCreateRetentionPolicyRequestBodyRetentionTypeField(
  val: CreateRetentionPolicyRequestBodyRetentionTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateRetentionPolicyRequestBodyRetentionTypeField(
  val: SerializedData,
): CreateRetentionPolicyRequestBodyRetentionTypeField {
  if (val == 'modifiable') {
    return val;
  }
  if (val == 'non_modifiable') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateRetentionPolicyRequestBodyRetentionTypeField",
  });
}
export function serializeCreateRetentionPolicyRequestBody(
  val: CreateRetentionPolicyRequestBody,
): SerializedData {
  return {
    ['policy_name']: val.policyName,
    ['description']: val.description,
    ['policy_type']: serializeCreateRetentionPolicyRequestBodyPolicyTypeField(
      val.policyType,
    ),
    ['disposition_action']:
      serializeCreateRetentionPolicyRequestBodyDispositionActionField(
        val.dispositionAction,
      ),
    ['retention_length']: val.retentionLength,
    ['retention_type']:
      val.retentionType == void 0
        ? val.retentionType
        : serializeCreateRetentionPolicyRequestBodyRetentionTypeField(
            val.retentionType,
          ),
    ['can_owner_extend_retention']: val.canOwnerExtendRetention,
    ['are_owners_notified']: val.areOwnersNotified,
    ['custom_notification_recipients']:
      val.customNotificationRecipients == void 0
        ? val.customNotificationRecipients
        : (val.customNotificationRecipients.map(function (
            item: UserMini,
          ): SerializedData {
            return serializeUserMini(item);
          }) as readonly any[]),
  };
}
export function deserializeCreateRetentionPolicyRequestBody(
  val: SerializedData,
): CreateRetentionPolicyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateRetentionPolicyRequestBody"',
    });
  }
  if (val.policy_name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "policy_name" of type "CreateRetentionPolicyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_name" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const policyName: string = val.policy_name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (val.policy_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "policy_type" of type "CreateRetentionPolicyRequestBody" to be defined',
    });
  }
  const policyType: CreateRetentionPolicyRequestBodyPolicyTypeField =
    deserializeCreateRetentionPolicyRequestBodyPolicyTypeField(val.policy_type);
  if (val.disposition_action == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "disposition_action" of type "CreateRetentionPolicyRequestBody" to be defined',
    });
  }
  const dispositionAction: CreateRetentionPolicyRequestBodyDispositionActionField =
    deserializeCreateRetentionPolicyRequestBodyDispositionActionField(
      val.disposition_action,
    );
  if (!(val.retention_length == void 0) && !sdIsString(val.retention_length)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "retention_length" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const retentionLength: undefined | string =
    val.retention_length == void 0 ? void 0 : val.retention_length;
  const retentionType:
    | undefined
    | CreateRetentionPolicyRequestBodyRetentionTypeField =
    val.retention_type == void 0
      ? void 0
      : deserializeCreateRetentionPolicyRequestBodyRetentionTypeField(
          val.retention_type,
        );
  if (
    !(val.can_owner_extend_retention == void 0) &&
    !sdIsBoolean(val.can_owner_extend_retention)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_owner_extend_retention" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const canOwnerExtendRetention: undefined | boolean =
    val.can_owner_extend_retention == void 0
      ? void 0
      : val.can_owner_extend_retention;
  if (
    !(val.are_owners_notified == void 0) &&
    !sdIsBoolean(val.are_owners_notified)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_owners_notified" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const areOwnersNotified: undefined | boolean =
    val.are_owners_notified == void 0 ? void 0 : val.are_owners_notified;
  if (
    !(val.custom_notification_recipients == void 0) &&
    !sdIsList(val.custom_notification_recipients)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "custom_notification_recipients" of type "CreateRetentionPolicyRequestBody"',
    });
  }
  const customNotificationRecipients: undefined | readonly UserMini[] =
    val.custom_notification_recipients == void 0
      ? void 0
      : sdIsList(val.custom_notification_recipients)
        ? (val.custom_notification_recipients.map(function (
            itm: SerializedData,
          ): UserMini {
            return deserializeUserMini(itm);
          }) as readonly any[])
        : [];
  return {
    policyName: policyName,
    description: description,
    policyType: policyType,
    dispositionAction: dispositionAction,
    retentionLength: retentionLength,
    retentionType: retentionType,
    canOwnerExtendRetention: canOwnerExtendRetention,
    areOwnersNotified: areOwnersNotified,
    customNotificationRecipients: customNotificationRecipients,
  } satisfies CreateRetentionPolicyRequestBody;
}
export function serializeUpdateRetentionPolicyByIdRequestBody(
  val: UpdateRetentionPolicyByIdRequestBody,
): SerializedData {
  return {
    ['policy_name']: val.policyName,
    ['description']: val.description,
    ['disposition_action']: val.dispositionAction,
    ['retention_type']: val.retentionType,
    ['retention_length']: val.retentionLength,
    ['status']: val.status,
    ['can_owner_extend_retention']: val.canOwnerExtendRetention,
    ['are_owners_notified']: val.areOwnersNotified,
    ['custom_notification_recipients']:
      val.customNotificationRecipients == void 0
        ? val.customNotificationRecipients
        : (val.customNotificationRecipients.map(function (
            item: UserBase,
          ): SerializedData {
            return serializeUserBase(item);
          }) as readonly any[]),
  };
}
export function deserializeUpdateRetentionPolicyByIdRequestBody(
  val: SerializedData,
): UpdateRetentionPolicyByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  if (!(val.policy_name == void 0) && !sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_name" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const policyName: undefined | string =
    val.policy_name == void 0 ? void 0 : val.policy_name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (
    !(val.disposition_action == void 0) &&
    !sdIsString(val.disposition_action)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "disposition_action" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const dispositionAction: undefined | string =
    val.disposition_action == void 0 ? void 0 : val.disposition_action;
  if (!(val.retention_type == void 0) && !sdIsString(val.retention_type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "retention_type" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const retentionType: undefined | string =
    val.retention_type == void 0 ? void 0 : val.retention_type;
  if (!(val.retention_length == void 0) && !sdIsString(val.retention_length)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "retention_length" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const retentionLength: undefined | string =
    val.retention_length == void 0 ? void 0 : val.retention_length;
  if (!(val.status == void 0) && !sdIsString(val.status)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "status" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const status: undefined | string = val.status == void 0 ? void 0 : val.status;
  if (
    !(val.can_owner_extend_retention == void 0) &&
    !sdIsBoolean(val.can_owner_extend_retention)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_owner_extend_retention" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const canOwnerExtendRetention: undefined | boolean =
    val.can_owner_extend_retention == void 0
      ? void 0
      : val.can_owner_extend_retention;
  if (
    !(val.are_owners_notified == void 0) &&
    !sdIsBoolean(val.are_owners_notified)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_owners_notified" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const areOwnersNotified: undefined | boolean =
    val.are_owners_notified == void 0 ? void 0 : val.are_owners_notified;
  if (
    !(val.custom_notification_recipients == void 0) &&
    !sdIsList(val.custom_notification_recipients)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "custom_notification_recipients" of type "UpdateRetentionPolicyByIdRequestBody"',
    });
  }
  const customNotificationRecipients: undefined | readonly UserBase[] =
    val.custom_notification_recipients == void 0
      ? void 0
      : sdIsList(val.custom_notification_recipients)
        ? (val.custom_notification_recipients.map(function (
            itm: SerializedData,
          ): UserBase {
            return deserializeUserBase(itm);
          }) as readonly any[])
        : [];
  return {
    policyName: policyName,
    description: description,
    dispositionAction: dispositionAction,
    retentionType: retentionType,
    retentionLength: retentionLength,
    status: status,
    canOwnerExtendRetention: canOwnerExtendRetention,
    areOwnersNotified: areOwnersNotified,
    customNotificationRecipients: customNotificationRecipients,
  } satisfies UpdateRetentionPolicyByIdRequestBody;
}
