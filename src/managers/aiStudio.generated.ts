import { serializeAiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
import { deserializeAiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeAiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { deserializeAiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { serializeCreateAiAgent } from '../schemas/createAiAgent.generated.js';
import { deserializeCreateAiAgent } from '../schemas/createAiAgent.generated.js';
import { CreateAiAgentInput } from '../schemas/createAiAgent.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { AiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { AiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { CreateAiAgent } from '../schemas/createAiAgent.generated.js';
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
export class CreateAiAgentOptionals {
  readonly headers: CreateAiAgentHeaders = new CreateAiAgentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateAiAgentOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateAiAgentOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateAiAgentOptionalsInput {
  readonly headers?: CreateAiAgentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateAiAgentByIdOptionals {
  readonly headers: UpdateAiAgentByIdHeaders = new UpdateAiAgentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<UpdateAiAgentByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<UpdateAiAgentByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateAiAgentByIdOptionalsInput {
  readonly headers?: UpdateAiAgentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetAiAgentByIdOptionals {
  readonly queryParams: GetAiAgentByIdQueryParams =
    {} satisfies GetAiAgentByIdQueryParams;
  readonly headers: GetAiAgentByIdHeaders = new GetAiAgentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetAiAgentByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetAiAgentByIdOptionals,
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
export interface GetAiAgentByIdOptionalsInput {
  readonly queryParams?: GetAiAgentByIdQueryParams;
  readonly headers?: GetAiAgentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteAiAgentByIdOptionals {
  readonly headers: DeleteAiAgentByIdHeaders = new DeleteAiAgentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteAiAgentByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<DeleteAiAgentByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteAiAgentByIdOptionalsInput {
  readonly headers?: DeleteAiAgentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetAiAgentsQueryParams {
  /**
   * The mode to filter the agent config to return. Possible values are: `ask`, `text_gen`, and `extract`. */
  readonly mode?: readonly string[];
  /**
   * The fields to return in the response. */
  readonly fields?: readonly string[];
  /**
   * The state of the agents to return. Possible values are: `enabled`, `disabled` and `enabled_for_selected_users`. */
  readonly agentState?: readonly string[];
  /**
   * Whether to include the Box default agents in the response. */
  readonly includeBoxDefault?: boolean;
  /**
   * Defines the position marker at which to begin returning results. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetAiAgentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetAiAgentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetAiAgentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetAiAgentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateAiAgentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateAiAgentHeaders, 'extraHeaders'> &
      Partial<Pick<CreateAiAgentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateAiAgentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class UpdateAiAgentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateAiAgentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateAiAgentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateAiAgentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetAiAgentByIdQueryParams {
  /**
   * The fields to return in the response. */
  readonly fields?: readonly string[];
}
export class GetAiAgentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetAiAgentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetAiAgentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetAiAgentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteAiAgentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteAiAgentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteAiAgentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteAiAgentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class AiStudioManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      AiStudioManager,
      | 'networkSession'
      | 'getAiAgents'
      | 'createAiAgent'
      | 'updateAiAgentById'
      | 'getAiAgentById'
      | 'deleteAiAgentById'
    > &
      Partial<Pick<AiStudioManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Lists AI agents based on the provided parameters.
   * @param {GetAiAgentsQueryParams} queryParams Query parameters of getAiAgents method
   * @param {GetAiAgentsHeadersInput} headersInput Headers of getAiAgents method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<AiMultipleAgentResponse>}
   */
  async getAiAgents(
    queryParams: GetAiAgentsQueryParams = {} satisfies GetAiAgentsQueryParams,
    headersInput: GetAiAgentsHeadersInput = new GetAiAgentsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<AiMultipleAgentResponse> {
    const headers: GetAiAgentsHeaders = new GetAiAgentsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['mode']: queryParams.mode
        ? queryParams.mode.map(toString).join(',')
        : undefined,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['agent_state']: queryParams.agentState
        ? queryParams.agentState.map(toString).join(',')
        : undefined,
      ['include_box_default']: toString(
        queryParams.includeBoxDefault,
      ) as string,
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
            '/2.0/ai_agents',
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
      ...deserializeAiMultipleAgentResponse(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates an AI agent. At least one of the following capabilities must be provided: `ask`, `text_gen`, `extract`.
   * @param {CreateAiAgentInput} requestBodyInput Request body of createAiAgent method
   * @param {CreateAiAgentOptionalsInput} optionalsInput
   * @returns {Promise<AiSingleAgentResponseFull>}
   */
  async createAiAgent(
    requestBodyInput: CreateAiAgentInput,
    optionalsInput: CreateAiAgentOptionalsInput = {},
  ): Promise<AiSingleAgentResponseFull> {
    const requestBody: CreateAiAgent = new CreateAiAgent({
      type: requestBodyInput.type,
      name: requestBodyInput.name,
      accessState: requestBodyInput.accessState,
      iconReference: requestBodyInput.iconReference,
      allowedEntities: requestBodyInput.allowedEntities,
      ask: requestBodyInput.ask,
      textGen: requestBodyInput.textGen,
      extract: requestBodyInput.extract,
    });
    const optionals: CreateAiAgentOptionals = new CreateAiAgentOptionals({
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
            '/2.0/ai_agents',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateAiAgent(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeAiSingleAgentResponseFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates an AI agent.
     * @param {string} agentId The ID of the agent to update.
    Example: "1234"
     * @param {CreateAiAgentInput} requestBodyInput Request body of updateAiAgentById method
     * @param {UpdateAiAgentByIdOptionalsInput} optionalsInput
     * @returns {Promise<AiSingleAgentResponseFull>}
     */
  async updateAiAgentById(
    agentId: string,
    requestBodyInput: CreateAiAgentInput,
    optionalsInput: UpdateAiAgentByIdOptionalsInput = {},
  ): Promise<AiSingleAgentResponseFull> {
    const requestBody: CreateAiAgent = new CreateAiAgent({
      type: requestBodyInput.type,
      name: requestBodyInput.name,
      accessState: requestBodyInput.accessState,
      iconReference: requestBodyInput.iconReference,
      allowedEntities: requestBodyInput.allowedEntities,
      ask: requestBodyInput.ask,
      textGen: requestBodyInput.textGen,
      extract: requestBodyInput.extract,
    });
    const optionals: UpdateAiAgentByIdOptionals =
      new UpdateAiAgentByIdOptionals({
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
            '/2.0/ai_agents/',
            toString(agentId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeCreateAiAgent(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeAiSingleAgentResponseFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Gets an AI Agent using the `agent_id` parameter.
     * @param {string} agentId The agent id to get.
    Example: "1234"
     * @param {GetAiAgentByIdOptionalsInput} optionalsInput
     * @returns {Promise<AiSingleAgentResponseFull>}
     */
  async getAiAgentById(
    agentId: string,
    optionalsInput: GetAiAgentByIdOptionalsInput = {},
  ): Promise<AiSingleAgentResponseFull> {
    const optionals: GetAiAgentByIdOptionals = new GetAiAgentByIdOptionals({
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
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/ai_agents/',
            toString(agentId) as string,
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
      ...deserializeAiSingleAgentResponseFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes an AI agent using the provided parameters.
     * @param {string} agentId The ID of the agent to delete.
    Example: "1234"
     * @param {DeleteAiAgentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteAiAgentById(
    agentId: string,
    optionalsInput: DeleteAiAgentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteAiAgentByIdOptionals =
      new DeleteAiAgentByIdOptionals({
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
            '/2.0/ai_agents/',
            toString(agentId) as string,
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
export interface AiStudioManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
