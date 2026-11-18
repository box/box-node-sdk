import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleSystemCreateRequestV2026R0SystemTypeField =
  | 'windows'
  | string;
export class ShuttleSystemCreateRequestV2026R0 {
  /**
   * The display name for the new shuttle system. */
  readonly name!: string;
  /**
   * The public system type identifier for the new shuttle system. Only
   * `windows` is currently supported through the public API. */
  readonly systemType: ShuttleSystemCreateRequestV2026R0SystemTypeField =
    'windows' as ShuttleSystemCreateRequestV2026R0SystemTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleSystemCreateRequestV2026R0, 'systemType'> &
      Partial<Pick<ShuttleSystemCreateRequestV2026R0, 'systemType'>>
  ) {
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.systemType !== undefined) {
      this.systemType = fields.systemType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleSystemCreateRequestV2026R0Input {
  /**
   * The display name for the new shuttle system. */
  readonly name: string;
  /**
   * The public system type identifier for the new shuttle system. Only
   * `windows` is currently supported through the public API. */
  readonly systemType?: ShuttleSystemCreateRequestV2026R0SystemTypeField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSystemCreateRequestV2026R0SystemTypeField(
  val: ShuttleSystemCreateRequestV2026R0SystemTypeField
): SerializedData {
  return val;
}
export function deserializeShuttleSystemCreateRequestV2026R0SystemTypeField(
  val: SerializedData
): ShuttleSystemCreateRequestV2026R0SystemTypeField {
  if (val == 'windows') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleSystemCreateRequestV2026R0SystemTypeField",
  });
}
export function serializeShuttleSystemCreateRequestV2026R0(
  val: ShuttleSystemCreateRequestV2026R0
): SerializedData {
  return {
    ['name']: val.name,
    ['system_type']: serializeShuttleSystemCreateRequestV2026R0SystemTypeField(
      val.systemType
    ),
  };
}
export function deserializeShuttleSystemCreateRequestV2026R0(
  val: SerializedData
): ShuttleSystemCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemCreateRequestV2026R0"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleSystemCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleSystemCreateRequestV2026R0"',
    });
  }
  const name: string = val.name;
  if (val.system_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "system_type" of type "ShuttleSystemCreateRequestV2026R0" to be defined',
    });
  }
  const systemType: ShuttleSystemCreateRequestV2026R0SystemTypeField =
    deserializeShuttleSystemCreateRequestV2026R0SystemTypeField(
      val.system_type
    );
  return {
    name: name,
    systemType: systemType,
  } satisfies ShuttleSystemCreateRequestV2026R0;
}
export function serializeShuttleSystemCreateRequestV2026R0Input(
  val: ShuttleSystemCreateRequestV2026R0Input
): SerializedData {
  return {
    ['name']: val.name,
    ['systemType']:
      val.systemType == void 0
        ? val.systemType
        : serializeShuttleSystemCreateRequestV2026R0SystemTypeField(
            val.systemType
          ),
  };
}
export function deserializeShuttleSystemCreateRequestV2026R0Input(
  val: SerializedData
): ShuttleSystemCreateRequestV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemCreateRequestV2026R0Input"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleSystemCreateRequestV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleSystemCreateRequestV2026R0Input"',
    });
  }
  const name: string = val.name;
  const systemType:
    | undefined
    | ShuttleSystemCreateRequestV2026R0SystemTypeField =
    val.systemType == void 0
      ? void 0
      : deserializeShuttleSystemCreateRequestV2026R0SystemTypeField(
          val.systemType
        );
  return {
    name: name,
    systemType: systemType,
  } satisfies ShuttleSystemCreateRequestV2026R0Input;
}
