import {FolderMini} from "./folder-mini.generated";
import {UserMini} from "./user-mini";

type FileRequestStatus = 'active' | 'inactive';

export interface FileRequest {
	id: string;
	type: 'file_request';
	title: string;
	description: string;
	etag: string;
	is_email_required: boolean;
	is_description_required: boolean;
	expires_at?: string;
	url: string;
	created_at: string;
	created_by: UserMini;
	updated_at?: string;
	updated_by?: UserMini;
	status: FileRequestStatus;
	folder: FolderMini;
}

export interface FileRequestCopyRequest {
	folder: {
		id: string;
		type: 'folder';
	};
	title?: string;
	description?: string;
	expires_at?: string;
	is_description_required?: boolean;
	is_email_required?: boolean;
	status?: FileRequestStatus;
}
