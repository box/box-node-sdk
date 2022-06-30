import {FolderMini} from "./folder-mini.generated";
import {UserMini} from "./user-mini";

export interface FileRequest {
	id: string;
	type: 'file_request';
	title: 'Submit files';
	description: string;
	etag: string;
	is_email_required: boolean;
	is_description_required: boolean;
	expires_at: string;
	url: string;
	created_at: string;
	created_by: UserMini;
	updated_at: string;
	updated_by: UserMini;
	status: 'active' | 'inactive';
	folder: FolderMini;
}
