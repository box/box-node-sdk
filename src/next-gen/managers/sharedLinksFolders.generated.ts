import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
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
export class FindFolderForSharedLinkOptionals {
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<FindFolderForSharedLinkOptionals, 'cancellationToken'> &
      Partial<Pick<FindFolderForSharedLinkOptionals, 'cancellationToken'>>,
  ) {
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface FindFolderForSharedLinkOptionalsInput {
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetSharedLinkForFolderOptionals {
  readonly headers: GetSharedLinkForFolderHeaders =
    new GetSharedLinkForFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetSharedLinkForFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetSharedLinkForFolderOptionals, 'headers' | 'cancellationToken'>
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
export interface GetSharedLinkForFolderOptionalsInput {
  readonly headers?: GetSharedLinkForFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class AddShareLinkToFolderOptionals {
  readonly headers: AddShareLinkToFolderHeaders =
    new AddShareLinkToFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      AddShareLinkToFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<AddShareLinkToFolderOptionals, 'headers' | 'cancellationToken'>
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
export interface AddShareLinkToFolderOptionalsInput {
  readonly headers?: AddShareLinkToFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateSharedLinkOnFolderOptionals {
  readonly headers: UpdateSharedLinkOnFolderHeaders =
    new UpdateSharedLinkOnFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateSharedLinkOnFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateSharedLinkOnFolderOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateSharedLinkOnFolderOptionalsInput {
  readonly headers?: UpdateSharedLinkOnFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class RemoveSharedLinkFromFolderOptionals {
  readonly headers: RemoveSharedLinkFromFolderHeaders =
    new RemoveSharedLinkFromFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RemoveSharedLinkFromFolderOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          RemoveSharedLinkFromFolderOptionals,
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
export interface RemoveSharedLinkFromFolderOptionalsInput {
  readonly headers?: RemoveSharedLinkFromFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface FindFolderForSharedLinkQueryParams {
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
export class FindFolderForSharedLinkHeaders {
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
    fields: Omit<FindFolderForSharedLinkHeaders, 'extraHeaders'> &
      Partial<Pick<FindFolderForSharedLinkHeaders, 'extraHeaders'>>,
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
export interface FindFolderForSharedLinkHeadersInput {
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
export interface GetSharedLinkForFolderQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class GetSharedLinkForFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSharedLinkForFolderHeaders, 'extraHeaders'> &
      Partial<Pick<GetSharedLinkForFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSharedLinkForFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type AddShareLinkToFolderRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface AddShareLinkToFolderRequestBodySharedLinkPermissionsField {
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
   * This value can only be `false` for items
   * with a `type` of `folder`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFolderRequestBodySharedLinkField {
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
  readonly access?: AddShareLinkToFolderRequestBodySharedLinkAccessField;
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
  readonly permissions?: AddShareLinkToFolderRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFolderRequestBody {
  /**
   * The settings for the shared link to create on the folder.
   *
   * Use an empty object (`{}`) to use the default settings for shared
   * links. */
  readonly sharedLink?: AddShareLinkToFolderRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToFolderQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class AddShareLinkToFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddShareLinkToFolderHeaders, 'extraHeaders'> &
      Partial<Pick<AddShareLinkToFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddShareLinkToFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField {
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
   * This value can only be `false` for items
   * with a `type` of `folder`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFolderRequestBodySharedLinkField {
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
  readonly access?: UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField;
  /**
   * The password required to access the shared link. Set the
   * password to `null` to remove it.
   * Passwords must now be at least eight characters
   * long and include a number, upper case letter, or
   * a non-numeric or non-alphabetic character.
   * A password can only be set when `access` is set to `open`. */
  readonly password?: string;
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
  readonly permissions?: UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFolderRequestBody {
  /**
   * The settings for the shared link to update. */
  readonly sharedLink?: UpdateSharedLinkOnFolderRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnFolderQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class UpdateSharedLinkOnFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateSharedLinkOnFolderHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateSharedLinkOnFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateSharedLinkOnFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface RemoveSharedLinkFromFolderRequestBodySharedLinkField {
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromFolderRequestBody {
  /**
   * By setting this value to `null`, the shared link
   * is removed from the folder. */
  readonly sharedLink?: RemoveSharedLinkFromFolderRequestBodySharedLinkField | null;
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromFolderQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class RemoveSharedLinkFromFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RemoveSharedLinkFromFolderHeaders, 'extraHeaders'> &
      Partial<Pick<RemoveSharedLinkFromFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RemoveSharedLinkFromFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SharedLinksFoldersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SharedLinksFoldersManager,
      | 'networkSession'
      | 'findFolderForSharedLink'
      | 'getSharedLinkForFolder'
      | 'addShareLinkToFolder'
      | 'updateSharedLinkOnFolder'
      | 'removeSharedLinkFromFolder'
    > &
      Partial<Pick<SharedLinksFoldersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Return the folder represented by a shared link.
   *
   * A shared folder can be represented by a shared link,
   * which can originate within the current enterprise or within another.
   *
   * This endpoint allows an application to retrieve information about a
   * shared folder when only given a shared link.
   * @param {FindFolderForSharedLinkQueryParams} queryParams Query parameters of findFolderForSharedLink method
   * @param {FindFolderForSharedLinkHeadersInput} headersInput Headers of findFolderForSharedLink method
   * @param {FindFolderForSharedLinkOptionalsInput} optionalsInput
   * @returns {Promise<FolderFull>}
   */
  async findFolderForSharedLink(
    queryParams: FindFolderForSharedLinkQueryParams = {} satisfies FindFolderForSharedLinkQueryParams,
    headersInput: FindFolderForSharedLinkHeadersInput,
    optionalsInput: FindFolderForSharedLinkOptionalsInput = {},
  ): Promise<FolderFull> {
    const headers: FindFolderForSharedLinkHeaders =
      new FindFolderForSharedLinkHeaders({
        ifNoneMatch: headersInput.ifNoneMatch,
        boxapi: headersInput.boxapi,
        extraHeaders: headersInput.extraHeaders,
      });
    const optionals: FindFolderForSharedLinkOptionals =
      new FindFolderForSharedLinkOptionals({
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
            '/2.0/shared_items#folders',
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
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Gets the information for a shared link on a folder.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetSharedLinkForFolderQueryParams} queryParams Query parameters of getSharedLinkForFolder method
     * @param {GetSharedLinkForFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async getSharedLinkForFolder(
    folderId: string,
    queryParams: GetSharedLinkForFolderQueryParams,
    optionalsInput: GetSharedLinkForFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: GetSharedLinkForFolderOptionals =
      new GetSharedLinkForFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
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
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Adds a shared link to a folder.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {AddShareLinkToFolderRequestBody} requestBody Request body of addShareLinkToFolder method
     * @param {AddShareLinkToFolderQueryParams} queryParams Query parameters of addShareLinkToFolder method
     * @param {AddShareLinkToFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async addShareLinkToFolder(
    folderId: string,
    requestBody: AddShareLinkToFolderRequestBody = {} satisfies AddShareLinkToFolderRequestBody,
    queryParams: AddShareLinkToFolderQueryParams,
    optionalsInput: AddShareLinkToFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: AddShareLinkToFolderOptionals =
      new AddShareLinkToFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '#add_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeAddShareLinkToFolderRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a shared link on a folder.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {UpdateSharedLinkOnFolderRequestBody} requestBody Request body of updateSharedLinkOnFolder method
     * @param {UpdateSharedLinkOnFolderQueryParams} queryParams Query parameters of updateSharedLinkOnFolder method
     * @param {UpdateSharedLinkOnFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async updateSharedLinkOnFolder(
    folderId: string,
    requestBody: UpdateSharedLinkOnFolderRequestBody = {} satisfies UpdateSharedLinkOnFolderRequestBody,
    queryParams: UpdateSharedLinkOnFolderQueryParams,
    optionalsInput: UpdateSharedLinkOnFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: UpdateSharedLinkOnFolderOptionals =
      new UpdateSharedLinkOnFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '#update_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateSharedLinkOnFolderRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a shared link from a folder.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {RemoveSharedLinkFromFolderRequestBody} requestBody Request body of removeSharedLinkFromFolder method
     * @param {RemoveSharedLinkFromFolderQueryParams} queryParams Query parameters of removeSharedLinkFromFolder method
     * @param {RemoveSharedLinkFromFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async removeSharedLinkFromFolder(
    folderId: string,
    requestBody: RemoveSharedLinkFromFolderRequestBody = {} satisfies RemoveSharedLinkFromFolderRequestBody,
    queryParams: RemoveSharedLinkFromFolderQueryParams,
    optionalsInput: RemoveSharedLinkFromFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: RemoveSharedLinkFromFolderOptionals =
      new RemoveSharedLinkFromFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '#remove_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRemoveSharedLinkFromFolderRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SharedLinksFoldersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddShareLinkToFolderRequestBodySharedLinkAccessField(
  val: AddShareLinkToFolderRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeAddShareLinkToFolderRequestBodySharedLinkAccessField(
  val: SerializedData,
): AddShareLinkToFolderRequestBodySharedLinkAccessField {
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
      "Can't deserialize AddShareLinkToFolderRequestBodySharedLinkAccessField",
  });
}
export function serializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(
  val: AddShareLinkToFolderRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): AddShareLinkToFolderRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "AddShareLinkToFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "AddShareLinkToFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "AddShareLinkToFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies AddShareLinkToFolderRequestBodySharedLinkPermissionsField;
}
export function serializeAddShareLinkToFolderRequestBodySharedLinkField(
  val: AddShareLinkToFolderRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeAddShareLinkToFolderRequestBodySharedLinkAccessField(
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
        : serializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeAddShareLinkToFolderRequestBodySharedLinkField(
  val: SerializedData,
): AddShareLinkToFolderRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToFolderRequestBodySharedLinkField"',
    });
  }
  const access:
    | undefined
    | AddShareLinkToFolderRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeAddShareLinkToFolderRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "AddShareLinkToFolderRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "AddShareLinkToFolderRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "AddShareLinkToFolderRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | AddShareLinkToFolderRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies AddShareLinkToFolderRequestBodySharedLinkField;
}
export function serializeAddShareLinkToFolderRequestBody(
  val: AddShareLinkToFolderRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeAddShareLinkToFolderRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeAddShareLinkToFolderRequestBody(
  val: SerializedData,
): AddShareLinkToFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddShareLinkToFolderRequestBody"',
    });
  }
  const sharedLink: undefined | AddShareLinkToFolderRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeAddShareLinkToFolderRequestBodySharedLinkField(
          val.shared_link,
        );
  return { sharedLink: sharedLink } satisfies AddShareLinkToFolderRequestBody;
}
export function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(
  val: UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField {
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
      "Can't deserialize UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(
  val: UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField;
}
export function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(
  val: UpdateSharedLinkOnFolderRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(
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
        : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(
  val: SerializedData,
): UpdateSharedLinkOnFolderRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnFolderRequestBodySharedLinkField"',
    });
  }
  const access:
    | undefined
    | UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateSharedLinkOnFolderRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | UpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies UpdateSharedLinkOnFolderRequestBodySharedLinkField;
}
export function serializeUpdateSharedLinkOnFolderRequestBody(
  val: UpdateSharedLinkOnFolderRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeUpdateSharedLinkOnFolderRequestBody(
  val: SerializedData,
): UpdateSharedLinkOnFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateSharedLinkOnFolderRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | UpdateSharedLinkOnFolderRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(
          val.shared_link,
        );
  return {
    sharedLink: sharedLink,
  } satisfies UpdateSharedLinkOnFolderRequestBody;
}
export function serializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(
  val: RemoveSharedLinkFromFolderRequestBodySharedLinkField,
): SerializedData {
  return {};
}
export function deserializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(
  val: SerializedData,
): RemoveSharedLinkFromFolderRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RemoveSharedLinkFromFolderRequestBodySharedLinkField"',
    });
  }
  return {} satisfies RemoveSharedLinkFromFolderRequestBodySharedLinkField;
}
export function serializeRemoveSharedLinkFromFolderRequestBody(
  val: RemoveSharedLinkFromFolderRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeRemoveSharedLinkFromFolderRequestBody(
  val: SerializedData,
): RemoveSharedLinkFromFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RemoveSharedLinkFromFolderRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | RemoveSharedLinkFromFolderRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(
          val.shared_link,
        );
  return {
    sharedLink: sharedLink,
  } satisfies RemoveSharedLinkFromFolderRequestBody;
}
