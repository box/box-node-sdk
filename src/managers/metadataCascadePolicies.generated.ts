import { serializeMetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { deserializeMetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeMetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { deserializeMetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { serializeConflictError } from '../schemas/conflictError.generated.js';
import { deserializeConflictError } from '../schemas/conflictError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { MetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { MetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { ConflictError } from '../schemas/conflictError.generated.js';
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
export class GetMetadataCascadePoliciesOptionals {
  readonly headers: GetMetadataCascadePoliciesHeaders =
    new GetMetadataCascadePoliciesHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataCascadePoliciesOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataCascadePoliciesOptionals,
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
export interface GetMetadataCascadePoliciesOptionalsInput {
  readonly headers?: GetMetadataCascadePoliciesHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateMetadataCascadePolicyOptionals {
  readonly headers: CreateMetadataCascadePolicyHeaders =
    new CreateMetadataCascadePolicyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateMetadataCascadePolicyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateMetadataCascadePolicyOptionals,
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
export interface CreateMetadataCascadePolicyOptionalsInput {
  readonly headers?: CreateMetadataCascadePolicyHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetMetadataCascadePolicyByIdOptionals {
  readonly headers: GetMetadataCascadePolicyByIdHeaders =
    new GetMetadataCascadePolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataCascadePolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataCascadePolicyByIdOptionals,
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
export interface GetMetadataCascadePolicyByIdOptionalsInput {
  readonly headers?: GetMetadataCascadePolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteMetadataCascadePolicyByIdOptionals {
  readonly headers: DeleteMetadataCascadePolicyByIdHeaders =
    new DeleteMetadataCascadePolicyByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteMetadataCascadePolicyByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteMetadataCascadePolicyByIdOptionals,
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
export interface DeleteMetadataCascadePolicyByIdOptionalsInput {
  readonly headers?: DeleteMetadataCascadePolicyByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class ApplyMetadataCascadePolicyOptionals {
  readonly headers: ApplyMetadataCascadePolicyHeaders =
    new ApplyMetadataCascadePolicyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      ApplyMetadataCascadePolicyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          ApplyMetadataCascadePolicyOptionals,
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
export interface ApplyMetadataCascadePolicyOptionalsInput {
  readonly headers?: ApplyMetadataCascadePolicyHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetMetadataCascadePoliciesQueryParams {
  /**
   * Specifies which folder to return policies for. This can not be used on the
   * root folder with ID `0`. */
  readonly folderId: string;
  /**
   * The ID of the enterprise ID for which to find metadata
   * cascade policies. If not specified, it defaults to the
   * current enterprise. */
  readonly ownerEnterpriseId?: string;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
}
export class GetMetadataCascadePoliciesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataCascadePoliciesHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataCascadePoliciesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataCascadePoliciesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateMetadataCascadePolicyRequestBodyScopeField =
  | 'global'
  | 'enterprise'
  | string;
export interface CreateMetadataCascadePolicyRequestBody {
  /**
   * The ID of the folder to apply the policy to. This folder will
   * need to already have an instance of the targeted metadata
   * template applied to it. */
  readonly folderId: string;
  /**
   * The scope of the targeted metadata template. This template will
   * need to already have an instance applied to the targeted folder. */
  readonly scope: CreateMetadataCascadePolicyRequestBodyScopeField;
  /**
   * The key of the targeted metadata template. This template will
   * need to already have an instance applied to the targeted folder.
   *
   * In many cases the template key is automatically derived
   * of its display name, for example `Contract Template` would
   * become `contractTemplate`. In some cases the creator of the
   * template will have provided its own template key.
   *
   * Please [list the templates for an enterprise][list], or
   * get all instances on a [file][file] or [folder][folder]
   * to inspect a template's key.
   *
   * [list]: e://get-metadata-templates-enterprise
   * [file]: e://get-files-id-metadata
   * [folder]: e://get-folders-id-metadata */
  readonly templateKey: string;
  readonly rawData?: SerializedData;
}
export class CreateMetadataCascadePolicyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateMetadataCascadePolicyHeaders, 'extraHeaders'> &
      Partial<Pick<CreateMetadataCascadePolicyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateMetadataCascadePolicyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetMetadataCascadePolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataCascadePolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataCascadePolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataCascadePolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteMetadataCascadePolicyByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteMetadataCascadePolicyByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteMetadataCascadePolicyByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteMetadataCascadePolicyByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type ApplyMetadataCascadePolicyRequestBodyConflictResolutionField =
  | 'none'
  | 'overwrite'
  | string;
export interface ApplyMetadataCascadePolicyRequestBody {
  /**
   * Describes the desired behavior when dealing with the conflict
   * where a metadata template already has an instance applied
   * to a child.
   *
   * * `none` will preserve the existing value on the file
   * * `overwrite` will force-apply the templates values over
   *   any existing values. */
  readonly conflictResolution: ApplyMetadataCascadePolicyRequestBodyConflictResolutionField;
  readonly rawData?: SerializedData;
}
export class ApplyMetadataCascadePolicyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<ApplyMetadataCascadePolicyHeaders, 'extraHeaders'> &
      Partial<Pick<ApplyMetadataCascadePolicyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface ApplyMetadataCascadePolicyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class MetadataCascadePoliciesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      MetadataCascadePoliciesManager,
      | 'networkSession'
      | 'getMetadataCascadePolicies'
      | 'createMetadataCascadePolicy'
      | 'getMetadataCascadePolicyById'
      | 'deleteMetadataCascadePolicyById'
      | 'applyMetadataCascadePolicy'
    > &
      Partial<Pick<MetadataCascadePoliciesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves a list of all the metadata cascade policies
   * that are applied to a given folder. This can not be used on the root
   * folder with ID `0`.
   * @param {GetMetadataCascadePoliciesQueryParams} queryParams Query parameters of getMetadataCascadePolicies method
   * @param {GetMetadataCascadePoliciesOptionalsInput} optionalsInput
   * @returns {Promise<MetadataCascadePolicies>}
   */
  async getMetadataCascadePolicies(
    queryParams: GetMetadataCascadePoliciesQueryParams,
    optionalsInput: GetMetadataCascadePoliciesOptionalsInput = {},
  ): Promise<MetadataCascadePolicies> {
    const optionals: GetMetadataCascadePoliciesOptionals =
      new GetMetadataCascadePoliciesOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['folder_id']: toString(queryParams.folderId) as string,
      ['owner_enterprise_id']: toString(
        queryParams.ownerEnterpriseId,
      ) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['offset']: toString(queryParams.offset) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_cascade_policies',
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
      ...deserializeMetadataCascadePolicies(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new metadata cascade policy that applies a given
   * metadata template to a given folder and automatically
   * cascades it down to any files within that folder.
   *
   * In order for the policy to be applied a metadata instance must first
   * be applied to the folder the policy is to be applied to.
   * @param {CreateMetadataCascadePolicyRequestBody} requestBody Request body of createMetadataCascadePolicy method
   * @param {CreateMetadataCascadePolicyOptionalsInput} optionalsInput
   * @returns {Promise<MetadataCascadePolicy>}
   */
  async createMetadataCascadePolicy(
    requestBody: CreateMetadataCascadePolicyRequestBody,
    optionalsInput: CreateMetadataCascadePolicyOptionalsInput = {},
  ): Promise<MetadataCascadePolicy> {
    const optionals: CreateMetadataCascadePolicyOptionals =
      new CreateMetadataCascadePolicyOptionals({
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
            '/2.0/metadata_cascade_policies',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateMetadataCascadePolicyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataCascadePolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieve a specific metadata cascade policy assigned to a folder.
     * @param {string} metadataCascadePolicyId The ID of the metadata cascade policy.
    Example: "6fd4ff89-8fc1-42cf-8b29-1890dedd26d7"
     * @param {GetMetadataCascadePolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataCascadePolicy>}
     */
  async getMetadataCascadePolicyById(
    metadataCascadePolicyId: string,
    optionalsInput: GetMetadataCascadePolicyByIdOptionalsInput = {},
  ): Promise<MetadataCascadePolicy> {
    const optionals: GetMetadataCascadePolicyByIdOptionals =
      new GetMetadataCascadePolicyByIdOptionals({
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
            '/2.0/metadata_cascade_policies/',
            toString(metadataCascadePolicyId) as string,
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
      ...deserializeMetadataCascadePolicy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a metadata cascade policy.
     * @param {string} metadataCascadePolicyId The ID of the metadata cascade policy.
    Example: "6fd4ff89-8fc1-42cf-8b29-1890dedd26d7"
     * @param {DeleteMetadataCascadePolicyByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteMetadataCascadePolicyById(
    metadataCascadePolicyId: string,
    optionalsInput: DeleteMetadataCascadePolicyByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteMetadataCascadePolicyByIdOptionals =
      new DeleteMetadataCascadePolicyByIdOptionals({
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
            '/2.0/metadata_cascade_policies/',
            toString(metadataCascadePolicyId) as string,
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
     * Force the metadata on a folder with a metadata cascade policy to be applied to
     * all of its children. This can be used after creating a new cascade policy to
     * enforce the metadata to be cascaded down to all existing files within that
     * folder.
     * @param {string} metadataCascadePolicyId The ID of the cascade policy to force-apply.
    Example: "6fd4ff89-8fc1-42cf-8b29-1890dedd26d7"
     * @param {ApplyMetadataCascadePolicyRequestBody} requestBody Request body of applyMetadataCascadePolicy method
     * @param {ApplyMetadataCascadePolicyOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async applyMetadataCascadePolicy(
    metadataCascadePolicyId: string,
    requestBody: ApplyMetadataCascadePolicyRequestBody,
    optionalsInput: ApplyMetadataCascadePolicyOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: ApplyMetadataCascadePolicyOptionals =
      new ApplyMetadataCascadePolicyOptionals({
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
            '/2.0/metadata_cascade_policies/',
            toString(metadataCascadePolicyId) as string,
            '/apply',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeApplyMetadataCascadePolicyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
}
export interface MetadataCascadePoliciesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateMetadataCascadePolicyRequestBodyScopeField(
  val: CreateMetadataCascadePolicyRequestBodyScopeField,
): SerializedData {
  return val;
}
export function deserializeCreateMetadataCascadePolicyRequestBodyScopeField(
  val: SerializedData,
): CreateMetadataCascadePolicyRequestBodyScopeField {
  if (val == 'global') {
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
      "Can't deserialize CreateMetadataCascadePolicyRequestBodyScopeField",
  });
}
export function serializeCreateMetadataCascadePolicyRequestBody(
  val: CreateMetadataCascadePolicyRequestBody,
): SerializedData {
  return {
    ['folder_id']: val.folderId,
    ['scope']: serializeCreateMetadataCascadePolicyRequestBodyScopeField(
      val.scope,
    ),
    ['templateKey']: val.templateKey,
  };
}
export function deserializeCreateMetadataCascadePolicyRequestBody(
  val: SerializedData,
): CreateMetadataCascadePolicyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateMetadataCascadePolicyRequestBody"',
    });
  }
  if (val.folder_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "folder_id" of type "CreateMetadataCascadePolicyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.folder_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "folder_id" of type "CreateMetadataCascadePolicyRequestBody"',
    });
  }
  const folderId: string = val.folder_id;
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "CreateMetadataCascadePolicyRequestBody" to be defined',
    });
  }
  const scope: CreateMetadataCascadePolicyRequestBodyScopeField =
    deserializeCreateMetadataCascadePolicyRequestBodyScopeField(val.scope);
  if (val.templateKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "templateKey" of type "CreateMetadataCascadePolicyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "templateKey" of type "CreateMetadataCascadePolicyRequestBody"',
    });
  }
  const templateKey: string = val.templateKey;
  return {
    folderId: folderId,
    scope: scope,
    templateKey: templateKey,
  } satisfies CreateMetadataCascadePolicyRequestBody;
}
export function serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(
  val: ApplyMetadataCascadePolicyRequestBodyConflictResolutionField,
): SerializedData {
  return val;
}
export function deserializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(
  val: SerializedData,
): ApplyMetadataCascadePolicyRequestBodyConflictResolutionField {
  if (val == 'none') {
    return val;
  }
  if (val == 'overwrite') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ApplyMetadataCascadePolicyRequestBodyConflictResolutionField",
  });
}
export function serializeApplyMetadataCascadePolicyRequestBody(
  val: ApplyMetadataCascadePolicyRequestBody,
): SerializedData {
  return {
    ['conflict_resolution']:
      serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(
        val.conflictResolution,
      ),
  };
}
export function deserializeApplyMetadataCascadePolicyRequestBody(
  val: SerializedData,
): ApplyMetadataCascadePolicyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ApplyMetadataCascadePolicyRequestBody"',
    });
  }
  if (val.conflict_resolution == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "conflict_resolution" of type "ApplyMetadataCascadePolicyRequestBody" to be defined',
    });
  }
  const conflictResolution: ApplyMetadataCascadePolicyRequestBodyConflictResolutionField =
    deserializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(
      val.conflict_resolution,
    );
  return {
    conflictResolution: conflictResolution,
  } satisfies ApplyMetadataCascadePolicyRequestBody;
}
