import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ArchiveV2025R0TypeField = 'archive';
export interface ArchiveV2025R0OwnedByField {
  /**
   * The unique identifier that represents a user who owns the archive. */
  readonly id: string;
  /**
   * The value is always `user`. */
  readonly type: string;
  readonly rawData?: SerializedData;
}
export class ArchiveV2025R0 {
  /**
   * The unique identifier that represents an archive. */
  readonly id!: string;
  /**
   * The value is always `archive`. */
  readonly type: ArchiveV2025R0TypeField = 'archive' as ArchiveV2025R0TypeField;
  /**
   * The name of the archive.
   *
   * The following restrictions to the archive name apply: names containing
   * non-printable ASCII characters, forward and backward slashes
   * (`/`, `\`), names with trailing spaces, and names `.` and `..` are
   * not allowed. */
  readonly name!: string;
  /**
   * The size of the archive in bytes. */
  readonly size!: number;
  /**
   * The description of the archive. */
  readonly description?: string | null;
  /**
   * The part of an archive API response that describes the user who owns the archive. */
  readonly ownedBy?: ArchiveV2025R0OwnedByField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ArchiveV2025R0, 'type'> &
      Partial<Pick<ArchiveV2025R0, 'type'>>,
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
    if (fields.size !== undefined) {
      this.size = fields.size;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.ownedBy !== undefined) {
      this.ownedBy = fields.ownedBy;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ArchiveV2025R0Input {
  /**
   * The unique identifier that represents an archive. */
  readonly id: string;
  /**
   * The value is always `archive`. */
  readonly type?: ArchiveV2025R0TypeField;
  /**
   * The name of the archive.
   *
   * The following restrictions to the archive name apply: names containing
   * non-printable ASCII characters, forward and backward slashes
   * (`/`, `\`), names with trailing spaces, and names `.` and `..` are
   * not allowed. */
  readonly name: string;
  /**
   * The size of the archive in bytes. */
  readonly size: number;
  /**
   * The description of the archive. */
  readonly description?: string | null;
  /**
   * The part of an archive API response that describes the user who owns the archive. */
  readonly ownedBy?: ArchiveV2025R0OwnedByField;
  readonly rawData?: SerializedData;
}
export function serializeArchiveV2025R0TypeField(
  val: ArchiveV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeArchiveV2025R0TypeField(
  val: SerializedData,
): ArchiveV2025R0TypeField {
  if (val == 'archive') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ArchiveV2025R0TypeField",
  });
}
export function serializeArchiveV2025R0OwnedByField(
  val: ArchiveV2025R0OwnedByField,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeArchiveV2025R0OwnedByField(
  val: SerializedData,
): ArchiveV2025R0OwnedByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ArchiveV2025R0OwnedByField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ArchiveV2025R0OwnedByField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ArchiveV2025R0OwnedByField"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ArchiveV2025R0OwnedByField" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "ArchiveV2025R0OwnedByField"',
    });
  }
  const type: string = val.type;
  return { id: id, type: type } satisfies ArchiveV2025R0OwnedByField;
}
export function serializeArchiveV2025R0(val: ArchiveV2025R0): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeArchiveV2025R0TypeField(val.type),
    ['name']: val.name,
    ['size']: val.size,
    ['description']: val.description,
    ['owned_by']:
      val.ownedBy == void 0
        ? val.ownedBy
        : serializeArchiveV2025R0OwnedByField(val.ownedBy),
  };
}
export function deserializeArchiveV2025R0(val: SerializedData): ArchiveV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ArchiveV2025R0"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ArchiveV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ArchiveV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ArchiveV2025R0" to be defined',
    });
  }
  const type: ArchiveV2025R0TypeField = deserializeArchiveV2025R0TypeField(
    val.type,
  );
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ArchiveV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ArchiveV2025R0"',
    });
  }
  const name: string = val.name;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "ArchiveV2025R0" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "ArchiveV2025R0"',
    });
  }
  const size: number = val.size;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "ArchiveV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const ownedBy: undefined | ArchiveV2025R0OwnedByField =
    val.owned_by == void 0
      ? void 0
      : deserializeArchiveV2025R0OwnedByField(val.owned_by);
  return {
    id: id,
    type: type,
    name: name,
    size: size,
    description: description,
    ownedBy: ownedBy,
  } satisfies ArchiveV2025R0;
}
export function serializeArchiveV2025R0Input(
  val: ArchiveV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeArchiveV2025R0TypeField(val.type),
    ['name']: val.name,
    ['size']: val.size,
    ['description']: val.description,
    ['owned_by']:
      val.ownedBy == void 0
        ? val.ownedBy
        : serializeArchiveV2025R0OwnedByField(val.ownedBy),
  };
}
export function deserializeArchiveV2025R0Input(
  val: SerializedData,
): ArchiveV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ArchiveV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ArchiveV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ArchiveV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ArchiveV2025R0TypeField =
    val.type == void 0 ? void 0 : deserializeArchiveV2025R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ArchiveV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ArchiveV2025R0Input"',
    });
  }
  const name: string = val.name;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "ArchiveV2025R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "ArchiveV2025R0Input"',
    });
  }
  const size: number = val.size;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ArchiveV2025R0Input"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const ownedBy: undefined | ArchiveV2025R0OwnedByField =
    val.owned_by == void 0
      ? void 0
      : deserializeArchiveV2025R0OwnedByField(val.owned_by);
  return {
    id: id,
    type: type,
    name: name,
    size: size,
    description: description,
    ownedBy: ownedBy,
  } satisfies ArchiveV2025R0Input;
}
