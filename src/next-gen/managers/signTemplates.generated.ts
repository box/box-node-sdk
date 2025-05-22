import { serializeSignTemplates } from '../schemas/signTemplates.generated.js';
import { deserializeSignTemplates } from '../schemas/signTemplates.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeSignTemplate } from '../schemas/signTemplate.generated.js';
import { deserializeSignTemplate } from '../schemas/signTemplate.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { SignTemplates } from '../schemas/signTemplates.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { SignTemplate } from '../schemas/signTemplate.generated.js';
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
export class GetSignTemplateByIdOptionals {
  readonly headers: GetSignTemplateByIdHeaders = new GetSignTemplateByIdHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetSignTemplateByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetSignTemplateByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetSignTemplateByIdOptionalsInput {
  readonly headers?: GetSignTemplateByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetSignTemplatesQueryParams {
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
export class GetSignTemplatesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSignTemplatesHeaders, 'extraHeaders'> &
      Partial<Pick<GetSignTemplatesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSignTemplatesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetSignTemplateByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSignTemplateByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetSignTemplateByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSignTemplateByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SignTemplatesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SignTemplatesManager,
      'networkSession' | 'getSignTemplates' | 'getSignTemplateById'
    > &
      Partial<Pick<SignTemplatesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Gets Box Sign templates created by a user.
   * @param {GetSignTemplatesQueryParams} queryParams Query parameters of getSignTemplates method
   * @param {GetSignTemplatesHeadersInput} headersInput Headers of getSignTemplates method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<SignTemplates>}
   */
  async getSignTemplates(
    queryParams: GetSignTemplatesQueryParams = {} satisfies GetSignTemplatesQueryParams,
    headersInput: GetSignTemplatesHeadersInput = new GetSignTemplatesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<SignTemplates> {
    const headers: GetSignTemplatesHeaders = new GetSignTemplatesHeaders({
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
            '/2.0/sign_templates',
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
      ...deserializeSignTemplates(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Fetches details of a specific Box Sign template.
     * @param {string} templateId The ID of a Box Sign template.
    Example: "123075213-7d117509-8f05-42e4-a5ef-5190a319d41d"
     * @param {GetSignTemplateByIdOptionalsInput} optionalsInput
     * @returns {Promise<SignTemplate>}
     */
  async getSignTemplateById(
    templateId: string,
    optionalsInput: GetSignTemplateByIdOptionalsInput = {},
  ): Promise<SignTemplate> {
    const optionals: GetSignTemplateByIdOptionals =
      new GetSignTemplateByIdOptionals({
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
            '/2.0/sign_templates/',
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
      ...deserializeSignTemplate(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SignTemplatesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
