import { serializeUsers } from '../schemas/users.generated.js';
import { deserializeUsers } from '../schemas/users.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeTrackingCode } from '../schemas/trackingCode.generated.js';
import { deserializeTrackingCode } from '../schemas/trackingCode.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Users } from '../schemas/users.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { TrackingCode } from '../schemas/trackingCode.generated.js';
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
export class CreateUserOptionals {
  readonly queryParams: CreateUserQueryParams =
    {} satisfies CreateUserQueryParams;
  readonly headers: CreateUserHeaders = new CreateUserHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateUserOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateUserOptionals,
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
export interface CreateUserOptionalsInput {
  readonly queryParams?: CreateUserQueryParams;
  readonly headers?: CreateUserHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetUserByIdOptionals {
  readonly queryParams: GetUserByIdQueryParams =
    {} satisfies GetUserByIdQueryParams;
  readonly headers: GetUserByIdHeaders = new GetUserByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetUserByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetUserByIdOptionals,
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
export interface GetUserByIdOptionalsInput {
  readonly queryParams?: GetUserByIdQueryParams;
  readonly headers?: GetUserByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateUserByIdOptionals {
  readonly requestBody: UpdateUserByIdRequestBody =
    {} satisfies UpdateUserByIdRequestBody;
  readonly queryParams: UpdateUserByIdQueryParams =
    {} satisfies UpdateUserByIdQueryParams;
  readonly headers: UpdateUserByIdHeaders = new UpdateUserByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateUserByIdOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateUserByIdOptionals,
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
export interface UpdateUserByIdOptionalsInput {
  readonly requestBody?: UpdateUserByIdRequestBody;
  readonly queryParams?: UpdateUserByIdQueryParams;
  readonly headers?: UpdateUserByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteUserByIdOptionals {
  readonly queryParams: DeleteUserByIdQueryParams =
    {} satisfies DeleteUserByIdQueryParams;
  readonly headers: DeleteUserByIdHeaders = new DeleteUserByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteUserByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteUserByIdOptionals,
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
export interface DeleteUserByIdOptionalsInput {
  readonly queryParams?: DeleteUserByIdQueryParams;
  readonly headers?: DeleteUserByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export type GetUsersQueryParamsUserTypeField =
  | 'all'
  | 'managed'
  | 'external'
  | string;
export interface GetUsersQueryParams {
  /**
   * Limits the results to only users who's `name` or
   * `login` start with the search term.
   *
   * For externally managed users, the search term needs
   * to completely match the in order to find the user, and
   * it will only return one user at a time. */
  readonly filterTerm?: string;
  /**
   * Limits the results to the kind of user specified.
   *
   * * `all` returns every kind of user for whom the
   *   `login` or `name` partially matches the
   *   `filter_term`. It will only return an external user
   *   if the login matches the `filter_term` completely,
   *   and in that case it will only return that user.
   * * `managed` returns all managed and app users for whom
   *   the `login` or `name` partially matches the
   *   `filter_term`.
   * * `external` returns all external users for whom the
   *   `login` matches the `filter_term` exactly. */
  readonly userType?: GetUsersQueryParamsUserTypeField;
  /**
   * Limits the results to app users with the given
   * `external_app_user_id` value.
   *
   * When creating an app user, an
   * `external_app_user_id` value can be set. This value can
   * then be used in this endpoint to find any users that
   * match that `external_app_user_id` value. */
  readonly externalAppUserId?: string;
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
}
export class GetUsersHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetUsersHeaders, 'extraHeaders'> &
      Partial<Pick<GetUsersHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetUsersHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateUserRequestBodyRoleField = 'coadmin' | 'user' | string;
export type CreateUserRequestBodyStatusField =
  | 'active'
  | 'inactive'
  | 'cannot_delete_edit'
  | 'cannot_delete_edit_upload'
  | string;
export interface CreateUserRequestBody {
  /**
   * The name of the user. */
  readonly name: string;
  /**
   * The email address the user uses to log in
   *
   * Required, unless `is_platform_access_only`
   * is set to `true`. */
  readonly login?: string;
  /**
   * Specifies that the user is an app user. */
  readonly isPlatformAccessOnly?: boolean;
  /**
   * The user’s enterprise role. */
  readonly role?: CreateUserRequestBodyRoleField;
  /**
   * The language of the user, formatted in modified version of the
   * [ISO 639-1](/guides/api-calls/language-codes) format. */
  readonly language?: string;
  /**
   * Whether the user can use Box Sync. */
  readonly isSyncEnabled?: boolean;
  /**
   * The user’s job title. */
  readonly jobTitle?: string;
  /**
   * The user’s phone number. */
  readonly phone?: string;
  /**
   * The user’s address. */
  readonly address?: string;
  /**
   * The user’s total available space in bytes. Set this to `-1` to
   * indicate unlimited storage. */
  readonly spaceAmount?: number;
  /**
   * Tracking codes allow an admin to generate reports from the
   * admin console and assign an attribute to a specific group
   * of users. This setting must be enabled for an enterprise before it
   * can be used. */
  readonly trackingCodes?: readonly TrackingCode[];
  /**
   * Whether the user can see other enterprise users in their
   * contact list. */
  readonly canSeeManagedUsers?: boolean;
  /**
   * The user's timezone. */
  readonly timezone?: string;
  /**
   * Whether the user is allowed to collaborate with users outside
   * their enterprise. */
  readonly isExternalCollabRestricted?: boolean;
  /**
   * Whether to exempt the user from enterprise device limits. */
  readonly isExemptFromDeviceLimits?: boolean;
  /**
   * Whether the user must use two-factor authentication. */
  readonly isExemptFromLoginVerification?: boolean;
  /**
   * The user's account status. */
  readonly status?: CreateUserRequestBodyStatusField;
  /**
   * An external identifier for an app user, which can be used to look
   * up the user. This can be used to tie user IDs from external
   * identity providers to Box users. */
  readonly externalAppUserId?: string;
  readonly rawData?: SerializedData;
}
export interface CreateUserQueryParams {
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
export class CreateUserHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateUserHeaders, 'extraHeaders'> &
      Partial<Pick<CreateUserHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateUserHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetUserMeQueryParams {
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
export class GetUserMeHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetUserMeHeaders, 'extraHeaders'> &
      Partial<Pick<GetUserMeHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetUserMeHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetUserByIdQueryParams {
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
export class GetUserByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetUserByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetUserByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetUserByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateUserByIdRequestBodyRoleField = 'coadmin' | 'user' | string;
export type UpdateUserByIdRequestBodyStatusField =
  | 'active'
  | 'inactive'
  | 'cannot_delete_edit'
  | 'cannot_delete_edit_upload'
  | string;
export interface UpdateUserByIdRequestBodyNotificationEmailField {
  /**
   * The email address to send the notifications to. */
  readonly email?: string;
  readonly rawData?: SerializedData;
}
export interface UpdateUserByIdRequestBody {
  /**
   * Set this to `null` to roll the user out of the enterprise
   * and make them a free user. */
  readonly enterprise?: string | null;
  /**
   * Whether the user should receive an email when they
   * are rolled out of an enterprise. */
  readonly notify?: boolean;
  /**
   * The name of the user. */
  readonly name?: string;
  /**
   * The email address the user uses to log in
   *
   * Note: If the target user's email is not confirmed, then the
   * primary login address cannot be changed. */
  readonly login?: string;
  /**
   * The user’s enterprise role. */
  readonly role?: UpdateUserByIdRequestBodyRoleField;
  /**
   * The language of the user, formatted in modified version of the
   * [ISO 639-1](/guides/api-calls/language-codes) format. */
  readonly language?: string;
  /**
   * Whether the user can use Box Sync. */
  readonly isSyncEnabled?: boolean;
  /**
   * The user’s job title. */
  readonly jobTitle?: string;
  /**
   * The user’s phone number. */
  readonly phone?: string;
  /**
   * The user’s address. */
  readonly address?: string;
  /**
   * Tracking codes allow an admin to generate reports from the
   * admin console and assign an attribute to a specific group
   * of users. This setting must be enabled for an enterprise before it
   * can be used. */
  readonly trackingCodes?: readonly TrackingCode[];
  /**
   * Whether the user can see other enterprise users in their
   * contact list. */
  readonly canSeeManagedUsers?: boolean;
  /**
   * The user's timezone. */
  readonly timezone?: string;
  /**
   * Whether the user is allowed to collaborate with users outside
   * their enterprise. */
  readonly isExternalCollabRestricted?: boolean;
  /**
   * Whether to exempt the user from enterprise device limits. */
  readonly isExemptFromDeviceLimits?: boolean;
  /**
   * Whether the user must use two-factor authentication. */
  readonly isExemptFromLoginVerification?: boolean;
  /**
   * Whether the user is required to reset their password. */
  readonly isPasswordResetRequired?: boolean;
  /**
   * The user's account status. */
  readonly status?: UpdateUserByIdRequestBodyStatusField;
  /**
   * The user’s total available space in bytes. Set this to `-1` to
   * indicate unlimited storage. */
  readonly spaceAmount?: number;
  /**
   * An alternate notification email address to which email
   * notifications are sent. When it's confirmed, this will be
   * the email address to which notifications are sent instead of
   * to the primary email address.
   *
   * Set this value to `null` to remove the notification email. */
  readonly notificationEmail?: UpdateUserByIdRequestBodyNotificationEmailField | null;
  /**
   * An external identifier for an app user, which can be used to look
   * up the user. This can be used to tie user IDs from external
   * identity providers to Box users.
   *
   * Note: In order to update this field, you need to request a token
   * using the application that created the app user. */
  readonly externalAppUserId?: string;
  readonly rawData?: SerializedData;
}
export interface UpdateUserByIdQueryParams {
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
export class UpdateUserByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateUserByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateUserByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateUserByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface DeleteUserByIdQueryParams {
  /**
   * Whether the user will receive email notification of
   * the deletion. */
  readonly notify?: boolean;
  /**
   * Whether the user should be deleted even if this user
   * still own files. */
  readonly force?: boolean;
}
export class DeleteUserByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteUserByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteUserByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteUserByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class UsersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      UsersManager,
      | 'networkSession'
      | 'getUsers'
      | 'createUser'
      | 'getUserMe'
      | 'getUserById'
      | 'updateUserById'
      | 'deleteUserById'
    > &
      Partial<Pick<UsersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns a list of all users for the Enterprise along with their `user_id`,
   * `public_name`, and `login`.
   *
   * The application and the authenticated user need to
   * have the permission to look up users in the entire
   * enterprise.
   * @param {GetUsersQueryParams} queryParams Query parameters of getUsers method
   * @param {GetUsersHeadersInput} headersInput Headers of getUsers method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<Users>}
   */
  async getUsers(
    queryParams: GetUsersQueryParams = {} satisfies GetUsersQueryParams,
    headersInput: GetUsersHeadersInput = new GetUsersHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<Users> {
    const headers: GetUsersHeaders = new GetUsersHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['filter_term']: toString(queryParams.filterTerm) as string,
      ['user_type']: toString(queryParams.userType) as string,
      ['external_app_user_id']: toString(
        queryParams.externalAppUserId,
      ) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['offset']: toString(queryParams.offset) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['usemarker']: toString(queryParams.usemarker) as string,
      ['marker']: toString(queryParams.marker) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/users',
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
      ...deserializeUsers(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a new managed user in an enterprise. This endpoint
   * is only available to users and applications with the right
   * admin permissions.
   * @param {CreateUserRequestBody} requestBody Request body of createUser method
   * @param {CreateUserOptionalsInput} optionalsInput
   * @returns {Promise<UserFull>}
   */
  async createUser(
    requestBody: CreateUserRequestBody,
    optionalsInput: CreateUserOptionalsInput = {},
  ): Promise<UserFull> {
    const optionals: CreateUserOptionals = new CreateUserOptionals({
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
            '/2.0/users',
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeCreateUserRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeUserFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Retrieves information about the user who is currently authenticated.
   *
   * In the case of a client-side authenticated OAuth 2.0 application
   * this will be the user who authorized the app.
   *
   * In the case of a JWT, server-side authenticated application
   * this will be the service account that belongs to the application
   * by default.
   *
   * Use the `As-User` header to change who this API call is made on behalf of.
   * @param {GetUserMeQueryParams} queryParams Query parameters of getUserMe method
   * @param {GetUserMeHeadersInput} headersInput Headers of getUserMe method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<UserFull>}
   */
  async getUserMe(
    queryParams: GetUserMeQueryParams = {} satisfies GetUserMeQueryParams,
    headersInput: GetUserMeHeadersInput = new GetUserMeHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<UserFull> {
    const headers: GetUserMeHeaders = new GetUserMeHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
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
            '/2.0/users/me',
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
      ...deserializeUserFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves information about a user in the enterprise.
     *
     * The application and the authenticated user need to
     * have the permission to look up users in the entire
     * enterprise.
     *
     * This endpoint also returns a limited set of information
     * for external users who are collaborated on content
     * owned by the enterprise for authenticated users with the
     * right scopes. In this case, disallowed fields will return
     * null instead.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {GetUserByIdOptionalsInput} optionalsInput
     * @returns {Promise<UserFull>}
     */
  async getUserById(
    userId: string,
    optionalsInput: GetUserByIdOptionalsInput = {},
  ): Promise<UserFull> {
    const optionals: GetUserByIdOptionals = new GetUserByIdOptionals({
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
            '/2.0/users/',
            toString(userId) as string,
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
      ...deserializeUserFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a managed or app user in an enterprise. This endpoint
     * is only available to users and applications with the right
     * admin permissions.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {UpdateUserByIdOptionalsInput} optionalsInput
     * @returns {Promise<UserFull>}
     */
  async updateUserById(
    userId: string,
    optionalsInput: UpdateUserByIdOptionalsInput = {},
  ): Promise<UserFull> {
    const optionals: UpdateUserByIdOptionals = new UpdateUserByIdOptionals({
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
            '/2.0/users/',
            toString(userId) as string,
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateUserByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeUserFull(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a user. By default this will fail if the user
     * still owns any content. Move their owned content first
     * before proceeding, or use the `force` field to delete
     * the user and their files.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {DeleteUserByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteUserById(
    userId: string,
    optionalsInput: DeleteUserByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteUserByIdOptionals = new DeleteUserByIdOptionals({
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
      ['notify']: toString(queryParams.notify) as string,
      ['force']: toString(queryParams.force) as string,
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
}
export interface UsersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetUsersQueryParamsUserTypeField(
  val: GetUsersQueryParamsUserTypeField,
): SerializedData {
  return val;
}
export function deserializeGetUsersQueryParamsUserTypeField(
  val: SerializedData,
): GetUsersQueryParamsUserTypeField {
  if (val == 'all') {
    return val;
  }
  if (val == 'managed') {
    return val;
  }
  if (val == 'external') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetUsersQueryParamsUserTypeField",
  });
}
export function serializeCreateUserRequestBodyRoleField(
  val: CreateUserRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeCreateUserRequestBodyRoleField(
  val: SerializedData,
): CreateUserRequestBodyRoleField {
  if (val == 'coadmin') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateUserRequestBodyRoleField",
  });
}
export function serializeCreateUserRequestBodyStatusField(
  val: CreateUserRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeCreateUserRequestBodyStatusField(
  val: SerializedData,
): CreateUserRequestBodyStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'inactive') {
    return val;
  }
  if (val == 'cannot_delete_edit') {
    return val;
  }
  if (val == 'cannot_delete_edit_upload') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateUserRequestBodyStatusField",
  });
}
export function serializeCreateUserRequestBody(
  val: CreateUserRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['login']: val.login,
    ['is_platform_access_only']: val.isPlatformAccessOnly,
    ['role']:
      val.role == void 0
        ? val.role
        : serializeCreateUserRequestBodyRoleField(val.role),
    ['language']: val.language,
    ['is_sync_enabled']: val.isSyncEnabled,
    ['job_title']: val.jobTitle,
    ['phone']: val.phone,
    ['address']: val.address,
    ['space_amount']: val.spaceAmount,
    ['tracking_codes']:
      val.trackingCodes == void 0
        ? val.trackingCodes
        : (val.trackingCodes.map(function (item: TrackingCode): SerializedData {
            return serializeTrackingCode(item);
          }) as readonly any[]),
    ['can_see_managed_users']: val.canSeeManagedUsers,
    ['timezone']: val.timezone,
    ['is_external_collab_restricted']: val.isExternalCollabRestricted,
    ['is_exempt_from_device_limits']: val.isExemptFromDeviceLimits,
    ['is_exempt_from_login_verification']: val.isExemptFromLoginVerification,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeCreateUserRequestBodyStatusField(val.status),
    ['external_app_user_id']: val.externalAppUserId,
  };
}
export function deserializeCreateUserRequestBody(
  val: SerializedData,
): CreateUserRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateUserRequestBody"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "CreateUserRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateUserRequestBody"',
    });
  }
  const name: string = val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "CreateUserRequestBody"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (
    !(val.is_platform_access_only == void 0) &&
    !sdIsBoolean(val.is_platform_access_only)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_platform_access_only" of type "CreateUserRequestBody"',
    });
  }
  const isPlatformAccessOnly: undefined | boolean =
    val.is_platform_access_only == void 0
      ? void 0
      : val.is_platform_access_only;
  const role: undefined | CreateUserRequestBodyRoleField =
    val.role == void 0
      ? void 0
      : deserializeCreateUserRequestBodyRoleField(val.role);
  if (!(val.language == void 0) && !sdIsString(val.language)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "language" of type "CreateUserRequestBody"',
    });
  }
  const language: undefined | string =
    val.language == void 0 ? void 0 : val.language;
  if (!(val.is_sync_enabled == void 0) && !sdIsBoolean(val.is_sync_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_sync_enabled" of type "CreateUserRequestBody"',
    });
  }
  const isSyncEnabled: undefined | boolean =
    val.is_sync_enabled == void 0 ? void 0 : val.is_sync_enabled;
  if (!(val.job_title == void 0) && !sdIsString(val.job_title)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_title" of type "CreateUserRequestBody"',
    });
  }
  const jobTitle: undefined | string =
    val.job_title == void 0 ? void 0 : val.job_title;
  if (!(val.phone == void 0) && !sdIsString(val.phone)) {
    throw new BoxSdkError({
      message: 'Expecting string for "phone" of type "CreateUserRequestBody"',
    });
  }
  const phone: undefined | string = val.phone == void 0 ? void 0 : val.phone;
  if (!(val.address == void 0) && !sdIsString(val.address)) {
    throw new BoxSdkError({
      message: 'Expecting string for "address" of type "CreateUserRequestBody"',
    });
  }
  const address: undefined | string =
    val.address == void 0 ? void 0 : val.address;
  if (!(val.space_amount == void 0) && !sdIsNumber(val.space_amount)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "space_amount" of type "CreateUserRequestBody"',
    });
  }
  const spaceAmount: undefined | number =
    val.space_amount == void 0 ? void 0 : val.space_amount;
  if (!(val.tracking_codes == void 0) && !sdIsList(val.tracking_codes)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "tracking_codes" of type "CreateUserRequestBody"',
    });
  }
  const trackingCodes: undefined | readonly TrackingCode[] =
    val.tracking_codes == void 0
      ? void 0
      : sdIsList(val.tracking_codes)
        ? (val.tracking_codes.map(function (itm: SerializedData): TrackingCode {
            return deserializeTrackingCode(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.can_see_managed_users == void 0) &&
    !sdIsBoolean(val.can_see_managed_users)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_see_managed_users" of type "CreateUserRequestBody"',
    });
  }
  const canSeeManagedUsers: undefined | boolean =
    val.can_see_managed_users == void 0 ? void 0 : val.can_see_managed_users;
  if (!(val.timezone == void 0) && !sdIsString(val.timezone)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "timezone" of type "CreateUserRequestBody"',
    });
  }
  const timezone: undefined | string =
    val.timezone == void 0 ? void 0 : val.timezone;
  if (
    !(val.is_external_collab_restricted == void 0) &&
    !sdIsBoolean(val.is_external_collab_restricted)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_external_collab_restricted" of type "CreateUserRequestBody"',
    });
  }
  const isExternalCollabRestricted: undefined | boolean =
    val.is_external_collab_restricted == void 0
      ? void 0
      : val.is_external_collab_restricted;
  if (
    !(val.is_exempt_from_device_limits == void 0) &&
    !sdIsBoolean(val.is_exempt_from_device_limits)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_exempt_from_device_limits" of type "CreateUserRequestBody"',
    });
  }
  const isExemptFromDeviceLimits: undefined | boolean =
    val.is_exempt_from_device_limits == void 0
      ? void 0
      : val.is_exempt_from_device_limits;
  if (
    !(val.is_exempt_from_login_verification == void 0) &&
    !sdIsBoolean(val.is_exempt_from_login_verification)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_exempt_from_login_verification" of type "CreateUserRequestBody"',
    });
  }
  const isExemptFromLoginVerification: undefined | boolean =
    val.is_exempt_from_login_verification == void 0
      ? void 0
      : val.is_exempt_from_login_verification;
  const status: undefined | CreateUserRequestBodyStatusField =
    val.status == void 0
      ? void 0
      : deserializeCreateUserRequestBodyStatusField(val.status);
  if (
    !(val.external_app_user_id == void 0) &&
    !sdIsString(val.external_app_user_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_app_user_id" of type "CreateUserRequestBody"',
    });
  }
  const externalAppUserId: undefined | string =
    val.external_app_user_id == void 0 ? void 0 : val.external_app_user_id;
  return {
    name: name,
    login: login,
    isPlatformAccessOnly: isPlatformAccessOnly,
    role: role,
    language: language,
    isSyncEnabled: isSyncEnabled,
    jobTitle: jobTitle,
    phone: phone,
    address: address,
    spaceAmount: spaceAmount,
    trackingCodes: trackingCodes,
    canSeeManagedUsers: canSeeManagedUsers,
    timezone: timezone,
    isExternalCollabRestricted: isExternalCollabRestricted,
    isExemptFromDeviceLimits: isExemptFromDeviceLimits,
    isExemptFromLoginVerification: isExemptFromLoginVerification,
    status: status,
    externalAppUserId: externalAppUserId,
  } satisfies CreateUserRequestBody;
}
export function serializeUpdateUserByIdRequestBodyRoleField(
  val: UpdateUserByIdRequestBodyRoleField,
): SerializedData {
  return val;
}
export function deserializeUpdateUserByIdRequestBodyRoleField(
  val: SerializedData,
): UpdateUserByIdRequestBodyRoleField {
  if (val == 'coadmin') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateUserByIdRequestBodyRoleField",
  });
}
export function serializeUpdateUserByIdRequestBodyStatusField(
  val: UpdateUserByIdRequestBodyStatusField,
): SerializedData {
  return val;
}
export function deserializeUpdateUserByIdRequestBodyStatusField(
  val: SerializedData,
): UpdateUserByIdRequestBodyStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'inactive') {
    return val;
  }
  if (val == 'cannot_delete_edit') {
    return val;
  }
  if (val == 'cannot_delete_edit_upload') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateUserByIdRequestBodyStatusField",
  });
}
export function serializeUpdateUserByIdRequestBodyNotificationEmailField(
  val: UpdateUserByIdRequestBodyNotificationEmailField,
): SerializedData {
  return { ['email']: val.email };
}
export function deserializeUpdateUserByIdRequestBodyNotificationEmailField(
  val: SerializedData,
): UpdateUserByIdRequestBodyNotificationEmailField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateUserByIdRequestBodyNotificationEmailField"',
    });
  }
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "UpdateUserByIdRequestBodyNotificationEmailField"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  return {
    email: email,
  } satisfies UpdateUserByIdRequestBodyNotificationEmailField;
}
export function serializeUpdateUserByIdRequestBody(
  val: UpdateUserByIdRequestBody,
): SerializedData {
  return {
    ['enterprise']: val.enterprise,
    ['notify']: val.notify,
    ['name']: val.name,
    ['login']: val.login,
    ['role']:
      val.role == void 0
        ? val.role
        : serializeUpdateUserByIdRequestBodyRoleField(val.role),
    ['language']: val.language,
    ['is_sync_enabled']: val.isSyncEnabled,
    ['job_title']: val.jobTitle,
    ['phone']: val.phone,
    ['address']: val.address,
    ['tracking_codes']:
      val.trackingCodes == void 0
        ? val.trackingCodes
        : (val.trackingCodes.map(function (item: TrackingCode): SerializedData {
            return serializeTrackingCode(item);
          }) as readonly any[]),
    ['can_see_managed_users']: val.canSeeManagedUsers,
    ['timezone']: val.timezone,
    ['is_external_collab_restricted']: val.isExternalCollabRestricted,
    ['is_exempt_from_device_limits']: val.isExemptFromDeviceLimits,
    ['is_exempt_from_login_verification']: val.isExemptFromLoginVerification,
    ['is_password_reset_required']: val.isPasswordResetRequired,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeUpdateUserByIdRequestBodyStatusField(val.status),
    ['space_amount']: val.spaceAmount,
    ['notification_email']:
      val.notificationEmail == void 0
        ? val.notificationEmail
        : serializeUpdateUserByIdRequestBodyNotificationEmailField(
            val.notificationEmail,
          ),
    ['external_app_user_id']: val.externalAppUserId,
  };
}
export function deserializeUpdateUserByIdRequestBody(
  val: SerializedData,
): UpdateUserByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateUserByIdRequestBody"',
    });
  }
  if (!(val.enterprise == void 0) && !sdIsString(val.enterprise)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "enterprise" of type "UpdateUserByIdRequestBody"',
    });
  }
  const enterprise: undefined | string =
    val.enterprise == void 0 ? void 0 : val.enterprise;
  if (!(val.notify == void 0) && !sdIsBoolean(val.notify)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "notify" of type "UpdateUserByIdRequestBody"',
    });
  }
  const notify: undefined | boolean =
    val.notify == void 0 ? void 0 : val.notify;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateUserByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "login" of type "UpdateUserByIdRequestBody"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  const role: undefined | UpdateUserByIdRequestBodyRoleField =
    val.role == void 0
      ? void 0
      : deserializeUpdateUserByIdRequestBodyRoleField(val.role);
  if (!(val.language == void 0) && !sdIsString(val.language)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "language" of type "UpdateUserByIdRequestBody"',
    });
  }
  const language: undefined | string =
    val.language == void 0 ? void 0 : val.language;
  if (!(val.is_sync_enabled == void 0) && !sdIsBoolean(val.is_sync_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_sync_enabled" of type "UpdateUserByIdRequestBody"',
    });
  }
  const isSyncEnabled: undefined | boolean =
    val.is_sync_enabled == void 0 ? void 0 : val.is_sync_enabled;
  if (!(val.job_title == void 0) && !sdIsString(val.job_title)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_title" of type "UpdateUserByIdRequestBody"',
    });
  }
  const jobTitle: undefined | string =
    val.job_title == void 0 ? void 0 : val.job_title;
  if (!(val.phone == void 0) && !sdIsString(val.phone)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "phone" of type "UpdateUserByIdRequestBody"',
    });
  }
  const phone: undefined | string = val.phone == void 0 ? void 0 : val.phone;
  if (!(val.address == void 0) && !sdIsString(val.address)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "address" of type "UpdateUserByIdRequestBody"',
    });
  }
  const address: undefined | string =
    val.address == void 0 ? void 0 : val.address;
  if (!(val.tracking_codes == void 0) && !sdIsList(val.tracking_codes)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "tracking_codes" of type "UpdateUserByIdRequestBody"',
    });
  }
  const trackingCodes: undefined | readonly TrackingCode[] =
    val.tracking_codes == void 0
      ? void 0
      : sdIsList(val.tracking_codes)
        ? (val.tracking_codes.map(function (itm: SerializedData): TrackingCode {
            return deserializeTrackingCode(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.can_see_managed_users == void 0) &&
    !sdIsBoolean(val.can_see_managed_users)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_see_managed_users" of type "UpdateUserByIdRequestBody"',
    });
  }
  const canSeeManagedUsers: undefined | boolean =
    val.can_see_managed_users == void 0 ? void 0 : val.can_see_managed_users;
  if (!(val.timezone == void 0) && !sdIsString(val.timezone)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "timezone" of type "UpdateUserByIdRequestBody"',
    });
  }
  const timezone: undefined | string =
    val.timezone == void 0 ? void 0 : val.timezone;
  if (
    !(val.is_external_collab_restricted == void 0) &&
    !sdIsBoolean(val.is_external_collab_restricted)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_external_collab_restricted" of type "UpdateUserByIdRequestBody"',
    });
  }
  const isExternalCollabRestricted: undefined | boolean =
    val.is_external_collab_restricted == void 0
      ? void 0
      : val.is_external_collab_restricted;
  if (
    !(val.is_exempt_from_device_limits == void 0) &&
    !sdIsBoolean(val.is_exempt_from_device_limits)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_exempt_from_device_limits" of type "UpdateUserByIdRequestBody"',
    });
  }
  const isExemptFromDeviceLimits: undefined | boolean =
    val.is_exempt_from_device_limits == void 0
      ? void 0
      : val.is_exempt_from_device_limits;
  if (
    !(val.is_exempt_from_login_verification == void 0) &&
    !sdIsBoolean(val.is_exempt_from_login_verification)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_exempt_from_login_verification" of type "UpdateUserByIdRequestBody"',
    });
  }
  const isExemptFromLoginVerification: undefined | boolean =
    val.is_exempt_from_login_verification == void 0
      ? void 0
      : val.is_exempt_from_login_verification;
  if (
    !(val.is_password_reset_required == void 0) &&
    !sdIsBoolean(val.is_password_reset_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_password_reset_required" of type "UpdateUserByIdRequestBody"',
    });
  }
  const isPasswordResetRequired: undefined | boolean =
    val.is_password_reset_required == void 0
      ? void 0
      : val.is_password_reset_required;
  const status: undefined | UpdateUserByIdRequestBodyStatusField =
    val.status == void 0
      ? void 0
      : deserializeUpdateUserByIdRequestBodyStatusField(val.status);
  if (!(val.space_amount == void 0) && !sdIsNumber(val.space_amount)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "space_amount" of type "UpdateUserByIdRequestBody"',
    });
  }
  const spaceAmount: undefined | number =
    val.space_amount == void 0 ? void 0 : val.space_amount;
  const notificationEmail:
    | undefined
    | UpdateUserByIdRequestBodyNotificationEmailField =
    val.notification_email == void 0
      ? void 0
      : deserializeUpdateUserByIdRequestBodyNotificationEmailField(
          val.notification_email,
        );
  if (
    !(val.external_app_user_id == void 0) &&
    !sdIsString(val.external_app_user_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_app_user_id" of type "UpdateUserByIdRequestBody"',
    });
  }
  const externalAppUserId: undefined | string =
    val.external_app_user_id == void 0 ? void 0 : val.external_app_user_id;
  return {
    enterprise: enterprise,
    notify: notify,
    name: name,
    login: login,
    role: role,
    language: language,
    isSyncEnabled: isSyncEnabled,
    jobTitle: jobTitle,
    phone: phone,
    address: address,
    trackingCodes: trackingCodes,
    canSeeManagedUsers: canSeeManagedUsers,
    timezone: timezone,
    isExternalCollabRestricted: isExternalCollabRestricted,
    isExemptFromDeviceLimits: isExemptFromDeviceLimits,
    isExemptFromLoginVerification: isExemptFromLoginVerification,
    isPasswordResetRequired: isPasswordResetRequired,
    status: status,
    spaceAmount: spaceAmount,
    notificationEmail: notificationEmail,
    externalAppUserId: externalAppUserId,
  } satisfies UpdateUserByIdRequestBody;
}
