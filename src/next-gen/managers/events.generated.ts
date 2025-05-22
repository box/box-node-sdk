import { serializeRealtimeServers } from '../schemas/realtimeServers.generated.js';
import { deserializeRealtimeServers } from '../schemas/realtimeServers.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeEvents } from '../schemas/events.generated.js';
import { deserializeEvents } from '../schemas/events.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { RealtimeServers } from '../schemas/realtimeServers.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { Events } from '../schemas/events.generated.js';
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
import { DateTime } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetEventsWithLongPollingHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetEventsWithLongPollingHeaders, 'extraHeaders'> &
      Partial<Pick<GetEventsWithLongPollingHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetEventsWithLongPollingHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type GetEventsQueryParamsStreamTypeField =
  | 'all'
  | 'changes'
  | 'sync'
  | 'admin_logs'
  | 'admin_logs_streaming'
  | string;
export type GetEventsQueryParamsEventTypeField =
  | 'ACCESS_GRANTED'
  | 'ACCESS_REVOKED'
  | 'ADD_DEVICE_ASSOCIATION'
  | 'ADD_LOGIN_ACTIVITY_DEVICE'
  | 'ADMIN_LOGIN'
  | 'APPLICATION_CREATED'
  | 'APPLICATION_PUBLIC_KEY_ADDED'
  | 'APPLICATION_PUBLIC_KEY_DELETED'
  | 'CHANGE_ADMIN_ROLE'
  | 'CHANGE_FOLDER_PERMISSION'
  | 'COLLABORATION_ACCEPT'
  | 'COLLABORATION_EXPIRATION'
  | 'COLLABORATION_INVITE'
  | 'COLLABORATION_REMOVE'
  | 'COLLABORATION_ROLE_CHANGE'
  | 'COMMENT_CREATE'
  | 'COMMENT_DELETE'
  | 'CONTENT_WORKFLOW_ABNORMAL_DOWNLOAD_ACTIVITY'
  | 'CONTENT_WORKFLOW_AUTOMATION_ADD'
  | 'CONTENT_WORKFLOW_AUTOMATION_DELETE'
  | 'CONTENT_WORKFLOW_POLICY_ADD'
  | 'CONTENT_WORKFLOW_SHARING_POLICY_VIOLATION'
  | 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION'
  | 'COPY'
  | 'DATA_RETENTION_CREATE_RETENTION'
  | 'DATA_RETENTION_REMOVE_RETENTION'
  | 'DELETE'
  | 'DELETE_USER'
  | 'DEVICE_TRUST_CHECK_FAILED'
  | 'DOWNLOAD'
  | 'EDIT'
  | 'EDIT_USER'
  | 'EMAIL_ALIAS_CONFIRM'
  | 'EMAIL_ALIAS_REMOVE'
  | 'ENTERPRISE_APP_AUTHORIZATION_UPDATE'
  | 'EXTERNAL_COLLAB_SECURITY_SETTINGS'
  | 'FAILED_LOGIN'
  | 'FILE_MARKED_MALICIOUS'
  | 'FILE_WATERMARKED_DOWNLOAD'
  | 'GROUP_ADD_ITEM'
  | 'GROUP_ADD_USER'
  | 'GROUP_CREATION'
  | 'GROUP_DELETION'
  | 'GROUP_EDITED'
  | 'GROUP_REMOVE_ITEM'
  | 'GROUP_REMOVE_USER'
  | 'ITEM_EMAIL_SEND'
  | 'ITEM_MODIFY'
  | 'ITEM_OPEN'
  | 'ITEM_SHARED_UPDATE'
  | 'ITEM_SYNC'
  | 'ITEM_UNSYNC'
  | 'LEGAL_HOLD_ASSIGNMENT_CREATE'
  | 'LEGAL_HOLD_ASSIGNMENT_DELETE'
  | 'LEGAL_HOLD_POLICY_CREATE'
  | 'LEGAL_HOLD_POLICY_DELETE'
  | 'LEGAL_HOLD_POLICY_UPDATE'
  | 'LOCK'
  | 'LOGIN'
  | 'METADATA_INSTANCE_CREATE'
  | 'METADATA_INSTANCE_DELETE'
  | 'METADATA_INSTANCE_UPDATE'
  | 'METADATA_TEMPLATE_CREATE'
  | 'METADATA_TEMPLATE_DELETE'
  | 'METADATA_TEMPLATE_UPDATE'
  | 'MOVE'
  | 'NEW_USER'
  | 'OAUTH2_ACCESS_TOKEN_REVOKE'
  | 'PREVIEW'
  | 'REMOVE_DEVICE_ASSOCIATION'
  | 'REMOVE_LOGIN_ACTIVITY_DEVICE'
  | 'RENAME'
  | 'RETENTION_POLICY_ASSIGNMENT_ADD'
  | 'SHARE'
  | 'SHARED_LINK_SEND'
  | 'SHARE_EXPIRATION'
  | 'SHIELD_ALERT'
  | 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED'
  | 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED_MISSING_JUSTIFICATION'
  | 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED'
  | 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED_MISSING_JUSTIFICATION'
  | 'SHIELD_JUSTIFICATION_APPROVAL'
  | 'SHIELD_SHARED_LINK_ACCESS_BLOCKED'
  | 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_CREATE'
  | 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_UPDATE'
  | 'SIGN_DOCUMENT_ASSIGNED'
  | 'SIGN_DOCUMENT_CANCELLED'
  | 'SIGN_DOCUMENT_COMPLETED'
  | 'SIGN_DOCUMENT_CONVERTED'
  | 'SIGN_DOCUMENT_CREATED'
  | 'SIGN_DOCUMENT_DECLINED'
  | 'SIGN_DOCUMENT_EXPIRED'
  | 'SIGN_DOCUMENT_SIGNED'
  | 'SIGN_DOCUMENT_VIEWED_BY_SIGNED'
  | 'SIGNER_DOWNLOADED'
  | 'SIGNER_FORWARDED'
  | 'STORAGE_EXPIRATION'
  | 'TASK_ASSIGNMENT_CREATE'
  | 'TASK_ASSIGNMENT_DELETE'
  | 'TASK_ASSIGNMENT_UPDATE'
  | 'TASK_CREATE'
  | 'TASK_UPDATE'
  | 'TERMS_OF_SERVICE_ACCEPT'
  | 'TERMS_OF_SERVICE_REJECT'
  | 'UNDELETE'
  | 'UNLOCK'
  | 'UNSHARE'
  | 'UPDATE_COLLABORATION_EXPIRATION'
  | 'UPDATE_SHARE_EXPIRATION'
  | 'UPLOAD'
  | 'USER_AUTHENTICATE_OAUTH2_ACCESS_TOKEN_CREATE'
  | 'WATERMARK_LABEL_CREATE'
  | 'WATERMARK_LABEL_DELETE'
  | string;
