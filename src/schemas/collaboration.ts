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
	enterprise_has_strong_password_required_for_external_users?: boolean
	user_has_strong_password?: boolean | null
}

type TermsOfServiceRequirement = {
	is_accepted: boolean | null,
	terms_of_service: {
		id: string,
		type: string
	} | null
}

type TwoFactorAuthenticationRequirement = {
	enterprise_has_two_factor_auth_enabled: boolean,
	user_has_two_factor_authentication_enabled: boolean | null
}

type AcceptanceRequirementsStatus  = {
	strong_password_requirement?: StrongPasswordRequirement,
	terms_of_service_requirement?: TermsOfServiceRequirement
	two_factor_authentication_requirement?: TwoFactorAuthenticationRequirement
}

export interface Collaboration {
	id: string;
	type: 'collaboration';
	acceptance_requirements_status?: AcceptanceRequirementsStatus;
	accessible_by?: UserMini;
	acknowledged_at?: string;
	created_at?: string;
	created_by?: UserMini;
	expires_at?: string;
	invite_email?: string;
	item?: any;
	modified_at?: string;
	role?: CollaborationRole;
	status?: CollaborationStatus;
	is_access_only?: boolean;
	[key: string]: any;
}
