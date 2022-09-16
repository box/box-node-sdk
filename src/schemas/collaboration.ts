import { UserMini } from "./user-mini";

export type CollaborationRole =
	"editor"
	| "viewer"
	| "previewer"
	| "uploader"
	| "previewer uploader"
	| "viewer uploader"
	| "co-owner"
	| "owner"

export type CollaborationStatus = "accepted" | "pending" | "rejected"

type StrongPasswordRequirement = {
	/**
	 * Whether the enterprise that owns the content requires a strong password to collaborate on the content.
	 */
	enterprise_has_strong_password_required_for_external_users?: boolean
	/**
	 * Whether or not the user has a strong password set for their account. The field is null when a strong password is not required.
	 */
	user_has_strong_password?: boolean | null
}

type TermsOfServiceRequirement = {
	/**
	 * Whether or not the terms of service have been accepted. The field is null when there is no terms of service required.
	 */
	is_accepted: boolean | null,
	/**
	 * The terms of service that must be accepted before the collaboration can be accepted. The field is null when there is no terms of service required.
	 */
	terms_of_service: {
		/**
		 * The unique identifier for this terms of service.
		 */
		id: string,
		type: 'terms_of_service'
	} | null
}

type TwoFactorAuthenticationRequirement = {
	/**
	 * Whether or not the enterprise that owns the content requires two-factor authentication to be enabled in order to collaborate on the content.
	 */
	enterprise_has_two_factor_auth_enabled: boolean,
	/**
	 * Whether or not the user has two-factor authentication enabled. The field is null when two-factor authentication is not required.
	 */
	user_has_two_factor_authentication_enabled: boolean | null
}

type AcceptanceRequirementsStatus  = {
	strong_password_requirement?: StrongPasswordRequirement,
	terms_of_service_requirement?: TermsOfServiceRequirement
	two_factor_authentication_requirement?: TwoFactorAuthenticationRequirement
}

export interface Collaboration {
	/**
	 * The unique identifier for this collaboration.
	 */
	id: string;
	/**
	 * Value is always collaboration
	 */
	type: 'collaboration';
	/**
	 * Describes acceptance criteria for password, terms of service and two-factor authentication
	 */
	acceptance_requirements_status?: AcceptanceRequirementsStatus;
	/**
	 * The user or group that is granted access
	 */
	accessible_by?: UserMini;
	/**
	 * When the status of the collaboration object changed to accepted or rejected
	 */
	acknowledged_at?: string;
	/**
	 * When the collaboration object was created
	 */
	created_at?: string;
	/**
	 * The user who created the collaboration object
	 */
	created_by?: UserMini;
	/**
	 * When the collaboration will expire, or null if no expiration date is set.
	 */
	expires_at?: string;
	/**
	 * The email address used to invite an unregistered collaborator, if they are not a registered user.
	 */
	invite_email?: string;
	/**
	 * The file or folder to which access is granted. The field is null when the collaboration status is pending.
	 */
	item?: any;
	/**
	 * When the collaboration object was last modified
	 */
	modified_at?: string;
	/**
	 * The level of access granted.
	 */
	role?: CollaborationRole;
	/**
	 * The status of the collaboration invitation.
	 */
	status?: CollaborationStatus;
	/**
	 * WARN: Feature not yet available.
	 * Indicates separate access from interest by hiding collaborated items from the "All Files" page.
	 * This feature is going to be released in Q4. Watch our [announcements](https://developer.box.com/changelog/)
	 * to learn about its availability.
	 */
	is_access_only?: boolean;
	[key: string]: any;
}
