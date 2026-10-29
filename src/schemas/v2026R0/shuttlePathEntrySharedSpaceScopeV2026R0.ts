import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathEntrySharedSpaceScopeV2026R0TypeField = 'shared_space';
export class ShuttlePathEntrySharedSpaceScopeV2026R0 {
  /**
   * The value will always be `shared_space`. */
  readonly type: ShuttlePathEntrySharedSpaceScopeV2026R0TypeField =
    'shared_space' as ShuttlePathEntrySharedSpaceScopeV2026R0TypeField;
  /**
   * The display name of the shared container this entry belongs to.
   * `null` when the system has a single implicit container. Maps to
   * `space` on a shared-space path mapping location. */
  readonly space?: string | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathEntrySharedSpaceScopeV2026R0, 'type'> &
      Partial<Pick<ShuttlePathEntrySharedSpaceScopeV2026R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.space !== undefined) {
      this.space = fields.space;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathEntrySharedSpaceScopeV2026R0Input {
  /**
   * The value will always be `shared_space`. */
  readonly type?: ShuttlePathEntrySharedSpaceScopeV2026R0TypeField;
  /**
   * The display name of the shared container this entry belongs to.
   * `null` when the system has a single implicit container. Maps to
   * `space` on a shared-space path mapping location. */
  readonly space?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(
  val: ShuttlePathEntrySharedSpaceScopeV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(
  val: SerializedData,
): ShuttlePathEntrySharedSpaceScopeV2026R0TypeField {
  if (val == 'shared_space') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathEntrySharedSpaceScopeV2026R0TypeField",
  });
}
export function serializeShuttlePathEntrySharedSpaceScopeV2026R0(
  val: ShuttlePathEntrySharedSpaceScopeV2026R0,
): SerializedData {
  return {
    ['type']: serializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(
      val.type,
    ),
    ['space']: val.space,
  };
}
export function deserializeShuttlePathEntrySharedSpaceScopeV2026R0(
  val: SerializedData,
): ShuttlePathEntrySharedSpaceScopeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntrySharedSpaceScopeV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathEntrySharedSpaceScopeV2026R0" to be defined',
    });
  }
  const type: ShuttlePathEntrySharedSpaceScopeV2026R0TypeField =
    deserializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(val.type);
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathEntrySharedSpaceScopeV2026R0"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  return {
    type: type,
    space: space,
  } satisfies ShuttlePathEntrySharedSpaceScopeV2026R0;
}
export function serializeShuttlePathEntrySharedSpaceScopeV2026R0Input(
  val: ShuttlePathEntrySharedSpaceScopeV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(val.type),
    ['space']: val.space,
  };
}
export function deserializeShuttlePathEntrySharedSpaceScopeV2026R0Input(
  val: SerializedData,
): ShuttlePathEntrySharedSpaceScopeV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathEntrySharedSpaceScopeV2026R0Input"',
    });
  }
  const type: undefined | ShuttlePathEntrySharedSpaceScopeV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathEntrySharedSpaceScopeV2026R0TypeField(val.type);
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathEntrySharedSpaceScopeV2026R0Input"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  return {
    type: type,
    space: space,
  } satisfies ShuttlePathEntrySharedSpaceScopeV2026R0Input;
}
