import { serializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { ShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
