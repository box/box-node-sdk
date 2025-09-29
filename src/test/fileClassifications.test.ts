import { serializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { serializeAddClassificationRequestBody } from '@/managers/classifications';
import { deserializeAddClassificationRequestBody } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataField } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeClassification } from '@/schemas/classification';
import { deserializeClassification } from '@/schemas/classification';
import { serializeAddClassificationToFileRequestBody } from '@/managers/fileClassifications';
import { deserializeAddClassificationToFileRequestBody } from '@/managers/fileClassifications';
import { serializeUpdateClassificationOnFileRequestBody } from '@/managers/fileClassifications';
import { deserializeUpdateClassificationOnFileRequestBody } from '@/managers/fileClassifications';
import { serializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { ClassificationTemplateInput } from '@/schemas/classificationTemplate';
import { AddClassificationToFileOptionalsInput } from '@/managers/fileClassifications';
import { AddClassificationToFileOptionals } from '@/managers/fileClassifications';
import { BoxClient } from '@/client';
import { ClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { AddClassificationRequestBody } from '@/managers/classifications';
import { AddClassificationRequestBodyDataField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { FileFull } from '@/schemas/fileFull';
import { Classification } from '@/schemas/classification';
import { AddClassificationToFileRequestBody } from '@/managers/fileClassifications';
import { UpdateClassificationOnFileRequestBody } from '@/managers/fileClassifications';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { getOrCreateClassificationTemplate } from './commons';
import { getOrCreateClassification } from './commons';
import { ClassificationTemplate } from '@/schemas/classificationTemplate';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
export async function getOrCreateSecondClassification(
  classificationTemplateInput: ClassificationTemplateInput,
): Promise<ClassificationTemplateFieldsOptionsField> {
  const classificationTemplate: ClassificationTemplate =
    new ClassificationTemplate({
      id: classificationTemplateInput.id,
      type: classificationTemplateInput.type,
      scope: classificationTemplateInput.scope,
      templateKey: classificationTemplateInput.templateKey,
      displayName: classificationTemplateInput.displayName,
      hidden: classificationTemplateInput.hidden,
      copyInstanceOnItemCopy:
        classificationTemplateInput.copyInstanceOnItemCopy,
      fields: classificationTemplateInput.fields,
    });
  const classifications: readonly ClassificationTemplateFieldsOptionsField[] =
    classificationTemplate.fields[0].options;
  const currentNumberOfClassifications: number = classifications.length;
  if (currentNumberOfClassifications == 1) {
    const classificationTemplateWithNewClassification: ClassificationTemplate =
      await client.classifications.addClassification([
        new AddClassificationRequestBody({
          data: {
            key: getUuid(),
            staticConfig: {
              classification: {
                colorId: 4,
                classificationDefinition: 'Other description',
              } satisfies AddClassificationRequestBodyDataStaticConfigClassificationField,
            } satisfies AddClassificationRequestBodyDataStaticConfigField,
          } satisfies AddClassificationRequestBodyDataField,
        }),
      ]);
    return classificationTemplateWithNewClassification.fields[0].options[1];
  }
  return classifications[1];
}
test('testFileClassifications', async function testFileClassifications(): Promise<any> {
  const classificationTemplate: ClassificationTemplate =
    await getOrCreateClassificationTemplate();
  const classification: ClassificationTemplateFieldsOptionsField =
    await getOrCreateClassification(classificationTemplate);
  const file: FileFull = await uploadNewFile();
  await expect(async () => {
    await client.fileClassifications.getClassificationOnFile(file.id);
  }).rejects.toThrow();
  const createdFileClassification: Classification =
    await client.fileClassifications.addClassificationToFile(file.id, {
      requestBody: {
        boxSecurityClassificationKey: classification.key,
      } satisfies AddClassificationToFileRequestBody,
    } satisfies AddClassificationToFileOptionalsInput);
  if (
    !(
      createdFileClassification.boxSecurityClassificationKey ==
      classification.key
    )
  ) {
    throw new Error('Assertion failed');
  }
  const fileClassification: Classification =
    await client.fileClassifications.getClassificationOnFile(file.id);
  if (
    !(fileClassification.boxSecurityClassificationKey == classification.key)
  ) {
    throw new Error('Assertion failed');
  }
  const secondClassification: ClassificationTemplateFieldsOptionsField =
    await getOrCreateSecondClassification(classificationTemplate);
  const updatedFileClassification: Classification =
    await client.fileClassifications.updateClassificationOnFile(file.id, [
      new UpdateClassificationOnFileRequestBody({
        value: secondClassification.key,
      }),
    ]);
  if (
    !(
      updatedFileClassification.boxSecurityClassificationKey ==
      secondClassification.key
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.fileClassifications.deleteClassificationFromFile(file.id);
  await expect(async () => {
    await client.fileClassifications.getClassificationOnFile(file.id);
  }).rejects.toThrow();
  await client.files.deleteFileById(file.id);
});
export {};
