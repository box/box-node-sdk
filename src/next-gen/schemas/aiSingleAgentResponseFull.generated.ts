import { serializeAiSingleAgentResponseTypeField } from './aiSingleAgentResponse.generated.js';
import { deserializeAiSingleAgentResponseTypeField } from './aiSingleAgentResponse.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeAiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
import { deserializeAiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
import { serializeAiSingleAgentResponse } from './aiSingleAgentResponse.generated.js';
import { deserializeAiSingleAgentResponse } from './aiSingleAgentResponse.generated.js';
import { serializeAiStudioAgentAsk } from './aiStudioAgentAsk.generated.js';
import { deserializeAiStudioAgentAsk } from './aiStudioAgentAsk.generated.js';
import { serializeAiStudioAgentTextGen } from './aiStudioAgentTextGen.generated.js';
import { deserializeAiStudioAgentTextGen } from './aiStudioAgentTextGen.generated.js';
import { serializeAiStudioAgentExtract } from './aiStudioAgentExtract.generated.js';
import { deserializeAiStudioAgentExtract } from './aiStudioAgentExtract.generated.js';
import { AiSingleAgentResponseTypeField } from './aiSingleAgentResponse.generated.js';
import { UserBase } from './userBase.generated.js';
import { DateTime } from '../internal/utils.js';
import { AiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
import { AiSingleAgentResponse } from './aiSingleAgentResponse.generated.js';
import { AiStudioAgentAsk } from './aiStudioAgentAsk.generated.js';
import { AiStudioAgentTextGen } from './aiStudioAgentTextGen.generated.js';
import { AiStudioAgentExtract } from './aiStudioAgentExtract.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiSingleAgentResponseFull = AiSingleAgentResponse & {
  readonly ask?: AiStudioAgentAsk;
  readonly textGen?: AiStudioAgentTextGen;
  readonly extract?: AiStudioAgentExtract;
};
export function serializeAiSingleAgentResponseFull(
  val: AiSingleAgentResponseFull,
): SerializedData {
  const base: any = serializeAiSingleAgentResponse(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSingleAgentResponseFull"',
    });
  }
  return {
    ...base,
    ...{
      ['ask']: val.ask == void 0 ? val.ask : serializeAiStudioAgentAsk(val.ask),
      ['text_gen']:
        val.textGen == void 0
          ? val.textGen
          : serializeAiStudioAgentTextGen(val.textGen),
      ['extract']:
        val.extract == void 0
          ? val.extract
          : serializeAiStudioAgentExtract(val.extract),
    },
  };
}
export function deserializeAiSingleAgentResponseFull(
  val: SerializedData,
): AiSingleAgentResponseFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSingleAgentResponseFull"',
    });
  }
  const ask: undefined | AiStudioAgentAsk =
    val.ask == void 0 ? void 0 : deserializeAiStudioAgentAsk(val.ask);
  const textGen: undefined | AiStudioAgentTextGen =
    val.text_gen == void 0
      ? void 0
      : deserializeAiStudioAgentTextGen(val.text_gen);
  const extract: undefined | AiStudioAgentExtract =
    val.extract == void 0
      ? void 0
      : deserializeAiStudioAgentExtract(val.extract);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AiSingleAgentResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiSingleAgentResponseFull"',
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
        'Expecting "origin" of type "AiSingleAgentResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.origin)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "origin" of type "AiSingleAgentResponseFull"',
    });
  }
  const origin: string = val.origin;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "AiSingleAgentResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "AiSingleAgentResponseFull"',
    });
  }
  const name: string = val.name;
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiSingleAgentResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiSingleAgentResponseFull"',
    });
  }
  const accessState: string = val.access_state;
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AiSingleAgentResponseFull"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const modifiedBy: undefined | UserBase =
    val.modified_by == void 0 ? void 0 : deserializeUserBase(val.modified_by);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "AiSingleAgentResponseFull"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.icon_reference == void 0) && !sdIsString(val.icon_reference)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "icon_reference" of type "AiSingleAgentResponseFull"',
    });
  }
  const iconReference: undefined | string =
    val.icon_reference == void 0 ? void 0 : val.icon_reference;
  if (!(val.allowed_entities == void 0) && !sdIsList(val.allowed_entities)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowed_entities" of type "AiSingleAgentResponseFull"',
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
    ask: ask,
    textGen: textGen,
    extract: extract,
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
  } satisfies AiSingleAgentResponseFull;
}
