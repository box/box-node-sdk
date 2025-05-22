import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AppItemTypeField = 'app_item';
export class AppItem {
  /**
   * The unique identifier for this app item. */
  readonly id!: string;
  /**
   * `app_item` */
  readonly type: AppItemTypeField = 'app_item' as AppItemTypeField;
  /**
   * The type of the app that owns this app item. */
  readonly applicationType!: string;
  readonly rawData?: SerializedData;
  constructor(fields: Omit<AppItem, 'type'> & Partial<Pick<AppItem, 'type'>>) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.applicationType !== undefined) {
      this.applicationType = fields.applicationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AppItemInput {
  /**
   * The unique identifier for this app item. */
  readonly id: string;
  /**
   * `app_item` */
  readonly type?: AppItemTypeField;
  /**
   * The type of the app that owns this app item. */
  readonly applicationType: string;
  readonly rawData?: SerializedData;
}
export function serializeAppItemTypeField(
  val: AppItemTypeField,
): SerializedData {
  return val;
}
export function deserializeAppItemTypeField(
  val: SerializedData,
): AppItemTypeField {
  if (val == 'app_item') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize AppItemTypeField" });
}
export function serializeAppItem(val: AppItem): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAppItemTypeField(val.type),
    ['application_type']: val.applicationType,
  };
}
export function deserializeAppItem(val: SerializedData): AppItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AppItem"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AppItem" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AppItem"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AppItem" to be defined',
    });
  }
  const type: AppItemTypeField = deserializeAppItemTypeField(val.type);
  if (val.application_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "application_type" of type "AppItem" to be defined',
    });
  }
  if (!sdIsString(val.application_type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "application_type" of type "AppItem"',
    });
  }
  const applicationType: string = val.application_type;
  return {
    id: id,
    type: type,
    applicationType: applicationType,
  } satisfies AppItem;
}
export function serializeAppItemInput(val: AppItemInput): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeAppItemTypeField(val.type),
    ['application_type']: val.applicationType,
  };
}
export function deserializeAppItemInput(val: SerializedData): AppItemInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AppItemInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AppItemInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AppItemInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | AppItemTypeField =
    val.type == void 0 ? void 0 : deserializeAppItemTypeField(val.type);
  if (val.application_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "application_type" of type "AppItemInput" to be defined',
    });
  }
  if (!sdIsString(val.application_type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "application_type" of type "AppItemInput"',
    });
  }
  const applicationType: string = val.application_type;
  return {
    id: id,
    type: type,
    applicationType: applicationType,
  } satisfies AppItemInput;
}
