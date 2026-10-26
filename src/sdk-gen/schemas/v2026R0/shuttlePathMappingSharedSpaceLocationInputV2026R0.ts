import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField =
  'shared_space';
export class ShuttlePathMappingSharedSpaceLocationInputV2026R0 {
  /**
   * The value will always be `shared_space`. */
  readonly type: ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField =
    'shared_space' as ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField;
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
  /**
   * Whether the location is a directory. When set, the destination must be
   * the same kind of object. */
  readonly isDirectory?: boolean;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathMappingSharedSpaceLocationInputV2026R0, 'type'> &
      Partial<Pick<ShuttlePathMappingSharedSpaceLocationInputV2026R0, 'type'>>
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
    if (fields.isDirectory !== undefined) {
      this.isDirectory = fields.isDirectory;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathMappingSharedSpaceLocationInputV2026R0Input {
  /**
   * The value will always be `shared_space`. */
  readonly type?: ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField;
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
  /**
   * Whether the location is a directory. When set, the destination must be
   * the same kind of object. */
  readonly isDirectory?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
  val: ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
  val: SerializedData
): ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField {
  if (val == 'shared_space') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingSharedSpaceLocationInputV2026R0(
  val: ShuttlePathMappingSharedSpaceLocationInputV2026R0
): SerializedData {
  return {
    ['type']:
      serializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
        val.type
      ),
    ['space']: val.space,
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0(
  val: SerializedData
): ShuttlePathMappingSharedSpaceLocationInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingSharedSpaceLocationInputV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField =
    deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
      val.type
    );
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0"',
    });
  }
  const isDirectory: undefined | boolean =
    val.is_directory == void 0 ? void 0 : val.is_directory;
  return {
    type: type,
    space: space,
    path: path,
    pathId: pathId,
    isDirectory: isDirectory,
  } satisfies ShuttlePathMappingSharedSpaceLocationInputV2026R0;
}
export function serializeShuttlePathMappingSharedSpaceLocationInputV2026R0Input(
  val: ShuttlePathMappingSharedSpaceLocationInputV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
            val.type
          ),
    ['space']: val.space,
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0Input(
  val: SerializedData
): ShuttlePathMappingSharedSpaceLocationInputV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input"',
    });
  }
  const type:
    undefined | ShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0TypeField(
          val.type
        );
  if (!(val.space == void 0) && !sdIsString(val.space)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "space" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input"',
    });
  }
  const space: undefined | string = val.space == void 0 ? void 0 : val.space;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingSharedSpaceLocationInputV2026R0Input"',
    });
  }
  const isDirectory: undefined | boolean =
    val.is_directory == void 0 ? void 0 : val.is_directory;
  return {
    type: type,
    space: space,
    path: path,
    pathId: pathId,
    isDirectory: isDirectory,
  } satisfies ShuttlePathMappingSharedSpaceLocationInputV2026R0Input;
}
