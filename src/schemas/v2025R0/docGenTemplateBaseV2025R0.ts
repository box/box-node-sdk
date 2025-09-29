import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocGenTemplateBaseV2025R0 {
  readonly file?: FileReferenceV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeDocGenTemplateBaseV2025R0(
  val: DocGenTemplateBaseV2025R0,
): SerializedData {
  return {
    ['file']:
      val.file == void 0 ? val.file : serializeFileReferenceV2025R0(val.file),
  };
}
export function deserializeDocGenTemplateBaseV2025R0(
  val: SerializedData,
): DocGenTemplateBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTemplateBaseV2025R0"',
    });
  }
  const file: undefined | FileReferenceV2025R0 =
    val.file == void 0 ? void 0 : deserializeFileReferenceV2025R0(val.file);
  return { file: file } satisfies DocGenTemplateBaseV2025R0;
}
