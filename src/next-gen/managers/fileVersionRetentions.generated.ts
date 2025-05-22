import { serializeFileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { deserializeFileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeFileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
import { deserializeFileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { FileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
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
export class GetFileVersionRetentionByIdOptionals {
  readonly headers: GetFileVersionRetentionByIdHeaders =
    new GetFileVersionRetentionByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileVersionRetentionByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileVersionRetentionByIdOptionals,
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
export interface GetFileVersionRetentionByIdOptionalsInput {
  readonly headers?: GetFileVersionRetentionByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetFileVersionRetentionsQueryParamsDispositionActionField =
  | 'permanently_delete'
  | 'remove_retention'
  | string;
export interface GetFileVersionRetentionsQueryParams {
  /**
   * Filters results by files with this ID. */
  readonly fileId?: string;
  /**
   * Filters results by file versions with this ID. */
  readonly fileVersionId?: string;
  /**
   * Filters results by the retention policy with this ID. */
  readonly policyId?: string;
  /**
   * Filters results by the retention policy with this disposition
   * action. */
  readonly dispositionAction?: GetFileVersionRetentionsQueryParamsDispositionActionField;
  /**
   * Filters results by files that will have their disposition
   * come into effect before this date. */
  readonly dispositionBefore?: string;
  /**
   * Filters results by files that will have their disposition
   * come into effect after this date. */
  readonly dispositionAfter?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
}
export class GetFileVersionRetentionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionRetentionsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionRetentionsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionRetentionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetFileVersionRetentionByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionRetentionByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionRetentionByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionRetentionByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileVersionRetentionsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileVersionRetentionsManager,
      | 'networkSession'
      | 'getFileVersionRetentions'
      | 'getFileVersionRetentionById'
    > &
      Partial<Pick<FileVersionRetentionsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all file version retentions for the given enterprise.
   *
   * **Note**:
   * File retention API is now **deprecated**.
   * To get information about files and file versions under retention,
   * see [files under retention](e://get-retention-policy-assignments-id-files-under-retention) or [file versions under retention](e://get-retention-policy-assignments-id-file-versions-under-retention) endpoints.
   * @param {GetFileVersionRetentionsQueryParams} queryParams Query parameters of getFileVersionRetentions method
   * @param {GetFileVersionRetentionsHeadersInput} headersInput Headers of getFileVersionRetentions method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<FileVersionRetentions>}
   */
  async getFileVersionRetentions(
    queryParams: GetFileVersionRetentionsQueryParams = {} satisfies GetFileVersionRetentionsQueryParams,
    headersInput: GetFileVersionRetentionsHeadersInput = new GetFileVersionRetentionsHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<FileVersionRetentions> {
    const headers: GetFileVersionRetentionsHeaders =
      new GetFileVersionRetentionsHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['file_id']: toString(queryParams.fileId) as string,
      ['file_version_id']: toString(queryParams.fileVersionId) as string,
      ['policy_id']: toString(queryParams.policyId) as string,
      ['disposition_action']: toString(queryParams.dispositionAction) as string,
      ['disposition_before']: toString(queryParams.dispositionBefore) as string,
      ['disposition_after']: toString(queryParams.dispositionAfter) as string,
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
            '/2.0/file_version_retentions',
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
      ...deserializeFileVersionRetentions(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns information about a file version retention.
     *
     * **Note**:
     * File retention API is now **deprecated**.
     * To get information about files and file versions under retention,
     * see [files under retention](e://get-retention-policy-assignments-id-files-under-retention) or [file versions under retention](e://get-retention-policy-assignments-id-file-versions-under-retention) endpoints.
     * @param {string} fileVersionRetentionId The ID of the file version retention
    Example: "3424234"
     * @param {GetFileVersionRetentionByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileVersionRetention>}
     */
  async getFileVersionRetentionById(
    fileVersionRetentionId: string,
    optionalsInput: GetFileVersionRetentionByIdOptionalsInput = {},
  ): Promise<FileVersionRetention> {
    const optionals: GetFileVersionRetentionByIdOptionals =
      new GetFileVersionRetentionByIdOptionals({
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
            '/2.0/file_version_retentions/',
            toString(fileVersionRetentionId) as string,
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
      ...deserializeFileVersionRetention(response.data!),
      rawData: response.data!,
    };
  }
}
export interface FileVersionRetentionsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetFileVersionRetentionsQueryParamsDispositionActionField(
  val: GetFileVersionRetentionsQueryParamsDispositionActionField,
): SerializedData {
  return val;
}
export function deserializeGetFileVersionRetentionsQueryParamsDispositionActionField(
  val: SerializedData,
): GetFileVersionRetentionsQueryParamsDispositionActionField {
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
      "Can't deserialize GetFileVersionRetentionsQueryParamsDispositionActionField",
  });
}
