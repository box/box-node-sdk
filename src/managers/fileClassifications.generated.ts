import { serializeClassification } from '../schemas/classification.generated.js';
import { deserializeClassification } from '../schemas/classification.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Classification } from '../schemas/classification.generated.js';
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
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetClassificationOnFileOptionals {
  readonly headers: GetClassificationOnFileHeaders =
    new GetClassificationOnFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetClassificationOnFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetClassificationOnFileOptionals, 'headers' | 'cancellationToken'>
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
export interface GetClassificationOnFileOptionalsInput {
  readonly headers?: GetClassificationOnFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class AddClassificationToFileOptionals {
  readonly requestBody: AddClassificationToFileRequestBody =
    {} satisfies AddClassificationToFileRequestBody;
  readonly headers: AddClassificationToFileHeaders =
    new AddClassificationToFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      AddClassificationToFileOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          AddClassificationToFileOptionals,
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
export interface AddClassificationToFileOptionalsInput {
  readonly requestBody?: AddClassificationToFileRequestBody;
  readonly headers?: AddClassificationToFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateClassificationOnFileOptionals {
  readonly headers: UpdateClassificationOnFileHeaders =
    new UpdateClassificationOnFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateClassificationOnFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateClassificationOnFileOptionals,
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
export interface UpdateClassificationOnFileOptionalsInput {
  readonly headers?: UpdateClassificationOnFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteClassificationFromFileOptionals {
  readonly headers: DeleteClassificationFromFileHeaders =
    new DeleteClassificationFromFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteClassificationFromFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteClassificationFromFileOptionals,
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
export interface DeleteClassificationFromFileOptionalsInput {
  readonly headers?: DeleteClassificationFromFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetClassificationOnFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetClassificationOnFileHeaders, 'extraHeaders'> &
      Partial<Pick<GetClassificationOnFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetClassificationOnFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface AddClassificationToFileRequestBody {
  /**
   * The name of the classification to apply to this file.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly boxSecurityClassificationKey?: string;
  readonly rawData?: SerializedData;
}
export class AddClassificationToFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddClassificationToFileHeaders, 'extraHeaders'> &
      Partial<Pick<AddClassificationToFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddClassificationToFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateClassificationOnFileRequestBodyOpField = 'replace' | string;
export type UpdateClassificationOnFileRequestBodyPathField =
  | '/Box__Security__Classification__Key'
  | string;
export class UpdateClassificationOnFileRequestBody {
  /**
   * The value will always be `replace`. */
  readonly op: UpdateClassificationOnFileRequestBodyOpField =
    'replace' as UpdateClassificationOnFileRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly path: UpdateClassificationOnFileRequestBodyPathField =
    '/Box__Security__Classification__Key' as UpdateClassificationOnFileRequestBodyPathField;
  /**
   * The name of the classification to apply to this file.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly value!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UpdateClassificationOnFileRequestBody, 'op' | 'path'> &
      Partial<Pick<UpdateClassificationOnFileRequestBody, 'op' | 'path'>>,
  ) {
    if (fields.op !== undefined) {
      this.op = fields.op;
    }
    if (fields.path !== undefined) {
      this.path = fields.path;
    }
    if (fields.value !== undefined) {
      this.value = fields.value;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UpdateClassificationOnFileRequestBodyInput {
  /**
   * The value will always be `replace`. */
  readonly op?: UpdateClassificationOnFileRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly path?: UpdateClassificationOnFileRequestBodyPathField;
  /**
   * The name of the classification to apply to this file.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly value: string;
  readonly rawData?: SerializedData;
}
export class UpdateClassificationOnFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateClassificationOnFileHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateClassificationOnFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateClassificationOnFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteClassificationFromFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteClassificationFromFileHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteClassificationFromFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteClassificationFromFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileClassificationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileClassificationsManager,
      | 'networkSession'
      | 'getClassificationOnFile'
      | 'addClassificationToFile'
      | 'updateClassificationOnFile'
      | 'deleteClassificationFromFile'
    > &
      Partial<Pick<FileClassificationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves the classification metadata instance that
     * has been applied to a file.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/files/:id//enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetClassificationOnFileOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async getClassificationOnFile(
    fileId: string,
    optionalsInput: GetClassificationOnFileOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: GetClassificationOnFileOptionals =
      new GetClassificationOnFileOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
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
      ...deserializeClassification(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Adds a classification to a file by specifying the label of the
     * classification to add.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/files/:id//enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {AddClassificationToFileOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async addClassificationToFile(
    fileId: string,
    optionalsInput: AddClassificationToFileOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: AddClassificationToFileOptionals =
      new AddClassificationToFileOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeAddClassificationToFileRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeClassification(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a classification on a file.
     *
     * The classification can only be updated if a classification has already been
     * applied to the file before. When editing classifications, only values are
     * defined for the enterprise will be accepted.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {readonly UpdateClassificationOnFileRequestBody[]} requestBody Request body of updateClassificationOnFile method
     * @param {UpdateClassificationOnFileOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async updateClassificationOnFile(
    fileId: string,
    requestBody: readonly UpdateClassificationOnFileRequestBody[],
    optionalsInput: UpdateClassificationOnFileOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: UpdateClassificationOnFileOptionals =
      new UpdateClassificationOnFileOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateClassificationOnFileRequestBody,
          ) as readonly any[],
          contentType: 'application/json-patch+json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeClassification(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes any classifications from a file.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/files/:id//enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DeleteClassificationFromFileOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteClassificationFromFile(
    fileId: string,
    optionalsInput: DeleteClassificationFromFileOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteClassificationFromFileOptionals =
      new DeleteClassificationFromFileOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
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
export interface FileClassificationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddClassificationToFileRequestBody(
  val: AddClassificationToFileRequestBody,
): SerializedData {
  return {
    ['Box__Security__Classification__Key']: val.boxSecurityClassificationKey,
  };
}
export function deserializeAddClassificationToFileRequestBody(
  val: SerializedData,
): AddClassificationToFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddClassificationToFileRequestBody"',
    });
  }
  if (
    !(val.Box__Security__Classification__Key == void 0) &&
    !sdIsString(val.Box__Security__Classification__Key)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "Box__Security__Classification__Key" of type "AddClassificationToFileRequestBody"',
    });
  }
  const boxSecurityClassificationKey: undefined | string =
    val.Box__Security__Classification__Key == void 0
      ? void 0
      : val.Box__Security__Classification__Key;
  return {
    boxSecurityClassificationKey: boxSecurityClassificationKey,
  } satisfies AddClassificationToFileRequestBody;
}
export function serializeUpdateClassificationOnFileRequestBodyOpField(
  val: UpdateClassificationOnFileRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationOnFileRequestBodyOpField(
  val: SerializedData,
): UpdateClassificationOnFileRequestBodyOpField {
  if (val == 'replace') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateClassificationOnFileRequestBodyOpField",
  });
}
export function serializeUpdateClassificationOnFileRequestBodyPathField(
  val: UpdateClassificationOnFileRequestBodyPathField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationOnFileRequestBodyPathField(
  val: SerializedData,
): UpdateClassificationOnFileRequestBodyPathField {
  if (val == '/Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateClassificationOnFileRequestBodyPathField",
  });
}
export function serializeUpdateClassificationOnFileRequestBody(
  val: UpdateClassificationOnFileRequestBody,
): SerializedData {
  return {
    ['op']: serializeUpdateClassificationOnFileRequestBodyOpField(val.op),
    ['path']: serializeUpdateClassificationOnFileRequestBodyPathField(val.path),
    ['value']: val.value,
  };
}
export function deserializeUpdateClassificationOnFileRequestBody(
  val: SerializedData,
): UpdateClassificationOnFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateClassificationOnFileRequestBody"',
    });
  }
  if (val.op == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "op" of type "UpdateClassificationOnFileRequestBody" to be defined',
    });
  }
  const op: UpdateClassificationOnFileRequestBodyOpField =
    deserializeUpdateClassificationOnFileRequestBodyOpField(val.op);
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "UpdateClassificationOnFileRequestBody" to be defined',
    });
  }
  const path: UpdateClassificationOnFileRequestBodyPathField =
    deserializeUpdateClassificationOnFileRequestBodyPathField(val.path);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "UpdateClassificationOnFileRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "UpdateClassificationOnFileRequestBody"',
    });
  }
  const value: string = val.value;
  return {
    op: op,
    path: path,
    value: value,
  } satisfies UpdateClassificationOnFileRequestBody;
}
export function serializeUpdateClassificationOnFileRequestBodyInput(
  val: UpdateClassificationOnFileRequestBodyInput,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeUpdateClassificationOnFileRequestBodyOpField(val.op),
    ['path']:
      val.path == void 0
        ? val.path
        : serializeUpdateClassificationOnFileRequestBodyPathField(val.path),
    ['value']: val.value,
  };
}
export function deserializeUpdateClassificationOnFileRequestBodyInput(
  val: SerializedData,
): UpdateClassificationOnFileRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateClassificationOnFileRequestBodyInput"',
    });
  }
  const op: undefined | UpdateClassificationOnFileRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeUpdateClassificationOnFileRequestBodyOpField(val.op);
  const path: undefined | UpdateClassificationOnFileRequestBodyPathField =
    val.path == void 0
      ? void 0
      : deserializeUpdateClassificationOnFileRequestBodyPathField(val.path);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "UpdateClassificationOnFileRequestBodyInput" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "UpdateClassificationOnFileRequestBodyInput"',
    });
  }
  const value: string = val.value;
  return {
    op: op,
    path: path,
    value: value,
  } satisfies UpdateClassificationOnFileRequestBodyInput;
}
