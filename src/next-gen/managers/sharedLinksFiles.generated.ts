import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
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
import { DateTime } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class FindFileForSharedLinkOptionals {
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<FindFileForSharedLinkOptionals, 'cancellationToken'> &
      Partial<Pick<FindFileForSharedLinkOptionals, 'cancellationToken'>>,
  ) {
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface FindFileForSharedLinkOptionalsInput {
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetSharedLinkForFileOptionals {
  readonly headers: GetSharedLinkForFileHeaders =
    new GetSharedLinkForFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetSharedLinkForFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetSharedLinkForFileOptionals, 'headers' | 'cancellationToken'>
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
export interface GetSharedLinkForFileOptionalsInput {
  readonly headers?: GetSharedLinkForFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class AddShareLinkToFileOptionals {
  readonly headers: AddShareLinkToFileHeaders = new AddShareLinkToFileHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<AddShareLinkToFileOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<AddShareLinkToFileOptionals, 'headers' | 'cancellationToken'>
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
export interface AddShareLinkToFileOptionalsInput {
  readonly headers?: AddShareLinkToFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateSharedLinkOnFileOptionals {
  readonly headers: UpdateSharedLinkOnFileHeaders =
    new UpdateSharedLinkOnFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateSharedLinkOnFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateSharedLinkOnFileOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateSharedLinkOnFileOptionalsInput {
  readonly headers?: UpdateSharedLinkOnFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class RemoveSharedLinkFromFileOptionals {
  readonly headers: RemoveSharedLinkFromFileHeaders =
    new RemoveSharedLinkFromFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RemoveSharedLinkFromFileOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<RemoveSharedLinkFromFileOptionals, 'headers' | 'cancellationToken'>
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
export interface RemoveSharedLinkFromFileOptionalsInput {
  readonly headers?: RemoveSharedLinkFromFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface FindFileForSharedLinkQueryParams {
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
export class FindFileForSharedLinkHeaders {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * A header containing the shared link and optional password for the
   * shared link.
   *
   * The format for this header is as follows.
   *
   * `shared_link=[link]&shared_link_password=[password]` */
  readonly boxapi!: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<FindFileForSharedLinkHeaders, 'extraHeaders'> &
      Partial<Pick<FindFileForSharedLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifNoneMatch !== undefined) {
      this.ifNoneMatch = fields.ifNoneMatch;
    }
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface FindFileForSharedLinkHeadersInput {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * A header containing the shared link and optional password for the
   * shared link.
   *
   * The format for this header is as follows.
   *
   * `shared_link=[link]&shared_link_password=[password]` */
  readonly boxapi: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetSharedLinkForFileQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class GetSharedLinkForFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSharedLinkForFileHeaders, 'extraHeaders'> &
      Partial<Pick<GetSharedLinkForFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSharedLinkForFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type AddShareLinkToFileRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface AddShareLinkToFileRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  /**
   * If the shared link allows for previewing of files.
   * This value is always `true`. For shared links on folders
   * this also applies to any items in the folder. */
  readonly canPreview?: boolean;
  /**
   * If the shared link allows for editing of files.
   * This can only be set when `access` is set to
   * `open` or `company`.
   * This value can only be `true` is `can_download` is
   * also `true`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFileRequestBodySharedLinkField {
  /**
   * The level of access for the shared link. This can be
   * restricted to anyone with the link (`open`), only people
   * within the company (`company`) and only those who
   * have been invited to the file (`collaborators`).
   *
   * If not set, this field defaults to the access level specified
   * by the enterprise admin. To create a shared link with this
   * default setting pass the `shared_link` object with
   * no `access` field, for example `{ "shared_link": {} }`.
   *
   * The `company` access level is only available to paid
   * accounts. */
  readonly access?: AddShareLinkToFileRequestBodySharedLinkAccessField;
  /**
   * The password required to access the shared link. Set the
   * password to `null` to remove it.
   * Passwords must now be at least eight characters
   * long and include a number, upper case letter, or
   * a non-numeric or non-alphabetic character.
   * A password can only be set when `access` is set to `open`. */
  readonly password?: string | null;
  /**
   * Defines a custom vanity name to use in the shared link URL,
   * for example `https://app.box.com/v/my-shared-link`.
   *
   * Custom URLs should not be used when sharing sensitive content
   * as vanity URLs are a lot easier to guess than regular shared
   * links. */
  readonly vanityName?: string;
  /**
   * The timestamp at which this shared link will
   * expire. This field can only be set by
   * users with paid accounts. The value must be greater than the
   * current date and time. */
  readonly unsharedAt?: DateTime;
  readonly permissions?: AddShareLinkToFileRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFileRequestBody {
  /**
   * The settings for the shared link to create on the file.
   * Use an empty object (`{}`) to use the default settings for shared
   * links. */
  readonly sharedLink?: AddShareLinkToFileRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFileQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class AddShareLinkToFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddShareLinkToFileHeaders, 'extraHeaders'> &
      Partial<Pick<AddShareLinkToFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddShareLinkToFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateSharedLinkOnFileRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  /**
   * If the shared link allows for previewing of files.
   * This value is always `true`. For shared links on folders
   * this also applies to any items in the folder. */
  readonly canPreview?: boolean;
  /**
   * If the shared link allows for editing of files.
   * This can only be set when `access` is set to
   * `open` or `company`.
   * This value can only be `true` is `can_download` is
   * also `true`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFileRequestBodySharedLinkField {
  /**
   * The level of access for the shared link. This can be
   * restricted to anyone with the link (`open`), only people
   * within the company (`company`) and only those who
   * have been invited to the folder (`collaborators`).
   *
   * If not set, this field defaults to the access level specified
   * by the enterprise admin. To create a shared link with this
   * default setting pass the `shared_link` object with
   * no `access` field, for example `{ "shared_link": {} }`.
   *
   * The `company` access level is only available to paid
   * accounts. */
  readonly access?: UpdateSharedLinkOnFileRequestBodySharedLinkAccessField;
  /**
   * The password required to access the shared link. Set the
   * password to `null` to remove it.
   * Passwords must now be at least eight characters
   * long and include a number, upper case letter, or
   * a non-numeric or non-alphabetic character.
   * A password can only be set when `access` is set to `open`. */
  readonly password?: string | null;
  /**
   * Defines a custom vanity name to use in the shared link URL,
   * for example `https://app.box.com/v/my-shared-link`.
   *
   * Custom URLs should not be used when sharing sensitive content
   * as vanity URLs are a lot easier to guess than regular shared
   * links. */
  readonly vanityName?: string;
  /**
   * The timestamp at which this shared link will
   * expire. This field can only be set by
   * users with paid accounts. The value must be greater than the
   * current date and time. */
  readonly unsharedAt?: DateTime;
  readonly permissions?: UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFileRequestBody {
  /**
   * The settings for the shared link to update. */
  readonly sharedLink?: UpdateSharedLinkOnFileRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFileQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class UpdateSharedLinkOnFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateSharedLinkOnFileHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateSharedLinkOnFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateSharedLinkOnFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface RemoveSharedLinkFromFileRequestBodySharedLinkField {
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromFileRequestBody {
  /**
   * By setting this value to `null`, the shared link
   * is removed from the file. */
  readonly sharedLink?: RemoveSharedLinkFromFileRequestBodySharedLinkField | null;
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromFileQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class RemoveSharedLinkFromFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RemoveSharedLinkFromFileHeaders, 'extraHeaders'> &
      Partial<Pick<RemoveSharedLinkFromFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RemoveSharedLinkFromFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SharedLinksFilesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SharedLinksFilesManager,
      | 'networkSession'
      | 'findFileForSharedLink'
      | 'getSharedLinkForFile'
      | 'addShareLinkToFile'
      | 'updateSharedLinkOnFile'
      | 'removeSharedLinkFromFile'
    > &
      Partial<Pick<SharedLinksFilesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns the file represented by a shared link.
   *
   * A shared file can be represented by a shared link,
   * which can originate within the current enterprise or within another.
   *
   * This endpoint allows an application to retrieve information about a
   * shared file when only given a shared link.
   *
   * The `shared_link_permission_options` array field can be returned
   * by requesting it in the `fields` query parameter.
   * @param {FindFileForSharedLinkQueryParams} queryParams Query parameters of findFileForSharedLink method
   * @param {FindFileForSharedLinkHeadersInput} headersInput Headers of findFileForSharedLink method
   * @param {FindFileForSharedLinkOptionalsInput} optionalsInput
   * @returns {Promise<FileFull>}
   */
  async findFileForSharedLink(
    queryParams: FindFileForSharedLinkQueryParams = {} satisfies FindFileForSharedLinkQueryParams,
    headersInput: FindFileForSharedLinkHeadersInput,
    optionalsInput: FindFileForSharedLinkOptionalsInput = {},
  ): Promise<FileFull> {
    const headers: FindFileForSharedLinkHeaders =
      new FindFileForSharedLinkHeaders({
        ifNoneMatch: headersInput.ifNoneMatch,
        boxapi: headersInput.boxapi,
        extraHeaders: headersInput.extraHeaders,
      });
    const optionals: FindFileForSharedLinkOptionals =
      new FindFileForSharedLinkOptionals({
        cancellationToken: optionalsInput.cancellationToken,
      });
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
        ['if-none-match']: toString(headers.ifNoneMatch) as string,
        ['boxapi']: toString(headers.boxapi) as string,
      },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/shared_items',
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
      ...deserializeFileFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Gets the information for a shared link on a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetSharedLinkForFileQueryParams} queryParams Query parameters of getSharedLinkForFile method
     * @param {GetSharedLinkForFileOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async getSharedLinkForFile(
    fileId: string,
    queryParams: GetSharedLinkForFileQueryParams,
    optionalsInput: GetSharedLinkForFileOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: GetSharedLinkForFileOptionals =
      new GetSharedLinkForFileOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#get_shared_link',
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
      ...deserializeFileFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Adds a shared link to a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {AddShareLinkToFileRequestBody} requestBody Request body of addShareLinkToFile method
     * @param {AddShareLinkToFileQueryParams} queryParams Query parameters of addShareLinkToFile method
     * @param {AddShareLinkToFileOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async addShareLinkToFile(
    fileId: string,
    requestBody: AddShareLinkToFileRequestBody = {} satisfies AddShareLinkToFileRequestBody,
    queryParams: AddShareLinkToFileQueryParams,
    optionalsInput: AddShareLinkToFileOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: AddShareLinkToFileOptionals =
      new AddShareLinkToFileOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#add_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeAddShareLinkToFileRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFileFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a shared link on a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {UpdateSharedLinkOnFileRequestBody} requestBody Request body of updateSharedLinkOnFile method
     * @param {UpdateSharedLinkOnFileQueryParams} queryParams Query parameters of updateSharedLinkOnFile method
     * @param {UpdateSharedLinkOnFileOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async updateSharedLinkOnFile(
    fileId: string,
    requestBody: UpdateSharedLinkOnFileRequestBody = {} satisfies UpdateSharedLinkOnFileRequestBody,
    queryParams: UpdateSharedLinkOnFileQueryParams,
    optionalsInput: UpdateSharedLinkOnFileOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: UpdateSharedLinkOnFileOptionals =
      new UpdateSharedLinkOnFileOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#update_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateSharedLinkOnFileRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFileFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a shared link from a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {RemoveSharedLinkFromFileRequestBody} requestBody Request body of removeSharedLinkFromFile method
     * @param {RemoveSharedLinkFromFileQueryParams} queryParams Query parameters of removeSharedLinkFromFile method
     * @param {RemoveSharedLinkFromFileOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async removeSharedLinkFromFile(
    fileId: string,
    requestBody: RemoveSharedLinkFromFileRequestBody = {} satisfies RemoveSharedLinkFromFileRequestBody,
    queryParams: RemoveSharedLinkFromFileQueryParams,
    optionalsInput: RemoveSharedLinkFromFileOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: RemoveSharedLinkFromFileOptionals =
      new RemoveSharedLinkFromFileOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#remove_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRemoveSharedLinkFromFileRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFileFull(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SharedLinksFilesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddShareLinkToFileRequestBodySharedLinkAccessField(
  val: AddShareLinkToFileRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeAddShareLinkToFileRequestBodySharedLinkAccessField(
  val: SerializedData,
): AddShareLinkToFileRequestBodySharedLinkAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize AddShareLinkToFileRequestBodySharedLinkAccessField",
  });
}
export function serializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(
  val: AddShareLinkToFileRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): AddShareLinkToFileRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToFileRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "AddShareLinkToFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "AddShareLinkToFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "AddShareLinkToFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies AddShareLinkToFileRequestBodySharedLinkPermissionsField;
}
export function serializeAddShareLinkToFileRequestBodySharedLinkField(
  val: AddShareLinkToFileRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeAddShareLinkToFileRequestBodySharedLinkAccessField(
            val.access,
          ),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeAddShareLinkToFileRequestBodySharedLinkField(
  val: SerializedData,
): AddShareLinkToFileRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToFileRequestBodySharedLinkField"',
    });
  }
  const access: undefined | AddShareLinkToFileRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeAddShareLinkToFileRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "AddShareLinkToFileRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "AddShareLinkToFileRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "AddShareLinkToFileRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | AddShareLinkToFileRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies AddShareLinkToFileRequestBodySharedLinkField;
}
export function serializeAddShareLinkToFileRequestBody(
  val: AddShareLinkToFileRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeAddShareLinkToFileRequestBodySharedLinkField(val.sharedLink),
  };
}
export function deserializeAddShareLinkToFileRequestBody(
  val: SerializedData,
): AddShareLinkToFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddShareLinkToFileRequestBody"',
    });
  }
  const sharedLink: undefined | AddShareLinkToFileRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeAddShareLinkToFileRequestBodySharedLinkField(
          val.shared_link,
        );
  return { sharedLink: sharedLink } satisfies AddShareLinkToFileRequestBody;
}
export function serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(
  val: UpdateSharedLinkOnFileRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateSharedLinkOnFileRequestBodySharedLinkAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateSharedLinkOnFileRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(
  val: UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField;
}
export function serializeUpdateSharedLinkOnFileRequestBodySharedLinkField(
  val: UpdateSharedLinkOnFileRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(
            val.access,
          ),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeUpdateSharedLinkOnFileRequestBodySharedLinkField(
  val: SerializedData,
): UpdateSharedLinkOnFileRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnFileRequestBodySharedLinkField"',
    });
  }
  const access:
    | undefined
    | UpdateSharedLinkOnFileRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateSharedLinkOnFileRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateSharedLinkOnFileRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateSharedLinkOnFileRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | UpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies UpdateSharedLinkOnFileRequestBodySharedLinkField;
}
export function serializeUpdateSharedLinkOnFileRequestBody(
  val: UpdateSharedLinkOnFileRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateSharedLinkOnFileRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeUpdateSharedLinkOnFileRequestBody(
  val: SerializedData,
): UpdateSharedLinkOnFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateSharedLinkOnFileRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | UpdateSharedLinkOnFileRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFileRequestBodySharedLinkField(
          val.shared_link,
        );
  return { sharedLink: sharedLink } satisfies UpdateSharedLinkOnFileRequestBody;
}
export function serializeRemoveSharedLinkFromFileRequestBodySharedLinkField(
  val: RemoveSharedLinkFromFileRequestBodySharedLinkField,
): SerializedData {
  return {};
}
export function deserializeRemoveSharedLinkFromFileRequestBodySharedLinkField(
  val: SerializedData,
): RemoveSharedLinkFromFileRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RemoveSharedLinkFromFileRequestBodySharedLinkField"',
    });
  }
  return {} satisfies RemoveSharedLinkFromFileRequestBodySharedLinkField;
}
export function serializeRemoveSharedLinkFromFileRequestBody(
  val: RemoveSharedLinkFromFileRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeRemoveSharedLinkFromFileRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeRemoveSharedLinkFromFileRequestBody(
  val: SerializedData,
): RemoveSharedLinkFromFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RemoveSharedLinkFromFileRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | RemoveSharedLinkFromFileRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeRemoveSharedLinkFromFileRequestBodySharedLinkField(
          val.shared_link,
        );
  return {
    sharedLink: sharedLink,
  } satisfies RemoveSharedLinkFromFileRequestBody;
}
