import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeUploadUrl } from '../schemas/uploadUrl.generated.js';
import { deserializeUploadUrl } from '../schemas/uploadUrl.generated.js';
import { serializeConflictError } from '../schemas/conflictError.generated.js';
import { deserializeConflictError } from '../schemas/conflictError.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Files } from '../schemas/files.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { UploadUrl } from '../schemas/uploadUrl.generated.js';
import { ConflictError } from '../schemas/conflictError.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { prepareParams } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
import { DateTime } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { MultipartItem } from '../networking/fetchOptions.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class UploadFileVersionOptionals {
  readonly queryParams: UploadFileVersionQueryParams =
    {} satisfies UploadFileVersionQueryParams;
  readonly headers: UploadFileVersionHeaders = new UploadFileVersionHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UploadFileVersionOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UploadFileVersionOptionals,
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
export interface UploadFileVersionOptionalsInput {
  readonly queryParams?: UploadFileVersionQueryParams;
  readonly headers?: UploadFileVersionHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UploadFileOptionals {
  readonly queryParams: UploadFileQueryParams =
    {} satisfies UploadFileQueryParams;
  readonly headers: UploadFileHeaders = new UploadFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UploadFileOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UploadFileOptionals,
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
export interface UploadFileOptionalsInput {
  readonly queryParams?: UploadFileQueryParams;
  readonly headers?: UploadFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UploadWithPreflightCheckOptionals {
  readonly queryParams: UploadWithPreflightCheckQueryParams =
    {} satisfies UploadWithPreflightCheckQueryParams;
  readonly headers: UploadWithPreflightCheckHeaders =
    new UploadWithPreflightCheckHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UploadWithPreflightCheckOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UploadWithPreflightCheckOptionals,
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
export interface UploadWithPreflightCheckOptionalsInput {
  readonly queryParams?: UploadWithPreflightCheckQueryParams;
  readonly headers?: UploadWithPreflightCheckHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface UploadFileVersionRequestBodyAttributesField {
  /**
   * An optional new name for the file. If specified, the file
   * will be renamed when the new version is uploaded. */
  readonly name: string;
  /**
   * Defines the time the file was last modified at.
   *
   * If not set, the upload time will be used. */
  readonly contentModifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export interface UploadFileVersionRequestBody {
  /**
   * The additional attributes of the file being uploaded. Mainly the
   * name and the parent folder. These attributes are part of the multi
   * part request body and are in JSON format.
   *
   * <Message warning>
   *
   *   The `attributes` part of the body must come **before** the
   *   `file` part. Requests that do not follow this format when
   *   uploading the file will receive a HTTP `400` error with a
   *   `metadata_after_file_contents` error code.
   *
   * </Message> */
  readonly attributes: UploadFileVersionRequestBodyAttributesField;
  /**
   * The content of the file to upload to Box.
   *
   * <Message warning>
   *
   *   The `attributes` part of the body must come **before** the
   *   `file` part. Requests that do not follow this format when
   *   uploading the file will receive a HTTP `400` error with a
   *   `metadata_after_file_contents` error code.
   *
   * </Message> */
  readonly file: ByteStream;
  readonly fileFileName?: string;
  readonly fileContentType?: string;
}
export interface UploadFileVersionQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class UploadFileVersionHeaders {
  /**
   * Ensures this item hasn't recently changed before
   * making changes.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `412 Precondition Failed` if it
   * has changed since. */
  readonly ifMatch?: string;
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UploadFileVersionHeaders, 'extraHeaders'> &
      Partial<Pick<UploadFileVersionHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.contentMd5 !== undefined) {
      this.contentMd5 = fields.contentMd5;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UploadFileVersionHeadersInput {
  /**
   * Ensures this item hasn't recently changed before
   * making changes.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `412 Precondition Failed` if it
   * has changed since. */
  readonly ifMatch?: string;
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface PreflightFileUploadCheckRequestBodyParentField {
  /**
   * The ID of parent item. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface PreflightFileUploadCheckRequestBody {
  /**
   * The name for the file. */
  readonly name?: string;
  /**
   * The size of the file in bytes. */
  readonly size?: number;
  readonly parent?: PreflightFileUploadCheckRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export class PreflightFileUploadCheckHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<PreflightFileUploadCheckHeaders, 'extraHeaders'> &
      Partial<Pick<PreflightFileUploadCheckHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface PreflightFileUploadCheckHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UploadFileRequestBodyAttributesParentField {
  /**
   * The id of the parent folder. Use
   * `0` for the user's root folder. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface UploadFileRequestBodyAttributesField {
  /**
   * The name of the file.
   *
   * File names must be unique within their parent folder. The name check is case-insensitive, so a file
   * named `New File` cannot be created in a parent folder that already contains a folder named `new file`. */
  readonly name: string;
  /**
   * The parent folder to upload the file to. */
  readonly parent: UploadFileRequestBodyAttributesParentField;
  /**
   * Defines the time the file was originally created at.
   *
   * If not set, the upload time will be used. */
  readonly contentCreatedAt?: DateTime;
  /**
   * Defines the time the file was last modified at.
   *
   * If not set, the upload time will be used. */
  readonly contentModifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export interface UploadFileRequestBody {
  /**
   * The additional attributes of the file being uploaded. Mainly the
   * name and the parent folder. These attributes are part of the multi
   * part request body and are in JSON format.
   *
   * <Message warning>
   *
   *   The `attributes` part of the body must come **before** the
   *   `file` part. Requests that do not follow this format when
   *   uploading the file will receive a HTTP `400` error with a
   *   `metadata_after_file_contents` error code.
   *
   * </Message> */
  readonly attributes: UploadFileRequestBodyAttributesField;
  /**
   * The content of the file to upload to Box.
   *
   * <Message warning>
   *
   *   The `attributes` part of the body must come **before** the
   *   `file` part. Requests that do not follow this format when
   *   uploading the file will receive a HTTP `400` error with a
   *   `metadata_after_file_contents` error code.
   *
   * </Message> */
  readonly file: ByteStream;
  readonly fileFileName?: string;
  readonly fileContentType?: string;
}
export interface UploadFileQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class UploadFileHeaders {
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UploadFileHeaders, 'extraHeaders'> &
      Partial<Pick<UploadFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.contentMd5 !== undefined) {
      this.contentMd5 = fields.contentMd5;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UploadFileHeadersInput {
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UploadWithPreflightCheckRequestBodyAttributesParentField {
  /**
   * The id of the parent folder. Use
   * `0` for the user's root folder. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface UploadWithPreflightCheckRequestBodyAttributesField {
  /**
   * The name of the file.
   *
   * File names must be unique within their parent folder. The name check is case-insensitive, so a file
   * named `New File` cannot be created in a parent folder that already contains a folder named `new file`. */
  readonly name: string;
  /**
   * The parent folder to upload the file to. */
  readonly parent: UploadWithPreflightCheckRequestBodyAttributesParentField;
  /**
   * Defines the time the file was originally created at.
   *
   * If not set, the upload time will be used. */
  readonly contentCreatedAt?: DateTime;
  /**
   * Defines the time the file was last modified at.
   *
   * If not set, the upload time will be used. */
  readonly contentModifiedAt?: DateTime;
  /**
   * The size of the file in bytes */
  readonly size: number;
  readonly rawData?: SerializedData;
}
export interface UploadWithPreflightCheckRequestBody {
  readonly attributes: UploadWithPreflightCheckRequestBodyAttributesField;
  /**
   * The content of the file to upload to Box.
   *
   * <Message warning>
   *
   *   The `attributes` part of the body must come **before** the
   *   `file` part. Requests that do not follow this format when
   *   uploading the file will receive a HTTP `400` error with a
   *   `metadata_after_file_contents` error code.
   *
   * </Message> */
  readonly file: ByteStream;
  readonly fileFileName?: string;
  readonly fileContentType?: string;
}
export interface UploadWithPreflightCheckQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class UploadWithPreflightCheckHeaders {
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UploadWithPreflightCheckHeaders, 'extraHeaders'> &
      Partial<Pick<UploadWithPreflightCheckHeaders, 'extraHeaders'>>,
  ) {
    if (fields.contentMd5 !== undefined) {
      this.contentMd5 = fields.contentMd5;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UploadWithPreflightCheckHeadersInput {
  /**
   * An optional header containing the SHA1 hash of the file to
   * ensure that the file was not corrupted in transit. */
  readonly contentMd5?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class UploadsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      UploadsManager,
      | 'networkSession'
      | 'uploadFileVersion'
      | 'preflightFileUploadCheck'
      | 'uploadFile'
      | 'uploadWithPreflightCheck'
    > &
      Partial<Pick<UploadsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Update a file's content. For file sizes over 50MB we recommend
     * using the Chunk Upload APIs.
     *
     * The `attributes` part of the body must come **before** the
     * `file` part. Requests that do not follow this format when
     * uploading the file will receive a HTTP `400` error with a
     * `metadata_after_file_contents` error code.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {UploadFileVersionRequestBody} requestBody Request body of uploadFileVersion method
     * @param {UploadFileVersionOptionalsInput} optionalsInput
     * @returns {Promise<Files>}
     */
  async uploadFileVersion(
    fileId: string,
    requestBody: UploadFileVersionRequestBody,
    optionalsInput: UploadFileVersionOptionalsInput = {},
  ): Promise<Files> {
    const optionals: UploadFileVersionOptionals =
      new UploadFileVersionOptionals({
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
    } = prepareParams({
      ...{
        ['if-match']: toString(headers.ifMatch) as string,
        ['content-md5']: toString(headers.contentMd5) as string,
      },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.uploadUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/content',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          multipartData: [
            {
              partName: 'attributes',
              data: serializeUploadFileVersionRequestBodyAttributesField(
                requestBody.attributes,
              ),
            } satisfies MultipartItem,
            {
              partName: 'file',
              fileStream: requestBody.file,
              fileName: requestBody.fileFileName,
              contentType: requestBody.fileContentType,
            } satisfies MultipartItem,
          ],
          contentType: 'multipart/form-data',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFiles(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Performs a check to verify that a file will be accepted by Box
   * before you upload the entire file.
   * @param {PreflightFileUploadCheckRequestBody} requestBody Request body of preflightFileUploadCheck method
   * @param {PreflightFileUploadCheckHeadersInput} headersInput Headers of preflightFileUploadCheck method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<UploadUrl>}
   */
  async preflightFileUploadCheck(
    requestBody: PreflightFileUploadCheckRequestBody = {} satisfies PreflightFileUploadCheckRequestBody,
    headersInput: PreflightFileUploadCheckHeadersInput = new PreflightFileUploadCheckHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<UploadUrl> {
    const headers: PreflightFileUploadCheckHeaders =
      new PreflightFileUploadCheckHeaders({
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
            '/2.0/files/content',
          ) as string,
          method: 'OPTIONS',
          headers: headersMap,
          data: serializePreflightFileUploadCheckRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeUploadUrl(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Uploads a small file to Box. For file sizes over 50MB we recommend
   * using the Chunk Upload APIs.
   *
   * The `attributes` part of the body must come **before** the
   * `file` part. Requests that do not follow this format when
   * uploading the file will receive a HTTP `400` error with a
   * `metadata_after_file_contents` error code.
   * @param {UploadFileRequestBody} requestBody Request body of uploadFile method
   * @param {UploadFileOptionalsInput} optionalsInput
   * @returns {Promise<Files>}
   */
  async uploadFile(
    requestBody: UploadFileRequestBody,
    optionalsInput: UploadFileOptionalsInput = {},
  ): Promise<Files> {
    const optionals: UploadFileOptionals = new UploadFileOptionals({
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
    } = prepareParams({
      ...{ ['content-md5']: toString(headers.contentMd5) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.uploadUrl,
            '/2.0/files/content',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          multipartData: [
            {
              partName: 'attributes',
              data: serializeUploadFileRequestBodyAttributesField(
                requestBody.attributes,
              ),
            } satisfies MultipartItem,
            {
              partName: 'file',
              fileStream: requestBody.file,
              fileName: requestBody.fileFileName,
              contentType: requestBody.fileContentType,
            } satisfies MultipartItem,
          ],
          contentType: 'multipart/form-data',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFiles(response.data!),
      rawData: response.data!,
    };
  }
  /**
   *  Upload a file with a preflight check
   * @param {UploadWithPreflightCheckRequestBody} requestBody
   * @param {UploadWithPreflightCheckOptionalsInput} optionalsInput
   * @returns {Promise<Files>}
   */
  async uploadWithPreflightCheck(
    requestBody: UploadWithPreflightCheckRequestBody,
    optionalsInput: UploadWithPreflightCheckOptionalsInput = {},
  ): Promise<Files> {
    const optionals: UploadWithPreflightCheckOptionals =
      new UploadWithPreflightCheckOptionals({
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
    } = prepareParams({
      ...{ ['content-md5']: toString(headers.contentMd5) as string },
      ...headers.extraHeaders,
    });
    const preflightUploadUrl: UploadUrl = await this.preflightFileUploadCheck(
      {
        name: requestBody.attributes.name,
        size: requestBody.attributes.size,
        parent: {
          id: requestBody.attributes.parent.id,
        } satisfies PreflightFileUploadCheckRequestBodyParentField,
      } satisfies PreflightFileUploadCheckRequestBody,
      {
        extraHeaders: headers.extraHeaders,
      } satisfies PreflightFileUploadCheckHeadersInput,
      cancellationToken,
    );
    if (
      preflightUploadUrl.uploadUrl == void 0 ||
      !(preflightUploadUrl.uploadUrl!.includes('http') as boolean)
    ) {
      throw new BoxSdkError({ message: 'Unable to get preflight upload URL' });
    }
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: preflightUploadUrl.uploadUrl!,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          multipartData: [
            {
              partName: 'attributes',
              data: serializeUploadFileRequestBodyAttributesField(
                requestBody.attributes,
              ),
            } satisfies MultipartItem,
            {
              partName: 'file',
              fileStream: requestBody.file,
              fileName: requestBody.fileFileName,
              contentType: requestBody.fileContentType,
            } satisfies MultipartItem,
          ],
          contentType: 'multipart/form-data',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFiles(response.data!),
      rawData: response.data!,
    };
  }
}
export interface UploadsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUploadFileVersionRequestBodyAttributesField(
  val: UploadFileVersionRequestBodyAttributesField,
): SerializedData {
  return {
    ['name']: val.name,
    ['content_modified_at']:
      val.contentModifiedAt == void 0
        ? val.contentModifiedAt
        : serializeDateTime(val.contentModifiedAt),
  };
}
export function deserializeUploadFileVersionRequestBodyAttributesField(
  val: SerializedData,
): UploadFileVersionRequestBodyAttributesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UploadFileVersionRequestBodyAttributesField"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "UploadFileVersionRequestBodyAttributesField" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UploadFileVersionRequestBodyAttributesField"',
    });
  }
  const name: string = val.name;
  if (
    !(val.content_modified_at == void 0) &&
    !sdIsString(val.content_modified_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_modified_at" of type "UploadFileVersionRequestBodyAttributesField"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  return {
    name: name,
    contentModifiedAt: contentModifiedAt,
  } satisfies UploadFileVersionRequestBodyAttributesField;
}
export function serializePreflightFileUploadCheckRequestBodyParentField(
  val: PreflightFileUploadCheckRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializePreflightFileUploadCheckRequestBodyParentField(
  val: SerializedData,
): PreflightFileUploadCheckRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "PreflightFileUploadCheckRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "PreflightFileUploadCheckRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { id: id } satisfies PreflightFileUploadCheckRequestBodyParentField;
}
export function serializePreflightFileUploadCheckRequestBody(
  val: PreflightFileUploadCheckRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['size']: val.size,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializePreflightFileUploadCheckRequestBodyParentField(val.parent),
  };
}
export function deserializePreflightFileUploadCheckRequestBody(
  val: SerializedData,
): PreflightFileUploadCheckRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "PreflightFileUploadCheckRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "PreflightFileUploadCheckRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "size" of type "PreflightFileUploadCheckRequestBody"',
    });
  }
  const size: undefined | number = val.size == void 0 ? void 0 : val.size;
  const parent: undefined | PreflightFileUploadCheckRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializePreflightFileUploadCheckRequestBodyParentField(val.parent);
  return {
    name: name,
    size: size,
    parent: parent,
  } satisfies PreflightFileUploadCheckRequestBody;
}
export function serializeUploadFileRequestBodyAttributesParentField(
  val: UploadFileRequestBodyAttributesParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeUploadFileRequestBodyAttributesParentField(
  val: SerializedData,
): UploadFileRequestBodyAttributesParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UploadFileRequestBodyAttributesParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UploadFileRequestBodyAttributesParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UploadFileRequestBodyAttributesParentField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies UploadFileRequestBodyAttributesParentField;
}
export function serializeUploadFileRequestBodyAttributesField(
  val: UploadFileRequestBodyAttributesField,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']: serializeUploadFileRequestBodyAttributesParentField(val.parent),
    ['content_created_at']:
      val.contentCreatedAt == void 0
        ? val.contentCreatedAt
        : serializeDateTime(val.contentCreatedAt),
    ['content_modified_at']:
      val.contentModifiedAt == void 0
        ? val.contentModifiedAt
        : serializeDateTime(val.contentModifiedAt),
  };
}
export function deserializeUploadFileRequestBodyAttributesField(
  val: SerializedData,
): UploadFileRequestBodyAttributesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UploadFileRequestBodyAttributesField"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "UploadFileRequestBodyAttributesField" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UploadFileRequestBodyAttributesField"',
    });
  }
  const name: string = val.name;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "UploadFileRequestBodyAttributesField" to be defined',
    });
  }
  const parent: UploadFileRequestBodyAttributesParentField =
    deserializeUploadFileRequestBodyAttributesParentField(val.parent);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_created_at" of type "UploadFileRequestBodyAttributesField"',
    });
  }
  const contentCreatedAt: undefined | DateTime =
    val.content_created_at == void 0
      ? void 0
      : deserializeDateTime(val.content_created_at);
  if (
    !(val.content_modified_at == void 0) &&
    !sdIsString(val.content_modified_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_modified_at" of type "UploadFileRequestBodyAttributesField"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  return {
    name: name,
    parent: parent,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
  } satisfies UploadFileRequestBodyAttributesField;
}
export function serializeUploadWithPreflightCheckRequestBodyAttributesParentField(
  val: UploadWithPreflightCheckRequestBodyAttributesParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeUploadWithPreflightCheckRequestBodyAttributesParentField(
  val: SerializedData,
): UploadWithPreflightCheckRequestBodyAttributesParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UploadWithPreflightCheckRequestBodyAttributesParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UploadWithPreflightCheckRequestBodyAttributesParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UploadWithPreflightCheckRequestBodyAttributesParentField"',
    });
  }
  const id: string = val.id;
  return {
    id: id,
  } satisfies UploadWithPreflightCheckRequestBodyAttributesParentField;
}
export function serializeUploadWithPreflightCheckRequestBodyAttributesField(
  val: UploadWithPreflightCheckRequestBodyAttributesField,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']:
      serializeUploadWithPreflightCheckRequestBodyAttributesParentField(
        val.parent,
      ),
    ['content_created_at']:
      val.contentCreatedAt == void 0
        ? val.contentCreatedAt
        : serializeDateTime(val.contentCreatedAt),
    ['content_modified_at']:
      val.contentModifiedAt == void 0
        ? val.contentModifiedAt
        : serializeDateTime(val.contentModifiedAt),
    ['size']: val.size,
  };
}
export function deserializeUploadWithPreflightCheckRequestBodyAttributesField(
  val: SerializedData,
): UploadWithPreflightCheckRequestBodyAttributesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UploadWithPreflightCheckRequestBodyAttributesField"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "UploadWithPreflightCheckRequestBodyAttributesField" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UploadWithPreflightCheckRequestBodyAttributesField"',
    });
  }
  const name: string = val.name;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "UploadWithPreflightCheckRequestBodyAttributesField" to be defined',
    });
  }
  const parent: UploadWithPreflightCheckRequestBodyAttributesParentField =
    deserializeUploadWithPreflightCheckRequestBodyAttributesParentField(
      val.parent,
    );
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_created_at" of type "UploadWithPreflightCheckRequestBodyAttributesField"',
    });
  }
  const contentCreatedAt: undefined | DateTime =
    val.content_created_at == void 0
      ? void 0
      : deserializeDateTime(val.content_created_at);
  if (
    !(val.content_modified_at == void 0) &&
    !sdIsString(val.content_modified_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_modified_at" of type "UploadWithPreflightCheckRequestBodyAttributesField"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  if (val.size == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "size" of type "UploadWithPreflightCheckRequestBodyAttributesField" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "size" of type "UploadWithPreflightCheckRequestBodyAttributesField"',
    });
  }
  const size: number = val.size;
  return {
    name: name,
    parent: parent,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
    size: size,
  } satisfies UploadWithPreflightCheckRequestBodyAttributesField;
}
