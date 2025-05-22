import { serializeIntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { deserializeIntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeIntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { deserializeIntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { serializeIntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { deserializeIntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { serializeIntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { deserializeIntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { serializeIntegrationMappingSlackOptions } from '../schemas/integrationMappingSlackOptions.generated.js';
import { deserializeIntegrationMappingSlackOptions } from '../schemas/integrationMappingSlackOptions.generated.js';
import { serializeIntegrationMappingsTeams } from '../schemas/integrationMappingsTeams.generated.js';
import { deserializeIntegrationMappingsTeams } from '../schemas/integrationMappingsTeams.generated.js';
import { serializeIntegrationMappingTeams } from '../schemas/integrationMappingTeams.generated.js';
import { deserializeIntegrationMappingTeams } from '../schemas/integrationMappingTeams.generated.js';
import { serializeIntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { deserializeIntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { serializeFolderReference } from '../schemas/folderReference.generated.js';
import { deserializeFolderReference } from '../schemas/folderReference.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { IntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { IntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { IntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { IntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { IntegrationMappingSlackOptions } from '../schemas/integrationMappingSlackOptions.generated.js';
import { IntegrationMappingsTeams } from '../schemas/integrationMappingsTeams.generated.js';
import { IntegrationMappingTeams } from '../schemas/integrationMappingTeams.generated.js';
import { IntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { FolderReference } from '../schemas/folderReference.generated.js';
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
export class CreateSlackIntegrationMappingOptionals {
  readonly headers: CreateSlackIntegrationMappingHeaders =
    new CreateSlackIntegrationMappingHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateSlackIntegrationMappingOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateSlackIntegrationMappingOptionals,
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
export interface CreateSlackIntegrationMappingOptionalsInput {
  readonly headers?: CreateSlackIntegrationMappingHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateSlackIntegrationMappingByIdOptionals {
  readonly requestBody: UpdateSlackIntegrationMappingByIdRequestBody =
    {} satisfies UpdateSlackIntegrationMappingByIdRequestBody;
  readonly headers: UpdateSlackIntegrationMappingByIdHeaders =
    new UpdateSlackIntegrationMappingByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateSlackIntegrationMappingByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateSlackIntegrationMappingByIdOptionals,
          'requestBody' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateSlackIntegrationMappingByIdOptionalsInput {
  readonly requestBody?: UpdateSlackIntegrationMappingByIdRequestBody;
  readonly headers?: UpdateSlackIntegrationMappingByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteSlackIntegrationMappingByIdOptionals {
  readonly headers: DeleteSlackIntegrationMappingByIdHeaders =
    new DeleteSlackIntegrationMappingByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteSlackIntegrationMappingByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteSlackIntegrationMappingByIdOptionals,
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
export interface DeleteSlackIntegrationMappingByIdOptionalsInput {
  readonly headers?: DeleteSlackIntegrationMappingByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateTeamsIntegrationMappingOptionals {
  readonly headers: CreateTeamsIntegrationMappingHeaders =
    new CreateTeamsIntegrationMappingHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateTeamsIntegrationMappingOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateTeamsIntegrationMappingOptionals,
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
export interface CreateTeamsIntegrationMappingOptionalsInput {
  readonly headers?: CreateTeamsIntegrationMappingHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateTeamsIntegrationMappingByIdOptionals {
  readonly requestBody: UpdateTeamsIntegrationMappingByIdRequestBody =
    {} satisfies UpdateTeamsIntegrationMappingByIdRequestBody;
  readonly headers: UpdateTeamsIntegrationMappingByIdHeaders =
    new UpdateTeamsIntegrationMappingByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateTeamsIntegrationMappingByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateTeamsIntegrationMappingByIdOptionals,
          'requestBody' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateTeamsIntegrationMappingByIdOptionalsInput {
  readonly requestBody?: UpdateTeamsIntegrationMappingByIdRequestBody;
  readonly headers?: UpdateTeamsIntegrationMappingByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTeamsIntegrationMappingByIdOptionals {
  readonly headers: DeleteTeamsIntegrationMappingByIdHeaders =
    new DeleteTeamsIntegrationMappingByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteTeamsIntegrationMappingByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteTeamsIntegrationMappingByIdOptionals,
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
export interface DeleteTeamsIntegrationMappingByIdOptionalsInput {
  readonly headers?: DeleteTeamsIntegrationMappingByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetSlackIntegrationMappingQueryParamsPartnerItemTypeField =
  | 'channel'
  | string;
export type GetSlackIntegrationMappingQueryParamsBoxItemTypeField =
  | 'folder'
  | string;
export interface GetSlackIntegrationMappingQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Mapped item type, for which the mapping should be returned */
  readonly partnerItemType?: GetSlackIntegrationMappingQueryParamsPartnerItemTypeField;
  /**
   * ID of the mapped item, for which the mapping should be returned */
  readonly partnerItemId?: string;
  /**
   * Box item ID, for which the mappings should be returned */
  readonly boxItemId?: string;
  /**
   * Box item type, for which the mappings should be returned */
  readonly boxItemType?: GetSlackIntegrationMappingQueryParamsBoxItemTypeField;
  /**
   * Whether the mapping has been manually created */
  readonly isManuallyCreated?: boolean;
}
export class GetSlackIntegrationMappingHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSlackIntegrationMappingHeaders, 'extraHeaders'> &
      Partial<Pick<GetSlackIntegrationMappingHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSlackIntegrationMappingHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateSlackIntegrationMappingHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateSlackIntegrationMappingHeaders, 'extraHeaders'> &
      Partial<Pick<CreateSlackIntegrationMappingHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateSlackIntegrationMappingHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateSlackIntegrationMappingByIdRequestBody {
  readonly boxItem?: IntegrationMappingBoxItemSlack;
  readonly options?: IntegrationMappingSlackOptions;
  readonly rawData?: SerializedData;
}
export class UpdateSlackIntegrationMappingByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateSlackIntegrationMappingByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateSlackIntegrationMappingByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateSlackIntegrationMappingByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteSlackIntegrationMappingByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteSlackIntegrationMappingByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteSlackIntegrationMappingByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteSlackIntegrationMappingByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetTeamsIntegrationMappingQueryParamsPartnerItemTypeField =
  | 'channel'
  | 'team'
  | string;
export type GetTeamsIntegrationMappingQueryParamsBoxItemTypeField =
  | 'folder'
  | string;
export interface GetTeamsIntegrationMappingQueryParams {
  /**
   * Mapped item type, for which the mapping should be returned */
  readonly partnerItemType?: GetTeamsIntegrationMappingQueryParamsPartnerItemTypeField;
  /**
   * ID of the mapped item, for which the mapping should be returned */
  readonly partnerItemId?: string;
  /**
   * Box item ID, for which the mappings should be returned */
  readonly boxItemId?: string;
  /**
   * Box item type, for which the mappings should be returned */
  readonly boxItemType?: GetTeamsIntegrationMappingQueryParamsBoxItemTypeField;
}
export class GetTeamsIntegrationMappingHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTeamsIntegrationMappingHeaders, 'extraHeaders'> &
      Partial<Pick<GetTeamsIntegrationMappingHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTeamsIntegrationMappingHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateTeamsIntegrationMappingHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateTeamsIntegrationMappingHeaders, 'extraHeaders'> &
      Partial<Pick<CreateTeamsIntegrationMappingHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateTeamsIntegrationMappingHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateTeamsIntegrationMappingByIdRequestBody {
  readonly boxItem?: FolderReference;
  readonly rawData?: SerializedData;
}
export class UpdateTeamsIntegrationMappingByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateTeamsIntegrationMappingByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateTeamsIntegrationMappingByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateTeamsIntegrationMappingByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTeamsIntegrationMappingByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTeamsIntegrationMappingByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTeamsIntegrationMappingByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTeamsIntegrationMappingByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class IntegrationMappingsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      IntegrationMappingsManager,
      | 'networkSession'
      | 'getSlackIntegrationMapping'
      | 'createSlackIntegrationMapping'
      | 'updateSlackIntegrationMappingById'
      | 'deleteSlackIntegrationMappingById'
      | 'getTeamsIntegrationMapping'
      | 'createTeamsIntegrationMapping'
      | 'updateTeamsIntegrationMappingById'
      | 'deleteTeamsIntegrationMappingById'
    > &
      Partial<Pick<IntegrationMappingsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Lists [Slack integration mappings](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack) in a users' enterprise.
   *
   * You need Admin or Co-Admin role to
   * use this endpoint.
   * @param {GetSlackIntegrationMappingQueryParams} queryParams Query parameters of getSlackIntegrationMapping method
   * @param {GetSlackIntegrationMappingHeadersInput} headersInput Headers of getSlackIntegrationMapping method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<IntegrationMappings>}
   */
  async getSlackIntegrationMapping(
    queryParams: GetSlackIntegrationMappingQueryParams = {} satisfies GetSlackIntegrationMappingQueryParams,
    headersInput: GetSlackIntegrationMappingHeadersInput = new GetSlackIntegrationMappingHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<IntegrationMappings> {
    const headers: GetSlackIntegrationMappingHeaders =
      new GetSlackIntegrationMappingHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['partner_item_type']: toString(queryParams.partnerItemType) as string,
      ['partner_item_id']: toString(queryParams.partnerItemId) as string,
      ['box_item_id']: toString(queryParams.boxItemId) as string,
      ['box_item_type']: toString(queryParams.boxItemType) as string,
      ['is_manually_created']: toString(
        queryParams.isManuallyCreated,
      ) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/integration_mappings/slack',
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
      ...deserializeIntegrationMappings(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack)
   * by mapping a Slack channel to a Box item.
   *
   * You need Admin or Co-Admin role to
   * use this endpoint.
   * @param {IntegrationMappingSlackCreateRequest} requestBody Request body of createSlackIntegrationMapping method
   * @param {CreateSlackIntegrationMappingOptionalsInput} optionalsInput
   * @returns {Promise<IntegrationMapping>}
   */
  async createSlackIntegrationMapping(
    requestBody: IntegrationMappingSlackCreateRequest,
    optionalsInput: CreateSlackIntegrationMappingOptionalsInput = {},
  ): Promise<IntegrationMapping> {
    const optionals: CreateSlackIntegrationMappingOptionals =
      new CreateSlackIntegrationMappingOptionals({
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
            '/2.0/integration_mappings/slack',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeIntegrationMappingSlackCreateRequest(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeIntegrationMapping(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
     * Supports updating the Box folder ID and options.
     *
     * You need Admin or Co-Admin role to
     * use this endpoint.
     * @param {string} integrationMappingId An ID of an integration mapping
    Example: "11235432"
     * @param {UpdateSlackIntegrationMappingByIdOptionalsInput} optionalsInput
     * @returns {Promise<IntegrationMapping>}
     */
  async updateSlackIntegrationMappingById(
    integrationMappingId: string,
    optionalsInput: UpdateSlackIntegrationMappingByIdOptionalsInput = {},
  ): Promise<IntegrationMapping> {
    const optionals: UpdateSlackIntegrationMappingByIdOptionals =
      new UpdateSlackIntegrationMappingByIdOptionals({
        requestBody: optionalsInput.requestBody,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
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
            '/2.0/integration_mappings/slack/',
            toString(integrationMappingId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateSlackIntegrationMappingByIdRequestBody(
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
      ...deserializeIntegrationMapping(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
     *
     *
     * You need Admin or Co-Admin role to
     * use this endpoint.
     * @param {string} integrationMappingId An ID of an integration mapping
    Example: "11235432"
     * @param {DeleteSlackIntegrationMappingByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteSlackIntegrationMappingById(
    integrationMappingId: string,
    optionalsInput: DeleteSlackIntegrationMappingByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteSlackIntegrationMappingByIdOptionals =
      new DeleteSlackIntegrationMappingByIdOptionals({
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
            '/2.0/integration_mappings/slack/',
            toString(integrationMappingId) as string,
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
   * Lists [Teams integration mappings](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams) in a users' enterprise.
   * You need Admin or Co-Admin role to
   * use this endpoint.
   * @param {GetTeamsIntegrationMappingQueryParams} queryParams Query parameters of getTeamsIntegrationMapping method
   * @param {GetTeamsIntegrationMappingHeadersInput} headersInput Headers of getTeamsIntegrationMapping method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<IntegrationMappingsTeams>}
   */
  async getTeamsIntegrationMapping(
    queryParams: GetTeamsIntegrationMappingQueryParams = {} satisfies GetTeamsIntegrationMappingQueryParams,
    headersInput: GetTeamsIntegrationMappingHeadersInput = new GetTeamsIntegrationMappingHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<IntegrationMappingsTeams> {
    const headers: GetTeamsIntegrationMappingHeaders =
      new GetTeamsIntegrationMappingHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['partner_item_type']: toString(queryParams.partnerItemType) as string,
      ['partner_item_id']: toString(queryParams.partnerItemId) as string,
      ['box_item_id']: toString(queryParams.boxItemId) as string,
      ['box_item_type']: toString(queryParams.boxItemType) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/integration_mappings/teams',
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
      ...deserializeIntegrationMappingsTeams(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams)
   * by mapping a Teams channel to a Box item.
   * You need Admin or Co-Admin role to
   * use this endpoint.
   * @param {IntegrationMappingTeamsCreateRequest} requestBody Request body of createTeamsIntegrationMapping method
   * @param {CreateTeamsIntegrationMappingOptionalsInput} optionalsInput
   * @returns {Promise<IntegrationMappingTeams>}
   */
  async createTeamsIntegrationMapping(
    requestBody: IntegrationMappingTeamsCreateRequest,
    optionalsInput: CreateTeamsIntegrationMappingOptionalsInput = {},
  ): Promise<IntegrationMappingTeams> {
    const optionals: CreateTeamsIntegrationMappingOptionals =
      new CreateTeamsIntegrationMappingOptionals({
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
            '/2.0/integration_mappings/teams',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeIntegrationMappingTeamsCreateRequest(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeIntegrationMappingTeams(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams).
     * Supports updating the Box folder ID and options.
     * You need Admin or Co-Admin role to
     * use this endpoint.
     * @param {string} integrationMappingId An ID of an integration mapping
    Example: "11235432"
     * @param {UpdateTeamsIntegrationMappingByIdOptionalsInput} optionalsInput
     * @returns {Promise<IntegrationMappingTeams>}
     */
  async updateTeamsIntegrationMappingById(
    integrationMappingId: string,
    optionalsInput: UpdateTeamsIntegrationMappingByIdOptionalsInput = {},
  ): Promise<IntegrationMappingTeams> {
    const optionals: UpdateTeamsIntegrationMappingByIdOptionals =
      new UpdateTeamsIntegrationMappingByIdOptionals({
        requestBody: optionalsInput.requestBody,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
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
            '/2.0/integration_mappings/teams/',
            toString(integrationMappingId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateTeamsIntegrationMappingByIdRequestBody(
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
      ...deserializeIntegrationMappingTeams(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a [Teams integration mapping](https://support.box.com/hc/en-us/articles/360044681474-Using-Box-for-Teams).
     * You need Admin or Co-Admin role to
     * use this endpoint.
     * @param {string} integrationMappingId An ID of an integration mapping
    Example: "11235432"
     * @param {DeleteTeamsIntegrationMappingByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTeamsIntegrationMappingById(
    integrationMappingId: string,
    optionalsInput: DeleteTeamsIntegrationMappingByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTeamsIntegrationMappingByIdOptionals =
      new DeleteTeamsIntegrationMappingByIdOptionals({
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
            '/2.0/integration_mappings/teams/',
            toString(integrationMappingId) as string,
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
export interface IntegrationMappingsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetSlackIntegrationMappingQueryParamsPartnerItemTypeField(
  val: GetSlackIntegrationMappingQueryParamsPartnerItemTypeField,
): SerializedData {
  return val;
}
export function deserializeGetSlackIntegrationMappingQueryParamsPartnerItemTypeField(
  val: SerializedData,
): GetSlackIntegrationMappingQueryParamsPartnerItemTypeField {
  if (val == 'channel') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetSlackIntegrationMappingQueryParamsPartnerItemTypeField",
  });
}
export function serializeGetSlackIntegrationMappingQueryParamsBoxItemTypeField(
  val: GetSlackIntegrationMappingQueryParamsBoxItemTypeField,
): SerializedData {
  return val;
}
export function deserializeGetSlackIntegrationMappingQueryParamsBoxItemTypeField(
  val: SerializedData,
): GetSlackIntegrationMappingQueryParamsBoxItemTypeField {
  if (val == 'folder') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetSlackIntegrationMappingQueryParamsBoxItemTypeField",
  });
}
export function serializeUpdateSlackIntegrationMappingByIdRequestBody(
  val: UpdateSlackIntegrationMappingByIdRequestBody,
): SerializedData {
  return {
    ['box_item']:
      val.boxItem == void 0
        ? val.boxItem
        : serializeIntegrationMappingBoxItemSlack(val.boxItem),
    ['options']:
      val.options == void 0
        ? val.options
        : serializeIntegrationMappingSlackOptions(val.options),
  };
}
export function deserializeUpdateSlackIntegrationMappingByIdRequestBody(
  val: SerializedData,
): UpdateSlackIntegrationMappingByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSlackIntegrationMappingByIdRequestBody"',
    });
  }
  const boxItem: undefined | IntegrationMappingBoxItemSlack =
    val.box_item == void 0
      ? void 0
      : deserializeIntegrationMappingBoxItemSlack(val.box_item);
  const options: undefined | IntegrationMappingSlackOptions =
    val.options == void 0
      ? void 0
      : deserializeIntegrationMappingSlackOptions(val.options);
  return {
    boxItem: boxItem,
    options: options,
  } satisfies UpdateSlackIntegrationMappingByIdRequestBody;
}
export function serializeGetTeamsIntegrationMappingQueryParamsPartnerItemTypeField(
  val: GetTeamsIntegrationMappingQueryParamsPartnerItemTypeField,
): SerializedData {
  return val;
}
export function deserializeGetTeamsIntegrationMappingQueryParamsPartnerItemTypeField(
  val: SerializedData,
): GetTeamsIntegrationMappingQueryParamsPartnerItemTypeField {
  if (val == 'channel') {
    return val;
  }
  if (val == 'team') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetTeamsIntegrationMappingQueryParamsPartnerItemTypeField",
  });
}
export function serializeGetTeamsIntegrationMappingQueryParamsBoxItemTypeField(
  val: GetTeamsIntegrationMappingQueryParamsBoxItemTypeField,
): SerializedData {
  return val;
}
export function deserializeGetTeamsIntegrationMappingQueryParamsBoxItemTypeField(
  val: SerializedData,
): GetTeamsIntegrationMappingQueryParamsBoxItemTypeField {
  if (val == 'folder') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize GetTeamsIntegrationMappingQueryParamsBoxItemTypeField",
  });
}
export function serializeUpdateTeamsIntegrationMappingByIdRequestBody(
  val: UpdateTeamsIntegrationMappingByIdRequestBody,
): SerializedData {
  return {
    ['box_item']:
      val.boxItem == void 0
        ? val.boxItem
        : serializeFolderReference(val.boxItem),
  };
}
export function deserializeUpdateTeamsIntegrationMappingByIdRequestBody(
  val: SerializedData,
): UpdateTeamsIntegrationMappingByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateTeamsIntegrationMappingByIdRequestBody"',
    });
  }
  const boxItem: undefined | FolderReference =
    val.box_item == void 0 ? void 0 : deserializeFolderReference(val.box_item);
  return {
    boxItem: boxItem,
  } satisfies UpdateTeamsIntegrationMappingByIdRequestBody;
}
