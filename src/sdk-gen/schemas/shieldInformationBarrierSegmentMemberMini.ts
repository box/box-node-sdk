import { serializeShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase.js';
import { deserializeShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase.js';
import { serializeShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase.js';
import { deserializeShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase.js';
import { serializeUserBase } from './userBase.js';
import { deserializeUserBase } from './userBase.js';
import { ShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase.js';
import { ShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase.js';
import { UserBase } from './userBase.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ShieldInformationBarrierSegmentMemberMini =
  ShieldInformationBarrierSegmentMemberBase & {
    readonly user?: UserBase;
  };
export function serializeShieldInformationBarrierSegmentMemberMini(
  val: ShieldInformationBarrierSegmentMemberMini
): SerializedData {
  const base: any = serializeShieldInformationBarrierSegmentMemberBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentMemberMini"',
    });
  }
  return {
    ...base,
    ...{
      ['user']: val.user == void 0 ? val.user : serializeUserBase(val.user),
    },
  };
}
export function deserializeShieldInformationBarrierSegmentMemberMini(
  val: SerializedData
): ShieldInformationBarrierSegmentMemberMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentMemberMini"',
    });
  }
  const user: undefined | UserBase =
    val.user == void 0 ? void 0 : deserializeUserBase(val.user);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentMemberMini"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierSegmentMemberBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentMemberBaseTypeField(val.type);
  return {
    user: user,
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentMemberMini;
}
