import { serializeAiExtractFieldOption } from './aiExtractFieldOption';
import { deserializeAiExtractFieldOption } from './aiExtractFieldOption';
import { AiExtractFieldOption } from './aiExtractFieldOption';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiExtractSubField {
  /**
   * A unique identifier for the nested field. */
  readonly key: string;
  /**
   * A description of the nested field. */
  readonly description?: string;
  /**
   * The display name of the nested field. */
  readonly displayName?: string;
  /**
   * Context about the nested field that may include how to find and how to format it. */
  readonly prompt?: string;
  /**
   * The type of the nested field. Allowed types include `string`, `float`, `date`, `number`, `text`, `boolean`, `enum` and `multiSelect`. */
  readonly type?: string;
  /**
   * A list of options for this nested field. Used with `enum` and `multiSelect` types. */
  readonly options?: readonly AiExtractFieldOption[];
  readonly rawData?: SerializedData;
}
export function serializeAiExtractSubField(
  val: AiExtractSubField,
): SerializedData {
  return {
    ['key']: val.key,
    ['description']: val.description,
    ['displayName']: val.displayName,
    ['prompt']: val.prompt,
    ['type']: val.type,
    ['options']:
      val.options == void 0
        ? val.options
        : (val.options.map(function (
            item: AiExtractFieldOption,
          ): SerializedData {
            return serializeAiExtractFieldOption(item);
          }) as readonly any[]),
  };
}
export function deserializeAiExtractSubField(
  val: SerializedData,
): AiExtractSubField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractSubField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "key" of type "AiExtractSubField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message: 'Expecting string for "key" of type "AiExtractSubField"',
    });
  }
  const key: string = val.key;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "AiExtractSubField"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message: 'Expecting string for "displayName" of type "AiExtractSubField"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.prompt == void 0) && !sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prompt" of type "AiExtractSubField"',
    });
  }
  const prompt: undefined | string = val.prompt == void 0 ? void 0 : val.prompt;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "AiExtractSubField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  if (!(val.options == void 0) && !sdIsList(val.options)) {
    throw new BoxSdkError({
      message: 'Expecting array for "options" of type "AiExtractSubField"',
    });
  }
  const options: undefined | readonly AiExtractFieldOption[] =
    val.options == void 0
      ? void 0
      : sdIsList(val.options)
        ? (val.options.map(function (
            itm: SerializedData,
          ): AiExtractFieldOption {
            return deserializeAiExtractFieldOption(itm);
          }) as readonly any[])
        : [];
  return {
    key: key,
    description: description,
    displayName: displayName,
    prompt: prompt,
    type: type,
    options: options,
  } satisfies AiExtractSubField;
}
