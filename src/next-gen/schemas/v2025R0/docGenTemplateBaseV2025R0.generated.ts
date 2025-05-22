import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
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
