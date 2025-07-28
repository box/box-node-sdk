import { serializeCollaboration } from '../schemas/collaboration.generated.js';
import { deserializeCollaboration } from '../schemas/collaboration.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Collaboration } from '../schemas/collaboration.generated.js';
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
export class GetCollaborationByIdOptionals {
  readonly queryParams: GetCollaborationByIdQueryParams =
    {} satisfies GetCollaborationByIdQueryParams;
  readonly headers: GetCollaborationByIdHeaders =
    new GetCollaborationByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetCollaborationByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetCollaborationByIdOptionals,
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
export interface GetCollaborationByIdOptionalsInput {
  readonly queryParams?: GetCollaborationByIdQueryParams;
  readonly headers?: GetCollaborationByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateCollaborationByIdOptionals {
  readonly headers: UpdateCollaborationByIdHeaders =
    new UpdateCollaborationByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateCollaborationByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateCollaborationByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface UpdateCollaborationByIdOptionalsInput {
  readonly headers?: UpdateCollaborationByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteCollaborationByIdOptionals {
  readonly headers: DeleteCollaborationByIdHeaders =
    new DeleteCollaborationByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteCollaborationByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteCollaborationByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteCollaborationByIdOptionalsInput {
  readonly headers?: DeleteCollaborationByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateCollaborationOptionals {
  readonly queryParams: CreateCollaborationQueryParams =
    {} satisfies CreateCollaborationQueryParams;
  readonly headers: CreateCollaborationHeaders = new CreateCollaborationHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateCollaborationOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateCollaborationOptionals,
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
export interface CreateCollaborationOptionalsInput {
  readonly queryParams?: CreateCollaborationQueryParams;
  readonly headers?: CreateCollaborationHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetCollaborationByIdQueryParams {
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
export class GetCollaborationByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetCollaborationByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetCollaborationByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetCollaborationByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateCollaborationByIdRequestBodyRoleField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | 'owner'
  | string;
export type UpdateCollaborationByIdRequestBodyStatusField =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | string;
export interface UpdateCollaborationByIdRequestBody {
  /**
   * The level of access granted. */
  readonly role: UpdateCollaborationByIdRequestBodyRoleField;
  /**
   * Set the status of a `pending` collaboration invitation,
   * effectively accepting, or rejecting the invite. */
  readonly status?: UpdateCollaborationByIdRequestBodyStatusField;
  /**
   * Update the expiration date for the collaboration. At this date,
   * the collaboration will be automatically removed from the item.
   *
   * This feature will only work if the **Automatically remove invited
   * collaborators: Allow folder owners to extend the expiry date**
   * setting has been enabled in the **Enterprise Settings**
   * of the **Admin Console**. When the setting is not enabled,
   * collaborations can not have an expiry date and a value for this
   * field will be result in an error.
   *
   * Additionally, a collaboration can only be given an
   * expiration if it was created after the **Automatically remove
   * invited collaborator** setting was enabled. */
  readonly expiresAt?: DateTime;
  /**
   * Determines if the invited users can see the entire parent path to
   * the associated folder. The user will not gain privileges in any
   * parent folder and therefore can not see content the user is not
   * collaborated on.
   *
   * Be aware that this meaningfully increases the time required to load the
   * invitee's **All Files** page. We recommend you limit the number of
   * collaborations with `can_view_path` enabled to 1,000 per user.
   *
   * Only owner or co-owners can invite collaborators with a `can_view_path` of
   * `true`.
   *
   * `can_view_path` can only be used for folder collaborations. */
  readonly canViewPath?: boolean;
  readonly rawData?: SerializedData;
}
export class UpdateCollaborationByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateCollaborationByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateCollaborationByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateCollaborationByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteCollaborationByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteCollaborationByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteCollaborationByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteCollaborationByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateCollaborationRequestBodyItemTypeField = 'file' | 'folder';
export interface CreateCollaborationRequestBodyItemField {
  /**
   * The type of the item that this collaboration will be
   * granted access to. */
  readonly type?: CreateCollaborationRequestBodyItemTypeField;
  /**
   * The ID of the item that will be granted access to. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export type CreateCollaborationRequestBodyAccessibleByTypeField =
  | 'user'
  | 'group';
export interface CreateCollaborationRequestBodyAccessibleByField {
  /**
   * The type of collaborator to invite. */
  readonly type: CreateCollaborationRequestBodyAccessibleByTypeField;
  /**
   * The ID of the user or group.
   *
   * Alternatively, use `login` to specify a user by email
   * address. */
  readonly id?: string;
  /**
   * The email address of the user to grant access to the item.
   *
   * Alternatively, use `id` to specify a user by user ID. */
  readonly login?: string;
  readonly rawData?: SerializedData;
}
export type CreateCollaborationRequestBodyRoleField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | string;
export interface CreateCollaborationRequestBody {
  /**
   * The item to attach the comment to. */
  readonly item: CreateCollaborationRequestBodyItemField;
  /**
   * The user or group to give access to the item. */
  readonly accessibleBy: CreateCollaborationRequestBodyAccessibleByField;
  /**
   * The level of access granted. */
  readonly role: CreateCollaborationRequestBodyRoleField;
  /**
   * If set to `true`, collaborators have access to
   * shared items, but such items won't be visible in the
   * All Files list. Additionally, collaborators won't
   * see the the path to the root folder for the
   * shared item. */
  readonly isAccessOnly?: boolean;
  /**
   * Determines if the invited users can see the entire parent path to
   * the associated folder. The user will not gain privileges in any
   * parent folder and therefore can not see content the user is not
   * collaborated on.
   *
   * Be aware that this meaningfully increases the time required to load the
   * invitee's **All Files** page. We recommend you limit the number of
   * collaborations with `can_view_path` enabled to 1,000 per user.
   *
   * Only owner or co-owners can invite collaborators with a `can_view_path` of
   * `true`.
   *
   * `can_view_path` can only be used for folder collaborations. */
  readonly canViewPath?: boolean;
  /**
   * Set the expiration date for the collaboration. At this date, the
   * collaboration will be automatically removed from the item.
   *
   * This feature will only work if the **Automatically remove invited
   * collaborators: Allow folder owners to extend the expiry date**
   * setting has been enabled in the **Enterprise Settings**
   * of the **Admin Console**. When the setting is not enabled,
   * collaborations can not have an expiry date and a value for this
   * field will be result in an error. */
  readonly expiresAt?: DateTime;
  readonly rawData?: SerializedData;
}
export interface CreateCollaborationQueryParams {
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
  /**
   * Determines if users should receive email notification
   * for the action performed. */
  readonly notify?: boolean;
}
export class CreateCollaborationHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateCollaborationHeaders, 'extraHeaders'> &
      Partial<Pick<CreateCollaborationHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateCollaborationHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class UserCollaborationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      UserCollaborationsManager,
      | 'networkSession'
      | 'getCollaborationById'
      | 'updateCollaborationById'
      | 'deleteCollaborationById'
      | 'createCollaboration'
    > &
      Partial<Pick<UserCollaborationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves a single collaboration.
     * @param {string} collaborationId The ID of the collaboration.
    Example: "1234"
     * @param {GetCollaborationByIdOptionalsInput} optionalsInput
     * @returns {Promise<Collaboration>}
     */
  async getCollaborationById(
    collaborationId: string,
    optionalsInput: GetCollaborationByIdOptionalsInput = {},
  ): Promise<Collaboration> {
    const optionals: GetCollaborationByIdOptionals =
      new GetCollaborationByIdOptionals({
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
            '/2.0/collaborations/',
            toString(collaborationId) as string,
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
      ...deserializeCollaboration(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a collaboration.
     * Can be used to change the owner of an item, or to
     * accept collaboration invites.
     * @param {string} collaborationId The ID of the collaboration.
    Example: "1234"
     * @param {UpdateCollaborationByIdRequestBody} requestBody Request body of updateCollaborationById method
     * @param {UpdateCollaborationByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined | Collaboration>}
     */
  async updateCollaborationById(
    collaborationId: string,
    requestBody: UpdateCollaborationByIdRequestBody,
    optionalsInput: UpdateCollaborationByIdOptionalsInput = {},
  ): Promise<undefined | Collaboration> {
    const optionals: UpdateCollaborationByIdOptionals =
      new UpdateCollaborationByIdOptionals({
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
            '/2.0/collaborations/',
            toString(collaborationId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateCollaborationByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    if ((toString(response.status) as string) == '204') {
      return void 0;
    }
    return {
      ...deserializeCollaboration(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a single collaboration.
     * @param {string} collaborationId The ID of the collaboration.
    Example: "1234"
     * @param {DeleteCollaborationByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteCollaborationById(
    collaborationId: string,
    optionalsInput: DeleteCollaborationByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteCollaborationByIdOptionals =
      new DeleteCollaborationByIdOptionals({
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
            '/2.0/collaborations/',
            toString(collaborationId) as string,
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
   * Adds a collaboration for a single user or a single group to a file
   * or folder.
   *
   * Collaborations can be created using email address, user IDs, or a
   * group IDs.
   *
   * If a collaboration is being created with a group, access to
   * this endpoint is dependent on the group's ability to be invited.
   *
   * If collaboration is in `pending` status, the following fields
   * are redacted:
   * - `login` and `name` are hidden if a collaboration was created
   * using `user_id`,
   * -  `name` is hidden if a collaboration was created using `login`.
   * @param {CreateCollaborationRequestBody} requestBody Request body of createCollaboration method
   * @param {CreateCollaborationOptionalsInput} optionalsInput
   * @returns {Promise<Collaboration>}
   */
  async createCollaboration(
    requestBody: CreateCollaborationRequestBody,
    optionalsInput: CreateCollaborationOptionalsInput = {},
  ): Promise<Collaboration> {
    const optionals: CreateCollaborationOptionals =
      new CreateCollaborationOptionals({
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
      ['notify']: toString(queryParams.notify) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/collaborations',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateCollaborationRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeCollaboration(response.data!),
      rawData: response.data!,
    };
  }
}
export interface UserCollaborationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeUpdateCollaborationByIdRequestBodyRoleField(
  val: UpdateCollaborationByIdRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeUpdateCollaborationByIdRequestBodyRoleField(
  val: SerializedData,
): UpdateCollaborationByIdRequestBodyRoleField {
  if (val == 'editor') {
    return val;
  }
  if (val == 'viewer') {
    return val;
  }
  if (val == 'previewer') {
    return val;
  }
  if (val == 'uploader') {
    return val;
  }
  if (val == 'previewer uploader') {
    return val;
  }
  if (val == 'viewer uploader') {
    return val;
  }
  if (val == 'co-owner') {
    return val;
  }
  if (val == 'owner') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateCollaborationByIdRequestBodyRoleField",
  });
}
export function serializeUpdateCollaborationByIdRequestBodyStatusField(
  val: UpdateCollaborationByIdRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeUpdateCollaborationByIdRequestBodyStatusField(
  val: SerializedData,
): UpdateCollaborationByIdRequestBodyStatusField {
  if (val == 'pending') {
    return val;
  }
  if (val == 'accepted') {
    return val;
  }
  if (val == 'rejected') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateCollaborationByIdRequestBodyStatusField",
  });
}
export function serializeUpdateCollaborationByIdRequestBody(
  val: UpdateCollaborationByIdRequestBody,
): SerializedData {
  return {
    ['role']: serializeUpdateCollaborationByIdRequestBodyRoleField(val.role),
    ['status']:
      val.status == void 0
        ? val.status
        : serializeUpdateCollaborationByIdRequestBodyStatusField(val.status),
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['can_view_path']: val.canViewPath,
  };
}
export function deserializeUpdateCollaborationByIdRequestBody(
  val: SerializedData,
): UpdateCollaborationByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateCollaborationByIdRequestBody"',
    });
  }
  if (val.role == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "role" of type "UpdateCollaborationByIdRequestBody" to be defined',
    });
  }
  const role: UpdateCollaborationByIdRequestBodyRoleField =
    deserializeUpdateCollaborationByIdRequestBodyRoleField(val.role);
  const status: undefined | UpdateCollaborationByIdRequestBodyStatusField =
    val.status == void 0
      ? void 0
      : deserializeUpdateCollaborationByIdRequestBodyStatusField(val.status);
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "UpdateCollaborationByIdRequestBody"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (!(val.can_view_path == void 0) && !sdIsBoolean(val.can_view_path)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_view_path" of type "UpdateCollaborationByIdRequestBody"',
    });
  }
  const canViewPath: undefined | boolean =
    val.can_view_path == void 0 ? void 0 : val.can_view_path;
  return {
    role: role,
    status: status,
    expiresAt: expiresAt,
    canViewPath: canViewPath,
  } satisfies UpdateCollaborationByIdRequestBody;
}
export function serializeCreateCollaborationRequestBodyItemTypeField(
  val: CreateCollaborationRequestBodyItemTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateCollaborationRequestBodyItemTypeField(
  val: SerializedData,
): CreateCollaborationRequestBodyItemTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateCollaborationRequestBodyItemTypeField",
  });
}
export function serializeCreateCollaborationRequestBodyItemField(
  val: CreateCollaborationRequestBodyItemField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateCollaborationRequestBodyItemTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeCreateCollaborationRequestBodyItemField(
  val: SerializedData,
): CreateCollaborationRequestBodyItemField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateCollaborationRequestBodyItemField"',
    });
  }
  const type: undefined | CreateCollaborationRequestBodyItemTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateCollaborationRequestBodyItemTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateCollaborationRequestBodyItemField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    id: id,
  } satisfies CreateCollaborationRequestBodyItemField;
}
export function serializeCreateCollaborationRequestBodyAccessibleByTypeField(
  val: CreateCollaborationRequestBodyAccessibleByTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateCollaborationRequestBodyAccessibleByTypeField(
  val: SerializedData,
): CreateCollaborationRequestBodyAccessibleByTypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateCollaborationRequestBodyAccessibleByTypeField",
  });
}
export function serializeCreateCollaborationRequestBodyAccessibleByField(
  val: CreateCollaborationRequestBodyAccessibleByField,
): SerializedData {
  return {
    ['type']: serializeCreateCollaborationRequestBodyAccessibleByTypeField(
      val.type,
    ),
    ['id']: val.id,
    ['login']: val.login,
  };
}
export function deserializeCreateCollaborationRequestBodyAccessibleByField(
  val: SerializedData,
): CreateCollaborationRequestBodyAccessibleByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateCollaborationRequestBodyAccessibleByField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateCollaborationRequestBodyAccessibleByField" to be defined',
    });
  }
  const type: CreateCollaborationRequestBodyAccessibleByTypeField =
    deserializeCreateCollaborationRequestBodyAccessibleByTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateCollaborationRequestBodyAccessibleByField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "login" of type "CreateCollaborationRequestBodyAccessibleByField"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  return {
    type: type,
    id: id,
    login: login,
  } satisfies CreateCollaborationRequestBodyAccessibleByField;
}
export function serializeCreateCollaborationRequestBodyRoleField(
  val: CreateCollaborationRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeCreateCollaborationRequestBodyRoleField(
  val: SerializedData,
): CreateCollaborationRequestBodyRoleField {
  if (val == 'editor') {
    return val;
  }
  if (val == 'viewer') {
    return val;
  }
  if (val == 'previewer') {
    return val;
  }
  if (val == 'uploader') {
    return val;
  }
  if (val == 'previewer uploader') {
    return val;
  }
  if (val == 'viewer uploader') {
    return val;
  }
  if (val == 'co-owner') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateCollaborationRequestBodyRoleField",
  });
}
export function serializeCreateCollaborationRequestBody(
  val: CreateCollaborationRequestBody,
): SerializedData {
  return {
    ['item']: serializeCreateCollaborationRequestBodyItemField(val.item),
    ['accessible_by']: serializeCreateCollaborationRequestBodyAccessibleByField(
      val.accessibleBy,
    ),
    ['role']: serializeCreateCollaborationRequestBodyRoleField(val.role),
    ['is_access_only']: val.isAccessOnly,
    ['can_view_path']: val.canViewPath,
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
  };
}
export function deserializeCreateCollaborationRequestBody(
  val: SerializedData,
): CreateCollaborationRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateCollaborationRequestBody"',
    });
  }
  if (val.item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "item" of type "CreateCollaborationRequestBody" to be defined',
    });
  }
  const item: CreateCollaborationRequestBodyItemField =
    deserializeCreateCollaborationRequestBodyItemField(val.item);
  if (val.accessible_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "accessible_by" of type "CreateCollaborationRequestBody" to be defined',
    });
  }
  const accessibleBy: CreateCollaborationRequestBodyAccessibleByField =
    deserializeCreateCollaborationRequestBodyAccessibleByField(
      val.accessible_by,
    );
  if (val.role == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "role" of type "CreateCollaborationRequestBody" to be defined',
    });
  }
  const role: CreateCollaborationRequestBodyRoleField =
    deserializeCreateCollaborationRequestBodyRoleField(val.role);
  if (!(val.is_access_only == void 0) && !sdIsBoolean(val.is_access_only)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_access_only" of type "CreateCollaborationRequestBody"',
    });
  }
  const isAccessOnly: undefined | boolean =
    val.is_access_only == void 0 ? void 0 : val.is_access_only;
  if (!(val.can_view_path == void 0) && !sdIsBoolean(val.can_view_path)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_view_path" of type "CreateCollaborationRequestBody"',
    });
  }
  const canViewPath: undefined | boolean =
    val.can_view_path == void 0 ? void 0 : val.can_view_path;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "CreateCollaborationRequestBody"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  return {
    item: item,
    accessibleBy: accessibleBy,
    role: role,
    isAccessOnly: isAccessOnly,
    canViewPath: canViewPath,
    expiresAt: expiresAt,
  } satisfies CreateCollaborationRequestBody;
}
