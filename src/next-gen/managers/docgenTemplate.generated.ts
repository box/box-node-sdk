import { serializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { deserializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { serializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { deserializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { serializeDocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.generated.js';
import { deserializeDocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.generated.js';
import { serializeDocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.generated.js';
import { deserializeDocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.generated.js';
import { serializeDocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.generated.js';
import { deserializeDocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.generated.js';
import { serializeDocGenTagsProcessingMessageV2025R0 } from '../schemas/v2025R0/docGenTagsProcessingMessageV2025R0.generated.js';
import { deserializeDocGenTagsProcessingMessageV2025R0 } from '../schemas/v2025R0/docGenTagsProcessingMessageV2025R0.generated.js';
import { serializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { deserializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { DocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { DocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { DocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.generated.js';
import { DocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.generated.js';
import { DocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.generated.js';
import { DocGenTagsProcessingMessageV2025R0 } from '../schemas/v2025R0/docGenTagsProcessingMessageV2025R0.generated.js';
import { DocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
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
export class CreateDocgenTemplateV2025R0Optionals {
  readonly headers: CreateDocgenTemplateV2025R0Headers =
    new CreateDocgenTemplateV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateDocgenTemplateV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateDocgenTemplateV2025R0Optionals,
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
export interface CreateDocgenTemplateV2025R0OptionalsInput {
  readonly headers?: CreateDocgenTemplateV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteDocgenTemplateByIdV2025R0Optionals {
  readonly headers: DeleteDocgenTemplateByIdV2025R0Headers =
    new DeleteDocgenTemplateByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteDocgenTemplateByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteDocgenTemplateByIdV2025R0Optionals,
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
export interface DeleteDocgenTemplateByIdV2025R0OptionalsInput {
  readonly headers?: DeleteDocgenTemplateByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDocgenTemplateByIdV2025R0Optionals {
  readonly headers: GetDocgenTemplateByIdV2025R0Headers =
    new GetDocgenTemplateByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocgenTemplateByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDocgenTemplateByIdV2025R0Optionals,
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
export interface GetDocgenTemplateByIdV2025R0OptionalsInput {
  readonly headers?: GetDocgenTemplateByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDocgenTemplateTagsV2025R0Optionals {
  readonly queryParams: GetDocgenTemplateTagsV2025R0QueryParams =
    {} satisfies GetDocgenTemplateTagsV2025R0QueryParams;
  readonly headers: GetDocgenTemplateTagsV2025R0Headers =
    new GetDocgenTemplateTagsV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocgenTemplateTagsV2025R0Optionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDocgenTemplateTagsV2025R0Optionals,
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
export interface GetDocgenTemplateTagsV2025R0OptionalsInput {
  readonly queryParams?: GetDocgenTemplateTagsV2025R0QueryParams;
  readonly headers?: GetDocgenTemplateTagsV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetDocgenTemplateJobByIdV2025R0Optionals {
  readonly queryParams: GetDocgenTemplateJobByIdV2025R0QueryParams =
    {} satisfies GetDocgenTemplateJobByIdV2025R0QueryParams;
  readonly headers: GetDocgenTemplateJobByIdV2025R0Headers =
    new GetDocgenTemplateJobByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDocgenTemplateJobByIdV2025R0Optionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDocgenTemplateJobByIdV2025R0Optionals,
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
export interface GetDocgenTemplateJobByIdV2025R0OptionalsInput {
  readonly queryParams?: GetDocgenTemplateJobByIdV2025R0QueryParams;
  readonly headers?: GetDocgenTemplateJobByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateDocgenTemplateV2025R0Headers {
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
      CreateDocgenTemplateV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateDocgenTemplateV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface CreateDocgenTemplateV2025R0HeadersInput {
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
export interface GetDocgenTemplatesV2025R0QueryParams {
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
export class GetDocgenTemplatesV2025R0Headers {
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
      GetDocgenTemplatesV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocgenTemplatesV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocgenTemplatesV2025R0HeadersInput {
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
export class DeleteDocgenTemplateByIdV2025R0Headers {
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
      DeleteDocgenTemplateByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          DeleteDocgenTemplateByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface DeleteDocgenTemplateByIdV2025R0HeadersInput {
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
export class GetDocgenTemplateByIdV2025R0Headers {
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
      GetDocgenTemplateByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocgenTemplateByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocgenTemplateByIdV2025R0HeadersInput {
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
export interface GetDocgenTemplateTagsV2025R0QueryParams {
  /**
   * Id of template version. */
  readonly templateVersionId?: string;
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
export class GetDocgenTemplateTagsV2025R0Headers {
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
      GetDocgenTemplateTagsV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetDocgenTemplateTagsV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetDocgenTemplateTagsV2025R0HeadersInput {
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
export interface GetDocgenTemplateJobByIdV2025R0QueryParams {
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
export class GetDocgenTemplateJobByIdV2025R0Headers {
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
      GetDocgenTemplateJobByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          GetDocgenTemplateJobByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface GetDocgenTemplateJobByIdV2025R0HeadersInput {
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
export class DocgenTemplateManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      DocgenTemplateManager,
      | 'networkSession'
      | 'createDocgenTemplateV2025R0'
      | 'getDocgenTemplatesV2025R0'
      | 'deleteDocgenTemplateByIdV2025R0'
      | 'getDocgenTemplateByIdV2025R0'
      | 'getDocgenTemplateTagsV2025R0'
      | 'getDocgenTemplateJobByIdV2025R0'
    > &
      Partial<Pick<DocgenTemplateManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Marks a file as a Box Doc Gen template.
   * @param {DocGenTemplateCreateRequestV2025R0} requestBody Request body of createDocgenTemplateV2025R0 method
   * @param {CreateDocgenTemplateV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<DocGenTemplateBaseV2025R0>}
   */
  async createDocgenTemplateV2025R0(
    requestBody: DocGenTemplateCreateRequestV2025R0,
    optionalsInput: CreateDocgenTemplateV2025R0OptionalsInput = {},
  ): Promise<DocGenTemplateBaseV2025R0> {
    const optionals: CreateDocgenTemplateV2025R0Optionals =
      new CreateDocgenTemplateV2025R0Optionals({
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
            '/2.0/docgen_templates',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeDocGenTemplateCreateRequestV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeDocGenTemplateBaseV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Lists Box Doc Gen templates on which the user is a collaborator.
   * @param {GetDocgenTemplatesV2025R0QueryParams} queryParams Query parameters of getDocgenTemplatesV2025R0 method
   * @param {GetDocgenTemplatesV2025R0HeadersInput} headersInput Headers of getDocgenTemplatesV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<DocGenTemplatesV2025R0>}
   */
  async getDocgenTemplatesV2025R0(
    queryParams: GetDocgenTemplatesV2025R0QueryParams = {} satisfies GetDocgenTemplatesV2025R0QueryParams,
    headersInput: GetDocgenTemplatesV2025R0HeadersInput = new GetDocgenTemplatesV2025R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<DocGenTemplatesV2025R0> {
    const headers: GetDocgenTemplatesV2025R0Headers =
      new GetDocgenTemplatesV2025R0Headers({
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
            '/2.0/docgen_templates',
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
      ...deserializeDocGenTemplatesV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Unmarks file as Box Doc Gen template
     * @param {string} templateId ID of the file which will no longer be marked as a Box Doc Gen template.
    Example: "123"
     * @param {DeleteDocgenTemplateByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteDocgenTemplateByIdV2025R0(
    templateId: string,
    optionalsInput: DeleteDocgenTemplateByIdV2025R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteDocgenTemplateByIdV2025R0Optionals =
      new DeleteDocgenTemplateByIdV2025R0Optionals({
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
            '/2.0/docgen_templates/',
            toString(templateId) as string,
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
     * Lists details of a specific Box Doc Gen template.
     * @param {string} templateId The ID of a Box Doc Gen template.
    Example: 123
     * @param {GetDocgenTemplateByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<DocGenTemplateV2025R0>}
     */
  async getDocgenTemplateByIdV2025R0(
    templateId: string,
    optionalsInput: GetDocgenTemplateByIdV2025R0OptionalsInput = {},
  ): Promise<DocGenTemplateV2025R0> {
    const optionals: GetDocgenTemplateByIdV2025R0Optionals =
      new GetDocgenTemplateByIdV2025R0Optionals({
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
            '/2.0/docgen_templates/',
            toString(templateId) as string,
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
      ...deserializeDocGenTemplateV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Lists all tags in a Box Doc Gen template.
     * @param {string} templateId ID of template.
    Example: 123
     * @param {GetDocgenTemplateTagsV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<DocGenTagsV2025R0>}
     */
  async getDocgenTemplateTagsV2025R0(
    templateId: string,
    optionalsInput: GetDocgenTemplateTagsV2025R0OptionalsInput = {},
  ): Promise<DocGenTagsV2025R0> {
    const optionals: GetDocgenTemplateTagsV2025R0Optionals =
      new GetDocgenTemplateTagsV2025R0Optionals({
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
      ['template_version_id']: toString(
        queryParams.templateVersionId,
      ) as string,
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
            '/2.0/docgen_templates/',
            toString(templateId) as string,
            '/tags',
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
      ...deserializeDocGenTagsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Lists the users jobs which use this template.
     * @param {string} templateId Id of template to fetch jobs for.
    Example: 123
     * @param {GetDocgenTemplateJobByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<DocGenJobsV2025R0>}
     */
  async getDocgenTemplateJobByIdV2025R0(
    templateId: string,
    optionalsInput: GetDocgenTemplateJobByIdV2025R0OptionalsInput = {},
  ): Promise<DocGenJobsV2025R0> {
    const optionals: GetDocgenTemplateJobByIdV2025R0Optionals =
      new GetDocgenTemplateJobByIdV2025R0Optionals({
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
            '/2.0/docgen_template_jobs/',
            toString(templateId) as string,
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
}
export interface DocgenTemplateManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
