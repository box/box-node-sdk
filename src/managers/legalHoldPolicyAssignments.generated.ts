import { serializeLegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.generated.js';
import { deserializeLegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeLegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.generated.js';
import { deserializeLegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.generated.js';
import { serializeFilesOnHold } from '../schemas/filesOnHold.generated.js';
import { deserializeFilesOnHold } from '../schemas/filesOnHold.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { LegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { LegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.generated.js';
import { FilesOnHold } from '../schemas/filesOnHold.generated.js';
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
export class GetLegalHoldPolicyAssignmentsOptionals {
  readonly headers: GetLegalHoldPolicyAssignmentsHeaders =
    new GetLegalHoldPolicyAssignmentsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetLegalHoldPolicyAssignmentsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetLegalHoldPolicyAssignmentsOptionals,
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
export interface GetLegalHoldPolicyAssignmentsOptionalsInput {
  readonly headers?: GetLegalHoldPolicyAssignmentsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateLegalHoldPolicyAssignmentOptionals {
  readonly headers: CreateLegalHoldPolicyAssignmentHeaders =
    new CreateLegalHoldPolicyAssignmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateLegalHoldPolicyAssignmentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateLegalHoldPolicyAssignmentOptionals,
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
export interface CreateLegalHoldPolicyAssignmentOptionalsInput {
  readonly headers?: CreateLegalHoldPolicyAssignmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetLegalHoldPolicyAssignmentByIdOptionals {
  readonly headers: GetLegalHoldPolicyAssignmentByIdHeaders =
    new GetLegalHoldPolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetLegalHoldPolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetLegalHoldPolicyAssignmentByIdOptionals,
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
export interface GetLegalHoldPolicyAssignmentByIdOptionalsInput {
  readonly headers?: GetLegalHoldPolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteLegalHoldPolicyAssignmentByIdOptionals {
  readonly headers: DeleteLegalHoldPolicyAssignmentByIdHeaders =
    new DeleteLegalHoldPolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteLegalHoldPolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteLegalHoldPolicyAssignmentByIdOptionals,
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
export interface DeleteLegalHoldPolicyAssignmentByIdOptionalsInput {
  readonly headers?: DeleteLegalHoldPolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetLegalHoldPolicyAssignmentFileOnHoldOptionals {
  readonly queryParams: GetLegalHoldPolicyAssignmentFileOnHoldQueryParams =
    {} satisfies GetLegalHoldPolicyAssignmentFileOnHoldQueryParams;
  readonly headers: GetLegalHoldPolicyAssignmentFileOnHoldHeaders =
    new GetLegalHoldPolicyAssignmentFileOnHoldHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetLegalHoldPolicyAssignmentFileOnHoldOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetLegalHoldPolicyAssignmentFileOnHoldOptionals,
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
export interface GetLegalHoldPolicyAssignmentFileOnHoldOptionalsInput {
  readonly queryParams?: GetLegalHoldPolicyAssignmentFileOnHoldQueryParams;
  readonly headers?: GetLegalHoldPolicyAssignmentFileOnHoldHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField =
  | 'file'
  | 'file_version'
  | 'folder'
  | 'user'
  | 'ownership'
  | 'interactions'
  | string;
export interface GetLegalHoldPolicyAssignmentsQueryParams {
  /**
   * The ID of the legal hold policy. */
  readonly policyId: string;
  /**
   * Filters the results by the type of item the
   * policy was applied to. */
  readonly assignToType?: GetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField;
  /**
   * Filters the results by the ID of item the
   * policy was applied to. */
  readonly assignToId?: string;
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
export class GetLegalHoldPolicyAssignmentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetLegalHoldPolicyAssignmentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetLegalHoldPolicyAssignmentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetLegalHoldPolicyAssignmentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField =
  | 'file'
  | 'file_version'
  | 'folder'
  | 'user'
  | 'ownership'
  | 'interaction';
export interface CreateLegalHoldPolicyAssignmentRequestBodyAssignToField {
  /**
   * The type of item to assign the policy to. */
  readonly type: CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField;
  /**
   * The ID of item to assign the policy to. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateLegalHoldPolicyAssignmentRequestBody {
  /**
   * The ID of the policy to assign. */
  readonly policyId: string;
  /**
   * The item to assign the policy to. */
  readonly assignTo: CreateLegalHoldPolicyAssignmentRequestBodyAssignToField;
  readonly rawData?: SerializedData;
}
export class CreateLegalHoldPolicyAssignmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateLegalHoldPolicyAssignmentHeaders, 'extraHeaders'> &
      Partial<Pick<CreateLegalHoldPolicyAssignmentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateLegalHoldPolicyAssignmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetLegalHoldPolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetLegalHoldPolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetLegalHoldPolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetLegalHoldPolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteLegalHoldPolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteLegalHoldPolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteLegalHoldPolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteLegalHoldPolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetLegalHoldPolicyAssignmentFileOnHoldQueryParams {
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
export class GetLegalHoldPolicyAssignmentFileOnHoldHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetLegalHoldPolicyAssignmentFileOnHoldHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetLegalHoldPolicyAssignmentFileOnHoldHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetLegalHoldPolicyAssignmentFileOnHoldHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class LegalHoldPolicyAssignmentsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      LegalHoldPolicyAssignmentsManager,
      | 'networkSession'
      | 'getLegalHoldPolicyAssignments'
      | 'createLegalHoldPolicyAssignment'
      | 'getLegalHoldPolicyAssignmentById'
      | 'deleteLegalHoldPolicyAssignmentById'
      | 'getLegalHoldPolicyAssignmentFileOnHold'
    > &
      Partial<Pick<LegalHoldPolicyAssignmentsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves a list of items a legal hold policy has been assigned to.
   * @param {GetLegalHoldPolicyAssignmentsQueryParams} queryParams Query parameters of getLegalHoldPolicyAssignments method
   * @param {GetLegalHoldPolicyAssignmentsOptionalsInput} optionalsInput
   * @returns {Promise<LegalHoldPolicyAssignments>}
   */
  async getLegalHoldPolicyAssignments(
    queryParams: GetLegalHoldPolicyAssignmentsQueryParams,
    optionalsInput: GetLegalHoldPolicyAssignmentsOptionalsInput = {},
  ): Promise<LegalHoldPolicyAssignments> {
    const optionals: GetLegalHoldPolicyAssignmentsOptionals =
      new GetLegalHoldPolicyAssignmentsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['policy_id']: toString(queryParams.policyId) as string,
      ['assign_to_type']: toString(queryParams.assignToType) as string,
      ['assign_to_id']: toString(queryParams.assignToId) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
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
            '/2.0/legal_hold_policy_assignments',
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
      ...deserializeLegalHoldPolicyAssignments(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Assign a legal hold to a file, file version, folder, or user.
   * @param {CreateLegalHoldPolicyAssignmentRequestBody} requestBody Request body of createLegalHoldPolicyAssignment method
   * @param {CreateLegalHoldPolicyAssignmentOptionalsInput} optionalsInput
   * @returns {Promise<LegalHoldPolicyAssignment>}
   */
  async createLegalHoldPolicyAssignment(
    requestBody: CreateLegalHoldPolicyAssignmentRequestBody,
    optionalsInput: CreateLegalHoldPolicyAssignmentOptionalsInput = {},
  ): Promise<LegalHoldPolicyAssignment> {
    const optionals: CreateLegalHoldPolicyAssignmentOptionals =
      new CreateLegalHoldPolicyAssignmentOptionals({
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
            '/2.0/legal_hold_policy_assignments',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateLegalHoldPolicyAssignmentRequestBody(
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
      ...deserializeLegalHoldPolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieve a legal hold policy assignment.
     * @param {string} legalHoldPolicyAssignmentId The ID of the legal hold policy assignment.
    Example: "753465"
     * @param {GetLegalHoldPolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<LegalHoldPolicyAssignment>}
     */
  async getLegalHoldPolicyAssignmentById(
    legalHoldPolicyAssignmentId: string,
    optionalsInput: GetLegalHoldPolicyAssignmentByIdOptionalsInput = {},
  ): Promise<LegalHoldPolicyAssignment> {
    const optionals: GetLegalHoldPolicyAssignmentByIdOptionals =
      new GetLegalHoldPolicyAssignmentByIdOptionals({
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
            '/2.0/legal_hold_policy_assignments/',
            toString(legalHoldPolicyAssignmentId) as string,
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
      ...deserializeLegalHoldPolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Remove a legal hold from an item.
     *
     * This is an asynchronous process. The policy will not be
     * fully removed yet when the response returns.
     * @param {string} legalHoldPolicyAssignmentId The ID of the legal hold policy assignment.
    Example: "753465"
     * @param {DeleteLegalHoldPolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteLegalHoldPolicyAssignmentById(
    legalHoldPolicyAssignmentId: string,
    optionalsInput: DeleteLegalHoldPolicyAssignmentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteLegalHoldPolicyAssignmentByIdOptionals =
      new DeleteLegalHoldPolicyAssignmentByIdOptionals({
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
            '/2.0/legal_hold_policy_assignments/',
            toString(legalHoldPolicyAssignmentId) as string,
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
     * Get a list of files with current file versions for a legal hold
     * assignment.
     *
     * In some cases you may want to get previous file versions instead. In these
     * cases, use the `GET  /legal_hold_policy_assignments/:id/file_versions_on_hold`
     * API instead to return any previous versions of a file for this legal hold
     * policy assignment.
     *
     * Due to ongoing re-architecture efforts this API might not return all file
     * versions held for this policy ID. Instead, this API will only return the
     * latest file version held in the newly developed architecture. The `GET
     * /file_version_legal_holds` API can be used to fetch current and past versions
     * of files held within the legacy architecture.
     *
     * This endpoint does not support returning any content that is on hold due to
     * a Custodian collaborating on a Hub.
     *
     * The `GET /legal_hold_policy_assignments?policy_id={id}` API can be used to
     * find a list of policy assignments for a given policy ID.
     * @param {string} legalHoldPolicyAssignmentId The ID of the legal hold policy assignment.
    Example: "753465"
     * @param {GetLegalHoldPolicyAssignmentFileOnHoldOptionalsInput} optionalsInput
     * @returns {Promise<FilesOnHold>}
     */
  async getLegalHoldPolicyAssignmentFileOnHold(
    legalHoldPolicyAssignmentId: string,
    optionalsInput: GetLegalHoldPolicyAssignmentFileOnHoldOptionalsInput = {},
  ): Promise<FilesOnHold> {
    const optionals: GetLegalHoldPolicyAssignmentFileOnHoldOptionals =
      new GetLegalHoldPolicyAssignmentFileOnHoldOptionals({
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
            '/2.0/legal_hold_policy_assignments/',
            toString(legalHoldPolicyAssignmentId) as string,
            '/files_on_hold',
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
      ...deserializeFilesOnHold(response.data!),
      rawData: response.data!,
    };
  }
}
export interface LegalHoldPolicyAssignmentsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField(
  val: GetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField,
): SerializedData {
  return val;
}
export function deserializeGetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField(
  val: SerializedData,
): GetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'file_version') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (val == 'ownership') {
    return val;
  }
  if (val == 'interactions') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetLegalHoldPolicyAssignmentsQueryParamsAssignToTypeField",
  });
}
export function serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(
  val: CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(
  val: SerializedData,
): CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'file_version') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (val == 'ownership') {
    return val;
  }
  if (val == 'interaction') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField",
  });
}
export function serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(
  val: CreateLegalHoldPolicyAssignmentRequestBodyAssignToField,
): SerializedData {
  return {
    ['type']:
      serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(
        val.type,
      ),
    ['id']: val.id,
  };
}
export function deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(
  val: SerializedData,
): CreateLegalHoldPolicyAssignmentRequestBodyAssignToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateLegalHoldPolicyAssignmentRequestBodyAssignToField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateLegalHoldPolicyAssignmentRequestBodyAssignToField" to be defined',
    });
  }
  const type: CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField =
    deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(
      val.type,
    );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateLegalHoldPolicyAssignmentRequestBodyAssignToField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateLegalHoldPolicyAssignmentRequestBodyAssignToField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateLegalHoldPolicyAssignmentRequestBodyAssignToField;
}
export function serializeCreateLegalHoldPolicyAssignmentRequestBody(
  val: CreateLegalHoldPolicyAssignmentRequestBody,
): SerializedData {
  return {
    ['policy_id']: val.policyId,
    ['assign_to']:
      serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(
        val.assignTo,
      ),
  };
}
export function deserializeCreateLegalHoldPolicyAssignmentRequestBody(
  val: SerializedData,
): CreateLegalHoldPolicyAssignmentRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateLegalHoldPolicyAssignmentRequestBody"',
    });
  }
  if (val.policy_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "policy_id" of type "CreateLegalHoldPolicyAssignmentRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.policy_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "policy_id" of type "CreateLegalHoldPolicyAssignmentRequestBody"',
    });
  }
  const policyId: string = val.policy_id;
  if (val.assign_to == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "assign_to" of type "CreateLegalHoldPolicyAssignmentRequestBody" to be defined',
    });
  }
  const assignTo: CreateLegalHoldPolicyAssignmentRequestBodyAssignToField =
    deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(
      val.assign_to,
    );
  return {
    policyId: policyId,
    assignTo: assignTo,
  } satisfies CreateLegalHoldPolicyAssignmentRequestBody;
}