export interface GetEventsQueryParams {
  /**
   * Defines the type of events that are returned
   *
   * * `all` returns everything for a user and is the default
   * * `changes` returns events that may cause file tree changes
   *   such as file updates or collaborations.
   * * `sync` is similar to `changes` but only applies to synced folders
   * * `admin_logs` returns all events for an entire enterprise and
   *   requires the user making the API call to have admin permissions. This
   *   stream type is for programmatically pulling from a 1 year history of
   *   events across all users within the enterprise and within a
   *   `created_after` and `created_before` time frame. The complete history
   *   of events will be returned in chronological order based on the event
   *   time, but latency will be much higher than `admin_logs_streaming`.
   * * `admin_logs_streaming` returns all events for an entire enterprise and
   *   requires the user making the API call to have admin permissions. This
   *   stream type is for polling for recent events across all users within
   *   the enterprise. Latency will be much lower than `admin_logs`, but
   *   events will not be returned in chronological order and may
   *   contain duplicates. */
  readonly streamType?: GetEventsQueryParamsStreamTypeField;
  /**
   * The location in the event stream to start receiving events from.
   *
   * * `now` will return an empty list events and
   * the latest stream position for initialization.
   * * `0` or `null` will return all events. */
  readonly streamPosition?: string;
  /**
   * Limits the number of events returned
   *
   * Note: Sometimes, the events less than the limit requested can be returned
   * even when there may be more events remaining. This is primarily done in
   * the case where a number of events have already been retrieved and these
   * retrieved events are returned rather than delaying for an unknown amount
   * of time to see if there are any more results. */
  readonly limit?: number;
  /**
   * A comma-separated list of events to filter by. This can only be used when
   * requesting the events with a `stream_type` of `admin_logs` or
   * `adming_logs_streaming`. For any other `stream_type` this value will be
   * ignored. */
  readonly eventType?: readonly GetEventsQueryParamsEventTypeField[];
  /**
   * The lower bound date and time to return events for. This can only be used
   * when requesting the events with a `stream_type` of `admin_logs`. For any
   * other `stream_type` this value will be ignored. */
  readonly createdAfter?: DateTime;
  /**
   * The upper bound date and time to return events for. This can only be used
   * when requesting the events with a `stream_type` of `admin_logs`. For any
   * other `stream_type` this value will be ignored. */
  readonly createdBefore?: DateTime;
}
export class GetEventsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetEventsHeaders, 'extraHeaders'> &
      Partial<Pick<GetEventsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetEventsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class EventsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      EventsManager,
      'networkSession' | 'getEventsWithLongPolling' | 'getEvents'
    > &
      Partial<Pick<EventsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns a list of real-time servers that can be used for long-polling updates
   * to the [event stream](#get-events).
   *
   * Long polling is the concept where a HTTP request is kept open until the
   * server sends a response, then repeating the process over and over to receive
   * updated responses.
   *
   * Long polling the event stream can only be used for user events, not for
   * enterprise events.
   *
   * To use long polling, first use this endpoint to retrieve a list of long poll
   * URLs. Next, make a long poll request to any of the provided URLs.
   *
   * When an event occurs in monitored account a response with the value
   * `new_change` will be sent. The response contains no other details as
   * it only serves as a prompt to take further action such as sending a
   * request to the [events endpoint](#get-events) with the last known
   * `stream_position`.
   *
   * After the server sends this response it closes the connection. You must now
   * repeat the long poll process to begin listening for events again.
   *
   * If no events occur for a while and the connection times out you will
   * receive a response with the value `reconnect`. When you receive this response
   * you’ll make another call to this endpoint to restart the process.
   *
   * If you receive no events in `retry_timeout` seconds then you will need to
   * make another request to the real-time server (one of the URLs in the response
   * for this endpoint). This might be necessary due to network errors.
   *
   * Finally, if you receive a `max_retries` error when making a request to the
   * real-time server, you should start over by making a call to this endpoint
   * first.
   * @param {GetEventsWithLongPollingHeadersInput} headersInput Headers of getEventsWithLongPolling method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<RealtimeServers>}
   */
  async getEventsWithLongPolling(
    headersInput: GetEventsWithLongPollingHeadersInput = new GetEventsWithLongPollingHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<RealtimeServers> {
    const headers: GetEventsWithLongPollingHeaders =
      new GetEventsWithLongPollingHeaders({
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
            '/2.0/events',
          ) as string,
          method: 'OPTIONS',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeRealtimeServers(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Returns up to a year of past events for a given user
   * or for the entire enterprise.
   *
   * By default this returns events for the authenticated user. To retrieve events
   * for the entire enterprise, set the `stream_type` to `admin_logs_streaming`
   * for live monitoring of new events, or `admin_logs` for querying across
   * historical events. The user making the API call will
   * need to have admin privileges, and the application will need to have the
   * scope `manage enterprise properties` checked.
   * @param {GetEventsQueryParams} queryParams Query parameters of getEvents method
   * @param {GetEventsHeadersInput} headersInput Headers of getEvents method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<Events>}
   */
  async getEvents(
    queryParams: GetEventsQueryParams = {} satisfies GetEventsQueryParams,
    headersInput: GetEventsHeadersInput = new GetEventsHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<Events> {
    const headers: GetEventsHeaders = new GetEventsHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['stream_type']: toString(queryParams.streamType) as string,
      ['stream_position']: toString(queryParams.streamPosition) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['event_type']: queryParams.eventType
        ? queryParams.eventType.map(toString).join(',')
        : undefined,
      ['created_after']: queryParams.createdAfter
        ? serializeDateTime(queryParams.createdAfter)
        : undefined,
      ['created_before']: queryParams.createdBefore
        ? serializeDateTime(queryParams.createdBefore)
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
            '/2.0/events',
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
      ...deserializeEvents(response.data!),
      rawData: response.data!,
    };
  }
}
export interface EventsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeGetEventsQueryParamsStreamTypeField(
  val: GetEventsQueryParamsStreamTypeField,
): SerializedData {
  return val;
}
export function deserializeGetEventsQueryParamsStreamTypeField(
  val: SerializedData,
): GetEventsQueryParamsStreamTypeField {
  if (val == 'all') {
    return val;
  }
  if (val == 'changes') {
    return val;
  }
  if (val == 'sync') {
    return val;
  }
  if (val == 'admin_logs') {
    return val;
  }
  if (val == 'admin_logs_streaming') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetEventsQueryParamsStreamTypeField",
  });
}
export function serializeGetEventsQueryParamsEventTypeField(
  val: GetEventsQueryParamsEventTypeField,
): SerializedData {
  return val;
}
export function deserializeGetEventsQueryParamsEventTypeField(
  val: SerializedData,
): GetEventsQueryParamsEventTypeField {
  if (val == 'ACCESS_GRANTED') {
    return val;
  }
  if (val == 'ACCESS_REVOKED') {
    return val;
  }
  if (val == 'ADD_DEVICE_ASSOCIATION') {
    return val;
  }
  if (val == 'ADD_LOGIN_ACTIVITY_DEVICE') {
    return val;
  }
  if (val == 'ADMIN_LOGIN') {
    return val;
  }
  if (val == 'APPLICATION_CREATED') {
    return val;
  }
  if (val == 'APPLICATION_PUBLIC_KEY_ADDED') {
    return val;
  }
  if (val == 'APPLICATION_PUBLIC_KEY_DELETED') {
    return val;
  }
  if (val == 'CHANGE_ADMIN_ROLE') {
    return val;
  }
  if (val == 'CHANGE_FOLDER_PERMISSION') {
    return val;
  }
  if (val == 'COLLABORATION_ACCEPT') {
    return val;
  }
  if (val == 'COLLABORATION_EXPIRATION') {
    return val;
  }
  if (val == 'COLLABORATION_INVITE') {
    return val;
  }
  if (val == 'COLLABORATION_REMOVE') {
    return val;
  }
  if (val == 'COLLABORATION_ROLE_CHANGE') {
    return val;
  }
  if (val == 'COMMENT_CREATE') {
    return val;
  }
  if (val == 'COMMENT_DELETE') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_ABNORMAL_DOWNLOAD_ACTIVITY') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_AUTOMATION_ADD') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_AUTOMATION_DELETE') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_POLICY_ADD') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_SHARING_POLICY_VIOLATION') {
    return val;
  }
  if (val == 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION') {
    return val;
  }
  if (val == 'COPY') {
    return val;
  }
  if (val == 'DATA_RETENTION_CREATE_RETENTION') {
    return val;
  }
  if (val == 'DATA_RETENTION_REMOVE_RETENTION') {
    return val;
  }
  if (val == 'DELETE') {
    return val;
  }
  if (val == 'DELETE_USER') {
    return val;
  }
  if (val == 'DEVICE_TRUST_CHECK_FAILED') {
    return val;
  }
  if (val == 'DOWNLOAD') {
    return val;
  }
  if (val == 'EDIT') {
    return val;
  }
  if (val == 'EDIT_USER') {
    return val;
  }
  if (val == 'EMAIL_ALIAS_CONFIRM') {
    return val;
  }
  if (val == 'EMAIL_ALIAS_REMOVE') {
    return val;
  }
  if (val == 'ENTERPRISE_APP_AUTHORIZATION_UPDATE') {
    return val;
  }
  if (val == 'EXTERNAL_COLLAB_SECURITY_SETTINGS') {
    return val;
  }
  if (val == 'FAILED_LOGIN') {
    return val;
  }
  if (val == 'FILE_MARKED_MALICIOUS') {
    return val;
  }
  if (val == 'FILE_WATERMARKED_DOWNLOAD') {
    return val;
  }
  if (val == 'GROUP_ADD_ITEM') {
    return val;
  }
  if (val == 'GROUP_ADD_USER') {
    return val;
  }
  if (val == 'GROUP_CREATION') {
    return val;
  }
  if (val == 'GROUP_DELETION') {
    return val;
  }
  if (val == 'GROUP_EDITED') {
    return val;
  }
  if (val == 'GROUP_REMOVE_ITEM') {
    return val;
  }
  if (val == 'GROUP_REMOVE_USER') {
    return val;
  }
  if (val == 'ITEM_EMAIL_SEND') {
    return val;
  }
  if (val == 'ITEM_MODIFY') {
    return val;
  }
  if (val == 'ITEM_OPEN') {
    return val;
  }
  if (val == 'ITEM_SHARED_UPDATE') {
    return val;
  }
  if (val == 'ITEM_SYNC') {
    return val;
  }
  if (val == 'ITEM_UNSYNC') {
    return val;
  }
  if (val == 'LEGAL_HOLD_ASSIGNMENT_CREATE') {
    return val;
  }
  if (val == 'LEGAL_HOLD_ASSIGNMENT_DELETE') {
    return val;
  }
  if (val == 'LEGAL_HOLD_POLICY_CREATE') {
    return val;
  }
  if (val == 'LEGAL_HOLD_POLICY_DELETE') {
    return val;
  }
  if (val == 'LEGAL_HOLD_POLICY_UPDATE') {
    return val;
  }
  if (val == 'LOCK') {
    return val;
  }
  if (val == 'LOGIN') {
    return val;
  }
  if (val == 'METADATA_INSTANCE_CREATE') {
    return val;
  }
  if (val == 'METADATA_INSTANCE_DELETE') {
    return val;
  }
  if (val == 'METADATA_INSTANCE_UPDATE') {
    return val;
  }
  if (val == 'METADATA_TEMPLATE_CREATE') {
    return val;
  }
  if (val == 'METADATA_TEMPLATE_DELETE') {
    return val;
  }
  if (val == 'METADATA_TEMPLATE_UPDATE') {
    return val;
  }
  if (val == 'MOVE') {
    return val;
  }
  if (val == 'NEW_USER') {
    return val;
  }
  if (val == 'OAUTH2_ACCESS_TOKEN_REVOKE') {
    return val;
  }
  if (val == 'PREVIEW') {
    return val;
  }
  if (val == 'REMOVE_DEVICE_ASSOCIATION') {
    return val;
  }
  if (val == 'REMOVE_LOGIN_ACTIVITY_DEVICE') {
    return val;
  }
  if (val == 'RENAME') {
    return val;
  }
  if (val == 'RETENTION_POLICY_ASSIGNMENT_ADD') {
    return val;
  }
  if (val == 'SHARE') {
    return val;
  }
  if (val == 'SHARED_LINK_SEND') {
    return val;
  }
  if (val == 'SHARE_EXPIRATION') {
    return val;
  }
  if (val == 'SHIELD_ALERT') {
    return val;
  }
  if (val == 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED') {
    return val;
  }
  if (val == 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED_MISSING_JUSTIFICATION') {
    return val;
  }
  if (val == 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED') {
    return val;
  }
  if (val == 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED_MISSING_JUSTIFICATION') {
    return val;
  }
  if (val == 'SHIELD_JUSTIFICATION_APPROVAL') {
    return val;
  }
  if (val == 'SHIELD_SHARED_LINK_ACCESS_BLOCKED') {
    return val;
  }
  if (val == 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_CREATE') {
    return val;
  }
  if (val == 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_UPDATE') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_ASSIGNED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_CANCELLED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_COMPLETED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_CONVERTED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_CREATED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_DECLINED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_EXPIRED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_SIGNED') {
    return val;
  }
  if (val == 'SIGN_DOCUMENT_VIEWED_BY_SIGNED') {
    return val;
  }
  if (val == 'SIGNER_DOWNLOADED') {
    return val;
  }
  if (val == 'SIGNER_FORWARDED') {
    return val;
  }
  if (val == 'STORAGE_EXPIRATION') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT_CREATE') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT_DELETE') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT_UPDATE') {
    return val;
  }
  if (val == 'TASK_CREATE') {
    return val;
  }
  if (val == 'TASK_UPDATE') {
    return val;
  }
  if (val == 'TERMS_OF_SERVICE_ACCEPT') {
    return val;
  }
  if (val == 'TERMS_OF_SERVICE_REJECT') {
    return val;
  }
  if (val == 'UNDELETE') {
    return val;
  }
  if (val == 'UNLOCK') {
    return val;
  }
  if (val == 'UNSHARE') {
    return val;
  }
  if (val == 'UPDATE_COLLABORATION_EXPIRATION') {
    return val;
  }
  if (val == 'UPDATE_SHARE_EXPIRATION') {
    return val;
  }
  if (val == 'UPLOAD') {
    return val;
  }
  if (val == 'USER_AUTHENTICATE_OAUTH2_ACCESS_TOKEN_CREATE') {
    return val;
  }
  if (val == 'WATERMARK_LABEL_CREATE') {
    return val;
  }
  if (val == 'WATERMARK_LABEL_DELETE') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GetEventsQueryParamsEventTypeField",
  });
}
