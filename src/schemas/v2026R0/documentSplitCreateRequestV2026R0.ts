import { serializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { deserializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { serializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { deserializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { serializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { deserializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { serializeDocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { deserializeDocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { DocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { DocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { DocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { DocumentSplitCreateRequestTypeV2026R0 } from './documentSplitCreateRequestTypeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateRequestV2026R0InputSourceField =
  'api' | 'box' | 'relay' | 'salesforce' | string;
export interface DocumentSplitCreateRequestV2026R0 {
  /**
   * The ID of the source file to split. */
  readonly sourceFileId: string;
  /**
   * The ID of the folder where the resulting files will be uploaded. */
  readonly destinationFolderId: string;
  /**
   * The system that initiated the request, used for analytics and
   * traceability. */
  readonly inputSource: DocumentSplitCreateRequestV2026R0InputSourceField;
  readonly splitInput: DocumentSplitCreateRequestTypeV2026R0;
  /**
   * An optional identifier supplied by the caller for this Document Split job.
   * The value is returned on job responses for correlation only. It is not
   * a Box resource ID, is not required to be unique, and cannot be used to
   * look up the job. */
  readonly externalId?: string;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitCreateRequestV2026R0InputSourceField(
  val: DocumentSplitCreateRequestV2026R0InputSourceField,
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestV2026R0InputSourceField(
  val: SerializedData,
): DocumentSplitCreateRequestV2026R0InputSourceField {
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
    message:
      "Can't deserialize DocumentSplitCreateRequestV2026R0InputSourceField",
  });
}
export function serializeDocumentSplitCreateRequestV2026R0(
  val: DocumentSplitCreateRequestV2026R0,
): SerializedData {
  return {
    ['source_file_id']: val.sourceFileId,
    ['destination_folder_id']: val.destinationFolderId,
    ['input_source']:
      serializeDocumentSplitCreateRequestV2026R0InputSourceField(
        val.inputSource,
      ),
    ['split_input']: serializeDocumentSplitCreateRequestTypeV2026R0(
      val.splitInput,
    ),
    ['external_id']: val.externalId,
  };
}
export function deserializeDocumentSplitCreateRequestV2026R0(
  val: SerializedData,
): DocumentSplitCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitCreateRequestV2026R0"',
    });
  }
  if (val.source_file_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source_file_id" of type "DocumentSplitCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.source_file_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "source_file_id" of type "DocumentSplitCreateRequestV2026R0"',
    });
  }
  const sourceFileId: string = val.source_file_id;
  if (val.destination_folder_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "destination_folder_id" of type "DocumentSplitCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.destination_folder_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "destination_folder_id" of type "DocumentSplitCreateRequestV2026R0"',
    });
  }
  const destinationFolderId: string = val.destination_folder_id;
  if (val.input_source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "input_source" of type "DocumentSplitCreateRequestV2026R0" to be defined',
    });
  }
  const inputSource: DocumentSplitCreateRequestV2026R0InputSourceField =
    deserializeDocumentSplitCreateRequestV2026R0InputSourceField(
      val.input_source,
    );
  if (val.split_input == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_input" of type "DocumentSplitCreateRequestV2026R0" to be defined',
    });
  }
  const splitInput: DocumentSplitCreateRequestTypeV2026R0 =
    deserializeDocumentSplitCreateRequestTypeV2026R0(val.split_input);
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_id" of type "DocumentSplitCreateRequestV2026R0"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  return {
    sourceFileId: sourceFileId,
    destinationFolderId: destinationFolderId,
    inputSource: inputSource,
    splitInput: splitInput,
    externalId: externalId,
  } satisfies DocumentSplitCreateRequestV2026R0;
}
