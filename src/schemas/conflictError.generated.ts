import { serializeClientErrorTypeField } from './clientError.generated.js';
import { deserializeClientErrorTypeField } from './clientError.generated.js';
import { serializeClientErrorCodeField } from './clientError.generated.js';
import { deserializeClientErrorCodeField } from './clientError.generated.js';
import { serializeClientError } from './clientError.generated.js';
import { deserializeClientError } from './clientError.generated.js';
import { serializeFileConflict } from './fileConflict.generated.js';
import { deserializeFileConflict } from './fileConflict.generated.js';
import { ClientErrorTypeField } from './clientError.generated.js';
import { ClientErrorCodeField } from './clientError.generated.js';
import { ClientError } from './clientError.generated.js';
import { FileConflict } from './fileConflict.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface ConflictErrorContextInfoField {
  /**
   * A list of the file conflicts that caused this error. */
  readonly conflicts?: readonly FileConflict[];
  readonly rawData?: SerializedData;
}
export type ConflictError = ClientError & {};
export function serializeConflictErrorContextInfoField(
  val: ConflictErrorContextInfoField,
): SerializedData {
  return {
    ['conflicts']:
      val.conflicts == void 0
        ? val.conflicts
        : (val.conflicts.map(function (item: FileConflict): SerializedData {
            return serializeFileConflict(item);
          }) as readonly any[]),
  };
}
export function deserializeConflictErrorContextInfoField(
  val: SerializedData,
): ConflictErrorContextInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ConflictErrorContextInfoField"',
    });
  }
  if (!(val.conflicts == void 0) && !sdIsList(val.conflicts)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "conflicts" of type "ConflictErrorContextInfoField"',
    });
  }
  const conflicts: undefined | readonly FileConflict[] =
    val.conflicts == void 0
      ? void 0
      : sdIsList(val.conflicts)
        ? (val.conflicts.map(function (itm: SerializedData): FileConflict {
            return deserializeFileConflict(itm);
          }) as readonly any[])
        : [];
  return { conflicts: conflicts } satisfies ConflictErrorContextInfoField;
}
export function serializeConflictError(val: ConflictError): SerializedData {
  const base: any = serializeClientError(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ConflictError"' });
  }
  return { ...base, ...{} };
}
export function deserializeConflictError(val: SerializedData): ConflictError {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ConflictError"' });
  }
  const type: undefined | ClientErrorTypeField =
    val.type == void 0 ? void 0 : deserializeClientErrorTypeField(val.type);
  if (!(val.status == void 0) && !sdIsNumber(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting number for "status" of type "ConflictError"',
    });
  }
  const status: undefined | number = val.status == void 0 ? void 0 : val.status;
  const code: undefined | ClientErrorCodeField =
    val.code == void 0 ? void 0 : deserializeClientErrorCodeField(val.code);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "ConflictError"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.context_info == void 0) && !sdIsMap(val.context_info)) {
    throw new BoxSdkError({
      message: 'Expecting object for "context_info" of type "ConflictError"',
    });
  }
  const contextInfo:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.context_info == void 0
      ? void 0
      : sdIsMap(val.context_info)
        ? (Object.fromEntries(
            Object.entries(val.context_info).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (!(val.help_url == void 0) && !sdIsString(val.help_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "help_url" of type "ConflictError"',
    });
  }
  const helpUrl: undefined | string =
    val.help_url == void 0 ? void 0 : val.help_url;
  if (!(val.request_id == void 0) && !sdIsString(val.request_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "request_id" of type "ConflictError"',
    });
  }
  const requestId: undefined | string =
    val.request_id == void 0 ? void 0 : val.request_id;
  return {
    type: type,
    status: status,
    code: code,
    message: message,
    contextInfo: contextInfo,
    helpUrl: helpUrl,
    requestId: requestId,
  } satisfies ConflictError;
}
