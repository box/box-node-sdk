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
export type ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField =
  'account';
export class ShuttlePathMappingAccountLocationTargetInputV2026R0 {
  /**
   * The value will always be `account`. */
  readonly type: ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField =
    'account' as ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path!: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly account!: ShuttlePathMappingAccountInputV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathMappingAccountLocationTargetInputV2026R0, 'type'> &
      Partial<
        Pick<ShuttlePathMappingAccountLocationTargetInputV2026R0, 'type'>
      >,
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
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathMappingAccountLocationTargetInputV2026R0Input {
  /**
   * The value will always be `account`. */
  readonly type?: ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField;
  /**
   * The human-readable path relative to the account root. */
  readonly path: string;
  /**
   * An optional stable identifier of the location, when obtained from
   * browsing. */
  readonly pathId?: string;
  readonly account: ShuttlePathMappingAccountInputV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
  val: ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
  val: SerializedData,
): ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField {
  if (val == 'account') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingAccountLocationTargetInputV2026R0(
  val: ShuttlePathMappingAccountLocationTargetInputV2026R0,
): SerializedData {
  return {
    ['type']:
      serializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
        val.type,
      ),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']: serializeShuttlePathMappingAccountInputV2026R0(val.account),
  };
}
export function deserializeShuttlePathMappingAccountLocationTargetInputV2026R0(
  val: SerializedData,
): ShuttlePathMappingAccountLocationTargetInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingAccountLocationTargetInputV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField =
    deserializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
      val.type,
    );
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (val.account == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "account" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0" to be defined',
    });
  }
  const account: ShuttlePathMappingAccountInputV2026R0 =
    deserializeShuttlePathMappingAccountInputV2026R0(val.account);
  return {
    type: type,
    path: path,
    pathId: pathId,
    account: account,
  } satisfies ShuttlePathMappingAccountLocationTargetInputV2026R0;
}
export function serializeShuttlePathMappingAccountLocationTargetInputV2026R0Input(
  val: ShuttlePathMappingAccountLocationTargetInputV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
            val.type,
          ),
    ['path']: val.path,
    ['path_id']: val.pathId,
    ['account']: serializeShuttlePathMappingAccountInputV2026R0(val.account),
  };
}
export function deserializeShuttlePathMappingAccountLocationTargetInputV2026R0Input(
  val: SerializedData,
): ShuttlePathMappingAccountLocationTargetInputV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingAccountLocationTargetInputV2026R0Input"',
    });
  }
  const type:
    undefined | ShuttlePathMappingAccountLocationTargetInputV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingAccountLocationTargetInputV2026R0TypeField(
          val.type,
        );
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (!(val.path_id == void 0) && !sdIsString(val.path_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path_id" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0Input"',
    });
  }
  const pathId: undefined | string =
    val.path_id == void 0 ? void 0 : val.path_id;
  if (val.account == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "account" of type "ShuttlePathMappingAccountLocationTargetInputV2026R0Input" to be defined',
    });
  }
  const account: ShuttlePathMappingAccountInputV2026R0 =
    deserializeShuttlePathMappingAccountInputV2026R0(val.account);
  return {
    type: type,
    path: path,
    pathId: pathId,
    account: account,
  } satisfies ShuttlePathMappingAccountLocationTargetInputV2026R0Input;
}
