import { serializeFileReferenceV2026R0 } from './fileReferenceV2026R0';
import { deserializeFileReferenceV2026R0 } from './fileReferenceV2026R0';
import { serializeDocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { deserializeDocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { FileReferenceV2026R0 } from './fileReferenceV2026R0';
import { DocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocumentSplitOutputV2026R0 {
  /**
   * References to the files that were created by the split. */
  readonly generatedFiles?: readonly FileReferenceV2026R0[];
  /**
   * The page ranges that Box produced for a `smart` split. Each entry
   * corresponds to one generated file with the inclusive page range
   * `[start, end]`. Omitted or `null` for `manual` splits, where the
   * caller-supplied ranges are available in `split_input.split_definition`.
   * Omitted for `page_selection` splits, where the caller-supplied page
   * layout is available in `split_input.page_selection`. */
  readonly splitDefinition?: readonly DocumentSplitPageRangeV2026R0[] | null;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitOutputV2026R0(
  val: DocumentSplitOutputV2026R0,
): SerializedData {
  return {
    ['generated_files']:
      val.generatedFiles == void 0
        ? val.generatedFiles
        : (val.generatedFiles.map(function (
            item: FileReferenceV2026R0,
          ): SerializedData {
            return serializeFileReferenceV2026R0(item);
          }) as readonly any[]),
    ['split_definition']:
      val.splitDefinition == void 0
        ? val.splitDefinition
        : (val.splitDefinition.map(function (
            item: DocumentSplitPageRangeV2026R0,
          ): SerializedData {
            return serializeDocumentSplitPageRangeV2026R0(item);
          }) as readonly any[]),
  };
}
export function deserializeDocumentSplitOutputV2026R0(
  val: SerializedData,
): DocumentSplitOutputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitOutputV2026R0"',
    });
  }
  if (!(val.generated_files == void 0) && !sdIsList(val.generated_files)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "generated_files" of type "DocumentSplitOutputV2026R0"',
    });
  }
  const generatedFiles: undefined | readonly FileReferenceV2026R0[] =
    val.generated_files == void 0
      ? void 0
      : sdIsList(val.generated_files)
        ? (val.generated_files.map(function (
            itm: SerializedData,
          ): FileReferenceV2026R0 {
            return deserializeFileReferenceV2026R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.split_definition == void 0) && !sdIsList(val.split_definition)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "split_definition" of type "DocumentSplitOutputV2026R0"',
    });
  }
  const splitDefinition: undefined | readonly DocumentSplitPageRangeV2026R0[] =
    val.split_definition == void 0
      ? void 0
      : sdIsList(val.split_definition)
        ? (val.split_definition.map(function (
            itm: SerializedData,
          ): DocumentSplitPageRangeV2026R0 {
            return deserializeDocumentSplitPageRangeV2026R0(itm);
          }) as readonly any[])
        : [];
  return {
    generatedFiles: generatedFiles,
    splitDefinition: splitDefinition,
  } satisfies DocumentSplitOutputV2026R0;
}
