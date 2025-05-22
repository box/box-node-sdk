import { serializeAppItem } from './appItem.generated.js';
import { deserializeAppItem } from './appItem.generated.js';
import { serializeFileBaseOrFolderBaseOrWebLinkBase } from './fileBaseOrFolderBaseOrWebLinkBase.generated.js';
import { deserializeFileBaseOrFolderBaseOrWebLinkBase } from './fileBaseOrFolderBaseOrWebLinkBase.generated.js';
import { AppItem } from './appItem.generated.js';
import { FileBaseOrFolderBaseOrWebLinkBase } from './fileBaseOrFolderBaseOrWebLinkBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AppItemAssociationTypeField = 'app_item_association';
export class AppItemAssociation {
  /**
   * The unique identifier for this app item association. */
  readonly id!: string;
  /**
   * `app_item_association` */
  readonly type: AppItemAssociationTypeField =
    'app_item_association' as AppItemAssociationTypeField;
  readonly appItem!: AppItem;
  readonly item!: FileBaseOrFolderBaseOrWebLinkBase;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AppItemAssociation, 'type'> &
      Partial<Pick<AppItemAssociation, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.appItem !== undefined) {
      this.appItem = fields.appItem;
    }
    if (fields.item !== undefined) {
      this.item = fields.item;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AppItemAssociationInput {
  /**
   * The unique identifier for this app item association. */
  readonly id: string;
  /**
   * `app_item_association` */
  readonly type?: AppItemAssociationTypeField;
  readonly appItem: AppItem;
  readonly item: FileBaseOrFolderBaseOrWebLinkBase;
  readonly rawData?: SerializedData;
}
export function serializeAppItemAssociationTypeField(
  val: AppItemAssociationTypeField,
): SerializedData {
  return val;
}
export function deserializeAppItemAssociationTypeField(
  val: SerializedData,
): AppItemAssociationTypeField {
  if (val == 'app_item_association') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AppItemAssociationTypeField",
  });
}
export function serializeAppItemAssociation(
  val: AppItemAssociation,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAppItemAssociationTypeField(val.type),
    ['app_item']: serializeAppItem(val.appItem),
    ['item']: serializeFileBaseOrFolderBaseOrWebLinkBase(val.item),
  };
}
export function deserializeAppItemAssociation(
  val: SerializedData,
): AppItemAssociation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AppItemAssociation"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AppItemAssociation" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AppItemAssociation"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AppItemAssociation" to be defined',
    });
  }
  const type: AppItemAssociationTypeField =
    deserializeAppItemAssociationTypeField(val.type);
  if (val.app_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "app_item" of type "AppItemAssociation" to be defined',
    });
  }
  const appItem: AppItem = deserializeAppItem(val.app_item);
  if (val.item == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item" of type "AppItemAssociation" to be defined',
    });
  }
  const item: FileBaseOrFolderBaseOrWebLinkBase =
    deserializeFileBaseOrFolderBaseOrWebLinkBase(val.item);
  return {
    id: id,
    type: type,
    appItem: appItem,
    item: item,
  } satisfies AppItemAssociation;
}
export function serializeAppItemAssociationInput(
  val: AppItemAssociationInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAppItemAssociationTypeField(val.type),
    ['app_item']: serializeAppItem(val.appItem),
    ['item']: serializeFileBaseOrFolderBaseOrWebLinkBase(val.item),
  };
}
export function deserializeAppItemAssociationInput(
  val: SerializedData,
): AppItemAssociationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AppItemAssociationInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AppItemAssociationInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AppItemAssociationInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | AppItemAssociationTypeField =
    val.type == void 0
      ? void 0
      : deserializeAppItemAssociationTypeField(val.type);
  if (val.app_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "app_item" of type "AppItemAssociationInput" to be defined',
    });
  }
  const appItem: AppItem = deserializeAppItem(val.app_item);
  if (val.item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "item" of type "AppItemAssociationInput" to be defined',
    });
  }
  const item: FileBaseOrFolderBaseOrWebLinkBase =
    deserializeFileBaseOrFolderBaseOrWebLinkBase(val.item);
  return {
    id: id,
    type: type,
    appItem: appItem,
    item: item,
  } satisfies AppItemAssociationInput;
}
