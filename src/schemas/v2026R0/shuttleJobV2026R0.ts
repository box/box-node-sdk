import { serializeShuttleJobPermissionConflictStrategyV2026R0 } from './shuttleJobPermissionConflictStrategyV2026R0';
import { deserializeShuttleJobPermissionConflictStrategyV2026R0 } from './shuttleJobPermissionConflictStrategyV2026R0';
import { ShuttleJobPermissionConflictStrategyV2026R0 } from './shuttleJobPermissionConflictStrategyV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobV2026R0TypeField = 'shuttle_job';
export type ShuttleJobV2026R0JobTypeField = 'transfer' | 'analysis' | string;
export type ShuttleJobV2026R0SourceSystemTypeField = 'shuttle_system';
export class ShuttleJobV2026R0SourceSystemField {
  /**
   * The value will always be `shuttle_system`. */
  readonly type: ShuttleJobV2026R0SourceSystemTypeField =
    'shuttle_system' as ShuttleJobV2026R0SourceSystemTypeField;
  /**
   * The unique identifier for the source system. */
  readonly id!: string;
  /**
   * The human-readable name of the source system. */
  readonly name!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleJobV2026R0SourceSystemField, 'type'> &
      Partial<Pick<ShuttleJobV2026R0SourceSystemField, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleJobV2026R0SourceSystemFieldInput {
  /**
   * The value will always be `shuttle_system`. */
  readonly type?: ShuttleJobV2026R0SourceSystemTypeField;
  /**
   * The unique identifier for the source system. */
  readonly id: string;
  /**
   * The human-readable name of the source system. */
  readonly name: string;
  readonly rawData?: SerializedData;
}
export interface ShuttleJobV2026R0AccountMappingField {
  /**
   * Whether account mapping is enabled for the shuttle job. */
  readonly isEnabled: boolean;
  /**
   * The strategy used to resolve permission conflicts. `null` when
   * unset. */
  readonly permissionConflictStrategy?: ShuttleJobPermissionConflictStrategyV2026R0;
  /**
   * Whether external shares are mapped during the migration. */
  readonly areExternalSharesMapped?: boolean;
  /**
   * Whether permissions are mapped during the migration. */
  readonly arePermissionsMapped?: boolean;
  readonly rawData?: SerializedData;
}
export interface ShuttleJobV2026R0SettingsField {
  /**
   * The maximum transfer bandwidth in bytes per second. `null` when
   * unlimited. */
  readonly bandwidthLimitBytesPerSec?: number | null;
  /**
   * Whether deletions in the source system are mirrored in Box. */
  readonly areDeletionsMirrored?: boolean;
  /**
   * Whether prior file versions are synced during the migration. */
  readonly areFileVersionsSynced?: boolean;
  /**
   * The maximum number of file versions to sync. `null` when unlimited. */
  readonly maxFileVersions?: number | null;
  /**
   * Whether existing files in Box are overwritten. */
  readonly isOverwriteEnabled?: boolean;
  /**
   * Whether mappings that already completed successfully are skipped when
   * the job is rerun. */
  readonly areCompletedMappingsSkippedOnRerun?: boolean;
  /**
   * Whether migrated content is scanned during the migration. Applies
   * only when the source system supports content scanning; ignored
   * otherwise. */
  readonly isContentScanningEnabled?: boolean;
  /**
   * Whether shared folders on the source are included in the migration.
   * Applies only when the source system supports shared folders; ignored
   * otherwise. */
  readonly includeSharedSourceFolders?: boolean;
  /**
   * Whether shared folders on the destination are included in the
   * migration. Applies only when the destination system supports shared
   * folders; ignored otherwise. */
  readonly includeSharedDestinationFolders?: boolean;
  readonly rawData?: SerializedData;
}
export class ShuttleJobV2026R0 {
  /**
   * The unique identifier for the shuttle job. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_job`. */
  readonly type: ShuttleJobV2026R0TypeField =
    'shuttle_job' as ShuttleJobV2026R0TypeField;
  /**
   * The human-readable name of the shuttle job. */
  readonly name!: string;
  /**
   * An optional free-form comment describing the shuttle job. */
  readonly comment?: string | null;
  /**
   * The type of work the shuttle job performs. */
  readonly jobType!: ShuttleJobV2026R0JobTypeField;
  /**
   * The current state of the shuttle job. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `created`, `started`, `stopped`, `completed`, `failed`, `invalid`, and
   * `unknown`. Clients should treat any value they do not recognize as
   * `unknown`. */
  readonly state!: string;
  /**
   * The current mapping-preparation state of the job. This is an open string
   * whose set of values is expected to grow; the currently documented values
   * include `awaiting_path_mapping`, `importing_paths`,
   * `paths_import_rejected`, `paths_invalid`, `paths_ready`,
   * `scanning_source`, `source_scan_failed`, `source_scan_out_of_date`,
   * `awaiting_subject_mapping`, `importing_subjects`,
   * `subjects_import_rejected`, `mapping_complete`, `building_map`,
   * `map_build_failed`, `map_out_of_date`, and `ready`.
   * `paths_import_rejected` means the last path-mapping spreadsheet was
   * rejected or failed and the path mappings have not been changed since;
   * it clears on the next import or the next manual path-mapping change.
   * `subjects_import_rejected` means the last subject-mapping spreadsheet
   * was rejected or failed and the subject mappings have not been changed
   * since; it clears on the next import or the next manual subject-mapping
   * change. */
  readonly mappingState!: string;
  /**
   * The source system the shuttle job migrates content from. */
  readonly sourceSystem!: ShuttleJobV2026R0SourceSystemField;
  /**
   * The account mapping configuration that controls how source identities
   * and permissions are translated into Box. */
  readonly accountMapping?: ShuttleJobV2026R0AccountMappingField;
  /**
   * A list of free-form tags associated with the shuttle job. */
  readonly tags?: readonly string[];
  /**
   * The tunable settings that control how the shuttle job runs. */
  readonly settings?: ShuttleJobV2026R0SettingsField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleJobV2026R0, 'type'> &
      Partial<Pick<ShuttleJobV2026R0, 'type'>>,
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
    if (fields.comment !== undefined) {
      this.comment = fields.comment;
    }
    if (fields.jobType !== undefined) {
      this.jobType = fields.jobType;
    }
    if (fields.state !== undefined) {
      this.state = fields.state;
    }
    if (fields.mappingState !== undefined) {
      this.mappingState = fields.mappingState;
    }
    if (fields.sourceSystem !== undefined) {
      this.sourceSystem = fields.sourceSystem;
    }
    if (fields.accountMapping !== undefined) {
      this.accountMapping = fields.accountMapping;
    }
    if (fields.tags !== undefined) {
      this.tags = fields.tags;
    }
    if (fields.settings !== undefined) {
      this.settings = fields.settings;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleJobV2026R0Input {
  /**
   * The unique identifier for the shuttle job. */
  readonly id: string;
  /**
   * The value will always be `shuttle_job`. */
  readonly type?: ShuttleJobV2026R0TypeField;
  /**
   * The human-readable name of the shuttle job. */
  readonly name: string;
  /**
   * An optional free-form comment describing the shuttle job. */
  readonly comment?: string | null;
  /**
   * The type of work the shuttle job performs. */
  readonly jobType: ShuttleJobV2026R0JobTypeField;
  /**
   * The current state of the shuttle job. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `created`, `started`, `stopped`, `completed`, `failed`, `invalid`, and
   * `unknown`. Clients should treat any value they do not recognize as
   * `unknown`. */
  readonly state: string;
  /**
   * The current mapping-preparation state of the job. This is an open string
   * whose set of values is expected to grow; the currently documented values
   * include `awaiting_path_mapping`, `importing_paths`,
   * `paths_import_rejected`, `paths_invalid`, `paths_ready`,
   * `scanning_source`, `source_scan_failed`, `source_scan_out_of_date`,
   * `awaiting_subject_mapping`, `importing_subjects`,
   * `subjects_import_rejected`, `mapping_complete`, `building_map`,
   * `map_build_failed`, `map_out_of_date`, and `ready`.
   * `paths_import_rejected` means the last path-mapping spreadsheet was
   * rejected or failed and the path mappings have not been changed since;
   * it clears on the next import or the next manual path-mapping change.
   * `subjects_import_rejected` means the last subject-mapping spreadsheet
   * was rejected or failed and the subject mappings have not been changed
   * since; it clears on the next import or the next manual subject-mapping
   * change. */
  readonly mappingState: string;
  /**
   * The source system the shuttle job migrates content from. */
  readonly sourceSystem: ShuttleJobV2026R0SourceSystemField;
  /**
   * The account mapping configuration that controls how source identities
   * and permissions are translated into Box. */
  readonly accountMapping?: ShuttleJobV2026R0AccountMappingField;
  /**
   * A list of free-form tags associated with the shuttle job. */
  readonly tags?: readonly string[];
  /**
   * The tunable settings that control how the shuttle job runs. */
  readonly settings?: ShuttleJobV2026R0SettingsField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobV2026R0TypeField(
  val: ShuttleJobV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobV2026R0TypeField(
  val: SerializedData,
): ShuttleJobV2026R0TypeField {
  if (val == 'shuttle_job') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobV2026R0TypeField",
  });
}
export function serializeShuttleJobV2026R0JobTypeField(
  val: ShuttleJobV2026R0JobTypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobV2026R0JobTypeField(
  val: SerializedData,
): ShuttleJobV2026R0JobTypeField {
  if (val == 'transfer') {
    return val;
  }
  if (val == 'analysis') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobV2026R0JobTypeField",
  });
}
export function serializeShuttleJobV2026R0SourceSystemTypeField(
  val: ShuttleJobV2026R0SourceSystemTypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobV2026R0SourceSystemTypeField(
  val: SerializedData,
): ShuttleJobV2026R0SourceSystemTypeField {
  if (val == 'shuttle_system') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobV2026R0SourceSystemTypeField",
  });
}
export function serializeShuttleJobV2026R0SourceSystemField(
  val: ShuttleJobV2026R0SourceSystemField,
): SerializedData {
  return {
    ['type']: serializeShuttleJobV2026R0SourceSystemTypeField(val.type),
    ['id']: val.id,
    ['name']: val.name,
  };
}
export function deserializeShuttleJobV2026R0SourceSystemField(
  val: SerializedData,
): ShuttleJobV2026R0SourceSystemField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0SourceSystemField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleJobV2026R0SourceSystemField" to be defined',
    });
  }
  const type: ShuttleJobV2026R0SourceSystemTypeField =
    deserializeShuttleJobV2026R0SourceSystemTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleJobV2026R0SourceSystemField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleJobV2026R0SourceSystemField"',
    });
  }
  const id: string = val.id;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleJobV2026R0SourceSystemField" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleJobV2026R0SourceSystemField"',
    });
  }
  const name: string = val.name;
  return {
    type: type,
    id: id,
    name: name,
  } satisfies ShuttleJobV2026R0SourceSystemField;
}
export function serializeShuttleJobV2026R0SourceSystemFieldInput(
  val: ShuttleJobV2026R0SourceSystemFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleJobV2026R0SourceSystemTypeField(val.type),
    ['id']: val.id,
    ['name']: val.name,
  };
}
export function deserializeShuttleJobV2026R0SourceSystemFieldInput(
  val: SerializedData,
): ShuttleJobV2026R0SourceSystemFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0SourceSystemFieldInput"',
    });
  }
  const type: undefined | ShuttleJobV2026R0SourceSystemTypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleJobV2026R0SourceSystemTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleJobV2026R0SourceSystemFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleJobV2026R0SourceSystemFieldInput"',
    });
  }
  const id: string = val.id;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleJobV2026R0SourceSystemFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleJobV2026R0SourceSystemFieldInput"',
    });
  }
  const name: string = val.name;
  return {
    type: type,
    id: id,
    name: name,
  } satisfies ShuttleJobV2026R0SourceSystemFieldInput;
}
export function serializeShuttleJobV2026R0AccountMappingField(
  val: ShuttleJobV2026R0AccountMappingField,
): SerializedData {
  return {
    ['is_enabled']: val.isEnabled,
    ['permission_conflict_strategy']:
      val.permissionConflictStrategy == void 0
        ? val.permissionConflictStrategy
        : serializeShuttleJobPermissionConflictStrategyV2026R0(
            val.permissionConflictStrategy,
          ),
    ['are_external_shares_mapped']: val.areExternalSharesMapped,
    ['are_permissions_mapped']: val.arePermissionsMapped,
  };
}
export function deserializeShuttleJobV2026R0AccountMappingField(
  val: SerializedData,
): ShuttleJobV2026R0AccountMappingField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0AccountMappingField"',
    });
  }
  if (val.is_enabled == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_enabled" of type "ShuttleJobV2026R0AccountMappingField" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_enabled" of type "ShuttleJobV2026R0AccountMappingField"',
    });
  }
  const isEnabled: boolean = val.is_enabled;
  const permissionConflictStrategy:
    ShuttleJobPermissionConflictStrategyV2026R0 | undefined =
    val.permission_conflict_strategy == void 0
      ? void 0
      : deserializeShuttleJobPermissionConflictStrategyV2026R0(
          val.permission_conflict_strategy,
        );
  if (
    !(val.are_external_shares_mapped == void 0) &&
    !sdIsBoolean(val.are_external_shares_mapped)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_external_shares_mapped" of type "ShuttleJobV2026R0AccountMappingField"',
    });
  }
  const areExternalSharesMapped: undefined | boolean =
    val.are_external_shares_mapped == void 0
      ? void 0
      : val.are_external_shares_mapped;
  if (
    !(val.are_permissions_mapped == void 0) &&
    !sdIsBoolean(val.are_permissions_mapped)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_permissions_mapped" of type "ShuttleJobV2026R0AccountMappingField"',
    });
  }
  const arePermissionsMapped: undefined | boolean =
    val.are_permissions_mapped == void 0 ? void 0 : val.are_permissions_mapped;
  return {
    isEnabled: isEnabled,
    permissionConflictStrategy: permissionConflictStrategy,
    areExternalSharesMapped: areExternalSharesMapped,
    arePermissionsMapped: arePermissionsMapped,
  } satisfies ShuttleJobV2026R0AccountMappingField;
}
export function serializeShuttleJobV2026R0SettingsField(
  val: ShuttleJobV2026R0SettingsField,
): SerializedData {
  return {
    ['bandwidth_limit_bytes_per_sec']: val.bandwidthLimitBytesPerSec,
    ['are_deletions_mirrored']: val.areDeletionsMirrored,
    ['are_file_versions_synced']: val.areFileVersionsSynced,
    ['max_file_versions']: val.maxFileVersions,
    ['is_overwrite_enabled']: val.isOverwriteEnabled,
    ['are_completed_mappings_skipped_on_rerun']:
      val.areCompletedMappingsSkippedOnRerun,
    ['is_content_scanning_enabled']: val.isContentScanningEnabled,
    ['include_shared_source_folders']: val.includeSharedSourceFolders,
    ['include_shared_destination_folders']: val.includeSharedDestinationFolders,
  };
}
export function deserializeShuttleJobV2026R0SettingsField(
  val: SerializedData,
): ShuttleJobV2026R0SettingsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0SettingsField"',
    });
  }
  if (
    !(val.bandwidth_limit_bytes_per_sec == void 0) &&
    !sdIsNumber(val.bandwidth_limit_bytes_per_sec)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "bandwidth_limit_bytes_per_sec" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const bandwidthLimitBytesPerSec: undefined | number =
    val.bandwidth_limit_bytes_per_sec == void 0
      ? void 0
      : val.bandwidth_limit_bytes_per_sec;
  if (
    !(val.are_deletions_mirrored == void 0) &&
    !sdIsBoolean(val.are_deletions_mirrored)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_deletions_mirrored" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const areDeletionsMirrored: undefined | boolean =
    val.are_deletions_mirrored == void 0 ? void 0 : val.are_deletions_mirrored;
  if (
    !(val.are_file_versions_synced == void 0) &&
    !sdIsBoolean(val.are_file_versions_synced)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_file_versions_synced" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const areFileVersionsSynced: undefined | boolean =
    val.are_file_versions_synced == void 0
      ? void 0
      : val.are_file_versions_synced;
  if (
    !(val.max_file_versions == void 0) &&
    !sdIsNumber(val.max_file_versions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "max_file_versions" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const maxFileVersions: undefined | number =
    val.max_file_versions == void 0 ? void 0 : val.max_file_versions;
  if (
    !(val.is_overwrite_enabled == void 0) &&
    !sdIsBoolean(val.is_overwrite_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_overwrite_enabled" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const isOverwriteEnabled: undefined | boolean =
    val.is_overwrite_enabled == void 0 ? void 0 : val.is_overwrite_enabled;
  if (
    !(val.are_completed_mappings_skipped_on_rerun == void 0) &&
    !sdIsBoolean(val.are_completed_mappings_skipped_on_rerun)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_completed_mappings_skipped_on_rerun" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const areCompletedMappingsSkippedOnRerun: undefined | boolean =
    val.are_completed_mappings_skipped_on_rerun == void 0
      ? void 0
      : val.are_completed_mappings_skipped_on_rerun;
  if (
    !(val.is_content_scanning_enabled == void 0) &&
    !sdIsBoolean(val.is_content_scanning_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_content_scanning_enabled" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const isContentScanningEnabled: undefined | boolean =
    val.is_content_scanning_enabled == void 0
      ? void 0
      : val.is_content_scanning_enabled;
  if (
    !(val.include_shared_source_folders == void 0) &&
    !sdIsBoolean(val.include_shared_source_folders)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "include_shared_source_folders" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const includeSharedSourceFolders: undefined | boolean =
    val.include_shared_source_folders == void 0
      ? void 0
      : val.include_shared_source_folders;
  if (
    !(val.include_shared_destination_folders == void 0) &&
    !sdIsBoolean(val.include_shared_destination_folders)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "include_shared_destination_folders" of type "ShuttleJobV2026R0SettingsField"',
    });
  }
  const includeSharedDestinationFolders: undefined | boolean =
    val.include_shared_destination_folders == void 0
      ? void 0
      : val.include_shared_destination_folders;
  return {
    bandwidthLimitBytesPerSec: bandwidthLimitBytesPerSec,
    areDeletionsMirrored: areDeletionsMirrored,
    areFileVersionsSynced: areFileVersionsSynced,
    maxFileVersions: maxFileVersions,
    isOverwriteEnabled: isOverwriteEnabled,
    areCompletedMappingsSkippedOnRerun: areCompletedMappingsSkippedOnRerun,
    isContentScanningEnabled: isContentScanningEnabled,
    includeSharedSourceFolders: includeSharedSourceFolders,
    includeSharedDestinationFolders: includeSharedDestinationFolders,
  } satisfies ShuttleJobV2026R0SettingsField;
}
export function serializeShuttleJobV2026R0(
  val: ShuttleJobV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleJobV2026R0TypeField(val.type),
    ['name']: val.name,
    ['comment']: val.comment,
    ['job_type']: serializeShuttleJobV2026R0JobTypeField(val.jobType),
    ['state']: val.state,
    ['mapping_state']: val.mappingState,
    ['source_system']: serializeShuttleJobV2026R0SourceSystemField(
      val.sourceSystem,
    ),
    ['account_mapping']:
      val.accountMapping == void 0
        ? val.accountMapping
        : serializeShuttleJobV2026R0AccountMappingField(val.accountMapping),
    ['tags']:
      val.tags == void 0
        ? val.tags
        : (val.tags.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['settings']:
      val.settings == void 0
        ? val.settings
        : serializeShuttleJobV2026R0SettingsField(val.settings),
  };
}
export function deserializeShuttleJobV2026R0(
  val: SerializedData,
): ShuttleJobV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleJobV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  const type: ShuttleJobV2026R0TypeField =
    deserializeShuttleJobV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShuttleJobV2026R0"',
    });
  }
  const name: string = val.name;
  if (!(val.comment == void 0) && !sdIsString(val.comment)) {
    throw new BoxSdkError({
      message: 'Expecting string for "comment" of type "ShuttleJobV2026R0"',
    });
  }
  const comment: undefined | string =
    val.comment == void 0 ? void 0 : val.comment;
  if (val.job_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "job_type" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  const jobType: ShuttleJobV2026R0JobTypeField =
    deserializeShuttleJobV2026R0JobTypeField(val.job_type);
  if (val.state == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "state" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "state" of type "ShuttleJobV2026R0"',
    });
  }
  const state: string = val.state;
  if (val.mapping_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "mapping_state" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.mapping_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "mapping_state" of type "ShuttleJobV2026R0"',
    });
  }
  const mappingState: string = val.mapping_state;
  if (val.source_system == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_system" of type "ShuttleJobV2026R0" to be defined',
    });
  }
  const sourceSystem: ShuttleJobV2026R0SourceSystemField =
    deserializeShuttleJobV2026R0SourceSystemField(val.source_system);
  const accountMapping: undefined | ShuttleJobV2026R0AccountMappingField =
    val.account_mapping == void 0
      ? void 0
      : deserializeShuttleJobV2026R0AccountMappingField(val.account_mapping);
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "tags" of type "ShuttleJobV2026R0"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleJobV2026R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const settings: undefined | ShuttleJobV2026R0SettingsField =
    val.settings == void 0
      ? void 0
      : deserializeShuttleJobV2026R0SettingsField(val.settings);
  return {
    id: id,
    type: type,
    name: name,
    comment: comment,
    jobType: jobType,
    state: state,
    mappingState: mappingState,
    sourceSystem: sourceSystem,
    accountMapping: accountMapping,
    tags: tags,
    settings: settings,
  } satisfies ShuttleJobV2026R0;
}
export function serializeShuttleJobV2026R0Input(
  val: ShuttleJobV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleJobV2026R0TypeField(val.type),
    ['name']: val.name,
    ['comment']: val.comment,
    ['job_type']: serializeShuttleJobV2026R0JobTypeField(val.jobType),
    ['state']: val.state,
    ['mapping_state']: val.mappingState,
    ['source_system']: serializeShuttleJobV2026R0SourceSystemField(
      val.sourceSystem,
    ),
    ['account_mapping']:
      val.accountMapping == void 0
        ? val.accountMapping
        : serializeShuttleJobV2026R0AccountMappingField(val.accountMapping),
    ['tags']:
      val.tags == void 0
        ? val.tags
        : (val.tags.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['settings']:
      val.settings == void 0
        ? val.settings
        : serializeShuttleJobV2026R0SettingsField(val.settings),
  };
}
export function deserializeShuttleJobV2026R0Input(
  val: SerializedData,
): ShuttleJobV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleJobV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleJobV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleJobV2026R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShuttleJobV2026R0Input"',
    });
  }
  const name: string = val.name;
  if (!(val.comment == void 0) && !sdIsString(val.comment)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "comment" of type "ShuttleJobV2026R0Input"',
    });
  }
  const comment: undefined | string =
    val.comment == void 0 ? void 0 : val.comment;
  if (val.job_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_type" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  const jobType: ShuttleJobV2026R0JobTypeField =
    deserializeShuttleJobV2026R0JobTypeField(val.job_type);
  if (val.state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "state" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "state" of type "ShuttleJobV2026R0Input"',
    });
  }
  const state: string = val.state;
  if (val.mapping_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "mapping_state" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.mapping_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "mapping_state" of type "ShuttleJobV2026R0Input"',
    });
  }
  const mappingState: string = val.mapping_state;
  if (val.source_system == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_system" of type "ShuttleJobV2026R0Input" to be defined',
    });
  }
  const sourceSystem: ShuttleJobV2026R0SourceSystemField =
    deserializeShuttleJobV2026R0SourceSystemField(val.source_system);
  const accountMapping: undefined | ShuttleJobV2026R0AccountMappingField =
    val.account_mapping == void 0
      ? void 0
      : deserializeShuttleJobV2026R0AccountMappingField(val.account_mapping);
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "tags" of type "ShuttleJobV2026R0Input"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleJobV2026R0Input"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const settings: undefined | ShuttleJobV2026R0SettingsField =
    val.settings == void 0
      ? void 0
      : deserializeShuttleJobV2026R0SettingsField(val.settings);
  return {
    id: id,
    type: type,
    name: name,
    comment: comment,
    jobType: jobType,
    state: state,
    mappingState: mappingState,
    sourceSystem: sourceSystem,
    accountMapping: accountMapping,
    tags: tags,
    settings: settings,
  } satisfies ShuttleJobV2026R0Input;
}
