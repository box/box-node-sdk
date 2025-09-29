import { serializeShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { ShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface ShieldInformationBarrierReference {
  readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierReference(
  val: ShieldInformationBarrierReference,
): SerializedData {
  return {
    ['shield_information_barrier']:
      val.shieldInformationBarrier == void 0
        ? val.shieldInformationBarrier
        : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
  };
}
export function deserializeShieldInformationBarrierReference(
  val: SerializedData,
): ShieldInformationBarrierReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierReference"',
    });
  }
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  return {
    shieldInformationBarrier: shieldInformationBarrier,
  } satisfies ShieldInformationBarrierReference;
}
