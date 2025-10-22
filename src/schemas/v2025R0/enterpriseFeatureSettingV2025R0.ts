import { serializeUserOrGroupReferenceV2025R0 } from './userOrGroupReferenceV2025R0';
import { deserializeUserOrGroupReferenceV2025R0 } from './userOrGroupReferenceV2025R0';
import { UserOrGroupReferenceV2025R0 } from './userOrGroupReferenceV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface EnterpriseFeatureSettingV2025R0FeatureField {
  /**
   * The identifier of the feature. */
  readonly id?: string | null;
  readonly rawData?: SerializedData;
}
export interface EnterpriseFeatureSettingV2025R0 {
  /**
   * The identifier of the enterprise feature setting. */
  readonly id?: string | null;
  /**
   * The feature. */
  readonly feature?: EnterpriseFeatureSettingV2025R0FeatureField;
  /**
   * The state of the feature. */
  readonly state?: string | null;
  /**
   * Whether the feature can be configured. */
  readonly canConfigure?: boolean | null;
  /**
   * Whether the feature is configured. */
  readonly isConfigured?: boolean | null;
  /**
   * Enterprise feature setting is enabled for only this set of users and groups. */
  readonly allowlist?: readonly UserOrGroupReferenceV2025R0[] | null;
  /**
   * Enterprise feature setting is enabled for everyone except this set of users and groups. */
  readonly denylist?: readonly UserOrGroupReferenceV2025R0[] | null;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseFeatureSettingV2025R0FeatureField(
  val: EnterpriseFeatureSettingV2025R0FeatureField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeEnterpriseFeatureSettingV2025R0FeatureField(
  val: SerializedData,
): EnterpriseFeatureSettingV2025R0FeatureField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseFeatureSettingV2025R0FeatureField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "EnterpriseFeatureSettingV2025R0FeatureField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { id: id } satisfies EnterpriseFeatureSettingV2025R0FeatureField;
}
export function serializeEnterpriseFeatureSettingV2025R0(
  val: EnterpriseFeatureSettingV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['feature']:
      val.feature == void 0
        ? val.feature
        : serializeEnterpriseFeatureSettingV2025R0FeatureField(val.feature),
    ['state']: val.state,
    ['can_configure']: val.canConfigure,
    ['is_configured']: val.isConfigured,
    ['allowlist']:
      val.allowlist == void 0
        ? val.allowlist
        : (val.allowlist.map(function (
            item: UserOrGroupReferenceV2025R0,
          ): SerializedData {
            return serializeUserOrGroupReferenceV2025R0(item);
          }) as readonly any[]),
    ['denylist']:
      val.denylist == void 0
        ? val.denylist
        : (val.denylist.map(function (
            item: UserOrGroupReferenceV2025R0,
          ): SerializedData {
            return serializeUserOrGroupReferenceV2025R0(item);
          }) as readonly any[]),
  };
}
export function deserializeEnterpriseFeatureSettingV2025R0(
  val: SerializedData,
): EnterpriseFeatureSettingV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseFeatureSettingV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const feature: undefined | EnterpriseFeatureSettingV2025R0FeatureField =
    val.feature == void 0
      ? void 0
      : deserializeEnterpriseFeatureSettingV2025R0FeatureField(val.feature);
  if (!(val.state == void 0) && !sdIsString(val.state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "state" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const state: undefined | string = val.state == void 0 ? void 0 : val.state;
  if (!(val.can_configure == void 0) && !sdIsBoolean(val.can_configure)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_configure" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const canConfigure: undefined | boolean =
    val.can_configure == void 0 ? void 0 : val.can_configure;
  if (!(val.is_configured == void 0) && !sdIsBoolean(val.is_configured)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_configured" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const isConfigured: undefined | boolean =
    val.is_configured == void 0 ? void 0 : val.is_configured;
  if (!(val.allowlist == void 0) && !sdIsList(val.allowlist)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowlist" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const allowlist: undefined | readonly UserOrGroupReferenceV2025R0[] =
    val.allowlist == void 0
      ? void 0
      : sdIsList(val.allowlist)
        ? (val.allowlist.map(function (
            itm: SerializedData,
          ): UserOrGroupReferenceV2025R0 {
            return deserializeUserOrGroupReferenceV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.denylist == void 0) && !sdIsList(val.denylist)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "denylist" of type "EnterpriseFeatureSettingV2025R0"',
    });
  }
  const denylist: undefined | readonly UserOrGroupReferenceV2025R0[] =
    val.denylist == void 0
      ? void 0
      : sdIsList(val.denylist)
        ? (val.denylist.map(function (
            itm: SerializedData,
          ): UserOrGroupReferenceV2025R0 {
            return deserializeUserOrGroupReferenceV2025R0(itm);
          }) as readonly any[])
        : [];
  return {
    id: id,
    feature: feature,
    state: state,
    canConfigure: canConfigure,
    isConfigured: isConfigured,
    allowlist: allowlist,
    denylist: denylist,
  } satisfies EnterpriseFeatureSettingV2025R0;
}
