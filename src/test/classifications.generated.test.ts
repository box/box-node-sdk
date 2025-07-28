import { serializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { serializeUpdateClassificationRequestBody } from '../managers/classifications.generated.js';
import { deserializeUpdateClassificationRequestBody } from '../managers/classifications.generated.js';
import { serializeUpdateClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { deserializeUpdateClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { serializeUpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { deserializeUpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.generated.js';
import { BoxClient } from '../client.generated.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.generated.js';
import { UpdateClassificationRequestBody } from '../managers/classifications.generated.js';
import { UpdateClassificationRequestBodyDataField } from '../managers/classifications.generated.js';
import { UpdateClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.generated.js';
import { UpdateClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
