import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type WebLinkBaseTypeField = 'web_link';
export class WebLinkBase {
  /**
   * The unique identifier for this web link */
  readonly id!: string;
  /**
   * `web_link` */
  readonly type: WebLinkBaseTypeField = 'web_link' as WebLinkBaseTypeField;
  /**
   * The entity tag of this web link. Used with `If-Match`
   * headers. */
  readonly etag?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<WebLinkBase, 'type'> & Partial<Pick<WebLinkBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.etag !== undefined) {
      this.etag = fields.etag;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface WebLinkBaseInput {
  /**
   * The unique identifier for this web link */
  readonly id: string;
  /**
   * `web_link` */
  readonly type?: WebLinkBaseTypeField;
  /**
   * The entity tag of this web link. Used with `If-Match`
   * headers. */
  readonly etag?: string;
  readonly rawData?: SerializedData;
}
export function serializeWebLinkBaseTypeField(
  val: WebLinkBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeWebLinkBaseTypeField(
  val: SerializedData,
): WebLinkBaseTypeField {
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize WebLinkBaseTypeField" });
}
export function serializeWebLinkBase(val: WebLinkBase): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeWebLinkBaseTypeField(val.type),
    ['etag']: val.etag,
  };
}
export function deserializeWebLinkBase(val: SerializedData): WebLinkBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebLinkBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "WebLinkBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebLinkBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "WebLinkBase" to be defined',
    });
  }
  const type: WebLinkBaseTypeField = deserializeWebLinkBaseTypeField(val.type);
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "WebLinkBase"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  return { id: id, type: type, etag: etag } satisfies WebLinkBase;
}
export function serializeWebLinkBaseInput(
  val: WebLinkBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeWebLinkBaseTypeField(val.type),
    ['etag']: val.etag,
  };
}
export function deserializeWebLinkBaseInput(
  val: SerializedData,
): WebLinkBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebLinkBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "WebLinkBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebLinkBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | WebLinkBaseTypeField =
    val.type == void 0 ? void 0 : deserializeWebLinkBaseTypeField(val.type);
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "WebLinkBaseInput"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  return { id: id, type: type, etag: etag } satisfies WebLinkBaseInput;
}
