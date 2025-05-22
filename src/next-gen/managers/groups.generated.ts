import { serializeGroups } from '../schemas/groups.generated.js';
import { deserializeGroups } from '../schemas/groups.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeGroupFull } from '../schemas/groupFull.generated.js';
import { deserializeGroupFull } from '../schemas/groupFull.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Groups } from '../schemas/groups.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { GroupFull } from '../schemas/groupFull.generated.js';
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
export class CreateGroupOptionals {
  readonly queryParams: CreateGroupQueryParams =
    {} satisfies CreateGroupQueryParams;
  readonly headers: CreateGroupHeaders = new CreateGroupHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateGroupOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateGroupOptionals,
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
export interface CreateGroupOptionalsInput {
  readonly queryParams?: CreateGroupQueryParams;
  readonly headers?: CreateGroupHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetGroupByIdOptionals {
  readonly queryParams: GetGroupByIdQueryParams =
    {} satisfies GetGroupByIdQueryParams;
  readonly headers: GetGroupByIdHeaders = new GetGroupByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetGroupByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetGroupByIdOptionals,
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
export interface GetGroupByIdOptionalsInput {
  readonly queryParams?: GetGroupByIdQueryParams;
  readonly headers?: GetGroupByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateGroupByIdOptionals {
  readonly requestBody: UpdateGroupByIdRequestBody =
    {} satisfies UpdateGroupByIdRequestBody;
  readonly queryParams: UpdateGroupByIdQueryParams =
    {} satisfies UpdateGroupByIdQueryParams;
  readonly headers: UpdateGroupByIdHeaders = new UpdateGroupByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateGroupByIdOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateGroupByIdOptionals,
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
export interface UpdateGroupByIdOptionalsInput {
  readonly requestBody?: UpdateGroupByIdRequestBody;
  readonly queryParams?: UpdateGroupByIdQueryParams;
  readonly headers?: UpdateGroupByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteGroupByIdOptionals {
  readonly headers: DeleteGroupByIdHeaders = new DeleteGroupByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteGroupByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<DeleteGroupByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteGroupByIdOptionalsInput {
  readonly headers?: DeleteGroupByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetGroupsQueryParams {
  /**
   * Limits the results to only groups whose `name` starts
   * with the search term. */
  readonly filterTerm?: string;
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
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
}
export class GetGroupsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGroupsHeaders, 'extraHeaders'> &
      Partial<Pick<GetGroupsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGroupsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateGroupRequestBodyInvitabilityLevelField =
  | 'admins_only'
  | 'admins_and_members'
  | 'all_managed_users'
  | string;
export type CreateGroupRequestBodyMemberViewabilityLevelField =
  | 'admins_only'
  | 'admins_and_members'
  | 'all_managed_users'
  | string;
export interface CreateGroupRequestBody {
  /**
   * The name of the new group to be created. This name must be unique
   * within the enterprise. */
  readonly name: string;
  /**
   * Keeps track of which external source this group is
   * coming, for example `Active Directory`, or `Okta`.
   *
   * Setting this will also prevent Box admins from editing
   * the group name and its members directly via the Box
   * web application.
   *
   * This is desirable for one-way syncing of groups. */
  readonly provenance?: string;
  /**
   * An arbitrary identifier that can be used by
   * external group sync tools to link this Box Group to
   * an external group.
   *
   * Example values of this field
   * could be an **Active Directory Object ID** or a **Google
   * Group ID**.
   *
   * We recommend you use of this field in
   * order to avoid issues when group names are updated in
   * either Box or external systems. */
  readonly externalSyncIdentifier?: string;
  /**
   * A human readable description of the group. */
  readonly description?: string;
  /**
   * Specifies who can invite the group to collaborate
   * on folders.
   *
   * When set to `admins_only` the enterprise admin, co-admins,
   * and the group's admin can invite the group.
   *
   * When set to `admins_and_members` all the admins listed
   * above and group members can invite the group.
   *
   * When set to `all_managed_users` all managed users in the
   * enterprise can invite the group. */
  readonly invitabilityLevel?: CreateGroupRequestBodyInvitabilityLevelField;
  /**
   * Specifies who can see the members of the group.
   *
   * * `admins_only` - the enterprise admin, co-admins, group's
   *   group admin
   * * `admins_and_members` - all admins and group members
   * * `all_managed_users` - all managed users in the
   *   enterprise */
  readonly memberViewabilityLevel?: CreateGroupRequestBodyMemberViewabilityLevelField;
  readonly rawData?: SerializedData;
}
export interface CreateGroupQueryParams {
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
export class CreateGroupHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateGroupHeaders, 'extraHeaders'> &
      Partial<Pick<CreateGroupHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateGroupHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetGroupByIdQueryParams {
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
export class GetGroupByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGroupByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetGroupByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGroupByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateGroupByIdRequestBodyInvitabilityLevelField =
  | 'admins_only'
  | 'admins_and_members'
  | 'all_managed_users'
  | string;
export type UpdateGroupByIdRequestBodyMemberViewabilityLevelField =
  | 'admins_only'
  | 'admins_and_members'
  | 'all_managed_users'
  | string;
export interface UpdateGroupByIdRequestBody {
  /**
   * The name of the new group to be created. Must be unique within the
   * enterprise. */
  readonly name?: string;
  /**
   * Keeps track of which external source this group is
   * coming, for example `Active Directory`, or `Okta`.
   *
   * Setting this will also prevent Box admins from editing
   * the group name and its members directly via the Box
   * web application.
   *
   * This is desirable for one-way syncing of groups. */
  readonly provenance?: string;
  /**
   * An arbitrary identifier that can be used by
   * external group sync tools to link this Box Group to
   * an external group.
   *
   * Example values of this field
   * could be an **Active Directory Object ID** or a **Google
   * Group ID**.
   *
   * We recommend you use of this field in
   * order to avoid issues when group names are updated in
   * either Box or external systems. */
  readonly externalSyncIdentifier?: string;
  /**
   * A human readable description of the group. */
  readonly description?: string;
  /**
   * Specifies who can invite the group to collaborate
   * on folders.
   *
   * When set to `admins_only` the enterprise admin, co-admins,
   * and the group's admin can invite the group.
   *
   * When set to `admins_and_members` all the admins listed
   * above and group members can invite the group.
   *
   * When set to `all_managed_users` all managed users in the
   * enterprise can invite the group. */
  readonly invitabilityLevel?: UpdateGroupByIdRequestBodyInvitabilityLevelField;
  /**
   * Specifies who can see the members of the group.
   *
   * * `admins_only` - the enterprise admin, co-admins, group's
   *   group admin
   * * `admins_and_members` - all admins and group members
   * * `all_managed_users` - all managed users in the
   *   enterprise */
  readonly memberViewabilityLevel?: UpdateGroupByIdRequestBodyMemberViewabilityLevelField;
  readonly rawData?: SerializedData;
}
export interface UpdateGroupByIdQueryParams {
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
export class UpdateGroupByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateGroupByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateGroupByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateGroupByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteGroupByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteGroupByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteGroupByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteGroupByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GroupsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      GroupsManager,
      | 'networkSession'
      | 'getGroups'
      | 'createGroup'
      | 'getGroupById'
      | 'updateGroupById'
      | 'deleteGroupById'
    > &
      Partial<Pick<GroupsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all of the groups for a given enterprise. The user
   * must have admin permissions to inspect enterprise's groups.
   * @param {GetGroupsQueryParams} queryParams Query parameters of getGroups method
   * @param {GetGroupsHeadersInput} headersInput Headers of getGroups method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<Groups>}
   */
  async getGroups(
    queryParams: GetGroupsQueryParams = {} satisfies GetGroupsQueryParams,
    headersInput: GetGroupsHeadersInput = new GetGroupsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<Groups> {
    const headers: GetGroupsHeaders = new GetGroupsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['filter_term']: toString(queryParams.filterTerm) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['limit']: toString(queryParams.limit) as string,
      ['offset']: toString(queryParams.offset) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/groups',
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
      ...deserializeGroups(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new group of users in an enterprise. Only users with admin
   * permissions can create new groups.
   * @param {CreateGroupRequestBody} requestBody Request body of createGroup method
   * @param {CreateGroupOptionalsInput} optionalsInput
   * @returns {Promise<GroupFull>}
   */
  async createGroup(
    requestBody: CreateGroupRequestBody,
    optionalsInput: CreateGroupOptionalsInput = {},
  ): Promise<GroupFull> {
    const optionals: CreateGroupOptionals = new CreateGroupOptionals({
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
            '/2.0/groups',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateGroupRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeGroupFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves information about a group. Only members of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupId The ID of the group.
    Example: "57645"
     * @param {GetGroupByIdOptionalsInput} optionalsInput
     * @returns {Promise<GroupFull>}
     */
  async getGroupById(
    groupId: string,
    optionalsInput: GetGroupByIdOptionalsInput = {},
  ): Promise<GroupFull> {
    const optionals: GetGroupByIdOptionals = new GetGroupByIdOptionals({
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
            '/2.0/groups/',
            toString(groupId) as string,
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
      ...deserializeGroupFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a specific group. Only admins of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupId The ID of the group.
    Example: "57645"
     * @param {UpdateGroupByIdOptionalsInput} optionalsInput
     * @returns {Promise<GroupFull>}
     */
  async updateGroupById(
    groupId: string,
    optionalsInput: UpdateGroupByIdOptionalsInput = {},
  ): Promise<GroupFull> {
    const optionals: UpdateGroupByIdOptionals = new UpdateGroupByIdOptionals({
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
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/groups/',
            toString(groupId) as string,
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateGroupByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeGroupFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes a group. Only users with
     * admin-level permissions will be able to use this API.
     * @param {string} groupId The ID of the group.
    Example: "57645"
     * @param {DeleteGroupByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteGroupById(
    groupId: string,
    optionalsInput: DeleteGroupByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteGroupByIdOptionals = new DeleteGroupByIdOptionals({
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
            '/2.0/groups/',
            toString(groupId) as string,
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
export interface GroupsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateGroupRequestBodyInvitabilityLevelField(
  val: CreateGroupRequestBodyInvitabilityLevelField,
): SerializedData {
  return val;
}
export function deserializeCreateGroupRequestBodyInvitabilityLevelField(
  val: SerializedData,
): CreateGroupRequestBodyInvitabilityLevelField {
  if (val == 'admins_only') {
    return val;
  }
  if (val == 'admins_and_members') {
    return val;
  }
  if (val == 'all_managed_users') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateGroupRequestBodyInvitabilityLevelField",
  });
}
export function serializeCreateGroupRequestBodyMemberViewabilityLevelField(
  val: CreateGroupRequestBodyMemberViewabilityLevelField,
): SerializedData {
  return val;
}
export function deserializeCreateGroupRequestBodyMemberViewabilityLevelField(
  val: SerializedData,
): CreateGroupRequestBodyMemberViewabilityLevelField {
  if (val == 'admins_only') {
    return val;
  }
  if (val == 'admins_and_members') {
    return val;
  }
  if (val == 'all_managed_users') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CreateGroupRequestBodyMemberViewabilityLevelField",
  });
}
export function serializeCreateGroupRequestBody(
  val: CreateGroupRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['provenance']: val.provenance,
    ['external_sync_identifier']: val.externalSyncIdentifier,
    ['description']: val.description,
    ['invitability_level']:
      val.invitabilityLevel == void 0
        ? val.invitabilityLevel
        : serializeCreateGroupRequestBodyInvitabilityLevelField(
            val.invitabilityLevel,
          ),
    ['member_viewability_level']:
      val.memberViewabilityLevel == void 0
        ? val.memberViewabilityLevel
        : serializeCreateGroupRequestBodyMemberViewabilityLevelField(
            val.memberViewabilityLevel,
          ),
  };
}
export function deserializeCreateGroupRequestBody(
  val: SerializedData,
): CreateGroupRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateGroupRequestBody"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "CreateGroupRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateGroupRequestBody"',
    });
  }
  const name: string = val.name;
  if (!(val.provenance == void 0) && !sdIsString(val.provenance)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "provenance" of type "CreateGroupRequestBody"',
    });
  }
  const provenance: undefined | string =
    val.provenance == void 0 ? void 0 : val.provenance;
  if (
    !(val.external_sync_identifier == void 0) &&
    !sdIsString(val.external_sync_identifier)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_sync_identifier" of type "CreateGroupRequestBody"',
    });
  }
  const externalSyncIdentifier: undefined | string =
    val.external_sync_identifier == void 0
      ? void 0
      : val.external_sync_identifier;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateGroupRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const invitabilityLevel:
    | undefined
    | CreateGroupRequestBodyInvitabilityLevelField =
    val.invitability_level == void 0
      ? void 0
      : deserializeCreateGroupRequestBodyInvitabilityLevelField(
          val.invitability_level,
        );
  const memberViewabilityLevel:
    | undefined
    | CreateGroupRequestBodyMemberViewabilityLevelField =
    val.member_viewability_level == void 0
      ? void 0
      : deserializeCreateGroupRequestBodyMemberViewabilityLevelField(
          val.member_viewability_level,
        );
  return {
    name: name,
    provenance: provenance,
    externalSyncIdentifier: externalSyncIdentifier,
    description: description,
    invitabilityLevel: invitabilityLevel,
    memberViewabilityLevel: memberViewabilityLevel,
  } satisfies CreateGroupRequestBody;
}
export function serializeUpdateGroupByIdRequestBodyInvitabilityLevelField(
  val: UpdateGroupByIdRequestBodyInvitabilityLevelField,
): SerializedData {
  return val;
}
export function deserializeUpdateGroupByIdRequestBodyInvitabilityLevelField(
  val: SerializedData,
): UpdateGroupByIdRequestBodyInvitabilityLevelField {
  if (val == 'admins_only') {
    return val;
  }
  if (val == 'admins_and_members') {
    return val;
  }
  if (val == 'all_managed_users') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateGroupByIdRequestBodyInvitabilityLevelField",
  });
}
export function serializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(
  val: UpdateGroupByIdRequestBodyMemberViewabilityLevelField,
): SerializedData {
  return val;
}
export function deserializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(
  val: SerializedData,
): UpdateGroupByIdRequestBodyMemberViewabilityLevelField {
  if (val == 'admins_only') {
    return val;
  }
  if (val == 'admins_and_members') {
    return val;
  }
  if (val == 'all_managed_users') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateGroupByIdRequestBodyMemberViewabilityLevelField",
  });
}
export function serializeUpdateGroupByIdRequestBody(
  val: UpdateGroupByIdRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['provenance']: val.provenance,
    ['external_sync_identifier']: val.externalSyncIdentifier,
    ['description']: val.description,
    ['invitability_level']:
      val.invitabilityLevel == void 0
        ? val.invitabilityLevel
        : serializeUpdateGroupByIdRequestBodyInvitabilityLevelField(
            val.invitabilityLevel,
          ),
    ['member_viewability_level']:
      val.memberViewabilityLevel == void 0
        ? val.memberViewabilityLevel
        : serializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(
            val.memberViewabilityLevel,
          ),
  };
}
export function deserializeUpdateGroupByIdRequestBody(
  val: SerializedData,
): UpdateGroupByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateGroupByIdRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateGroupByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.provenance == void 0) && !sdIsString(val.provenance)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "provenance" of type "UpdateGroupByIdRequestBody"',
    });
  }
  const provenance: undefined | string =
    val.provenance == void 0 ? void 0 : val.provenance;
  if (
    !(val.external_sync_identifier == void 0) &&
    !sdIsString(val.external_sync_identifier)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_sync_identifier" of type "UpdateGroupByIdRequestBody"',
    });
  }
  const externalSyncIdentifier: undefined | string =
    val.external_sync_identifier == void 0
      ? void 0
      : val.external_sync_identifier;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateGroupByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const invitabilityLevel:
    | undefined
    | UpdateGroupByIdRequestBodyInvitabilityLevelField =
    val.invitability_level == void 0
      ? void 0
      : deserializeUpdateGroupByIdRequestBodyInvitabilityLevelField(
          val.invitability_level,
        );
  const memberViewabilityLevel:
    | undefined
    | UpdateGroupByIdRequestBodyMemberViewabilityLevelField =
    val.member_viewability_level == void 0
      ? void 0
      : deserializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(
          val.member_viewability_level,
        );
  return {
    name: name,
    provenance: provenance,
    externalSyncIdentifier: externalSyncIdentifier,
    description: description,
    invitabilityLevel: invitabilityLevel,
    memberViewabilityLevel: memberViewabilityLevel,
  } satisfies UpdateGroupByIdRequestBody;
}
