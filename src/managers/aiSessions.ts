import { serializeAiSessionsV2026R0 } from '../schemas/v2026R0/aiSessionsV2026R0';
import { deserializeAiSessionsV2026R0 } from '../schemas/v2026R0/aiSessionsV2026R0';
import { serializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { deserializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { serializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { deserializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { AiSessionsV2026R0 } from '../schemas/v2026R0/aiSessionsV2026R0';
import { ClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { BoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { BoxSdkError } from '../box/errors';
import { Authentication } from '../networking/auth';
import { NetworkSession } from '../networking/network';
import { FetchOptions } from '../networking/fetchOptions';
import { FetchResponse } from '../networking/fetchResponse';
import { prepareParams } from '../internal/utils';
import { toString } from '../internal/utils';
import { ByteStream } from '../internal/utils';
import { CancellationToken } from '../internal/utils';
import { sdToJson } from '../serialization/json';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class GetAiSessionsV2026R0Optionals {
  readonly headers: GetAiSessionsV2026R0Headers =
    new GetAiSessionsV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetAiSessionsV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetAiSessionsV2026R0Optionals, 'headers' | 'cancellationToken'>
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
export interface GetAiSessionsV2026R0OptionalsInput {
  readonly headers?: GetAiSessionsV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteAiSessionByIdV2026R0Optionals {
  readonly headers: DeleteAiSessionByIdV2026R0Headers =
    new DeleteAiSessionByIdV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteAiSessionByIdV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteAiSessionByIdV2026R0Optionals,
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
export interface DeleteAiSessionByIdV2026R0OptionalsInput {
  readonly headers?: DeleteAiSessionByIdV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export type GetAiSessionsV2026R0QueryParamsSourceField = 'api' | string;
export type GetAiSessionsV2026R0QueryParamsSortField =
  'created_at' | 'updated_at' | 'name' | string;
export type GetAiSessionsV2026R0QueryParamsDirectionField =
  'asc' | 'desc' | string;
export interface GetAiSessionsV2026R0QueryParams {
  /**
   * Restricts the list to AI sessions with this origin. The only supported
   * value is `api`. */
  readonly source: GetAiSessionsV2026R0QueryParamsSourceField;
  /**
   * The position marker at which to begin returning results, as returned in
   * `next_marker` by the previous page. Omit it for the first page. All other
   * parameters must match the request that returned the marker. */
  readonly marker?: string;
  /**
   * The field to sort results by. Possible values are `created_at`,
   * `updated_at`, and `name`. Default is `updated_at`, which advances on each
   * turn of session activity. */
  readonly sort?: GetAiSessionsV2026R0QueryParamsSortField;
  /**
   * The direction to sort results in, either ascending (`asc`) or
   * descending (`desc`). Default is `desc`. */
  readonly direction?: GetAiSessionsV2026R0QueryParamsDirectionField;
  /**
   * The maximum number of AI sessions to return per page. The maximum is
   * `100`; larger values are treated as `100`. The server may return fewer
   * entries than requested. */
  readonly limit?: number;
  /**
   * A comma-separated list of OAuth client IDs. Restricts the list to AI
   * sessions created by any of these applications. Client IDs that match no
   * application are ignored, so the response is an empty list if none of them
   * match. Empty entries are ignored, and an empty value is treated as if the
   * parameter were not provided. */
  readonly clientIds?: readonly string[];
}
export class GetAiSessionsV2026R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2026R0 =
    '2026.0' as BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetAiSessionsV2026R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<GetAiSessionsV2026R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetAiSessionsV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteAiSessionByIdV2026R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2026R0 =
    '2026.0' as BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteAiSessionByIdV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<DeleteAiSessionByIdV2026R0Headers, 'boxVersion' | 'extraHeaders'>
      >,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteAiSessionByIdV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class AiSessionsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      AiSessionsManager,
      'networkSession' | 'getAiSessionsV2026R0' | 'deleteAiSessionByIdV2026R0'
    > &
      Partial<Pick<AiSessionsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns a marker-paginated list of the AI sessions that the authenticated
   * user can read and that were created through the Box public API. Entries are
   * ordered by `sort` and `direction`, defaulting to `updated_at` descending so
   * the most recently active session appears first.
   *
   * The access token must have both the `ai.readwrite` and `root_readwrite`
   * scopes.
   *
   * A page may contain fewer than `limit` entries while further pages remain.
   * Treat a non-null `next_marker` as the only signal that more results exist.
   * @param {GetAiSessionsV2026R0QueryParams} queryParams Query parameters of getAiSessionsV2026R0 method
   * @param {GetAiSessionsV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<AiSessionsV2026R0>}
   */
  async getAiSessionsV2026R0(
    queryParams: GetAiSessionsV2026R0QueryParams,
    optionalsInput: GetAiSessionsV2026R0OptionalsInput = {},
  ): Promise<AiSessionsV2026R0> {
    const optionals: GetAiSessionsV2026R0Optionals =
      new GetAiSessionsV2026R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['source']: toString(queryParams.source) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['client_ids']: queryParams.clientIds
        ? queryParams.clientIds.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/ai_sessions',
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
      ...deserializeAiSessionsV2026R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes an AI session created through the Box public API, together with its
     * agent tasks. The session's agent-generated files and uploaded files are
     * moved to the trash. Files attached as sources from elsewhere in Box are not
     * affected. Deleting a session does not stop a running task or notify the
     * agent.
     *
     * The access token must have both the `ai.readwrite` and `root_readwrite`
     * scopes.
     * @param {string} aiSessionId The unique identifier of the AI session. This is the same value returned as
    `id` by the list endpoint and used as the A2A `contextId`.
    Example: "23489723"
     * @param {DeleteAiSessionByIdV2026R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteAiSessionByIdV2026R0(
    aiSessionId: string,
    optionalsInput: DeleteAiSessionByIdV2026R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteAiSessionByIdV2026R0Optionals =
      new DeleteAiSessionByIdV2026R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/ai_sessions/',
            (toString(aiSessionId) as string)!,
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
export interface AiSessionsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetAiSessionsV2026R0QueryParamsSourceField(
  val: GetAiSessionsV2026R0QueryParamsSourceField,
): SerializedData {
  return val;
}
export function deserializeGetAiSessionsV2026R0QueryParamsSourceField(
  val: SerializedData,
): GetAiSessionsV2026R0QueryParamsSourceField {
  if (val == 'api') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetAiSessionsV2026R0QueryParamsSourceField",
  });
}
export function serializeGetAiSessionsV2026R0QueryParamsSortField(
  val: GetAiSessionsV2026R0QueryParamsSortField,
): SerializedData {
  return val;
}
export function deserializeGetAiSessionsV2026R0QueryParamsSortField(
  val: SerializedData,
): GetAiSessionsV2026R0QueryParamsSortField {
  if (val == 'created_at') {
    return val;
  }
  if (val == 'updated_at') {
    return val;
  }
  if (val == 'name') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetAiSessionsV2026R0QueryParamsSortField",
  });
}
export function serializeGetAiSessionsV2026R0QueryParamsDirectionField(
  val: GetAiSessionsV2026R0QueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetAiSessionsV2026R0QueryParamsDirectionField(
  val: SerializedData,
): GetAiSessionsV2026R0QueryParamsDirectionField {
  if (val == 'asc') {
    return val;
  }
  if (val == 'desc') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetAiSessionsV2026R0QueryParamsDirectionField",
  });
}
