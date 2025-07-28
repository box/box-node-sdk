import { serializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { deserializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { deserializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { serializeFilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
import { deserializeFilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { RetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { RetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { FilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
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
export class GetRetentionPolicyAssignmentsOptionals {
  readonly queryParams: GetRetentionPolicyAssignmentsQueryParams =
    {} satisfies GetRetentionPolicyAssignmentsQueryParams;
  readonly headers: GetRetentionPolicyAssignmentsHeaders =
    new GetRetentionPolicyAssignmentsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetRetentionPolicyAssignmentsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetRetentionPolicyAssignmentsOptionals,
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
export interface GetRetentionPolicyAssignmentsOptionalsInput {
  readonly queryParams?: GetRetentionPolicyAssignmentsQueryParams;
  readonly headers?: GetRetentionPolicyAssignmentsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateRetentionPolicyAssignmentOptionals {
  readonly headers: CreateRetentionPolicyAssignmentHeaders =
    new CreateRetentionPolicyAssignmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateRetentionPolicyAssignmentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateRetentionPolicyAssignmentOptionals,
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
export interface CreateRetentionPolicyAssignmentOptionalsInput {
  readonly headers?: CreateRetentionPolicyAssignmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetRetentionPolicyAssignmentByIdOptionals {
  readonly queryParams: GetRetentionPolicyAssignmentByIdQueryParams =
    {} satisfies GetRetentionPolicyAssignmentByIdQueryParams;
  readonly headers: GetRetentionPolicyAssignmentByIdHeaders =
    new GetRetentionPolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetRetentionPolicyAssignmentByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetRetentionPolicyAssignmentByIdOptionals,
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
export interface GetRetentionPolicyAssignmentByIdOptionalsInput {
  readonly queryParams?: GetRetentionPolicyAssignmentByIdQueryParams;
  readonly headers?: GetRetentionPolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteRetentionPolicyAssignmentByIdOptionals {
  readonly headers: DeleteRetentionPolicyAssignmentByIdHeaders =
    new DeleteRetentionPolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteRetentionPolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteRetentionPolicyAssignmentByIdOptionals,
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
export interface DeleteRetentionPolicyAssignmentByIdOptionalsInput {
  readonly headers?: DeleteRetentionPolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFilesUnderRetentionPolicyAssignmentOptionals {
  readonly queryParams: GetFilesUnderRetentionPolicyAssignmentQueryParams =
    {} satisfies GetFilesUnderRetentionPolicyAssignmentQueryParams;
  readonly headers: GetFilesUnderRetentionPolicyAssignmentHeaders =
    new GetFilesUnderRetentionPolicyAssignmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFilesUnderRetentionPolicyAssignmentOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFilesUnderRetentionPolicyAssignmentOptionals,
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
export interface GetFilesUnderRetentionPolicyAssignmentOptionalsInput {
  readonly queryParams?: GetFilesUnderRetentionPolicyAssignmentQueryParams;
  readonly headers?: GetFilesUnderRetentionPolicyAssignmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetRetentionPolicyAssignmentsQueryParamsTypeField =
  | 'folder'
  | 'enterprise'
  | 'metadata_template';
export interface GetRetentionPolicyAssignmentsQueryParams {
  /**
   * The type of the retention policy assignment to retrieve. */
  readonly type?: GetRetentionPolicyAssignmentsQueryParamsTypeField;
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
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetRetentionPolicyAssignmentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetRetentionPolicyAssignmentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetRetentionPolicyAssignmentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetRetentionPolicyAssignmentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField =
  | 'enterprise'
  | 'folder'
  | 'metadata_template';
export interface CreateRetentionPolicyAssignmentRequestBodyAssignToField {
  /**
   * The type of item to assign the policy to. */
  readonly type: CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField;
  /**
   * The ID of item to assign the policy to.
   * Set to `null` or omit when `type` is set to
   * `enterprise`. */
  readonly id?: string | null;
  readonly rawData?: SerializedData;
}
export interface CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField {
  /**
   * The metadata attribute key id. */
  readonly field?: string;
  /**
   * The metadata attribute field id. For value, only
   * enum and multiselect types are supported. */
  readonly value?: string;
  readonly rawData?: SerializedData;
}
export interface CreateRetentionPolicyAssignmentRequestBody {
  /**
   * The ID of the retention policy to assign. */
  readonly policyId: string;
  /**
   * The item to assign the policy to. */
  readonly assignTo: CreateRetentionPolicyAssignmentRequestBodyAssignToField;
  /**
   * If the `assign_to` type is `metadata_template`,
   * then optionally add the `filter_fields` parameter which will
   * require an array of objects with a field entry and a value entry.
   * Currently only one object of `field` and `value` is supported. */
  readonly filterFields?: readonly CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField[];
  /**
   * The date the retention policy assignment begins.
   *
   * If the `assigned_to` type is `metadata_template`,
   * this field can be a date field's metadata attribute key id. */
  readonly startDateField?: string;
  readonly rawData?: SerializedData;
}
export class CreateRetentionPolicyAssignmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateRetentionPolicyAssignmentHeaders, 'extraHeaders'> &
      Partial<Pick<CreateRetentionPolicyAssignmentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateRetentionPolicyAssignmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetRetentionPolicyAssignmentByIdQueryParams {
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
export class GetRetentionPolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetRetentionPolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetRetentionPolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetRetentionPolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteRetentionPolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteRetentionPolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteRetentionPolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteRetentionPolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetFilesUnderRetentionPolicyAssignmentQueryParams {
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
export class GetFilesUnderRetentionPolicyAssignmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetFilesUnderRetentionPolicyAssignmentHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetFilesUnderRetentionPolicyAssignmentHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFilesUnderRetentionPolicyAssignmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class RetentionPolicyAssignmentsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      RetentionPolicyAssignmentsManager,
      | 'networkSession'
      | 'getRetentionPolicyAssignments'
      | 'createRetentionPolicyAssignment'
      | 'getRetentionPolicyAssignmentById'
      | 'deleteRetentionPolicyAssignmentById'
      | 'getFilesUnderRetentionPolicyAssignment'
    > &
      Partial<Pick<RetentionPolicyAssignmentsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Returns a list of all retention policy assignments associated with a specified
     * retention policy.
     * @param {string} retentionPolicyId The ID of the retention policy.
    Example: "982312"
     * @param {GetRetentionPolicyAssignmentsOptionalsInput} optionalsInput
     * @returns {Promise<RetentionPolicyAssignments>}
     */
  async getRetentionPolicyAssignments(
    retentionPolicyId: string,
    optionalsInput: GetRetentionPolicyAssignmentsOptionalsInput = {},
  ): Promise<RetentionPolicyAssignments> {
    const optionals: GetRetentionPolicyAssignmentsOptionals =
      new GetRetentionPolicyAssignmentsOptionals({
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
      ['type']: toString(queryParams.type) as string,
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
            '/2.0/retention_policies/',
            toString(retentionPolicyId) as string,
            '/assignments',
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
      ...deserializeRetentionPolicyAssignments(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Assigns a retention policy to an item.
   * @param {CreateRetentionPolicyAssignmentRequestBody} requestBody Request body of createRetentionPolicyAssignment method
   * @param {CreateRetentionPolicyAssignmentOptionalsInput} optionalsInput
   * @returns {Promise<RetentionPolicyAssignment>}
   */
  async createRetentionPolicyAssignment(
    requestBody: CreateRetentionPolicyAssignmentRequestBody,
    optionalsInput: CreateRetentionPolicyAssignmentOptionalsInput = {},
  ): Promise<RetentionPolicyAssignment> {
    const optionals: CreateRetentionPolicyAssignmentOptionals =
      new CreateRetentionPolicyAssignmentOptionals({
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
            '/2.0/retention_policy_assignments',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateRetentionPolicyAssignmentRequestBody(
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
      ...deserializeRetentionPolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a retention policy assignment.
     * @param {string} retentionPolicyAssignmentId The ID of the retention policy assignment.
    Example: "1233123"
     * @param {GetRetentionPolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<RetentionPolicyAssignment>}
     */
  async getRetentionPolicyAssignmentById(
    retentionPolicyAssignmentId: string,
    optionalsInput: GetRetentionPolicyAssignmentByIdOptionalsInput = {},
  ): Promise<RetentionPolicyAssignment> {
    const optionals: GetRetentionPolicyAssignmentByIdOptionals =
      new GetRetentionPolicyAssignmentByIdOptionals({
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
            '/2.0/retention_policy_assignments/',
            toString(retentionPolicyAssignmentId) as string,
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
      ...deserializeRetentionPolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a retention policy assignment
     * applied to content.
     * @param {string} retentionPolicyAssignmentId The ID of the retention policy assignment.
    Example: "1233123"
     * @param {DeleteRetentionPolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteRetentionPolicyAssignmentById(
    retentionPolicyAssignmentId: string,
    optionalsInput: DeleteRetentionPolicyAssignmentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteRetentionPolicyAssignmentByIdOptionals =
      new DeleteRetentionPolicyAssignmentByIdOptionals({
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
            '/2.0/retention_policy_assignments/',
            toString(retentionPolicyAssignmentId) as string,
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
     * Returns a list of files under retention for a retention policy assignment.
     * @param {string} retentionPolicyAssignmentId The ID of the retention policy assignment.
    Example: "1233123"
     * @param {GetFilesUnderRetentionPolicyAssignmentOptionalsInput} optionalsInput
     * @returns {Promise<FilesUnderRetention>}
     */
  async getFilesUnderRetentionPolicyAssignment(
    retentionPolicyAssignmentId: string,
    optionalsInput: GetFilesUnderRetentionPolicyAssignmentOptionalsInput = {},
  ): Promise<FilesUnderRetention> {
    const optionals: GetFilesUnderRetentionPolicyAssignmentOptionals =
      new GetFilesUnderRetentionPolicyAssignmentOptionals({
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
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/retention_policy_assignments/',
            toString(retentionPolicyAssignmentId) as string,
            '/files_under_retention',
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
      ...deserializeFilesUnderRetention(response.data!),
      rawData: response.data!,
    };
  }
}
export interface RetentionPolicyAssignmentsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetRetentionPolicyAssignmentsQueryParamsTypeField(
  val: GetRetentionPolicyAssignmentsQueryParamsTypeField,
): SerializedData {
  return val;
}
export function deserializeGetRetentionPolicyAssignmentsQueryParamsTypeField(
  val: SerializedData,
): GetRetentionPolicyAssignmentsQueryParamsTypeField {
  if (val == 'folder') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (val == 'metadata_template') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetRetentionPolicyAssignmentsQueryParamsTypeField",
  });
}
export function serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(
  val: CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(
  val: SerializedData,
): CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField {
  if (val == 'enterprise') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'metadata_template') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField",
  });
}
export function serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(
  val: CreateRetentionPolicyAssignmentRequestBodyAssignToField,
): SerializedData {
  return {
    ['type']:
      serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(
        val.type,
      ),
    ['id']: val.id,
  };
}
export function deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(
  val: SerializedData,
): CreateRetentionPolicyAssignmentRequestBodyAssignToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateRetentionPolicyAssignmentRequestBodyAssignToField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateRetentionPolicyAssignmentRequestBodyAssignToField" to be defined',
    });
  }
  const type: CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField =
    deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(
      val.type,
    );
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateRetentionPolicyAssignmentRequestBodyAssignToField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateRetentionPolicyAssignmentRequestBodyAssignToField;
}
export function serializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(
  val: CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField,
): SerializedData {
  return { ['field']: val.field, ['value']: val.value };
}
export function deserializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(
  val: SerializedData,
): CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField"',
    });
  }
  if (!(val.field == void 0) && !sdIsString(val.field)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "field" of type "CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField"',
    });
  }
  const field: undefined | string = val.field == void 0 ? void 0 : val.field;
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField"',
    });
  }
  const value: undefined | string = val.value == void 0 ? void 0 : val.value;
  return {
    field: field,
    value: value,
  } satisfies CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField;
}
export function serializeCreateRetentionPolicyAssignmentRequestBody(
  val: CreateRetentionPolicyAssignmentRequestBody,
): SerializedData {
  return {
    ['policy_id']: val.policyId,
    ['assign_to']:
      serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(
        val.assignTo,
      ),
    ['filter_fields']:
      val.filterFields == void 0
        ? val.filterFields
        : (val.filterFields.map(function (
            item: CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField,
          ): SerializedData {
            return serializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(
              item,
            );
          }) as readonly any[]),
    ['start_date_field']: val.startDateField,
  };
}
export function deserializeCreateRetentionPolicyAssignmentRequestBody(
  val: SerializedData,
): CreateRetentionPolicyAssignmentRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateRetentionPolicyAssignmentRequestBody"',
    });
  }
  if (val.policy_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "policy_id" of type "CreateRetentionPolicyAssignmentRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.policy_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_id" of type "CreateRetentionPolicyAssignmentRequestBody"',
    });
  }
  const policyId: string = val.policy_id;
  if (val.assign_to == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "assign_to" of type "CreateRetentionPolicyAssignmentRequestBody" to be defined',
    });
  }
  const assignTo: CreateRetentionPolicyAssignmentRequestBodyAssignToField =
    deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(
      val.assign_to,
    );
  if (!(val.filter_fields == void 0) && !sdIsList(val.filter_fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "filter_fields" of type "CreateRetentionPolicyAssignmentRequestBody"',
    });
  }
  const filterFields:
    | undefined
    | readonly CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField[] =
    val.filter_fields == void 0
      ? void 0
      : sdIsList(val.filter_fields)
        ? (val.filter_fields.map(function (
            itm: SerializedData,
          ): CreateRetentionPolicyAssignmentRequestBodyFilterFieldsField {
            return deserializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(
              itm,
            );
          }) as readonly any[])
        : [];
  if (!(val.start_date_field == void 0) && !sdIsString(val.start_date_field)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "start_date_field" of type "CreateRetentionPolicyAssignmentRequestBody"',
    });
  }
  const startDateField: undefined | string =
    val.start_date_field == void 0 ? void 0 : val.start_date_field;
  return {
    policyId: policyId,
    assignTo: assignTo,
    filterFields: filterFields,
    startDateField: startDateField,
  } satisfies CreateRetentionPolicyAssignmentRequestBody;
}
