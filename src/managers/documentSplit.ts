import { serializeDocumentSplitCreateResponseV2026R0 } from '../schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { deserializeDocumentSplitCreateResponseV2026R0 } from '../schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { serializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { deserializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { serializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { deserializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { serializeDocumentSplitCreateRequestV2026R0 } from '../schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { deserializeDocumentSplitCreateRequestV2026R0 } from '../schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { serializeDocumentSplitsV2026R0 } from '../schemas/v2026R0/documentSplitsV2026R0';
import { deserializeDocumentSplitsV2026R0 } from '../schemas/v2026R0/documentSplitsV2026R0';
import { serializeDocumentSplitV2026R0 } from '../schemas/v2026R0/documentSplitV2026R0';
import { deserializeDocumentSplitV2026R0 } from '../schemas/v2026R0/documentSplitV2026R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { DocumentSplitCreateResponseV2026R0 } from '../schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { ClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { BoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { DocumentSplitCreateRequestV2026R0 } from '../schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { DocumentSplitsV2026R0 } from '../schemas/v2026R0/documentSplitsV2026R0';
import { DocumentSplitV2026R0 } from '../schemas/v2026R0/documentSplitV2026R0';
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
export class CreateDocumentSplitV2026R0Optionals {
  readonly headers: CreateDocumentSplitV2026R0Headers =
    new CreateDocumentSplitV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateDocumentSplitV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateDocumentSplitV2026R0Optionals,
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
export interface CreateDocumentSplitV2026R0OptionalsInput {
  readonly headers?: CreateDocumentSplitV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class GetDocumentSplitByIdV2026R0Optionals {
  readonly headers: GetDocumentSplitByIdV2026R0Headers =
    new GetDocumentSplitByIdV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocumentSplitByIdV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDocumentSplitByIdV2026R0Optionals,
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
export interface GetDocumentSplitByIdV2026R0OptionalsInput {
  readonly headers?: GetDocumentSplitByIdV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class CreateDocumentSplitV2026R0Headers {
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
      CreateDocumentSplitV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateDocumentSplitV2026R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface CreateDocumentSplitV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetDocumentSplitsV2026R0QueryParams {
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
export class GetDocumentSplitsV2026R0Headers {
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
      GetDocumentSplitsV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocumentSplitsV2026R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocumentSplitsV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetDocumentSplitByIdV2026R0Headers {
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
      GetDocumentSplitByIdV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocumentSplitByIdV2026R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocumentSplitByIdV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DocumentSplitManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      DocumentSplitManager,
      | 'networkSession'
      | 'createDocumentSplitV2026R0'
      | 'getDocumentSplitsV2026R0'
      | 'getDocumentSplitByIdV2026R0'
    > &
      Partial<Pick<DocumentSplitManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Initiates a Document Split job for the supplied source file. The job runs
   * asynchronously; clients can poll the returned job ID to track progress.
   *
   * All split-specific input lives under `split_input`. When
   * `split_input.split_type` is `manual`, provide
   * `split_input.split_definition` (continuous page ranges; `version` may be
   * omitted or `v_1`). When `split_input.split_type` is `page_selection`,
   * provide `split_input.page_selection` (non-linear page segments; `version`
   * may be omitted or `v_2`). `split_input.prompt` must not be provided for
   * either of those variants. When `split_input.split_type` is `smart`,
   * `split_input.prompt` is required and neither
   * `split_input.split_definition` nor `split_input.page_selection` must be
   * provided.
   * @param {DocumentSplitCreateRequestV2026R0} requestBody Request body of createDocumentSplitV2026R0 method
   * @param {CreateDocumentSplitV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<DocumentSplitCreateResponseV2026R0>}
   */
  async createDocumentSplitV2026R0(
    requestBody: DocumentSplitCreateRequestV2026R0,
    optionalsInput: CreateDocumentSplitV2026R0OptionalsInput = {},
  ): Promise<DocumentSplitCreateResponseV2026R0> {
    const optionals: CreateDocumentSplitV2026R0Optionals =
      new CreateDocumentSplitV2026R0Optionals({
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
            '/2.0/document_splits',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeDocumentSplitCreateRequestV2026R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeDocumentSplitCreateResponseV2026R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Returns a paginated list of Document Split jobs accessible to the
   * authenticated user.
   * @param {GetDocumentSplitsV2026R0QueryParams} queryParams Query parameters of getDocumentSplitsV2026R0 method
   * @param {GetDocumentSplitsV2026R0HeadersInput} headersInput Headers of getDocumentSplitsV2026R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<DocumentSplitsV2026R0>}
   */
  async getDocumentSplitsV2026R0(
    queryParams: GetDocumentSplitsV2026R0QueryParams = {} satisfies GetDocumentSplitsV2026R0QueryParams,
    headersInput: GetDocumentSplitsV2026R0HeadersInput = new GetDocumentSplitsV2026R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<DocumentSplitsV2026R0> {
    const headers: GetDocumentSplitsV2026R0Headers =
      new GetDocumentSplitsV2026R0Headers({
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
            '/2.0/document_splits',
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
      ...deserializeDocumentSplitsV2026R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns details for a single Document Split job identified by its ID,
     * including the current status, the input definition, and any output files
     * produced by the job.
     * @param {string} documentSplitId The unique identifier for the Document Split job.
    Example: "1748426"
     * @param {GetDocumentSplitByIdV2026R0OptionalsInput} optionalsInput
     * @returns {Promise<DocumentSplitV2026R0>}
     */
  async getDocumentSplitByIdV2026R0(
    documentSplitId: string,
    optionalsInput: GetDocumentSplitByIdV2026R0OptionalsInput = {},
  ): Promise<DocumentSplitV2026R0> {
    const optionals: GetDocumentSplitByIdV2026R0Optionals =
      new GetDocumentSplitByIdV2026R0Optionals({
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
            '/2.0/document_splits/',
            (toString(documentSplitId) as string)!,
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
      ...deserializeDocumentSplitV2026R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface DocumentSplitManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
