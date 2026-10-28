import { serializeShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { deserializeShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { serializeShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { deserializeShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { serializeShuttlePathEntryScopeV2026R0 } from './shuttlePathEntryScopeV2026R0';
import { deserializeShuttlePathEntryScopeV2026R0 } from './shuttlePathEntryScopeV2026R0';
import { ShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { ShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { ShuttlePathEntryScopeV2026R0 } from './shuttlePathEntryScopeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathEntryV2026R0TypeField = 'shuttle_path_entry';
export class ShuttlePathEntryV2026R0 {
  /**
   * The unique identifier of this browse row. This is not the account
   * identifier; when `scope.type` is `account`, the account identifier is
   * `scope.id`. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_path_entry`. */
  readonly type: ShuttlePathEntryV2026R0TypeField =
    'shuttle_path_entry' as ShuttlePathEntryV2026R0TypeField;
  /**
   * The display name of the path entry. */
  readonly name!: string;
  /**
   * The human-readable path of the entry. */
  readonly path!: string;
  /**
   * The system-native identifier of the path. `null` when the selected
   * system does not provide one. Maps to `path_id` on a path mapping
   * location. */
  readonly pathId?: string | null;
  /**
   * The human-readable path of the parent entry, or `null` for a root
   * entry. */
  readonly parentPath?: string | null;
  readonly scope!: ShuttlePathEntryScopeV2026R0;
  /**
   * Whether the entry is a directory (`true`) or a single file
   * (`false`). Maps to `is_directory` on a path mapping location. */
  readonly isDirectory!: boolean;
  /**
   * Whether the entry can be selected in a path mapping. */
  readonly canMap!: boolean;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathEntryV2026R0, 'type'> &
      Partial<Pick<ShuttlePathEntryV2026R0, 'type'>>
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
    if (fields.path !== undefined) {
      this.path = fields.path;
    }
    if (fields.pathId !== undefined) {
      this.pathId = fields.pathId;
    }
    if (fields.parentPath !== undefined) {
      this.parentPath = fields.parentPath;
    }
    if (fields.scope !== undefined) {
      this.scope = fields.scope;
    }
    if (fields.isDirectory !== undefined) {
      this.isDirectory = fields.isDirectory;
    }
    if (fields.canMap !== undefined) {
      this.canMap = fields.canMap;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathEntryV2026R0Input {
  /**
   * The unique identifier of this browse row. This is not the account
   * identifier; when `scope.type` is `account`, the account identifier is
   * `scope.id`. */
  readonly id: string;
  /**
   * The value will always be `shuttle_path_entry`. */
  readonly type?: ShuttlePathEntryV2026R0TypeField;
  /**
   * The display name of the path entry. */
  readonly name: string;
  /**
   * The human-readable path of the entry. */
  readonly path: string;
  /**
   * The system-native identifier of the path. `null` when the selected
   * system does not provide one. Maps to `path_id` on a path mapping
   * location. */
  readonly pathId?: string | null;
  /**
   * The human-readable path of the parent entry, or `null` for a root
   * entry. */
  readonly parentPath?: string | null;
  readonly scope: ShuttlePathEntryScopeV2026R0;
  /**
   * Whether the entry is a directory (`true`) or a single file
   * (`false`). Maps to `is_directory` on a path mapping location. */
  readonly isDirectory: boolean;
  /**
   * Whether the entry can be selected in a path mapping. */
  readonly canMap: boolean;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathEntryV2026R0TypeField(
  val: ShuttlePathEntryV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttlePathEntryV2026R0TypeField(
  val: SerializedData
): ShuttlePathEntryV2026R0TypeField {
  if (val == 'shuttle_path_entry') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathEntryV2026R0TypeField",
  });
}
export function serializeShuttlePathEntryV2026R0(
  val: ShuttlePathEntryV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttlePathEntryV2026R0TypeField(val.type),
    ['name']: val.name,
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['parent_path']: val.parentPath,
    ['scope']: serializeShuttlePathEntryScopeV2026R0(val.scope),
    ['is_directory']: val.isDirectory,
    ['can_map']: val.canMap,
  };
}
export function deserializeShuttlePathEntryV2026R0(
  val: SerializedData
): ShuttlePathEntryV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntryV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  const type: ShuttlePathEntryV2026R0TypeField =
    deserializeShuttlePathEntryV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const name: string = val.name;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message: 'Expecting string for "path" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (!(val.parent_path == void 0) && !sdIsString(val.parent_path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_path" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const parentPath: undefined | string =
    val.parent_path == void 0 ? void 0 : val.parent_path;
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  const scope: ShuttlePathEntryScopeV2026R0 =
    deserializeShuttlePathEntryScopeV2026R0(val.scope);
  if (val.is_directory == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_directory" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const isDirectory: boolean = val.is_directory;
  if (val.can_map == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_map" of type "ShuttlePathEntryV2026R0" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_map)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_map" of type "ShuttlePathEntryV2026R0"',
    });
  }
  const canMap: boolean = val.can_map;
  return {
    id: id,
    type: type,
    name: name,
    path: path,
    pathId: pathId,
    parentPath: parentPath,
    scope: scope,
    isDirectory: isDirectory,
    canMap: canMap,
  } satisfies ShuttlePathEntryV2026R0;
}
export function serializeShuttlePathEntryV2026R0Input(
  val: ShuttlePathEntryV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathEntryV2026R0TypeField(val.type),
    ['name']: val.name,
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['parent_path']: val.parentPath,
    ['scope']: serializeShuttlePathEntryScopeV2026R0(val.scope),
    ['is_directory']: val.isDirectory,
    ['can_map']: val.canMap,
  };
}
export function deserializeShuttlePathEntryV2026R0Input(
  val: SerializedData
): ShuttlePathEntryV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntryV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttlePathEntryV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathEntryV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const name: string = val.name;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (!(val.parent_path == void 0) && !sdIsString(val.parent_path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_path" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const parentPath: undefined | string =
    val.parent_path == void 0 ? void 0 : val.parent_path;
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  const scope: ShuttlePathEntryScopeV2026R0 =
    deserializeShuttlePathEntryScopeV2026R0(val.scope);
  if (val.is_directory == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_directory" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const isDirectory: boolean = val.is_directory;
  if (val.can_map == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_map" of type "ShuttlePathEntryV2026R0Input" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_map)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_map" of type "ShuttlePathEntryV2026R0Input"',
    });
  }
  const canMap: boolean = val.can_map;
  return {
    id: id,
    type: type,
    name: name,
    path: path,
    pathId: pathId,
    parentPath: parentPath,
    scope: scope,
    isDirectory: isDirectory,
    canMap: canMap,
  } satisfies ShuttlePathEntryV2026R0Input;
}
