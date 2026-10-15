import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocGenDocumentGenerationDataV2025R0 {
  /**
   * File name of the output file. */
  readonly generatedFileName: string;
  readonly userInput: {
    readonly [key: string]: any;
  };
  /**
   * An optional identifier supplied by the caller for this Box Doc Gen job.
   * The value is returned on job responses for correlation only. It is not
   * a Box resource ID, is not required to be unique, and cannot be used to
   * look up the job. */
  readonly externalId?: string;
  readonly rawData?: SerializedData;
}
export function serializeDocGenDocumentGenerationDataV2025R0(
  val: DocGenDocumentGenerationDataV2025R0,
): SerializedData {
  return {
    ['generated_file_name']: val.generatedFileName,
    ['user_input']: Object.fromEntries(
      Object.entries(val.userInput).map(([k, v]: [string, any]) => [
        k,
        (function (v: any): any {
          return v;
        })(v),
      ]),
    ) as {
      readonly [key: string]: any;
    },
    ['external_id']: val.externalId,
  };
}
export function deserializeDocGenDocumentGenerationDataV2025R0(
  val: SerializedData,
): DocGenDocumentGenerationDataV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenDocumentGenerationDataV2025R0"',
    });
  }
  if (val.generated_file_name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "generated_file_name" of type "DocGenDocumentGenerationDataV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.generated_file_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "generated_file_name" of type "DocGenDocumentGenerationDataV2025R0"',
    });
  }
  const generatedFileName: string = val.generated_file_name;
  if (val.user_input == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user_input" of type "DocGenDocumentGenerationDataV2025R0" to be defined',
    });
  }
  if (!sdIsMap(val.user_input)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "user_input" of type "DocGenDocumentGenerationDataV2025R0"',
    });
  }
  const userInput: {
    readonly [key: string]: any;
  } = sdIsMap(val.user_input)
    ? (Object.fromEntries(
        Object.entries(val.user_input).map(([k, v]: [string, any]) => [
          k,
          (function (v: any): any {
            return v;
          })(v),
        ]),
      ) as {
        readonly [key: string]: any;
      })
    : {};
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_id" of type "DocGenDocumentGenerationDataV2025R0"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  return {
    generatedFileName: generatedFileName,
    userInput: userInput,
    externalId: externalId,
  } satisfies DocGenDocumentGenerationDataV2025R0;
}
