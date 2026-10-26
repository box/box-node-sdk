import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathEntryAccountScopeV2026R0TypeField = 'account';
export class ShuttlePathEntryAccountScopeV2026R0 {
  /**
   * The value will always be `account`. */
  readonly type: ShuttlePathEntryAccountScopeV2026R0TypeField =
    'account' as ShuttlePathEntryAccountScopeV2026R0TypeField;
  /**
   * The platform-native identifier of the account that owns this entry.
   * `null` when the system does not provide one. This is not the path
   * entry `id`. Maps to `account.id` on an account-scoped path mapping
   * location. */
  readonly id?: string | null;
  /**
   * The email of the account that owns this entry. This is a
   * system-native identifier and is not always an RFC 5322 address.
   * `null` when unknown. Maps to `account.email` on an account-scoped
   * path mapping location. */
  readonly email?: string | null;
  /**
   * The display name of the account that owns this entry. `null` when
   * unknown. Maps to `account.name` on an account-scoped path mapping
   * location. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathEntryAccountScopeV2026R0, 'type'> &
      Partial<Pick<ShuttlePathEntryAccountScopeV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.email !== undefined) {
      this.email = fields.email;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathEntryAccountScopeV2026R0Input {
  /**
   * The value will always be `account`. */
  readonly type?: ShuttlePathEntryAccountScopeV2026R0TypeField;
  /**
   * The platform-native identifier of the account that owns this entry.
   * `null` when the system does not provide one. This is not the path
   * entry `id`. Maps to `account.id` on an account-scoped path mapping
   * location. */
  readonly id?: string | null;
  /**
   * The email of the account that owns this entry. This is a
   * system-native identifier and is not always an RFC 5322 address.
   * `null` when unknown. Maps to `account.email` on an account-scoped
   * path mapping location. */
  readonly email?: string | null;
  /**
   * The display name of the account that owns this entry. `null` when
   * unknown. Maps to `account.name` on an account-scoped path mapping
   * location. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathEntryAccountScopeV2026R0TypeField(
  val: ShuttlePathEntryAccountScopeV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttlePathEntryAccountScopeV2026R0TypeField(
  val: SerializedData
): ShuttlePathEntryAccountScopeV2026R0TypeField {
  if (val == 'account') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathEntryAccountScopeV2026R0TypeField",
  });
}
export function serializeShuttlePathEntryAccountScopeV2026R0(
  val: ShuttlePathEntryAccountScopeV2026R0
): SerializedData {
  return {
    ['type']: serializeShuttlePathEntryAccountScopeV2026R0TypeField(val.type),
    ['id']: val.id,
    ['email']: val.email,
    ['name']: val.name,
  };
}
export function deserializeShuttlePathEntryAccountScopeV2026R0(
  val: SerializedData
): ShuttlePathEntryAccountScopeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntryAccountScopeV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathEntryAccountScopeV2026R0" to be defined',
    });
  }
  const type: ShuttlePathEntryAccountScopeV2026R0TypeField =
    deserializeShuttlePathEntryAccountScopeV2026R0TypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathEntryAccountScopeV2026R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "ShuttlePathEntryAccountScopeV2026R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttlePathEntryAccountScopeV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    email: email,
    name: name,
  } satisfies ShuttlePathEntryAccountScopeV2026R0;
}
export function serializeShuttlePathEntryAccountScopeV2026R0Input(
  val: ShuttlePathEntryAccountScopeV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathEntryAccountScopeV2026R0TypeField(val.type),
    ['id']: val.id,
    ['email']: val.email,
    ['name']: val.name,
  };
}
export function deserializeShuttlePathEntryAccountScopeV2026R0Input(
  val: SerializedData
): ShuttlePathEntryAccountScopeV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntryAccountScopeV2026R0Input"',
    });
  }
  const type: undefined | ShuttlePathEntryAccountScopeV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathEntryAccountScopeV2026R0TypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathEntryAccountScopeV2026R0Input"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "ShuttlePathEntryAccountScopeV2026R0Input"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttlePathEntryAccountScopeV2026R0Input"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    email: email,
    name: name,
  } satisfies ShuttlePathEntryAccountScopeV2026R0Input;
}
