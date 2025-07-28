import { serializeShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.generated.js';
import { deserializeShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.generated.js';
import { serializeShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.generated.js';
import { deserializeShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.generated.js';
import { serializeShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.generated.js';
import { deserializeShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.generated.js';
import { serializeShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.generated.js';
import { deserializeShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.generated.js';
import { serializeShieldListContentIntegrationV2025R0 } from './shieldListContentIntegrationV2025R0.generated.js';
import { deserializeShieldListContentIntegrationV2025R0 } from './shieldListContentIntegrationV2025R0.generated.js';
import { serializeEnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0.generated.js';
import { deserializeEnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0.generated.js';
import { serializeShieldListContentV2025R0 } from './shieldListContentV2025R0.generated.js';
import { deserializeShieldListContentV2025R0 } from './shieldListContentV2025R0.generated.js';
import { serializeDateTime } from '../../internal/utils.js';
import { deserializeDateTime } from '../../internal/utils.js';
import { ShieldListContentCountryV2025R0 } from './shieldListContentCountryV2025R0.generated.js';
import { ShieldListContentDomainV2025R0 } from './shieldListContentDomainV2025R0.generated.js';
import { ShieldListContentEmailV2025R0 } from './shieldListContentEmailV2025R0.generated.js';
import { ShieldListContentIpV2025R0 } from './shieldListContentIpV2025R0.generated.js';
import { ShieldListContentIntegrationV2025R0 } from './shieldListContentIntegrationV2025R0.generated.js';
import { EnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0.generated.js';
import { ShieldListContentV2025R0 } from './shieldListContentV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { DateTime } from '../../internal/utils.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface ShieldListV2025R0 {
  /**
   * Unique identifier for the shield list. */
  readonly id: string;
  /**
   * Type of the object. */
  readonly type: string;
  /**
   * Name of the shield list. */
  readonly name: string;
  readonly enterprise: EnterpriseReferenceV2025R0;
  /**
   * Description of Shield List. */
  readonly description?: string;
  /**
   * ISO date time string when this shield list object was created. */
  readonly createdAt: DateTime;
  /**
   * ISO date time string when this shield list object was updated. */
  readonly updatedAt: DateTime;
  readonly content: ShieldListContentV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeShieldListV2025R0(
  val: ShieldListV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: val.type,
    ['name']: val.name,
    ['enterprise']: serializeEnterpriseReferenceV2025R0(val.enterprise),
    ['description']: val.description,
    ['created_at']: serializeDateTime(val.createdAt),
    ['updated_at']: serializeDateTime(val.updatedAt),
    ['content']: serializeShieldListContentV2025R0(val.content),
  };
}
export function deserializeShieldListV2025R0(
  val: SerializedData,
): ShieldListV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShieldListV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShieldListV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShieldListV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "ShieldListV2025R0"',
    });
  }
  const type: string = val.type;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ShieldListV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShieldListV2025R0"',
    });
  }
  const name: string = val.name;
  if (val.enterprise == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enterprise" of type "ShieldListV2025R0" to be defined',
    });
  }
  const enterprise: EnterpriseReferenceV2025R0 =
    deserializeEnterpriseReferenceV2025R0(val.enterprise);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "ShieldListV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "ShieldListV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "ShieldListV2025R0"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.updated_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_at" of type "ShieldListV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "updated_at" of type "ShieldListV2025R0"',
    });
  }
  const updatedAt: DateTime = deserializeDateTime(val.updated_at);
  if (val.content == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "content" of type "ShieldListV2025R0" to be defined',
    });
  }
  const content: ShieldListContentV2025R0 = deserializeShieldListContentV2025R0(
    val.content,
  );
  return {
    id: id,
    type: type,
    name: name,
    enterprise: enterprise,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    content: content,
  } satisfies ShieldListV2025R0;
}
