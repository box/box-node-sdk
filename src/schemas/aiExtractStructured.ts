import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { serializeAiTaxonomyReference } from './aiTaxonomyReference';
import { deserializeAiTaxonomyReference } from './aiTaxonomyReference';
import { serializeAiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { deserializeAiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { serializeAiItemBase } from './aiItemBase';
import { deserializeAiItemBase } from './aiItemBase';
import { serializeAiExtractSubField } from './aiExtractSubField';
import { deserializeAiExtractSubField } from './aiExtractSubField';
import { serializeAiOptionsRules } from './aiOptionsRules';
import { deserializeAiOptionsRules } from './aiOptionsRules';
import { serializeAiExtractStructuredAgent } from './aiExtractStructuredAgent';
import { deserializeAiExtractStructuredAgent } from './aiExtractStructuredAgent';
import { serializeAiTaxonomySource } from './aiTaxonomySource';
import { deserializeAiTaxonomySource } from './aiTaxonomySource';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentExtractStructured } from './aiAgentExtractStructured';
import { AiTaxonomyReference } from './aiTaxonomyReference';
import { AiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { AiItemBase } from './aiItemBase';
import { AiExtractSubField } from './aiExtractSubField';
import { AiOptionsRules } from './aiOptionsRules';
import { AiExtractStructuredAgent } from './aiExtractStructuredAgent';
import { AiTaxonomySource } from './aiTaxonomySource';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
   * A unique identifier for the option. */
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
   * The type of the field. It can include but is not limited to `string`, `float`, `date`, `enum`, `multiSelect`,`taxonomy`, `struct`, and `table`. */
  readonly type?: string;
  /**
   * A list of options for this field. This is most often used in combination with the `enum` and `multiSelect` field types. */
  readonly options?: readonly AiExtractStructuredFieldsOptionsField[];
  /**
   * The nested fields for this field. Used with `struct` and `table` field types to define the nested structure. */
  readonly fields?: readonly AiExtractSubField[];
  /**
   * The identifier for a taxonomy, which corresponds to the `key` of the taxonomy source. Required if using `taxonomy` type field. */
  readonly taxonomyKey?: string;
  /**
   * The namespace of the taxonomy source. Required if using `taxonomy` type field from an existing taxonomy. */
  readonly namespace?: string;
  readonly optionsRules?: AiOptionsRules;
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
  readonly aiAgent?: AiExtractStructuredAgent;
  /**
   * A flag to indicate whether confidence scores for every extracted field should be returned. */
  readonly includeConfidenceScore?: boolean;
  /**
   * A flag to indicate whether references for every extracted field should be returned. */
  readonly includeReference?: boolean;
  /**
   * The taxonomy sources to be used for the structured extraction. They can either be an existing file or a taxonomy.
   * For your request to work, `fields` must also be provided. `taxonomy_sources` is not supported with `metadata_template`. */
  readonly taxonomySources?: readonly AiTaxonomySource[];
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
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (item: AiExtractSubField): SerializedData {
            return serializeAiExtractSubField(item);
          }) as readonly any[]),
    ['taxonomy_key']: val.taxonomyKey,
    ['namespace']: val.namespace,
    ['options_rules']:
      val.optionsRules == void 0
        ? val.optionsRules
        : serializeAiOptionsRules(val.optionsRules),
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
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fields" of type "AiExtractStructuredFieldsField"',
    });
  }
  const fields: undefined | readonly AiExtractSubField[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (itm: SerializedData): AiExtractSubField {
            return deserializeAiExtractSubField(itm);
          }) as readonly any[])
        : [];
  if (!(val.taxonomy_key == void 0) && !sdIsString(val.taxonomy_key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "taxonomy_key" of type "AiExtractStructuredFieldsField"',
    });
  }
  const taxonomyKey: undefined | string =
    val.taxonomy_key == void 0 ? void 0 : val.taxonomy_key;
  if (!(val.namespace == void 0) && !sdIsString(val.namespace)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "namespace" of type "AiExtractStructuredFieldsField"',
    });
  }
  const namespace: undefined | string =
    val.namespace == void 0 ? void 0 : val.namespace;
  const optionsRules: undefined | AiOptionsRules =
    val.options_rules == void 0
      ? void 0
      : deserializeAiOptionsRules(val.options_rules);
  return {
    key: key,
    description: description,
    displayName: displayName,
    prompt: prompt,
    type: type,
    options: options,
    fields: fields,
    taxonomyKey: taxonomyKey,
    namespace: namespace,
    optionsRules: optionsRules,
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
        : serializeAiExtractStructuredAgent(val.aiAgent),
    ['include_confidence_score']: val.includeConfidenceScore,
    ['include_reference']: val.includeReference,
    ['taxonomy_sources']:
      val.taxonomySources == void 0
        ? val.taxonomySources
        : (val.taxonomySources.map(function (
            item: AiTaxonomySource,
          ): SerializedData {
            return serializeAiTaxonomySource(item);
          }) as readonly any[]),
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
  const aiAgent: undefined | AiExtractStructuredAgent =
    val.ai_agent == void 0
      ? void 0
      : deserializeAiExtractStructuredAgent(val.ai_agent);
  if (
    !(val.include_confidence_score == void 0) &&
    !sdIsBoolean(val.include_confidence_score)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "include_confidence_score" of type "AiExtractStructured"',
    });
  }
  const includeConfidenceScore: undefined | boolean =
    val.include_confidence_score == void 0
      ? void 0
      : val.include_confidence_score;
  if (
    !(val.include_reference == void 0) &&
    !sdIsBoolean(val.include_reference)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "include_reference" of type "AiExtractStructured"',
    });
  }
  const includeReference: undefined | boolean =
    val.include_reference == void 0 ? void 0 : val.include_reference;
  if (!(val.taxonomy_sources == void 0) && !sdIsList(val.taxonomy_sources)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "taxonomy_sources" of type "AiExtractStructured"',
    });
  }
  const taxonomySources: undefined | readonly AiTaxonomySource[] =
    val.taxonomy_sources == void 0
      ? void 0
      : sdIsList(val.taxonomy_sources)
        ? (val.taxonomy_sources.map(function (
            itm: SerializedData,
          ): AiTaxonomySource {
            return deserializeAiTaxonomySource(itm);
          }) as readonly any[])
        : [];
  return {
    items: items,
    metadataTemplate: metadataTemplate,
    fields: fields,
    aiAgent: aiAgent,
    includeConfidenceScore: includeConfidenceScore,
    includeReference: includeReference,
    taxonomySources: taxonomySources,
  } satisfies AiExtractStructured;
}
