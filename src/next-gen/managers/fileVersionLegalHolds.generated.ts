import { serializeFileVersionLegalHold } from '../schemas/fileVersionLegalHold.generated.js';
import { deserializeFileVersionLegalHold } from '../schemas/fileVersionLegalHold.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeFileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
import { deserializeFileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FileVersionLegalHold } from '../schemas/fileVersionLegalHold.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { FileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
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
export class GetFileVersionLegalHoldByIdOptionals {
  readonly headers: GetFileVersionLegalHoldByIdHeaders =
    new GetFileVersionLegalHoldByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileVersionLegalHoldByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileVersionLegalHoldByIdOptionals,
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
export interface GetFileVersionLegalHoldByIdOptionalsInput {
  readonly headers?: GetFileVersionLegalHoldByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileVersionLegalHoldsOptionals {
  readonly headers: GetFileVersionLegalHoldsHeaders =
    new GetFileVersionLegalHoldsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileVersionLegalHoldsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetFileVersionLegalHoldsOptionals, 'headers' | 'cancellationToken'>
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
export interface GetFileVersionLegalHoldsOptionalsInput {
  readonly headers?: GetFileVersionLegalHoldsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileVersionLegalHoldByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionLegalHoldByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionLegalHoldByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionLegalHoldByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetFileVersionLegalHoldsQueryParams {
  /**
   * The ID of the legal hold policy to get the file version legal
   * holds for. */
  readonly policyId: string;
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
export class GetFileVersionLegalHoldsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileVersionLegalHoldsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileVersionLegalHoldsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileVersionLegalHoldsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileVersionLegalHoldsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileVersionLegalHoldsManager,
      | 'networkSession'
      | 'getFileVersionLegalHoldById'
      | 'getFileVersionLegalHolds'
    > &
      Partial<Pick<FileVersionLegalHoldsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves information about the legal hold policies
     * assigned to a file version.
     * @param {string} fileVersionLegalHoldId The ID of the file version legal hold
    Example: "2348213"
     * @param {GetFileVersionLegalHoldByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileVersionLegalHold>}
     */
  async getFileVersionLegalHoldById(
    fileVersionLegalHoldId: string,
    optionalsInput: GetFileVersionLegalHoldByIdOptionalsInput = {},
  ): Promise<FileVersionLegalHold> {
    const optionals: GetFileVersionLegalHoldByIdOptionals =
      new GetFileVersionLegalHoldByIdOptionals({
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
            '/2.0/file_version_legal_holds/',
            toString(fileVersionLegalHoldId) as string,
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
      ...deserializeFileVersionLegalHold(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Get a list of file versions on legal hold for a legal hold
   * assignment.
   *
   * Due to ongoing re-architecture efforts this API might not return all file
   * versions for this policy ID.
   *
   * Instead, this API will only return file versions held in the legacy
   * architecture. Two new endpoints will available to request any file versions
   * held in the new architecture.
   *
   * For file versions held in the new architecture, the `GET
   * /legal_hold_policy_assignments/:id/file_versions_on_hold` API can be used to
   * return all past file versions available for this policy assignment, and the
   * `GET /legal_hold_policy_assignments/:id/files_on_hold` API can be used to
   * return any current (latest) versions of a file under legal hold.
   *
   * The `GET /legal_hold_policy_assignments?policy_id={id}` API can be used to
   * find a list of policy assignments for a given policy ID.
   *
   * Once the re-architecture is completed this API will be deprecated.
   * @param {GetFileVersionLegalHoldsQueryParams} queryParams Query parameters of getFileVersionLegalHolds method
   * @param {GetFileVersionLegalHoldsOptionalsInput} optionalsInput
   * @returns {Promise<FileVersionLegalHolds>}
   */
  async getFileVersionLegalHolds(
    queryParams: GetFileVersionLegalHoldsQueryParams,
    optionalsInput: GetFileVersionLegalHoldsOptionalsInput = {},
  ): Promise<FileVersionLegalHolds> {
    const optionals: GetFileVersionLegalHoldsOptionals =
      new GetFileVersionLegalHoldsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['policy_id']: toString(queryParams.policyId) as string,
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
            '/2.0/file_version_legal_holds',
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
      ...deserializeFileVersionLegalHolds(response.data!),
      rawData: response.data!,
    };
  }
}
export interface FileVersionLegalHoldsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
