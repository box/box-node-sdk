import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { serializeAiAgentReference } from './aiAgentReference.generated.js';
import { deserializeAiAgentReference } from './aiAgentReference.generated.js';
import { serializeAiItemBase } from './aiItemBase.generated.js';
import { deserializeAiItemBase } from './aiItemBase.generated.js';
import { serializeAiAgentExtractStructuredOrAiAgentReference } from './aiAgentExtractStructuredOrAiAgentReference.generated.js';
import { deserializeAiAgentExtractStructuredOrAiAgentReference } from './aiAgentExtractStructuredOrAiAgentReference.generated.js';
import { AiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { AiAgentReference } from './aiAgentReference.generated.js';
import { AiItemBase } from './aiItemBase.generated.js';
import { AiAgentExtractStructuredOrAiAgentReference } from './aiAgentExtractStructuredOrAiAgentReference.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiExtractStructuredMetadataTemplateTypeField = 'metadata_template';
export interface AiExtractStructuredMetadataTemplateField {
  /**
   * The name of the metadata template. */
  readonly templateKey?: string;
  /**
   * Value is always `metadata_template`. */
  readonly type?: AiExtractStructuredMetadataTemplateTypeField;
  /**
   * The scope of the metadata template that can either be global or
   * enterprise.
   * * The **global** scope is used for templates that are
   * available to any Box enterprise.
   * * The **enterprise** scope represents templates created within a specific enterprise,
   *   containing the ID of that enterprise. */
  readonly scope?: string;
  readonly rawData?: SerializedData;
}
export interface AiExtractStructuredFieldsOptionsField {
  /**
   * A unique identifier for the field. */
  readonly key: string;
  readonly rawData?: SerializedData;
}
export interface AiExtractStructuredFieldsField {
  /**
   * A unique identifier for the field. */
  readonly key: string;
  /**
   * A description of the field. */
  readonly description?: string;
  /**
   * The display name of the field. */
  readonly displayName?: string;
  /**
   * The context about the key that may include how to find and format it. */
  readonly prompt?: string;
  /**
   * The type of the field. It include but is not limited to string, float, date, enum, and multiSelect. */
  readonly type?: string;
  /**
   * A list of options for this field. This is most often used in combination with the enum and multiSelect field types. */
  readonly options?: readonly AiExtractStructuredFieldsOptionsField[];
  readonly rawData?: SerializedData;
}
export interface AiExtractStructured {
  /**
   * The items to be processed by the LLM. Currently you can use files only. */
  readonly items: readonly AiItemBase[];
  /**
   * The metadata template containing the fields to extract.
   * For your request to work, you must provide either `metadata_template` or `fields`, but not both. */
  readonly metadataTemplate?: AiExtractStructuredMetadataTemplateField;
  /**
   * The fields to be extracted from the provided items.
   * For your request to work, you must provide either `metadata_template` or `fields`, but not both. */
  readonly fields?: readonly AiExtractStructuredFieldsField[];
  readonly aiAgent?: AiAgentExtractStructuredOrAiAgentReference;
  readonly rawData?: SerializedData;
}
export function serializeAiExtractStructuredMetadataTemplateTypeField(
  val: AiExtractStructuredMetadataTemplateTypeField,
): SerializedData {
  return val;
}
export function deserializeAiExtractStructuredMetadataTemplateTypeField(
  val: SerializedData,
): AiExtractStructuredMetadataTemplateTypeField {
  if (val == 'metadata_template') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiExtractStructuredMetadataTemplateTypeField",
  });
}
export function serializeAiExtractStructuredMetadataTemplateField(
  val: AiExtractStructuredMetadataTemplateField,
): SerializedData {
  return {
    ['template_key']: val.templateKey,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiExtractStructuredMetadataTemplateTypeField(val.type),
    ['scope']: val.scope,
  };
}
export function deserializeAiExtractStructuredMetadataTemplateField(
  val: SerializedData,
): AiExtractStructuredMetadataTemplateField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructuredMetadataTemplateField"',
    });
  }
  if (!(val.template_key == void 0) && !sdIsString(val.template_key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "template_key" of type "AiExtractStructuredMetadataTemplateField"',
    });
  }
  const templateKey: undefined | string =
    val.template_key == void 0 ? void 0 : val.template_key;
  const type: undefined | AiExtractStructuredMetadataTemplateTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiExtractStructuredMetadataTemplateTypeField(val.type);
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scope" of type "AiExtractStructuredMetadataTemplateField"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  return {
    templateKey: templateKey,
    type: type,
    scope: scope,
  } satisfies AiExtractStructuredMetadataTemplateField;
}
export function serializeAiExtractStructuredFieldsOptionsField(
  val: AiExtractStructuredFieldsOptionsField,
): SerializedData {
  return { ['key']: val.key };
}
export function deserializeAiExtractStructuredFieldsOptionsField(
  val: SerializedData,
): AiExtractStructuredFieldsOptionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructuredFieldsOptionsField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "AiExtractStructuredFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "AiExtractStructuredFieldsOptionsField"',
    });
  }
  const key: string = val.key;
  return { key: key } satisfies AiExtractStructuredFieldsOptionsField;
}
export function serializeAiExtractStructuredFieldsField(
  val: AiExtractStructuredFieldsField,
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
            item: AiExtractStructuredFieldsOptionsField,
          ): SerializedData {
            return serializeAiExtractStructuredFieldsOptionsField(item);
          }) as readonly any[]),
  };
}
export function deserializeAiExtractStructuredFieldsField(
  val: SerializedData,
): AiExtractStructuredFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructuredFieldsField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "AiExtractStructuredFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "AiExtractStructuredFieldsField"',
    });
  }
  const key: string = val.key;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiExtractStructuredFieldsField"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "AiExtractStructuredFieldsField"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.prompt == void 0) && !sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt" of type "AiExtractStructuredFieldsField"',
    });
  }
  const prompt: undefined | string = val.prompt == void 0 ? void 0 : val.prompt;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "AiExtractStructuredFieldsField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  if (!(val.options == void 0) && !sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "AiExtractStructuredFieldsField"',
    });
  }
  const options: undefined | readonly AiExtractStructuredFieldsOptionsField[] =
    val.options == void 0
      ? void 0
      : sdIsList(val.options)
        ? (val.options.map(function (
            itm: SerializedData,
          ): AiExtractStructuredFieldsOptionsField {
            return deserializeAiExtractStructuredFieldsOptionsField(itm);
          }) as readonly any[])
        : [];
  return {
    key: key,
    description: description,
    displayName: displayName,
    prompt: prompt,
    type: type,
    options: options,
  } satisfies AiExtractStructuredFieldsField;
}
export function serializeAiExtractStructured(
  val: AiExtractStructured,
): SerializedData {
  return {
    ['items']: val.items.map(function (item: AiItemBase): SerializedData {
      return serializeAiItemBase(item);
    }) as readonly any[],
    ['metadata_template']:
      val.metadataTemplate == void 0
        ? val.metadataTemplate
        : serializeAiExtractStructuredMetadataTemplateField(
            val.metadataTemplate,
          ),
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (
            item: AiExtractStructuredFieldsField,
          ): SerializedData {
            return serializeAiExtractStructuredFieldsField(item);
          }) as readonly any[]),
    ['ai_agent']:
      val.aiAgent == void 0
        ? val.aiAgent
        : serializeAiAgentExtractStructuredOrAiAgentReference(val.aiAgent),
  };
}
export function deserializeAiExtractStructured(
  val: SerializedData,
): AiExtractStructured {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructured"',
    });
  }
  if (val.items == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "items" of type "AiExtractStructured" to be defined',
    });
  }
  if (!sdIsList(val.items)) {
    throw new BoxSdkError({
      message: 'Expecting array for "items" of type "AiExtractStructured"',
    });
  }
  const items: readonly AiItemBase[] = sdIsList(val.items)
    ? (val.items.map(function (itm: SerializedData): AiItemBase {
        return deserializeAiItemBase(itm);
      }) as readonly any[])
    : [];
  const metadataTemplate: undefined | AiExtractStructuredMetadataTemplateField =
    val.metadata_template == void 0
      ? void 0
      : deserializeAiExtractStructuredMetadataTemplateField(
          val.metadata_template,
        );
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "AiExtractStructured"',
    });
  }
  const fields: undefined | readonly AiExtractStructuredFieldsField[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (
            itm: SerializedData,
          ): AiExtractStructuredFieldsField {
            return deserializeAiExtractStructuredFieldsField(itm);
          }) as readonly any[])
        : [];
  const aiAgent: undefined | AiAgentExtractStructuredOrAiAgentReference =
    val.ai_agent == void 0
      ? void 0
      : deserializeAiAgentExtractStructuredOrAiAgentReference(val.ai_agent);
  return {
    items: items,
    metadataTemplate: metadataTemplate,
    fields: fields,
    aiAgent: aiAgent,
  } satisfies AiExtractStructured;
}
