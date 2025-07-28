import { serializeAppItemEventSource } from './appItemEventSource.generated.js';
import { deserializeAppItemEventSource } from './appItemEventSource.generated.js';
import { serializeEventSource } from './eventSource.generated.js';
import { deserializeEventSource } from './eventSource.generated.js';
import { serializeFile } from './file.generated.js';
import { deserializeFile } from './file.generated.js';
import { serializeFolder } from './folder.generated.js';
import { deserializeFolder } from './folder.generated.js';
import { serializeGenericSource } from './genericSource.generated.js';
import { deserializeGenericSource } from './genericSource.generated.js';
import { serializeUser } from './user.generated.js';
import { deserializeUser } from './user.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeAppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser } from './appItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser.generated.js';
import { deserializeAppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser } from './appItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { AppItemEventSource } from './appItemEventSource.generated.js';
import { EventSource } from './eventSource.generated.js';
import { File } from './file.generated.js';
import { Folder } from './folder.generated.js';
import { GenericSource } from './genericSource.generated.js';
import { User } from './user.generated.js';
import { UserMini } from './userMini.generated.js';
import { AppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser } from './appItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type EventEventTypeField =
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
  | 'COLLAB_ADD_COLLABORATOR'
  | 'COLLAB_INVITE_COLLABORATOR'
  | 'COLLAB_REMOVE_COLLABORATOR'
  | 'COLLAB_ROLE_CHANGE'
  | 'COMMENT_CREATE'
  | 'COMMENT_DELETE'
  | 'CONTENT_ACCESS'
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
  | 'EDR_CROWDSTRIKE_DEVICE_DETECTED'
  | 'EDR_CROWDSTRIKE_NO_BOX_TOOLS'
  | 'EDR_CROWDSTRIKE_BOX_TOOLS_OUTDATED'
  | 'EDR_CROWDSTRIKE_DRIVE_OUTDATED'
  | 'EDR_CROWDSTRIKE_ACCESS_ALLOWED_NO_CROWDSTRIKE_DEVICE'
  | 'EDR_CROWDSTRIKE_ACCESS_REVOKED'
  | 'EMAIL_ALIAS_CONFIRM'
  | 'EMAIL_ALIAS_REMOVE'
  | 'ENABLE_TWO_FACTOR_AUTH'
  | 'ENTERPRISE_APP_AUTHORIZATION_UPDATE'
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
  | 'ITEM_COPY'
  | 'ITEM_CREATE'
  | 'ITEM_DOWNLOAD'
  | 'ITEM_EMAIL_SEND'
  | 'ITEM_MAKE_CURRENT_VERSION'
  | 'ITEM_MODIFY'
  | 'ITEM_MOVE'
  | 'ITEM_OPEN'
  | 'ITEM_PREVIEW'
  | 'ITEM_RENAME'
  | 'ITEM_SHARED'
  | 'ITEM_SHARED_CREATE'
  | 'ITEM_SHARED_UNSHARE'
  | 'ITEM_SHARED_UPDATE'
  | 'ITEM_SYNC'
  | 'ITEM_TRASH'
  | 'ITEM_UNDELETE_VIA_TRASH'
  | 'ITEM_UNSYNC'
  | 'ITEM_UPLOAD'
  | 'LEGAL_HOLD_ASSIGNMENT_CREATE'
  | 'LEGAL_HOLD_ASSIGNMENT_DELETE'
  | 'LEGAL_HOLD_POLICY_CREATE'
  | 'LEGAL_HOLD_POLICY_DELETE'
  | 'LEGAL_HOLD_POLICY_UPDATE'
  | 'LOCK'
  | 'LOCK_CREATE'
  | 'LOCK_DESTROY'
  | 'LOGIN'
  | 'MASTER_INVITE_ACCEPT'
  | 'MASTER_INVITE_REJECT'
  | 'METADATA_INSTANCE_CREATE'
  | 'METADATA_INSTANCE_DELETE'
  | 'METADATA_INSTANCE_UPDATE'
  | 'METADATA_TEMPLATE_CREATE'
  | 'METADATA_TEMPLATE_DELETE'
  | 'METADATA_TEMPLATE_UPDATE'
  | 'MOVE'
  | 'NEW_USER'
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
  | 'TAG_ITEM_CREATE'
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
export interface EventAdditionalDetailsField {
  readonly rawData?: SerializedData;
}
export interface Event {
  /**
   * The value will always be `event`. */
  readonly type?: string;
  /**
   * When the event object was created. */
  readonly createdAt?: DateTime;
  /**
   * When the event object was recorded in database. */
  readonly recordedAt?: DateTime;
  /**
   * The ID of the event object. You can use this to detect duplicate events. */
  readonly eventId?: string;
  readonly createdBy?: UserMini;
  readonly eventType?: EventEventTypeField;
  /**
   * The session of the user that performed the action. Not all events will
   * populate this attribute. */
  readonly sessionId?: string;
  readonly source?: AppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser;
  /**
   * This object provides additional information about the event if available.
   *
   * This can include how a user performed an event as well as additional
   * information to correlate an event to external KeySafe logs. Not all events
   * have an `additional_details` object.  This object is only available in the
   * Enterprise Events. */
  readonly additionalDetails?: EventAdditionalDetailsField;
  readonly rawData?: SerializedData;
}
export function serializeEventEventTypeField(
  val: EventEventTypeField,
): SerializedData {
  return val;
}
export function deserializeEventEventTypeField(
  val: SerializedData,
): EventEventTypeField {
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
  if (val == 'COLLAB_ADD_COLLABORATOR') {
    return val;
  }
  if (val == 'COLLAB_INVITE_COLLABORATOR') {
    return val;
  }
  if (val == 'COLLAB_REMOVE_COLLABORATOR') {
    return val;
  }
  if (val == 'COLLAB_ROLE_CHANGE') {
    return val;
  }
  if (val == 'COMMENT_CREATE') {
    return val;
  }
  if (val == 'COMMENT_DELETE') {
    return val;
  }
  if (val == 'CONTENT_ACCESS') {
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
  if (val == 'EDR_CROWDSTRIKE_DEVICE_DETECTED') {
    return val;
  }
  if (val == 'EDR_CROWDSTRIKE_NO_BOX_TOOLS') {
    return val;
  }
  if (val == 'EDR_CROWDSTRIKE_BOX_TOOLS_OUTDATED') {
    return val;
  }
  if (val == 'EDR_CROWDSTRIKE_DRIVE_OUTDATED') {
    return val;
  }
  if (val == 'EDR_CROWDSTRIKE_ACCESS_ALLOWED_NO_CROWDSTRIKE_DEVICE') {
    return val;
  }
  if (val == 'EDR_CROWDSTRIKE_ACCESS_REVOKED') {
    return val;
  }
  if (val == 'EMAIL_ALIAS_CONFIRM') {
    return val;
  }
  if (val == 'EMAIL_ALIAS_REMOVE') {
    return val;
  }
  if (val == 'ENABLE_TWO_FACTOR_AUTH') {
    return val;
  }
  if (val == 'ENTERPRISE_APP_AUTHORIZATION_UPDATE') {
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
  if (val == 'ITEM_COPY') {
    return val;
  }
  if (val == 'ITEM_CREATE') {
    return val;
  }
  if (val == 'ITEM_DOWNLOAD') {
    return val;
  }
  if (val == 'ITEM_EMAIL_SEND') {
    return val;
  }
  if (val == 'ITEM_MAKE_CURRENT_VERSION') {
    return val;
  }
  if (val == 'ITEM_MODIFY') {
    return val;
  }
  if (val == 'ITEM_MOVE') {
    return val;
  }
  if (val == 'ITEM_OPEN') {
    return val;
  }
  if (val == 'ITEM_PREVIEW') {
    return val;
  }
  if (val == 'ITEM_RENAME') {
    return val;
  }
  if (val == 'ITEM_SHARED') {
    return val;
  }
  if (val == 'ITEM_SHARED_CREATE') {
    return val;
  }
  if (val == 'ITEM_SHARED_UNSHARE') {
    return val;
  }
  if (val == 'ITEM_SHARED_UPDATE') {
    return val;
  }
  if (val == 'ITEM_SYNC') {
    return val;
  }
  if (val == 'ITEM_TRASH') {
    return val;
  }
  if (val == 'ITEM_UNDELETE_VIA_TRASH') {
    return val;
  }
  if (val == 'ITEM_UNSYNC') {
    return val;
  }
  if (val == 'ITEM_UPLOAD') {
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
  if (val == 'LOCK_CREATE') {
    return val;
  }
  if (val == 'LOCK_DESTROY') {
    return val;
  }
  if (val == 'LOGIN') {
    return val;
  }
  if (val == 'MASTER_INVITE_ACCEPT') {
    return val;
  }
  if (val == 'MASTER_INVITE_REJECT') {
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
  if (val == 'TAG_ITEM_CREATE') {
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
  throw new BoxSdkError({ message: "Can't deserialize EventEventTypeField" });
}
export function serializeEventAdditionalDetailsField(
  val: EventAdditionalDetailsField,
): SerializedData {
  return {};
}
export function deserializeEventAdditionalDetailsField(
  val: SerializedData,
): EventAdditionalDetailsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EventAdditionalDetailsField"',
    });
  }
  return {} satisfies EventAdditionalDetailsField;
}
export function serializeEvent(val: Event): SerializedData {
  return {
    ['type']: val.type,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['recorded_at']:
      val.recordedAt == void 0
        ? val.recordedAt
        : serializeDateTime(val.recordedAt),
    ['event_id']: val.eventId,
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['event_type']:
      val.eventType == void 0
        ? val.eventType
        : serializeEventEventTypeField(val.eventType),
    ['session_id']: val.sessionId,
    ['source']:
      val.source == void 0
        ? val.source
        : serializeAppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser(
            val.source,
          ),
    ['additional_details']:
      val.additionalDetails == void 0
        ? val.additionalDetails
        : serializeEventAdditionalDetailsField(val.additionalDetails),
  };
}
export function deserializeEvent(val: SerializedData): Event {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Event"' });
  }
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "Event"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Event"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.recorded_at == void 0) && !sdIsString(val.recorded_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "recorded_at" of type "Event"',
    });
  }
  const recordedAt: undefined | DateTime =
    val.recorded_at == void 0 ? void 0 : deserializeDateTime(val.recorded_at);
  if (!(val.event_id == void 0) && !sdIsString(val.event_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "event_id" of type "Event"',
    });
  }
  const eventId: undefined | string =
    val.event_id == void 0 ? void 0 : val.event_id;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  const eventType: undefined | EventEventTypeField =
    val.event_type == void 0
      ? void 0
      : deserializeEventEventTypeField(val.event_type);
  if (!(val.session_id == void 0) && !sdIsString(val.session_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "session_id" of type "Event"',
    });
  }
  const sessionId: undefined | string =
    val.session_id == void 0 ? void 0 : val.session_id;
  const source:
    | undefined
    | AppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser =
    val.source == void 0
      ? void 0
      : deserializeAppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser(
          val.source,
        );
  const additionalDetails: undefined | EventAdditionalDetailsField =
    val.additional_details == void 0
      ? void 0
      : deserializeEventAdditionalDetailsField(val.additional_details);
  return {
    type: type,
    createdAt: createdAt,
    recordedAt: recordedAt,
    eventId: eventId,
    createdBy: createdBy,
    eventType: eventType,
    sessionId: sessionId,
    source: source,
    additionalDetails: additionalDetails,
  } satisfies Event;
}
