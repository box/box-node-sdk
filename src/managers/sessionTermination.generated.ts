import { serializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
import { deserializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { SessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
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
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class TerminateUsersSessionsOptionals {
  readonly headers: TerminateUsersSessionsHeaders =
    new TerminateUsersSessionsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      TerminateUsersSessionsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<TerminateUsersSessionsOptionals, 'headers' | 'cancellationToken'>
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
export interface TerminateUsersSessionsOptionalsInput {
  readonly headers?: TerminateUsersSessionsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class TerminateGroupsSessionsOptionals {
  readonly headers: TerminateGroupsSessionsHeaders =
    new TerminateGroupsSessionsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      TerminateGroupsSessionsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<TerminateGroupsSessionsOptionals, 'headers' | 'cancellationToken'>
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
export interface TerminateGroupsSessionsOptionalsInput {
  readonly headers?: TerminateGroupsSessionsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface TerminateUsersSessionsRequestBody {
  /**
   * A list of user IDs. */
  readonly userIds: readonly string[];
  /**
   * A list of user logins. */
  readonly userLogins: readonly string[];
  readonly rawData?: SerializedData;
}
export class TerminateUsersSessionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<TerminateUsersSessionsHeaders, 'extraHeaders'> &
      Partial<Pick<TerminateUsersSessionsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface TerminateUsersSessionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface TerminateGroupsSessionsRequestBody {
  /**
   * A list of group IDs. */
  readonly groupIds: readonly string[];
  readonly rawData?: SerializedData;
}
export class TerminateGroupsSessionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<TerminateGroupsSessionsHeaders, 'extraHeaders'> &
      Partial<Pick<TerminateGroupsSessionsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface TerminateGroupsSessionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SessionTerminationManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SessionTerminationManager,
      'networkSession' | 'terminateUsersSessions' | 'terminateGroupsSessions'
    > &
      Partial<Pick<SessionTerminationManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Validates the roles and permissions of the user,
   * and creates asynchronous jobs
   * to terminate the user's sessions.
   * Returns the status for the POST request.
   * @param {TerminateUsersSessionsRequestBody} requestBody Request body of terminateUsersSessions method
   * @param {TerminateUsersSessionsOptionalsInput} optionalsInput
   * @returns {Promise<SessionTerminationMessage>}
   */
  async terminateUsersSessions(
    requestBody: TerminateUsersSessionsRequestBody,
    optionalsInput: TerminateUsersSessionsOptionalsInput = {},
  ): Promise<SessionTerminationMessage> {
    const optionals: TerminateUsersSessionsOptionals =
      new TerminateUsersSessionsOptionals({
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
            '/2.0/users/terminate_sessions',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeTerminateUsersSessionsRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeSessionTerminationMessage(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Validates the roles and permissions of the group,
   * and creates asynchronous jobs
   * to terminate the group's sessions.
   * Returns the status for the POST request.
   * @param {TerminateGroupsSessionsRequestBody} requestBody Request body of terminateGroupsSessions method
   * @param {TerminateGroupsSessionsOptionalsInput} optionalsInput
   * @returns {Promise<SessionTerminationMessage>}
   */
  async terminateGroupsSessions(
    requestBody: TerminateGroupsSessionsRequestBody,
    optionalsInput: TerminateGroupsSessionsOptionalsInput = {},
  ): Promise<SessionTerminationMessage> {
    const optionals: TerminateGroupsSessionsOptionals =
      new TerminateGroupsSessionsOptionals({
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
            '/2.0/groups/terminate_sessions',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeTerminateGroupsSessionsRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeSessionTerminationMessage(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SessionTerminationManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeTerminateUsersSessionsRequestBody(
  val: TerminateUsersSessionsRequestBody,
): SerializedData {
  return {
    ['user_ids']: val.userIds.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
    ['user_logins']: val.userLogins.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeTerminateUsersSessionsRequestBody(
  val: SerializedData,
): TerminateUsersSessionsRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TerminateUsersSessionsRequestBody"',
    });
  }
  if (val.user_ids == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user_ids" of type "TerminateUsersSessionsRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.user_ids)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "user_ids" of type "TerminateUsersSessionsRequestBody"',
    });
  }
  const userIds: readonly string[] = sdIsList(val.user_ids)
    ? (val.user_ids.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "TerminateUsersSessionsRequestBody"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  if (val.user_logins == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user_logins" of type "TerminateUsersSessionsRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.user_logins)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "user_logins" of type "TerminateUsersSessionsRequestBody"',
    });
  }
  const userLogins: readonly string[] = sdIsList(val.user_logins)
    ? (val.user_logins.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "TerminateUsersSessionsRequestBody"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    userIds: userIds,
    userLogins: userLogins,
  } satisfies TerminateUsersSessionsRequestBody;
}
export function serializeTerminateGroupsSessionsRequestBody(
  val: TerminateGroupsSessionsRequestBody,
): SerializedData {
  return {
    ['group_ids']: val.groupIds.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeTerminateGroupsSessionsRequestBody(
  val: SerializedData,
): TerminateGroupsSessionsRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TerminateGroupsSessionsRequestBody"',
    });
  }
  if (val.group_ids == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "group_ids" of type "TerminateGroupsSessionsRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.group_ids)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "group_ids" of type "TerminateGroupsSessionsRequestBody"',
    });
  }
  const groupIds: readonly string[] = sdIsList(val.group_ids)
    ? (val.group_ids.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message:
              'Expecting string for "TerminateGroupsSessionsRequestBody"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return { groupIds: groupIds } satisfies TerminateGroupsSessionsRequestBody;
}
