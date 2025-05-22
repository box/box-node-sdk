import { serializeWebLinkBaseTypeField } from './webLinkBase.generated.js';
import { deserializeWebLinkBaseTypeField } from './webLinkBase.generated.js';
import { serializeWebLinkBase } from './webLinkBase.generated.js';
import { deserializeWebLinkBase } from './webLinkBase.generated.js';
import { WebLinkBaseTypeField } from './webLinkBase.generated.js';
import { WebLinkBase } from './webLinkBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class WebLinkMini extends WebLinkBase {
  readonly url?: string;
  readonly sequenceId?: string;
  readonly name?: string;
  constructor(fields: WebLinkMini) {
    super(fields);
    if (fields.url !== undefined) {
      this.url = fields.url;
    }
    if (fields.sequenceId !== undefined) {
      this.sequenceId = fields.sequenceId;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
  }
}
export function serializeWebLinkMini(val: WebLinkMini): SerializedData {
  const base: any = serializeWebLinkBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebLinkMini"' });
  }
  return {
    ...base,
    ...{
      ['url']: val.url,
      ['sequence_id']: val.sequenceId,
      ['name']: val.name,
    },
  };
}
export function deserializeWebLinkMini(val: SerializedData): WebLinkMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebLinkMini"' });
  }
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "WebLinkMini"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "WebLinkMini"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "WebLinkMini"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "WebLinkMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebLinkMini"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "WebLinkMini" to be defined',
    });
  }
  const type: WebLinkBaseTypeField = deserializeWebLinkBaseTypeField(val.type);
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "WebLinkMini"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  return {
    url: url,
    sequenceId: sequenceId,
    name: name,
    id: id,
    type: type,
    etag: etag,
  } satisfies WebLinkMini;
}
