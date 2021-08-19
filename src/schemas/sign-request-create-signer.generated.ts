import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Signer fields for Create Sign Request
 * 
 * The schema for a Signer in a POST Sign Request request body
 */
export interface SignRequestCreateSigner {
    /**
     * Email address of the signer
     * Example: example@gmail.com
     */
    email: string;
    /**
     * Defines the role of the signer in the sign request. A `signer`
     * must sign the document and an `approver` must approve the document. A
     * `final_copy_reader` only receives the final signed document and signing
     * log.
     * Example: signer
     * @default signer
     */
    role?: string;
    /**
     * Used in combination with an embed URL for a sender. After the
     * sender signs, they will be redirected to the next `in_person` signer.
     * Example: true
     */
    isInPerson?: boolean;
    /**
     * Order of the signer
     * Example: 2
     */
    order?: number;
    /**
     * User ID for the signer in an external application responsible
     * for authentication when accessing the embed URL.
     * Example: 1234
     */
    embedUrlExternalUserId?: string;
}
export const SignRequestCreateSigner = new Serializable({
    serialize(value: SignRequestCreateSigner) {
        return {
            email: value.email,
            role: value.role,
            is_in_person: value.isInPerson,
            order: value.order,
            embed_url_external_user_id: value.embedUrlExternalUserId
        };
    },
    deserialize(data: any): SignRequestCreateSigner {
        return {
            email: data.email,
            role: data.role,
            isInPerson: data.is_in_person,
            order: data.order,
            embedUrlExternalUserId: data.embed_url_external_user_id
        };
    }
});
