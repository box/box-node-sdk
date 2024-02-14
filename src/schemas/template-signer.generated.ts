import * as schemas from '.';
/**
 * Signer fields for Templates
 *
 * The schema for a Signer for Templates
 */
export interface TemplateSigner {
	inputs?: schemas.TemplateSignerInput[];
	/**
	 * Email address of the signer
	 * Example: example@mail.com
	 */
	email?: string;
	/**
	 * Defines the role of the signer in the signature request. A role of
	 * `signer` needs to sign the document, a role `approver`
	 * approves the document and
	 * a `final_copy_reader` role only
	 * receives the final signed document and signing log.
	 * Example: signer
	 * @default signer
	 */
	role?: 'signer' | 'approver' | 'final_copy_reader';
	/**
	 * Used in combination with an embed URL for a sender.
	 * After the sender signs, they will be
	 * redirected to the next `in_person` signer.
	 * Example: true
	 */
	is_in_person?: boolean;
	/**
	 * Order of the signer
	 * Example: 2
	 */
	order?: number;
	/**
	 * If set, signers who have the same group ID will be assigned to the same input.
	 * A signer group is expected to have more than one signer. When a group contains fewer than two signers,
	 * it will be converted to a single signer and the group will be removed.
	 * Example: cd4ff89-8fc1-42cf-8b29-1890dedd26d7
	 */
	signer_group_id?: string;
}
