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
export type ShuttleJobCreateRequestV2026R0JobTypeField =
  | 'transfer'
  | 'analysis'
  | string;
export interface ShuttleJobCreateRequestV2026R0AccountMappingField {
  /**
   * Whether account mapping is enabled for the shuttle job. Defaults to
   * `false` when `account_mapping` is omitted on create. */
  readonly isEnabled?: boolean;
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
export interface ShuttleJobCreateRequestV2026R0SettingsField {
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
export interface ShuttleJobCreateRequestV2026R0 {
  /**
   * The human-readable name of the shuttle job. */
  readonly name: string;
  /**
   * The type of work the shuttle job performs. */
  readonly jobType: ShuttleJobCreateRequestV2026R0JobTypeField;
  /**
   * The unique identifier of the source system to migrate from. */
  readonly sourceSystemId: string;
  /**
   * An optional free-form comment describing the shuttle job. */
  readonly comment?: string;
  /**
   * A list of free-form tags associated with the shuttle job. */
  readonly tags?: readonly string[];
  /**
   * The account mapping configuration that controls how source identities
   * and permissions are translated into Box. When this object is omitted,
   * the job is created with `is_enabled` set to `false`. */
  readonly accountMapping?: ShuttleJobCreateRequestV2026R0AccountMappingField;
  /**
   * The tunable settings that control how the shuttle job runs. */
  readonly settings?: ShuttleJobCreateRequestV2026R0SettingsField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobCreateRequestV2026R0JobTypeField(
  val: ShuttleJobCreateRequestV2026R0JobTypeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobCreateRequestV2026R0JobTypeField(
  val: SerializedData
): ShuttleJobCreateRequestV2026R0JobTypeField {
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
    message: "Can't deserialize ShuttleJobCreateRequestV2026R0JobTypeField",
  });
}
export function serializeShuttleJobCreateRequestV2026R0AccountMappingField(
  val: ShuttleJobCreateRequestV2026R0AccountMappingField
): SerializedData {
  return {
    ['is_enabled']: val.isEnabled,
    ['permission_conflict_strategy']:
      val.permissionConflictStrategy == void 0
        ? val.permissionConflictStrategy
        : serializeShuttleJobPermissionConflictStrategyV2026R0(
            val.permissionConflictStrategy
          ),
    ['are_external_shares_mapped']: val.areExternalSharesMapped,
    ['are_permissions_mapped']: val.arePermissionsMapped,
  };
}
export function deserializeShuttleJobCreateRequestV2026R0AccountMappingField(
  val: SerializedData
): ShuttleJobCreateRequestV2026R0AccountMappingField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleJobCreateRequestV2026R0AccountMappingField"',
    });
  }
  if (!(val.is_enabled == void 0) && !sdIsBoolean(val.is_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_enabled" of type "ShuttleJobCreateRequestV2026R0AccountMappingField"',
    });
  }
  const isEnabled: undefined | boolean =
    val.is_enabled == void 0 ? void 0 : val.is_enabled;
  const permissionConflictStrategy:
    | ShuttleJobPermissionConflictStrategyV2026R0
    | undefined =
    val.permission_conflict_strategy == void 0
      ? void 0
      : deserializeShuttleJobPermissionConflictStrategyV2026R0(
          val.permission_conflict_strategy
        );
  if (
    !(val.are_external_shares_mapped == void 0) &&
    !sdIsBoolean(val.are_external_shares_mapped)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_external_shares_mapped" of type "ShuttleJobCreateRequestV2026R0AccountMappingField"',
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
        'Expecting boolean for "are_permissions_mapped" of type "ShuttleJobCreateRequestV2026R0AccountMappingField"',
    });
  }
  const arePermissionsMapped: undefined | boolean =
    val.are_permissions_mapped == void 0 ? void 0 : val.are_permissions_mapped;
  return {
    isEnabled: isEnabled,
    permissionConflictStrategy: permissionConflictStrategy,
    areExternalSharesMapped: areExternalSharesMapped,
    arePermissionsMapped: arePermissionsMapped,
  } satisfies ShuttleJobCreateRequestV2026R0AccountMappingField;
}
export function serializeShuttleJobCreateRequestV2026R0SettingsField(
  val: ShuttleJobCreateRequestV2026R0SettingsField
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
export function deserializeShuttleJobCreateRequestV2026R0SettingsField(
  val: SerializedData
): ShuttleJobCreateRequestV2026R0SettingsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleJobCreateRequestV2026R0SettingsField"',
    });
  }
  if (
    !(val.bandwidth_limit_bytes_per_sec == void 0) &&
    !sdIsNumber(val.bandwidth_limit_bytes_per_sec)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "bandwidth_limit_bytes_per_sec" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "are_deletions_mirrored" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "are_file_versions_synced" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting number for "max_file_versions" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "is_overwrite_enabled" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "are_completed_mappings_skipped_on_rerun" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "is_content_scanning_enabled" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "include_shared_source_folders" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
        'Expecting boolean for "include_shared_destination_folders" of type "ShuttleJobCreateRequestV2026R0SettingsField"',
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
  } satisfies ShuttleJobCreateRequestV2026R0SettingsField;
}
export function serializeShuttleJobCreateRequestV2026R0(
  val: ShuttleJobCreateRequestV2026R0
): SerializedData {
  return {
    ['name']: val.name,
    ['job_type']: serializeShuttleJobCreateRequestV2026R0JobTypeField(
      val.jobType
    ),
    ['source_system_id']: val.sourceSystemId,
    ['comment']: val.comment,
    ['tags']:
      val.tags == void 0
        ? val.tags
        : (val.tags.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['account_mapping']:
      val.accountMapping == void 0
        ? val.accountMapping
        : serializeShuttleJobCreateRequestV2026R0AccountMappingField(
            val.accountMapping
          ),
    ['settings']:
      val.settings == void 0
        ? val.settings
        : serializeShuttleJobCreateRequestV2026R0SettingsField(val.settings),
  };
}
export function deserializeShuttleJobCreateRequestV2026R0(
  val: SerializedData
): ShuttleJobCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobCreateRequestV2026R0"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShuttleJobCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleJobCreateRequestV2026R0"',
    });
  }
  const name: string = val.name;
  if (val.job_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_type" of type "ShuttleJobCreateRequestV2026R0" to be defined',
    });
  }
  const jobType: ShuttleJobCreateRequestV2026R0JobTypeField =
    deserializeShuttleJobCreateRequestV2026R0JobTypeField(val.job_type);
  if (val.source_system_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_system_id" of type "ShuttleJobCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.source_system_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "source_system_id" of type "ShuttleJobCreateRequestV2026R0"',
    });
  }
  const sourceSystemId: string = val.source_system_id;
  if (!(val.comment == void 0) && !sdIsString(val.comment)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "comment" of type "ShuttleJobCreateRequestV2026R0"',
    });
  }
  const comment: undefined | string =
    val.comment == void 0 ? void 0 : val.comment;
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "tags" of type "ShuttleJobCreateRequestV2026R0"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "ShuttleJobCreateRequestV2026R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const accountMapping:
    | undefined
    | ShuttleJobCreateRequestV2026R0AccountMappingField =
    val.account_mapping == void 0
      ? void 0
      : deserializeShuttleJobCreateRequestV2026R0AccountMappingField(
          val.account_mapping
        );
  const settings: undefined | ShuttleJobCreateRequestV2026R0SettingsField =
    val.settings == void 0
      ? void 0
      : deserializeShuttleJobCreateRequestV2026R0SettingsField(val.settings);
  return {
    name: name,
    jobType: jobType,
    sourceSystemId: sourceSystemId,
    comment: comment,
    tags: tags,
    accountMapping: accountMapping,
    settings: settings,
  } satisfies ShuttleJobCreateRequestV2026R0;
}
