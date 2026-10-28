import { serializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { deserializeDocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { serializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { deserializeDocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { serializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { deserializeDocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { DocumentSplitCreateRequestManualV2026R0 } from './documentSplitCreateRequestManualV2026R0';
import { DocumentSplitCreateRequestPageSelectionV2026R0 } from './documentSplitCreateRequestPageSelectionV2026R0';
import { DocumentSplitCreateRequestSmartV2026R0 } from './documentSplitCreateRequestSmartV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateRequestTypeV2026R0 =
  | DocumentSplitCreateRequestManualV2026R0
  | DocumentSplitCreateRequestPageSelectionV2026R0
  | DocumentSplitCreateRequestSmartV2026R0;
export function serializeDocumentSplitCreateRequestTypeV2026R0(
  val: any,
): SerializedData {
  try {
    if (val.splitType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "splitType" of type "DocumentSplitCreateRequestManualV2026R0" to be defined',
      });
    }
    if (val.splitDefinition == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "splitDefinition" of type "DocumentSplitCreateRequestManualV2026R0" to be defined',
      });
    }
    if (!sdIsList(val.splitDefinition)) {
      throw new BoxSdkError({
        message:
          'Expecting array for "splitDefinition" of type "DocumentSplitCreateRequestManualV2026R0"',
      });
    }
    return serializeDocumentSplitCreateRequestManualV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.splitType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "splitType" of type "DocumentSplitCreateRequestPageSelectionV2026R0" to be defined',
      });
    }
    if (val.pageSelection == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "pageSelection" of type "DocumentSplitCreateRequestPageSelectionV2026R0" to be defined',
      });
    }
    return serializeDocumentSplitCreateRequestPageSelectionV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.splitType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "splitType" of type "DocumentSplitCreateRequestSmartV2026R0" to be defined',
      });
    }
    if (val.prompt == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "prompt" of type "DocumentSplitCreateRequestSmartV2026R0" to be defined',
      });
    }
    if (!sdIsString(val.prompt)) {
      throw new BoxSdkError({
        message:
          'Expecting string for "prompt" of type "DocumentSplitCreateRequestSmartV2026R0"',
      });
    }
    return serializeDocumentSplitCreateRequestSmartV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't serialize DocumentSplitCreateRequestTypeV2026R0",
  });
}
export function deserializeDocumentSplitCreateRequestTypeV2026R0(
  val: SerializedData,
): DocumentSplitCreateRequestTypeV2026R0 {
  try {
    return deserializeDocumentSplitCreateRequestManualV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeDocumentSplitCreateRequestPageSelectionV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeDocumentSplitCreateRequestSmartV2026R0(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitCreateRequestTypeV2026R0",
  });
}
