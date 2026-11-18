import { serializeUserBaseV2026R0 } from './userBaseV2026R0';
import { deserializeUserBaseV2026R0 } from './userBaseV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { UserBaseV2026R0 } from './userBaseV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type AiSessionV2026R0TypeField = 'ai_session';
export type AiSessionV2026R0SourceField = 'api' | string;
export class AiSessionV2026R0 {
  /**
   * The value is always `ai_session`. */
  readonly type: AiSessionV2026R0TypeField =
    'ai_session' as AiSessionV2026R0TypeField;
  /**
   * The unique identifier for the AI session. This is also the A2A
   * `contextId` for the conversation. Treat the value as opaque. */
  readonly id!: string;
  /**
   * The display name of the AI session. Sessions created through the A2A API
   * are named automatically. The value is `null` only when no name was
   * recorded. */
  readonly name?: string | null;
  /**
   * The origin of the AI session. Currently always `api`. New values
   * may be added, so clients must tolerate values they do not recognize. */
  readonly source: AiSessionV2026R0SourceField =
    'api' as AiSessionV2026R0SourceField;
  /**
   * The OAuth client ID of the application that created the AI session, as
   * shown in the Developer Console. The value is `null` if the application is
   * not known. */
  readonly clientId?: string | null;
  readonly createdBy!: UserBaseV2026R0;
  readonly updatedBy!: UserBaseV2026R0;
  /**
   * The date and time when the AI session was created. */
  readonly createdAt!: DateTime;
  /**
   * The date and time when the AI session was last updated. It advances on
   * each turn of session activity, so it also serves as the most recently
   * used ordering. */
  readonly updatedAt!: DateTime;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiSessionV2026R0, 'type' | 'source'> &
      Partial<Pick<AiSessionV2026R0, 'type' | 'source'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.source !== undefined) {
      this.source = fields.source;
    }
    if (fields.clientId !== undefined) {
      this.clientId = fields.clientId;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.updatedBy !== undefined) {
      this.updatedBy = fields.updatedBy;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.updatedAt !== undefined) {
      this.updatedAt = fields.updatedAt;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiSessionV2026R0Input {
  /**
   * The value is always `ai_session`. */
  readonly type?: AiSessionV2026R0TypeField;
  /**
   * The unique identifier for the AI session. This is also the A2A
   * `contextId` for the conversation. Treat the value as opaque. */
  readonly id: string;
  /**
   * The display name of the AI session. Sessions created through the A2A API
   * are named automatically. The value is `null` only when no name was
   * recorded. */
  readonly name?: string | null;
  /**
   * The origin of the AI session. Currently always `api`. New values
   * may be added, so clients must tolerate values they do not recognize. */
  readonly source?: AiSessionV2026R0SourceField;
  /**
   * The OAuth client ID of the application that created the AI session, as
   * shown in the Developer Console. The value is `null` if the application is
   * not known. */
  readonly clientId?: string | null;
  readonly createdBy: UserBaseV2026R0;
  readonly updatedBy: UserBaseV2026R0;
  /**
   * The date and time when the AI session was created. */
  readonly createdAt: DateTime;
  /**
   * The date and time when the AI session was last updated. It advances on
   * each turn of session activity, so it also serves as the most recently
   * used ordering. */
  readonly updatedAt: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeAiSessionV2026R0TypeField(
  val: AiSessionV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeAiSessionV2026R0TypeField(
  val: SerializedData,
): AiSessionV2026R0TypeField {
  if (val == 'ai_session') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiSessionV2026R0TypeField",
  });
}
export function serializeAiSessionV2026R0SourceField(
  val: AiSessionV2026R0SourceField,
): SerializedData {
  return val;
}
export function deserializeAiSessionV2026R0SourceField(
  val: SerializedData,
): AiSessionV2026R0SourceField {
  if (val == 'api') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiSessionV2026R0SourceField",
  });
}
export function serializeAiSessionV2026R0(
  val: AiSessionV2026R0,
): SerializedData {
  return {
    ['type']: serializeAiSessionV2026R0TypeField(val.type),
    ['id']: val.id,
    ['name']: val.name,
    ['source']: serializeAiSessionV2026R0SourceField(val.source),
    ['client_id']: val.clientId,
    ['created_by']: serializeUserBaseV2026R0(val.createdBy),
    ['updated_by']: serializeUserBaseV2026R0(val.updatedBy),
    ['created_at']: serializeDateTime(val.createdAt),
    ['updated_at']: serializeDateTime(val.updatedAt),
  };
}
export function deserializeAiSessionV2026R0(
  val: SerializedData,
): AiSessionV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSessionV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiSessionV2026R0" to be defined',
    });
  }
  const type: AiSessionV2026R0TypeField = deserializeAiSessionV2026R0TypeField(
    val.type,
  );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiSessionV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiSessionV2026R0"',
    });
  }
  const id: string = val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "AiSessionV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "source" of type "AiSessionV2026R0" to be defined',
    });
  }
  const source: AiSessionV2026R0SourceField =
    deserializeAiSessionV2026R0SourceField(val.source);
  if (!(val.client_id == void 0) && !sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "client_id" of type "AiSessionV2026R0"',
    });
  }
  const clientId: undefined | string =
    val.client_id == void 0 ? void 0 : val.client_id;
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_by" of type "AiSessionV2026R0" to be defined',
    });
  }
  const createdBy: UserBaseV2026R0 = deserializeUserBaseV2026R0(val.created_by);
  if (val.updated_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_by" of type "AiSessionV2026R0" to be defined',
    });
  }
  const updatedBy: UserBaseV2026R0 = deserializeUserBaseV2026R0(val.updated_by);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "AiSessionV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "AiSessionV2026R0"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.updated_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_at" of type "AiSessionV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "updated_at" of type "AiSessionV2026R0"',
    });
  }
  const updatedAt: DateTime = deserializeDateTime(val.updated_at);
  return {
    type: type,
    id: id,
    name: name,
    source: source,
    clientId: clientId,
    createdBy: createdBy,
    updatedBy: updatedBy,
    createdAt: createdAt,
    updatedAt: updatedAt,
  } satisfies AiSessionV2026R0;
}
export function serializeAiSessionV2026R0Input(
  val: AiSessionV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiSessionV2026R0TypeField(val.type),
    ['id']: val.id,
    ['name']: val.name,
    ['source']:
      val.source == void 0
        ? val.source
        : serializeAiSessionV2026R0SourceField(val.source),
    ['client_id']: val.clientId,
    ['created_by']: serializeUserBaseV2026R0(val.createdBy),
    ['updated_by']: serializeUserBaseV2026R0(val.updatedBy),
    ['created_at']: serializeDateTime(val.createdAt),
    ['updated_at']: serializeDateTime(val.updatedAt),
  };
}
export function deserializeAiSessionV2026R0Input(
  val: SerializedData,
): AiSessionV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSessionV2026R0Input"',
    });
  }
  const type: undefined | AiSessionV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeAiSessionV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiSessionV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiSessionV2026R0Input"',
    });
  }
  const id: string = val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "AiSessionV2026R0Input"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const source: undefined | AiSessionV2026R0SourceField =
    val.source == void 0
      ? void 0
      : deserializeAiSessionV2026R0SourceField(val.source);
  if (!(val.client_id == void 0) && !sdIsString(val.client_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "client_id" of type "AiSessionV2026R0Input"',
    });
  }
  const clientId: undefined | string =
    val.client_id == void 0 ? void 0 : val.client_id;
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_by" of type "AiSessionV2026R0Input" to be defined',
    });
  }
  const createdBy: UserBaseV2026R0 = deserializeUserBaseV2026R0(val.created_by);
  if (val.updated_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_by" of type "AiSessionV2026R0Input" to be defined',
    });
  }
  const updatedBy: UserBaseV2026R0 = deserializeUserBaseV2026R0(val.updated_by);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "AiSessionV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AiSessionV2026R0Input"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.updated_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_at" of type "AiSessionV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "AiSessionV2026R0Input"',
    });
  }
  const updatedAt: DateTime = deserializeDateTime(val.updated_at);
  return {
    type: type,
    id: id,
    name: name,
    source: source,
    clientId: clientId,
    createdBy: createdBy,
    updatedBy: updatedBy,
    createdAt: createdAt,
    updatedAt: updatedAt,
  } satisfies AiSessionV2026R0Input;
}
