import { serializeFile } from './file.generated.js';
import { deserializeFile } from './file.generated.js';
import { serializeFolder } from './folder.generated.js';
import { deserializeFolder } from './folder.generated.js';
import { serializeWebLink } from './webLink.generated.js';
import { deserializeWebLink } from './webLink.generated.js';
import { serializeGroupMini } from './groupMini.generated.js';
import { deserializeGroupMini } from './groupMini.generated.js';
import { serializeFileOrFolderOrWebLink } from './fileOrFolderOrWebLink.generated.js';
import { deserializeFileOrFolderOrWebLink } from './fileOrFolderOrWebLink.generated.js';
import { serializeAppItem } from './appItem.generated.js';
import { deserializeAppItem } from './appItem.generated.js';
import { serializeGroupMiniOrUserCollaborations } from './groupMiniOrUserCollaborations.generated.js';
import { deserializeGroupMiniOrUserCollaborations } from './groupMiniOrUserCollaborations.generated.js';
import { serializeUserCollaborations } from './userCollaborations.generated.js';
import { deserializeUserCollaborations } from './userCollaborations.generated.js';
import { serializeTermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { deserializeTermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { File } from './file.generated.js';
import { Folder } from './folder.generated.js';
import { WebLink } from './webLink.generated.js';
import { GroupMini } from './groupMini.generated.js';
import { FileOrFolderOrWebLink } from './fileOrFolderOrWebLink.generated.js';
import { AppItem } from './appItem.generated.js';
import { GroupMiniOrUserCollaborations } from './groupMiniOrUserCollaborations.generated.js';
import { UserCollaborations } from './userCollaborations.generated.js';
import { TermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CollaborationTypeField = 'collaboration';
export type CollaborationRoleField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | 'owner'
  | string;
export type CollaborationStatusField =
  | 'accepted'
  | 'pending'
  | 'rejected'
  | string;
export interface CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField {
  /**
   * Whether or not the terms of service have been accepted.  The
   * field is `null` when there is no terms of service required. */
  readonly isAccepted?: boolean | null;
  readonly termsOfService?: TermsOfServiceBase;
  readonly rawData?: SerializedData;
}
export interface CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField {
  /**
   * Whether or not the enterprise that owns the content requires
   * a strong password to collaborate on the content, or enforces
   * an exposed password detection for the external collaborators. */
  readonly enterpriseHasStrongPasswordRequiredForExternalUsers?: boolean;
  /**
   * Whether or not the user has a strong and not exposed password set
   * for their account. The field is `null` when a strong password is
   * not required. */
  readonly userHasStrongPassword?: boolean | null;
  readonly rawData?: SerializedData;
}
export interface CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField {
  /**
   * Whether or not the enterprise that owns the content requires
   * two-factor authentication to be enabled in order to
   * collaborate on the content. */
  readonly enterpriseHasTwoFactorAuthEnabled?: boolean;
  /**
   * Whether or not the user has two-factor authentication
   * enabled. The field is `null` when two-factor
   * authentication is not required. */
  readonly userHasTwoFactorAuthenticationEnabled?: boolean | null;
  readonly rawData?: SerializedData;
}
export interface CollaborationAcceptanceRequirementsStatusField {
  readonly termsOfServiceRequirement?: CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField;
  readonly strongPasswordRequirement?: CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField;
  readonly twoFactorAuthenticationRequirement?: CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField;
  readonly rawData?: SerializedData;
}
export class Collaboration {
  /**
   * The unique identifier for this collaboration. */
  readonly id!: string;
  /**
   * The value will always be `collaboration`. */
  readonly type: CollaborationTypeField =
    'collaboration' as CollaborationTypeField;
  readonly item?: FileOrFolderOrWebLink | null;
  readonly appItem?: AppItem | null;
  readonly accessibleBy?: GroupMiniOrUserCollaborations;
  /**
   * The email address used to invite an unregistered collaborator, if
   * they are not a registered user. */
  readonly inviteEmail?: string | null;
  /**
   * The level of access granted. */
  readonly role?: CollaborationRoleField;
  /**
   * When the collaboration will expire, or `null` if no expiration
   * date is set. */
  readonly expiresAt?: DateTime | null;
  /**
   * If set to `true`, collaborators have access to
   * shared items, but such items won't be visible in the
   * All Files list. Additionally, collaborators won't
   * see the the path to the root folder for the
   * shared item. */
  readonly isAccessOnly?: boolean;
  /**
   * The status of the collaboration invitation. If the status
   * is `pending`, `login` and `name` return an empty string. */
  readonly status?: CollaborationStatusField;
  /**
   * When the `status` of the collaboration object changed to
   * `accepted` or `rejected`. */
  readonly acknowledgedAt?: DateTime;
  readonly createdBy?: UserCollaborations;
  /**
   * When the collaboration object was created. */
  readonly createdAt?: DateTime;
  /**
   * When the collaboration object was last modified. */
  readonly modifiedAt?: DateTime;
  readonly acceptanceRequirementsStatus?: CollaborationAcceptanceRequirementsStatusField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<Collaboration, 'type'> & Partial<Pick<Collaboration, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.item !== undefined) {
      this.item = fields.item;
    }
    if (fields.appItem !== undefined) {
      this.appItem = fields.appItem;
    }
    if (fields.accessibleBy !== undefined) {
      this.accessibleBy = fields.accessibleBy;
    }
    if (fields.inviteEmail !== undefined) {
      this.inviteEmail = fields.inviteEmail;
    }
    if (fields.role !== undefined) {
      this.role = fields.role;
    }
    if (fields.expiresAt !== undefined) {
      this.expiresAt = fields.expiresAt;
    }
    if (fields.isAccessOnly !== undefined) {
      this.isAccessOnly = fields.isAccessOnly;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.acknowledgedAt !== undefined) {
      this.acknowledgedAt = fields.acknowledgedAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.acceptanceRequirementsStatus !== undefined) {
      this.acceptanceRequirementsStatus = fields.acceptanceRequirementsStatus;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CollaborationInput {
  /**
   * The unique identifier for this collaboration. */
  readonly id: string;
  /**
   * The value will always be `collaboration`. */
  readonly type?: CollaborationTypeField;
  readonly item?: FileOrFolderOrWebLink | null;
  readonly appItem?: AppItem | null;
  readonly accessibleBy?: GroupMiniOrUserCollaborations;
  /**
   * The email address used to invite an unregistered collaborator, if
   * they are not a registered user. */
  readonly inviteEmail?: string | null;
  /**
   * The level of access granted. */
  readonly role?: CollaborationRoleField;
  /**
   * When the collaboration will expire, or `null` if no expiration
   * date is set. */
  readonly expiresAt?: DateTime | null;
  /**
   * If set to `true`, collaborators have access to
   * shared items, but such items won't be visible in the
   * All Files list. Additionally, collaborators won't
   * see the the path to the root folder for the
   * shared item. */
  readonly isAccessOnly?: boolean;
  /**
   * The status of the collaboration invitation. If the status
   * is `pending`, `login` and `name` return an empty string. */
  readonly status?: CollaborationStatusField;
  /**
   * When the `status` of the collaboration object changed to
   * `accepted` or `rejected`. */
  readonly acknowledgedAt?: DateTime;
  readonly createdBy?: UserCollaborations;
  /**
   * When the collaboration object was created. */
  readonly createdAt?: DateTime;
  /**
   * When the collaboration object was last modified. */
  readonly modifiedAt?: DateTime;
  readonly acceptanceRequirementsStatus?: CollaborationAcceptanceRequirementsStatusField;
  readonly rawData?: SerializedData;
}
export function serializeCollaborationTypeField(
  val: CollaborationTypeField,
): SerializedData {
  return val;
}
export function deserializeCollaborationTypeField(
  val: SerializedData,
): CollaborationTypeField {
  if (val == 'collaboration') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationTypeField",
  });
}
export function serializeCollaborationRoleField(
  val: CollaborationRoleField,
): SerializedData {
  return val;
}
export function deserializeCollaborationRoleField(
  val: SerializedData,
): CollaborationRoleField {
  if (val == 'editor') {
    return val;
  }
  if (val == 'viewer') {
    return val;
  }
  if (val == 'previewer') {
    return val;
  }
  if (val == 'uploader') {
    return val;
  }
  if (val == 'previewer uploader') {
    return val;
  }
  if (val == 'viewer uploader') {
    return val;
  }
  if (val == 'co-owner') {
    return val;
  }
  if (val == 'owner') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationRoleField",
  });
}
export function serializeCollaborationStatusField(
  val: CollaborationStatusField,
): SerializedData {
  return val;
}
export function deserializeCollaborationStatusField(
  val: SerializedData,
): CollaborationStatusField {
  if (val == 'accepted') {
    return val;
  }
  if (val == 'pending') {
    return val;
  }
  if (val == 'rejected') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationStatusField",
  });
}
export function serializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(
  val: CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField,
): SerializedData {
  return {
    ['is_accepted']: val.isAccepted,
    ['terms_of_service']:
      val.termsOfService == void 0
        ? val.termsOfService
        : serializeTermsOfServiceBase(val.termsOfService),
  };
}
export function deserializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(
  val: SerializedData,
): CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField"',
    });
  }
  if (!(val.is_accepted == void 0) && !sdIsBoolean(val.is_accepted)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accepted" of type "CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField"',
    });
  }
  const isAccepted: undefined | boolean =
    val.is_accepted == void 0 ? void 0 : val.is_accepted;
  const termsOfService: undefined | TermsOfServiceBase =
    val.terms_of_service == void 0
      ? void 0
      : deserializeTermsOfServiceBase(val.terms_of_service);
  return {
    isAccepted: isAccepted,
    termsOfService: termsOfService,
  } satisfies CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField;
}
export function serializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(
  val: CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField,
): SerializedData {
  return {
    ['enterprise_has_strong_password_required_for_external_users']:
      val.enterpriseHasStrongPasswordRequiredForExternalUsers,
    ['user_has_strong_password']: val.userHasStrongPassword,
  };
}
export function deserializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(
  val: SerializedData,
): CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField"',
    });
  }
  if (
    !(
      val.enterprise_has_strong_password_required_for_external_users == void 0
    ) &&
    !sdIsBoolean(val.enterprise_has_strong_password_required_for_external_users)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "enterprise_has_strong_password_required_for_external_users" of type "CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField"',
    });
  }
  const enterpriseHasStrongPasswordRequiredForExternalUsers:
    | undefined
    | boolean =
    val.enterprise_has_strong_password_required_for_external_users == void 0
      ? void 0
      : val.enterprise_has_strong_password_required_for_external_users;
  if (
    !(val.user_has_strong_password == void 0) &&
    !sdIsBoolean(val.user_has_strong_password)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "user_has_strong_password" of type "CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField"',
    });
  }
  const userHasStrongPassword: undefined | boolean =
    val.user_has_strong_password == void 0
      ? void 0
      : val.user_has_strong_password;
  return {
    enterpriseHasStrongPasswordRequiredForExternalUsers:
      enterpriseHasStrongPasswordRequiredForExternalUsers,
    userHasStrongPassword: userHasStrongPassword,
  } satisfies CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField;
}
export function serializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
  val: CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField,
): SerializedData {
  return {
    ['enterprise_has_two_factor_auth_enabled']:
      val.enterpriseHasTwoFactorAuthEnabled,
    ['user_has_two_factor_authentication_enabled']:
      val.userHasTwoFactorAuthenticationEnabled,
  };
}
export function deserializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
  val: SerializedData,
): CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
    });
  }
  if (
    !(val.enterprise_has_two_factor_auth_enabled == void 0) &&
    !sdIsBoolean(val.enterprise_has_two_factor_auth_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "enterprise_has_two_factor_auth_enabled" of type "CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
    });
  }
  const enterpriseHasTwoFactorAuthEnabled: undefined | boolean =
    val.enterprise_has_two_factor_auth_enabled == void 0
      ? void 0
      : val.enterprise_has_two_factor_auth_enabled;
  if (
    !(val.user_has_two_factor_authentication_enabled == void 0) &&
    !sdIsBoolean(val.user_has_two_factor_authentication_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "user_has_two_factor_authentication_enabled" of type "CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
    });
  }
  const userHasTwoFactorAuthenticationEnabled: undefined | boolean =
    val.user_has_two_factor_authentication_enabled == void 0
      ? void 0
      : val.user_has_two_factor_authentication_enabled;
  return {
    enterpriseHasTwoFactorAuthEnabled: enterpriseHasTwoFactorAuthEnabled,
    userHasTwoFactorAuthenticationEnabled:
      userHasTwoFactorAuthenticationEnabled,
  } satisfies CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField;
}
export function serializeCollaborationAcceptanceRequirementsStatusField(
  val: CollaborationAcceptanceRequirementsStatusField,
): SerializedData {
  return {
    ['terms_of_service_requirement']:
      val.termsOfServiceRequirement == void 0
        ? val.termsOfServiceRequirement
        : serializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(
            val.termsOfServiceRequirement,
          ),
    ['strong_password_requirement']:
      val.strongPasswordRequirement == void 0
        ? val.strongPasswordRequirement
        : serializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(
            val.strongPasswordRequirement,
          ),
    ['two_factor_authentication_requirement']:
      val.twoFactorAuthenticationRequirement == void 0
        ? val.twoFactorAuthenticationRequirement
        : serializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
            val.twoFactorAuthenticationRequirement,
          ),
  };
}
export function deserializeCollaborationAcceptanceRequirementsStatusField(
  val: SerializedData,
): CollaborationAcceptanceRequirementsStatusField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CollaborationAcceptanceRequirementsStatusField"',
    });
  }
  const termsOfServiceRequirement:
    | undefined
    | CollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField =
    val.terms_of_service_requirement == void 0
      ? void 0
      : deserializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(
          val.terms_of_service_requirement,
        );
  const strongPasswordRequirement:
    | undefined
    | CollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField =
    val.strong_password_requirement == void 0
      ? void 0
      : deserializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(
          val.strong_password_requirement,
        );
  const twoFactorAuthenticationRequirement:
    | undefined
    | CollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField =
    val.two_factor_authentication_requirement == void 0
      ? void 0
      : deserializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
          val.two_factor_authentication_requirement,
        );
  return {
    termsOfServiceRequirement: termsOfServiceRequirement,
    strongPasswordRequirement: strongPasswordRequirement,
    twoFactorAuthenticationRequirement: twoFactorAuthenticationRequirement,
  } satisfies CollaborationAcceptanceRequirementsStatusField;
}
export function serializeCollaboration(val: Collaboration): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeCollaborationTypeField(val.type),
    ['item']:
      val.item == void 0 ? val.item : serializeFileOrFolderOrWebLink(val.item),
    ['app_item']:
      val.appItem == void 0 ? val.appItem : serializeAppItem(val.appItem),
    ['accessible_by']:
      val.accessibleBy == void 0
        ? val.accessibleBy
        : serializeGroupMiniOrUserCollaborations(val.accessibleBy),
    ['invite_email']: val.inviteEmail,
    ['role']:
      val.role == void 0 ? val.role : serializeCollaborationRoleField(val.role),
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['is_access_only']: val.isAccessOnly,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeCollaborationStatusField(val.status),
    ['acknowledged_at']:
      val.acknowledgedAt == void 0
        ? val.acknowledgedAt
        : serializeDateTime(val.acknowledgedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserCollaborations(val.createdBy),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['acceptance_requirements_status']:
      val.acceptanceRequirementsStatus == void 0
        ? val.acceptanceRequirementsStatus
        : serializeCollaborationAcceptanceRequirementsStatusField(
            val.acceptanceRequirementsStatus,
          ),
  };
}
export function deserializeCollaboration(val: SerializedData): Collaboration {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Collaboration"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "Collaboration" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Collaboration"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "Collaboration" to be defined',
    });
  }
  const type: CollaborationTypeField = deserializeCollaborationTypeField(
    val.type,
  );
  const item: undefined | FileOrFolderOrWebLink =
    val.item == void 0 ? void 0 : deserializeFileOrFolderOrWebLink(val.item);
  const appItem: undefined | AppItem =
    val.app_item == void 0 ? void 0 : deserializeAppItem(val.app_item);
  const accessibleBy: undefined | GroupMiniOrUserCollaborations =
    val.accessible_by == void 0
      ? void 0
      : deserializeGroupMiniOrUserCollaborations(val.accessible_by);
  if (!(val.invite_email == void 0) && !sdIsString(val.invite_email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "invite_email" of type "Collaboration"',
    });
  }
  const inviteEmail: undefined | string =
    val.invite_email == void 0 ? void 0 : val.invite_email;
  const role: undefined | CollaborationRoleField =
    val.role == void 0 ? void 0 : deserializeCollaborationRoleField(val.role);
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "Collaboration"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (!(val.is_access_only == void 0) && !sdIsBoolean(val.is_access_only)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_access_only" of type "Collaboration"',
    });
  }
  const isAccessOnly: undefined | boolean =
    val.is_access_only == void 0 ? void 0 : val.is_access_only;
  const status: undefined | CollaborationStatusField =
    val.status == void 0
      ? void 0
      : deserializeCollaborationStatusField(val.status);
  if (!(val.acknowledged_at == void 0) && !sdIsString(val.acknowledged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "acknowledged_at" of type "Collaboration"',
    });
  }
  const acknowledgedAt: undefined | DateTime =
    val.acknowledged_at == void 0
      ? void 0
      : deserializeDateTime(val.acknowledged_at);
  const createdBy: undefined | UserCollaborations =
    val.created_by == void 0
      ? void 0
      : deserializeUserCollaborations(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Collaboration"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "Collaboration"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  const acceptanceRequirementsStatus:
    | undefined
    | CollaborationAcceptanceRequirementsStatusField =
    val.acceptance_requirements_status == void 0
      ? void 0
      : deserializeCollaborationAcceptanceRequirementsStatusField(
          val.acceptance_requirements_status,
        );
  return {
    id: id,
    type: type,
    item: item,
    appItem: appItem,
    accessibleBy: accessibleBy,
    inviteEmail: inviteEmail,
    role: role,
    expiresAt: expiresAt,
    isAccessOnly: isAccessOnly,
    status: status,
    acknowledgedAt: acknowledgedAt,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    acceptanceRequirementsStatus: acceptanceRequirementsStatus,
  } satisfies Collaboration;
}
export function serializeCollaborationInput(
  val: CollaborationInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeCollaborationTypeField(val.type),
    ['item']:
      val.item == void 0 ? val.item : serializeFileOrFolderOrWebLink(val.item),
    ['app_item']:
      val.appItem == void 0 ? val.appItem : serializeAppItem(val.appItem),
    ['accessible_by']:
      val.accessibleBy == void 0
        ? val.accessibleBy
        : serializeGroupMiniOrUserCollaborations(val.accessibleBy),
    ['invite_email']: val.inviteEmail,
    ['role']:
      val.role == void 0 ? val.role : serializeCollaborationRoleField(val.role),
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['is_access_only']: val.isAccessOnly,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeCollaborationStatusField(val.status),
    ['acknowledged_at']:
      val.acknowledgedAt == void 0
        ? val.acknowledgedAt
        : serializeDateTime(val.acknowledgedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserCollaborations(val.createdBy),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['acceptance_requirements_status']:
      val.acceptanceRequirementsStatus == void 0
        ? val.acceptanceRequirementsStatus
        : serializeCollaborationAcceptanceRequirementsStatusField(
            val.acceptanceRequirementsStatus,
          ),
  };
}
export function deserializeCollaborationInput(
  val: SerializedData,
): CollaborationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "CollaborationInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "CollaborationInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | CollaborationTypeField =
    val.type == void 0 ? void 0 : deserializeCollaborationTypeField(val.type);
  const item: undefined | FileOrFolderOrWebLink =
    val.item == void 0 ? void 0 : deserializeFileOrFolderOrWebLink(val.item);
  const appItem: undefined | AppItem =
    val.app_item == void 0 ? void 0 : deserializeAppItem(val.app_item);
  const accessibleBy: undefined | GroupMiniOrUserCollaborations =
    val.accessible_by == void 0
      ? void 0
      : deserializeGroupMiniOrUserCollaborations(val.accessible_by);
  if (!(val.invite_email == void 0) && !sdIsString(val.invite_email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "invite_email" of type "CollaborationInput"',
    });
  }
  const inviteEmail: undefined | string =
    val.invite_email == void 0 ? void 0 : val.invite_email;
  const role: undefined | CollaborationRoleField =
    val.role == void 0 ? void 0 : deserializeCollaborationRoleField(val.role);
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "CollaborationInput"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (!(val.is_access_only == void 0) && !sdIsBoolean(val.is_access_only)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_access_only" of type "CollaborationInput"',
    });
  }
  const isAccessOnly: undefined | boolean =
    val.is_access_only == void 0 ? void 0 : val.is_access_only;
  const status: undefined | CollaborationStatusField =
    val.status == void 0
      ? void 0
      : deserializeCollaborationStatusField(val.status);
  if (!(val.acknowledged_at == void 0) && !sdIsString(val.acknowledged_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "acknowledged_at" of type "CollaborationInput"',
    });
  }
  const acknowledgedAt: undefined | DateTime =
    val.acknowledged_at == void 0
      ? void 0
      : deserializeDateTime(val.acknowledged_at);
  const createdBy: undefined | UserCollaborations =
    val.created_by == void 0
      ? void 0
      : deserializeUserCollaborations(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "CollaborationInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "CollaborationInput"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  const acceptanceRequirementsStatus:
    | undefined
    | CollaborationAcceptanceRequirementsStatusField =
    val.acceptance_requirements_status == void 0
      ? void 0
      : deserializeCollaborationAcceptanceRequirementsStatusField(
          val.acceptance_requirements_status,
        );
  return {
    id: id,
    type: type,
    item: item,
    appItem: appItem,
    accessibleBy: accessibleBy,
    inviteEmail: inviteEmail,
    role: role,
    expiresAt: expiresAt,
    isAccessOnly: isAccessOnly,
    status: status,
    acknowledgedAt: acknowledgedAt,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    acceptanceRequirementsStatus: acceptanceRequirementsStatus,
  } satisfies CollaborationInput;
}
