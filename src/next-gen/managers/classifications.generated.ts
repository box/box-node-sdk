import { serializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { prepareParams } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class AddClassificationOptionals {
  readonly headers: AddClassificationHeaders = new AddClassificationHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<AddClassificationOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<AddClassificationOptionals, 'headers' | 'cancellationToken'>
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
export interface AddClassificationOptionalsInput {
  readonly headers?: AddClassificationHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateClassificationOptionals {
  readonly headers: UpdateClassificationHeaders =
    new UpdateClassificationHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateClassificationOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateClassificationOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateClassificationOptionalsInput {
  readonly headers?: UpdateClassificationHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateClassificationTemplateOptionals {
  readonly headers: CreateClassificationTemplateHeaders =
    new CreateClassificationTemplateHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateClassificationTemplateOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateClassificationTemplateOptionals,
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
export interface CreateClassificationTemplateOptionalsInput {
  readonly headers?: CreateClassificationTemplateHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetClassificationTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetClassificationTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<GetClassificationTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetClassificationTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type AddClassificationRequestBodyOpField = 'addEnumOption' | string;
export type AddClassificationRequestBodyFieldKeyField =
  | 'Box__Security__Classification__Key'
  | string;
export interface AddClassificationRequestBodyDataStaticConfigClassificationField {
  /**
   * A longer description of the classification. */
  readonly classificationDefinition?: string;
  /**
   * An internal Box identifier used to assign a color to
   * a classification label.
   *
   * Mapping between a `colorID` and a color may change
   * without notice. Currently, the color mappings are as
   * follows.
   *
   * * `0`: Yellow
   * * `1`: Orange
   * * `2`: Watermelon red
   * * `3`: Purple rain
   * * `4`: Light blue
   * * `5`: Dark blue
   * * `6`: Light green
   * * `7`: Gray */
  readonly colorId?: number;
  readonly rawData?: SerializedData;
}
export interface AddClassificationRequestBodyDataStaticConfigField {
  /**
   * Additional details for the classification. */
  readonly classification?: AddClassificationRequestBodyDataStaticConfigClassificationField;
  readonly rawData?: SerializedData;
}
export interface AddClassificationRequestBodyDataField {
  /**
   * The label of the classification as shown in the web and
   * mobile interfaces. This is the only field required to
   * add a classification. */
  readonly key: string;
  /**
   * A static configuration for the classification. */
  readonly staticConfig?: AddClassificationRequestBodyDataStaticConfigField;
  readonly rawData?: SerializedData;
}
export class AddClassificationRequestBody {
  /**
   * The type of change to perform on the classification
   * object. */
  readonly op: AddClassificationRequestBodyOpField =
    'addEnumOption' as AddClassificationRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly fieldKey: AddClassificationRequestBodyFieldKeyField =
    'Box__Security__Classification__Key' as AddClassificationRequestBodyFieldKeyField;
  /**
   * The details of the classification to add. */
  readonly data!: AddClassificationRequestBodyDataField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AddClassificationRequestBody, 'op' | 'fieldKey'> &
      Partial<Pick<AddClassificationRequestBody, 'op' | 'fieldKey'>>,
  ) {
    if (fields.op !== undefined) {
      this.op = fields.op;
    }
    if (fields.fieldKey !== undefined) {
      this.fieldKey = fields.fieldKey;
    }
    if (fields.data !== undefined) {
      this.data = fields.data;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AddClassificationRequestBodyInput {
  /**
   * The type of change to perform on the classification
   * object. */
  readonly op?: AddClassificationRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly fieldKey?: AddClassificationRequestBodyFieldKeyField;
  /**
   * The details of the classification to add. */
  readonly data: AddClassificationRequestBodyDataField;
  readonly rawData?: SerializedData;
}
export class AddClassificationHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddClassificationHeaders, 'extraHeaders'> &
      Partial<Pick<AddClassificationHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddClassificationHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateClassificationRequestBodyOpField = 'editEnumOption' | string;
export type UpdateClassificationRequestBodyFieldKeyField =
  | 'Box__Security__Classification__Key'
  | string;
export interface UpdateClassificationRequestBodyDataStaticConfigClassificationField {
  /**
   * A longer description of the classification. */
  readonly classificationDefinition?: string;
  /**
   * An internal Box identifier used to assign a color to
   * a classification label.
   *
   * Mapping between a `colorID` and a color may change
   * without notice. Currently, the color mappings are as
   * follows.
   *
   * * `0`: Yellow
   * * `1`: Orange
   * * `2`: Watermelon red
   * * `3`: Purple rain
   * * `4`: Light blue
   * * `5`: Dark blue
   * * `6`: Light green
   * * `7`: Gray */
  readonly colorId?: number;
  readonly rawData?: SerializedData;
}
export interface UpdateClassificationRequestBodyDataStaticConfigField {
  /**
   * Additional details for the classification. */
  readonly classification?: UpdateClassificationRequestBodyDataStaticConfigClassificationField;
  readonly rawData?: SerializedData;
}
export interface UpdateClassificationRequestBodyDataField {
  /**
   * A new label for the classification, as it will be
   * shown in the web and mobile interfaces. */
  readonly key: string;
  /**
   * A static configuration for the classification. */
  readonly staticConfig?: UpdateClassificationRequestBodyDataStaticConfigField;
  readonly rawData?: SerializedData;
}
export class UpdateClassificationRequestBody {
  /**
   * The type of change to perform on the classification
   * object. */
  readonly op: UpdateClassificationRequestBodyOpField =
    'editEnumOption' as UpdateClassificationRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly fieldKey: UpdateClassificationRequestBodyFieldKeyField =
    'Box__Security__Classification__Key' as UpdateClassificationRequestBodyFieldKeyField;
  /**
   * The original label of the classification to change. */
  readonly enumOptionKey!: string;
  /**
   * The details of the updated classification. */
  readonly data!: UpdateClassificationRequestBodyDataField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UpdateClassificationRequestBody, 'op' | 'fieldKey'> &
      Partial<Pick<UpdateClassificationRequestBody, 'op' | 'fieldKey'>>,
  ) {
    if (fields.op !== undefined) {
      this.op = fields.op;
    }
    if (fields.fieldKey !== undefined) {
      this.fieldKey = fields.fieldKey;
    }
    if (fields.enumOptionKey !== undefined) {
      this.enumOptionKey = fields.enumOptionKey;
    }
    if (fields.data !== undefined) {
      this.data = fields.data;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UpdateClassificationRequestBodyInput {
  /**
   * The type of change to perform on the classification
   * object. */
  readonly op?: UpdateClassificationRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly fieldKey?: UpdateClassificationRequestBodyFieldKeyField;
  /**
   * The original label of the classification to change. */
  readonly enumOptionKey: string;
  /**
   * The details of the updated classification. */
  readonly data: UpdateClassificationRequestBodyDataField;
  readonly rawData?: SerializedData;
}
export class UpdateClassificationHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateClassificationHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateClassificationHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateClassificationHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateClassificationTemplateRequestBodyScopeField =
  | 'enterprise'
  | string;
export type CreateClassificationTemplateRequestBodyTemplateKeyField =
  | 'securityClassification-6VMVochwUWo'
  | string;
export type CreateClassificationTemplateRequestBodyDisplayNameField =
  | 'Classification'
  | string;
export type CreateClassificationTemplateRequestBodyFieldsTypeField = 'enum';
export type CreateClassificationTemplateRequestBodyFieldsKeyField =
  | 'Box__Security__Classification__Key'
  | string;
export type CreateClassificationTemplateRequestBodyFieldsDisplayNameField =
  | 'Classification'
  | string;
export interface CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField {
  /**
   * A longer description of the classification. */
  readonly classificationDefinition?: string;
  /**
   * An identifier used to assign a color to
   * a classification label.
   *
   * Mapping between a `colorID` and a color may
   * change without notice. Currently, the color
   * mappings are as follows.
   *
   * * `0`: Yellow
   * * `1`: Orange
   * * `2`: Watermelon red
   * * `3`: Purple rain
   * * `4`: Light blue
   * * `5`: Dark blue
   * * `6`: Light green
   * * `7`: Gray */
  readonly colorId?: number;
  readonly rawData?: SerializedData;
}
export interface CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField {
  /**
   * Additional information about the classification. */
  readonly classification?: CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField;
  readonly rawData?: SerializedData;
}
export interface CreateClassificationTemplateRequestBodyFieldsOptionsField {
  /**
   * The display name and key this classification. This
   * will be show in the Box UI. */
  readonly key: string;
  /**
   * Additional information about the classification. */
  readonly staticConfig?: CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField;
  readonly rawData?: SerializedData;
}
export class CreateClassificationTemplateRequestBodyFieldsField {
  /**
   * The type of the field
   * that is always enum. */
  readonly type: CreateClassificationTemplateRequestBodyFieldsTypeField =
    'enum' as CreateClassificationTemplateRequestBodyFieldsTypeField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly key: CreateClassificationTemplateRequestBodyFieldsKeyField =
    'Box__Security__Classification__Key' as CreateClassificationTemplateRequestBodyFieldsKeyField;
  /**
   * A display name for the classification. */
  readonly displayName: CreateClassificationTemplateRequestBodyFieldsDisplayNameField =
    'Classification' as CreateClassificationTemplateRequestBodyFieldsDisplayNameField;
  /**
   * Determines if the classification
   * template is
   * hidden or available on
   * web and mobile
   * devices. */
  readonly hidden?: boolean;
  /**
   * The actual list of classifications that are present on
   * this template. */
  readonly options!: readonly CreateClassificationTemplateRequestBodyFieldsOptionsField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      CreateClassificationTemplateRequestBodyFieldsField,
      'type' | 'key' | 'displayName'
    > &
      Partial<
        Pick<
          CreateClassificationTemplateRequestBodyFieldsField,
          'type' | 'key' | 'displayName'
        >
      >,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.key !== undefined) {
      this.key = fields.key;
    }
    if (fields.displayName !== undefined) {
      this.displayName = fields.displayName;
    }
    if (fields.hidden !== undefined) {
      this.hidden = fields.hidden;
    }
    if (fields.options !== undefined) {
      this.options = fields.options;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateClassificationTemplateRequestBodyFieldsFieldInput {
  /**
   * The type of the field
   * that is always enum. */
  readonly type?: CreateClassificationTemplateRequestBodyFieldsTypeField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly key?: CreateClassificationTemplateRequestBodyFieldsKeyField;
  /**
   * A display name for the classification. */
  readonly displayName?: CreateClassificationTemplateRequestBodyFieldsDisplayNameField;
  /**
   * Determines if the classification
   * template is
   * hidden or available on
   * web and mobile
   * devices. */
  readonly hidden?: boolean;
  /**
   * The actual list of classifications that are present on
   * this template. */
  readonly options: readonly CreateClassificationTemplateRequestBodyFieldsOptionsField[];
  readonly rawData?: SerializedData;
}
export class CreateClassificationTemplateRequestBody {
  /**
   * The scope in which to create the classifications. This should
   * be `enterprise` or `enterprise_{id}` where `id` is the unique
   * ID of the enterprise. */
  readonly scope: CreateClassificationTemplateRequestBodyScopeField =
    'enterprise' as CreateClassificationTemplateRequestBodyScopeField;
  /**
   * Defines the list of metadata templates. */
  readonly templateKey: CreateClassificationTemplateRequestBodyTemplateKeyField =
    'securityClassification-6VMVochwUWo' as CreateClassificationTemplateRequestBodyTemplateKeyField;
  /**
   * The name of the
   * template as shown in web and mobile interfaces. */
  readonly displayName: CreateClassificationTemplateRequestBodyDisplayNameField =
    'Classification' as CreateClassificationTemplateRequestBodyDisplayNameField;
  /**
   * Determines if the classification template is
   * hidden or available on web and mobile
   * devices. */
  readonly hidden?: boolean;
  /**
   * Determines if classifications are
   * copied along when the file or folder is
   * copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  /**
   * The classification template requires exactly
   * one field, which holds
   * all the valid classification values. */
  readonly fields!: readonly CreateClassificationTemplateRequestBodyFieldsField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      CreateClassificationTemplateRequestBody,
      'scope' | 'templateKey' | 'displayName'
    > &
      Partial<
        Pick<
          CreateClassificationTemplateRequestBody,
          'scope' | 'templateKey' | 'displayName'
        >
      >,
  ) {
    if (fields.scope !== undefined) {
      this.scope = fields.scope;
    }
    if (fields.templateKey !== undefined) {
      this.templateKey = fields.templateKey;
    }
    if (fields.displayName !== undefined) {
      this.displayName = fields.displayName;
    }
    if (fields.hidden !== undefined) {
      this.hidden = fields.hidden;
    }
    if (fields.copyInstanceOnItemCopy !== undefined) {
      this.copyInstanceOnItemCopy = fields.copyInstanceOnItemCopy;
    }
    if (fields.fields !== undefined) {
      this.fields = fields.fields;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateClassificationTemplateRequestBodyInput {
  /**
   * The scope in which to create the classifications. This should
   * be `enterprise` or `enterprise_{id}` where `id` is the unique
   * ID of the enterprise. */
  readonly scope?: CreateClassificationTemplateRequestBodyScopeField;
  /**
   * Defines the list of metadata templates. */
  readonly templateKey?: CreateClassificationTemplateRequestBodyTemplateKeyField;
  /**
   * The name of the
   * template as shown in web and mobile interfaces. */
  readonly displayName?: CreateClassificationTemplateRequestBodyDisplayNameField;
  /**
   * Determines if the classification template is
   * hidden or available on web and mobile
   * devices. */
  readonly hidden?: boolean;
  /**
   * Determines if classifications are
   * copied along when the file or folder is
   * copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  /**
   * The classification template requires exactly
   * one field, which holds
   * all the valid classification values. */
  readonly fields: readonly CreateClassificationTemplateRequestBodyFieldsField[];
  readonly rawData?: SerializedData;
}
export class CreateClassificationTemplateHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateClassificationTemplateHeaders, 'extraHeaders'> &
      Partial<Pick<CreateClassificationTemplateHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateClassificationTemplateHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ClassificationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ClassificationsManager,
      | 'networkSession'
      | 'getClassificationTemplate'
      | 'addClassification'
      | 'updateClassification'
      | 'createClassificationTemplate'
    > &
      Partial<Pick<ClassificationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves the classification metadata template and lists all the
   * classifications available to this enterprise.
   *
   * This API can also be called by including the enterprise ID in the
   * URL explicitly, for example
   * `/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.
   * @param {GetClassificationTemplateHeadersInput} headersInput Headers of getClassificationTemplate method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<ClassificationTemplate>}
   */
  async getClassificationTemplate(
    headersInput: GetClassificationTemplateHeadersInput = new GetClassificationTemplateHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<ClassificationTemplate> {
    const headers: GetClassificationTemplateHeaders =
      new GetClassificationTemplateHeaders({
        extraHeaders: headersInput.extraHeaders,
      });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema',
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
      ...deserializeClassificationTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Adds one or more new classifications to the list of classifications
   * available to the enterprise.
   *
   * This API can also be called by including the enterprise ID in the
   * URL explicitly, for example
   * `/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.
   * @param {readonly AddClassificationRequestBody[]} requestBody Request body of addClassification method
   * @param {AddClassificationOptionalsInput} optionalsInput
   * @returns {Promise<ClassificationTemplate>}
   */
  async addClassification(
    requestBody: readonly AddClassificationRequestBody[],
    optionalsInput: AddClassificationOptionalsInput = {},
  ): Promise<ClassificationTemplate> {
    const optionals: AddClassificationOptionals =
      new AddClassificationOptionals({
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
            '/2.0/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema#add',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeAddClassificationRequestBody,
          ) as readonly any[],
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeClassificationTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Updates the labels and descriptions of one or more classifications
   * available to the enterprise.
   *
   * This API can also be called by including the enterprise ID in the
   * URL explicitly, for example
   * `/metadata_templates/enterprise_12345/securityClassification-6VMVochwUWo/schema`.
   * @param {readonly UpdateClassificationRequestBody[]} requestBody Request body of updateClassification method
   * @param {UpdateClassificationOptionalsInput} optionalsInput
   * @returns {Promise<ClassificationTemplate>}
   */
  async updateClassification(
    requestBody: readonly UpdateClassificationRequestBody[],
    optionalsInput: UpdateClassificationOptionalsInput = {},
  ): Promise<ClassificationTemplate> {
    const optionals: UpdateClassificationOptionals =
      new UpdateClassificationOptionals({
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
            '/2.0/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema#update',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateClassificationRequestBody,
          ) as readonly any[],
          contentType: 'application/json-patch+json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeClassificationTemplate(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * When an enterprise does not yet have any classifications, this API call
   * initializes the classification template with an initial set of
   * classifications.
   *
   * If an enterprise already has a classification, the template will already
   * exist and instead an API call should be made to add additional
   * classifications.
   * @param {CreateClassificationTemplateRequestBodyInput} requestBodyInput Request body of createClassificationTemplate method
   * @param {CreateClassificationTemplateOptionalsInput} optionalsInput
   * @returns {Promise<ClassificationTemplate>}
   */
  async createClassificationTemplate(
    requestBodyInput: CreateClassificationTemplateRequestBodyInput,
    optionalsInput: CreateClassificationTemplateOptionalsInput = {},
  ): Promise<ClassificationTemplate> {
    const requestBody: CreateClassificationTemplateRequestBody =
      new CreateClassificationTemplateRequestBody({
        scope: requestBodyInput.scope,
        templateKey: requestBodyInput.templateKey,
        displayName: requestBodyInput.displayName,
        hidden: requestBodyInput.hidden,
        copyInstanceOnItemCopy: requestBodyInput.copyInstanceOnItemCopy,
        fields: requestBodyInput.fields,
      });
    const optionals: CreateClassificationTemplateOptionals =
      new CreateClassificationTemplateOptionals({
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
            '/2.0/metadata_templates/schema#classifications',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateClassificationTemplateRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeClassificationTemplate(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ClassificationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddClassificationRequestBodyOpField(
  val: AddClassificationRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeAddClassificationRequestBodyOpField(
  val: SerializedData,
): AddClassificationRequestBodyOpField {
  if (val == 'addEnumOption') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AddClassificationRequestBodyOpField",
  });
}
export function serializeAddClassificationRequestBodyFieldKeyField(
  val: AddClassificationRequestBodyFieldKeyField,
): SerializedData {
  return val;
}
export function deserializeAddClassificationRequestBodyFieldKeyField(
  val: SerializedData,
): AddClassificationRequestBodyFieldKeyField {
  if (val == 'Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AddClassificationRequestBodyFieldKeyField",
  });
}
export function serializeAddClassificationRequestBodyDataStaticConfigClassificationField(
  val: AddClassificationRequestBodyDataStaticConfigClassificationField,
): SerializedData {
  return {
    ['classificationDefinition']: val.classificationDefinition,
    ['colorID']: val.colorId,
  };
}
export function deserializeAddClassificationRequestBodyDataStaticConfigClassificationField(
  val: SerializedData,
): AddClassificationRequestBodyDataStaticConfigClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  if (
    !(val.classificationDefinition == void 0) &&
    !sdIsString(val.classificationDefinition)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "classificationDefinition" of type "AddClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  const classificationDefinition: undefined | string =
    val.classificationDefinition == void 0
      ? void 0
      : val.classificationDefinition;
  if (!(val.colorID == void 0) && !sdIsNumber(val.colorID)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "colorID" of type "AddClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  const colorId: undefined | number =
    val.colorID == void 0 ? void 0 : val.colorID;
  return {
    classificationDefinition: classificationDefinition,
    colorId: colorId,
  } satisfies AddClassificationRequestBodyDataStaticConfigClassificationField;
}
export function serializeAddClassificationRequestBodyDataStaticConfigField(
  val: AddClassificationRequestBodyDataStaticConfigField,
): SerializedData {
  return {
    ['classification']:
      val.classification == void 0
        ? val.classification
        : serializeAddClassificationRequestBodyDataStaticConfigClassificationField(
            val.classification,
          ),
  };
}
export function deserializeAddClassificationRequestBodyDataStaticConfigField(
  val: SerializedData,
): AddClassificationRequestBodyDataStaticConfigField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddClassificationRequestBodyDataStaticConfigField"',
    });
  }
  const classification:
    | undefined
    | AddClassificationRequestBodyDataStaticConfigClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeAddClassificationRequestBodyDataStaticConfigClassificationField(
          val.classification,
        );
  return {
    classification: classification,
  } satisfies AddClassificationRequestBodyDataStaticConfigField;
}
export function serializeAddClassificationRequestBodyDataField(
  val: AddClassificationRequestBodyDataField,
): SerializedData {
  return {
    ['key']: val.key,
    ['staticConfig']:
      val.staticConfig == void 0
        ? val.staticConfig
        : serializeAddClassificationRequestBodyDataStaticConfigField(
            val.staticConfig,
          ),
  };
}
export function deserializeAddClassificationRequestBodyDataField(
  val: SerializedData,
): AddClassificationRequestBodyDataField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddClassificationRequestBodyDataField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "AddClassificationRequestBodyDataField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "AddClassificationRequestBodyDataField"',
    });
  }
  const key: string = val.key;
  const staticConfig:
    | undefined
    | AddClassificationRequestBodyDataStaticConfigField =
    val.staticConfig == void 0
      ? void 0
      : deserializeAddClassificationRequestBodyDataStaticConfigField(
          val.staticConfig,
        );
  return {
    key: key,
    staticConfig: staticConfig,
  } satisfies AddClassificationRequestBodyDataField;
}
export function serializeAddClassificationRequestBody(
  val: AddClassificationRequestBody,
): SerializedData {
  return {
    ['op']: serializeAddClassificationRequestBodyOpField(val.op),
    ['fieldKey']: serializeAddClassificationRequestBodyFieldKeyField(
      val.fieldKey,
    ),
    ['data']: serializeAddClassificationRequestBodyDataField(val.data),
  };
}
export function deserializeAddClassificationRequestBody(
  val: SerializedData,
): AddClassificationRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddClassificationRequestBody"',
    });
  }
  if (val.op == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "op" of type "AddClassificationRequestBody" to be defined',
    });
  }
  const op: AddClassificationRequestBodyOpField =
    deserializeAddClassificationRequestBodyOpField(val.op);
  if (val.fieldKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fieldKey" of type "AddClassificationRequestBody" to be defined',
    });
  }
  const fieldKey: AddClassificationRequestBodyFieldKeyField =
    deserializeAddClassificationRequestBodyFieldKeyField(val.fieldKey);
  if (val.data == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "data" of type "AddClassificationRequestBody" to be defined',
    });
  }
  const data: AddClassificationRequestBodyDataField =
    deserializeAddClassificationRequestBodyDataField(val.data);
  return {
    op: op,
    fieldKey: fieldKey,
    data: data,
  } satisfies AddClassificationRequestBody;
}
export function serializeAddClassificationRequestBodyInput(
  val: AddClassificationRequestBodyInput,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeAddClassificationRequestBodyOpField(val.op),
    ['fieldKey']:
      val.fieldKey == void 0
        ? val.fieldKey
        : serializeAddClassificationRequestBodyFieldKeyField(val.fieldKey),
    ['data']: serializeAddClassificationRequestBodyDataField(val.data),
  };
}
export function deserializeAddClassificationRequestBodyInput(
  val: SerializedData,
): AddClassificationRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddClassificationRequestBodyInput"',
    });
  }
  const op: undefined | AddClassificationRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeAddClassificationRequestBodyOpField(val.op);
  const fieldKey: undefined | AddClassificationRequestBodyFieldKeyField =
    val.fieldKey == void 0
      ? void 0
      : deserializeAddClassificationRequestBodyFieldKeyField(val.fieldKey);
  if (val.data == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "data" of type "AddClassificationRequestBodyInput" to be defined',
    });
  }
  const data: AddClassificationRequestBodyDataField =
    deserializeAddClassificationRequestBodyDataField(val.data);
  return {
    op: op,
    fieldKey: fieldKey,
    data: data,
  } satisfies AddClassificationRequestBodyInput;
}
export function serializeUpdateClassificationRequestBodyOpField(
  val: UpdateClassificationRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationRequestBodyOpField(
  val: SerializedData,
): UpdateClassificationRequestBodyOpField {
  if (val == 'editEnumOption') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateClassificationRequestBodyOpField",
  });
}
export function serializeUpdateClassificationRequestBodyFieldKeyField(
  val: UpdateClassificationRequestBodyFieldKeyField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationRequestBodyFieldKeyField(
  val: SerializedData,
): UpdateClassificationRequestBodyFieldKeyField {
  if (val == 'Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateClassificationRequestBodyFieldKeyField",
  });
}
export function serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(
  val: UpdateClassificationRequestBodyDataStaticConfigClassificationField,
): SerializedData {
  return {
    ['classificationDefinition']: val.classificationDefinition,
    ['colorID']: val.colorId,
  };
}
export function deserializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(
  val: SerializedData,
): UpdateClassificationRequestBodyDataStaticConfigClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  if (
    !(val.classificationDefinition == void 0) &&
    !sdIsString(val.classificationDefinition)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "classificationDefinition" of type "UpdateClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  const classificationDefinition: undefined | string =
    val.classificationDefinition == void 0
      ? void 0
      : val.classificationDefinition;
  if (!(val.colorID == void 0) && !sdIsNumber(val.colorID)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "colorID" of type "UpdateClassificationRequestBodyDataStaticConfigClassificationField"',
    });
  }
  const colorId: undefined | number =
    val.colorID == void 0 ? void 0 : val.colorID;
  return {
    classificationDefinition: classificationDefinition,
    colorId: colorId,
  } satisfies UpdateClassificationRequestBodyDataStaticConfigClassificationField;
}
export function serializeUpdateClassificationRequestBodyDataStaticConfigField(
  val: UpdateClassificationRequestBodyDataStaticConfigField,
): SerializedData {
  return {
    ['classification']:
      val.classification == void 0
        ? val.classification
        : serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(
            val.classification,
          ),
  };
}
export function deserializeUpdateClassificationRequestBodyDataStaticConfigField(
  val: SerializedData,
): UpdateClassificationRequestBodyDataStaticConfigField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateClassificationRequestBodyDataStaticConfigField"',
    });
  }
  const classification:
    | undefined
    | UpdateClassificationRequestBodyDataStaticConfigClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(
          val.classification,
        );
  return {
    classification: classification,
  } satisfies UpdateClassificationRequestBodyDataStaticConfigField;
}
export function serializeUpdateClassificationRequestBodyDataField(
  val: UpdateClassificationRequestBodyDataField,
): SerializedData {
  return {
    ['key']: val.key,
    ['staticConfig']:
      val.staticConfig == void 0
        ? val.staticConfig
        : serializeUpdateClassificationRequestBodyDataStaticConfigField(
            val.staticConfig,
          ),
  };
}
export function deserializeUpdateClassificationRequestBodyDataField(
  val: SerializedData,
): UpdateClassificationRequestBodyDataField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateClassificationRequestBodyDataField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "UpdateClassificationRequestBodyDataField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "UpdateClassificationRequestBodyDataField"',
    });
  }
  const key: string = val.key;
  const staticConfig:
    | undefined
    | UpdateClassificationRequestBodyDataStaticConfigField =
    val.staticConfig == void 0
      ? void 0
      : deserializeUpdateClassificationRequestBodyDataStaticConfigField(
          val.staticConfig,
        );
  return {
    key: key,
    staticConfig: staticConfig,
  } satisfies UpdateClassificationRequestBodyDataField;
}
export function serializeUpdateClassificationRequestBody(
  val: UpdateClassificationRequestBody,
): SerializedData {
  return {
    ['op']: serializeUpdateClassificationRequestBodyOpField(val.op),
    ['fieldKey']: serializeUpdateClassificationRequestBodyFieldKeyField(
      val.fieldKey,
    ),
    ['enumOptionKey']: val.enumOptionKey,
    ['data']: serializeUpdateClassificationRequestBodyDataField(val.data),
  };
}
export function deserializeUpdateClassificationRequestBody(
  val: SerializedData,
): UpdateClassificationRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateClassificationRequestBody"',
    });
  }
  if (val.op == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "op" of type "UpdateClassificationRequestBody" to be defined',
    });
  }
  const op: UpdateClassificationRequestBodyOpField =
    deserializeUpdateClassificationRequestBodyOpField(val.op);
  if (val.fieldKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fieldKey" of type "UpdateClassificationRequestBody" to be defined',
    });
  }
  const fieldKey: UpdateClassificationRequestBodyFieldKeyField =
    deserializeUpdateClassificationRequestBodyFieldKeyField(val.fieldKey);
  if (val.enumOptionKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enumOptionKey" of type "UpdateClassificationRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.enumOptionKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "enumOptionKey" of type "UpdateClassificationRequestBody"',
    });
  }
  const enumOptionKey: string = val.enumOptionKey;
  if (val.data == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "data" of type "UpdateClassificationRequestBody" to be defined',
    });
  }
  const data: UpdateClassificationRequestBodyDataField =
    deserializeUpdateClassificationRequestBodyDataField(val.data);
  return {
    op: op,
    fieldKey: fieldKey,
    enumOptionKey: enumOptionKey,
    data: data,
  } satisfies UpdateClassificationRequestBody;
}
export function serializeUpdateClassificationRequestBodyInput(
  val: UpdateClassificationRequestBodyInput,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeUpdateClassificationRequestBodyOpField(val.op),
    ['fieldKey']:
      val.fieldKey == void 0
        ? val.fieldKey
        : serializeUpdateClassificationRequestBodyFieldKeyField(val.fieldKey),
    ['enumOptionKey']: val.enumOptionKey,
    ['data']: serializeUpdateClassificationRequestBodyDataField(val.data),
  };
}
export function deserializeUpdateClassificationRequestBodyInput(
  val: SerializedData,
): UpdateClassificationRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateClassificationRequestBodyInput"',
    });
  }
  const op: undefined | UpdateClassificationRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeUpdateClassificationRequestBodyOpField(val.op);
  const fieldKey: undefined | UpdateClassificationRequestBodyFieldKeyField =
    val.fieldKey == void 0
      ? void 0
      : deserializeUpdateClassificationRequestBodyFieldKeyField(val.fieldKey);
  if (val.enumOptionKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enumOptionKey" of type "UpdateClassificationRequestBodyInput" to be defined',
    });
  }
  if (!sdIsString(val.enumOptionKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "enumOptionKey" of type "UpdateClassificationRequestBodyInput"',
    });
  }
  const enumOptionKey: string = val.enumOptionKey;
  if (val.data == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "data" of type "UpdateClassificationRequestBodyInput" to be defined',
    });
  }
  const data: UpdateClassificationRequestBodyDataField =
    deserializeUpdateClassificationRequestBodyDataField(val.data);
  return {
    op: op,
    fieldKey: fieldKey,
    enumOptionKey: enumOptionKey,
    data: data,
  } satisfies UpdateClassificationRequestBodyInput;
}
export function serializeCreateClassificationTemplateRequestBodyScopeField(
  val: CreateClassificationTemplateRequestBodyScopeField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyScopeField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyScopeField {
  if (val == 'enterprise') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyScopeField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyTemplateKeyField(
  val: CreateClassificationTemplateRequestBodyTemplateKeyField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyTemplateKeyField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyTemplateKeyField {
  if (val == 'securityClassification-6VMVochwUWo') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyTemplateKeyField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyDisplayNameField(
  val: CreateClassificationTemplateRequestBodyDisplayNameField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyDisplayNameField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyDisplayNameField {
  if (val == 'Classification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyDisplayNameField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyFieldsTypeField(
  val: CreateClassificationTemplateRequestBodyFieldsTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsTypeField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsTypeField {
  if (val == 'enum') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyFieldsTypeField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyFieldsKeyField(
  val: CreateClassificationTemplateRequestBodyFieldsKeyField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsKeyField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsKeyField {
  if (val == 'Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyFieldsKeyField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
  val: CreateClassificationTemplateRequestBodyFieldsDisplayNameField,
): SerializedData {
  return val;
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsDisplayNameField {
  if (val == 'Classification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateClassificationTemplateRequestBodyFieldsDisplayNameField",
  });
}
export function serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(
  val: CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField,
): SerializedData {
  return {
    ['classificationDefinition']: val.classificationDefinition,
    ['colorID']: val.colorId,
  };
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField"',
    });
  }
  if (
    !(val.classificationDefinition == void 0) &&
    !sdIsString(val.classificationDefinition)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "classificationDefinition" of type "CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField"',
    });
  }
  const classificationDefinition: undefined | string =
    val.classificationDefinition == void 0
      ? void 0
      : val.classificationDefinition;
  if (!(val.colorID == void 0) && !sdIsNumber(val.colorID)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "colorID" of type "CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField"',
    });
  }
  const colorId: undefined | number =
    val.colorID == void 0 ? void 0 : val.colorID;
  return {
    classificationDefinition: classificationDefinition,
    colorId: colorId,
  } satisfies CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField;
}
export function serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(
  val: CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField,
): SerializedData {
  return {
    ['classification']:
      val.classification == void 0
        ? val.classification
        : serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(
            val.classification,
          ),
  };
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField"',
    });
  }
  const classification:
    | undefined
    | CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(
          val.classification,
        );
  return {
    classification: classification,
  } satisfies CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField;
}
export function serializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
  val: CreateClassificationTemplateRequestBodyFieldsOptionsField,
): SerializedData {
  return {
    ['key']: val.key,
    ['staticConfig']:
      val.staticConfig == void 0
        ? val.staticConfig
        : serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(
            val.staticConfig,
          ),
  };
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsOptionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyFieldsOptionsField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "CreateClassificationTemplateRequestBodyFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "CreateClassificationTemplateRequestBodyFieldsOptionsField"',
    });
  }
  const key: string = val.key;
  const staticConfig:
    | undefined
    | CreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField =
    val.staticConfig == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(
          val.staticConfig,
        );
  return {
    key: key,
    staticConfig: staticConfig,
  } satisfies CreateClassificationTemplateRequestBodyFieldsOptionsField;
}
export function serializeCreateClassificationTemplateRequestBodyFieldsField(
  val: CreateClassificationTemplateRequestBodyFieldsField,
): SerializedData {
  return {
    ['type']: serializeCreateClassificationTemplateRequestBodyFieldsTypeField(
      val.type,
    ),
    ['key']: serializeCreateClassificationTemplateRequestBodyFieldsKeyField(
      val.key,
    ),
    ['displayName']:
      serializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
        val.displayName,
      ),
    ['hidden']: val.hidden,
    ['options']: val.options.map(function (
      item: CreateClassificationTemplateRequestBodyFieldsOptionsField,
    ): SerializedData {
      return serializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
        item,
      );
    }) as readonly any[],
  };
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsField(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyFieldsField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateClassificationTemplateRequestBodyFieldsField" to be defined',
    });
  }
  const type: CreateClassificationTemplateRequestBodyFieldsTypeField =
    deserializeCreateClassificationTemplateRequestBodyFieldsTypeField(val.type);
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "CreateClassificationTemplateRequestBodyFieldsField" to be defined',
    });
  }
  const key: CreateClassificationTemplateRequestBodyFieldsKeyField =
    deserializeCreateClassificationTemplateRequestBodyFieldsKeyField(val.key);
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateClassificationTemplateRequestBodyFieldsField" to be defined',
    });
  }
  const displayName: CreateClassificationTemplateRequestBodyFieldsDisplayNameField =
    deserializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
      val.displayName,
    );
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateClassificationTemplateRequestBodyFieldsField"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (val.options == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "options" of type "CreateClassificationTemplateRequestBodyFieldsField" to be defined',
    });
  }
  if (!sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "CreateClassificationTemplateRequestBodyFieldsField"',
    });
  }
  const options: readonly CreateClassificationTemplateRequestBodyFieldsOptionsField[] =
    sdIsList(val.options)
      ? (val.options.map(function (
          itm: SerializedData,
        ): CreateClassificationTemplateRequestBodyFieldsOptionsField {
          return deserializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    type: type,
    key: key,
    displayName: displayName,
    hidden: hidden,
    options: options,
  } satisfies CreateClassificationTemplateRequestBodyFieldsField;
}
export function serializeCreateClassificationTemplateRequestBodyFieldsFieldInput(
  val: CreateClassificationTemplateRequestBodyFieldsFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateClassificationTemplateRequestBodyFieldsTypeField(
            val.type,
          ),
    ['key']:
      val.key == void 0
        ? val.key
        : serializeCreateClassificationTemplateRequestBodyFieldsKeyField(
            val.key,
          ),
    ['displayName']:
      val.displayName == void 0
        ? val.displayName
        : serializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
            val.displayName,
          ),
    ['hidden']: val.hidden,
    ['options']: val.options.map(function (
      item: CreateClassificationTemplateRequestBodyFieldsOptionsField,
    ): SerializedData {
      return serializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
        item,
      );
    }) as readonly any[],
  };
}
export function deserializeCreateClassificationTemplateRequestBodyFieldsFieldInput(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyFieldsFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyFieldsFieldInput"',
    });
  }
  const type:
    | undefined
    | CreateClassificationTemplateRequestBodyFieldsTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyFieldsTypeField(
          val.type,
        );
  const key: undefined | CreateClassificationTemplateRequestBodyFieldsKeyField =
    val.key == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyFieldsKeyField(
          val.key,
        );
  const displayName:
    | undefined
    | CreateClassificationTemplateRequestBodyFieldsDisplayNameField =
    val.displayName == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(
          val.displayName,
        );
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateClassificationTemplateRequestBodyFieldsFieldInput"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (val.options == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "options" of type "CreateClassificationTemplateRequestBodyFieldsFieldInput" to be defined',
    });
  }
  if (!sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "CreateClassificationTemplateRequestBodyFieldsFieldInput"',
    });
  }
  const options: readonly CreateClassificationTemplateRequestBodyFieldsOptionsField[] =
    sdIsList(val.options)
      ? (val.options.map(function (
          itm: SerializedData,
        ): CreateClassificationTemplateRequestBodyFieldsOptionsField {
          return deserializeCreateClassificationTemplateRequestBodyFieldsOptionsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    type: type,
    key: key,
    displayName: displayName,
    hidden: hidden,
    options: options,
  } satisfies CreateClassificationTemplateRequestBodyFieldsFieldInput;
}
export function serializeCreateClassificationTemplateRequestBody(
  val: CreateClassificationTemplateRequestBody,
): SerializedData {
  return {
    ['scope']: serializeCreateClassificationTemplateRequestBodyScopeField(
      val.scope,
    ),
    ['templateKey']:
      serializeCreateClassificationTemplateRequestBodyTemplateKeyField(
        val.templateKey,
      ),
    ['displayName']:
      serializeCreateClassificationTemplateRequestBodyDisplayNameField(
        val.displayName,
      ),
    ['hidden']: val.hidden,
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
    ['fields']: val.fields.map(function (
      item: CreateClassificationTemplateRequestBodyFieldsField,
    ): SerializedData {
      return serializeCreateClassificationTemplateRequestBodyFieldsField(item);
    }) as readonly any[],
  };
}
export function deserializeCreateClassificationTemplateRequestBody(
  val: SerializedData,
): CreateClassificationTemplateRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateClassificationTemplateRequestBody"',
    });
  }
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "CreateClassificationTemplateRequestBody" to be defined',
    });
  }
  const scope: CreateClassificationTemplateRequestBodyScopeField =
    deserializeCreateClassificationTemplateRequestBodyScopeField(val.scope);
  if (val.templateKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "templateKey" of type "CreateClassificationTemplateRequestBody" to be defined',
    });
  }
  const templateKey: CreateClassificationTemplateRequestBodyTemplateKeyField =
    deserializeCreateClassificationTemplateRequestBodyTemplateKeyField(
      val.templateKey,
    );
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateClassificationTemplateRequestBody" to be defined',
    });
  }
  const displayName: CreateClassificationTemplateRequestBodyDisplayNameField =
    deserializeCreateClassificationTemplateRequestBodyDisplayNameField(
      val.displayName,
    );
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateClassificationTemplateRequestBody"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "CreateClassificationTemplateRequestBody"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  if (val.fields == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fields" of type "CreateClassificationTemplateRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fields" of type "CreateClassificationTemplateRequestBody"',
    });
  }
  const fields: readonly CreateClassificationTemplateRequestBodyFieldsField[] =
    sdIsList(val.fields)
      ? (val.fields.map(function (
          itm: SerializedData,
        ): CreateClassificationTemplateRequestBodyFieldsField {
          return deserializeCreateClassificationTemplateRequestBodyFieldsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
    fields: fields,
  } satisfies CreateClassificationTemplateRequestBody;
}
export function serializeCreateClassificationTemplateRequestBodyInput(
  val: CreateClassificationTemplateRequestBodyInput,
): SerializedData {
  return {
    ['scope']:
      val.scope == void 0
        ? val.scope
        : serializeCreateClassificationTemplateRequestBodyScopeField(val.scope),
    ['templateKey']:
      val.templateKey == void 0
        ? val.templateKey
        : serializeCreateClassificationTemplateRequestBodyTemplateKeyField(
            val.templateKey,
          ),
    ['displayName']:
      val.displayName == void 0
        ? val.displayName
        : serializeCreateClassificationTemplateRequestBodyDisplayNameField(
            val.displayName,
          ),
    ['hidden']: val.hidden,
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
    ['fields']: val.fields.map(function (
      item: CreateClassificationTemplateRequestBodyFieldsField,
    ): SerializedData {
      return serializeCreateClassificationTemplateRequestBodyFieldsField(item);
    }) as readonly any[],
  };
}
export function deserializeCreateClassificationTemplateRequestBodyInput(
  val: SerializedData,
): CreateClassificationTemplateRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateClassificationTemplateRequestBodyInput"',
    });
  }
  const scope: undefined | CreateClassificationTemplateRequestBodyScopeField =
    val.scope == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyScopeField(val.scope);
  const templateKey:
    | undefined
    | CreateClassificationTemplateRequestBodyTemplateKeyField =
    val.templateKey == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyTemplateKeyField(
          val.templateKey,
        );
  const displayName:
    | undefined
    | CreateClassificationTemplateRequestBodyDisplayNameField =
    val.displayName == void 0
      ? void 0
      : deserializeCreateClassificationTemplateRequestBodyDisplayNameField(
          val.displayName,
        );
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "CreateClassificationTemplateRequestBodyInput"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "CreateClassificationTemplateRequestBodyInput"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  if (val.fields == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fields" of type "CreateClassificationTemplateRequestBodyInput" to be defined',
    });
  }
  if (!sdIsList(val.fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fields" of type "CreateClassificationTemplateRequestBodyInput"',
    });
  }
  const fields: readonly CreateClassificationTemplateRequestBodyFieldsField[] =
    sdIsList(val.fields)
      ? (val.fields.map(function (
          itm: SerializedData,
        ): CreateClassificationTemplateRequestBodyFieldsField {
          return deserializeCreateClassificationTemplateRequestBodyFieldsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
    fields: fields,
  } satisfies CreateClassificationTemplateRequestBodyInput;
}
