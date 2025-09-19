import { serializeShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.js';
import { deserializeShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.js';
import { serializeShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.js';
import { deserializeShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.js';
import { serializeShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.js';
import { deserializeShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.js';
import { serializeShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.js';
import { deserializeShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.js';
import { serializeShieldListContentRequestV2025R0 } from './shieldListContentRequestV2025R0.js';
import { deserializeShieldListContentRequestV2025R0 } from './shieldListContentRequestV2025R0.js';
import { ShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.js';
import { ShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.js';
import { ShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.js';
import { ShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.js';
import { ShieldListContentRequestV2025R0 } from './shieldListContentRequestV2025R0.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface ShieldListsCreateV2025R0 {
  /**
   * The name of the shield list. */
  readonly name: string;
  /**
   * Optional description of Shield List. */
  readonly description?: string;
  readonly content: ShieldListContentRequestV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeShieldListsCreateV2025R0(
  val: ShieldListsCreateV2025R0
): SerializedData {
  return {
    ['name']: val.name,
    ['description']: val.description,
    ['content']: serializeShieldListContentRequestV2025R0(val.content),
  };
}
export function deserializeShieldListsCreateV2025R0(
  val: SerializedData
): ShieldListsCreateV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListsCreateV2025R0"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShieldListsCreateV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShieldListsCreateV2025R0"',
    });
  }
  const name: string = val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShieldListsCreateV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (val.content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content" of type "ShieldListsCreateV2025R0" to be defined',
    });
  }
  const content: ShieldListContentRequestV2025R0 =
    deserializeShieldListContentRequestV2025R0(val.content);
  return {
    name: name,
    description: description,
    content: content,
  } satisfies ShieldListsCreateV2025R0;
}
