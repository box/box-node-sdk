import { CollaborationRole, CollaborationStatus } from "./collaboration";

export interface CollaborationUpdate {
	can_view_path?: boolean,
	expires_at?: string,
	role: CollaborationRole;
	status?: CollaborationStatus;
}
