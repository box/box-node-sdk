import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CollaborationAllowlistEntryTypeField =
  'collaboration_whitelist_entry';
export type CollaborationAllowlistEntryDirectionField =
  | 'inbound'
  | 'outbound'
  | 'both'
  | string;
export type CollaborationAllowlistEntryEnterpriseTypeField = 'enterprise';
export interface CollaborationAllowlistEntryEnterpriseField {
  /**
   * The unique identifier for this enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: CollaborationAllowlistEntryEnterpriseTypeField;
  /**
   * The name of the enterprise. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export interface CollaborationAllowlistEntry {
  /**
   * The unique identifier for this entry. */
  readonly id?: string;
  /**
   * The value will always be `collaboration_whitelist_entry`. */
  readonly type?: CollaborationAllowlistEntryTypeField;
  /**
   * The whitelisted domain. */
  readonly domain?: string;
  /**
   * The direction of the collaborations to allow. */
  readonly direction?: CollaborationAllowlistEntryDirectionField;
  readonly enterprise?: CollaborationAllowlistEntryEnterpriseField;
  /**
   * The time the entry was created at. */
  readonly createdAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeCollaborationAllowlistEntryTypeField(
  val: CollaborationAllowlistEntryTypeField,
): SerializedData {
  return val;
}
export function deserializeCollaborationAllowlistEntryTypeField(
  val: SerializedData,
): CollaborationAllowlistEntryTypeField {
  if (val == 'collaboration_whitelist_entry') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationAllowlistEntryTypeField",
  });
}
export function serializeCollaborationAllowlistEntryDirectionField(
  val: CollaborationAllowlistEntryDirectionField,
): SerializedData {
  return val;
}
export function deserializeCollaborationAllowlistEntryDirectionField(
  val: SerializedData,
): CollaborationAllowlistEntryDirectionField {
  if (val == 'inbound') {
    return val;
  }
  if (val == 'outbound') {
    return val;
  }
  if (val == 'both') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationAllowlistEntryDirectionField",
  });
}
export function serializeCollaborationAllowlistEntryEnterpriseTypeField(
  val: CollaborationAllowlistEntryEnterpriseTypeField,
): SerializedData {
  return val;
}
export function deserializeCollaborationAllowlistEntryEnterpriseTypeField(
  val: SerializedData,
): CollaborationAllowlistEntryEnterpriseTypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationAllowlistEntryEnterpriseTypeField",
  });
}
export function serializeCollaborationAllowlistEntryEnterpriseField(
  val: CollaborationAllowlistEntryEnterpriseField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCollaborationAllowlistEntryEnterpriseTypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeCollaborationAllowlistEntryEnterpriseField(
  val: SerializedData,
): CollaborationAllowlistEntryEnterpriseField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAllowlistEntryEnterpriseField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CollaborationAllowlistEntryEnterpriseField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CollaborationAllowlistEntryEnterpriseTypeField =
    val.type == void 0
      ? void 0
      : deserializeCollaborationAllowlistEntryEnterpriseTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "CollaborationAllowlistEntryEnterpriseField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    id: id,
    type: type,
    name: name,
  } satisfies CollaborationAllowlistEntryEnterpriseField;
}
export function serializeCollaborationAllowlistEntry(
  val: CollaborationAllowlistEntry,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCollaborationAllowlistEntryTypeField(val.type),
    ['domain']: val.domain,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeCollaborationAllowlistEntryDirectionField(val.direction),
    ['enterprise']:
      val.enterprise == void 0
        ? val.enterprise
        : serializeCollaborationAllowlistEntryEnterpriseField(val.enterprise),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
  };
}
export function deserializeCollaborationAllowlistEntry(
  val: SerializedData,
): CollaborationAllowlistEntry {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationAllowlistEntry"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CollaborationAllowlistEntry"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CollaborationAllowlistEntryTypeField =
    val.type == void 0
      ? void 0
      : deserializeCollaborationAllowlistEntryTypeField(val.type);
  if (!(val.domain == void 0) && !sdIsString(val.domain)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "domain" of type "CollaborationAllowlistEntry"',
    });
  }
  const domain: undefined | string = val.domain == void 0 ? void 0 : val.domain;
  const direction: undefined | CollaborationAllowlistEntryDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeCollaborationAllowlistEntryDirectionField(val.direction);
  const enterprise: undefined | CollaborationAllowlistEntryEnterpriseField =
    val.enterprise == void 0
      ? void 0
      : deserializeCollaborationAllowlistEntryEnterpriseField(val.enterprise);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "CollaborationAllowlistEntry"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  return {
    id: id,
    type: type,
    domain: domain,
    direction: direction,
    enterprise: enterprise,
    createdAt: createdAt,
  } satisfies CollaborationAllowlistEntry;
}
