import { serializeDocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0.generated.js';
import { deserializeDocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0.generated.js';
import { serializeDocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0.generated.js';
import { deserializeDocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0.generated.js';
import { serializeDocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0.generated.js';
import { deserializeDocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0.generated.js';
import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { serializeFileVersionBaseV2025R0 } from './fileVersionBaseV2025R0.generated.js';
import { deserializeFileVersionBaseV2025R0 } from './fileVersionBaseV2025R0.generated.js';
import { DocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0.generated.js';
import { DocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0.generated.js';
import { DocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0.generated.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { FileVersionBaseV2025R0 } from './fileVersionBaseV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type DocGenJobV2025R0StatusField =
  | 'submitted'
  | 'completed'
  | 'failed'
  | 'completed_with_error'
  | 'pending'
  | string;
export class DocGenJobV2025R0 extends DocGenJobBaseV2025R0 {
  readonly batch!: DocGenBatchBaseV2025R0;
  readonly templateFile!: FileReferenceV2025R0;
  readonly templateFileVersion!: FileVersionBaseV2025R0;
  readonly outputFile?: FileReferenceV2025R0 | undefined;
  readonly outputFileVersion?: FileVersionBaseV2025R0 | undefined;
  readonly status!: DocGenJobV2025R0StatusField;
  readonly outputType!: string;
  constructor(fields: DocGenJobV2025R0) {
    super(fields);
    if (fields.batch !== undefined) {
      this.batch = fields.batch;
    }
    if (fields.templateFile !== undefined) {
      this.templateFile = fields.templateFile;
    }
    if (fields.templateFileVersion !== undefined) {
      this.templateFileVersion = fields.templateFileVersion;
    }
    if (fields.outputFile !== undefined) {
      this.outputFile = fields.outputFile;
    }
    if (fields.outputFileVersion !== undefined) {
      this.outputFileVersion = fields.outputFileVersion;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.outputType !== undefined) {
      this.outputType = fields.outputType;
    }
  }
}
export function serializeDocGenJobV2025R0StatusField(
  val: DocGenJobV2025R0StatusField,
): SerializedData {
  return val;
}
export function deserializeDocGenJobV2025R0StatusField(
  val: SerializedData,
): DocGenJobV2025R0StatusField {
  if (val == 'submitted') {
    return val;
  }
  if (val == 'completed') {
    return val;
  }
  if (val == 'failed') {
    return val;
  }
  if (val == 'completed_with_error') {
    return val;
  }
  if (val == 'pending') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocGenJobV2025R0StatusField",
  });
}
export function serializeDocGenJobV2025R0(
  val: DocGenJobV2025R0,
): SerializedData {
  const base: any = serializeDocGenJobBaseV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobV2025R0"',
    });
  }
  return {
    ...base,
    ...{
      ['batch']: serializeDocGenBatchBaseV2025R0(val.batch),
      ['template_file']: serializeFileReferenceV2025R0(val.templateFile),
      ['template_file_version']: serializeFileVersionBaseV2025R0(
        val.templateFileVersion,
      ),
      ['output_file']:
        val.outputFile == void 0
          ? val.outputFile
          : val.outputFile == void 0
            ? val.outputFile
            : serializeFileReferenceV2025R0(val.outputFile),
      ['output_file_version']:
        val.outputFileVersion == void 0
          ? val.outputFileVersion
          : val.outputFileVersion == void 0
            ? val.outputFileVersion
            : serializeFileVersionBaseV2025R0(val.outputFileVersion),
      ['status']: serializeDocGenJobV2025R0StatusField(val.status),
      ['output_type']: val.outputType,
    },
  };
}
export function deserializeDocGenJobV2025R0(
  val: SerializedData,
): DocGenJobV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobV2025R0"',
    });
  }
  if (val.batch == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "batch" of type "DocGenJobV2025R0" to be defined',
    });
  }
  const batch: DocGenBatchBaseV2025R0 = deserializeDocGenBatchBaseV2025R0(
    val.batch,
  );
  if (val.template_file == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "template_file" of type "DocGenJobV2025R0" to be defined',
    });
  }
  const templateFile: FileReferenceV2025R0 = deserializeFileReferenceV2025R0(
    val.template_file,
  );
  if (val.template_file_version == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "template_file_version" of type "DocGenJobV2025R0" to be defined',
    });
  }
  const templateFileVersion: FileVersionBaseV2025R0 =
    deserializeFileVersionBaseV2025R0(val.template_file_version);
  const outputFile: undefined | (FileReferenceV2025R0 | undefined) =
    val.output_file == void 0
      ? void 0
      : val.output_file == void 0
        ? void 0
        : deserializeFileReferenceV2025R0(val.output_file);
  const outputFileVersion: undefined | (FileVersionBaseV2025R0 | undefined) =
    val.output_file_version == void 0
      ? void 0
      : val.output_file_version == void 0
        ? void 0
        : deserializeFileVersionBaseV2025R0(val.output_file_version);
  if (val.status == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "status" of type "DocGenJobV2025R0" to be defined',
    });
  }
  const status: DocGenJobV2025R0StatusField =
    deserializeDocGenJobV2025R0StatusField(val.status);
  if (val.output_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "output_type" of type "DocGenJobV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.output_type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "output_type" of type "DocGenJobV2025R0"',
    });
  }
  const outputType: string = val.output_type;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "DocGenJobV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocGenJobV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "DocGenJobV2025R0" to be defined',
    });
  }
  const type: DocGenJobBaseV2025R0TypeField =
    deserializeDocGenJobBaseV2025R0TypeField(val.type);
  return {
    batch: batch,
    templateFile: templateFile,
    templateFileVersion: templateFileVersion,
    outputFile: outputFile,
    outputFileVersion: outputFileVersion,
    status: status,
    outputType: outputType,
    id: id,
    type: type,
  } satisfies DocGenJobV2025R0;
}
