import { serializeCollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { deserializeCollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeCollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
import { deserializeCollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { CollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { CollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
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
export class CreateCollaborationWhitelistExemptTargetOptionals {
  readonly headers: CreateCollaborationWhitelistExemptTargetHeaders =
    new CreateCollaborationWhitelistExemptTargetHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateCollaborationWhitelistExemptTargetOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateCollaborationWhitelistExemptTargetOptionals,
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
export interface CreateCollaborationWhitelistExemptTargetOptionalsInput {
  readonly headers?: CreateCollaborationWhitelistExemptTargetHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetCollaborationWhitelistExemptTargetByIdOptionals {
  readonly headers: GetCollaborationWhitelistExemptTargetByIdHeaders =
    new GetCollaborationWhitelistExemptTargetByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetCollaborationWhitelistExemptTargetByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetCollaborationWhitelistExemptTargetByIdOptionals,
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
export interface GetCollaborationWhitelistExemptTargetByIdOptionalsInput {
  readonly headers?: GetCollaborationWhitelistExemptTargetByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteCollaborationWhitelistExemptTargetByIdOptionals {
  readonly headers: DeleteCollaborationWhitelistExemptTargetByIdHeaders =
    new DeleteCollaborationWhitelistExemptTargetByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteCollaborationWhitelistExemptTargetByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteCollaborationWhitelistExemptTargetByIdOptionals,
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
export interface DeleteCollaborationWhitelistExemptTargetByIdOptionalsInput {
  readonly headers?: DeleteCollaborationWhitelistExemptTargetByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetCollaborationWhitelistExemptTargetsQueryParams {
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
export class GetCollaborationWhitelistExemptTargetsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetCollaborationWhitelistExemptTargetsHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetCollaborationWhitelistExemptTargetsHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationWhitelistExemptTargetsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateCollaborationWhitelistExemptTargetRequestBodyUserField {
  /**
   * The ID of the user to exempt. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateCollaborationWhitelistExemptTargetRequestBody {
  /**
   * The user to exempt. */
  readonly user: CreateCollaborationWhitelistExemptTargetRequestBodyUserField;
  readonly rawData?: SerializedData;
}
export class CreateCollaborationWhitelistExemptTargetHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      CreateCollaborationWhitelistExemptTargetHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<CreateCollaborationWhitelistExemptTargetHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateCollaborationWhitelistExemptTargetHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetCollaborationWhitelistExemptTargetByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetCollaborationWhitelistExemptTargetByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<GetCollaborationWhitelistExemptTargetByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationWhitelistExemptTargetByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteCollaborationWhitelistExemptTargetByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteCollaborationWhitelistExemptTargetByIdHeaders,
      'extraHeaders'
    > &
      Partial<
        Pick<
          DeleteCollaborationWhitelistExemptTargetByIdHeaders,
          'extraHeaders'
        >
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteCollaborationWhitelistExemptTargetByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CollaborationAllowlistExemptTargetsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      CollaborationAllowlistExemptTargetsManager,
      | 'networkSession'
      | 'getCollaborationWhitelistExemptTargets'
      | 'createCollaborationWhitelistExemptTarget'
      | 'getCollaborationWhitelistExemptTargetById'
      | 'deleteCollaborationWhitelistExemptTargetById'
    > &
      Partial<
        Pick<CollaborationAllowlistExemptTargetsManager, 'networkSession'>
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
   * Returns a list of users who have been exempt from the collaboration
   * domain restrictions.
   * @param {GetCollaborationWhitelistExemptTargetsQueryParams} queryParams Query parameters of getCollaborationWhitelistExemptTargets method
   * @param {GetCollaborationWhitelistExemptTargetsHeadersInput} headersInput Headers of getCollaborationWhitelistExemptTargets method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<CollaborationAllowlistExemptTargets>}
   */
  async getCollaborationWhitelistExemptTargets(
    queryParams: GetCollaborationWhitelistExemptTargetsQueryParams = {} satisfies GetCollaborationWhitelistExemptTargetsQueryParams,
    headersInput: GetCollaborationWhitelistExemptTargetsHeadersInput = new GetCollaborationWhitelistExemptTargetsHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<CollaborationAllowlistExemptTargets> {
    const headers: GetCollaborationWhitelistExemptTargetsHeaders =
      new GetCollaborationWhitelistExemptTargetsHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
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
            '/2.0/collaboration_whitelist_exempt_targets',
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
      ...deserializeCollaborationAllowlistExemptTargets(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Exempts a user from the restrictions set out by the allowed list of domains
   * for collaborations.
   * @param {CreateCollaborationWhitelistExemptTargetRequestBody} requestBody Request body of createCollaborationWhitelistExemptTarget method
   * @param {CreateCollaborationWhitelistExemptTargetOptionalsInput} optionalsInput
   * @returns {Promise<CollaborationAllowlistExemptTarget>}
   */
  async createCollaborationWhitelistExemptTarget(
    requestBody: CreateCollaborationWhitelistExemptTargetRequestBody,
    optionalsInput: CreateCollaborationWhitelistExemptTargetOptionalsInput = {},
  ): Promise<CollaborationAllowlistExemptTarget> {
    const optionals: CreateCollaborationWhitelistExemptTargetOptionals =
      new CreateCollaborationWhitelistExemptTargetOptionals({
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
            '/2.0/collaboration_whitelist_exempt_targets',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateCollaborationWhitelistExemptTargetRequestBody(
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
      ...deserializeCollaborationAllowlistExemptTarget(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns a users who has been exempt from the collaboration
     * domain restrictions.
     * @param {string} collaborationWhitelistExemptTargetId The ID of the exemption to the list.
    Example: "984923"
     * @param {GetCollaborationWhitelistExemptTargetByIdOptionalsInput} optionalsInput
     * @returns {Promise<CollaborationAllowlistExemptTarget>}
     */
  async getCollaborationWhitelistExemptTargetById(
    collaborationWhitelistExemptTargetId: string,
    optionalsInput: GetCollaborationWhitelistExemptTargetByIdOptionalsInput = {},
  ): Promise<CollaborationAllowlistExemptTarget> {
    const optionals: GetCollaborationWhitelistExemptTargetByIdOptionals =
      new GetCollaborationWhitelistExemptTargetByIdOptionals({
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
            '/2.0/collaboration_whitelist_exempt_targets/',
            toString(collaborationWhitelistExemptTargetId) as string,
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
      ...deserializeCollaborationAllowlistExemptTarget(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a user's exemption from the restrictions set out by the allowed list
     * of domains for collaborations.
     * @param {string} collaborationWhitelistExemptTargetId The ID of the exemption to the list.
    Example: "984923"
     * @param {DeleteCollaborationWhitelistExemptTargetByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteCollaborationWhitelistExemptTargetById(
    collaborationWhitelistExemptTargetId: string,
    optionalsInput: DeleteCollaborationWhitelistExemptTargetByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteCollaborationWhitelistExemptTargetByIdOptionals =
      new DeleteCollaborationWhitelistExemptTargetByIdOptionals({
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
            '/2.0/collaboration_whitelist_exempt_targets/',
            toString(collaborationWhitelistExemptTargetId) as string,
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
export interface CollaborationAllowlistExemptTargetsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(
  val: CreateCollaborationWhitelistExemptTargetRequestBodyUserField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(
  val: SerializedData,
): CreateCollaborationWhitelistExemptTargetRequestBodyUserField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateCollaborationWhitelistExemptTargetRequestBodyUserField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateCollaborationWhitelistExemptTargetRequestBodyUserField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateCollaborationWhitelistExemptTargetRequestBodyUserField"',
    });
  }
  const id: string = val.id;
  return {
    id: id,
  } satisfies CreateCollaborationWhitelistExemptTargetRequestBodyUserField;
}
export function serializeCreateCollaborationWhitelistExemptTargetRequestBody(
  val: CreateCollaborationWhitelistExemptTargetRequestBody,
): SerializedData {
  return {
    ['user']:
      serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(
        val.user,
      ),
  };
}
export function deserializeCreateCollaborationWhitelistExemptTargetRequestBody(
  val: SerializedData,
): CreateCollaborationWhitelistExemptTargetRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateCollaborationWhitelistExemptTargetRequestBody"',
    });
  }
  if (val.user == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user" of type "CreateCollaborationWhitelistExemptTargetRequestBody" to be defined',
    });
  }
  const user: CreateCollaborationWhitelistExemptTargetRequestBodyUserField =
    deserializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(
      val.user,
    );
  return {
    user: user,
  } satisfies CreateCollaborationWhitelistExemptTargetRequestBody;
}
