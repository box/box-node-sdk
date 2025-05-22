import { serializeDocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { deserializeDocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { serializeDocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { deserializeDocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { serializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { deserializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { serializeDocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { deserializeDocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { serializeDocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { deserializeDocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { DocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { DocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { DocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { DocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { DocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
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
export class GetDocgenJobByIdV2025R0Optionals {
  readonly headers: GetDocgenJobByIdV2025R0Headers =
    new GetDocgenJobByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocgenJobByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetDocgenJobByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface GetDocgenJobByIdV2025R0OptionalsInput {
  readonly headers?: GetDocgenJobByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDocgenBatchJobByIdV2025R0Optionals {
  readonly queryParams: GetDocgenBatchJobByIdV2025R0QueryParams =
    {} satisfies GetDocgenBatchJobByIdV2025R0QueryParams;
  readonly headers: GetDocgenBatchJobByIdV2025R0Headers =
    new GetDocgenBatchJobByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocgenBatchJobByIdV2025R0Optionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDocgenBatchJobByIdV2025R0Optionals,
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
export interface GetDocgenBatchJobByIdV2025R0OptionalsInput {
  readonly queryParams?: GetDocgenBatchJobByIdV2025R0QueryParams;
  readonly headers?: GetDocgenBatchJobByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateDocgenBatchV2025R0Optionals {
  readonly headers: CreateDocgenBatchV2025R0Headers =
    new CreateDocgenBatchV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateDocgenBatchV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateDocgenBatchV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface CreateDocgenBatchV2025R0OptionalsInput {
  readonly headers?: CreateDocgenBatchV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDocgenJobByIdV2025R0Headers {
  /**
   * Version header */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetDocgenJobByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocgenJobByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocgenJobByIdV2025R0HeadersInput {
  /**
   * Version header */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetDocgenJobsV2025R0QueryParams {
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
export class GetDocgenJobsV2025R0Headers {
  /**
   * Version header */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetDocgenJobsV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<GetDocgenJobsV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetDocgenJobsV2025R0HeadersInput {
  /**
   * Version header */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetDocgenBatchJobByIdV2025R0QueryParams {
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
export class GetDocgenBatchJobByIdV2025R0Headers {
  /**
   * Version header */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      GetDocgenBatchJobByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocgenBatchJobByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocgenBatchJobByIdV2025R0HeadersInput {
  /**
   * Version header */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateDocgenBatchV2025R0Headers {
  /**
   * Version header */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      CreateDocgenBatchV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateDocgenBatchV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface CreateDocgenBatchV2025R0HeadersInput {
  /**
   * Version header */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DocgenManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      DocgenManager,
      | 'networkSession'
      | 'getDocgenJobByIdV2025R0'
      | 'getDocgenJobsV2025R0'
      | 'getDocgenBatchJobByIdV2025R0'
      | 'createDocgenBatchV2025R0'
    > &
      Partial<Pick<DocgenManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Get details of the Box Doc Gen job.
     * @param {string} jobId Box Doc Gen job ID.
    Example: 123
     * @param {GetDocgenJobByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<DocGenJobV2025R0>}
     */
  async getDocgenJobByIdV2025R0(
    jobId: string,
    optionalsInput: GetDocgenJobByIdV2025R0OptionalsInput = {},
  ): Promise<DocGenJobV2025R0> {
    const optionals: GetDocgenJobByIdV2025R0Optionals =
      new GetDocgenJobByIdV2025R0Optionals({
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
            '/2.0/docgen_jobs/',
            toString(jobId) as string,
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
      ...deserializeDocGenJobV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Lists all Box Doc Gen jobs for a user.
   * @param {GetDocgenJobsV2025R0QueryParams} queryParams Query parameters of getDocgenJobsV2025R0 method
   * @param {GetDocgenJobsV2025R0HeadersInput} headersInput Headers of getDocgenJobsV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<DocGenJobsFullV2025R0>}
   */
  async getDocgenJobsV2025R0(
    queryParams: GetDocgenJobsV2025R0QueryParams = {} satisfies GetDocgenJobsV2025R0QueryParams,
    headersInput: GetDocgenJobsV2025R0HeadersInput = new GetDocgenJobsV2025R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<DocGenJobsFullV2025R0> {
    const headers: GetDocgenJobsV2025R0Headers =
      new GetDocgenJobsV2025R0Headers({
        boxVersion: headersInput.boxVersion,
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
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/docgen_jobs',
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
      ...deserializeDocGenJobsFullV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Lists Box Doc Gen jobs in a batch
     * @param {string} batchId Box Doc Gen batch ID.
    Example: 123
     * @param {GetDocgenBatchJobByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<DocGenJobsV2025R0>}
     */
  async getDocgenBatchJobByIdV2025R0(
    batchId: string,
    optionalsInput: GetDocgenBatchJobByIdV2025R0OptionalsInput = {},
  ): Promise<DocGenJobsV2025R0> {
    const optionals: GetDocgenBatchJobByIdV2025R0Optionals =
      new GetDocgenBatchJobByIdV2025R0Optionals({
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
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/docgen_batch_jobs/',
            toString(batchId) as string,
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
      ...deserializeDocGenJobsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Generates a document using a Box Doc Gen template.
   * @param {DocGenBatchCreateRequestV2025R0} requestBody Request body of createDocgenBatchV2025R0 method
   * @param {CreateDocgenBatchV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<DocGenBatchBaseV2025R0>}
   */
  async createDocgenBatchV2025R0(
    requestBody: DocGenBatchCreateRequestV2025R0,
    optionalsInput: CreateDocgenBatchV2025R0OptionalsInput = {},
  ): Promise<DocGenBatchBaseV2025R0> {
    const optionals: CreateDocgenBatchV2025R0Optionals =
      new CreateDocgenBatchV2025R0Optionals({
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
            '/2.0/docgen_batches',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeDocGenBatchCreateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeDocGenBatchBaseV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface DocgenManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
