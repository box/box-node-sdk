import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface AutomateWorkflowStartRequestV2026R0 {
  /**
   * The callable action ID used to trigger the selected workflow. */
  readonly workflowActionId: string;
  /**
   * The files to process with the selected workflow. */
  readonly fileIds: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeAutomateWorkflowStartRequestV2026R0(
  val: AutomateWorkflowStartRequestV2026R0,
): SerializedData {
  return {
    ['workflow_action_id']: val.workflowActionId,
    ['file_ids']: val.fileIds.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeAutomateWorkflowStartRequestV2026R0(
  val: SerializedData,
): AutomateWorkflowStartRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowStartRequestV2026R0"',
    });
  }
  if (val.workflow_action_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "workflow_action_id" of type "AutomateWorkflowStartRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.workflow_action_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "workflow_action_id" of type "AutomateWorkflowStartRequestV2026R0"',
    });
  }
  const workflowActionId: string = val.workflow_action_id;
  if (val.file_ids == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "file_ids" of type "AutomateWorkflowStartRequestV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.file_ids)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "file_ids" of type "AutomateWorkflowStartRequestV2026R0"',
    });
  }
  const fileIds: readonly string[] = sdIsList(val.file_ids)
    ? (val.file_ids.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message:
              'Expecting string for "AutomateWorkflowStartRequestV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    workflowActionId: workflowActionId,
    fileIds: fileIds,
  } satisfies AutomateWorkflowStartRequestV2026R0;
}
