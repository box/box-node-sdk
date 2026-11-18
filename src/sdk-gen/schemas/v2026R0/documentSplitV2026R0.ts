import { serializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { deserializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { serializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { deserializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { serializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { deserializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { serializeFileReferenceV2026R0 } from './fileReferenceV2026R0';
import { deserializeFileReferenceV2026R0 } from './fileReferenceV2026R0';
import { serializeDocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { deserializeDocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { serializeDocumentSplitOutputV2026R0 } from './documentSplitOutputV2026R0';
import { deserializeDocumentSplitOutputV2026R0 } from './documentSplitOutputV2026R0';
import { serializeFolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { deserializeFolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { serializeUserMiniV2026R0 } from './userMiniV2026R0';
import { deserializeUserMiniV2026R0 } from './userMiniV2026R0';
import { serializeEnterpriseReferenceV2026R0 } from './enterpriseReferenceV2026R0';
import { deserializeEnterpriseReferenceV2026R0 } from './enterpriseReferenceV2026R0';
import { serializeDocumentSplitFailuresV2026R0 } from './documentSplitFailuresV2026R0';
import { deserializeDocumentSplitFailuresV2026R0 } from './documentSplitFailuresV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { DocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { DocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { DocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { FileReferenceV2026R0 } from './fileReferenceV2026R0';
import { DocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { DocumentSplitOutputV2026R0 } from './documentSplitOutputV2026R0';
import { FolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { UserMiniV2026R0 } from './userMiniV2026R0';
import { EnterpriseReferenceV2026R0 } from './enterpriseReferenceV2026R0';
import { DocumentSplitFailuresV2026R0 } from './documentSplitFailuresV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitV2026R0TypeField = 'document_split';
export type DocumentSplitV2026R0StatusField =
  | 'submitted'
  | 'completed'
  | 'failed'
  | 'completed_with_error'
  | string;
export type DocumentSplitV2026R0InputSourceField =
  | 'api'
  | 'box'
  | 'relay'
  | 'salesforce'
  | string;
export class DocumentSplitV2026R0 {
  /**
   * The unique identifier for the Document Split job. */
  readonly id!: string;
  /**
   * The value will always be `document_split`. */
  readonly type: DocumentSplitV2026R0TypeField =
    'document_split' as DocumentSplitV2026R0TypeField;
  readonly sourceFile!: FileReferenceV2026R0;
  /**
   * The current state of the Document Split job. */
  readonly status!: DocumentSplitV2026R0StatusField;
  readonly splitInput!: DocumentSplitCreateRequestTypeV2026R0;
  /**
   * The result of the Document Split job. `null` until the job has produced
   * output. */
  readonly output?: DocumentSplitOutputV2026R0;
  readonly destinationFolder!: FolderReferenceV2026R0;
  /**
   * The system that initiated the request, used for analytics and
   * traceability. */
  readonly inputSource!: DocumentSplitV2026R0InputSourceField;
  /**
   * When the Document Split job was created. */
  readonly createdAt?: DateTime;
  readonly createdBy?: UserMiniV2026R0;
  readonly enterprise?: EnterpriseReferenceV2026R0;
  /**
   * Errors and warnings that occurred during the document split. `null` when
   * no failures were recorded. */
  readonly failures?: DocumentSplitFailuresV2026R0;
  /**
   * An optional identifier supplied by the caller when the Document Split
   * job was created. Returned for correlation only. It is not a Box
   * resource ID, is not required to be unique, and cannot be used to
   * look up the job. */
  readonly externalId?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitV2026R0, 'type'> &
      Partial<Pick<DocumentSplitV2026R0, 'type'>>
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.sourceFile !== undefined) {
      this.sourceFile = fields.sourceFile;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.splitInput !== undefined) {
      this.splitInput = fields.splitInput;
    }
    if (fields.output !== undefined) {
      this.output = fields.output;
    }
    if (fields.destinationFolder !== undefined) {
      this.destinationFolder = fields.destinationFolder;
    }
    if (fields.inputSource !== undefined) {
      this.inputSource = fields.inputSource;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.enterprise !== undefined) {
      this.enterprise = fields.enterprise;
    }
    if (fields.failures !== undefined) {
      this.failures = fields.failures;
    }
    if (fields.externalId !== undefined) {
      this.externalId = fields.externalId;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitV2026R0Input {
  /**
   * The unique identifier for the Document Split job. */
  readonly id: string;
  /**
   * The value will always be `document_split`. */
  readonly type?: DocumentSplitV2026R0TypeField;
  readonly sourceFile: FileReferenceV2026R0;
  /**
   * The current state of the Document Split job. */
  readonly status: DocumentSplitV2026R0StatusField;
  readonly splitInput: DocumentSplitCreateRequestTypeV2026R0;
  /**
   * The result of the Document Split job. `null` until the job has produced
   * output. */
  readonly output?: DocumentSplitOutputV2026R0;
  readonly destinationFolder: FolderReferenceV2026R0;
  /**
   * The system that initiated the request, used for analytics and
   * traceability. */
  readonly inputSource: DocumentSplitV2026R0InputSourceField;
  /**
   * When the Document Split job was created. */
  readonly createdAt?: DateTime;
  readonly createdBy?: UserMiniV2026R0;
  readonly enterprise?: EnterpriseReferenceV2026R0;
  /**
   * Errors and warnings that occurred during the document split. `null` when
   * no failures were recorded. */
  readonly failures?: DocumentSplitFailuresV2026R0;
  /**
   * An optional identifier supplied by the caller when the Document Split
   * job was created. Returned for correlation only. It is not a Box
   * resource ID, is not required to be unique, and cannot be used to
   * look up the job. */
  readonly externalId?: string;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitV2026R0TypeField(
  val: DocumentSplitV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitV2026R0TypeField(
  val: SerializedData
): DocumentSplitV2026R0TypeField {
  if (val == 'document_split') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitV2026R0TypeField",
  });
}
export function serializeDocumentSplitV2026R0StatusField(
  val: DocumentSplitV2026R0StatusField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitV2026R0StatusField(
  val: SerializedData
): DocumentSplitV2026R0StatusField {
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
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitV2026R0StatusField",
  });
}
export function serializeDocumentSplitV2026R0InputSourceField(
  val: DocumentSplitV2026R0InputSourceField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitV2026R0InputSourceField(
  val: SerializedData
): DocumentSplitV2026R0InputSourceField {
  if (val == 'api') {
    return val;
  }
  if (val == 'box') {
    return val;
  }
  if (val == 'relay') {
    return val;
  }
  if (val == 'salesforce') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitV2026R0InputSourceField",
  });
}
export function serializeDocumentSplitV2026R0(
  val: DocumentSplitV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeDocumentSplitV2026R0TypeField(val.type),
    ['source_file']: serializeFileReferenceV2026R0(val.sourceFile),
    ['status']: serializeDocumentSplitV2026R0StatusField(val.status),
    ['split_input']: serializeDocumentSplitCreateRequestTypeV2026R0(
      val.splitInput
    ),
    ['output']:
      val.output == void 0
        ? val.output
        : serializeDocumentSplitOutputV2026R0(val.output),
    ['destination_folder']: serializeFolderReferenceV2026R0(
      val.destinationFolder
    ),
    ['input_source']: serializeDocumentSplitV2026R0InputSourceField(
      val.inputSource
    ),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMiniV2026R0(val.createdBy),
    ['enterprise']:
      val.enterprise == void 0
        ? val.enterprise
        : serializeEnterpriseReferenceV2026R0(val.enterprise),
    ['failures']:
      val.failures == void 0
        ? val.failures
        : serializeDocumentSplitFailuresV2026R0(val.failures),
    ['external_id']: val.externalId,
  };
}
export function deserializeDocumentSplitV2026R0(
  val: SerializedData
): DocumentSplitV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocumentSplitV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const type: DocumentSplitV2026R0TypeField =
    deserializeDocumentSplitV2026R0TypeField(val.type);
  if (val.source_file == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_file" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const sourceFile: FileReferenceV2026R0 = deserializeFileReferenceV2026R0(
    val.source_file
  );
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const status: DocumentSplitV2026R0StatusField =
    deserializeDocumentSplitV2026R0StatusField(val.status);
  if (val.split_input == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_input" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const splitInput: DocumentSplitCreateRequestTypeV2026R0 =
    deserializeDocumentSplitCreateRequestTypeV2026R0(val.split_input);
  const output: DocumentSplitOutputV2026R0 | undefined =
    val.output == void 0
      ? void 0
      : deserializeDocumentSplitOutputV2026R0(val.output);
  if (val.destination_folder == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "destination_folder" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const destinationFolder: FolderReferenceV2026R0 =
    deserializeFolderReferenceV2026R0(val.destination_folder);
  if (val.input_source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "input_source" of type "DocumentSplitV2026R0" to be defined',
    });
  }
  const inputSource: DocumentSplitV2026R0InputSourceField =
    deserializeDocumentSplitV2026R0InputSourceField(val.input_source);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "DocumentSplitV2026R0"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserMiniV2026R0 =
    val.created_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.created_by);
  const enterprise: undefined | EnterpriseReferenceV2026R0 =
    val.enterprise == void 0
      ? void 0
      : deserializeEnterpriseReferenceV2026R0(val.enterprise);
  const failures: DocumentSplitFailuresV2026R0 | undefined =
    val.failures == void 0
      ? void 0
      : deserializeDocumentSplitFailuresV2026R0(val.failures);
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_id" of type "DocumentSplitV2026R0"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  return {
    id: id,
    type: type,
    sourceFile: sourceFile,
    status: status,
    splitInput: splitInput,
    output: output,
    destinationFolder: destinationFolder,
    inputSource: inputSource,
    createdAt: createdAt,
    createdBy: createdBy,
    enterprise: enterprise,
    failures: failures,
    externalId: externalId,
  } satisfies DocumentSplitV2026R0;
}
export function serializeDocumentSplitV2026R0Input(
  val: DocumentSplitV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocumentSplitV2026R0TypeField(val.type),
    ['source_file']: serializeFileReferenceV2026R0(val.sourceFile),
    ['status']: serializeDocumentSplitV2026R0StatusField(val.status),
    ['split_input']: serializeDocumentSplitCreateRequestTypeV2026R0(
      val.splitInput
    ),
    ['output']:
      val.output == void 0
        ? val.output
        : serializeDocumentSplitOutputV2026R0(val.output),
    ['destination_folder']: serializeFolderReferenceV2026R0(
      val.destinationFolder
    ),
    ['input_source']: serializeDocumentSplitV2026R0InputSourceField(
      val.inputSource
    ),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMiniV2026R0(val.createdBy),
    ['enterprise']:
      val.enterprise == void 0
        ? val.enterprise
        : serializeEnterpriseReferenceV2026R0(val.enterprise),
    ['failures']:
      val.failures == void 0
        ? val.failures
        : serializeDocumentSplitFailuresV2026R0(val.failures),
    ['external_id']: val.externalId,
  };
}
export function deserializeDocumentSplitV2026R0Input(
  val: SerializedData
): DocumentSplitV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocumentSplitV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | DocumentSplitV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocumentSplitV2026R0TypeField(val.type);
  if (val.source_file == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_file" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  const sourceFile: FileReferenceV2026R0 = deserializeFileReferenceV2026R0(
    val.source_file
  );
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  const status: DocumentSplitV2026R0StatusField =
    deserializeDocumentSplitV2026R0StatusField(val.status);
  if (val.split_input == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_input" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  const splitInput: DocumentSplitCreateRequestTypeV2026R0 =
    deserializeDocumentSplitCreateRequestTypeV2026R0(val.split_input);
  const output: DocumentSplitOutputV2026R0 | undefined =
    val.output == void 0
      ? void 0
      : deserializeDocumentSplitOutputV2026R0(val.output);
  if (val.destination_folder == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "destination_folder" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  const destinationFolder: FolderReferenceV2026R0 =
    deserializeFolderReferenceV2026R0(val.destination_folder);
  if (val.input_source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "input_source" of type "DocumentSplitV2026R0Input" to be defined',
    });
  }
  const inputSource: DocumentSplitV2026R0InputSourceField =
    deserializeDocumentSplitV2026R0InputSourceField(val.input_source);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "DocumentSplitV2026R0Input"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserMiniV2026R0 =
    val.created_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.created_by);
  const enterprise: undefined | EnterpriseReferenceV2026R0 =
    val.enterprise == void 0
      ? void 0
      : deserializeEnterpriseReferenceV2026R0(val.enterprise);
  const failures: DocumentSplitFailuresV2026R0 | undefined =
    val.failures == void 0
      ? void 0
      : deserializeDocumentSplitFailuresV2026R0(val.failures);
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_id" of type "DocumentSplitV2026R0Input"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  return {
    id: id,
    type: type,
    sourceFile: sourceFile,
    status: status,
    splitInput: splitInput,
    output: output,
    destinationFolder: destinationFolder,
    inputSource: inputSource,
    createdAt: createdAt,
    createdBy: createdBy,
    enterprise: enterprise,
    failures: failures,
    externalId: externalId,
  } satisfies DocumentSplitV2026R0Input;
}
