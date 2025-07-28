import { serializeHubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0.generated.js';
import { deserializeHubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0.generated.js';
import { serializeGroupMiniV2025R0 } from './groupMiniV2025R0.generated.js';
import { deserializeGroupMiniV2025R0 } from './groupMiniV2025R0.generated.js';
import { serializeHubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { deserializeHubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { serializeHubAccessGranteeV2025R0 } from './hubAccessGranteeV2025R0.generated.js';
import { deserializeHubAccessGranteeV2025R0 } from './hubAccessGranteeV2025R0.generated.js';
import { serializeTermsOfServiceBaseV2025R0 } from './termsOfServiceBaseV2025R0.generated.js';
import { deserializeTermsOfServiceBaseV2025R0 } from './termsOfServiceBaseV2025R0.generated.js';
import { HubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0.generated.js';
import { GroupMiniV2025R0 } from './groupMiniV2025R0.generated.js';
import { HubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { HubAccessGranteeV2025R0 } from './hubAccessGranteeV2025R0.generated.js';
import { TermsOfServiceBaseV2025R0 } from './termsOfServiceBaseV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type HubCollaborationV2025R0TypeField = 'hub_collaboration';
export type HubCollaborationV2025R0StatusField =
  | 'accepted'
  | 'pending'
  | 'rejected'
  | string;
export interface HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField {
  /**
   * Whether or not the terms of service have been accepted.  The
   * field is `null` when there is no terms of service required. */
  readonly isAccepted?: boolean | null;
  readonly termsOfService?: TermsOfServiceBaseV2025R0;
  readonly rawData?: SerializedData;
}
export interface HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField {
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
export interface HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField {
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
export interface HubCollaborationV2025R0AcceptanceRequirementsStatusField {
  readonly termsOfServiceRequirement?: HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField;
  readonly strongPasswordRequirement?: HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField;
  readonly twoFactorAuthenticationRequirement?: HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField;
  readonly rawData?: SerializedData;
}
export class HubCollaborationV2025R0 {
  /**
   * The unique identifier for this collaboration. */
  readonly id!: string;
  /**
   * The value will always be `hub_collaboration`. */
  readonly type: HubCollaborationV2025R0TypeField =
    'hub_collaboration' as HubCollaborationV2025R0TypeField;
  readonly hub?: HubBaseV2025R0;
  readonly accessibleBy?: HubAccessGranteeV2025R0;
  /**
   * The level of access granted to hub.
   * Possible values are `editor`, `viewer`, and `co-owner`. */
  readonly role?: string;
  /**
   * The status of the collaboration invitation. If the status
   * is `pending`, `login` and `name` return an empty string. */
  readonly status?: HubCollaborationV2025R0StatusField;
  readonly acceptanceRequirementsStatus?: HubCollaborationV2025R0AcceptanceRequirementsStatusField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<HubCollaborationV2025R0, 'type'> &
      Partial<Pick<HubCollaborationV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.hub !== undefined) {
      this.hub = fields.hub;
    }
    if (fields.accessibleBy !== undefined) {
      this.accessibleBy = fields.accessibleBy;
    }
    if (fields.role !== undefined) {
      this.role = fields.role;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.acceptanceRequirementsStatus !== undefined) {
      this.acceptanceRequirementsStatus = fields.acceptanceRequirementsStatus;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface HubCollaborationV2025R0Input {
  /**
   * The unique identifier for this collaboration. */
  readonly id: string;
  /**
   * The value will always be `hub_collaboration`. */
  readonly type?: HubCollaborationV2025R0TypeField;
  readonly hub?: HubBaseV2025R0;
  readonly accessibleBy?: HubAccessGranteeV2025R0;
  /**
   * The level of access granted to hub.
   * Possible values are `editor`, `viewer`, and `co-owner`. */
  readonly role?: string;
  /**
   * The status of the collaboration invitation. If the status
   * is `pending`, `login` and `name` return an empty string. */
  readonly status?: HubCollaborationV2025R0StatusField;
  readonly acceptanceRequirementsStatus?: HubCollaborationV2025R0AcceptanceRequirementsStatusField;
  readonly rawData?: SerializedData;
}
export function serializeHubCollaborationV2025R0TypeField(
  val: HubCollaborationV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubCollaborationV2025R0TypeField(
  val: SerializedData,
): HubCollaborationV2025R0TypeField {
  if (val == 'hub_collaboration') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubCollaborationV2025R0TypeField",
  });
}
export function serializeHubCollaborationV2025R0StatusField(
  val: HubCollaborationV2025R0StatusField,
): SerializedData {
  return val;
}
export function deserializeHubCollaborationV2025R0StatusField(
  val: SerializedData,
): HubCollaborationV2025R0StatusField {
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
    message: "Can't deserialize HubCollaborationV2025R0StatusField",
  });
}
export function serializeHubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField(
  val: HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField,
): SerializedData {
  return {
    ['is_accepted']: val.isAccepted,
    ['terms_of_service']:
      val.termsOfService == void 0
        ? val.termsOfService
        : serializeTermsOfServiceBaseV2025R0(val.termsOfService),
  };
}
export function deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField(
  val: SerializedData,
): HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField"',
    });
  }
  if (!(val.is_accepted == void 0) && !sdIsBoolean(val.is_accepted)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accepted" of type "HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField"',
    });
  }
  const isAccepted: undefined | boolean =
    val.is_accepted == void 0 ? void 0 : val.is_accepted;
  const termsOfService: undefined | TermsOfServiceBaseV2025R0 =
    val.terms_of_service == void 0
      ? void 0
      : deserializeTermsOfServiceBaseV2025R0(val.terms_of_service);
  return {
    isAccepted: isAccepted,
    termsOfService: termsOfService,
  } satisfies HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField;
}
export function serializeHubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField(
  val: HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField,
): SerializedData {
  return {
    ['enterprise_has_strong_password_required_for_external_users']:
      val.enterpriseHasStrongPasswordRequiredForExternalUsers,
    ['user_has_strong_password']: val.userHasStrongPassword,
  };
}
export function deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField(
  val: SerializedData,
): HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField"',
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
        'Expecting boolean for "enterprise_has_strong_password_required_for_external_users" of type "HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField"',
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
        'Expecting boolean for "user_has_strong_password" of type "HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField"',
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
  } satisfies HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField;
}
export function serializeHubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
  val: HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField,
): SerializedData {
  return {
    ['enterprise_has_two_factor_auth_enabled']:
      val.enterpriseHasTwoFactorAuthEnabled,
    ['user_has_two_factor_authentication_enabled']:
      val.userHasTwoFactorAuthenticationEnabled,
  };
}
export function deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
  val: SerializedData,
): HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
    });
  }
  if (
    !(val.enterprise_has_two_factor_auth_enabled == void 0) &&
    !sdIsBoolean(val.enterprise_has_two_factor_auth_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "enterprise_has_two_factor_auth_enabled" of type "HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
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
        'Expecting boolean for "user_has_two_factor_authentication_enabled" of type "HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField"',
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
  } satisfies HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField;
}
export function serializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
  val: HubCollaborationV2025R0AcceptanceRequirementsStatusField,
): SerializedData {
  return {
    ['terms_of_service_requirement']:
      val.termsOfServiceRequirement == void 0
        ? val.termsOfServiceRequirement
        : serializeHubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField(
            val.termsOfServiceRequirement,
          ),
    ['strong_password_requirement']:
      val.strongPasswordRequirement == void 0
        ? val.strongPasswordRequirement
        : serializeHubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField(
            val.strongPasswordRequirement,
          ),
    ['two_factor_authentication_requirement']:
      val.twoFactorAuthenticationRequirement == void 0
        ? val.twoFactorAuthenticationRequirement
        : serializeHubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
            val.twoFactorAuthenticationRequirement,
          ),
  };
}
export function deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
  val: SerializedData,
): HubCollaborationV2025R0AcceptanceRequirementsStatusField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationV2025R0AcceptanceRequirementsStatusField"',
    });
  }
  const termsOfServiceRequirement:
    | undefined
    | HubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField =
    val.terms_of_service_requirement == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusTermsOfServiceRequirementField(
          val.terms_of_service_requirement,
        );
  const strongPasswordRequirement:
    | undefined
    | HubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField =
    val.strong_password_requirement == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusStrongPasswordRequirementField(
          val.strong_password_requirement,
        );
  const twoFactorAuthenticationRequirement:
    | undefined
    | HubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField =
    val.two_factor_authentication_requirement == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(
          val.two_factor_authentication_requirement,
        );
  return {
    termsOfServiceRequirement: termsOfServiceRequirement,
    strongPasswordRequirement: strongPasswordRequirement,
    twoFactorAuthenticationRequirement: twoFactorAuthenticationRequirement,
  } satisfies HubCollaborationV2025R0AcceptanceRequirementsStatusField;
}
export function serializeHubCollaborationV2025R0(
  val: HubCollaborationV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeHubCollaborationV2025R0TypeField(val.type),
    ['hub']: val.hub == void 0 ? val.hub : serializeHubBaseV2025R0(val.hub),
    ['accessible_by']:
      val.accessibleBy == void 0
        ? val.accessibleBy
        : serializeHubAccessGranteeV2025R0(val.accessibleBy),
    ['role']: val.role,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeHubCollaborationV2025R0StatusField(val.status),
    ['acceptance_requirements_status']:
      val.acceptanceRequirementsStatus == void 0
        ? val.acceptanceRequirementsStatus
        : serializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
            val.acceptanceRequirementsStatus,
          ),
  };
}
export function deserializeHubCollaborationV2025R0(
  val: SerializedData,
): HubCollaborationV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCollaborationV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubCollaborationV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubCollaborationV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubCollaborationV2025R0" to be defined',
    });
  }
  const type: HubCollaborationV2025R0TypeField =
    deserializeHubCollaborationV2025R0TypeField(val.type);
  const hub: undefined | HubBaseV2025R0 =
    val.hub == void 0 ? void 0 : deserializeHubBaseV2025R0(val.hub);
  const accessibleBy: undefined | HubAccessGranteeV2025R0 =
    val.accessible_by == void 0
      ? void 0
      : deserializeHubAccessGranteeV2025R0(val.accessible_by);
  if (!(val.role == void 0) && !sdIsString(val.role)) {
    throw new BoxSdkError({
      message: 'Expecting string for "role" of type "HubCollaborationV2025R0"',
    });
  }
  const role: undefined | string = val.role == void 0 ? void 0 : val.role;
  const status: undefined | HubCollaborationV2025R0StatusField =
    val.status == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0StatusField(val.status);
  const acceptanceRequirementsStatus:
    | undefined
    | HubCollaborationV2025R0AcceptanceRequirementsStatusField =
    val.acceptance_requirements_status == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
          val.acceptance_requirements_status,
        );
  return {
    id: id,
    type: type,
    hub: hub,
    accessibleBy: accessibleBy,
    role: role,
    status: status,
    acceptanceRequirementsStatus: acceptanceRequirementsStatus,
  } satisfies HubCollaborationV2025R0;
}
export function serializeHubCollaborationV2025R0Input(
  val: HubCollaborationV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeHubCollaborationV2025R0TypeField(val.type),
    ['hub']: val.hub == void 0 ? val.hub : serializeHubBaseV2025R0(val.hub),
    ['accessible_by']:
      val.accessibleBy == void 0
        ? val.accessibleBy
        : serializeHubAccessGranteeV2025R0(val.accessibleBy),
    ['role']: val.role,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeHubCollaborationV2025R0StatusField(val.status),
    ['acceptance_requirements_status']:
      val.acceptanceRequirementsStatus == void 0
        ? val.acceptanceRequirementsStatus
        : serializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
            val.acceptanceRequirementsStatus,
          ),
  };
}
export function deserializeHubCollaborationV2025R0Input(
  val: SerializedData,
): HubCollaborationV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCollaborationV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "HubCollaborationV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "HubCollaborationV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | HubCollaborationV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0TypeField(val.type);
  const hub: undefined | HubBaseV2025R0 =
    val.hub == void 0 ? void 0 : deserializeHubBaseV2025R0(val.hub);
  const accessibleBy: undefined | HubAccessGranteeV2025R0 =
    val.accessible_by == void 0
      ? void 0
      : deserializeHubAccessGranteeV2025R0(val.accessible_by);
  if (!(val.role == void 0) && !sdIsString(val.role)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "role" of type "HubCollaborationV2025R0Input"',
    });
  }
  const role: undefined | string = val.role == void 0 ? void 0 : val.role;
  const status: undefined | HubCollaborationV2025R0StatusField =
    val.status == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0StatusField(val.status);
  const acceptanceRequirementsStatus:
    | undefined
    | HubCollaborationV2025R0AcceptanceRequirementsStatusField =
    val.acceptance_requirements_status == void 0
      ? void 0
      : deserializeHubCollaborationV2025R0AcceptanceRequirementsStatusField(
          val.acceptance_requirements_status,
        );
  return {
    id: id,
    type: type,
    hub: hub,
    accessibleBy: accessibleBy,
    role: role,
    status: status,
    acceptanceRequirementsStatus: acceptanceRequirementsStatus,
  } satisfies HubCollaborationV2025R0Input;
}
