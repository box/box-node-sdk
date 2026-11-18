import { serializeShuttlePathMappingAccountInputV2026R0 } from './shuttlePathMappingAccountInputV2026R0';
import { deserializeShuttlePathMappingAccountInputV2026R0 } from './shuttlePathMappingAccountInputV2026R0';
import { ShuttlePathMappingAccountInputV2026R0 } from './shuttlePathMappingAccountInputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingAccountLocationInputV2026R0TypeField = 'account';
export class ShuttlePathMappingAccountLocationInputV2026R0 {
  /**
   * The value will always be `account`. */
  readonly type: ShuttlePathMappingAccountLocationInputV2026R0TypeField =
    'account' as ShuttlePathMappingAccountLocationInputV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path!: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly account!: ShuttlePathMappingAccountInputV2026R0;
  /**
   * Whether the location is a directory. When set, the destination must be
   * the same kind of object. */
  readonly isDirectory?: boolean;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathMappingAccountLocationInputV2026R0, 'type'> &
      Partial<Pick<ShuttlePathMappingAccountLocationInputV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.path !== undefined) {
      this.path = fields.path;
    }
    if (fields.pathId !== undefined) {
      this.pathId = fields.pathId;
    }
    if (fields.account !== undefined) {
      this.account = fields.account;
    }
    if (fields.isDirectory !== undefined) {
      this.isDirectory = fields.isDirectory;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathMappingAccountLocationInputV2026R0Input {
  /**
   * The value will always be `account`. */
  readonly type?: ShuttlePathMappingAccountLocationInputV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly account: ShuttlePathMappingAccountInputV2026R0;
  /**
   * Whether the location is a directory. When set, the destination must be
   * the same kind of object. */
  readonly isDirectory?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingAccountLocationInputV2026R0TypeField(
  val: ShuttlePathMappingAccountLocationInputV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingAccountLocationInputV2026R0TypeField(
  val: SerializedData
): ShuttlePathMappingAccountLocationInputV2026R0TypeField {
  if (val == 'account') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathMappingAccountLocationInputV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingAccountLocationInputV2026R0(
  val: ShuttlePathMappingAccountLocationInputV2026R0
): SerializedData {
  return {
    ['type']: serializeShuttlePathMappingAccountLocationInputV2026R0TypeField(
      val.type
    ),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']: serializeShuttlePathMappingAccountInputV2026R0(val.account),
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingAccountLocationInputV2026R0(
  val: SerializedData
): ShuttlePathMappingAccountLocationInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingAccountLocationInputV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingAccountLocationInputV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingAccountLocationInputV2026R0TypeField =
    deserializeShuttlePathMappingAccountLocationInputV2026R0TypeField(val.type);
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationInputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationInputV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationInputV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (val.account == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "account" of type "ShuttlePathMappingAccountLocationInputV2026R0" to be defined',
    });
  }
  const account: ShuttlePathMappingAccountInputV2026R0 =
    deserializeShuttlePathMappingAccountInputV2026R0(val.account);
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingAccountLocationInputV2026R0"',
    });
  }
  const isDirectory: undefined | boolean =
    val.is_directory == void 0 ? void 0 : val.is_directory;
  return {
    type: type,
    path: path,
    pathId: pathId,
    account: account,
    isDirectory: isDirectory,
  } satisfies ShuttlePathMappingAccountLocationInputV2026R0;
}
export function serializeShuttlePathMappingAccountLocationInputV2026R0Input(
  val: ShuttlePathMappingAccountLocationInputV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingAccountLocationInputV2026R0TypeField(
            val.type
          ),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']: serializeShuttlePathMappingAccountInputV2026R0(val.account),
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingAccountLocationInputV2026R0Input(
  val: SerializedData
): ShuttlePathMappingAccountLocationInputV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingAccountLocationInputV2026R0Input"',
    });
  }
  const type:
    | undefined
    | ShuttlePathMappingAccountLocationInputV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingAccountLocationInputV2026R0TypeField(
          val.type
        );
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationInputV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationInputV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationInputV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (val.account == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "account" of type "ShuttlePathMappingAccountLocationInputV2026R0Input" to be defined',
    });
  }
  const account: ShuttlePathMappingAccountInputV2026R0 =
    deserializeShuttlePathMappingAccountInputV2026R0(val.account);
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingAccountLocationInputV2026R0Input"',
    });
  }
  const isDirectory: undefined | boolean =
    val.is_directory == void 0 ? void 0 : val.is_directory;
  return {
    type: type,
    path: path,
    pathId: pathId,
    account: account,
    isDirectory: isDirectory,
  } satisfies ShuttlePathMappingAccountLocationInputV2026R0Input;
}
