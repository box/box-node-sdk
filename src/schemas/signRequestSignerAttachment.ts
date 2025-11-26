import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface SignRequestSignerAttachment {
  /**
   * Identifier of the attachment file. */
  readonly id?: string | null;
  /**
   * Display name of the attachment file. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerAttachment(
  val: SignRequestSignerAttachment,
): SerializedData {
  return { ['id']: val.id, ['name']: val.name };
}
export function deserializeSignRequestSignerAttachment(
  val: SerializedData,
): SignRequestSignerAttachment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerAttachment"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "SignRequestSignerAttachment"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "SignRequestSignerAttachment"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { id: id, name: name } satisfies SignRequestSignerAttachment;
}
