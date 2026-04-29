import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type AutomateWorkflowReferenceV2026R0TypeField = 'workflow';
export class AutomateWorkflowReferenceV2026R0 {
  /**
   * The identifier for the Automate workflow instance. */
  readonly id!: string;
  /**
   * The object type. */
  readonly type: AutomateWorkflowReferenceV2026R0TypeField =
    'workflow' as AutomateWorkflowReferenceV2026R0TypeField;
  /**
   * The display name for the Automate workflow. */
  readonly name?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AutomateWorkflowReferenceV2026R0, 'type'> &
      Partial<Pick<AutomateWorkflowReferenceV2026R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AutomateWorkflowReferenceV2026R0Input {
  /**
   * The identifier for the Automate workflow instance. */
  readonly id: string;
  /**
   * The object type. */
  readonly type?: AutomateWorkflowReferenceV2026R0TypeField;
  /**
   * The display name for the Automate workflow. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export function serializeAutomateWorkflowReferenceV2026R0TypeField(
  val: AutomateWorkflowReferenceV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeAutomateWorkflowReferenceV2026R0TypeField(
  val: SerializedData,
): AutomateWorkflowReferenceV2026R0TypeField {
  if (val == 'workflow') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AutomateWorkflowReferenceV2026R0TypeField",
  });
}
export function serializeAutomateWorkflowReferenceV2026R0(
  val: AutomateWorkflowReferenceV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAutomateWorkflowReferenceV2026R0TypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeAutomateWorkflowReferenceV2026R0(
  val: SerializedData,
): AutomateWorkflowReferenceV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowReferenceV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AutomateWorkflowReferenceV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AutomateWorkflowReferenceV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AutomateWorkflowReferenceV2026R0" to be defined',
    });
  }
  const type: AutomateWorkflowReferenceV2026R0TypeField =
    deserializeAutomateWorkflowReferenceV2026R0TypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "AutomateWorkflowReferenceV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    id: id,
    type: type,
    name: name,
  } satisfies AutomateWorkflowReferenceV2026R0;
}
export function serializeAutomateWorkflowReferenceV2026R0Input(
  val: AutomateWorkflowReferenceV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAutomateWorkflowReferenceV2026R0TypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeAutomateWorkflowReferenceV2026R0Input(
  val: SerializedData,
): AutomateWorkflowReferenceV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowReferenceV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AutomateWorkflowReferenceV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AutomateWorkflowReferenceV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | AutomateWorkflowReferenceV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeAutomateWorkflowReferenceV2026R0TypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "AutomateWorkflowReferenceV2026R0Input"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    id: id,
    type: type,
    name: name,
  } satisfies AutomateWorkflowReferenceV2026R0Input;
}
