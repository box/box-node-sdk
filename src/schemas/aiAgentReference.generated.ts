import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentReferenceTypeField = 'ai_agent_id';
export class AiAgentReference {
  /**
   * The type of AI agent used to handle queries. */
  readonly type: AiAgentReferenceTypeField =
    'ai_agent_id' as AiAgentReferenceTypeField;
  /**
   * The ID of an Agent. */
  readonly id?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiAgentReference, 'type'> &
      Partial<Pick<AiAgentReference, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiAgentReferenceInput {
  /**
   * The type of AI agent used to handle queries. */
  readonly type?: AiAgentReferenceTypeField;
  /**
   * The ID of an Agent. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentReferenceTypeField(
  val: AiAgentReferenceTypeField,
): SerializedData {
  return val;
}
export function deserializeAiAgentReferenceTypeField(
  val: SerializedData,
): AiAgentReferenceTypeField {
  if (val == 'ai_agent_id') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentReferenceTypeField",
  });
}
export function serializeAiAgentReference(
  val: AiAgentReference,
): SerializedData {
  return {
    ['type']: serializeAiAgentReferenceTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeAiAgentReference(
  val: SerializedData,
): AiAgentReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentReference"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiAgentReference" to be defined',
    });
  }
  const type: AiAgentReferenceTypeField = deserializeAiAgentReferenceTypeField(
    val.type,
  );
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiAgentReference"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies AiAgentReference;
}
export function serializeAiAgentReferenceInput(
  val: AiAgentReferenceInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiAgentReferenceTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeAiAgentReferenceInput(
  val: SerializedData,
): AiAgentReferenceInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentReferenceInput"',
    });
  }
  const type: undefined | AiAgentReferenceTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiAgentReferenceTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiAgentReferenceInput"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies AiAgentReferenceInput;
}
