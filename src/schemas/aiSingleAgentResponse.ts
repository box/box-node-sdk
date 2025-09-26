import { serializeGroupBase } from './groupBase';
import { deserializeGroupBase } from './groupBase';
import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { serializeAiAgentAllowedEntity } from './aiAgentAllowedEntity';
import { deserializeAiAgentAllowedEntity } from './aiAgentAllowedEntity';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { GroupBase } from './groupBase';
import { UserBase } from './userBase';
import { AiAgentAllowedEntity } from './aiAgentAllowedEntity';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiSingleAgentResponseTypeField = 'ai_agent';
export interface AiSingleAgentResponse {
  /**
   * The unique identifier of the AI Agent. */
  readonly id: string;
  /**
   * The type of agent used to handle queries. */
  readonly type?: AiSingleAgentResponseTypeField;
  /**
   * The provider of the AI Agent. */
  readonly origin: string;
  /**
   * The name of the AI Agent. */
  readonly name: string;
  /**
   * The state of the AI Agent. Possible values are: `enabled`, `disabled`, and `enabled_for_selected_users`. */
  readonly accessState: string;
  /**
   * The user who created this agent. */
  readonly createdBy?: UserBase;
  /**
   * The ISO date-time formatted timestamp of when this AI agent was created. */
  readonly createdAt?: DateTime;
  /**
   * The user who most recently modified this agent. */
  readonly modifiedBy?: UserBase;
  /**
   * The ISO date-time formatted timestamp of when this AI agent was recently modified. */
  readonly modifiedAt?: DateTime;
  /**
   * The icon reference of the AI Agent. */
  readonly iconReference?: string;
  /**
   * List of allowed users or groups. */
  readonly allowedEntities?: readonly AiAgentAllowedEntity[];
  readonly rawData?: SerializedData;
}
export function serializeAiSingleAgentResponseTypeField(
  val: AiSingleAgentResponseTypeField,
): SerializedData {
  return val;
}
export function deserializeAiSingleAgentResponseTypeField(
  val: SerializedData,
): AiSingleAgentResponseTypeField {
  if (val == 'ai_agent') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiSingleAgentResponseTypeField",
  });
}
export function serializeAiSingleAgentResponse(
  val: AiSingleAgentResponse,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiSingleAgentResponseTypeField(val.type),
    ['origin']: val.origin,
    ['name']: val.name,
    ['access_state']: val.accessState,
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserBase(val.createdBy),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_by']:
      val.modifiedBy == void 0
        ? val.modifiedBy
        : serializeUserBase(val.modifiedBy),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['icon_reference']: val.iconReference,
    ['allowed_entities']:
      val.allowedEntities == void 0
        ? val.allowedEntities
        : (val.allowedEntities.map(function (
            item: AiAgentAllowedEntity,
          ): SerializedData {
            return serializeAiAgentAllowedEntity(item);
          }) as readonly any[]),
  };
}
export function deserializeAiSingleAgentResponse(
  val: SerializedData,
): AiSingleAgentResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSingleAgentResponse"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiSingleAgentResponse" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiSingleAgentResponse"',
    });
  }
  const id: string = val.id;
  const type: undefined | AiSingleAgentResponseTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiSingleAgentResponseTypeField(val.type);
  if (val.origin == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "origin" of type "AiSingleAgentResponse" to be defined',
    });
  }
  if (!sdIsString(val.origin)) {
    throw new BoxSdkError({
      message: 'Expecting string for "origin" of type "AiSingleAgentResponse"',
    });
  }
  const origin: string = val.origin;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "AiSingleAgentResponse" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "AiSingleAgentResponse"',
    });
  }
  const name: string = val.name;
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiSingleAgentResponse" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiSingleAgentResponse"',
    });
  }
  const accessState: string = val.access_state;
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AiSingleAgentResponse"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const modifiedBy: undefined | UserBase =
    val.modified_by == void 0 ? void 0 : deserializeUserBase(val.modified_by);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "AiSingleAgentResponse"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.icon_reference == void 0) && !sdIsString(val.icon_reference)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "icon_reference" of type "AiSingleAgentResponse"',
    });
  }
  const iconReference: undefined | string =
    val.icon_reference == void 0 ? void 0 : val.icon_reference;
  if (!(val.allowed_entities == void 0) && !sdIsList(val.allowed_entities)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowed_entities" of type "AiSingleAgentResponse"',
    });
  }
  const allowedEntities: undefined | readonly AiAgentAllowedEntity[] =
    val.allowed_entities == void 0
      ? void 0
      : sdIsList(val.allowed_entities)
        ? (val.allowed_entities.map(function (
            itm: SerializedData,
          ): AiAgentAllowedEntity {
            return deserializeAiAgentAllowedEntity(itm);
          }) as readonly any[])
        : [];
  return {
    id: id,
    type: type,
    origin: origin,
    name: name,
    accessState: accessState,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedBy: modifiedBy,
    modifiedAt: modifiedAt,
    iconReference: iconReference,
    allowedEntities: allowedEntities,
  } satisfies AiSingleAgentResponse;
}
