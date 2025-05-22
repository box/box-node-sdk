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
import { isBrowser } from '../internal/utils.js';
import { CancellationController } from '../internal/utils.js';
import { createCancellationController } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetFileByIdOptionals {
  readonly queryParams: GetFileByIdQueryParams =
    {} satisfies GetFileByIdQueryParams;
  readonly headers: GetFileByIdHeaders = new GetFileByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileByIdOptionals,
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
export interface GetFileByIdOptionalsInput {
  readonly queryParams?: GetFileByIdQueryParams;
  readonly headers?: GetFileByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFileByIdOptionals {
  readonly requestBody: UpdateFileByIdRequestBody =
    {} satisfies UpdateFileByIdRequestBody;
  readonly queryParams: UpdateFileByIdQueryParams =
    {} satisfies UpdateFileByIdQueryParams;
  readonly headers: UpdateFileByIdHeaders = new UpdateFileByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFileByIdOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateFileByIdOptionals,
          'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
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
export interface UpdateFileByIdOptionalsInput {
  readonly requestBody?: UpdateFileByIdRequestBody;
  readonly queryParams?: UpdateFileByIdQueryParams;
  readonly headers?: UpdateFileByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFileByIdOptionals {
  readonly headers: DeleteFileByIdHeaders = new DeleteFileByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteFileByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<DeleteFileByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteFileByIdOptionalsInput {
  readonly headers?: DeleteFileByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CopyFileOptionals {
  readonly queryParams: CopyFileQueryParams = {} satisfies CopyFileQueryParams;
  readonly headers: CopyFileHeaders = new CopyFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CopyFileOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CopyFileOptionals, 'queryParams' | 'headers' | 'cancellationToken'>
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
export interface CopyFileOptionalsInput {
  readonly queryParams?: CopyFileQueryParams;
  readonly headers?: CopyFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileThumbnailUrlOptionals {
  readonly queryParams: GetFileThumbnailUrlQueryParams =
    {} satisfies GetFileThumbnailUrlQueryParams;
  readonly headers: GetFileThumbnailUrlHeaders = new GetFileThumbnailUrlHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileThumbnailUrlOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileThumbnailUrlOptionals,
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
export interface GetFileThumbnailUrlOptionalsInput {
  readonly queryParams?: GetFileThumbnailUrlQueryParams;
  readonly headers?: GetFileThumbnailUrlHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileThumbnailByIdOptionals {
  readonly queryParams: GetFileThumbnailByIdQueryParams =
    {} satisfies GetFileThumbnailByIdQueryParams;
  readonly headers: GetFileThumbnailByIdHeaders =
    new GetFileThumbnailByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileThumbnailByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileThumbnailByIdOptionals,
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
export interface GetFileThumbnailByIdOptionalsInput {
  readonly queryParams?: GetFileThumbnailByIdQueryParams;
  readonly headers?: GetFileThumbnailByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetFileByIdQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested.
   *
   * Additionally this field can be used to query any metadata
   * applied to the file by specifying the `metadata` field as well
   * as the scope and key of the template to retrieve, for example
   * `?fields=metadata.enterprise_12345.contractTemplate`. */
  readonly fields?: readonly string[];
}
export class GetFileByIdHeaders {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * The URL, and optional password, for the shared link of this item.
   *
   * This header can be used to access items that have not been
   * explicitly shared with a user.
   *
   * Use the format `shared_link=[link]` or if a password is required then
   * use `shared_link=[link]&shared_link_password=[password]`.
   *
   * This header can be used on the file or folder shared, as well as on any files
   * or folders nested within the item. */
  readonly boxapi?: string;
  /**
   * A header required to request specific `representations`
   * of a file. Use this in combination with the `fields` query
   * parameter to request a specific file representation.
   *
   * The general format for these representations is
   * `X-Rep-Hints: [...]` where `[...]` is one or many
   * hints in the format `[fileType?query]`.
   *
   * For example, to request a `png` representation in `32x32`
   * as well as `64x64` pixel dimensions provide the following
   * hints.
   *
   * `x-rep-hints: [jpg?dimensions=32x32][jpg?dimensions=64x64]`
   *
   * Additionally, a `text` representation is available for all
   * document file types in Box using the `[extracted_text]`
   * representation.
   *
   * `x-rep-hints: [extracted_text]` */
  readonly xRepHints?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifNoneMatch !== undefined) {
      this.ifNoneMatch = fields.ifNoneMatch;
    }
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.xRepHints !== undefined) {
      this.xRepHints = fields.xRepHints;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileByIdHeadersInput {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * The URL, and optional password, for the shared link of this item.
   *
   * This header can be used to access items that have not been
   * explicitly shared with a user.
   *
   * Use the format `shared_link=[link]` or if a password is required then
   * use `shared_link=[link]&shared_link_password=[password]`.
   *
   * This header can be used on the file or folder shared, as well as on any files
   * or folders nested within the item. */
  readonly boxapi?: string;
  /**
   * A header required to request specific `representations`
   * of a file. Use this in combination with the `fields` query
   * parameter to request a specific file representation.
   *
   * The general format for these representations is
   * `X-Rep-Hints: [...]` where `[...]` is one or many
   * hints in the format `[fileType?query]`.
   *
   * For example, to request a `png` representation in `32x32`
   * as well as `64x64` pixel dimensions provide the following
   * hints.
   *
   * `x-rep-hints: [jpg?dimensions=32x32][jpg?dimensions=64x64]`
   *
   * Additionally, a `text` representation is available for all
   * document file types in Box using the `[extracted_text]`
   * representation.
   *
   * `x-rep-hints: [extracted_text]` */
  readonly xRepHints?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateFileByIdRequestBodyParentField {
  /**
   * The ID of parent item */
  readonly id?: string;
  /**
   * The input for `user_id` is optional. Moving to non-root folder is not allowed when `user_id` is present. Parent folder id should be zero when `user_id` is provided. */
  readonly userId?: string;
  readonly rawData?: SerializedData;
}
export type UpdateFileByIdRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateFileByIdRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateFileByIdRequestBodySharedLinkField {
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
  readonly access?: UpdateFileByIdRequestBodySharedLinkAccessField;
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
   * as vanity URLs are a lot easier to guess than regular shared links. */
  readonly vanityName?: string;
  /**
   * The timestamp at which this shared link will
   * expire. This field can only be set by
   * users with paid accounts. */
  readonly unsharedAt?: DateTime;
  readonly permissions?: UpdateFileByIdRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export type UpdateFileByIdRequestBodyLockAccessField = 'lock' | string;
export interface UpdateFileByIdRequestBodyLockField {
  /**
   * The type of this object. */
  readonly access?: UpdateFileByIdRequestBodyLockAccessField;
  /**
   * Defines the time at which the lock expires. */
  readonly expiresAt?: DateTime;
  /**
   * Defines if the file can be downloaded while it is locked. */
  readonly isDownloadPrevented?: boolean;
  readonly rawData?: SerializedData;
}
export type UpdateFileByIdRequestBodyPermissionsCanDownloadField =
  | 'open'
  | 'company'
  | string;
export interface UpdateFileByIdRequestBodyPermissionsField {
  /**
   * Defines who is allowed to download this file. The possible
   * values are either `open` for everyone or `company` for
   * the other members of the user's enterprise.
   *
   * This setting overrides the download permissions that are
   * normally part of the `role` of a collaboration. When set to
   * `company`, this essentially removes the download option for
   * external users with `viewer` or `editor` a roles. */
  readonly canDownload?: UpdateFileByIdRequestBodyPermissionsCanDownloadField;
  readonly rawData?: SerializedData;
}
export interface UpdateFileByIdRequestBodyCollectionsField {
  /**
   * The unique identifier for this object */
  readonly id?: string;
  /**
   * The type for this object */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export interface UpdateFileByIdRequestBody {
  /**
   * An optional different name for the file. This can be used to
   * rename the file. */
  readonly name?: string;
  /**
   * The description for a file. This can be seen in the right-hand sidebar panel
   * when viewing a file in the Box web app. Additionally, this index is used in
   * the search index of the file, allowing users to find the file by the content
   * in the description. */
  readonly description?: string;
  readonly parent?: UpdateFileByIdRequestBodyParentField;
  readonly sharedLink?: UpdateFileByIdRequestBodySharedLinkField | null;
  /**
   * Defines a lock on an item. This prevents the item from being
   * moved, renamed, or otherwise changed by anyone other than the user
   * who created the lock.
   *
   * Set this to `null` to remove the lock. */
  readonly lock?: UpdateFileByIdRequestBodyLockField | null;
  /**
   * The retention expiration timestamp for the given file. This
   * date cannot be shortened once set on a file. */
  readonly dispositionAt?: DateTime;
  /**
   * Defines who can download a file. */
  readonly permissions?: UpdateFileByIdRequestBodyPermissionsField;
  /**
   * An array of collections to make this file
   * a member of. Currently
   * we only support the `favorites` collection.
   *
   * To get the ID for a collection, use the
   * [List all collections][1] endpoint.
   *
   * Passing an empty array `[]` or `null` will remove
   * the file from all collections.
   *
   * [1]: e://get-collections */
  readonly collections?:
    | readonly UpdateFileByIdRequestBodyCollectionsField[]
    | null;
  /**
   * The tags for this item. These tags are shown in
   * the Box web app and mobile apps next to an item.
   *
   * To add or remove a tag, retrieve the item's current tags,
   * modify them, and then update this field.
   *
   * There is a limit of 100 tags per item, and 10,000
   * unique tags per enterprise. */
  readonly tags?: readonly string[];
  readonly rawData?: SerializedData;
}
export interface UpdateFileByIdQueryParams {
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
export class UpdateFileByIdHeaders {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateFileByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFileByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFileByIdHeadersInput {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteFileByIdHeaders {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteFileByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFileByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFileByIdHeadersInput {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CopyFileRequestBodyParentField {
  /**
   * The ID of folder to copy the file to. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CopyFileRequestBody {
  /**
   * An optional new name for the copied file.
   *
   * There are some restrictions to the file name. Names containing
   * non-printable ASCII characters, forward and backward slashes
   * (`/`, `\`), and protected names like `.` and `..` are
   * automatically sanitized by removing the non-allowed
   * characters. */
  readonly name?: string;
  /**
   * An optional ID of the specific file version to copy. */
  readonly version?: string;
  /**
   * The destination folder to copy the file to. */
  readonly parent: CopyFileRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export interface CopyFileQueryParams {
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
export class CopyFileHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CopyFileHeaders, 'extraHeaders'> &
      Partial<Pick<CopyFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CopyFileHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetFileThumbnailUrlExtension = 'png' | 'jpg' | string;
export interface GetFileThumbnailUrlQueryParams {
  /**
   * The minimum height of the thumbnail */
  readonly minHeight?: number;
  /**
   * The minimum width of the thumbnail */
  readonly minWidth?: number;
  /**
   * The maximum height of the thumbnail */
  readonly maxHeight?: number;
  /**
   * The maximum width of the thumbnail */
  readonly maxWidth?: number;
}
export class GetFileThumbnailUrlHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileThumbnailUrlHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileThumbnailUrlHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileThumbnailUrlHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetFileThumbnailByIdExtension = 'png' | 'jpg' | string;
export interface GetFileThumbnailByIdQueryParams {
  /**
   * The minimum height of the thumbnail */
  readonly minHeight?: number;
  /**
   * The minimum width of the thumbnail */
  readonly minWidth?: number;
  /**
   * The maximum height of the thumbnail */
  readonly maxHeight?: number;
  /**
   * The maximum width of the thumbnail */
  readonly maxWidth?: number;
}
export class GetFileThumbnailByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileThumbnailByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileThumbnailByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileThumbnailByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FilesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FilesManager,
      | 'networkSession'
      | 'getFileById'
      | 'updateFileById'
      | 'deleteFileById'
      | 'copyFile'
      | 'getFileThumbnailUrl'
      | 'getFileThumbnailById'
    > &
      Partial<Pick<FilesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves the details about a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async getFileById(
    fileId: string,
    optionalsInput: GetFileByIdOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: GetFileByIdOptionals = new GetFileByIdOptionals({
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
        ['if-none-match']: toString(headers.ifNoneMatch) as string,
        ['boxapi']: toString(headers.boxapi) as string,
        ['x-rep-hints']: toString(headers.xRepHints) as string,
      },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
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
     * Updates a file. This can be used to rename or move a file,
     * create a shared link, or lock a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {UpdateFileByIdOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async updateFileById(
    fileId: string,
    optionalsInput: UpdateFileByIdOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: UpdateFileByIdOptionals = new UpdateFileByIdOptionals({
      requestBody: optionalsInput.requestBody,
      queryParams: optionalsInput.queryParams,
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const requestBody: any = optionals.requestBody;
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
      ...{ ['if-match']: toString(headers.ifMatch) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateFileByIdRequestBody(requestBody),
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
     * Deletes a file, either permanently or by moving it to
     * the trash.
     *
     * The the enterprise settings determine whether the item will
     * be permanently deleted from Box or moved to the trash.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DeleteFileByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFileById(
    fileId: string,
    optionalsInput: DeleteFileByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFileByIdOptionals = new DeleteFileByIdOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['if-match']: toString(headers.ifMatch) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
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
     * Creates a copy of a file.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {CopyFileRequestBody} requestBody Request body of copyFile method
     * @param {CopyFileOptionalsInput} optionalsInput
     * @returns {Promise<FileFull>}
     */
  async copyFile(
    fileId: string,
    requestBody: CopyFileRequestBody,
    optionalsInput: CopyFileOptionalsInput = {},
  ): Promise<FileFull> {
    const optionals: CopyFileOptionals = new CopyFileOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/copy',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCopyFileRequestBody(requestBody),
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
     * Retrieves a thumbnail, or smaller image representation, of a file.
     *
     * Sizes of `32x32`,`64x64`, `128x128`, and `256x256` can be returned in
     * the `.png` format and sizes of `32x32`, `160x160`, and `320x320`
     * can be returned in the `.jpg` format.
     *
     * Thumbnails can be generated for the image and video file formats listed
     * [found on our community site][1].
     *
     * [1]: https://community.box.com/t5/Migrating-and-Previewing-Content/File-Types-and-Fonts-Supported-in-Box-Content-Preview/ta-p/327
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileThumbnailUrlExtension} extension The file format for the thumbnail
    Example: "png"
     * @param {GetFileThumbnailUrlOptionalsInput} optionalsInput
     * @returns {Promise<string>}
     */
  async getFileThumbnailUrl(
    fileId: string,
    extension: GetFileThumbnailUrlExtension,
    optionalsInput: GetFileThumbnailUrlOptionalsInput = {},
  ): Promise<string> {
    const optionals: GetFileThumbnailUrlOptionals =
      new GetFileThumbnailUrlOptionals({
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
      ['min_height']: toString(queryParams.minHeight) as string,
      ['min_width']: toString(queryParams.minWidth) as string,
      ['max_height']: toString(queryParams.maxHeight) as string,
      ['max_width']: toString(queryParams.maxWidth) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const cancellationController: CancellationController =
      createCancellationController();
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/thumbnail.',
            toString(extension) as string,
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken:
            cancellationToken == void 0
              ? cancellationController.signal
              : cancellationToken,
          followRedirects: false,
        }),
      );
    if (isBrowser()) {
      cancellationController.abort();
      if (response.url == void 0) {
        throw new BoxSdkError({ message: 'Unable to get response URL' });
      }
      return response.url;
    }
    if ('location' in response.headers) {
      return response.headers.location;
    }
    if ('Location' in response.headers) {
      return response.headers.Location;
    }
    throw new BoxSdkError({ message: 'No location header in response' });
  }
  /**
     * Retrieves a thumbnail, or smaller image representation, of a file.
     *
     * Sizes of `32x32`,`64x64`, `128x128`, and `256x256` can be returned in
     * the `.png` format and sizes of `32x32`, `160x160`, and `320x320`
     * can be returned in the `.jpg` format.
     *
     * Thumbnails can be generated for the image and video file formats listed
     * [found on our community site][1].
     *
     * [1]: https://community.box.com/t5/Migrating-and-Previewing-Content/File-Types-and-Fonts-Supported-in-Box-Content-Preview/ta-p/327
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileThumbnailByIdExtension} extension The file format for the thumbnail
    Example: "png"
     * @param {GetFileThumbnailByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined | ByteStream>}
     */
  async getFileThumbnailById(
    fileId: string,
    extension: GetFileThumbnailByIdExtension,
    optionalsInput: GetFileThumbnailByIdOptionalsInput = {},
  ): Promise<undefined | ByteStream> {
    const optionals: GetFileThumbnailByIdOptionals =
      new GetFileThumbnailByIdOptionals({
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
      ['min_height']: toString(queryParams.minHeight) as string,
      ['min_width']: toString(queryParams.minWidth) as string,
      ['max_height']: toString(queryParams.maxHeight) as string,
      ['max_width']: toString(queryParams.maxWidth) as string,
    });
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
            '/thumbnail.',
            toString(extension) as string,
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'binary' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    if ((toString(response.status) as string) == '202') {
      return void 0;
    }
    return response.content;
  }
}
export interface FilesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateFileByIdRequestBodyParentField(
  val: UpdateFileByIdRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id, ['user_id']: val.userId };
}
export function deserializeUpdateFileByIdRequestBodyParentField(
  val: SerializedData,
): UpdateFileByIdRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileByIdRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateFileByIdRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.user_id == void 0) && !sdIsString(val.user_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "user_id" of type "UpdateFileByIdRequestBodyParentField"',
    });
  }
  const userId: undefined | string =
    val.user_id == void 0 ? void 0 : val.user_id;
  return {
    id: id,
    userId: userId,
  } satisfies UpdateFileByIdRequestBodyParentField;
}
export function serializeUpdateFileByIdRequestBodySharedLinkAccessField(
  val: UpdateFileByIdRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateFileByIdRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateFileByIdRequestBodySharedLinkAccessField {
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
    message: "Can't deserialize UpdateFileByIdRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateFileByIdRequestBodySharedLinkPermissionsField(
  val: UpdateFileByIdRequestBodySharedLinkPermissionsField,
): SerializedData {
  return { ['can_download']: val.canDownload };
}
export function deserializeUpdateFileByIdRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): UpdateFileByIdRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFileByIdRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "UpdateFileByIdRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  return {
    canDownload: canDownload,
  } satisfies UpdateFileByIdRequestBodySharedLinkPermissionsField;
}
export function serializeUpdateFileByIdRequestBodySharedLinkField(
  val: UpdateFileByIdRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateFileByIdRequestBodySharedLinkAccessField(val.access),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeUpdateFileByIdRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeUpdateFileByIdRequestBodySharedLinkField(
  val: SerializedData,
): UpdateFileByIdRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileByIdRequestBodySharedLinkField"',
    });
  }
  const access: undefined | UpdateFileByIdRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodySharedLinkAccessField(val.access);
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateFileByIdRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateFileByIdRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateFileByIdRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | UpdateFileByIdRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies UpdateFileByIdRequestBodySharedLinkField;
}
export function serializeUpdateFileByIdRequestBodyLockAccessField(
  val: UpdateFileByIdRequestBodyLockAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateFileByIdRequestBodyLockAccessField(
  val: SerializedData,
): UpdateFileByIdRequestBodyLockAccessField {
  if (val == 'lock') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateFileByIdRequestBodyLockAccessField",
  });
}
export function serializeUpdateFileByIdRequestBodyLockField(
  val: UpdateFileByIdRequestBodyLockField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateFileByIdRequestBodyLockAccessField(val.access),
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['is_download_prevented']: val.isDownloadPrevented,
  };
}
export function deserializeUpdateFileByIdRequestBodyLockField(
  val: SerializedData,
): UpdateFileByIdRequestBodyLockField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileByIdRequestBodyLockField"',
    });
  }
  const access: undefined | UpdateFileByIdRequestBodyLockAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodyLockAccessField(val.access);
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "UpdateFileByIdRequestBodyLockField"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (
    !(val.is_download_prevented == void 0) &&
    !sdIsBoolean(val.is_download_prevented)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_download_prevented" of type "UpdateFileByIdRequestBodyLockField"',
    });
  }
  const isDownloadPrevented: undefined | boolean =
    val.is_download_prevented == void 0 ? void 0 : val.is_download_prevented;
  return {
    access: access,
    expiresAt: expiresAt,
    isDownloadPrevented: isDownloadPrevented,
  } satisfies UpdateFileByIdRequestBodyLockField;
}
export function serializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(
  val: UpdateFileByIdRequestBodyPermissionsCanDownloadField,
): SerializedData {
  return val;
}
export function deserializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(
  val: SerializedData,
): UpdateFileByIdRequestBodyPermissionsCanDownloadField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateFileByIdRequestBodyPermissionsCanDownloadField",
  });
}
export function serializeUpdateFileByIdRequestBodyPermissionsField(
  val: UpdateFileByIdRequestBodyPermissionsField,
): SerializedData {
  return {
    ['can_download']:
      val.canDownload == void 0
        ? val.canDownload
        : serializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(
            val.canDownload,
          ),
  };
}
export function deserializeUpdateFileByIdRequestBodyPermissionsField(
  val: SerializedData,
): UpdateFileByIdRequestBodyPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFileByIdRequestBodyPermissionsField"',
    });
  }
  const canDownload:
    | undefined
    | UpdateFileByIdRequestBodyPermissionsCanDownloadField =
    val.can_download == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(
          val.can_download,
        );
  return {
    canDownload: canDownload,
  } satisfies UpdateFileByIdRequestBodyPermissionsField;
}
export function serializeUpdateFileByIdRequestBodyCollectionsField(
  val: UpdateFileByIdRequestBodyCollectionsField,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeUpdateFileByIdRequestBodyCollectionsField(
  val: SerializedData,
): UpdateFileByIdRequestBodyCollectionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFileByIdRequestBodyCollectionsField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateFileByIdRequestBodyCollectionsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "UpdateFileByIdRequestBodyCollectionsField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return {
    id: id,
    type: type,
  } satisfies UpdateFileByIdRequestBodyCollectionsField;
}
export function serializeUpdateFileByIdRequestBody(
  val: UpdateFileByIdRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['description']: val.description,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeUpdateFileByIdRequestBodyParentField(val.parent),
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateFileByIdRequestBodySharedLinkField(val.sharedLink),
    ['lock']:
      val.lock == void 0
        ? val.lock
        : serializeUpdateFileByIdRequestBodyLockField(val.lock),
    ['disposition_at']:
      val.dispositionAt == void 0
        ? val.dispositionAt
        : serializeDateTime(val.dispositionAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeUpdateFileByIdRequestBodyPermissionsField(val.permissions),
    ['collections']:
      val.collections == void 0
        ? val.collections
        : (val.collections.map(function (
            item: UpdateFileByIdRequestBodyCollectionsField,
          ): SerializedData {
            return serializeUpdateFileByIdRequestBodyCollectionsField(item);
          }) as readonly any[]),
    ['tags']:
      val.tags == void 0
        ? val.tags
        : (val.tags.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeUpdateFileByIdRequestBody(
  val: SerializedData,
): UpdateFileByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFileByIdRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateFileByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateFileByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const parent: undefined | UpdateFileByIdRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodyParentField(val.parent);
  const sharedLink: undefined | UpdateFileByIdRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodySharedLinkField(val.shared_link);
  const lock: undefined | UpdateFileByIdRequestBodyLockField =
    val.lock == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodyLockField(val.lock);
  if (!(val.disposition_at == void 0) && !sdIsString(val.disposition_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "disposition_at" of type "UpdateFileByIdRequestBody"',
    });
  }
  const dispositionAt: undefined | DateTime =
    val.disposition_at == void 0
      ? void 0
      : deserializeDateTime(val.disposition_at);
  const permissions: undefined | UpdateFileByIdRequestBodyPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateFileByIdRequestBodyPermissionsField(val.permissions);
  if (!(val.collections == void 0) && !sdIsList(val.collections)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "collections" of type "UpdateFileByIdRequestBody"',
    });
  }
  const collections:
    | undefined
    | readonly UpdateFileByIdRequestBodyCollectionsField[] =
    val.collections == void 0
      ? void 0
      : sdIsList(val.collections)
        ? (val.collections.map(function (
            itm: SerializedData,
          ): UpdateFileByIdRequestBodyCollectionsField {
            return deserializeUpdateFileByIdRequestBodyCollectionsField(itm);
          }) as readonly any[])
        : [];
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "tags" of type "UpdateFileByIdRequestBody"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "UpdateFileByIdRequestBody"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    name: name,
    description: description,
    parent: parent,
    sharedLink: sharedLink,
    lock: lock,
    dispositionAt: dispositionAt,
    permissions: permissions,
    collections: collections,
    tags: tags,
  } satisfies UpdateFileByIdRequestBody;
}
export function serializeCopyFileRequestBodyParentField(
  val: CopyFileRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCopyFileRequestBodyParentField(
  val: SerializedData,
): CopyFileRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CopyFileRequestBodyParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CopyFileRequestBodyParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CopyFileRequestBodyParentField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CopyFileRequestBodyParentField;
}
export function serializeCopyFileRequestBody(
  val: CopyFileRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['version']: val.version,
    ['parent']: serializeCopyFileRequestBodyParentField(val.parent),
  };
}
export function deserializeCopyFileRequestBody(
  val: SerializedData,
): CopyFileRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CopyFileRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CopyFileRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.version == void 0) && !sdIsString(val.version)) {
    throw new BoxSdkError({
      message: 'Expecting string for "version" of type "CopyFileRequestBody"',
    });
  }
  const version: undefined | string =
    val.version == void 0 ? void 0 : val.version;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "parent" of type "CopyFileRequestBody" to be defined',
    });
  }
  const parent: CopyFileRequestBodyParentField =
    deserializeCopyFileRequestBodyParentField(val.parent);
  return {
    name: name,
    version: version,
    parent: parent,
  } satisfies CopyFileRequestBody;
}
export function serializeGetFileThumbnailUrlExtension(
  val: GetFileThumbnailUrlExtension,
): SerializedData {
  return val;
}
export function deserializeGetFileThumbnailUrlExtension(
  val: SerializedData,
): GetFileThumbnailUrlExtension {
  if (val == 'png') {
    return val;
  }
  if (val == 'jpg') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFileThumbnailUrlExtension",
  });
}
export function serializeGetFileThumbnailByIdExtension(
  val: GetFileThumbnailByIdExtension,
): SerializedData {
  return val;
}
export function deserializeGetFileThumbnailByIdExtension(
  val: SerializedData,
): GetFileThumbnailByIdExtension {
  if (val == 'png') {
    return val;
  }
  if (val == 'jpg') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFileThumbnailByIdExtension",
  });
}
