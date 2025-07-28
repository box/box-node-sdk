import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ClassificationTemplateTypeField = 'metadata_template';
export type ClassificationTemplateTemplateKeyField =
  | 'securityClassification-6VMVochwUWo'
  | string;
export type ClassificationTemplateDisplayNameField = 'Classification' | string;
export type ClassificationTemplateFieldsTypeField = 'enum';
export type ClassificationTemplateFieldsKeyField =
  | 'Box__Security__Classification__Key'
  | string;
export type ClassificationTemplateFieldsDisplayNameField =
  | 'Classification'
  | string;
export interface ClassificationTemplateFieldsOptionsStaticConfigClassificationField {
  /**
   * A longer description of the classification. */
  readonly classificationDefinition?: string;
  /**
   * An internal Box identifier used to assign a color to
   * a classification label.
   *
   * Mapping between a `colorID` and a color may change
   * without notice. Currently, the color mappings are as
   * follows.
   *
   * * `0`: Yellow.
   * * `1`: Orange.
   * * `2`: Watermelon red.
   * * `3`: Purple rain.
   * * `4`: Light blue.
   * * `5`: Dark blue.
   * * `6`: Light green.
   * * `7`: Gray. */
  readonly colorId?: number;
  readonly rawData?: SerializedData;
}
export interface ClassificationTemplateFieldsOptionsStaticConfigField {
  /**
   * Additional information about the classification.
   *
   * This is not an exclusive list of properties, and
   * more object fields might be returned. These fields
   * are used for internal Box Shield and Box Governance
   * purposes and no additional value must be derived from
   * these fields. */
  readonly classification?: ClassificationTemplateFieldsOptionsStaticConfigClassificationField;
  readonly rawData?: SerializedData;
}
export interface ClassificationTemplateFieldsOptionsField {
  /**
   * The unique ID of this classification. */
  readonly id: string;
  /**
   * The display name and key for this classification. */
  readonly key: string;
  /**
   * Additional information about the classification. */
  readonly staticConfig?: ClassificationTemplateFieldsOptionsStaticConfigField;
  readonly rawData?: SerializedData;
}
export class ClassificationTemplateFieldsField {
  /**
   * The unique ID of the field. */
  readonly id!: string;
  /**
   * The array item type. */
  readonly type: ClassificationTemplateFieldsTypeField =
    'enum' as ClassificationTemplateFieldsTypeField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly key: ClassificationTemplateFieldsKeyField =
    'Box__Security__Classification__Key' as ClassificationTemplateFieldsKeyField;
  /**
   * The value will always be `Classification`. */
  readonly displayName: ClassificationTemplateFieldsDisplayNameField =
    'Classification' as ClassificationTemplateFieldsDisplayNameField;
  /**
   * Classifications are always visible to web and mobile users. */
  readonly hidden?: boolean;
  /**
   * A list of classifications available in this enterprise. */
  readonly options!: readonly ClassificationTemplateFieldsOptionsField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      ClassificationTemplateFieldsField,
      'type' | 'key' | 'displayName'
    > &
      Partial<
        Pick<ClassificationTemplateFieldsField, 'type' | 'key' | 'displayName'>
      >,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.key !== undefined) {
      this.key = fields.key;
    }
    if (fields.displayName !== undefined) {
      this.displayName = fields.displayName;
    }
    if (fields.hidden !== undefined) {
      this.hidden = fields.hidden;
    }
    if (fields.options !== undefined) {
      this.options = fields.options;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ClassificationTemplateFieldsFieldInput {
  /**
   * The unique ID of the field. */
  readonly id: string;
  /**
   * The array item type. */
  readonly type?: ClassificationTemplateFieldsTypeField;
  /**
   * Defines classifications
   * available in the enterprise. */
  readonly key?: ClassificationTemplateFieldsKeyField;
  /**
   * The value will always be `Classification`. */
  readonly displayName?: ClassificationTemplateFieldsDisplayNameField;
  /**
   * Classifications are always visible to web and mobile users. */
  readonly hidden?: boolean;
  /**
   * A list of classifications available in this enterprise. */
  readonly options: readonly ClassificationTemplateFieldsOptionsField[];
  readonly rawData?: SerializedData;
}
export class ClassificationTemplate {
  /**
   * The ID of the classification template. */
  readonly id!: string;
  /**
   * The value will always be `metadata_template`. */
  readonly type: ClassificationTemplateTypeField =
    'metadata_template' as ClassificationTemplateTypeField;
  /**
   * The scope of the classification template. This is in the format
   * `enterprise_{id}` where the `id` is the enterprise ID. */
  readonly scope!: string;
  /**
   * The value will always be `securityClassification-6VMVochwUWo`. */
  readonly templateKey: ClassificationTemplateTemplateKeyField =
    'securityClassification-6VMVochwUWo' as ClassificationTemplateTemplateKeyField;
  /**
   * The name of this template as shown in web and mobile interfaces. */
  readonly displayName: ClassificationTemplateDisplayNameField =
    'Classification' as ClassificationTemplateDisplayNameField;
  /**
   * Determines if the
   * template is always available in web and mobile interfaces. */
  readonly hidden?: boolean;
  /**
   * Determines if
   * classifications are
   * copied along when the file or folder is
   * copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  /**
   * A list of fields for this classification template. This includes
   * only one field, the `Box__Security__Classification__Key`, which defines
   * the different classifications available in this enterprise. */
  readonly fields!: readonly ClassificationTemplateFieldsField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<
      ClassificationTemplate,
      'type' | 'templateKey' | 'displayName'
    > &
      Partial<
        Pick<ClassificationTemplate, 'type' | 'templateKey' | 'displayName'>
      >,
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
    if (fields.copyInstanceOnItemCopy !== undefined) {
      this.copyInstanceOnItemCopy = fields.copyInstanceOnItemCopy;
    }
    if (fields.fields !== undefined) {
      this.fields = fields.fields;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ClassificationTemplateInput {
  /**
   * The ID of the classification template. */
  readonly id: string;
  /**
   * The value will always be `metadata_template`. */
  readonly type?: ClassificationTemplateTypeField;
  /**
   * The scope of the classification template. This is in the format
   * `enterprise_{id}` where the `id` is the enterprise ID. */
  readonly scope: string;
  /**
   * The value will always be `securityClassification-6VMVochwUWo`. */
  readonly templateKey?: ClassificationTemplateTemplateKeyField;
  /**
   * The name of this template as shown in web and mobile interfaces. */
  readonly displayName?: ClassificationTemplateDisplayNameField;
  /**
   * Determines if the
   * template is always available in web and mobile interfaces. */
  readonly hidden?: boolean;
  /**
   * Determines if
   * classifications are
   * copied along when the file or folder is
   * copied. */
  readonly copyInstanceOnItemCopy?: boolean;
  /**
   * A list of fields for this classification template. This includes
   * only one field, the `Box__Security__Classification__Key`, which defines
   * the different classifications available in this enterprise. */
  readonly fields: readonly ClassificationTemplateFieldsField[];
  readonly rawData?: SerializedData;
}
export function serializeClassificationTemplateTypeField(
  val: ClassificationTemplateTypeField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateTypeField(
  val: SerializedData,
): ClassificationTemplateTypeField {
  if (val == 'metadata_template') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateTypeField",
  });
}
export function serializeClassificationTemplateTemplateKeyField(
  val: ClassificationTemplateTemplateKeyField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateTemplateKeyField(
  val: SerializedData,
): ClassificationTemplateTemplateKeyField {
  if (val == 'securityClassification-6VMVochwUWo') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateTemplateKeyField",
  });
}
export function serializeClassificationTemplateDisplayNameField(
  val: ClassificationTemplateDisplayNameField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateDisplayNameField(
  val: SerializedData,
): ClassificationTemplateDisplayNameField {
  if (val == 'Classification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateDisplayNameField",
  });
}
export function serializeClassificationTemplateFieldsTypeField(
  val: ClassificationTemplateFieldsTypeField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateFieldsTypeField(
  val: SerializedData,
): ClassificationTemplateFieldsTypeField {
  if (val == 'enum') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateFieldsTypeField",
  });
}
export function serializeClassificationTemplateFieldsKeyField(
  val: ClassificationTemplateFieldsKeyField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateFieldsKeyField(
  val: SerializedData,
): ClassificationTemplateFieldsKeyField {
  if (val == 'Box__Security__Classification__Key') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateFieldsKeyField",
  });
}
export function serializeClassificationTemplateFieldsDisplayNameField(
  val: ClassificationTemplateFieldsDisplayNameField,
): SerializedData {
  return val;
}
export function deserializeClassificationTemplateFieldsDisplayNameField(
  val: SerializedData,
): ClassificationTemplateFieldsDisplayNameField {
  if (val == 'Classification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClassificationTemplateFieldsDisplayNameField",
  });
}
export function serializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(
  val: ClassificationTemplateFieldsOptionsStaticConfigClassificationField,
): SerializedData {
  return {
    ['classificationDefinition']: val.classificationDefinition,
    ['colorID']: val.colorId,
  };
}
export function deserializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(
  val: SerializedData,
): ClassificationTemplateFieldsOptionsStaticConfigClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ClassificationTemplateFieldsOptionsStaticConfigClassificationField"',
    });
  }
  if (
    !(val.classificationDefinition == void 0) &&
    !sdIsString(val.classificationDefinition)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "classificationDefinition" of type "ClassificationTemplateFieldsOptionsStaticConfigClassificationField"',
    });
  }
  const classificationDefinition: undefined | string =
    val.classificationDefinition == void 0
      ? void 0
      : val.classificationDefinition;
  if (!(val.colorID == void 0) && !sdIsNumber(val.colorID)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "colorID" of type "ClassificationTemplateFieldsOptionsStaticConfigClassificationField"',
    });
  }
  const colorId: undefined | number =
    val.colorID == void 0 ? void 0 : val.colorID;
  return {
    classificationDefinition: classificationDefinition,
    colorId: colorId,
  } satisfies ClassificationTemplateFieldsOptionsStaticConfigClassificationField;
}
export function serializeClassificationTemplateFieldsOptionsStaticConfigField(
  val: ClassificationTemplateFieldsOptionsStaticConfigField,
): SerializedData {
  return {
    ['classification']:
      val.classification == void 0
        ? val.classification
        : serializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(
            val.classification,
          ),
  };
}
export function deserializeClassificationTemplateFieldsOptionsStaticConfigField(
  val: SerializedData,
): ClassificationTemplateFieldsOptionsStaticConfigField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ClassificationTemplateFieldsOptionsStaticConfigField"',
    });
  }
  const classification:
    | undefined
    | ClassificationTemplateFieldsOptionsStaticConfigClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(
          val.classification,
        );
  return {
    classification: classification,
  } satisfies ClassificationTemplateFieldsOptionsStaticConfigField;
}
export function serializeClassificationTemplateFieldsOptionsField(
  val: ClassificationTemplateFieldsOptionsField,
): SerializedData {
  return {
    ['id']: val.id,
    ['key']: val.key,
    ['staticConfig']:
      val.staticConfig == void 0
        ? val.staticConfig
        : serializeClassificationTemplateFieldsOptionsStaticConfigField(
            val.staticConfig,
          ),
  };
}
export function deserializeClassificationTemplateFieldsOptionsField(
  val: SerializedData,
): ClassificationTemplateFieldsOptionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClassificationTemplateFieldsOptionsField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ClassificationTemplateFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ClassificationTemplateFieldsOptionsField"',
    });
  }
  const id: string = val.id;
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "ClassificationTemplateFieldsOptionsField" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "ClassificationTemplateFieldsOptionsField"',
    });
  }
  const key: string = val.key;
  const staticConfig:
    | undefined
    | ClassificationTemplateFieldsOptionsStaticConfigField =
    val.staticConfig == void 0
      ? void 0
      : deserializeClassificationTemplateFieldsOptionsStaticConfigField(
          val.staticConfig,
        );
  return {
    id: id,
    key: key,
    staticConfig: staticConfig,
  } satisfies ClassificationTemplateFieldsOptionsField;
}
export function serializeClassificationTemplateFieldsField(
  val: ClassificationTemplateFieldsField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeClassificationTemplateFieldsTypeField(val.type),
    ['key']: serializeClassificationTemplateFieldsKeyField(val.key),
    ['displayName']: serializeClassificationTemplateFieldsDisplayNameField(
      val.displayName,
    ),
    ['hidden']: val.hidden,
    ['options']: val.options.map(function (
      item: ClassificationTemplateFieldsOptionsField,
    ): SerializedData {
      return serializeClassificationTemplateFieldsOptionsField(item);
    }) as readonly any[],
  };
}
export function deserializeClassificationTemplateFieldsField(
  val: SerializedData,
): ClassificationTemplateFieldsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClassificationTemplateFieldsField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ClassificationTemplateFieldsField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ClassificationTemplateFieldsField"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ClassificationTemplateFieldsField" to be defined',
    });
  }
  const type: ClassificationTemplateFieldsTypeField =
    deserializeClassificationTemplateFieldsTypeField(val.type);
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "ClassificationTemplateFieldsField" to be defined',
    });
  }
  const key: ClassificationTemplateFieldsKeyField =
    deserializeClassificationTemplateFieldsKeyField(val.key);
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "ClassificationTemplateFieldsField" to be defined',
    });
  }
  const displayName: ClassificationTemplateFieldsDisplayNameField =
    deserializeClassificationTemplateFieldsDisplayNameField(val.displayName);
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "ClassificationTemplateFieldsField"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (val.options == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "options" of type "ClassificationTemplateFieldsField" to be defined',
    });
  }
  if (!sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "ClassificationTemplateFieldsField"',
    });
  }
  const options: readonly ClassificationTemplateFieldsOptionsField[] = sdIsList(
    val.options,
  )
    ? (val.options.map(function (
        itm: SerializedData,
      ): ClassificationTemplateFieldsOptionsField {
        return deserializeClassificationTemplateFieldsOptionsField(itm);
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    key: key,
    displayName: displayName,
    hidden: hidden,
    options: options,
  } satisfies ClassificationTemplateFieldsField;
}
export function serializeClassificationTemplateFieldsFieldInput(
  val: ClassificationTemplateFieldsFieldInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeClassificationTemplateFieldsTypeField(val.type),
    ['key']:
      val.key == void 0
        ? val.key
        : serializeClassificationTemplateFieldsKeyField(val.key),
    ['displayName']:
      val.displayName == void 0
        ? val.displayName
        : serializeClassificationTemplateFieldsDisplayNameField(
            val.displayName,
          ),
    ['hidden']: val.hidden,
    ['options']: val.options.map(function (
      item: ClassificationTemplateFieldsOptionsField,
    ): SerializedData {
      return serializeClassificationTemplateFieldsOptionsField(item);
    }) as readonly any[],
  };
}
export function deserializeClassificationTemplateFieldsFieldInput(
  val: SerializedData,
): ClassificationTemplateFieldsFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClassificationTemplateFieldsFieldInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ClassificationTemplateFieldsFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ClassificationTemplateFieldsFieldInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | ClassificationTemplateFieldsTypeField =
    val.type == void 0
      ? void 0
      : deserializeClassificationTemplateFieldsTypeField(val.type);
  const key: undefined | ClassificationTemplateFieldsKeyField =
    val.key == void 0
      ? void 0
      : deserializeClassificationTemplateFieldsKeyField(val.key);
  const displayName: undefined | ClassificationTemplateFieldsDisplayNameField =
    val.displayName == void 0
      ? void 0
      : deserializeClassificationTemplateFieldsDisplayNameField(
          val.displayName,
        );
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "ClassificationTemplateFieldsFieldInput"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (val.options == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "options" of type "ClassificationTemplateFieldsFieldInput" to be defined',
    });
  }
  if (!sdIsList(val.options)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "options" of type "ClassificationTemplateFieldsFieldInput"',
    });
  }
  const options: readonly ClassificationTemplateFieldsOptionsField[] = sdIsList(
    val.options,
  )
    ? (val.options.map(function (
        itm: SerializedData,
      ): ClassificationTemplateFieldsOptionsField {
        return deserializeClassificationTemplateFieldsOptionsField(itm);
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    key: key,
    displayName: displayName,
    hidden: hidden,
    options: options,
  } satisfies ClassificationTemplateFieldsFieldInput;
}
export function serializeClassificationTemplate(
  val: ClassificationTemplate,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeClassificationTemplateTypeField(val.type),
    ['scope']: val.scope,
    ['templateKey']: serializeClassificationTemplateTemplateKeyField(
      val.templateKey,
    ),
    ['displayName']: serializeClassificationTemplateDisplayNameField(
      val.displayName,
    ),
    ['hidden']: val.hidden,
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
    ['fields']: val.fields.map(function (
      item: ClassificationTemplateFieldsField,
    ): SerializedData {
      return serializeClassificationTemplateFieldsField(item);
    }) as readonly any[],
  };
}
export function deserializeClassificationTemplate(
  val: SerializedData,
): ClassificationTemplate {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClassificationTemplate"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ClassificationTemplate" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ClassificationTemplate"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ClassificationTemplate" to be defined',
    });
  }
  const type: ClassificationTemplateTypeField =
    deserializeClassificationTemplateTypeField(val.type);
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "ClassificationTemplate" to be defined',
    });
  }
  if (!sdIsString(val.scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "scope" of type "ClassificationTemplate"',
    });
  }
  const scope: string = val.scope;
  if (val.templateKey == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "templateKey" of type "ClassificationTemplate" to be defined',
    });
  }
  const templateKey: ClassificationTemplateTemplateKeyField =
    deserializeClassificationTemplateTemplateKeyField(val.templateKey);
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "ClassificationTemplate" to be defined',
    });
  }
  const displayName: ClassificationTemplateDisplayNameField =
    deserializeClassificationTemplateDisplayNameField(val.displayName);
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "ClassificationTemplate"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "ClassificationTemplate"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  if (val.fields == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fields" of type "ClassificationTemplate" to be defined',
    });
  }
  if (!sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "ClassificationTemplate"',
    });
  }
  const fields: readonly ClassificationTemplateFieldsField[] = sdIsList(
    val.fields,
  )
    ? (val.fields.map(function (
        itm: SerializedData,
      ): ClassificationTemplateFieldsField {
        return deserializeClassificationTemplateFieldsField(itm);
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
    fields: fields,
  } satisfies ClassificationTemplate;
}
export function serializeClassificationTemplateInput(
  val: ClassificationTemplateInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeClassificationTemplateTypeField(val.type),
    ['scope']: val.scope,
    ['templateKey']:
      val.templateKey == void 0
        ? val.templateKey
        : serializeClassificationTemplateTemplateKeyField(val.templateKey),
    ['displayName']:
      val.displayName == void 0
        ? val.displayName
        : serializeClassificationTemplateDisplayNameField(val.displayName),
    ['hidden']: val.hidden,
    ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy,
    ['fields']: val.fields.map(function (
      item: ClassificationTemplateFieldsField,
    ): SerializedData {
      return serializeClassificationTemplateFieldsField(item);
    }) as readonly any[],
  };
}
export function deserializeClassificationTemplateInput(
  val: SerializedData,
): ClassificationTemplateInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClassificationTemplateInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ClassificationTemplateInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ClassificationTemplateInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | ClassificationTemplateTypeField =
    val.type == void 0
      ? void 0
      : deserializeClassificationTemplateTypeField(val.type);
  if (val.scope == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "scope" of type "ClassificationTemplateInput" to be defined',
    });
  }
  if (!sdIsString(val.scope)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scope" of type "ClassificationTemplateInput"',
    });
  }
  const scope: string = val.scope;
  const templateKey: undefined | ClassificationTemplateTemplateKeyField =
    val.templateKey == void 0
      ? void 0
      : deserializeClassificationTemplateTemplateKeyField(val.templateKey);
  const displayName: undefined | ClassificationTemplateDisplayNameField =
    val.displayName == void 0
      ? void 0
      : deserializeClassificationTemplateDisplayNameField(val.displayName);
  if (!(val.hidden == void 0) && !sdIsBoolean(val.hidden)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "hidden" of type "ClassificationTemplateInput"',
    });
  }
  const hidden: undefined | boolean =
    val.hidden == void 0 ? void 0 : val.hidden;
  if (
    !(val.copyInstanceOnItemCopy == void 0) &&
    !sdIsBoolean(val.copyInstanceOnItemCopy)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "copyInstanceOnItemCopy" of type "ClassificationTemplateInput"',
    });
  }
  const copyInstanceOnItemCopy: undefined | boolean =
    val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
  if (val.fields == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fields" of type "ClassificationTemplateInput" to be defined',
    });
  }
  if (!sdIsList(val.fields)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "fields" of type "ClassificationTemplateInput"',
    });
  }
  const fields: readonly ClassificationTemplateFieldsField[] = sdIsList(
    val.fields,
  )
    ? (val.fields.map(function (
        itm: SerializedData,
      ): ClassificationTemplateFieldsField {
        return deserializeClassificationTemplateFieldsField(itm);
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    scope: scope,
    templateKey: templateKey,
    displayName: displayName,
    hidden: hidden,
    copyInstanceOnItemCopy: copyInstanceOnItemCopy,
    fields: fields,
  } satisfies ClassificationTemplateInput;
}
