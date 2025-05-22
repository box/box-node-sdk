import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataCascadePolicyTypeField = 'metadata_cascade_policy';
export type MetadataCascadePolicyOwnerEnterpriseTypeField = 'enterprise';
export interface MetadataCascadePolicyOwnerEnterpriseField {
  /**
   * `enterprise` */
  readonly type?: MetadataCascadePolicyOwnerEnterpriseTypeField;
  /**
   * The ID of the enterprise that owns the policy. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export type MetadataCascadePolicyParentTypeField = 'folder';
export interface MetadataCascadePolicyParentField {
  /**
   * `folder` */
  readonly type?: MetadataCascadePolicyParentTypeField;
  /**
   * The ID of the folder the policy is applied to. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export class MetadataCascadePolicy {
  /**
   * The ID of the metadata cascade policy object */
  readonly id!: string;
  /**
   * `metadata_cascade_policy` */
  readonly type: MetadataCascadePolicyTypeField =
    'metadata_cascade_policy' as MetadataCascadePolicyTypeField;
  /**
   * The enterprise that owns this policy. */
  readonly ownerEnterprise?: MetadataCascadePolicyOwnerEnterpriseField;
  /**
   * Represent the folder the policy is applied to. */
  readonly parent?: MetadataCascadePolicyParentField;
  /**
   * The scope of the metadata cascade policy can either be `global` or
   * `enterprise_*`. The `global` scope is used for policies that are
   * available to any Box enterprise. The `enterprise_*` scope represents
   * policies that have been created within a specific enterprise, where `*`
   * will be the ID of that enterprise. */
  readonly scope?: string;
  /**
   * The key of the template that is cascaded down to the folder's
   * children.
   *
   * In many cases the template key is automatically derived
   * of its display name, for example `Contract Template` would
   * become `contractTemplate`. In some cases the creator of the
   * template will have provided its own template key.
   *
   * Please [list the templates for an enterprise][list], or
   * get all instances on a [file][file] or [folder][folder]
   * to inspect a template's key.
   *
   * [list]: e://get-metadata-templates-enterprise
   * [file]: e://get-files-id-metadata
   * [folder]: e://get-folders-id-metadata */
  readonly templateKey?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<MetadataCascadePolicy, 'type'> &
      Partial<Pick<MetadataCascadePolicy, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.ownerEnterprise !== undefined) {
      this.ownerEnterprise = fields.ownerEnterprise;
    }
    if (fields.parent !== undefined) {
      this.parent = fields.parent;
    }
    if (fields.scope !== undefined) {
      this.scope = fields.scope;
    }
    if (fields.templateKey !== undefined) {
      this.templateKey = fields.templateKey;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface MetadataCascadePolicyInput {
  /**
   * The ID of the metadata cascade policy object */
  readonly id: string;
  /**
   * `metadata_cascade_policy` */
  readonly type?: MetadataCascadePolicyTypeField;
  /**
   * The enterprise that owns this policy. */
  readonly ownerEnterprise?: MetadataCascadePolicyOwnerEnterpriseField;
  /**
   * Represent the folder the policy is applied to. */
  readonly parent?: MetadataCascadePolicyParentField;
  /**
   * The scope of the metadata cascade policy can either be `global` or
   * `enterprise_*`. The `global` scope is used for policies that are
   * available to any Box enterprise. The `enterprise_*` scope represents
   * policies that have been created within a specific enterprise, where `*`
   * will be the ID of that enterprise. */
  readonly scope?: string;
  /**
   * The key of the template that is cascaded down to the folder's
   * children.
   *
   * In many cases the template key is automatically derived
   * of its display name, for example `Contract Template` would
   * become `contractTemplate`. In some cases the creator of the
   * template will have provided its own template key.
   *
   * Please [list the templates for an enterprise][list], or
   * get all instances on a [file][file] or [folder][folder]
   * to inspect a template's key.
   *
   * [list]: e://get-metadata-templates-enterprise
   * [file]: e://get-files-id-metadata
   * [folder]: e://get-folders-id-metadata */
  readonly templateKey?: string;
  readonly rawData?: SerializedData;
}
export function serializeMetadataCascadePolicyTypeField(
  val: MetadataCascadePolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeMetadataCascadePolicyTypeField(
  val: SerializedData,
): MetadataCascadePolicyTypeField {
  if (val == 'metadata_cascade_policy') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataCascadePolicyTypeField",
  });
}
export function serializeMetadataCascadePolicyOwnerEnterpriseTypeField(
  val: MetadataCascadePolicyOwnerEnterpriseTypeField,
): SerializedData {
  return val;
}
export function deserializeMetadataCascadePolicyOwnerEnterpriseTypeField(
  val: SerializedData,
): MetadataCascadePolicyOwnerEnterpriseTypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataCascadePolicyOwnerEnterpriseTypeField",
  });
}
export function serializeMetadataCascadePolicyOwnerEnterpriseField(
  val: MetadataCascadePolicyOwnerEnterpriseField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeMetadataCascadePolicyOwnerEnterpriseTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeMetadataCascadePolicyOwnerEnterpriseField(
  val: SerializedData,
): MetadataCascadePolicyOwnerEnterpriseField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "MetadataCascadePolicyOwnerEnterpriseField"',
    });
  }
  const type: undefined | MetadataCascadePolicyOwnerEnterpriseTypeField =
    val.type == void 0
      ? void 0
      : deserializeMetadataCascadePolicyOwnerEnterpriseTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "MetadataCascadePolicyOwnerEnterpriseField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    id: id,
  } satisfies MetadataCascadePolicyOwnerEnterpriseField;
}
export function serializeMetadataCascadePolicyParentTypeField(
  val: MetadataCascadePolicyParentTypeField,
): SerializedData {
  return val;
}
export function deserializeMetadataCascadePolicyParentTypeField(
  val: SerializedData,
): MetadataCascadePolicyParentTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataCascadePolicyParentTypeField",
  });
}
export function serializeMetadataCascadePolicyParentField(
  val: MetadataCascadePolicyParentField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeMetadataCascadePolicyParentTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeMetadataCascadePolicyParentField(
  val: SerializedData,
): MetadataCascadePolicyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataCascadePolicyParentField"',
    });
  }
  const type: undefined | MetadataCascadePolicyParentTypeField =
    val.type == void 0
      ? void 0
      : deserializeMetadataCascadePolicyParentTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "MetadataCascadePolicyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies MetadataCascadePolicyParentField;
}
export function serializeMetadataCascadePolicy(
  val: MetadataCascadePolicy,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeMetadataCascadePolicyTypeField(val.type),
    ['owner_enterprise']:
      val.ownerEnterprise == void 0
        ? val.ownerEnterprise
        : serializeMetadataCascadePolicyOwnerEnterpriseField(
            val.ownerEnterprise,
          ),
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeMetadataCascadePolicyParentField(val.parent),
    ['scope']: val.scope,
    ['templateKey']: val.templateKey,
  };
}
export function deserializeMetadataCascadePolicy(
  val: SerializedData,
): MetadataCascadePolicy {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataCascadePolicy"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "MetadataCascadePolicy" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataCascadePolicy"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "MetadataCascadePolicy" to be defined',
    });
  }
  const type: MetadataCascadePolicyTypeField =
    deserializeMetadataCascadePolicyTypeField(val.type);
  const ownerEnterprise: undefined | MetadataCascadePolicyOwnerEnterpriseField =
    val.owner_enterprise == void 0
      ? void 0
      : deserializeMetadataCascadePolicyOwnerEnterpriseField(
          val.owner_enterprise,
        );
  const parent: undefined | MetadataCascadePolicyParentField =
    val.parent == void 0
      ? void 0
      : deserializeMetadataCascadePolicyParentField(val.parent);
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "scope" of type "MetadataCascadePolicy"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "templateKey" of type "MetadataCascadePolicy"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  return {
    id: id,
    type: type,
    ownerEnterprise: ownerEnterprise,
    parent: parent,
    scope: scope,
    templateKey: templateKey,
  } satisfies MetadataCascadePolicy;
}
export function serializeMetadataCascadePolicyInput(
  val: MetadataCascadePolicyInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeMetadataCascadePolicyTypeField(val.type),
    ['owner_enterprise']:
      val.ownerEnterprise == void 0
        ? val.ownerEnterprise
        : serializeMetadataCascadePolicyOwnerEnterpriseField(
            val.ownerEnterprise,
          ),
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeMetadataCascadePolicyParentField(val.parent),
    ['scope']: val.scope,
    ['templateKey']: val.templateKey,
  };
}
export function deserializeMetadataCascadePolicyInput(
  val: SerializedData,
): MetadataCascadePolicyInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataCascadePolicyInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "MetadataCascadePolicyInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataCascadePolicyInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | MetadataCascadePolicyTypeField =
    val.type == void 0
      ? void 0
      : deserializeMetadataCascadePolicyTypeField(val.type);
  const ownerEnterprise: undefined | MetadataCascadePolicyOwnerEnterpriseField =
    val.owner_enterprise == void 0
      ? void 0
      : deserializeMetadataCascadePolicyOwnerEnterpriseField(
          val.owner_enterprise,
        );
  const parent: undefined | MetadataCascadePolicyParentField =
    val.parent == void 0
      ? void 0
      : deserializeMetadataCascadePolicyParentField(val.parent);
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scope" of type "MetadataCascadePolicyInput"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "templateKey" of type "MetadataCascadePolicyInput"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  return {
    id: id,
    type: type,
    ownerEnterprise: ownerEnterprise,
    parent: parent,
    scope: scope,
    templateKey: templateKey,
  } satisfies MetadataCascadePolicyInput;
}
