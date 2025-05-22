import { serializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { deserializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
import { deserializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { StoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { StoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
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
export class GetStoragePolicyAssignmentsOptionals {
  readonly headers: GetStoragePolicyAssignmentsHeaders =
    new GetStoragePolicyAssignmentsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetStoragePolicyAssignmentsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetStoragePolicyAssignmentsOptionals,
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
export interface GetStoragePolicyAssignmentsOptionalsInput {
  readonly headers?: GetStoragePolicyAssignmentsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateStoragePolicyAssignmentOptionals {
  readonly headers: CreateStoragePolicyAssignmentHeaders =
    new CreateStoragePolicyAssignmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateStoragePolicyAssignmentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateStoragePolicyAssignmentOptionals,
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
export interface CreateStoragePolicyAssignmentOptionalsInput {
  readonly headers?: CreateStoragePolicyAssignmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetStoragePolicyAssignmentByIdOptionals {
  readonly headers: GetStoragePolicyAssignmentByIdHeaders =
    new GetStoragePolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetStoragePolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetStoragePolicyAssignmentByIdOptionals,
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
export interface GetStoragePolicyAssignmentByIdOptionalsInput {
  readonly headers?: GetStoragePolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateStoragePolicyAssignmentByIdOptionals {
  readonly headers: UpdateStoragePolicyAssignmentByIdHeaders =
    new UpdateStoragePolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateStoragePolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateStoragePolicyAssignmentByIdOptionals,
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
export interface UpdateStoragePolicyAssignmentByIdOptionalsInput {
  readonly headers?: UpdateStoragePolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteStoragePolicyAssignmentByIdOptionals {
  readonly headers: DeleteStoragePolicyAssignmentByIdHeaders =
    new DeleteStoragePolicyAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteStoragePolicyAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteStoragePolicyAssignmentByIdOptionals,
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
export interface DeleteStoragePolicyAssignmentByIdOptionalsInput {
  readonly headers?: DeleteStoragePolicyAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField =
  | 'user'
  | 'enterprise'
  | string;
export interface GetStoragePolicyAssignmentsQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The target type to return assignments for */
  readonly resolvedForType: GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField;
  /**
   * The ID of the user or enterprise to return assignments for */
  readonly resolvedForId: string;
}
export class GetStoragePolicyAssignmentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetStoragePolicyAssignmentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetStoragePolicyAssignmentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetStoragePolicyAssignmentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField =
  'storage_policy';
export class CreateStoragePolicyAssignmentRequestBodyStoragePolicyField {
  /**
   * The type to assign. */
  readonly type: CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField =
    'storage_policy' as CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField;
  /**
   * The ID of the storage policy to assign. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      CreateStoragePolicyAssignmentRequestBodyStoragePolicyField,
      'type'
    > &
      Partial<
        Pick<CreateStoragePolicyAssignmentRequestBodyStoragePolicyField, 'type'>
      >,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput {
  /**
   * The type to assign. */
  readonly type?: CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField;
  /**
   * The ID of the storage policy to assign. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField =
  | 'user'
  | 'enterprise';
export interface CreateStoragePolicyAssignmentRequestBodyAssignedToField {
  /**
   * The type to assign the policy to. */
  readonly type: CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField;
  /**
   * The ID of the user or enterprise */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateStoragePolicyAssignmentRequestBody {
  /**
   * The storage policy to assign to the user or
   * enterprise */
  readonly storagePolicy: CreateStoragePolicyAssignmentRequestBodyStoragePolicyField;
  /**
   * The user or enterprise to assign the storage
   * policy to. */
  readonly assignedTo: CreateStoragePolicyAssignmentRequestBodyAssignedToField;
  readonly rawData?: SerializedData;
}
export class CreateStoragePolicyAssignmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateStoragePolicyAssignmentHeaders, 'extraHeaders'> &
      Partial<Pick<CreateStoragePolicyAssignmentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateStoragePolicyAssignmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetStoragePolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetStoragePolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetStoragePolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetStoragePolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField =
  'storage_policy';
export class UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField {
  /**
   * The type to assign. */
  readonly type: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField =
    'storage_policy' as UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField;
  /**
   * The ID of the storage policy to assign. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField,
      'type'
    > &
      Partial<
        Pick<
          UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField,
          'type'
        >
      >,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput {
  /**
   * The type to assign. */
  readonly type?: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField;
  /**
   * The ID of the storage policy to assign. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface UpdateStoragePolicyAssignmentByIdRequestBody {
  /**
   * The storage policy to assign to the user or
   * enterprise */
  readonly storagePolicy: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField;
  readonly rawData?: SerializedData;
}
export class UpdateStoragePolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateStoragePolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateStoragePolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateStoragePolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteStoragePolicyAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteStoragePolicyAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteStoragePolicyAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteStoragePolicyAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class StoragePolicyAssignmentsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      StoragePolicyAssignmentsManager,
      | 'networkSession'
      | 'getStoragePolicyAssignments'
      | 'createStoragePolicyAssignment'
      | 'getStoragePolicyAssignmentById'
      | 'updateStoragePolicyAssignmentById'
      | 'deleteStoragePolicyAssignmentById'
    > &
      Partial<Pick<StoragePolicyAssignmentsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Fetches all the storage policy assignment for an enterprise or user.
   * @param {GetStoragePolicyAssignmentsQueryParams} queryParams Query parameters of getStoragePolicyAssignments method
   * @param {GetStoragePolicyAssignmentsOptionalsInput} optionalsInput
   * @returns {Promise<StoragePolicyAssignments>}
   */
  async getStoragePolicyAssignments(
    queryParams: GetStoragePolicyAssignmentsQueryParams,
    optionalsInput: GetStoragePolicyAssignmentsOptionalsInput = {},
  ): Promise<StoragePolicyAssignments> {
    const optionals: GetStoragePolicyAssignmentsOptionals =
      new GetStoragePolicyAssignmentsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['marker']: toString(queryParams.marker) as string,
      ['resolved_for_type']: toString(queryParams.resolvedForType) as string,
      ['resolved_for_id']: toString(queryParams.resolvedForId) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/storage_policy_assignments',
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
      ...deserializeStoragePolicyAssignments(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a storage policy assignment for an enterprise or user.
   * @param {CreateStoragePolicyAssignmentRequestBody} requestBody Request body of createStoragePolicyAssignment method
   * @param {CreateStoragePolicyAssignmentOptionalsInput} optionalsInput
   * @returns {Promise<StoragePolicyAssignment>}
   */
  async createStoragePolicyAssignment(
    requestBody: CreateStoragePolicyAssignmentRequestBody,
    optionalsInput: CreateStoragePolicyAssignmentOptionalsInput = {},
  ): Promise<StoragePolicyAssignment> {
    const optionals: CreateStoragePolicyAssignmentOptionals =
      new CreateStoragePolicyAssignmentOptionals({
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
            '/2.0/storage_policy_assignments',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateStoragePolicyAssignmentRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeStoragePolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Fetches a specific storage policy assignment.
     * @param {string} storagePolicyAssignmentId The ID of the storage policy assignment.
    Example: "932483"
     * @param {GetStoragePolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<StoragePolicyAssignment>}
     */
  async getStoragePolicyAssignmentById(
    storagePolicyAssignmentId: string,
    optionalsInput: GetStoragePolicyAssignmentByIdOptionalsInput = {},
  ): Promise<StoragePolicyAssignment> {
    const optionals: GetStoragePolicyAssignmentByIdOptionals =
      new GetStoragePolicyAssignmentByIdOptionals({
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
            '/2.0/storage_policy_assignments/',
            toString(storagePolicyAssignmentId) as string,
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
      ...deserializeStoragePolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a specific storage policy assignment.
     * @param {string} storagePolicyAssignmentId The ID of the storage policy assignment.
    Example: "932483"
     * @param {UpdateStoragePolicyAssignmentByIdRequestBody} requestBody Request body of updateStoragePolicyAssignmentById method
     * @param {UpdateStoragePolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<StoragePolicyAssignment>}
     */
  async updateStoragePolicyAssignmentById(
    storagePolicyAssignmentId: string,
    requestBody: UpdateStoragePolicyAssignmentByIdRequestBody,
    optionalsInput: UpdateStoragePolicyAssignmentByIdOptionalsInput = {},
  ): Promise<StoragePolicyAssignment> {
    const optionals: UpdateStoragePolicyAssignmentByIdOptionals =
      new UpdateStoragePolicyAssignmentByIdOptionals({
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
            '/2.0/storage_policy_assignments/',
            toString(storagePolicyAssignmentId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateStoragePolicyAssignmentByIdRequestBody(
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
      ...deserializeStoragePolicyAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete a storage policy assignment.
     *
     * Deleting a storage policy assignment on a user
     * will have the user inherit the enterprise's default
     * storage policy.
     *
     * There is a rate limit for calling this endpoint of only
     * twice per user in a 24 hour time frame.
     * @param {string} storagePolicyAssignmentId The ID of the storage policy assignment.
    Example: "932483"
     * @param {DeleteStoragePolicyAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteStoragePolicyAssignmentById(
    storagePolicyAssignmentId: string,
    optionalsInput: DeleteStoragePolicyAssignmentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteStoragePolicyAssignmentByIdOptionals =
      new DeleteStoragePolicyAssignmentByIdOptionals({
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
            '/2.0/storage_policy_assignments/',
            toString(storagePolicyAssignmentId) as string,
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
export interface StoragePolicyAssignmentsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField(
  val: GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField,
): SerializedData {
  return val;
}
export function deserializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField(
  val: SerializedData,
): GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField",
  });
}
export function serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
  val: CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField {
  if (val == 'storage_policy') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField",
  });
}
export function serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(
  val: CreateStoragePolicyAssignmentRequestBodyStoragePolicyField,
): SerializedData {
  return {
    ['type']:
      serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
        val.type,
      ),
    ['id']: val.id,
  };
}
export function deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBodyStoragePolicyField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateStoragePolicyAssignmentRequestBodyStoragePolicyField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateStoragePolicyAssignmentRequestBodyStoragePolicyField" to be defined',
    });
  }
  const type: CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField =
    deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
      val.type,
    );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateStoragePolicyAssignmentRequestBodyStoragePolicyField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateStoragePolicyAssignmentRequestBodyStoragePolicyField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateStoragePolicyAssignmentRequestBodyStoragePolicyField;
}
export function serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput(
  val: CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
            val.type,
          ),
    ['id']: val.id,
  };
}
export function deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput"',
    });
  }
  const type:
    | undefined
    | CreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(
          val.type,
        );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateStoragePolicyAssignmentRequestBodyStoragePolicyFieldInput;
}
export function serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(
  val: CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField",
  });
}
export function serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(
  val: CreateStoragePolicyAssignmentRequestBodyAssignedToField,
): SerializedData {
  return {
    ['type']:
      serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(
        val.type,
      ),
    ['id']: val.id,
  };
}
export function deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBodyAssignedToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateStoragePolicyAssignmentRequestBodyAssignedToField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateStoragePolicyAssignmentRequestBodyAssignedToField" to be defined',
    });
  }
  const type: CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField =
    deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(
      val.type,
    );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateStoragePolicyAssignmentRequestBodyAssignedToField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateStoragePolicyAssignmentRequestBodyAssignedToField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateStoragePolicyAssignmentRequestBodyAssignedToField;
}
export function serializeCreateStoragePolicyAssignmentRequestBody(
  val: CreateStoragePolicyAssignmentRequestBody,
): SerializedData {
  return {
    ['storage_policy']:
      serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(
        val.storagePolicy,
      ),
    ['assigned_to']:
      serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(
        val.assignedTo,
      ),
  };
}
export function deserializeCreateStoragePolicyAssignmentRequestBody(
  val: SerializedData,
): CreateStoragePolicyAssignmentRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateStoragePolicyAssignmentRequestBody"',
    });
  }
  if (val.storage_policy == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "storage_policy" of type "CreateStoragePolicyAssignmentRequestBody" to be defined',
    });
  }
  const storagePolicy: CreateStoragePolicyAssignmentRequestBodyStoragePolicyField =
    deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(
      val.storage_policy,
    );
  if (val.assigned_to == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "assigned_to" of type "CreateStoragePolicyAssignmentRequestBody" to be defined',
    });
  }
  const assignedTo: CreateStoragePolicyAssignmentRequestBodyAssignedToField =
    deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(
      val.assigned_to,
    );
  return {
    storagePolicy: storagePolicy,
    assignedTo: assignedTo,
  } satisfies CreateStoragePolicyAssignmentRequestBody;
}
export function serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
  val: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
  val: SerializedData,
): UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField {
  if (val == 'storage_policy') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField",
  });
}
export function serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(
  val: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField,
): SerializedData {
  return {
    ['type']:
      serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
        val.type,
      ),
    ['id']: val.id,
  };
}
export function deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(
  val: SerializedData,
): UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField" to be defined',
    });
  }
  const type: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField =
    deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
      val.type,
    );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField;
}
export function serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput(
  val: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
            val.type,
          ),
    ['id']: val.id,
  };
}
export function deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput(
  val: SerializedData,
): UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput"',
    });
  }
  const type:
    | undefined
    | UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField =
    val.type == void 0
      ? void 0
      : deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(
          val.type,
        );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyFieldInput;
}
export function serializeUpdateStoragePolicyAssignmentByIdRequestBody(
  val: UpdateStoragePolicyAssignmentByIdRequestBody,
): SerializedData {
  return {
    ['storage_policy']:
      serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(
        val.storagePolicy,
      ),
  };
}
export function deserializeUpdateStoragePolicyAssignmentByIdRequestBody(
  val: SerializedData,
): UpdateStoragePolicyAssignmentByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateStoragePolicyAssignmentByIdRequestBody"',
    });
  }
  if (val.storage_policy == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "storage_policy" of type "UpdateStoragePolicyAssignmentByIdRequestBody" to be defined',
    });
  }
  const storagePolicy: UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField =
    deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(
      val.storage_policy,
    );
  return {
    storagePolicy: storagePolicy,
  } satisfies UpdateStoragePolicyAssignmentByIdRequestBody;
}
