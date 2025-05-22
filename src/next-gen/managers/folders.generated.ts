import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeItems } from '../schemas/items.generated.js';
import { deserializeItems } from '../schemas/items.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { Items } from '../schemas/items.generated.js';
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
export class GetFolderByIdOptionals {
  readonly queryParams: GetFolderByIdQueryParams =
    {} satisfies GetFolderByIdQueryParams;
  readonly headers: GetFolderByIdHeaders = new GetFolderByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFolderByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFolderByIdOptionals,
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
export interface GetFolderByIdOptionalsInput {
  readonly queryParams?: GetFolderByIdQueryParams;
  readonly headers?: GetFolderByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateFolderByIdOptionals {
  readonly requestBody: UpdateFolderByIdRequestBody =
    {} satisfies UpdateFolderByIdRequestBody;
  readonly queryParams: UpdateFolderByIdQueryParams =
    {} satisfies UpdateFolderByIdQueryParams;
  readonly headers: UpdateFolderByIdHeaders = new UpdateFolderByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateFolderByIdOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateFolderByIdOptionals,
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
export interface UpdateFolderByIdOptionalsInput {
  readonly requestBody?: UpdateFolderByIdRequestBody;
  readonly queryParams?: UpdateFolderByIdQueryParams;
  readonly headers?: UpdateFolderByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteFolderByIdOptionals {
  readonly queryParams: DeleteFolderByIdQueryParams =
    {} satisfies DeleteFolderByIdQueryParams;
  readonly headers: DeleteFolderByIdHeaders = new DeleteFolderByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteFolderByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteFolderByIdOptionals,
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
export interface DeleteFolderByIdOptionalsInput {
  readonly queryParams?: DeleteFolderByIdQueryParams;
  readonly headers?: DeleteFolderByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFolderItemsOptionals {
  readonly queryParams: GetFolderItemsQueryParams =
    {} satisfies GetFolderItemsQueryParams;
  readonly headers: GetFolderItemsHeaders = new GetFolderItemsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFolderItemsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFolderItemsOptionals,
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
export interface GetFolderItemsOptionalsInput {
  readonly queryParams?: GetFolderItemsQueryParams;
  readonly headers?: GetFolderItemsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateFolderOptionals {
  readonly queryParams: CreateFolderQueryParams =
    {} satisfies CreateFolderQueryParams;
  readonly headers: CreateFolderHeaders = new CreateFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateFolderOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateFolderOptionals,
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
export interface CreateFolderOptionalsInput {
  readonly queryParams?: CreateFolderQueryParams;
  readonly headers?: CreateFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CopyFolderOptionals {
  readonly queryParams: CopyFolderQueryParams =
    {} satisfies CopyFolderQueryParams;
  readonly headers: CopyFolderHeaders = new CopyFolderHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CopyFolderOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CopyFolderOptionals,
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
export interface CopyFolderOptionalsInput {
  readonly queryParams?: CopyFolderQueryParams;
  readonly headers?: CopyFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetFolderByIdQueryParamsSortField =
  | 'id'
  | 'name'
  | 'date'
  | 'size'
  | string;
export type GetFolderByIdQueryParamsDirectionField = 'ASC' | 'DESC' | string;
export interface GetFolderByIdQueryParams {
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
  /**
   * Defines the **second** attribute by which items
   * are sorted.
   *
   * The folder type affects the way the items
   * are sorted:
   *
   *   * **Standard folder**:
   *   Items are always sorted by
   *   their `type` first, with
   *   folders listed before files,
   *   and files listed
   *   before web links.
   *
   *   * **Root folder**:
   *   This parameter is not supported
   *   for marker-based pagination
   *   on the root folder
   *
   *   (the folder with an `id` of `0`).
   *
   *   * **Shared folder with parent path
   *   to the associated folder visible to
   *   the collaborator**:
   *   Items are always sorted by
   *   their `type` first, with
   *   folders listed before files,
   *   and files listed
   *   before web links. */
  readonly sort?: GetFolderByIdQueryParamsSortField;
  /**
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetFolderByIdQueryParamsDirectionField;
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetFolderByIdHeaders {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderByIdHeaders, 'extraHeaders'>>,
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
export interface GetFolderByIdHeadersInput {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateFolderByIdRequestBodySyncStateField =
  | 'synced'
  | 'not_synced'
  | 'partially_synced'
  | string;
export interface UpdateFolderByIdRequestBodyParentField {
  /**
   * The ID of parent item */
  readonly id?: string;
  /**
   * The input for `user_id` is optional. Moving to non-root folder is not allowed when `user_id` is present. Parent folder id should be zero when `user_id` is provided. */
  readonly userId?: string;
  readonly rawData?: SerializedData;
}
export type UpdateFolderByIdRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateFolderByIdRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateFolderByIdRequestBodySharedLinkField {
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
  readonly access?: UpdateFolderByIdRequestBodySharedLinkAccessField;
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
  readonly permissions?: UpdateFolderByIdRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export type UpdateFolderByIdRequestBodyFolderUploadEmailAccessField =
  | 'open'
  | 'collaborators'
  | string;
export interface UpdateFolderByIdRequestBodyFolderUploadEmailField {
  /**
   * When this parameter has been set, users can email files
   * to the email address that has been automatically
   * created for this folder.
   *
   * To create an email address, set this property either when
   * creating or updating the folder.
   *
   * When set to `collaborators`, only emails from registered email
   * addresses for collaborators will be accepted. This includes
   * any email aliases a user might have registered.
   *
   * When set to `open` it will accept emails from any email
   * address. */
  readonly access?: UpdateFolderByIdRequestBodyFolderUploadEmailAccessField;
  readonly rawData?: SerializedData;
}
export interface UpdateFolderByIdRequestBodyCollectionsField {
  /**
   * The unique identifier for this object */
  readonly id?: string;
  /**
   * The type for this object */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export interface UpdateFolderByIdRequestBody {
  /**
   * The optional new name for this folder. */
  readonly name?: string;
  /**
   * The optional description of this folder */
  readonly description?: string;
  /**
   * Specifies whether a folder should be synced to a
   * user's device or not. This is used by Box Sync
   * (discontinued) and is not used by Box Drive. */
  readonly syncState?: UpdateFolderByIdRequestBodySyncStateField;
  /**
   * Specifies if users who are not the owner
   * of the folder can invite new collaborators to the folder. */
  readonly canNonOwnersInvite?: boolean;
  readonly parent?: UpdateFolderByIdRequestBodyParentField;
  readonly sharedLink?: UpdateFolderByIdRequestBodySharedLinkField;
  readonly folderUploadEmail?: UpdateFolderByIdRequestBodyFolderUploadEmailField | null;
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
  /**
   * Specifies if new invites to this folder are restricted to users
   * within the enterprise. This does not affect existing
   * collaborations. */
  readonly isCollaborationRestrictedToEnterprise?: boolean;
  /**
   * An array of collections to make this folder
   * a member of. Currently
   * we only support the `favorites` collection.
   *
   * To get the ID for a collection, use the
   * [List all collections][1] endpoint.
   *
   * Passing an empty array `[]` or `null` will remove
   * the folder from all collections.
   *
   * [1]: e://get-collections */
  readonly collections?:
    | readonly UpdateFolderByIdRequestBodyCollectionsField[]
    | null;
  /**
   * Restricts collaborators who are not the owner of
   * this folder from viewing other collaborations on
   * this folder.
   *
   * It also restricts non-owners from inviting new
   * collaborators.
   *
   * When setting this field to `false`, it is required
   * to also set `can_non_owners_invite_collaborators` to
   * `false` if it has not already been set. */
  readonly canNonOwnersViewCollaborators?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateFolderByIdQueryParams {
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
export class UpdateFolderByIdHeaders {
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
    fields: Omit<UpdateFolderByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateFolderByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateFolderByIdHeadersInput {
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
export interface DeleteFolderByIdQueryParams {
  /**
   * Delete a folder that is not empty by recursively deleting the
   * folder and all of its content. */
  readonly recursive?: boolean;
}
export class DeleteFolderByIdHeaders {
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
    fields: Omit<DeleteFolderByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteFolderByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifMatch !== undefined) {
      this.ifMatch = fields.ifMatch;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteFolderByIdHeadersInput {
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
export type GetFolderItemsQueryParamsSortField =
  | 'id'
  | 'name'
  | 'date'
  | 'size'
  | string;
export type GetFolderItemsQueryParamsDirectionField = 'ASC' | 'DESC' | string;
export interface GetFolderItemsQueryParams {
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
  /**
   * Specifies whether to use marker-based pagination instead of
   * offset-based pagination. Only one pagination method can
   * be used at a time.
   *
   * By setting this value to true, the API will return a `marker` field
   * that can be passed as a parameter to this endpoint to get the next
   * page of the response. */
  readonly usemarker?: boolean;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the **second** attribute by which items
   * are sorted.
   *
   * The folder type affects the way the items
   * are sorted:
   *
   *   * **Standard folder**:
   *   Items are always sorted by
   *   their `type` first, with
   *   folders listed before files,
   *   and files listed
   *   before web links.
   *
   *   * **Root folder**:
   *   This parameter is not supported
   *   for marker-based pagination
   *   on the root folder
   *
   *   (the folder with an `id` of `0`).
   *
   *   * **Shared folder with parent path
   *   to the associated folder visible to
   *   the collaborator**:
   *   Items are always sorted by
   *   their `type` first, with
   *   folders listed before files,
   *   and files listed
   *   before web links. */
  readonly sort?: GetFolderItemsQueryParamsSortField;
  /**
   * The direction to sort results in. This can be either in alphabetical ascending
   * (`ASC`) or descending (`DESC`) order. */
  readonly direction?: GetFolderItemsQueryParamsDirectionField;
}
export class GetFolderItemsHeaders {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderItemsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderItemsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderItemsHeadersInput {
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
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateFolderRequestBodyParentField {
  /**
   * The ID of parent folder */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type CreateFolderRequestBodyFolderUploadEmailAccessField =
  | 'open'
  | 'collaborators'
  | string;
export interface CreateFolderRequestBodyFolderUploadEmailField {
  /**
   * When this parameter has been set, users can email files
   * to the email address that has been automatically
   * created for this folder.
   *
   * To create an email address, set this property either when
   * creating or updating the folder.
   *
   * When set to `collaborators`, only emails from registered email
   * addresses for collaborators will be accepted. This includes
   * any email aliases a user might have registered.
   *
   * When set to `open` it will accept emails from any email
   * address. */
  readonly access?: CreateFolderRequestBodyFolderUploadEmailAccessField;
  readonly rawData?: SerializedData;
}
export type CreateFolderRequestBodySyncStateField =
  | 'synced'
  | 'not_synced'
  | 'partially_synced'
  | string;
export interface CreateFolderRequestBody {
  /**
   * The name for the new folder.
   *
   * There are some restrictions to the file name. Names containing
   * non-printable ASCII characters, forward and backward slashes
   * (`/`, `\`), as well as names with trailing spaces are
   * prohibited.
   *
   * Additionally, the names `.` and `..` are
   * not allowed either. */
  readonly name: string;
  /**
   * The parent folder to create the new folder within. */
  readonly parent: CreateFolderRequestBodyParentField;
  readonly folderUploadEmail?: CreateFolderRequestBodyFolderUploadEmailField;
  /**
   * Specifies whether a folder should be synced to a
   * user's device or not. This is used by Box Sync
   * (discontinued) and is not used by Box Drive. */
  readonly syncState?: CreateFolderRequestBodySyncStateField;
  readonly rawData?: SerializedData;
}
export interface CreateFolderQueryParams {
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
export class CreateFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateFolderHeaders, 'extraHeaders'> &
      Partial<Pick<CreateFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CopyFolderRequestBodyParentField {
  /**
   * The ID of parent folder */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CopyFolderRequestBody {
  /**
   * An optional new name for the copied folder.
   *
   * There are some restrictions to the file name. Names containing
   * non-printable ASCII characters, forward and backward slashes
   * (`/`, `\`), as well as names with trailing spaces are
   * prohibited.
   *
   * Additionally, the names `.` and `..` are
   * not allowed either. */
  readonly name?: string;
  /**
   * The destination folder to copy the folder to. */
  readonly parent: CopyFolderRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export interface CopyFolderQueryParams {
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
export class CopyFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CopyFolderHeaders, 'extraHeaders'> &
      Partial<Pick<CopyFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CopyFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class FoldersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      FoldersManager,
      | 'networkSession'
      | 'getFolderById'
      | 'updateFolderById'
      | 'deleteFolderById'
      | 'getFolderItems'
      | 'createFolder'
      | 'copyFolder'
    > &
      Partial<Pick<FoldersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves details for a folder, including the first 100 entries
     * in the folder.
     *
     * Passing `sort`, `direction`, `offset`, and `limit`
     * parameters in query allows you to manage the
     * list of returned
     * [folder items](r://folder--full#param-item-collection).
     *
     * To fetch more items within the folder, use the
     * [Get items in a folder](e://get-folders-id-items) endpoint.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetFolderByIdOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async getFolderById(
    folderId: string,
    optionalsInput: GetFolderByIdOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: GetFolderByIdOptionals = new GetFolderByIdOptionals({
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
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['offset']: toString(queryParams.offset) as string,
      ['limit']: toString(queryParams.limit) as string,
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
            '/2.0/folders/',
            toString(folderId) as string,
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
     * Updates a folder. This can be also be used to move the folder,
     * create shared links, update collaborations, and more.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {UpdateFolderByIdOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async updateFolderById(
    folderId: string,
    optionalsInput: UpdateFolderByIdOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: UpdateFolderByIdOptionals = new UpdateFolderByIdOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateFolderByIdRequestBody(requestBody),
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
     * Deletes a folder, either permanently or by moving it to
     * the trash.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {DeleteFolderByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteFolderById(
    folderId: string,
    optionalsInput: DeleteFolderByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteFolderByIdOptionals = new DeleteFolderByIdOptionals({
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
      ['recursive']: toString(queryParams.recursive) as string,
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
            '/2.0/folders/',
            toString(folderId) as string,
          ) as string,
          method: 'DELETE',
          params: queryParamsMap,
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
     * Retrieves a page of items in a folder. These items can be files,
     * folders, and web links.
     *
     * To request more information about the folder itself, like its size,
     * use the [Get a folder](#get-folders-id) endpoint instead.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetFolderItemsOptionalsInput} optionalsInput
     * @returns {Promise<Items>}
     */
  async getFolderItems(
    folderId: string,
    optionalsInput: GetFolderItemsOptionalsInput = {},
  ): Promise<Items> {
    const optionals: GetFolderItemsOptionals = new GetFolderItemsOptionals({
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
      ['usemarker']: toString(queryParams.usemarker) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['offset']: toString(queryParams.offset) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['boxapi']: toString(headers.boxapi) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/folders/',
            toString(folderId) as string,
            '/items',
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
      ...deserializeItems(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new empty folder within the specified parent folder.
   * @param {CreateFolderRequestBody} requestBody Request body of createFolder method
   * @param {CreateFolderOptionalsInput} optionalsInput
   * @returns {Promise<FolderFull>}
   */
  async createFolder(
    requestBody: CreateFolderRequestBody,
    optionalsInput: CreateFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: CreateFolderOptionals = new CreateFolderOptionals({
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
            '/2.0/folders',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateFolderRequestBody(requestBody),
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
     * Creates a copy of a folder within a destination folder.
     *
     * The original folder will not be changed.
     * @param {string} folderId The unique identifier of the folder to copy.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder with the ID `0` can not be copied.
    Example: "0"
     * @param {CopyFolderRequestBody} requestBody Request body of copyFolder method
     * @param {CopyFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async copyFolder(
    folderId: string,
    requestBody: CopyFolderRequestBody,
    optionalsInput: CopyFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: CopyFolderOptionals = new CopyFolderOptionals({
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
            '/2.0/folders/',
            toString(folderId) as string,
            '/copy',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCopyFolderRequestBody(requestBody),
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
export interface FoldersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetFolderByIdQueryParamsSortField(
  val: GetFolderByIdQueryParamsSortField,
): SerializedData {
  return val;
}
export function deserializeGetFolderByIdQueryParamsSortField(
  val: SerializedData,
): GetFolderByIdQueryParamsSortField {
  if (val == 'id') {
    return val;
  }
  if (val == 'name') {
    return val;
  }
  if (val == 'date') {
    return val;
  }
  if (val == 'size') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFolderByIdQueryParamsSortField",
  });
}
export function serializeGetFolderByIdQueryParamsDirectionField(
  val: GetFolderByIdQueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetFolderByIdQueryParamsDirectionField(
  val: SerializedData,
): GetFolderByIdQueryParamsDirectionField {
  if (val == 'ASC') {
    return val;
  }
  if (val == 'DESC') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFolderByIdQueryParamsDirectionField",
  });
}
export function serializeUpdateFolderByIdRequestBodySyncStateField(
  val: UpdateFolderByIdRequestBodySyncStateField,
): SerializedData {
  return val;
}
export function deserializeUpdateFolderByIdRequestBodySyncStateField(
  val: SerializedData,
): UpdateFolderByIdRequestBodySyncStateField {
  if (val == 'synced') {
    return val;
  }
  if (val == 'not_synced') {
    return val;
  }
  if (val == 'partially_synced') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateFolderByIdRequestBodySyncStateField",
  });
}
export function serializeUpdateFolderByIdRequestBodyParentField(
  val: UpdateFolderByIdRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id, ['user_id']: val.userId };
}
export function deserializeUpdateFolderByIdRequestBodyParentField(
  val: SerializedData,
): UpdateFolderByIdRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFolderByIdRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateFolderByIdRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.user_id == void 0) && !sdIsString(val.user_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "user_id" of type "UpdateFolderByIdRequestBodyParentField"',
    });
  }
  const userId: undefined | string =
    val.user_id == void 0 ? void 0 : val.user_id;
  return {
    id: id,
    userId: userId,
  } satisfies UpdateFolderByIdRequestBodyParentField;
}
export function serializeUpdateFolderByIdRequestBodySharedLinkAccessField(
  val: UpdateFolderByIdRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateFolderByIdRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateFolderByIdRequestBodySharedLinkAccessField {
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
      "Can't deserialize UpdateFolderByIdRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(
  val: UpdateFolderByIdRequestBodySharedLinkPermissionsField,
): SerializedData {
  return { ['can_download']: val.canDownload };
}
export function deserializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): UpdateFolderByIdRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFolderByIdRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "UpdateFolderByIdRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  return {
    canDownload: canDownload,
  } satisfies UpdateFolderByIdRequestBodySharedLinkPermissionsField;
}
export function serializeUpdateFolderByIdRequestBodySharedLinkField(
  val: UpdateFolderByIdRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateFolderByIdRequestBodySharedLinkAccessField(val.access),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeUpdateFolderByIdRequestBodySharedLinkField(
  val: SerializedData,
): UpdateFolderByIdRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFolderByIdRequestBodySharedLinkField"',
    });
  }
  const access: undefined | UpdateFolderByIdRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodySharedLinkAccessField(val.access);
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateFolderByIdRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateFolderByIdRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateFolderByIdRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | UpdateFolderByIdRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies UpdateFolderByIdRequestBodySharedLinkField;
}
export function serializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(
  val: UpdateFolderByIdRequestBodyFolderUploadEmailAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(
  val: SerializedData,
): UpdateFolderByIdRequestBodyFolderUploadEmailAccessField {
  if (val == 'open') {
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
      "Can't deserialize UpdateFolderByIdRequestBodyFolderUploadEmailAccessField",
  });
}
export function serializeUpdateFolderByIdRequestBodyFolderUploadEmailField(
  val: UpdateFolderByIdRequestBodyFolderUploadEmailField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(
            val.access,
          ),
  };
}
export function deserializeUpdateFolderByIdRequestBodyFolderUploadEmailField(
  val: SerializedData,
): UpdateFolderByIdRequestBodyFolderUploadEmailField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFolderByIdRequestBodyFolderUploadEmailField"',
    });
  }
  const access:
    | undefined
    | UpdateFolderByIdRequestBodyFolderUploadEmailAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(
          val.access,
        );
  return {
    access: access,
  } satisfies UpdateFolderByIdRequestBodyFolderUploadEmailField;
}
export function serializeUpdateFolderByIdRequestBodyCollectionsField(
  val: UpdateFolderByIdRequestBodyCollectionsField,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeUpdateFolderByIdRequestBodyCollectionsField(
  val: SerializedData,
): UpdateFolderByIdRequestBodyCollectionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateFolderByIdRequestBodyCollectionsField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateFolderByIdRequestBodyCollectionsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "UpdateFolderByIdRequestBodyCollectionsField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return {
    id: id,
    type: type,
  } satisfies UpdateFolderByIdRequestBodyCollectionsField;
}
export function serializeUpdateFolderByIdRequestBody(
  val: UpdateFolderByIdRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['description']: val.description,
    ['sync_state']:
      val.syncState == void 0
        ? val.syncState
        : serializeUpdateFolderByIdRequestBodySyncStateField(val.syncState),
    ['can_non_owners_invite']: val.canNonOwnersInvite,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeUpdateFolderByIdRequestBodyParentField(val.parent),
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateFolderByIdRequestBodySharedLinkField(val.sharedLink),
    ['folder_upload_email']:
      val.folderUploadEmail == void 0
        ? val.folderUploadEmail
        : serializeUpdateFolderByIdRequestBodyFolderUploadEmailField(
            val.folderUploadEmail,
          ),
    ['tags']:
      val.tags == void 0
        ? val.tags
        : (val.tags.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['is_collaboration_restricted_to_enterprise']:
      val.isCollaborationRestrictedToEnterprise,
    ['collections']:
      val.collections == void 0
        ? val.collections
        : (val.collections.map(function (
            item: UpdateFolderByIdRequestBodyCollectionsField,
          ): SerializedData {
            return serializeUpdateFolderByIdRequestBodyCollectionsField(item);
          }) as readonly any[]),
    ['can_non_owners_view_collaborators']: val.canNonOwnersViewCollaborators,
  };
}
export function deserializeUpdateFolderByIdRequestBody(
  val: SerializedData,
): UpdateFolderByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateFolderByIdRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const syncState: undefined | UpdateFolderByIdRequestBodySyncStateField =
    val.sync_state == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodySyncStateField(val.sync_state);
  if (
    !(val.can_non_owners_invite == void 0) &&
    !sdIsBoolean(val.can_non_owners_invite)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_non_owners_invite" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const canNonOwnersInvite: undefined | boolean =
    val.can_non_owners_invite == void 0 ? void 0 : val.can_non_owners_invite;
  const parent: undefined | UpdateFolderByIdRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodyParentField(val.parent);
  const sharedLink: undefined | UpdateFolderByIdRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodySharedLinkField(val.shared_link);
  const folderUploadEmail:
    | undefined
    | UpdateFolderByIdRequestBodyFolderUploadEmailField =
    val.folder_upload_email == void 0
      ? void 0
      : deserializeUpdateFolderByIdRequestBodyFolderUploadEmailField(
          val.folder_upload_email,
        );
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "tags" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "UpdateFolderByIdRequestBody"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (
    !(val.is_collaboration_restricted_to_enterprise == void 0) &&
    !sdIsBoolean(val.is_collaboration_restricted_to_enterprise)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_collaboration_restricted_to_enterprise" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const isCollaborationRestrictedToEnterprise: undefined | boolean =
    val.is_collaboration_restricted_to_enterprise == void 0
      ? void 0
      : val.is_collaboration_restricted_to_enterprise;
  if (!(val.collections == void 0) && !sdIsList(val.collections)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "collections" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const collections:
    | undefined
    | readonly UpdateFolderByIdRequestBodyCollectionsField[] =
    val.collections == void 0
      ? void 0
      : sdIsList(val.collections)
        ? (val.collections.map(function (
            itm: SerializedData,
          ): UpdateFolderByIdRequestBodyCollectionsField {
            return deserializeUpdateFolderByIdRequestBodyCollectionsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.can_non_owners_view_collaborators == void 0) &&
    !sdIsBoolean(val.can_non_owners_view_collaborators)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_non_owners_view_collaborators" of type "UpdateFolderByIdRequestBody"',
    });
  }
  const canNonOwnersViewCollaborators: undefined | boolean =
    val.can_non_owners_view_collaborators == void 0
      ? void 0
      : val.can_non_owners_view_collaborators;
  return {
    name: name,
    description: description,
    syncState: syncState,
    canNonOwnersInvite: canNonOwnersInvite,
    parent: parent,
    sharedLink: sharedLink,
    folderUploadEmail: folderUploadEmail,
    tags: tags,
    isCollaborationRestrictedToEnterprise:
      isCollaborationRestrictedToEnterprise,
    collections: collections,
    canNonOwnersViewCollaborators: canNonOwnersViewCollaborators,
  } satisfies UpdateFolderByIdRequestBody;
}
export function serializeGetFolderItemsQueryParamsSortField(
  val: GetFolderItemsQueryParamsSortField,
): SerializedData {
  return val;
}
export function deserializeGetFolderItemsQueryParamsSortField(
  val: SerializedData,
): GetFolderItemsQueryParamsSortField {
  if (val == 'id') {
    return val;
  }
  if (val == 'name') {
    return val;
  }
  if (val == 'date') {
    return val;
  }
  if (val == 'size') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFolderItemsQueryParamsSortField",
  });
}
export function serializeGetFolderItemsQueryParamsDirectionField(
  val: GetFolderItemsQueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeGetFolderItemsQueryParamsDirectionField(
  val: SerializedData,
): GetFolderItemsQueryParamsDirectionField {
  if (val == 'ASC') {
    return val;
  }
  if (val == 'DESC') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetFolderItemsQueryParamsDirectionField",
  });
}
export function serializeCreateFolderRequestBodyParentField(
  val: CreateFolderRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateFolderRequestBodyParentField(
  val: SerializedData,
): CreateFolderRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateFolderRequestBodyParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateFolderRequestBodyParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateFolderRequestBodyParentField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CreateFolderRequestBodyParentField;
}
export function serializeCreateFolderRequestBodyFolderUploadEmailAccessField(
  val: CreateFolderRequestBodyFolderUploadEmailAccessField,
): SerializedData {
  return val;
}
export function deserializeCreateFolderRequestBodyFolderUploadEmailAccessField(
  val: SerializedData,
): CreateFolderRequestBodyFolderUploadEmailAccessField {
  if (val == 'open') {
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
      "Can't deserialize CreateFolderRequestBodyFolderUploadEmailAccessField",
  });
}
export function serializeCreateFolderRequestBodyFolderUploadEmailField(
  val: CreateFolderRequestBodyFolderUploadEmailField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeCreateFolderRequestBodyFolderUploadEmailAccessField(
            val.access,
          ),
  };
}
export function deserializeCreateFolderRequestBodyFolderUploadEmailField(
  val: SerializedData,
): CreateFolderRequestBodyFolderUploadEmailField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateFolderRequestBodyFolderUploadEmailField"',
    });
  }
  const access:
    | undefined
    | CreateFolderRequestBodyFolderUploadEmailAccessField =
    val.access == void 0
      ? void 0
      : deserializeCreateFolderRequestBodyFolderUploadEmailAccessField(
          val.access,
        );
  return {
    access: access,
  } satisfies CreateFolderRequestBodyFolderUploadEmailField;
}
export function serializeCreateFolderRequestBodySyncStateField(
  val: CreateFolderRequestBodySyncStateField,
): SerializedData {
  return val;
}
export function deserializeCreateFolderRequestBodySyncStateField(
  val: SerializedData,
): CreateFolderRequestBodySyncStateField {
  if (val == 'synced') {
    return val;
  }
  if (val == 'not_synced') {
    return val;
  }
  if (val == 'partially_synced') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateFolderRequestBodySyncStateField",
  });
}
export function serializeCreateFolderRequestBody(
  val: CreateFolderRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']: serializeCreateFolderRequestBodyParentField(val.parent),
    ['folder_upload_email']:
      val.folderUploadEmail == void 0
        ? val.folderUploadEmail
        : serializeCreateFolderRequestBodyFolderUploadEmailField(
            val.folderUploadEmail,
          ),
    ['sync_state']:
      val.syncState == void 0
        ? val.syncState
        : serializeCreateFolderRequestBodySyncStateField(val.syncState),
  };
}
export function deserializeCreateFolderRequestBody(
  val: SerializedData,
): CreateFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateFolderRequestBody"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "CreateFolderRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateFolderRequestBody"',
    });
  }
  const name: string = val.name;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "CreateFolderRequestBody" to be defined',
    });
  }
  const parent: CreateFolderRequestBodyParentField =
    deserializeCreateFolderRequestBodyParentField(val.parent);
  const folderUploadEmail:
    | undefined
    | CreateFolderRequestBodyFolderUploadEmailField =
    val.folder_upload_email == void 0
      ? void 0
      : deserializeCreateFolderRequestBodyFolderUploadEmailField(
          val.folder_upload_email,
        );
  const syncState: undefined | CreateFolderRequestBodySyncStateField =
    val.sync_state == void 0
      ? void 0
      : deserializeCreateFolderRequestBodySyncStateField(val.sync_state);
  return {
    name: name,
    parent: parent,
    folderUploadEmail: folderUploadEmail,
    syncState: syncState,
  } satisfies CreateFolderRequestBody;
}
export function serializeCopyFolderRequestBodyParentField(
  val: CopyFolderRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCopyFolderRequestBodyParentField(
  val: SerializedData,
): CopyFolderRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CopyFolderRequestBodyParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CopyFolderRequestBodyParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CopyFolderRequestBodyParentField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CopyFolderRequestBodyParentField;
}
export function serializeCopyFolderRequestBody(
  val: CopyFolderRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']: serializeCopyFolderRequestBodyParentField(val.parent),
  };
}
export function deserializeCopyFolderRequestBody(
  val: SerializedData,
): CopyFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CopyFolderRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CopyFolderRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "CopyFolderRequestBody" to be defined',
    });
  }
  const parent: CopyFolderRequestBodyParentField =
    deserializeCopyFolderRequestBodyParentField(val.parent);
  return { name: name, parent: parent } satisfies CopyFolderRequestBody;
}
