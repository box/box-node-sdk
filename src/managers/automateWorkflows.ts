import { serializeAutomateWorkflowsV2026R0 } from '../schemas/v2026R0/automateWorkflowsV2026R0';
import { deserializeAutomateWorkflowsV2026R0 } from '../schemas/v2026R0/automateWorkflowsV2026R0';
import { serializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { deserializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { serializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { deserializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { serializeAutomateWorkflowStartRequestV2026R0 } from '../schemas/v2026R0/automateWorkflowStartRequestV2026R0';
import { deserializeAutomateWorkflowStartRequestV2026R0 } from '../schemas/v2026R0/automateWorkflowStartRequestV2026R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { AutomateWorkflowsV2026R0 } from '../schemas/v2026R0/automateWorkflowsV2026R0';
import { ClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { BoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { AutomateWorkflowStartRequestV2026R0 } from '../schemas/v2026R0/automateWorkflowStartRequestV2026R0';
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
export class GetAutomateWorkflowsV2026R0Optionals {
  readonly headers: GetAutomateWorkflowsV2026R0Headers =
    new GetAutomateWorkflowsV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetAutomateWorkflowsV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetAutomateWorkflowsV2026R0Optionals,
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
export interface GetAutomateWorkflowsV2026R0OptionalsInput {
  readonly headers?: GetAutomateWorkflowsV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class CreateAutomateWorkflowStartV2026R0Optionals {
  readonly headers: CreateAutomateWorkflowStartV2026R0Headers =
    new CreateAutomateWorkflowStartV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateAutomateWorkflowStartV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateAutomateWorkflowStartV2026R0Optionals,
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
export interface CreateAutomateWorkflowStartV2026R0OptionalsInput {
  readonly headers?: CreateAutomateWorkflowStartV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export interface GetAutomateWorkflowsV2026R0QueryParams {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting this folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folder/123`
   * the `folder_id` is `123`.
   *
   * The root folder of a Box account is
   * always represented by the ID `0`. */
  readonly folderId: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
}
export class GetAutomateWorkflowsV2026R0Headers {
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
      GetAutomateWorkflowsV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetAutomateWorkflowsV2026R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetAutomateWorkflowsV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class CreateAutomateWorkflowStartV2026R0Headers {
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
      CreateAutomateWorkflowStartV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          CreateAutomateWorkflowStartV2026R0Headers,
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
export interface CreateAutomateWorkflowStartV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class AutomateWorkflowsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      AutomateWorkflowsManager,
      | 'networkSession'
      | 'getAutomateWorkflowsV2026R0'
      | 'createAutomateWorkflowStartV2026R0'
    > &
      Partial<Pick<AutomateWorkflowsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns workflow actions from Automate for a folder, using the
   * `WORKFLOW` action category.
   * @param {GetAutomateWorkflowsV2026R0QueryParams} queryParams Query parameters of getAutomateWorkflowsV2026R0 method
   * @param {GetAutomateWorkflowsV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<AutomateWorkflowsV2026R0>}
   */
  async getAutomateWorkflowsV2026R0(
    queryParams: GetAutomateWorkflowsV2026R0QueryParams,
    optionalsInput: GetAutomateWorkflowsV2026R0OptionalsInput = {},
  ): Promise<AutomateWorkflowsV2026R0> {
    const optionals: GetAutomateWorkflowsV2026R0Optionals =
      new GetAutomateWorkflowsV2026R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['folder_id']: toString(queryParams.folderId) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
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
            '/2.0/automate_workflows',
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
      ...deserializeAutomateWorkflowsV2026R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Starts an Automate workflow manually by using a workflow action ID and file IDs.
     * @param {string} workflowId The ID of the workflow.
    Example: "12345"
     * @param {AutomateWorkflowStartRequestV2026R0} requestBody Request body of createAutomateWorkflowStartV2026R0 method
     * @param {CreateAutomateWorkflowStartV2026R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async createAutomateWorkflowStartV2026R0(
    workflowId: string,
    requestBody: AutomateWorkflowStartRequestV2026R0,
    optionalsInput: CreateAutomateWorkflowStartV2026R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: CreateAutomateWorkflowStartV2026R0Optionals =
      new CreateAutomateWorkflowStartV2026R0Optionals({
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
            '/2.0/automate_workflows/',
            (toString(workflowId) as string)!,
            '/start',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeAutomateWorkflowStartRequestV2026R0(requestBody),
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
export interface AutomateWorkflowsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
