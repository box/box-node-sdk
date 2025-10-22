import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface SharedLinkPermissionsV2025R0 {
  /**
   * The selected option for shared links permissions. */
  readonly sharedLinksOption?: string | null;
  /**
   * The default shared link type. */
  readonly defaultSharedLinkType?: string | null;
  /**
   * The selected option for notes shared links permissions. */
  readonly notesSharedLinkOption?: string | null;
  /**
   * The default notes shared link type. */
  readonly defaultNotesSharedLinkType?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkPermissionsV2025R0(
  val: SharedLinkPermissionsV2025R0,
): SerializedData {
  return {
    ['shared_links_option']: val.sharedLinksOption,
    ['default_shared_link_type']: val.defaultSharedLinkType,
    ['notes_shared_link_option']: val.notesSharedLinkOption,
    ['default_notes_shared_link_type']: val.defaultNotesSharedLinkType,
  };
}
export function deserializeSharedLinkPermissionsV2025R0(
  val: SerializedData,
): SharedLinkPermissionsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkPermissionsV2025R0"',
    });
  }
  if (
    !(val.shared_links_option == void 0) &&
    !sdIsString(val.shared_links_option)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "shared_links_option" of type "SharedLinkPermissionsV2025R0"',
    });
  }
  const sharedLinksOption: undefined | string =
    val.shared_links_option == void 0 ? void 0 : val.shared_links_option;
  if (
    !(val.default_shared_link_type == void 0) &&
    !sdIsString(val.default_shared_link_type)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "default_shared_link_type" of type "SharedLinkPermissionsV2025R0"',
    });
  }
  const defaultSharedLinkType: undefined | string =
    val.default_shared_link_type == void 0
      ? void 0
      : val.default_shared_link_type;
  if (
    !(val.notes_shared_link_option == void 0) &&
    !sdIsString(val.notes_shared_link_option)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "notes_shared_link_option" of type "SharedLinkPermissionsV2025R0"',
    });
  }
  const notesSharedLinkOption: undefined | string =
    val.notes_shared_link_option == void 0
      ? void 0
      : val.notes_shared_link_option;
  if (
    !(val.default_notes_shared_link_type == void 0) &&
    !sdIsString(val.default_notes_shared_link_type)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "default_notes_shared_link_type" of type "SharedLinkPermissionsV2025R0"',
    });
  }
  const defaultNotesSharedLinkType: undefined | string =
    val.default_notes_shared_link_type == void 0
      ? void 0
      : val.default_notes_shared_link_type;
  return {
    sharedLinksOption: sharedLinksOption,
    defaultSharedLinkType: defaultSharedLinkType,
    notesSharedLinkOption: notesSharedLinkOption,
    defaultNotesSharedLinkType: defaultNotesSharedLinkType,
  } satisfies SharedLinkPermissionsV2025R0;
}
