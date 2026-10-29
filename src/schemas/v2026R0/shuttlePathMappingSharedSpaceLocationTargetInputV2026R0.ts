import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField =
  'shared_space';
export class ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 {
  /**
   * The value will always be `shared_space`. */
  readonly type: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField =
    'shared_space' as ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField;
  /**
   * The display name of the shared container. Required for systems with
   * multiple containers. */
  readonly space?: string;
  /**
   * The human-readable path relative to the shared container. */
  readonly path!: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0,
      'type'
    > &
      Partial<
        Pick<ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0, 'type'>
      >,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.space !== undefined) {
      this.space = fields.space;
    }
    if (fields.path !== undefined) {
      this.path = fields.path;
    }
    if (fields.pathId !== undefined) {
      this.pathId = fields.pathId;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input {
  /**
   * The value will always be `shared_space`. */
  readonly type?: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField;
  /**
   * The display name of the shared container. Required for systems with
   * multiple containers. */
  readonly space?: string;
  /**
   * The human-readable path relative to the shared container. */
  readonly path: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
  val: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
  val: SerializedData,
): ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField {
  if (val == 'shared_space') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0(
  val: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0,
): SerializedData {
  return {
    ['type']:
      serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
        val.type,
      ),
    ['space']: val.space,
    ['path']: val.path,
    ['path_id']: val.pathId,
  };
}
export function deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0(
  val: SerializedData,
): ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField =
    deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
      val.type,
    );
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  return {
    type: type,
    space: space,
    path: path,
    pathId: pathId,
  } satisfies ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0;
}
export function serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input(
  val: ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
            val.type,
          ),
    ['space']: val.space,
    ['path']: val.path,
    ['path_id']: val.pathId,
  };
}
export function deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input(
  val: SerializedData,
): ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input"',
    });
  }
  const type:
    | undefined
    | ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0TypeField(
          val.type,
        );
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  return {
    type: type,
    space: space,
    path: path,
    pathId: pathId,
  } satisfies ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0Input;
}
