import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiCitationTypeField = 'file';
export interface AiCitation {
  /**
   * The specific content from where the answer was referenced. */
  readonly content?: string;
  /**
   * The id of the item. */
  readonly id?: string;
  /**
   * The type of the item. */
  readonly type?: AiCitationTypeField;
  /**
   * The name of the item. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiCitationTypeField(
  val: AiCitationTypeField,
): SerializedData {
  return val;
}
export function deserializeAiCitationTypeField(
  val: SerializedData,
): AiCitationTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize AiCitationTypeField" });
}
export function serializeAiCitation(val: AiCitation): SerializedData {
  return {
    ['content']: val.content,
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeAiCitationTypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeAiCitation(val: SerializedData): AiCitation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiCitation"' });
  }
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "content" of type "AiCitation"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiCitation"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | AiCitationTypeField =
    val.type == void 0 ? void 0 : deserializeAiCitationTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "AiCitation"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    content: content,
    id: id,
    type: type,
    name: name,
  } satisfies AiCitation;
}
