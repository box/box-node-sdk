import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataTemplateTypeField = 'metadata_template';
export type MetadataTemplateFieldsTypeField =
  | 'string'
  | 'float'
  | 'date'
  | 'enum'
  | 'multiSelect'
  | 'integer';
export interface MetadataTemplateFieldsOptionsField {
  /**
   * The text value of the option. This represents both the display name of the
   * option and the internal key used when updating templates. */
  readonly key: string;
  /**
   * The internal unique identifier of the the option. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface MetadataTemplateFieldsField {
  /**
   * The type of field. The basic fields are a `string` field for text, a
   * `float` field for numbers, and a `date` fields to present the user with a
   * date-time picker.
   *
   * Additionally, metadata templates support an `enum` field for a basic list
   * of items, and ` multiSelect` field for a similar list of items where the
   * user can select more than one value.
   *
   * **Note**: The `integer` value is deprecated.
   * It is still present in the response,
   * but cannot be used in the POST request. */
  readonly type: MetadataTemplateFieldsTypeField;
  /**
   * A unique identifier for the field. The identifier must
   * be unique within the template to which it belongs. */
  readonly key: string;
  /**
   * The display name of the field as it is shown to the user in the web and
   * mobile apps. */
  readonly displayName: string;
  /**
   * A description of the field. This is not shown to the user. */
  readonly description?: string;
  /**
   * Whether this field is hidden in the UI for the user and can only be set
   * through the API instead. */
  readonly hidden?: boolean;
  /**
   * A list of options for this field. This is used in combination
   * with the `enum` and `multiSelect` field types. */
  readonly options?: readonly MetadataTemplateFieldsOptionsField[];
  /**
   * The unique ID of the metadata template field. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export class MetadataTemplate {
  /**
   * The ID of the metadata template. */
  readonly id!: string;
  /**
   * `metadata_template` */
  readonly type: MetadataTemplateTypeField =
    'metadata_template' as MetadataTemplateTypeField;
  /**
   * The scope of the metadata template can either be `global` or
   * `enterprise_*`. The `global` scope is used for templates that are
   * available to any Box enterprise. The `enterprise_*` scope represents
   * templates that have been created within a specific enterprise, where `*`
   * will be the ID of that enterprise. */
  readonly scope?: string;
  /**
   * A unique identifier for the template. This identifier is unique across
   * the `scope` of the enterprise to which the metadata template is being
   * applied, yet is not necessarily unique across different enterprises. */
  readonly templateKey?: string;
  /**
   * The display name of the template. This can be seen in the Box web app
   * and mobile apps. */
  readonly displayName?: string;
  /**
   * Defines if this template is visible in the Box web app UI, or if
   * it is purely intended for usage through the API. */
  readonly hidden?: boolean;
  /**
   * An ordered list of template fields which are part of the template. Each
   * field can be a regular text field, date field, number field, as well as a
   * single or multi-select list. */
  readonly fields?: readonly MetadataTemplateFieldsField[];
  /**
   * Whether or not to include the metadata when a file or folder is copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<MetadataTemplate, 'type'> &
      Partial<Pick<MetadataTemplate, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.scope !== undefined) {
      this.scope = fields.scope;
    }
    if (fields.templateKey !== undefined) {
      this.templateKey = fields.templateKey;
    }
    if (fields.displayName !== undefined) {
      this.displayName = fields.displayName;
    }
    if (fields.hidden !== undefined) {
      this.hidden = fields.hidden;
    }
    if (fields.fields !== undefined) {
      this.fields = fields.fields;
    }
    if (fields.copyInstanceOnItemCopy !== undefined) {
      this.copyInstanceOnItemCopy = fields.copyInstanceOnItemCopy;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface MetadataTemplateInput {
  /**
   * The ID of the metadata template. */
  readonly id: string;
  /**
   * `metadata_template` */
  readonly type?: MetadataTemplateTypeField;
  /**
   * The scope of the metadata template can either be `global` or
   * `enterprise_*`. The `global` scope is used for templates that are
   * available to any Box enterprise. The `enterprise_*` scope represents
   * templates that have been created within a specific enterprise, where `*`
   * will be the ID of that enterprise. */
  readonly scope?: string;
  /**
   * A unique identifier for the template. This identifier is unique across
   * the `scope` of the enterprise to which the metadata template is being
   * applied, yet is not necessarily unique across different enterprises. */
  readonly templateKey?: string;
  /**
   * The display name of the template. This can be seen in the Box web app
   * and mobile apps. */
  readonly displayName?: string;
  /**
   * Defines if this template is visible in the Box web app UI, or if
   * it is purely intended for usage through the API. */
  readonly hidden?: boolean;
  /**
   * An ordered list of template fields which are part of the template. Each
   * field can be a regular text field, date field, number field, as well as a
   * single or multi-select list. */
  readonly fields?: readonly MetadataTemplateFieldsField[];
  /**
   * Whether or not to include the metadata when a file or folder is copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeMetadataTemplateTypeField(
  val: MetadataTemplateTypeField,
): SerializedData {
  return val;
}
export function deserializeMetadataTemplateTypeField(
  val: SerializedData,
): MetadataTemplateTypeField {
  if (val == 'metadata_template') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataTemplateTypeField",
  });
}
export function serializeMetadataTemplateFieldsTypeField(
  val: MetadataTemplateFieldsTypeField,
): SerializedData {
  return val;
}
export function deserializeMetadataTemplateFieldsTypeField(
  val: SerializedData,
): MetadataTemplateFieldsTypeField {
  if (val == 'string') {
    return val;
  }
  if (val == 'float') {
    return val;
  }
  if (val == 'date') {
    return val;
  }
  if (val == 'enum') {
    return val;
  }
  if (val == 'multiSelect') {
    return val;
  }
  if (val == 'integer') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataTemplateFieldsTypeField",
  });
}
export function serializeMetadataTemplateFieldsOptionsField(
  val: MetadataTemplateFieldsOptionsField,
): SerializedData {
  return { ['key']: val.key, ['id']: val.id };
}
export function deserializeMetadataTemplateFieldsOptionsField(
  val: SerializedData,
): MetadataTemplateFieldsOptionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTemplateFieldsOptionsField"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "MetadataTemplateFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "MetadataTemplateFieldsOptionsField"',
    });
  }
  const key: string = val.key;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "MetadataTemplateFieldsOptionsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { key: key, id: id } satisfies MetadataTemplateFieldsOptionsField;
}
export function serializeMetadataTemplateFieldsField(
  val: MetadataTemplateFieldsField,
): SerializedData {
  return {
    ['type']: serializeMetadataTemplateFieldsTypeField(val.type),
    ['key']: val.key,
    ['displayName']: val.displayName,
    ['description']: val.description,
    ['hidden']: val.hidden,
    ['options']:
      val.options == void 0
        ? val.options
        : (val.options.map(function (
            item: MetadataTemplateFieldsOptionsField,
          ): SerializedData {
            return serializeMetadataTemplateFieldsOptionsField(item);
          }) as readonly any[]),
    ['id']: val.id,
  };
}
export function deserializeMetadataTemplateFieldsField(
  val: SerializedData,
): MetadataTemplateFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTemplateFieldsField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "MetadataTemplateFieldsField" to be defined',
    });
  }
  const type: MetadataTemplateFieldsTypeField =
    deserializeMetadataTemplateFieldsTypeField(val.type);
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "MetadataTemplateFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "MetadataTemplateFieldsField"',
    });
  }
  const key: string = val.key;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "MetadataTemplateFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "MetadataTemplateFieldsField"',
    });
  }
  const displayName: string = val.displayName;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "MetadataTemplateFieldsField"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "MetadataTemplateFieldsField"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (!(val.options == void 0) && !sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "MetadataTemplateFieldsField"',
    });
  }
  const options: undefined | readonly MetadataTemplateFieldsOptionsField[] =
    val.options == void 0
      ? void 0
      : sdIsList(val.options)
        ? (val.options.map(function (
            itm: SerializedData,
          ): MetadataTemplateFieldsOptionsField {
            return deserializeMetadataTemplateFieldsOptionsField(itm);
          }) as readonly any[])
        : [];
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "MetadataTemplateFieldsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    key: key,
    displayName: displayName,
    description: description,
    hidden: hidden,
    options: options,
    id: id,
  } satisfies MetadataTemplateFieldsField;
}
export function serializeMetadataTemplate(
  val: MetadataTemplate,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeMetadataTemplateTypeField(val.type),
    ['scope']: val.scope,
    ['templateKey']: val.templateKey,
    ['displayName']: val.displayName,
    ['hidden']: val.hidden,
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (
            item: MetadataTemplateFieldsField,
          ): SerializedData {
            return serializeMetadataTemplateFieldsField(item);
          }) as readonly any[]),
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
  };
}
export function deserializeMetadataTemplate(
  val: SerializedData,
): MetadataTemplate {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTemplate"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "MetadataTemplate" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataTemplate"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "MetadataTemplate" to be defined',
    });
  }
  const type: MetadataTemplateTypeField = deserializeMetadataTemplateTypeField(
    val.type,
  );
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "scope" of type "MetadataTemplate"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message: 'Expecting string for "templateKey" of type "MetadataTemplate"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message: 'Expecting string for "displayName" of type "MetadataTemplate"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "hidden" of type "MetadataTemplate"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "MetadataTemplate"',
    });
  }
  const fields: undefined | readonly MetadataTemplateFieldsField[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (
            itm: SerializedData,
          ): MetadataTemplateFieldsField {
            return deserializeMetadataTemplateFieldsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "MetadataTemplate"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  return {
    id: id,
    type: type,
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    fields: fields,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
  } satisfies MetadataTemplate;
}
export function serializeMetadataTemplateInput(
  val: MetadataTemplateInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeMetadataTemplateTypeField(val.type),
    ['scope']: val.scope,
    ['templateKey']: val.templateKey,
    ['displayName']: val.displayName,
    ['hidden']: val.hidden,
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (
            item: MetadataTemplateFieldsField,
          ): SerializedData {
            return serializeMetadataTemplateFieldsField(item);
          }) as readonly any[]),
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
  };
}
export function deserializeMetadataTemplateInput(
  val: SerializedData,
): MetadataTemplateInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTemplateInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "MetadataTemplateInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataTemplateInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | MetadataTemplateTypeField =
    val.type == void 0
      ? void 0
      : deserializeMetadataTemplateTypeField(val.type);
  if (!(val.scope == void 0) && !sdIsString(val.scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "scope" of type "MetadataTemplateInput"',
    });
  }
  const scope: undefined | string = val.scope == void 0 ? void 0 : val.scope;
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "templateKey" of type "MetadataTemplateInput"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "MetadataTemplateInput"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "hidden" of type "MetadataTemplateInput"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "MetadataTemplateInput"',
    });
  }
  const fields: undefined | readonly MetadataTemplateFieldsField[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (
            itm: SerializedData,
          ): MetadataTemplateFieldsField {
            return deserializeMetadataTemplateFieldsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "MetadataTemplateInput"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  return {
    id: id,
    type: type,
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    fields: fields,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
  } satisfies MetadataTemplateInput;
}
