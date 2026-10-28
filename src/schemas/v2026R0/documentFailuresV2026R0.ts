import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocumentFailuresV2026R0 {
  /**
   * A list of errors that occurred during the document job. */
  readonly errors: readonly string[];
  /**
   * A list of warnings that occurred during the document job. */
  readonly warnings: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeDocumentFailuresV2026R0(
  val: DocumentFailuresV2026R0,
): SerializedData {
  return {
    ['errors']: val.errors.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
    ['warnings']: val.warnings.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeDocumentFailuresV2026R0(
  val: SerializedData,
): DocumentFailuresV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentFailuresV2026R0"',
    });
  }
  if (val.errors == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "errors" of type "DocumentFailuresV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.errors)) {
    throw new BoxSdkError({
      message: 'Expecting array for "errors" of type "DocumentFailuresV2026R0"',
    });
  }
  const errors: readonly string[] = sdIsList(val.errors)
    ? (val.errors.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "DocumentFailuresV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  if (val.warnings == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "warnings" of type "DocumentFailuresV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.warnings)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "warnings" of type "DocumentFailuresV2026R0"',
    });
  }
  const warnings: readonly string[] = sdIsList(val.warnings)
    ? (val.warnings.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "DocumentFailuresV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    errors: errors,
    warnings: warnings,
  } satisfies DocumentFailuresV2026R0;
}
