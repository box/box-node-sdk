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
export class GetClassificationOnFolderOptionals {
  readonly headers: GetClassificationOnFolderHeaders =
    new GetClassificationOnFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetClassificationOnFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetClassificationOnFolderOptionals,
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
export interface GetClassificationOnFolderOptionalsInput {
  readonly headers?: GetClassificationOnFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class AddClassificationToFolderOptionals {
  readonly requestBody: AddClassificationToFolderRequestBody =
    {} satisfies AddClassificationToFolderRequestBody;
  readonly headers: AddClassificationToFolderHeaders =
    new AddClassificationToFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      AddClassificationToFolderOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          AddClassificationToFolderOptionals,
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
export interface AddClassificationToFolderOptionalsInput {
  readonly requestBody?: AddClassificationToFolderRequestBody;
  readonly headers?: AddClassificationToFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateClassificationOnFolderOptionals {
  readonly headers: UpdateClassificationOnFolderHeaders =
    new UpdateClassificationOnFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateClassificationOnFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateClassificationOnFolderOptionals,
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
export interface UpdateClassificationOnFolderOptionalsInput {
  readonly headers?: UpdateClassificationOnFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteClassificationFromFolderOptionals {
  readonly headers: DeleteClassificationFromFolderHeaders =
    new DeleteClassificationFromFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteClassificationFromFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteClassificationFromFolderOptionals,
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
export interface DeleteClassificationFromFolderOptionalsInput {
  readonly headers?: DeleteClassificationFromFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetClassificationOnFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetClassificationOnFolderHeaders, 'extraHeaders'> &
      Partial<Pick<GetClassificationOnFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetClassificationOnFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface AddClassificationToFolderRequestBody {
  /**
   * The name of the classification to apply to this folder.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly boxSecurityClassificationKey?: string;
  readonly rawData?: SerializedData;
}
export class AddClassificationToFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddClassificationToFolderHeaders, 'extraHeaders'> &
      Partial<Pick<AddClassificationToFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddClassificationToFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateClassificationOnFolderRequestBodyOpField = 'replace' | string;
export type UpdateClassificationOnFolderRequestBodyPathField =
  | '/Box__Security__Classification__Key'
  | string;
export class UpdateClassificationOnFolderRequestBody {
  /**
   * `replace` */
  readonly op: UpdateClassificationOnFolderRequestBodyOpField =
    'replace' as UpdateClassificationOnFolderRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly path: UpdateClassificationOnFolderRequestBodyPathField =
    '/Box__Security__Classification__Key' as UpdateClassificationOnFolderRequestBodyPathField;
  /**
   * The name of the classification to apply to this folder.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly value!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UpdateClassificationOnFolderRequestBody, 'op' | 'path'> &
      Partial<Pick<UpdateClassificationOnFolderRequestBody, 'op' | 'path'>>,
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
export interface UpdateClassificationOnFolderRequestBodyInput {
  /**
   * `replace` */
  readonly op?: UpdateClassificationOnFolderRequestBodyOpField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly path?: UpdateClassificationOnFolderRequestBodyPathField;
  /**
   * The name of the classification to apply to this folder.
   *
   * To list the available classifications in an enterprise,
   * use the classification API to retrieve the
   * [classification template](e://get_metadata_templates_enterprise_securityClassification-6VMVochwUWo_schema)
   * which lists all available classification keys. */
  readonly value: string;
  readonly rawData?: SerializedData;
}
export class UpdateClassificationOnFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateClassificationOnFolderHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateClassificationOnFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateClassificationOnFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteClassificationFromFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteClassificationFromFolderHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteClassificationFromFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteClassificationFromFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FolderClassificationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FolderClassificationsManager,
      | 'networkSession'
      | 'getClassificationOnFolder'
      | 'addClassificationToFolder'
      | 'updateClassificationOnFolder'
      | 'deleteClassificationFromFolder'
    > &
      Partial<Pick<FolderClassificationsManager, 'networkSession'>>,
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
     * has been applied to a folder.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetClassificationOnFolderOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async getClassificationOnFolder(
    folderId: string,
    optionalsInput: GetClassificationOnFolderOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: GetClassificationOnFolderOptionals =
      new GetClassificationOnFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
     * Adds a classification to a folder by specifying the label of the
     * classification to add.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {AddClassificationToFolderOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async addClassificationToFolder(
    folderId: string,
    optionalsInput: AddClassificationToFolderOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: AddClassificationToFolderOptionals =
      new AddClassificationToFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeAddClassificationToFolderRequestBody(requestBody),
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
     * Updates a classification on a folder.
     *
     * The classification can only be updated if a classification has already been
     * applied to the folder before. When editing classifications, only values are
     * defined for the enterprise will be accepted.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {readonly UpdateClassificationOnFolderRequestBody[]} requestBody Request body of updateClassificationOnFolder method
     * @param {UpdateClassificationOnFolderOptionalsInput} optionalsInput
     * @returns {Promise<Classification>}
     */
  async updateClassificationOnFolder(
    folderId: string,
    requestBody: readonly UpdateClassificationOnFolderRequestBody[],
    optionalsInput: UpdateClassificationOnFolderOptionalsInput = {},
  ): Promise<Classification> {
    const optionals: UpdateClassificationOnFolderOptionals =
      new UpdateClassificationOnFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '/metadata/enterprise/securityClassification-6VMVochwUWo',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: requestBody.map(
            serializeUpdateClassificationOnFolderRequestBody,
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
     * Removes any classifications from a folder.
     *
     * This API can also be called by including the enterprise ID in the
     * URL explicitly, for example
     * `/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {DeleteClassificationFromFolderOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteClassificationFromFolder(
    folderId: string,
    optionalsInput: DeleteClassificationFromFolderOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteClassificationFromFolderOptionals =
      new DeleteClassificationFromFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
export interface FolderClassificationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddClassificationToFolderRequestBody(
  val: AddClassificationToFolderRequestBody,
): SerializedData {
  return {
    ['Box__Security__Classification__Key']: val.boxSecurityClassificationKey,
  };
}
export function deserializeAddClassificationToFolderRequestBody(
  val: SerializedData,
): AddClassificationToFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddClassificationToFolderRequestBody"',
    });
  }
  if (
    !(val.Box__Security__Classification__Key == void 0) &&
    !sdIsString(val.Box__Security__Classification__Key)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "Box__Security__Classification__Key" of type "AddClassificationToFolderRequestBody"',
    });
  }
  const boxSecurityClassificationKey: undefined | string =
    val.Box__Security__Classification__Key == void 0
      ? void 0
      : val.Box__Security__Classification__Key;
  return {
    boxSecurityClassificationKey: boxSecurityClassificationKey,
  } satisfies AddClassificationToFolderRequestBody;
}
export function serializeUpdateClassificationOnFolderRequestBodyOpField(
  val: UpdateClassificationOnFolderRequestBodyOpField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationOnFolderRequestBodyOpField(
  val: SerializedData,
): UpdateClassificationOnFolderRequestBodyOpField {
  if (val == 'replace') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateClassificationOnFolderRequestBodyOpField",
  });
}
export function serializeUpdateClassificationOnFolderRequestBodyPathField(
  val: UpdateClassificationOnFolderRequestBodyPathField,
): SerializedData {
  return val;
}
export function deserializeUpdateClassificationOnFolderRequestBodyPathField(
  val: SerializedData,
): UpdateClassificationOnFolderRequestBodyPathField {
  if (val == '/Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateClassificationOnFolderRequestBodyPathField",
  });
}
export function serializeUpdateClassificationOnFolderRequestBody(
  val: UpdateClassificationOnFolderRequestBody,
): SerializedData {
  return {
    ['op']: serializeUpdateClassificationOnFolderRequestBodyOpField(val.op),
    ['path']: serializeUpdateClassificationOnFolderRequestBodyPathField(
      val.path,
    ),
    ['value']: val.value,
  };
}
export function deserializeUpdateClassificationOnFolderRequestBody(
  val: SerializedData,
): UpdateClassificationOnFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateClassificationOnFolderRequestBody"',
    });
  }
  if (val.op == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "op" of type "UpdateClassificationOnFolderRequestBody" to be defined',
    });
  }
  const op: UpdateClassificationOnFolderRequestBodyOpField =
    deserializeUpdateClassificationOnFolderRequestBodyOpField(val.op);
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "UpdateClassificationOnFolderRequestBody" to be defined',
    });
  }
  const path: UpdateClassificationOnFolderRequestBodyPathField =
    deserializeUpdateClassificationOnFolderRequestBodyPathField(val.path);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "UpdateClassificationOnFolderRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "UpdateClassificationOnFolderRequestBody"',
    });
  }
  const value: string = val.value;
  return {
    op: op,
    path: path,
    value: value,
  } satisfies UpdateClassificationOnFolderRequestBody;
}
export function serializeUpdateClassificationOnFolderRequestBodyInput(
  val: UpdateClassificationOnFolderRequestBodyInput,
): SerializedData {
  return {
    ['op']:
      val.op == void 0
        ? val.op
        : serializeUpdateClassificationOnFolderRequestBodyOpField(val.op),
    ['path']:
      val.path == void 0
        ? val.path
        : serializeUpdateClassificationOnFolderRequestBodyPathField(val.path),
    ['value']: val.value,
  };
}
export function deserializeUpdateClassificationOnFolderRequestBodyInput(
  val: SerializedData,
): UpdateClassificationOnFolderRequestBodyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateClassificationOnFolderRequestBodyInput"',
    });
  }
  const op: undefined | UpdateClassificationOnFolderRequestBodyOpField =
    val.op == void 0
      ? void 0
      : deserializeUpdateClassificationOnFolderRequestBodyOpField(val.op);
  const path: undefined | UpdateClassificationOnFolderRequestBodyPathField =
    val.path == void 0
      ? void 0
      : deserializeUpdateClassificationOnFolderRequestBodyPathField(val.path);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "UpdateClassificationOnFolderRequestBodyInput" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "UpdateClassificationOnFolderRequestBodyInput"',
    });
  }
  const value: string = val.value;
  return {
    op: op,
    path: path,
    value: value,
  } satisfies UpdateClassificationOnFolderRequestBodyInput;
}
