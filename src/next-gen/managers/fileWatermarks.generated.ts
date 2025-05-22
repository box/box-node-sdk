import { serializeWatermark } from '../schemas/watermark.generated.js';
import { deserializeWatermark } from '../schemas/watermark.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Watermark } from '../schemas/watermark.generated.js';
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
export class GetFileWatermarkOptionals {
  readonly headers: GetFileWatermarkHeaders = new GetFileWatermarkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetFileWatermarkOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetFileWatermarkOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetFileWatermarkOptionalsInput {
  readonly headers?: GetFileWatermarkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFileWatermarkOptionals {
  readonly headers: UpdateFileWatermarkHeaders = new UpdateFileWatermarkHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFileWatermarkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateFileWatermarkOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateFileWatermarkOptionalsInput {
  readonly headers?: UpdateFileWatermarkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFileWatermarkOptionals {
  readonly headers: DeleteFileWatermarkHeaders = new DeleteFileWatermarkHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFileWatermarkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteFileWatermarkOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteFileWatermarkOptionalsInput {
  readonly headers?: DeleteFileWatermarkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileWatermarkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileWatermarkHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileWatermarkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileWatermarkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateFileWatermarkRequestBodyWatermarkImprintField =
  | 'default'
  | string;
export class UpdateFileWatermarkRequestBodyWatermarkField {
  /**
   * The type of watermark to apply.
   *
   * Currently only supports one option. */
  readonly imprint: UpdateFileWatermarkRequestBodyWatermarkImprintField =
    'default' as UpdateFileWatermarkRequestBodyWatermarkImprintField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UpdateFileWatermarkRequestBodyWatermarkField, 'imprint'> &
      Partial<Pick<UpdateFileWatermarkRequestBodyWatermarkField, 'imprint'>>,
  ) {
    if (fields.imprint !== undefined) {
      this.imprint = fields.imprint;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UpdateFileWatermarkRequestBodyWatermarkFieldInput {
  /**
   * The type of watermark to apply.
   *
   * Currently only supports one option. */
  readonly imprint?: UpdateFileWatermarkRequestBodyWatermarkImprintField;
  readonly rawData?: SerializedData;
}
export interface UpdateFileWatermarkRequestBody {
  /**
   * The watermark to imprint on the file */
  readonly watermark: UpdateFileWatermarkRequestBodyWatermarkField;
  readonly rawData?: SerializedData;
}
export class UpdateFileWatermarkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateFileWatermarkHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFileWatermarkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFileWatermarkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteFileWatermarkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFileWatermarkHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFileWatermarkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFileWatermarkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FileWatermarksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FileWatermarksManager,
      | 'networkSession'
      | 'getFileWatermark'
      | 'updateFileWatermark'
      | 'deleteFileWatermark'
    > &
      Partial<Pick<FileWatermarksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieve the watermark for a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileWatermarkOptionalsInput} optionalsInput
     * @returns {Promise<Watermark>}
     */
  async getFileWatermark(
    fileId: string,
    optionalsInput: GetFileWatermarkOptionalsInput = {},
  ): Promise<Watermark> {
    const optionals: GetFileWatermarkOptionals = new GetFileWatermarkOptionals({
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
            '/watermark',
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
      ...deserializeWatermark(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Applies or update a watermark on a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {UpdateFileWatermarkRequestBody} requestBody Request body of updateFileWatermark method
     * @param {UpdateFileWatermarkOptionalsInput} optionalsInput
     * @returns {Promise<Watermark>}
     */
  async updateFileWatermark(
    fileId: string,
    requestBody: UpdateFileWatermarkRequestBody,
    optionalsInput: UpdateFileWatermarkOptionalsInput = {},
  ): Promise<Watermark> {
    const optionals: UpdateFileWatermarkOptionals =
      new UpdateFileWatermarkOptionals({
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
            '/watermark',
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateFileWatermarkRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWatermark(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes the watermark from a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DeleteFileWatermarkOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFileWatermark(
    fileId: string,
    optionalsInput: DeleteFileWatermarkOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFileWatermarkOptionals =
      new DeleteFileWatermarkOptionals({
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
            '/watermark',
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
export interface FileWatermarksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateFileWatermarkRequestBodyWatermarkImprintField(
  val: UpdateFileWatermarkRequestBodyWatermarkImprintField,
): SerializedData {
  return val;
}
export function deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField(
  val: SerializedData,
): UpdateFileWatermarkRequestBodyWatermarkImprintField {
  if (val == 'default') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateFileWatermarkRequestBodyWatermarkImprintField",
  });
}
export function serializeUpdateFileWatermarkRequestBodyWatermarkField(
  val: UpdateFileWatermarkRequestBodyWatermarkField,
): SerializedData {
  return {
    ['imprint']: serializeUpdateFileWatermarkRequestBodyWatermarkImprintField(
      val.imprint,
    ),
  };
}
export function deserializeUpdateFileWatermarkRequestBodyWatermarkField(
  val: SerializedData,
): UpdateFileWatermarkRequestBodyWatermarkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFileWatermarkRequestBodyWatermarkField"',
    });
  }
  if (val.imprint == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "imprint" of type "UpdateFileWatermarkRequestBodyWatermarkField" to be defined',
    });
  }
  const imprint: UpdateFileWatermarkRequestBodyWatermarkImprintField =
    deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField(val.imprint);
  return {
    imprint: imprint,
  } satisfies UpdateFileWatermarkRequestBodyWatermarkField;
}
export function serializeUpdateFileWatermarkRequestBodyWatermarkFieldInput(
  val: UpdateFileWatermarkRequestBodyWatermarkFieldInput,
): SerializedData {
  return {
    ['imprint']:
      val.imprint == void 0
        ? val.imprint
        : serializeUpdateFileWatermarkRequestBodyWatermarkImprintField(
            val.imprint,
          ),
  };
}
export function deserializeUpdateFileWatermarkRequestBodyWatermarkFieldInput(
  val: SerializedData,
): UpdateFileWatermarkRequestBodyWatermarkFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFileWatermarkRequestBodyWatermarkFieldInput"',
    });
  }
  const imprint:
    | undefined
    | UpdateFileWatermarkRequestBodyWatermarkImprintField =
    val.imprint == void 0
      ? void 0
      : deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField(
          val.imprint,
        );
  return {
    imprint: imprint,
  } satisfies UpdateFileWatermarkRequestBodyWatermarkFieldInput;
}
export function serializeUpdateFileWatermarkRequestBody(
  val: UpdateFileWatermarkRequestBody,
): SerializedData {
  return {
    ['watermark']: serializeUpdateFileWatermarkRequestBodyWatermarkField(
      val.watermark,
    ),
  };
}
export function deserializeUpdateFileWatermarkRequestBody(
  val: SerializedData,
): UpdateFileWatermarkRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileWatermarkRequestBody"',
    });
  }
  if (val.watermark == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "watermark" of type "UpdateFileWatermarkRequestBody" to be defined',
    });
  }
  const watermark: UpdateFileWatermarkRequestBodyWatermarkField =
    deserializeUpdateFileWatermarkRequestBodyWatermarkField(val.watermark);
  return { watermark: watermark } satisfies UpdateFileWatermarkRequestBody;
}
