import { serializeWebhook } from './webhook.generated.js';
import { deserializeWebhook } from './webhook.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeFileOrFolder } from './fileOrFolder.generated.js';
import { deserializeFileOrFolder } from './fileOrFolder.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { Webhook } from './webhook.generated.js';
import { UserMini } from './userMini.generated.js';
import { FileOrFolder } from './fileOrFolder.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type WebhookInvocationTypeField = 'webhook_event';
export type WebhookInvocationTriggerField =
  | 'FILE.UPLOADED'
  | 'FILE.PREVIEWED'
  | 'FILE.DOWNLOADED'
  | 'FILE.TRASHED'
  | 'FILE.DELETED'
  | 'FILE.RESTORED'
  | 'FILE.COPIED'
  | 'FILE.MOVED'
  | 'FILE.LOCKED'
  | 'FILE.UNLOCKED'
  | 'FILE.RENAMED'
  | 'COMMENT.CREATED'
  | 'COMMENT.UPDATED'
  | 'COMMENT.DELETED'
  | 'TASK_ASSIGNMENT.CREATED'
  | 'TASK_ASSIGNMENT.UPDATED'
  | 'METADATA_INSTANCE.CREATED'
  | 'METADATA_INSTANCE.UPDATED'
  | 'METADATA_INSTANCE.DELETED'
  | 'FOLDER.CREATED'
  | 'FOLDER.RENAMED'
  | 'FOLDER.DOWNLOADED'
  | 'FOLDER.RESTORED'
  | 'FOLDER.DELETED'
  | 'FOLDER.COPIED'
  | 'FOLDER.MOVED'
  | 'FOLDER.TRASHED'
  | 'WEBHOOK.DELETED'
  | 'COLLABORATION.CREATED'
  | 'COLLABORATION.ACCEPTED'
  | 'COLLABORATION.REJECTED'
  | 'COLLABORATION.REMOVED'
  | 'COLLABORATION.UPDATED'
  | 'SHARED_LINK.DELETED'
  | 'SHARED_LINK.CREATED'
  | 'SHARED_LINK.UPDATED'
  | 'SIGN_REQUEST.COMPLETED'
  | 'SIGN_REQUEST.DECLINED'
  | 'SIGN_REQUEST.EXPIRED'
  | 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED'
  | string;
export interface WebhookInvocation {
  /**
   * The unique identifier for this webhook invocation */
  readonly id?: string;
  /**
   * `webhook_event` */
  readonly type?: WebhookInvocationTypeField;
  readonly webhook?: Webhook;
  readonly createdBy?: UserMini;
  /**
   * A timestamp identifying the time that
   * the webhook event was triggered. */
  readonly createdAt?: DateTime;
  readonly trigger?: WebhookInvocationTriggerField;
  readonly source?: FileOrFolder;
  readonly rawData?: SerializedData;
}
export function serializeWebhookInvocationTypeField(
  val: WebhookInvocationTypeField,
): SerializedData {
  return val;
}
export function deserializeWebhookInvocationTypeField(
  val: SerializedData,
): WebhookInvocationTypeField {
  if (val == 'webhook_event') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebhookInvocationTypeField",
  });
}
export function serializeWebhookInvocationTriggerField(
  val: WebhookInvocationTriggerField,
): SerializedData {
  return val;
}
export function deserializeWebhookInvocationTriggerField(
  val: SerializedData,
): WebhookInvocationTriggerField {
  if (val == 'FILE.UPLOADED') {
    return val;
  }
  if (val == 'FILE.PREVIEWED') {
    return val;
  }
  if (val == 'FILE.DOWNLOADED') {
    return val;
  }
  if (val == 'FILE.TRASHED') {
    return val;
  }
  if (val == 'FILE.DELETED') {
    return val;
  }
  if (val == 'FILE.RESTORED') {
    return val;
  }
  if (val == 'FILE.COPIED') {
    return val;
  }
  if (val == 'FILE.MOVED') {
    return val;
  }
  if (val == 'FILE.LOCKED') {
    return val;
  }
  if (val == 'FILE.UNLOCKED') {
    return val;
  }
  if (val == 'FILE.RENAMED') {
    return val;
  }
  if (val == 'COMMENT.CREATED') {
    return val;
  }
  if (val == 'COMMENT.UPDATED') {
    return val;
  }
  if (val == 'COMMENT.DELETED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.CREATED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.CREATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.DELETED') {
    return val;
  }
  if (val == 'FOLDER.CREATED') {
    return val;
  }
  if (val == 'FOLDER.RENAMED') {
    return val;
  }
  if (val == 'FOLDER.DOWNLOADED') {
    return val;
  }
  if (val == 'FOLDER.RESTORED') {
    return val;
  }
  if (val == 'FOLDER.DELETED') {
    return val;
  }
  if (val == 'FOLDER.COPIED') {
    return val;
  }
  if (val == 'FOLDER.MOVED') {
    return val;
  }
  if (val == 'FOLDER.TRASHED') {
    return val;
  }
  if (val == 'WEBHOOK.DELETED') {
    return val;
  }
  if (val == 'COLLABORATION.CREATED') {
    return val;
  }
  if (val == 'COLLABORATION.ACCEPTED') {
    return val;
  }
  if (val == 'COLLABORATION.REJECTED') {
    return val;
  }
  if (val == 'COLLABORATION.REMOVED') {
    return val;
  }
  if (val == 'COLLABORATION.UPDATED') {
    return val;
  }
  if (val == 'SHARED_LINK.DELETED') {
    return val;
  }
  if (val == 'SHARED_LINK.CREATED') {
    return val;
  }
  if (val == 'SHARED_LINK.UPDATED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.COMPLETED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.DECLINED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.EXPIRED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebhookInvocationTriggerField",
  });
}
export function serializeWebhookInvocation(
  val: WebhookInvocation,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWebhookInvocationTypeField(val.type),
    ['webhook']:
      val.webhook == void 0 ? val.webhook : serializeWebhook(val.webhook),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['trigger']:
      val.trigger == void 0
        ? val.trigger
        : serializeWebhookInvocationTriggerField(val.trigger),
    ['source']:
      val.source == void 0 ? val.source : serializeFileOrFolder(val.source),
  };
}
export function deserializeWebhookInvocation(
  val: SerializedData,
): WebhookInvocation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebhookInvocation"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebhookInvocation"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WebhookInvocationTypeField =
    val.type == void 0
      ? void 0
      : deserializeWebhookInvocationTypeField(val.type);
  const webhook: undefined | Webhook =
    val.webhook == void 0 ? void 0 : deserializeWebhook(val.webhook);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "WebhookInvocation"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const trigger: undefined | WebhookInvocationTriggerField =
    val.trigger == void 0
      ? void 0
      : deserializeWebhookInvocationTriggerField(val.trigger);
  const source: undefined | FileOrFolder =
    val.source == void 0 ? void 0 : deserializeFileOrFolder(val.source);
  return {
    id: id,
    type: type,
    webhook: webhook,
    createdBy: createdBy,
    createdAt: createdAt,
    trigger: trigger,
    source: source,
  } satisfies WebhookInvocation;
}
