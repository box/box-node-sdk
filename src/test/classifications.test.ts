import { serializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { serializeUpdateClassificationRequestBody } from '@/managers/classifications';
import { deserializeUpdateClassificationRequestBody } from '@/managers/classifications';
import { serializeUpdateClassificationRequestBodyDataField } from '@/managers/classifications';
import { deserializeUpdateClassificationRequestBodyDataField } from '@/managers/classifications';
import { serializeUpdateClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { serializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { BoxClient } from '@/client';
import { ClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { UpdateClassificationRequestBody } from '@/managers/classifications';
import { UpdateClassificationRequestBodyDataField } from '@/managers/classifications';
import { UpdateClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { UpdateClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
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
test('testClassifications', async function testClassifications(): Promise<any> {
  const classificationTemplate: ClassificationTemplate =
    await getOrCreateClassificationTemplate();
  const classification: ClassificationTemplateFieldsOptionsField =
    await getOrCreateClassification(classificationTemplate);
  if (!!(classification.key == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(classification.staticConfig!.classification!.colorId == 100)) {
    throw new Error('Assertion failed');
  }
  if (
    !!(
      classification.staticConfig!.classification!.classificationDefinition ==
      ''
    )
  ) {
    throw new Error('Assertion failed');
  }
  const updatedClassificationName: string = getUuid();
  const updatedClassificationDescription: string = getUuid();
  const classificationTemplateWithUpdatedClassification: ClassificationTemplate =
    await client.classifications.updateClassification([
      new UpdateClassificationRequestBody({
        enumOptionKey: classification.key,
        data: {
          key: updatedClassificationName,
          staticConfig: {
            classification: {
              colorId: 2,
              classificationDefinition: updatedClassificationDescription,
            } satisfies UpdateClassificationRequestBodyDataStaticConfigClassificationField,
          } satisfies UpdateClassificationRequestBodyDataStaticConfigField,
        } satisfies UpdateClassificationRequestBodyDataField,
      }),
    ]);
  const updatedClassifications: readonly ClassificationTemplateFieldsOptionsField[] =
    classificationTemplateWithUpdatedClassification.fields[0].options;
  const updatedClassification: ClassificationTemplateFieldsOptionsField =
    updatedClassifications[0];
  if (!(updatedClassification.key == updatedClassificationName)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedClassification.staticConfig!.classification!.colorId == 2)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      updatedClassification.staticConfig!.classification!
        .classificationDefinition == updatedClassificationDescription
    )
  ) {
    throw new Error('Assertion failed');
  }
});
export {};
