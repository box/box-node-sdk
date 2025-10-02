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
export interface DocGenTemplateCreateRequestV2025R0 {
  readonly file: FileReferenceV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeDocGenTemplateCreateRequestV2025R0(
  val: DocGenTemplateCreateRequestV2025R0,
): SerializedData {
  return { ['file']: serializeFileReferenceV2025R0(val.file) };
}
export function deserializeDocGenTemplateCreateRequestV2025R0(
  val: SerializedData,
): DocGenTemplateCreateRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTemplateCreateRequestV2025R0"',
    });
  }
  if (val.file == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "file" of type "DocGenTemplateCreateRequestV2025R0" to be defined',
    });
  }
  const file: FileReferenceV2025R0 = deserializeFileReferenceV2025R0(val.file);
  return { file: file } satisfies DocGenTemplateCreateRequestV2025R0;
}
