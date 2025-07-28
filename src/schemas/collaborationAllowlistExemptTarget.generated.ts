import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CollaborationAllowlistExemptTargetTypeField =
  'collaboration_whitelist_exempt_target';
export type CollaborationAllowlistExemptTargetEnterpriseTypeField =
  'enterprise';
export interface CollaborationAllowlistExemptTargetEnterpriseField {
  /**
   * The unique identifier for this enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: CollaborationAllowlistExemptTargetEnterpriseTypeField;
  /**
   * The name of the enterprise. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export interface CollaborationAllowlistExemptTarget {
  /**
   * The unique identifier for this exemption. */
  readonly id?: string;
  /**
   * The value will always be `collaboration_whitelist_exempt_target`. */
  readonly type?: CollaborationAllowlistExemptTargetTypeField;
  readonly enterprise?: CollaborationAllowlistExemptTargetEnterpriseField;
  readonly user?: UserMini;
  /**
   * The time the entry was created. */
  readonly createdAt?: DateTime;
  /**
   * The time the entry was modified. */
  readonly modifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeCollaborationAllowlistExemptTargetTypeField(
  val: CollaborationAllowlistExemptTargetTypeField,
): SerializedData {
  return val;
}
export function deserializeCollaborationAllowlistExemptTargetTypeField(
  val: SerializedData,
): CollaborationAllowlistExemptTargetTypeField {
  if (val == 'collaboration_whitelist_exempt_target') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationAllowlistExemptTargetTypeField",
  });
}
export function serializeCollaborationAllowlistExemptTargetEnterpriseTypeField(
  val: CollaborationAllowlistExemptTargetEnterpriseTypeField,
): SerializedData {
  return val;
}
export function deserializeCollaborationAllowlistExemptTargetEnterpriseTypeField(
  val: SerializedData,
): CollaborationAllowlistExemptTargetEnterpriseTypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize CollaborationAllowlistExemptTargetEnterpriseTypeField",
  });
}
export function serializeCollaborationAllowlistExemptTargetEnterpriseField(
  val: CollaborationAllowlistExemptTargetEnterpriseField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCollaborationAllowlistExemptTargetEnterpriseTypeField(
            val.type,
          ),
    ['name']: val.name,
  };
}
export function deserializeCollaborationAllowlistExemptTargetEnterpriseField(
  val: SerializedData,
): CollaborationAllowlistExemptTargetEnterpriseField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAllowlistExemptTargetEnterpriseField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CollaborationAllowlistExemptTargetEnterpriseField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | CollaborationAllowlistExemptTargetEnterpriseTypeField =
    val.type == void 0
      ? void 0
      : deserializeCollaborationAllowlistExemptTargetEnterpriseTypeField(
          val.type,
        );
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "CollaborationAllowlistExemptTargetEnterpriseField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    id: id,
    type: type,
    name: name,
  } satisfies CollaborationAllowlistExemptTargetEnterpriseField;
}
export function serializeCollaborationAllowlistExemptTarget(
  val: CollaborationAllowlistExemptTarget,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCollaborationAllowlistExemptTargetTypeField(val.type),
    ['enterprise']:
      val.enterprise == void 0
        ? val.enterprise
        : serializeCollaborationAllowlistExemptTargetEnterpriseField(
            val.enterprise,
          ),
    ['user']: val.user == void 0 ? val.user : serializeUserMini(val.user),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
  };
}
export function deserializeCollaborationAllowlistExemptTarget(
  val: SerializedData,
): CollaborationAllowlistExemptTarget {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationAllowlistExemptTarget"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CollaborationAllowlistExemptTarget"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CollaborationAllowlistExemptTargetTypeField =
    val.type == void 0
      ? void 0
      : deserializeCollaborationAllowlistExemptTargetTypeField(val.type);
  const enterprise:
    | undefined
    | CollaborationAllowlistExemptTargetEnterpriseField =
    val.enterprise == void 0
      ? void 0
      : deserializeCollaborationAllowlistExemptTargetEnterpriseField(
          val.enterprise,
        );
  const user: undefined | UserMini =
    val.user == void 0 ? void 0 : deserializeUserMini(val.user);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "CollaborationAllowlistExemptTarget"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "CollaborationAllowlistExemptTarget"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  return {
    id: id,
    type: type,
    enterprise: enterprise,
    user: user,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
  } satisfies CollaborationAllowlistExemptTarget;
}
