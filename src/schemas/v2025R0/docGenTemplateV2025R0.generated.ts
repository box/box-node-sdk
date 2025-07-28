import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { serializeDocGenTemplateBaseV2025R0 } from './docGenTemplateBaseV2025R0.generated.js';
import { deserializeDocGenTemplateBaseV2025R0 } from './docGenTemplateBaseV2025R0.generated.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { DocGenTemplateBaseV2025R0 } from './docGenTemplateBaseV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type DocGenTemplateV2025R0 = DocGenTemplateBaseV2025R0 & {
  /**
   * The name of the template. */
  readonly fileName?: string | null;
};
export function serializeDocGenTemplateV2025R0(
  val: DocGenTemplateV2025R0,
): SerializedData {
  const base: any = serializeDocGenTemplateBaseV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTemplateV2025R0"',
    });
  }
  return { ...base, ...{ ['file_name']: val.fileName } };
}
export function deserializeDocGenTemplateV2025R0(
  val: SerializedData,
): DocGenTemplateV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTemplateV2025R0"',
    });
  }
  if (!(val.file_name == void 0) && !sdIsString(val.file_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "file_name" of type "DocGenTemplateV2025R0"',
    });
  }
  const fileName: undefined | string =
    val.file_name == void 0 ? void 0 : val.file_name;
  const file: undefined | FileReferenceV2025R0 =
    val.file == void 0 ? void 0 : deserializeFileReferenceV2025R0(val.file);
  return { fileName: fileName, file: file } satisfies DocGenTemplateV2025R0;
}
