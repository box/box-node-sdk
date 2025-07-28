import { serializeGroupMemberships } from '../schemas/groupMemberships.generated.js';
import { deserializeGroupMemberships } from '../schemas/groupMemberships.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeGroupMembership } from '../schemas/groupMembership.generated.js';
import { deserializeGroupMembership } from '../schemas/groupMembership.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { GroupMemberships } from '../schemas/groupMemberships.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { GroupMembership } from '../schemas/groupMembership.generated.js';
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
export class GetUserMembershipsOptionals {
  readonly queryParams: GetUserMembershipsQueryParams =
    {} satisfies GetUserMembershipsQueryParams;
  readonly headers: GetUserMembershipsHeaders = new GetUserMembershipsHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetUserMembershipsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetUserMembershipsOptionals,
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
export interface GetUserMembershipsOptionalsInput {
  readonly queryParams?: GetUserMembershipsQueryParams;
  readonly headers?: GetUserMembershipsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetGroupMembershipsOptionals {
  readonly queryParams: GetGroupMembershipsQueryParams =
    {} satisfies GetGroupMembershipsQueryParams;
  readonly headers: GetGroupMembershipsHeaders = new GetGroupMembershipsHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetGroupMembershipsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetGroupMembershipsOptionals,
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
export interface GetGroupMembershipsOptionalsInput {
  readonly queryParams?: GetGroupMembershipsQueryParams;
  readonly headers?: GetGroupMembershipsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateGroupMembershipOptionals {
  readonly queryParams: CreateGroupMembershipQueryParams =
    {} satisfies CreateGroupMembershipQueryParams;
  readonly headers: CreateGroupMembershipHeaders =
    new CreateGroupMembershipHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateGroupMembershipOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateGroupMembershipOptionals,
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
export interface CreateGroupMembershipOptionalsInput {
  readonly queryParams?: CreateGroupMembershipQueryParams;
  readonly headers?: CreateGroupMembershipHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetGroupMembershipByIdOptionals {
  readonly queryParams: GetGroupMembershipByIdQueryParams =
    {} satisfies GetGroupMembershipByIdQueryParams;
  readonly headers: GetGroupMembershipByIdHeaders =
    new GetGroupMembershipByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetGroupMembershipByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetGroupMembershipByIdOptionals,
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
export interface GetGroupMembershipByIdOptionalsInput {
  readonly queryParams?: GetGroupMembershipByIdQueryParams;
  readonly headers?: GetGroupMembershipByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateGroupMembershipByIdOptionals {
  readonly requestBody: UpdateGroupMembershipByIdRequestBody =
    {} satisfies UpdateGroupMembershipByIdRequestBody;
  readonly queryParams: UpdateGroupMembershipByIdQueryParams =
    {} satisfies UpdateGroupMembershipByIdQueryParams;
  readonly headers: UpdateGroupMembershipByIdHeaders =
    new UpdateGroupMembershipByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateGroupMembershipByIdOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateGroupMembershipByIdOptionals,
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
export interface UpdateGroupMembershipByIdOptionalsInput {
  readonly requestBody?: UpdateGroupMembershipByIdRequestBody;
  readonly queryParams?: UpdateGroupMembershipByIdQueryParams;
  readonly headers?: UpdateGroupMembershipByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteGroupMembershipByIdOptionals {
  readonly headers: DeleteGroupMembershipByIdHeaders =
    new DeleteGroupMembershipByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteGroupMembershipByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteGroupMembershipByIdOptionals,
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
export interface DeleteGroupMembershipByIdOptionalsInput {
  readonly headers?: DeleteGroupMembershipByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetUserMembershipsQueryParams {
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
export class GetUserMembershipsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetUserMembershipsHeaders, 'extraHeaders'> &
      Partial<Pick<GetUserMembershipsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetUserMembershipsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetGroupMembershipsQueryParams {
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
export class GetGroupMembershipsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGroupMembershipsHeaders, 'extraHeaders'> &
      Partial<Pick<GetGroupMembershipsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGroupMembershipsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateGroupMembershipRequestBodyUserField {
  /**
   * The ID of the user to add to the group. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateGroupMembershipRequestBodyGroupField {
  /**
   * The ID of the group to add the user to. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type CreateGroupMembershipRequestBodyRoleField =
  | 'member'
  | 'admin'
  | string;
export interface CreateGroupMembershipRequestBody {
  /**
   * The user to add to the group. */
  readonly user: CreateGroupMembershipRequestBodyUserField;
  /**
   * The group to add the user to. */
  readonly group: CreateGroupMembershipRequestBodyGroupField;
  /**
   * The role of the user in the group. */
  readonly role?: CreateGroupMembershipRequestBodyRoleField;
  /**
   * Custom configuration for the permissions an admin
   * if a group will receive. This option has no effect
   * on members with a role of `member`.
   *
   * Setting these permissions overwrites the default
   * access levels of an admin.
   *
   * Specifying a value of `null` for this object will disable
   * all configurable permissions. Specifying permissions will set
   * them accordingly, omitted permissions will be enabled by default. */
  readonly configurablePermissions?: {
    readonly [key: string]: boolean;
  } | null;
  readonly rawData?: SerializedData;
}
export interface CreateGroupMembershipQueryParams {
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
export class CreateGroupMembershipHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateGroupMembershipHeaders, 'extraHeaders'> &
      Partial<Pick<CreateGroupMembershipHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateGroupMembershipHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetGroupMembershipByIdQueryParams {
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
export class GetGroupMembershipByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetGroupMembershipByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetGroupMembershipByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetGroupMembershipByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateGroupMembershipByIdRequestBodyRoleField =
  | 'member'
  | 'admin'
  | string;
export interface UpdateGroupMembershipByIdRequestBody {
  /**
   * The role of the user in the group. */
  readonly role?: UpdateGroupMembershipByIdRequestBodyRoleField;
  /**
   * Custom configuration for the permissions an admin
   * if a group will receive. This option has no effect
   * on members with a role of `member`.
   *
   * Setting these permissions overwrites the default
   * access levels of an admin.
   *
   * Specifying a value of `null` for this object will disable
   * all configurable permissions. Specifying permissions will set
   * them accordingly, omitted permissions will be enabled by default. */
  readonly configurablePermissions?: {
    readonly [key: string]: boolean;
  } | null;
  readonly rawData?: SerializedData;
}
export interface UpdateGroupMembershipByIdQueryParams {
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
export class UpdateGroupMembershipByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateGroupMembershipByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateGroupMembershipByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateGroupMembershipByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteGroupMembershipByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteGroupMembershipByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteGroupMembershipByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteGroupMembershipByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class MembershipsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      MembershipsManager,
      | 'networkSession'
      | 'getUserMemberships'
      | 'getGroupMemberships'
      | 'createGroupMembership'
      | 'getGroupMembershipById'
      | 'updateGroupMembershipById'
      | 'deleteGroupMembershipById'
    > &
      Partial<Pick<MembershipsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves all the groups for a user. Only members of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {GetUserMembershipsOptionalsInput} optionalsInput
     * @returns {Promise<GroupMemberships>}
     */
  async getUserMemberships(
    userId: string,
    optionalsInput: GetUserMembershipsOptionalsInput = {},
  ): Promise<GroupMemberships> {
    const optionals: GetUserMembershipsOptionals =
      new GetUserMembershipsOptionals({
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
            '/2.0/users/',
            toString(userId) as string,
            '/memberships',
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
      ...deserializeGroupMemberships(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves all the members for a group. Only members of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupId The ID of the group.
    Example: "57645"
     * @param {GetGroupMembershipsOptionalsInput} optionalsInput
     * @returns {Promise<GroupMemberships>}
     */
  async getGroupMemberships(
    groupId: string,
    optionalsInput: GetGroupMembershipsOptionalsInput = {},
  ): Promise<GroupMemberships> {
    const optionals: GetGroupMembershipsOptionals =
      new GetGroupMembershipsOptionals({
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
            '/2.0/groups/',
            toString(groupId) as string,
            '/memberships',
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
      ...deserializeGroupMemberships(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a group membership. Only users with
   * admin-level permissions will be able to use this API.
   * @param {CreateGroupMembershipRequestBody} requestBody Request body of createGroupMembership method
   * @param {CreateGroupMembershipOptionalsInput} optionalsInput
   * @returns {Promise<GroupMembership>}
   */
  async createGroupMembership(
    requestBody: CreateGroupMembershipRequestBody,
    optionalsInput: CreateGroupMembershipOptionalsInput = {},
  ): Promise<GroupMembership> {
    const optionals: CreateGroupMembershipOptionals =
      new CreateGroupMembershipOptionals({
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
            '/2.0/group_memberships',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateGroupMembershipRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeGroupMembership(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a specific group membership. Only admins of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupMembershipId The ID of the group membership.
    Example: "434534"
     * @param {GetGroupMembershipByIdOptionalsInput} optionalsInput
     * @returns {Promise<GroupMembership>}
     */
  async getGroupMembershipById(
    groupMembershipId: string,
    optionalsInput: GetGroupMembershipByIdOptionalsInput = {},
  ): Promise<GroupMembership> {
    const optionals: GetGroupMembershipByIdOptionals =
      new GetGroupMembershipByIdOptionals({
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
            '/2.0/group_memberships/',
            toString(groupMembershipId) as string,
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
      ...deserializeGroupMembership(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a user's group membership. Only admins of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupMembershipId The ID of the group membership.
    Example: "434534"
     * @param {UpdateGroupMembershipByIdOptionalsInput} optionalsInput
     * @returns {Promise<GroupMembership>}
     */
  async updateGroupMembershipById(
    groupMembershipId: string,
    optionalsInput: UpdateGroupMembershipByIdOptionalsInput = {},
  ): Promise<GroupMembership> {
    const optionals: UpdateGroupMembershipByIdOptionals =
      new UpdateGroupMembershipByIdOptionals({
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
            '/2.0/group_memberships/',
            toString(groupMembershipId) as string,
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateGroupMembershipByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeGroupMembership(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a specific group membership. Only admins of this
     * group or users with admin-level permissions will be able to
     * use this API.
     * @param {string} groupMembershipId The ID of the group membership.
    Example: "434534"
     * @param {DeleteGroupMembershipByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteGroupMembershipById(
    groupMembershipId: string,
    optionalsInput: DeleteGroupMembershipByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteGroupMembershipByIdOptionals =
      new DeleteGroupMembershipByIdOptionals({
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
            '/2.0/group_memberships/',
            toString(groupMembershipId) as string,
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
export interface MembershipsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateGroupMembershipRequestBodyUserField(
  val: CreateGroupMembershipRequestBodyUserField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateGroupMembershipRequestBodyUserField(
  val: SerializedData,
): CreateGroupMembershipRequestBodyUserField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateGroupMembershipRequestBodyUserField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateGroupMembershipRequestBodyUserField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateGroupMembershipRequestBodyUserField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CreateGroupMembershipRequestBodyUserField;
}
export function serializeCreateGroupMembershipRequestBodyGroupField(
  val: CreateGroupMembershipRequestBodyGroupField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateGroupMembershipRequestBodyGroupField(
  val: SerializedData,
): CreateGroupMembershipRequestBodyGroupField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateGroupMembershipRequestBodyGroupField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateGroupMembershipRequestBodyGroupField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateGroupMembershipRequestBodyGroupField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CreateGroupMembershipRequestBodyGroupField;
}
export function serializeCreateGroupMembershipRequestBodyRoleField(
  val: CreateGroupMembershipRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeCreateGroupMembershipRequestBodyRoleField(
  val: SerializedData,
): CreateGroupMembershipRequestBodyRoleField {
  if (val == 'member') {
    return val;
  }
  if (val == 'admin') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateGroupMembershipRequestBodyRoleField",
  });
}
export function serializeCreateGroupMembershipRequestBody(
  val: CreateGroupMembershipRequestBody,
): SerializedData {
  return {
    ['user']: serializeCreateGroupMembershipRequestBodyUserField(val.user),
    ['group']: serializeCreateGroupMembershipRequestBodyGroupField(val.group),
    ['role']:
      val.role == void 0
        ? val.role
        : serializeCreateGroupMembershipRequestBodyRoleField(val.role),
    ['configurable_permissions']:
      val.configurablePermissions == void 0
        ? val.configurablePermissions
        : val.configurablePermissions,
  };
}
export function deserializeCreateGroupMembershipRequestBody(
  val: SerializedData,
): CreateGroupMembershipRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateGroupMembershipRequestBody"',
    });
  }
  if (val.user == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user" of type "CreateGroupMembershipRequestBody" to be defined',
    });
  }
  const user: CreateGroupMembershipRequestBodyUserField =
    deserializeCreateGroupMembershipRequestBodyUserField(val.user);
  if (val.group == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "group" of type "CreateGroupMembershipRequestBody" to be defined',
    });
  }
  const group: CreateGroupMembershipRequestBodyGroupField =
    deserializeCreateGroupMembershipRequestBodyGroupField(val.group);
  const role: undefined | CreateGroupMembershipRequestBodyRoleField =
    val.role == void 0
      ? void 0
      : deserializeCreateGroupMembershipRequestBodyRoleField(val.role);
  if (
    !(val.configurable_permissions == void 0) &&
    !sdIsMap(val.configurable_permissions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting object for "configurable_permissions" of type "CreateGroupMembershipRequestBody"',
    });
  }
  const configurablePermissions:
    | undefined
    | {
        readonly [key: string]: boolean;
      } =
    val.configurable_permissions == void 0
      ? void 0
      : sdIsMap(val.configurable_permissions)
        ? (Object.fromEntries(
            Object.entries(val.configurable_permissions).map(
              ([k, v]: [string, any]) => [
                k,
                (function (v: any): any {
                  if (!sdIsBoolean(v)) {
                    throw new BoxSdkError({
                      message:
                        'Expecting boolean for "CreateGroupMembershipRequestBody"',
                    });
                  }
                  return v;
                })(v),
              ],
            ),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  return {
    user: user,
    group: group,
    role: role,
    configurablePermissions: configurablePermissions,
  } satisfies CreateGroupMembershipRequestBody;
}
export function serializeUpdateGroupMembershipByIdRequestBodyRoleField(
  val: UpdateGroupMembershipByIdRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeUpdateGroupMembershipByIdRequestBodyRoleField(
  val: SerializedData,
): UpdateGroupMembershipByIdRequestBodyRoleField {
  if (val == 'member') {
    return val;
  }
  if (val == 'admin') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateGroupMembershipByIdRequestBodyRoleField",
  });
}
export function serializeUpdateGroupMembershipByIdRequestBody(
  val: UpdateGroupMembershipByIdRequestBody,
): SerializedData {
  return {
    ['role']:
      val.role == void 0
        ? val.role
        : serializeUpdateGroupMembershipByIdRequestBodyRoleField(val.role),
    ['configurable_permissions']:
      val.configurablePermissions == void 0
        ? val.configurablePermissions
        : val.configurablePermissions,
  };
}
export function deserializeUpdateGroupMembershipByIdRequestBody(
  val: SerializedData,
): UpdateGroupMembershipByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateGroupMembershipByIdRequestBody"',
    });
  }
  const role: undefined | UpdateGroupMembershipByIdRequestBodyRoleField =
    val.role == void 0
      ? void 0
      : deserializeUpdateGroupMembershipByIdRequestBodyRoleField(val.role);
  if (
    !(val.configurable_permissions == void 0) &&
    !sdIsMap(val.configurable_permissions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting object for "configurable_permissions" of type "UpdateGroupMembershipByIdRequestBody"',
    });
  }
  const configurablePermissions:
    | undefined
    | {
        readonly [key: string]: boolean;
      } =
    val.configurable_permissions == void 0
      ? void 0
      : sdIsMap(val.configurable_permissions)
        ? (Object.fromEntries(
            Object.entries(val.configurable_permissions).map(
              ([k, v]: [string, any]) => [
                k,
                (function (v: any): any {
                  if (!sdIsBoolean(v)) {
                    throw new BoxSdkError({
                      message:
                        'Expecting boolean for "UpdateGroupMembershipByIdRequestBody"',
                    });
                  }
                  return v;
                })(v),
              ],
            ),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  return {
    role: role,
    configurablePermissions: configurablePermissions,
  } satisfies UpdateGroupMembershipByIdRequestBody;
}
