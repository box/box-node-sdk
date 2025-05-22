import { serializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { serializeAddClassificationRequestBody } from '../managers/classifications.generated.js';
import { deserializeAddClassificationRequestBody } from '../managers/classifications.generated.js';
import { serializeAddClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { deserializeAddClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { serializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { serializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeClassification } from '../schemas/classification.generated.js';
import { deserializeClassification } from '../schemas/classification.generated.js';
import { serializeAddClassificationToFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { deserializeAddClassificationToFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { serializeUpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { deserializeUpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { ClassificationTemplateInput } from '../schemas/classificationTemplate.generated.js';
import { AddClassificationToFolderOptionalsInput } from '../managers/folderClassifications.generated.js';
import { AddClassificationToFolderOptionals } from '../managers/folderClassifications.generated.js';
import { BoxClient } from '../client.generated.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { AddClassificationRequestBody } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { Classification } from '../schemas/classification.generated.js';
import { AddClassificationToFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { UpdateClassificationOnFolderRequestBody } from '../managers/folderClassifications.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { getOrCreateClassificationTemplate } from './commons.generated.js';
import { getOrCreateClassification } from './commons.generated.js';
import { ClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
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
