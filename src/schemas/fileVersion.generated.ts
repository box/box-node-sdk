import { serializeFileVersionBaseTypeField } from './fileVersionBase.generated.js';
import { deserializeFileVersionBaseTypeField } from './fileVersionBase.generated.js';
import { serializeFileVersionBase } from './fileVersionBase.generated.js';
import { deserializeFileVersionBase } from './fileVersionBase.generated.js';
import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileVersionBaseTypeField } from './fileVersionBase.generated.js';
import { FileVersionBase } from './fileVersionBase.generated.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class FileVersion extends FileVersionMini {
  readonly name?: string;
  readonly size?: number;
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  readonly modifiedBy?: UserMini;
  readonly trashedAt?: DateTime | null;
  readonly trashedBy?: UserMini;
  readonly restoredAt?: DateTime | null;
  readonly restoredBy?: UserMini;
  readonly purgedAt?: DateTime | null;
  readonly uploaderDisplayName?: string;
  constructor(fields: FileVersion) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.size !== undefined) {
      this.size = fields.size;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.modifiedBy !== undefined) {
      this.modifiedBy = fields.modifiedBy;
    }
    if (fields.trashedAt !== undefined) {
      this.trashedAt = fields.trashedAt;
    }
    if (fields.trashedBy !== undefined) {
      this.trashedBy = fields.trashedBy;
    }
    if (fields.restoredAt !== undefined) {
      this.restoredAt = fields.restoredAt;
    }
    if (fields.restoredBy !== undefined) {
      this.restoredBy = fields.restoredBy;
    }
    if (fields.purgedAt !== undefined) {
      this.purgedAt = fields.purgedAt;
    }
    if (fields.uploaderDisplayName !== undefined) {
      this.uploaderDisplayName = fields.uploaderDisplayName;
    }
  }
}
export function serializeFileVersion(val: FileVersion): SerializedData {
  const base: any = serializeFileVersionMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileVersion"' });
  }
  return {
    ...base,
    ...{
      ['name']: val.name,
      ['size']: val.size,
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
      ['modified_by']:
        val.modifiedBy == void 0
          ? val.modifiedBy
          : serializeUserMini(val.modifiedBy),
      ['trashed_at']:
        val.trashedAt == void 0
          ? val.trashedAt
          : serializeDateTime(val.trashedAt),
      ['trashed_by']:
        val.trashedBy == void 0
          ? val.trashedBy
          : serializeUserMini(val.trashedBy),
      ['restored_at']:
        val.restoredAt == void 0
          ? val.restoredAt
          : serializeDateTime(val.restoredAt),
      ['restored_by']:
        val.restoredBy == void 0
          ? val.restoredBy
          : serializeUserMini(val.restoredBy),
      ['purged_at']:
        val.purgedAt == void 0 ? val.purgedAt : serializeDateTime(val.purgedAt),
      ['uploader_display_name']: val.uploaderDisplayName,
    },
  };
}
export function deserializeFileVersion(val: SerializedData): FileVersion {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileVersion"' });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FileVersion"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "FileVersion"',
    });
  }
  const size: undefined | number = val.size == void 0 ? void 0 : val.size;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FileVersion"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "FileVersion"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  const modifiedBy: undefined | UserMini =
    val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "FileVersion"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  const trashedBy: undefined | UserMini =
    val.trashed_by == void 0 ? void 0 : deserializeUserMini(val.trashed_by);
  if (!(val.restored_at == void 0) && !sdIsString(val.restored_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "restored_at" of type "FileVersion"',
    });
  }
  const restoredAt: undefined | DateTime =
    val.restored_at == void 0 ? void 0 : deserializeDateTime(val.restored_at);
  const restoredBy: undefined | UserMini =
    val.restored_by == void 0 ? void 0 : deserializeUserMini(val.restored_by);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "FileVersion"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.uploader_display_name == void 0) &&
    !sdIsString(val.uploader_display_name)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "uploader_display_name" of type "FileVersion"',
    });
  }
  const uploaderDisplayName: undefined | string =
    val.uploader_display_name == void 0 ? void 0 : val.uploader_display_name;
  if (!(val.sha1 == void 0) && !sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "FileVersion"',
    });
  }
  const sha1: undefined | string = val.sha1 == void 0 ? void 0 : val.sha1;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileVersion" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersion"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileVersion" to be defined',
    });
  }
  const type: FileVersionBaseTypeField = deserializeFileVersionBaseTypeField(
    val.type,
  );
  return {
    name: name,
    size: size,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    modifiedBy: modifiedBy,
    trashedAt: trashedAt,
    trashedBy: trashedBy,
    restoredAt: restoredAt,
    restoredBy: restoredBy,
    purgedAt: purgedAt,
    uploaderDisplayName: uploaderDisplayName,
    sha1: sha1,
    id: id,
    type: type,
  } satisfies FileVersion;
}
