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
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeClassification } from '../schemas/classification.generated.js';
import { deserializeClassification } from '../schemas/classification.generated.js';
import { serializeAddClassificationToFileRequestBody } from '../managers/fileClassifications.generated.js';
import { deserializeAddClassificationToFileRequestBody } from '../managers/fileClassifications.generated.js';
import { serializeUpdateClassificationOnFileRequestBody } from '../managers/fileClassifications.generated.js';
import { deserializeUpdateClassificationOnFileRequestBody } from '../managers/fileClassifications.generated.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { ClassificationTemplateInput } from '../schemas/classificationTemplate.generated.js';
import { AddClassificationToFileOptionalsInput } from '../managers/fileClassifications.generated.js';
import { AddClassificationToFileOptionals } from '../managers/fileClassifications.generated.js';
import { BoxClient } from '../client.generated.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { AddClassificationRequestBody } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { Classification } from '../schemas/classification.generated.js';
import { AddClassificationToFileRequestBody } from '../managers/fileClassifications.generated.js';
import { UpdateClassificationOnFileRequestBody } from '../managers/fileClassifications.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
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
