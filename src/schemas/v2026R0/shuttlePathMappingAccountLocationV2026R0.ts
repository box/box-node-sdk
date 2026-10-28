import { serializeShuttlePathMappingAccountV2026R0 } from './shuttlePathMappingAccountV2026R0';
import { deserializeShuttlePathMappingAccountV2026R0 } from './shuttlePathMappingAccountV2026R0';
import { ShuttlePathMappingAccountV2026R0 } from './shuttlePathMappingAccountV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingAccountLocationV2026R0TypeField = 'account';
export class ShuttlePathMappingAccountLocationV2026R0 {
  /**
   * The value will always be `account`. */
  readonly type: ShuttlePathMappingAccountLocationV2026R0TypeField =
    'account' as ShuttlePathMappingAccountLocationV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path!: string;
  /**
   * The stable identifier of the location. `null` when the system does not
   * provide one. */
  readonly pathId?: string | null;
  readonly account?: ShuttlePathMappingAccountV2026R0;
  /**
   * Whether the location is a directory. `null` when unknown. */
  readonly isDirectory?: boolean | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathMappingAccountLocationV2026R0, 'type'> &
      Partial<Pick<ShuttlePathMappingAccountLocationV2026R0, 'type'>>,
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
export interface ShuttlePathMappingAccountLocationV2026R0Input {
  /**
   * The value will always be `account`. */
  readonly type?: ShuttlePathMappingAccountLocationV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path: string;
  /**
   * The stable identifier of the location. `null` when the system does not
   * provide one. */
  readonly pathId?: string | null;
  readonly account?: ShuttlePathMappingAccountV2026R0;
  /**
   * Whether the location is a directory. `null` when unknown. */
  readonly isDirectory?: boolean | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingAccountLocationV2026R0TypeField(
  val: ShuttlePathMappingAccountLocationV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingAccountLocationV2026R0TypeField(
  val: SerializedData,
): ShuttlePathMappingAccountLocationV2026R0TypeField {
  if (val == 'account') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathMappingAccountLocationV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingAccountLocationV2026R0(
  val: ShuttlePathMappingAccountLocationV2026R0,
): SerializedData {
  return {
    ['type']: serializeShuttlePathMappingAccountLocationV2026R0TypeField(
      val.type,
    ),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']:
      val.account == void 0
        ? val.account
        : serializeShuttlePathMappingAccountV2026R0(val.account),
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingAccountLocationV2026R0(
  val: SerializedData,
): ShuttlePathMappingAccountLocationV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingAccountLocationV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingAccountLocationV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingAccountLocationV2026R0TypeField =
    deserializeShuttlePathMappingAccountLocationV2026R0TypeField(val.type);
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  const account: undefined | ShuttlePathMappingAccountV2026R0 =
    val.account == void 0
      ? void 0
      : deserializeShuttlePathMappingAccountV2026R0(val.account);
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingAccountLocationV2026R0"',
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
  } satisfies ShuttlePathMappingAccountLocationV2026R0;
}
export function serializeShuttlePathMappingAccountLocationV2026R0Input(
  val: ShuttlePathMappingAccountLocationV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingAccountLocationV2026R0TypeField(val.type),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']:
      val.account == void 0
        ? val.account
        : serializeShuttlePathMappingAccountV2026R0(val.account),
    ['is_directory']: val.isDirectory,
  };
}
export function deserializeShuttlePathMappingAccountLocationV2026R0Input(
  val: SerializedData,
): ShuttlePathMappingAccountLocationV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingAccountLocationV2026R0Input"',
    });
  }
  const type: undefined | ShuttlePathMappingAccountLocationV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingAccountLocationV2026R0TypeField(val.type);
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  const account: undefined | ShuttlePathMappingAccountV2026R0 =
    val.account == void 0
      ? void 0
      : deserializeShuttlePathMappingAccountV2026R0(val.account);
  if (!(val.is_directory == void 0) && !sdIsBoolean(val.is_directory)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_directory" of type "ShuttlePathMappingAccountLocationV2026R0Input"',
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
  } satisfies ShuttlePathMappingAccountLocationV2026R0Input;
}
