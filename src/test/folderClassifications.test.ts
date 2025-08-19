import { serializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { serializeAddClassificationRequestBody } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBody } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeClassification } from '../schemas/classification.js';
import { deserializeClassification } from '../schemas/classification.js';
import { serializeAddClassificationToFolderRequestBody } from '../managers/folderClassifications.js';
import { deserializeAddClassificationToFolderRequestBody } from '../managers/folderClassifications.js';
import { serializeUpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.js';
import { deserializeUpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { ClassificationTemplateInput } from '../schemas/classificationTemplate.js';
import { AddClassificationToFolderOptionalsInput } from '../managers/folderClassifications.js';
import { AddClassificationToFolderOptionals } from '../managers/folderClassifications.js';
import { BoxClient } from '../client.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { AddClassificationRequestBody } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { FolderFull } from '../schemas/folderFull.js';
import { Classification } from '../schemas/classification.js';
import { AddClassificationToFolderRequestBody } from '../managers/folderClassifications.js';
import { UpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { createNewFolder } from './commons.js';
import { getOrCreateClassificationTemplate } from './commons.js';
import { getOrCreateClassification } from './commons.js';
import { ClassificationTemplate } from '../schemas/classificationTemplate.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
