import { serializeMetadataTemplates } from '../schemas/metadataTemplates.generated.js';
import { deserializeMetadataTemplates } from '../schemas/metadataTemplates.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { deserializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { MetadataTemplates } from '../schemas/metadataTemplates.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.generated.js';
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
export class GetMetadataTemplatesByInstanceIdOptionals {
  readonly headers: GetMetadataTemplatesByInstanceIdHeaders =
    new GetMetadataTemplatesByInstanceIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTemplatesByInstanceIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataTemplatesByInstanceIdOptionals,
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
export interface GetMetadataTemplatesByInstanceIdOptionalsInput {
  readonly headers?: GetMetadataTemplatesByInstanceIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetMetadataTemplateOptionals {
  readonly headers: GetMetadataTemplateHeaders = new GetMetadataTemplateHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTemplateOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetMetadataTemplateOptionals, 'headers' | 'cancellationToken'>
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
export interface GetMetadataTemplateOptionalsInput {
  readonly headers?: GetMetadataTemplateHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateMetadataTemplateOptionals {
  readonly headers: UpdateMetadataTemplateHeaders =
    new UpdateMetadataTemplateHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateMetadataTemplateOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateMetadataTemplateOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateMetadataTemplateOptionalsInput {
  readonly headers?: UpdateMetadataTemplateHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteMetadataTemplateOptionals {
  readonly headers: DeleteMetadataTemplateHeaders =
    new DeleteMetadataTemplateHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteMetadataTemplateOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteMetadataTemplateOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteMetadataTemplateOptionalsInput {
  readonly headers?: DeleteMetadataTemplateHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetMetadataTemplateByIdOptionals {
  readonly headers: GetMetadataTemplateByIdHeaders =
    new GetMetadataTemplateByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTemplateByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetMetadataTemplateByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface GetMetadataTemplateByIdOptionalsInput {
  readonly headers?: GetMetadataTemplateByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateMetadataTemplateOptionals {
  readonly headers: CreateMetadataTemplateHeaders =
    new CreateMetadataTemplateHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateMetadataTemplateOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateMetadataTemplateOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateMetadataTemplateOptionalsInput {
  readonly headers?: CreateMetadataTemplateHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetMetadataTemplatesByInstanceIdQueryParams {
  /**
   * The ID of an instance of the metadata template to find. */
  readonly metadataInstanceId: string;
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
export class GetMetadataTemplatesByInstanceIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTemplatesByInstanceIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTemplatesByInstanceIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTemplatesByInstanceIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetMetadataTemplateScope = 'global' | 'enterprise' | string;
export class GetMetadataTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateMetadataTemplateScope = 'global' | 'enterprise' | string;
export type UpdateMetadataTemplateRequestBodyOpField =
  | 'editTemplate'
  | 'addField'
  | 'reorderFields'
  | 'addEnumOption'
  | 'reorderEnumOptions'
  | 'reorderMultiSelectOptions'
  | 'addMultiSelectOption'
  | 'editField'
  | 'removeField'
  | 'editEnumOption'
  | 'removeEnumOption'
  | 'editMultiSelectOption'
  | 'removeMultiSelectOption'
  | string;
export interface UpdateMetadataTemplateRequestBody {
  /**
   * The type of change to perform on the template. Some
   * of these are hazardous as they will change existing templates. */
  readonly op: UpdateMetadataTemplateRequestBodyOpField;
  /**
   * The data for the operation. This will vary depending on the
   * operation being performed. */
  readonly data?: {
    readonly [key: string]: any;
  };
  /**
   * For operations that affect a single field this defines the key of
   * the field that is affected. */
  readonly fieldKey?: string;
  /**
   * For operations that affect multiple fields this defines the keys
   * of the fields that are affected. */
  readonly fieldKeys?: readonly string[];
  /**
   * For operations that affect a single `enum` option this defines
   * the key of the option that is affected. */
  readonly enumOptionKey?: string;
  /**
   * For operations that affect multiple `enum` options this defines
   * the keys of the options that are affected. */
  readonly enumOptionKeys?: readonly string[];
  /**
   * For operations that affect a single multi select option this
   * defines the key of the option that is affected. */
  readonly multiSelectOptionKey?: string;
  /**
   * For operations that affect multiple multi select options this
   * defines the keys of the options that are affected. */
  readonly multiSelectOptionKeys?: readonly string[];
  readonly rawData?: SerializedData;
}
export class UpdateMetadataTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateMetadataTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateMetadataTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateMetadataTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type DeleteMetadataTemplateScope = 'global' | 'enterprise' | string;
export class DeleteMetadataTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteMetadataTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteMetadataTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteMetadataTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetMetadataTemplateByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTemplateByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTemplateByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTemplateByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetGlobalMetadataTemplatesQueryParams {
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
export class GetGlobalMetadataTemplatesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGlobalMetadataTemplatesHeaders, 'extraHeaders'> &
      Partial<Pick<GetGlobalMetadataTemplatesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGlobalMetadataTemplatesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetEnterpriseMetadataTemplatesQueryParams {
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
export class GetEnterpriseMetadataTemplatesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetEnterpriseMetadataTemplatesHeaders, 'extraHeaders'> &
      Partial<Pick<GetEnterpriseMetadataTemplatesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetEnterpriseMetadataTemplatesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateMetadataTemplateRequestBodyFieldsTypeField =
  | 'string'
  | 'float'
  | 'date'
  | 'enum'
  | 'multiSelect';
export interface CreateMetadataTemplateRequestBodyFieldsOptionsField {
  /**
   * The text value of the option. This represents both the display name of the
   * option and the internal key used when updating templates. */
  readonly key: string;
  readonly rawData?: SerializedData;
}
export interface CreateMetadataTemplateRequestBodyFieldsField {
  /**
   * The type of field. The basic fields are a `string` field for text, a
   * `float` field for numbers, and a `date` fields to present the user with a
   * date-time picker.
   *
   * Additionally, metadata templates support an `enum` field for a basic list
   * of items, and ` multiSelect` field for a similar list of items where the
   * user can select more than one value. */
  readonly type: CreateMetadataTemplateRequestBodyFieldsTypeField;
  /**
   * A unique identifier for the field. The identifier must
   * be unique within the template to which it belongs. */
  readonly key: string;
  /**
   * The display name of the field as it is shown to the user in the web and
   * mobile apps. */
  readonly displayName: string;
  /**
   * A description of the field. This is not shown to the user. */
  readonly description?: string;
  /**
   * Whether this field is hidden in the UI for the user and can only be set
   * through the API instead. */
  readonly hidden?: boolean;
  /**
   * A list of options for this field. This is used in combination with the
   * `enum` and `multiSelect` field types. */
  readonly options?: readonly CreateMetadataTemplateRequestBodyFieldsOptionsField[];
  readonly rawData?: SerializedData;
}
export interface CreateMetadataTemplateRequestBody {
  /**
   * The scope of the metadata template to create. Applications can
   * only create templates for use within the authenticated user's
   * enterprise.
   *
   * This value needs to be set to `enterprise`, as `global` scopes can
   * not be created by applications. */
  readonly scope: string;
  /**
   * A unique identifier for the template. This identifier needs to be
   * unique across the enterprise for which the metadata template is
   * being created.
   *
   * When not provided, the API will create a unique `templateKey`
   * based on the value of the `displayName`. */
  readonly templateKey?: string;
  /**
   * The display name of the template. */
  readonly displayName: string;
  /**
   * Defines if this template is visible in the Box web app UI, or if
   * it is purely intended for usage through the API. */
  readonly hidden?: boolean;
  /**
   * An ordered list of template fields which are part of the template.
   * Each field can be a regular text field, date field, number field,
   * as well as a single or multi-select list. */
  readonly fields?: readonly CreateMetadataTemplateRequestBodyFieldsField[];
  /**
   * Whether or not to copy any metadata attached to a file or folder
   * when it is copied. By default, metadata is not copied along with a
   * file or folder when it is copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  readonly rawData?: SerializedData;
}
export class CreateMetadataTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateMetadataTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<CreateMetadataTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateMetadataTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class MetadataTemplatesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      MetadataTemplatesManager,
      | 'networkSession'
      | 'getMetadataTemplatesByInstanceId'
      | 'getMetadataTemplate'
      | 'updateMetadataTemplate'
      | 'deleteMetadataTemplate'
      | 'getMetadataTemplateById'
      | 'getGlobalMetadataTemplates'
      | 'getEnterpriseMetadataTemplates'
      | 'createMetadataTemplate'
    > &
      Partial<Pick<MetadataTemplatesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Finds a metadata template by searching for the ID of an instance of the
   * template.
   * @param {GetMetadataTemplatesByInstanceIdQueryParams} queryParams Query parameters of getMetadataTemplatesByInstanceId method
   * @param {GetMetadataTemplatesByInstanceIdOptionalsInput} optionalsInput
   * @returns {Promise<MetadataTemplates>}
   */
  async getMetadataTemplatesByInstanceId(
    queryParams: GetMetadataTemplatesByInstanceIdQueryParams,
    optionalsInput: GetMetadataTemplatesByInstanceIdOptionalsInput = {},
  ): Promise<MetadataTemplates> {
    const optionals: GetMetadataTemplatesByInstanceIdOptionals =
      new GetMetadataTemplatesByInstanceIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['metadata_instance_id']: toString(
        queryParams.metadataInstanceId,
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
            '/2.0/metadata_templates',
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
      ...deserializeMetadataTemplates(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a metadata template by its `scope` and `templateKey` values.
     *
     * To find the `scope` and `templateKey` for a template, list all templates for
     * an enterprise or globally, or list all templates applied to a file or folder.
     * @param {GetMetadataTemplateScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {GetMetadataTemplateOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTemplate>}
     */
  async getMetadataTemplate(
    scope: GetMetadataTemplateScope,
    templateKey: string,
    optionalsInput: GetMetadataTemplateOptionalsInput = {},
  ): Promise<MetadataTemplate> {
    const optionals: GetMetadataTemplateOptionals =
      new GetMetadataTemplateOptionals({
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
            '/2.0/metadata_templates/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
            '/schema',
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
      ...deserializeMetadataTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a metadata template.
     *
     * The metadata template can only be updated if the template
     * already exists.
     *
     * The update is applied atomically. If any errors occur during the
     * application of the operations, the metadata template will not be changed.
     * @param {UpdateMetadataTemplateScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {readonly UpdateMetadataTemplateRequestBody[]} requestBody Request body of updateMetadataTemplate method
     * @param {UpdateMetadataTemplateOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTemplate>}
     */
  async updateMetadataTemplate(
    scope: UpdateMetadataTemplateScope,
    templateKey: string,
    requestBody: readonly UpdateMetadataTemplateRequestBody[],
    optionalsInput: UpdateMetadataTemplateOptionalsInput = {},
  ): Promise<MetadataTemplate> {
    const optionals: UpdateMetadataTemplateOptionals =
      new UpdateMetadataTemplateOptionals({
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
            '/2.0/metadata_templates/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
            '/schema',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateMetadataTemplateRequestBody,
          ) as readonly any[],
          contentType: 'application/json-patch+json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete a metadata template and its instances.
     * This deletion is permanent and can not be reversed.
     * @param {DeleteMetadataTemplateScope} scope The scope of the metadata template.
    Example: "global"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {DeleteMetadataTemplateOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteMetadataTemplate(
    scope: DeleteMetadataTemplateScope,
    templateKey: string,
    optionalsInput: DeleteMetadataTemplateOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteMetadataTemplateOptionals =
      new DeleteMetadataTemplateOptionals({
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
            '/2.0/metadata_templates/',
            toString(scope) as string,
            '/',
            toString(templateKey) as string,
            '/schema',
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
     * Retrieves a metadata template by its ID.
     * @param {string} templateId The ID of the template.
    Example: "f7a9891f"
     * @param {GetMetadataTemplateByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTemplate>}
     */
  async getMetadataTemplateById(
    templateId: string,
    optionalsInput: GetMetadataTemplateByIdOptionalsInput = {},
  ): Promise<MetadataTemplate> {
    const optionals: GetMetadataTemplateByIdOptionals =
      new GetMetadataTemplateByIdOptionals({
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
            '/2.0/metadata_templates/',
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
      ...deserializeMetadataTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Used to retrieve all generic, global metadata templates available to all
   * enterprises using Box.
   * @param {GetGlobalMetadataTemplatesQueryParams} queryParams Query parameters of getGlobalMetadataTemplates method
   * @param {GetGlobalMetadataTemplatesHeadersInput} headersInput Headers of getGlobalMetadataTemplates method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<MetadataTemplates>}
   */
  async getGlobalMetadataTemplates(
    queryParams: GetGlobalMetadataTemplatesQueryParams = {} satisfies GetGlobalMetadataTemplatesQueryParams,
    headersInput: GetGlobalMetadataTemplatesHeadersInput = new GetGlobalMetadataTemplatesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<MetadataTemplates> {
    const headers: GetGlobalMetadataTemplatesHeaders =
      new GetGlobalMetadataTemplatesHeaders({
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
            '/2.0/metadata_templates/global',
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
      ...deserializeMetadataTemplates(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Used to retrieve all metadata templates created to be used specifically within
   * the user's enterprise.
   * @param {GetEnterpriseMetadataTemplatesQueryParams} queryParams Query parameters of getEnterpriseMetadataTemplates method
   * @param {GetEnterpriseMetadataTemplatesHeadersInput} headersInput Headers of getEnterpriseMetadataTemplates method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<MetadataTemplates>}
   */
  async getEnterpriseMetadataTemplates(
    queryParams: GetEnterpriseMetadataTemplatesQueryParams = {} satisfies GetEnterpriseMetadataTemplatesQueryParams,
    headersInput: GetEnterpriseMetadataTemplatesHeadersInput = new GetEnterpriseMetadataTemplatesHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<MetadataTemplates> {
    const headers: GetEnterpriseMetadataTemplatesHeaders =
      new GetEnterpriseMetadataTemplatesHeaders({
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
            '/2.0/metadata_templates/enterprise',
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
      ...deserializeMetadataTemplates(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new metadata template that can be applied to
   * files and folders.
   * @param {CreateMetadataTemplateRequestBody} requestBody Request body of createMetadataTemplate method
   * @param {CreateMetadataTemplateOptionalsInput} optionalsInput
   * @returns {Promise<MetadataTemplate>}
   */
  async createMetadataTemplate(
    requestBody: CreateMetadataTemplateRequestBody,
    optionalsInput: CreateMetadataTemplateOptionalsInput = {},
  ): Promise<MetadataTemplate> {
    const optionals: CreateMetadataTemplateOptionals =
      new CreateMetadataTemplateOptionals({
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
            '/2.0/metadata_templates/schema',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateMetadataTemplateRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTemplate(response.data!),
      rawData: response.data!,
    };
  }
}
export interface MetadataTemplatesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetMetadataTemplateScope(
  val: GetMetadataTemplateScope,
): SerializedData {
  return val;
}
export function deserializeGetMetadataTemplateScope(
  val: SerializedData,
): GetMetadataTemplateScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetMetadataTemplateScope",
  });
}
export function serializeUpdateMetadataTemplateScope(
  val: UpdateMetadataTemplateScope,
): SerializedData {
  return val;
}
export function deserializeUpdateMetadataTemplateScope(
  val: SerializedData,
): UpdateMetadataTemplateScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateMetadataTemplateScope",
  });
}
export function serializeUpdateMetadataTemplateRequestBodyOpField(
  val: UpdateMetadataTemplateRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateMetadataTemplateRequestBodyOpField(
  val: SerializedData,
): UpdateMetadataTemplateRequestBodyOpField {
  if (val == 'editTemplate') {
    return val;
  }
  if (val == 'addField') {
    return val;
  }
  if (val == 'reorderFields') {
    return val;
  }
  if (val == 'addEnumOption') {
    return val;
  }
  if (val == 'reorderEnumOptions') {
    return val;
  }
  if (val == 'reorderMultiSelectOptions') {
    return val;
  }
  if (val == 'addMultiSelectOption') {
    return val;
  }
  if (val == 'editField') {
    return val;
  }
  if (val == 'removeField') {
    return val;
  }
  if (val == 'editEnumOption') {
    return val;
  }
  if (val == 'removeEnumOption') {
    return val;
  }
  if (val == 'editMultiSelectOption') {
    return val;
  }
  if (val == 'removeMultiSelectOption') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateMetadataTemplateRequestBodyOpField",
  });
}
export function serializeUpdateMetadataTemplateRequestBody(
  val: UpdateMetadataTemplateRequestBody,
): SerializedData {
  return {
    ['op']: serializeUpdateMetadataTemplateRequestBodyOpField(val.op),
    ['data']:
      val.data == void 0
        ? val.data
        : (Object.fromEntries(
            Object.entries(val.data).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          }),
    ['fieldKey']: val.fieldKey,
    ['fieldKeys']:
      val.fieldKeys == void 0
        ? val.fieldKeys
        : (val.fieldKeys.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['enumOptionKey']: val.enumOptionKey,
    ['enumOptionKeys']:
      val.enumOptionKeys == void 0
        ? val.enumOptionKeys
        : (val.enumOptionKeys.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['multiSelectOptionKey']: val.multiSelectOptionKey,
    ['multiSelectOptionKeys']:
      val.multiSelectOptionKeys == void 0
        ? val.multiSelectOptionKeys
        : (val.multiSelectOptionKeys.map(function (
            item: string,
          ): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeUpdateMetadataTemplateRequestBody(
  val: SerializedData,
): UpdateMetadataTemplateRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateMetadataTemplateRequestBody"',
    });
  }
  if (val.op == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "op" of type "UpdateMetadataTemplateRequestBody" to be defined',
    });
  }
  const op: UpdateMetadataTemplateRequestBodyOpField =
    deserializeUpdateMetadataTemplateRequestBodyOpField(val.op);
  if (!(val.data == void 0) && !sdIsMap(val.data)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "data" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const data:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.data == void 0
      ? void 0
      : sdIsMap(val.data)
        ? (Object.fromEntries(
            Object.entries(val.data).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (!(val.fieldKey == void 0) && !sdIsString(val.fieldKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "fieldKey" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const fieldKey: undefined | string =
    val.fieldKey == void 0 ? void 0 : val.fieldKey;
  if (!(val.fieldKeys == void 0) && !sdIsList(val.fieldKeys)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fieldKeys" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const fieldKeys: undefined | readonly string[] =
    val.fieldKeys == void 0
      ? void 0
      : sdIsList(val.fieldKeys)
        ? (val.fieldKeys.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "UpdateMetadataTemplateRequestBody"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.enumOptionKey == void 0) && !sdIsString(val.enumOptionKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "enumOptionKey" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const enumOptionKey: undefined | string =
    val.enumOptionKey == void 0 ? void 0 : val.enumOptionKey;
  if (!(val.enumOptionKeys == void 0) && !sdIsList(val.enumOptionKeys)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "enumOptionKeys" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const enumOptionKeys: undefined | readonly string[] =
    val.enumOptionKeys == void 0
      ? void 0
      : sdIsList(val.enumOptionKeys)
        ? (val.enumOptionKeys.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "UpdateMetadataTemplateRequestBody"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (
    !(val.multiSelectOptionKey == void 0) &&
    !sdIsString(val.multiSelectOptionKey)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "multiSelectOptionKey" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const multiSelectOptionKey: undefined | string =
    val.multiSelectOptionKey == void 0 ? void 0 : val.multiSelectOptionKey;
  if (
    !(val.multiSelectOptionKeys == void 0) &&
    !sdIsList(val.multiSelectOptionKeys)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "multiSelectOptionKeys" of type "UpdateMetadataTemplateRequestBody"',
    });
  }
  const multiSelectOptionKeys: undefined | readonly string[] =
    val.multiSelectOptionKeys == void 0
      ? void 0
      : sdIsList(val.multiSelectOptionKeys)
        ? (val.multiSelectOptionKeys.map(function (
            itm: SerializedData,
          ): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "UpdateMetadataTemplateRequestBody"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    op: op,
    data: data,
    fieldKey: fieldKey,
    fieldKeys: fieldKeys,
    enumOptionKey: enumOptionKey,
    enumOptionKeys: enumOptionKeys,
    multiSelectOptionKey: multiSelectOptionKey,
    multiSelectOptionKeys: multiSelectOptionKeys,
  } satisfies UpdateMetadataTemplateRequestBody;
}
export function serializeDeleteMetadataTemplateScope(
  val: DeleteMetadataTemplateScope,
): SerializedData {
  return val;
}
export function deserializeDeleteMetadataTemplateScope(
  val: SerializedData,
): DeleteMetadataTemplateScope {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DeleteMetadataTemplateScope",
  });
}
export function serializeCreateMetadataTemplateRequestBodyFieldsTypeField(
  val: CreateMetadataTemplateRequestBodyFieldsTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateMetadataTemplateRequestBodyFieldsTypeField(
  val: SerializedData,
): CreateMetadataTemplateRequestBodyFieldsTypeField {
  if (val == 'string') {
    return val;
  }
  if (val == 'float') {
    return val;
  }
  if (val == 'date') {
    return val;
  }
  if (val == 'enum') {
    return val;
  }
  if (val == 'multiSelect') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateMetadataTemplateRequestBodyFieldsTypeField",
  });
}
export function serializeCreateMetadataTemplateRequestBodyFieldsOptionsField(
  val: CreateMetadataTemplateRequestBodyFieldsOptionsField,
): SerializedData {
  return { ['key']: val.key };
}
export function deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField(
  val: SerializedData,
): CreateMetadataTemplateRequestBodyFieldsOptionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateMetadataTemplateRequestBodyFieldsOptionsField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "CreateMetadataTemplateRequestBodyFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "CreateMetadataTemplateRequestBodyFieldsOptionsField"',
    });
  }
  const key: string = val.key;
  return {
    key: key,
  } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField;
}
export function serializeCreateMetadataTemplateRequestBodyFieldsField(
  val: CreateMetadataTemplateRequestBodyFieldsField,
): SerializedData {
  return {
    ['type']: serializeCreateMetadataTemplateRequestBodyFieldsTypeField(
      val.type,
    ),
    ['key']: val.key,
    ['displayName']: val.displayName,
    ['description']: val.description,
    ['hidden']: val.hidden,
    ['options']:
      val.options == void 0
        ? val.options
        : (val.options.map(function (
            item: CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ): SerializedData {
            return serializeCreateMetadataTemplateRequestBodyFieldsOptionsField(
              item,
            );
          }) as readonly any[]),
  };
}
export function deserializeCreateMetadataTemplateRequestBodyFieldsField(
  val: SerializedData,
): CreateMetadataTemplateRequestBodyFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateMetadataTemplateRequestBodyFieldsField" to be defined',
    });
  }
  const type: CreateMetadataTemplateRequestBodyFieldsTypeField =
    deserializeCreateMetadataTemplateRequestBodyFieldsTypeField(val.type);
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "CreateMetadataTemplateRequestBodyFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  const key: string = val.key;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateMetadataTemplateRequestBodyFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  const displayName: string = val.displayName;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (!(val.options == void 0) && !sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "CreateMetadataTemplateRequestBodyFieldsField"',
    });
  }
  const options:
    | undefined
    | readonly CreateMetadataTemplateRequestBodyFieldsOptionsField[] =
    val.options == void 0
      ? void 0
      : sdIsList(val.options)
        ? (val.options.map(function (
            itm: SerializedData,
          ): CreateMetadataTemplateRequestBodyFieldsOptionsField {
            return deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField(
              itm,
            );
          }) as readonly any[])
        : [];
  return {
    type: type,
    key: key,
    displayName: displayName,
    description: description,
    hidden: hidden,
    options: options,
  } satisfies CreateMetadataTemplateRequestBodyFieldsField;
}
export function serializeCreateMetadataTemplateRequestBody(
  val: CreateMetadataTemplateRequestBody,
): SerializedData {
  return {
    ['scope']: val.scope,
    ['templateKey']: val.templateKey,
    ['displayName']: val.displayName,
    ['hidden']: val.hidden,
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (
            item: CreateMetadataTemplateRequestBodyFieldsField,
          ): SerializedData {
            return serializeCreateMetadataTemplateRequestBodyFieldsField(item);
          }) as readonly any[]),
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
  };
}
export function deserializeCreateMetadataTemplateRequestBody(
  val: SerializedData,
): CreateMetadataTemplateRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateMetadataTemplateRequestBody"',
    });
  }
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "CreateMetadataTemplateRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.scope)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scope" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const scope: string = val.scope;
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "templateKey" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateMetadataTemplateRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fields" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const fields:
    | undefined
    | readonly CreateMetadataTemplateRequestBodyFieldsField[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (
            itm: SerializedData,
          ): CreateMetadataTemplateRequestBodyFieldsField {
            return deserializeCreateMetadataTemplateRequestBodyFieldsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "CreateMetadataTemplateRequestBody"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  return {
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    fields: fields,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
  } satisfies CreateMetadataTemplateRequestBody;
}
