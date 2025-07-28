import { serializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { deserializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
import { deserializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { CollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { CollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
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
export class CreateCollaborationWhitelistEntryOptionals {
  readonly headers: CreateCollaborationWhitelistEntryHeaders =
    new CreateCollaborationWhitelistEntryHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateCollaborationWhitelistEntryOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateCollaborationWhitelistEntryOptionals,
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
export interface CreateCollaborationWhitelistEntryOptionalsInput {
  readonly headers?: CreateCollaborationWhitelistEntryHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetCollaborationWhitelistEntryByIdOptionals {
  readonly headers: GetCollaborationWhitelistEntryByIdHeaders =
    new GetCollaborationWhitelistEntryByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetCollaborationWhitelistEntryByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetCollaborationWhitelistEntryByIdOptionals,
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
export interface GetCollaborationWhitelistEntryByIdOptionalsInput {
  readonly headers?: GetCollaborationWhitelistEntryByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteCollaborationWhitelistEntryByIdOptionals {
  readonly headers: DeleteCollaborationWhitelistEntryByIdHeaders =
    new DeleteCollaborationWhitelistEntryByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteCollaborationWhitelistEntryByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteCollaborationWhitelistEntryByIdOptionals,
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
export interface DeleteCollaborationWhitelistEntryByIdOptionalsInput {
  readonly headers?: DeleteCollaborationWhitelistEntryByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetCollaborationWhitelistEntriesQueryParams {
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
export class GetCollaborationWhitelistEntriesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetCollaborationWhitelistEntriesHeaders, 'extraHeaders'> &
      Partial<Pick<GetCollaborationWhitelistEntriesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationWhitelistEntriesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateCollaborationWhitelistEntryRequestBodyDirectionField =
  | 'inbound'
  | 'outbound'
  | 'both'
  | string;
export interface CreateCollaborationWhitelistEntryRequestBody {
  /**
   * The domain to add to the list of allowed domains. */
  readonly domain: string;
  /**
   * The direction in which to allow collaborations. */
  readonly direction: CreateCollaborationWhitelistEntryRequestBodyDirectionField;
  readonly rawData?: SerializedData;
}
export class CreateCollaborationWhitelistEntryHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateCollaborationWhitelistEntryHeaders, 'extraHeaders'> &
      Partial<Pick<CreateCollaborationWhitelistEntryHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateCollaborationWhitelistEntryHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetCollaborationWhitelistEntryByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetCollaborationWhitelistEntryByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetCollaborationWhitelistEntryByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationWhitelistEntryByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteCollaborationWhitelistEntryByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteCollaborationWhitelistEntryByIdHeaders, 'extraHeaders'> &
      Partial<
        Pick<DeleteCollaborationWhitelistEntryByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteCollaborationWhitelistEntryByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CollaborationAllowlistEntriesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      CollaborationAllowlistEntriesManager,
      | 'networkSession'
      | 'getCollaborationWhitelistEntries'
      | 'createCollaborationWhitelistEntry'
      | 'getCollaborationWhitelistEntryById'
      | 'deleteCollaborationWhitelistEntryById'
    > &
      Partial<Pick<CollaborationAllowlistEntriesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns the list domains that have been deemed safe to create collaborations
   * for within the current enterprise.
   * @param {GetCollaborationWhitelistEntriesQueryParams} queryParams Query parameters of getCollaborationWhitelistEntries method
   * @param {GetCollaborationWhitelistEntriesHeadersInput} headersInput Headers of getCollaborationWhitelistEntries method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<CollaborationAllowlistEntries>}
   */
  async getCollaborationWhitelistEntries(
    queryParams: GetCollaborationWhitelistEntriesQueryParams = {} satisfies GetCollaborationWhitelistEntriesQueryParams,
    headersInput: GetCollaborationWhitelistEntriesHeadersInput = new GetCollaborationWhitelistEntriesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<CollaborationAllowlistEntries> {
    const headers: GetCollaborationWhitelistEntriesHeaders =
      new GetCollaborationWhitelistEntriesHeaders({
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
            '/2.0/collaboration_whitelist_entries',
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
      ...deserializeCollaborationAllowlistEntries(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new entry in the list of allowed domains to allow
   * collaboration for.
   * @param {CreateCollaborationWhitelistEntryRequestBody} requestBody Request body of createCollaborationWhitelistEntry method
   * @param {CreateCollaborationWhitelistEntryOptionalsInput} optionalsInput
   * @returns {Promise<CollaborationAllowlistEntry>}
   */
  async createCollaborationWhitelistEntry(
    requestBody: CreateCollaborationWhitelistEntryRequestBody,
    optionalsInput: CreateCollaborationWhitelistEntryOptionalsInput = {},
  ): Promise<CollaborationAllowlistEntry> {
    const optionals: CreateCollaborationWhitelistEntryOptionals =
      new CreateCollaborationWhitelistEntryOptionals({
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
            '/2.0/collaboration_whitelist_entries',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateCollaborationWhitelistEntryRequestBody(
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
      ...deserializeCollaborationAllowlistEntry(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns a domain that has been deemed safe to create collaborations
     * for within the current enterprise.
     * @param {string} collaborationWhitelistEntryId The ID of the entry in the list.
    Example: "213123"
     * @param {GetCollaborationWhitelistEntryByIdOptionalsInput} optionalsInput
     * @returns {Promise<CollaborationAllowlistEntry>}
     */
  async getCollaborationWhitelistEntryById(
    collaborationWhitelistEntryId: string,
    optionalsInput: GetCollaborationWhitelistEntryByIdOptionalsInput = {},
  ): Promise<CollaborationAllowlistEntry> {
    const optionals: GetCollaborationWhitelistEntryByIdOptionals =
      new GetCollaborationWhitelistEntryByIdOptionals({
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
            '/2.0/collaboration_whitelist_entries/',
            toString(collaborationWhitelistEntryId) as string,
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
      ...deserializeCollaborationAllowlistEntry(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a domain from the list of domains that have been deemed safe to create
     * collaborations for within the current enterprise.
     * @param {string} collaborationWhitelistEntryId The ID of the entry in the list.
    Example: "213123"
     * @param {DeleteCollaborationWhitelistEntryByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteCollaborationWhitelistEntryById(
    collaborationWhitelistEntryId: string,
    optionalsInput: DeleteCollaborationWhitelistEntryByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteCollaborationWhitelistEntryByIdOptionals =
      new DeleteCollaborationWhitelistEntryByIdOptionals({
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
            '/2.0/collaboration_whitelist_entries/',
            toString(collaborationWhitelistEntryId) as string,
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
export interface CollaborationAllowlistEntriesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(
  val: CreateCollaborationWhitelistEntryRequestBodyDirectionField,
): SerializedData {
  return val;
}
export function deserializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(
  val: SerializedData,
): CreateCollaborationWhitelistEntryRequestBodyDirectionField {
  if (val == 'inbound') {
    return val;
  }
  if (val == 'outbound') {
    return val;
  }
  if (val == 'both') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateCollaborationWhitelistEntryRequestBodyDirectionField",
  });
}
export function serializeCreateCollaborationWhitelistEntryRequestBody(
  val: CreateCollaborationWhitelistEntryRequestBody,
): SerializedData {
  return {
    ['domain']: val.domain,
    ['direction']:
      serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(
        val.direction,
      ),
  };
}
export function deserializeCreateCollaborationWhitelistEntryRequestBody(
  val: SerializedData,
): CreateCollaborationWhitelistEntryRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateCollaborationWhitelistEntryRequestBody"',
    });
  }
  if (val.domain == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "domain" of type "CreateCollaborationWhitelistEntryRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.domain)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "domain" of type "CreateCollaborationWhitelistEntryRequestBody"',
    });
  }
  const domain: string = val.domain;
  if (val.direction == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "direction" of type "CreateCollaborationWhitelistEntryRequestBody" to be defined',
    });
  }
  const direction: CreateCollaborationWhitelistEntryRequestBodyDirectionField =
    deserializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(
      val.direction,
    );
  return {
    domain: domain,
    direction: direction,
  } satisfies CreateCollaborationWhitelistEntryRequestBody;
}
