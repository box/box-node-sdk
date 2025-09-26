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
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeClassification } from '@/schemas/classification';
import { deserializeClassification } from '@/schemas/classification';
import { serializeAddClassificationToFolderRequestBody } from '@/managers/folderClassifications';
import { deserializeAddClassificationToFolderRequestBody } from '@/managers/folderClassifications';
import { serializeUpdateClassificationOnFolderRequestBody } from '@/managers/folderClassifications';
import { deserializeUpdateClassificationOnFolderRequestBody } from '@/managers/folderClassifications';
import { serializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { ClassificationTemplateInput } from '@/schemas/classificationTemplate';
import { AddClassificationToFolderOptionalsInput } from '@/managers/folderClassifications';
import { AddClassificationToFolderOptionals } from '@/managers/folderClassifications';
import { BoxClient } from '@/client';
import { ClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { AddClassificationRequestBody } from '@/managers/classifications';
import { AddClassificationRequestBodyDataField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { FolderFull } from '@/schemas/folderFull';
import { Classification } from '@/schemas/classification';
import { AddClassificationToFolderRequestBody } from '@/managers/folderClassifications';
import { UpdateClassificationOnFolderRequestBody } from '@/managers/folderClassifications';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { createNewFolder } from './commons';
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
test('testFolderClassifications', async function testFolderClassifications(): Promise<any> {
  const classificationTemplate: ClassificationTemplate =
    await getOrCreateClassificationTemplate();
  const classification: ClassificationTemplateFieldsOptionsField =
    await getOrCreateClassification(classificationTemplate);
  const folder: FolderFull = await createNewFolder();
  await expect(async () => {
    await client.folderClassifications.getClassificationOnFolder(folder.id);
  }).rejects.toThrow();
  const createdFolderClassification: Classification =
    await client.folderClassifications.addClassificationToFolder(folder.id, {
      requestBody: {
        boxSecurityClassificationKey: classification.key,
      } satisfies AddClassificationToFolderRequestBody,
    } satisfies AddClassificationToFolderOptionalsInput);
  if (
    !(
      createdFolderClassification.boxSecurityClassificationKey ==
      classification.key
    )
  ) {
    throw new Error('Assertion failed');
  }
  const folderClassification: Classification =
    await client.folderClassifications.getClassificationOnFolder(folder.id);
  if (
    !(folderClassification.boxSecurityClassificationKey == classification.key)
  ) {
    throw new Error('Assertion failed');
  }
  const secondClassification: ClassificationTemplateFieldsOptionsField =
    await getOrCreateSecondClassification(classificationTemplate);
  const updatedFolderClassification: Classification =
    await client.folderClassifications.updateClassificationOnFolder(folder.id, [
      new UpdateClassificationOnFolderRequestBody({
        value: secondClassification.key,
      }),
    ]);
  if (
    !(
      updatedFolderClassification.boxSecurityClassificationKey ==
      secondClassification.key
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.folderClassifications.deleteClassificationFromFolder(folder.id);
  await expect(async () => {
    await client.folderClassifications.getClassificationOnFolder(folder.id);
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
export {};
