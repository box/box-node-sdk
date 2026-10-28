import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobStartRequestV2026R0ModeField =
  'transfer' | 'simulation' | 'scan' | 'analysis' | string;
export interface ShuttleJobStartRequestV2026R0 {
  /**
   * The run mode. Defaults to simulation when omitted. */
  readonly mode?: ShuttleJobStartRequestV2026R0ModeField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobStartRequestV2026R0ModeField(
  val: ShuttleJobStartRequestV2026R0ModeField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobStartRequestV2026R0ModeField(
  val: SerializedData,
): ShuttleJobStartRequestV2026R0ModeField {
  if (val == 'transfer') {
    return val;
  }
  if (val == 'simulation') {
    return val;
  }
  if (val == 'scan') {
    return val;
  }
  if (val == 'analysis') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobStartRequestV2026R0ModeField",
  });
}
export function serializeShuttleJobStartRequestV2026R0(
  val: ShuttleJobStartRequestV2026R0,
): SerializedData {
  return {
    ['mode']:
      val.mode == void 0
        ? val.mode
        : serializeShuttleJobStartRequestV2026R0ModeField(val.mode),
  };
}
export function deserializeShuttleJobStartRequestV2026R0(
  val: SerializedData,
): ShuttleJobStartRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobStartRequestV2026R0"',
    });
  }
  const mode: undefined | ShuttleJobStartRequestV2026R0ModeField =
    val.mode == void 0
      ? void 0
      : deserializeShuttleJobStartRequestV2026R0ModeField(val.mode);
  return { mode: mode } satisfies ShuttleJobStartRequestV2026R0;
}
