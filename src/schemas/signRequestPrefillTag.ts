import { serializeDate } from '../internal/utils.js';
import { deserializeDate } from '../internal/utils.js';
import { BoxSdkError } from '../box/errors.js';
import { Date } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface SignRequestPrefillTag {
  /**
   * This references the ID of a specific tag contained in a file of the signature request. */
  readonly documentTagId?: string | null;
  /**
   * Text prefill value. */
  readonly textValue?: string | null;
  /**
   * Checkbox prefill value. */
  readonly checkboxValue?: boolean | null;
  /**
   * Date prefill value. */
  readonly dateValue?: Date | null;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestPrefillTag(
  val: SignRequestPrefillTag,
): SerializedData {
  return {
    ['document_tag_id']: val.documentTagId,
    ['text_value']: val.textValue,
    ['checkbox_value']: val.checkboxValue,
    ['date_value']:
      val.dateValue == void 0 ? val.dateValue : serializeDate(val.dateValue),
  };
}
export function deserializeSignRequestPrefillTag(
  val: SerializedData,
): SignRequestPrefillTag {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestPrefillTag"',
    });
  }
  if (!(val.document_tag_id == void 0) && !sdIsString(val.document_tag_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "document_tag_id" of type "SignRequestPrefillTag"',
    });
  }
  const documentTagId: undefined | string =
    val.document_tag_id == void 0 ? void 0 : val.document_tag_id;
  if (!(val.text_value == void 0) && !sdIsString(val.text_value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text_value" of type "SignRequestPrefillTag"',
    });
  }
  const textValue: undefined | string =
    val.text_value == void 0 ? void 0 : val.text_value;
  if (!(val.checkbox_value == void 0) && !sdIsBoolean(val.checkbox_value)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "checkbox_value" of type "SignRequestPrefillTag"',
    });
  }
  const checkboxValue: undefined | boolean =
    val.checkbox_value == void 0 ? void 0 : val.checkbox_value;
  if (!(val.date_value == void 0) && !sdIsString(val.date_value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "date_value" of type "SignRequestPrefillTag"',
    });
  }
  const dateValue: undefined | Date =
    val.date_value == void 0 ? void 0 : deserializeDate(val.date_value);
  return {
    documentTagId: documentTagId,
    textValue: textValue,
    checkboxValue: checkboxValue,
    dateValue: dateValue,
  } satisfies SignRequestPrefillTag;
}
