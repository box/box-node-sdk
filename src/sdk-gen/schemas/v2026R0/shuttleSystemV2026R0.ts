import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleSystemV2026R0TypeField = 'shuttle_system';
export type ShuttleSystemV2026R0StateField =
  | 'connected'
  | 'disconnected'
  | 'unknown'
  | string;
export class ShuttleSystemV2026R0 {
  /**
   * The unique identifier for the shuttle system. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_system`. */
  readonly type: ShuttleSystemV2026R0TypeField =
    'shuttle_system' as ShuttleSystemV2026R0TypeField;
  /**
   * The display name of the shuttle system. */
  readonly name!: string;
  /**
   * Identifies the kind of source or destination this system represents, for
   * example `box`, `windows`, `sharepoint`, or `amazon_s3`. New system types
   * are added over time, so clients must tolerate values they do not
   * recognize rather than treating this as a fixed set. */
  readonly systemType!: string;
  /**
   * A server-computed display label for the system. */
  readonly label?: string;
  /**
   * The current connection state of the shuttle system. */
  readonly state!: ShuttleSystemV2026R0StateField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleSystemV2026R0, 'type'> &
      Partial<Pick<ShuttleSystemV2026R0, 'type'>>
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.systemType !== undefined) {
      this.systemType = fields.systemType;
    }
    if (fields.label !== undefined) {
      this.label = fields.label;
    }
    if (fields.state !== undefined) {
      this.state = fields.state;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleSystemV2026R0Input {
  /**
   * The unique identifier for the shuttle system. */
  readonly id: string;
  /**
   * The value will always be `shuttle_system`. */
  readonly type?: ShuttleSystemV2026R0TypeField;
  /**
   * The display name of the shuttle system. */
  readonly name: string;
  /**
   * Identifies the kind of source or destination this system represents, for
   * example `box`, `windows`, `sharepoint`, or `amazon_s3`. New system types
   * are added over time, so clients must tolerate values they do not
   * recognize rather than treating this as a fixed set. */
  readonly systemType: string;
  /**
   * A server-computed display label for the system. */
  readonly label?: string;
  /**
   * The current connection state of the shuttle system. */
  readonly state: ShuttleSystemV2026R0StateField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSystemV2026R0TypeField(
  val: ShuttleSystemV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttleSystemV2026R0TypeField(
  val: SerializedData
): ShuttleSystemV2026R0TypeField {
  if (val == 'shuttle_system') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleSystemV2026R0TypeField",
  });
}
export function serializeShuttleSystemV2026R0StateField(
  val: ShuttleSystemV2026R0StateField
): SerializedData {
  return val;
}
export function deserializeShuttleSystemV2026R0StateField(
  val: SerializedData
): ShuttleSystemV2026R0StateField {
  if (val == 'connected') {
    return val;
  }
  if (val == 'disconnected') {
    return val;
  }
  if (val == 'unknown') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleSystemV2026R0StateField",
  });
}
export function serializeShuttleSystemV2026R0(
  val: ShuttleSystemV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleSystemV2026R0TypeField(val.type),
    ['name']: val.name,
    ['system_type']: val.systemType,
    ['label']: val.label,
    ['state']: serializeShuttleSystemV2026R0StateField(val.state),
  };
}
export function deserializeShuttleSystemV2026R0(
  val: SerializedData
): ShuttleSystemV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleSystemV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleSystemV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShuttleSystemV2026R0" to be defined',
    });
  }
  const type: ShuttleSystemV2026R0TypeField =
    deserializeShuttleSystemV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ShuttleSystemV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShuttleSystemV2026R0"',
    });
  }
  const name: string = val.name;
  if (val.system_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "system_type" of type "ShuttleSystemV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.system_type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_type" of type "ShuttleSystemV2026R0"',
    });
  }
  const systemType: string = val.system_type;
  if (!(val.label == void 0) && !sdIsString(val.label)) {
    throw new BoxSdkError({
      message: 'Expecting string for "label" of type "ShuttleSystemV2026R0"',
    });
  }
  const label: undefined | string = val.label == void 0 ? void 0 : val.label;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "state" of type "ShuttleSystemV2026R0" to be defined',
    });
  }
  const state: ShuttleSystemV2026R0StateField =
    deserializeShuttleSystemV2026R0StateField(val.state);
  return {
    id: id,
    type: type,
    name: name,
    systemType: systemType,
    label: label,
    state: state,
  } satisfies ShuttleSystemV2026R0;
}
export function serializeShuttleSystemV2026R0Input(
  val: ShuttleSystemV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleSystemV2026R0TypeField(val.type),
    ['name']: val.name,
    ['system_type']: val.systemType,
    ['label']: val.label,
    ['state']: serializeShuttleSystemV2026R0StateField(val.state),
  };
}
export function deserializeShuttleSystemV2026R0Input(
  val: SerializedData
): ShuttleSystemV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleSystemV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleSystemV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleSystemV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleSystemV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleSystemV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleSystemV2026R0Input"',
    });
  }
  const name: string = val.name;
  if (val.system_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "system_type" of type "ShuttleSystemV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.system_type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_type" of type "ShuttleSystemV2026R0Input"',
    });
  }
  const systemType: string = val.system_type;
  if (!(val.label == void 0) && !sdIsString(val.label)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "label" of type "ShuttleSystemV2026R0Input"',
    });
  }
  const label: undefined | string = val.label == void 0 ? void 0 : val.label;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "state" of type "ShuttleSystemV2026R0Input" to be defined',
    });
  }
  const state: ShuttleSystemV2026R0StateField =
    deserializeShuttleSystemV2026R0StateField(val.state);
  return {
    id: id,
    type: type,
    name: name,
    systemType: systemType,
    label: label,
    state: state,
  } satisfies ShuttleSystemV2026R0Input;
}
