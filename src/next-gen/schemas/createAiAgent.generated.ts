import { serializeAiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
import { deserializeAiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
import { serializeAiStudioAgentAsk } from './aiStudioAgentAsk.generated.js';
import { deserializeAiStudioAgentAsk } from './aiStudioAgentAsk.generated.js';
import { serializeAiStudioAgentTextGen } from './aiStudioAgentTextGen.generated.js';
import { deserializeAiStudioAgentTextGen } from './aiStudioAgentTextGen.generated.js';
import { serializeAiStudioAgentExtract } from './aiStudioAgentExtract.generated.js';
import { deserializeAiStudioAgentExtract } from './aiStudioAgentExtract.generated.js';
import { AiAgentAllowedEntity } from './aiAgentAllowedEntity.generated.js';
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
export type CreateAiAgentTypeField = 'ai_agent';
export class CreateAiAgent {
  /**
   * The type of agent used to handle queries. */
  readonly type: CreateAiAgentTypeField = 'ai_agent' as CreateAiAgentTypeField;
  /**
   * The name of the AI Agent. */
  readonly name!: string;
  /**
   * The state of the AI Agent. Possible values are: `enabled`, `disabled`, and `enabled_for_selected_users`. */
  readonly accessState!: string;
  /**
   * The icon reference of the AI Agent. It should have format of the URL `https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>`
   * where possible values of `file_name` are: `logo_boxAi.png`,`logo_stamp.png`,`logo_legal.png`,`logo_finance.png`,`logo_config.png`,`logo_handshake.png`,`logo_analytics.png`,`logo_classification.png` */
  readonly iconReference?: string;
  /**
   * List of allowed users or groups. */
  readonly allowedEntities?: readonly AiAgentAllowedEntity[];
  readonly ask?: AiStudioAgentAsk;
  readonly textGen?: AiStudioAgentTextGen;
  readonly extract?: AiStudioAgentExtract;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<CreateAiAgent, 'type'> & Partial<Pick<CreateAiAgent, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.accessState !== undefined) {
      this.accessState = fields.accessState;
    }
    if (fields.iconReference !== undefined) {
      this.iconReference = fields.iconReference;
    }
    if (fields.allowedEntities !== undefined) {
      this.allowedEntities = fields.allowedEntities;
    }
    if (fields.ask !== undefined) {
      this.ask = fields.ask;
    }
    if (fields.textGen !== undefined) {
      this.textGen = fields.textGen;
    }
    if (fields.extract !== undefined) {
      this.extract = fields.extract;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateAiAgentInput {
  /**
   * The type of agent used to handle queries. */
  readonly type?: CreateAiAgentTypeField;
  /**
   * The name of the AI Agent. */
  readonly name: string;
  /**
   * The state of the AI Agent. Possible values are: `enabled`, `disabled`, and `enabled_for_selected_users`. */
  readonly accessState: string;
  /**
   * The icon reference of the AI Agent. It should have format of the URL `https://cdn01.boxcdn.net/app-assets/aistudio/avatars/<file_name>`
   * where possible values of `file_name` are: `logo_boxAi.png`,`logo_stamp.png`,`logo_legal.png`,`logo_finance.png`,`logo_config.png`,`logo_handshake.png`,`logo_analytics.png`,`logo_classification.png` */
  readonly iconReference?: string;
  /**
   * List of allowed users or groups. */
  readonly allowedEntities?: readonly AiAgentAllowedEntity[];
  readonly ask?: AiStudioAgentAsk;
  readonly textGen?: AiStudioAgentTextGen;
  readonly extract?: AiStudioAgentExtract;
  readonly rawData?: SerializedData;
}
export function serializeCreateAiAgentTypeField(
  val: CreateAiAgentTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateAiAgentTypeField(
  val: SerializedData,
): CreateAiAgentTypeField {
  if (val == 'ai_agent') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateAiAgentTypeField",
  });
}
export function serializeCreateAiAgent(val: CreateAiAgent): SerializedData {
  return {
    ['type']: serializeCreateAiAgentTypeField(val.type),
    ['name']: val.name,
    ['access_state']: val.accessState,
    ['icon_reference']: val.iconReference,
    ['allowed_entities']:
      val.allowedEntities == void 0
        ? val.allowedEntities
        : (val.allowedEntities.map(function (
            item: AiAgentAllowedEntity,
          ): SerializedData {
            return serializeAiAgentAllowedEntity(item);
          }) as readonly any[]),
    ['ask']: val.ask == void 0 ? val.ask : serializeAiStudioAgentAsk(val.ask),
    ['text_gen']:
      val.textGen == void 0
        ? val.textGen
        : serializeAiStudioAgentTextGen(val.textGen),
    ['extract']:
      val.extract == void 0
        ? val.extract
        : serializeAiStudioAgentExtract(val.extract),
  };
}
export function deserializeCreateAiAgent(val: SerializedData): CreateAiAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "CreateAiAgent"' });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "CreateAiAgent" to be defined',
    });
  }
  const type: CreateAiAgentTypeField = deserializeCreateAiAgentTypeField(
    val.type,
  );
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "CreateAiAgent" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateAiAgent"',
    });
  }
  const name: string = val.name;
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "access_state" of type "CreateAiAgent" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "access_state" of type "CreateAiAgent"',
    });
  }
  const accessState: string = val.access_state;
  if (!(val.icon_reference == void 0) && !sdIsString(val.icon_reference)) {
    throw new BoxSdkError({
      message: 'Expecting string for "icon_reference" of type "CreateAiAgent"',
    });
  }
  const iconReference: undefined | string =
    val.icon_reference == void 0 ? void 0 : val.icon_reference;
  if (!(val.allowed_entities == void 0) && !sdIsList(val.allowed_entities)) {
    throw new BoxSdkError({
      message: 'Expecting array for "allowed_entities" of type "CreateAiAgent"',
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
  return {
    type: type,
    name: name,
    accessState: accessState,
    iconReference: iconReference,
    allowedEntities: allowedEntities,
    ask: ask,
    textGen: textGen,
    extract: extract,
  } satisfies CreateAiAgent;
}
export function serializeCreateAiAgentInput(
  val: CreateAiAgentInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeCreateAiAgentTypeField(val.type),
    ['name']: val.name,
    ['access_state']: val.accessState,
    ['icon_reference']: val.iconReference,
    ['allowed_entities']:
      val.allowedEntities == void 0
        ? val.allowedEntities
        : (val.allowedEntities.map(function (
            item: AiAgentAllowedEntity,
          ): SerializedData {
            return serializeAiAgentAllowedEntity(item);
          }) as readonly any[]),
    ['ask']: val.ask == void 0 ? val.ask : serializeAiStudioAgentAsk(val.ask),
    ['text_gen']:
      val.textGen == void 0
        ? val.textGen
        : serializeAiStudioAgentTextGen(val.textGen),
    ['extract']:
      val.extract == void 0
        ? val.extract
        : serializeAiStudioAgentExtract(val.extract),
  };
}
export function deserializeCreateAiAgentInput(
  val: SerializedData,
): CreateAiAgentInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateAiAgentInput"',
    });
  }
  const type: undefined | CreateAiAgentTypeField =
    val.type == void 0 ? void 0 : deserializeCreateAiAgentTypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "CreateAiAgentInput" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateAiAgentInput"',
    });
  }
  const name: string = val.name;
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "CreateAiAgentInput" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "CreateAiAgentInput"',
    });
  }
  const accessState: string = val.access_state;
  if (!(val.icon_reference == void 0) && !sdIsString(val.icon_reference)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "icon_reference" of type "CreateAiAgentInput"',
    });
  }
  const iconReference: undefined | string =
    val.icon_reference == void 0 ? void 0 : val.icon_reference;
  if (!(val.allowed_entities == void 0) && !sdIsList(val.allowed_entities)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowed_entities" of type "CreateAiAgentInput"',
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
  return {
    type: type,
    name: name,
    accessState: accessState,
    iconReference: iconReference,
    allowedEntities: allowedEntities,
    ask: ask,
    textGen: textGen,
    extract: extract,
  } satisfies CreateAiAgentInput;
}
