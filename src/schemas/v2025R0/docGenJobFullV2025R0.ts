import { serializeDocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0';
import { deserializeDocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0';
import { serializeDocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0';
import { deserializeDocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0';
import { serializeDocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0';
import { deserializeDocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0';
import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { serializeFileVersionBaseV2025R0 } from './fileVersionBaseV2025R0';
import { deserializeFileVersionBaseV2025R0 } from './fileVersionBaseV2025R0';
import { serializeDocGenJobV2025R0StatusField } from './docGenJobV2025R0';
import { deserializeDocGenJobV2025R0StatusField } from './docGenJobV2025R0';
import { serializeDocGenJobV2025R0 } from './docGenJobV2025R0';
import { deserializeDocGenJobV2025R0 } from './docGenJobV2025R0';
import { serializeUserBaseV2025R0 } from './userBaseV2025R0';
import { deserializeUserBaseV2025R0 } from './userBaseV2025R0';
import { serializeEnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0';
import { deserializeEnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0';
import { DocGenJobBaseV2025R0TypeField } from './docGenJobBaseV2025R0';
import { DocGenJobBaseV2025R0 } from './docGenJobBaseV2025R0';
import { DocGenBatchBaseV2025R0 } from './docGenBatchBaseV2025R0';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0';
import { FileVersionBaseV2025R0 } from './fileVersionBaseV2025R0';
import { DocGenJobV2025R0StatusField } from './docGenJobV2025R0';
import { DocGenJobV2025R0 } from './docGenJobV2025R0';
import { UserBaseV2025R0 } from './userBaseV2025R0';
import { EnterpriseReferenceV2025R0 } from './enterpriseReferenceV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export class DocGenJobFullV2025R0 extends DocGenJobV2025R0 {
  readonly createdAt?: string;
  readonly createdBy!: UserBaseV2025R0;
  readonly enterprise!: EnterpriseReferenceV2025R0;
  readonly source!: string;
  constructor(fields: DocGenJobFullV2025R0) {
    super(fields);
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.enterprise !== undefined) {
      this.enterprise = fields.enterprise;
    }
    if (fields.source !== undefined) {
      this.source = fields.source;
    }
  }
}
export function serializeDocGenJobFullV2025R0(
  val: DocGenJobFullV2025R0,
): SerializedData {
  const base: any = serializeDocGenJobV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobFullV2025R0"',
    });
  }
  return {
    ...base,
    ...{
      ['created_at']: val.createdAt,
      ['created_by']: serializeUserBaseV2025R0(val.createdBy),
      ['enterprise']: serializeEnterpriseReferenceV2025R0(val.enterprise),
      ['source']: val.source,
    },
  };
}
export function deserializeDocGenJobFullV2025R0(
  val: SerializedData,
): DocGenJobFullV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobFullV2025R0"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "DocGenJobFullV2025R0"',
    });
  }
  const createdAt: undefined | string =
    val.created_at == void 0 ? void 0 : val.created_at;
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_by" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const createdBy: UserBaseV2025R0 = deserializeUserBaseV2025R0(val.created_by);
  if (val.enterprise == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "enterprise" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const enterprise: EnterpriseReferenceV2025R0 =
    deserializeEnterpriseReferenceV2025R0(val.enterprise);
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.source)) {
    throw new BoxSdkError({
      message: 'Expecting string for "source" of type "DocGenJobFullV2025R0"',
    });
  }
  const source: string = val.source;
  if (val.batch == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "batch" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const batch: DocGenBatchBaseV2025R0 = deserializeDocGenBatchBaseV2025R0(
    val.batch,
  );
  if (val.template_file == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "template_file" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const templateFile: FileReferenceV2025R0 = deserializeFileReferenceV2025R0(
    val.template_file,
  );
  if (val.template_file_version == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "template_file_version" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const templateFileVersion: FileVersionBaseV2025R0 =
    deserializeFileVersionBaseV2025R0(val.template_file_version);
  const outputFile: FileReferenceV2025R0 | undefined =
    val.output_file == void 0
      ? void 0
      : deserializeFileReferenceV2025R0(val.output_file);
  const outputFileVersion: FileVersionBaseV2025R0 | undefined =
    val.output_file_version == void 0
      ? void 0
      : deserializeFileVersionBaseV2025R0(val.output_file_version);
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const status: DocGenJobV2025R0StatusField =
    deserializeDocGenJobV2025R0StatusField(val.status);
  if (val.output_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "output_type" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.output_type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "output_type" of type "DocGenJobFullV2025R0"',
    });
  }
  const outputType: string = val.output_type;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocGenJobFullV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "DocGenJobFullV2025R0" to be defined',
    });
  }
  const type: DocGenJobBaseV2025R0TypeField =
    deserializeDocGenJobBaseV2025R0TypeField(val.type);
  return {
    createdAt: createdAt,
    createdBy: createdBy,
    enterprise: enterprise,
    source: source,
    batch: batch,
    templateFile: templateFile,
    templateFileVersion: templateFileVersion,
    outputFile: outputFile,
    outputFileVersion: outputFileVersion,
    status: status,
    outputType: outputType,
    id: id,
    type: type,
  } satisfies DocGenJobFullV2025R0;
}
