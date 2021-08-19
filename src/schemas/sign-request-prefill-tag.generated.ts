import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Sign Request Prefill Tag
 * 
 * Prefill tags are used to prefill placeholders with signer input data. Only
 * one value field can be included.
 */
export interface SignRequestPrefillTag {
    /**
     * This references the ID of a specific tag contained in a file of the sign request.
     * Example: 1234
     */
    documentTagId?: string;
    /**
     * Text prefill value
     * Example: text
     */
    textValue?: string;
    /**
     * Checkbox prefill value
     * Example: true
     */
    checkboxValue?: boolean;
    /**
     * Date prefill value
     * Example: 2021-04-26T08:12:13.982Z
     */
    dateValue?: string;
}
export const SignRequestPrefillTag = new Serializable({
    serialize(value: SignRequestPrefillTag) {
        return {
            document_tag_id: value.documentTagId,
            text_value: value.textValue,
            checkbox_value: value.checkboxValue,
            date_value: value.dateValue
        };
    },
    deserialize(data: any): SignRequestPrefillTag {
        return {
            documentTagId: data.document_tag_id,
            textValue: data.text_value,
            checkboxValue: data.checkbox_value,
            dateValue: data.date_value
        };
    }
});
