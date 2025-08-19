import { serializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { serializeUpdateClassificationRequestBody } from '../managers/classifications.js';
import { deserializeUpdateClassificationRequestBody } from '../managers/classifications.js';
import { serializeUpdateClassificationRequestBodyDataField } from '../managers/classifications.js';
import { deserializeUpdateClassificationRequestBodyDataField } from '../managers/classifications.js';
import { serializeUpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { BoxClient } from '../client.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { UpdateClassificationRequestBody } from '../managers/classifications.js';
import { UpdateClassificationRequestBodyDataField } from '../managers/classifications.js';
import { UpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { UpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
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
