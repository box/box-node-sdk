import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeAiResponseFull } from '../schemas/aiResponseFull.generated.js';
import { deserializeAiResponseFull } from '../schemas/aiResponseFull.generated.js';
import { serializeAiAsk } from '../schemas/aiAsk.generated.js';
import { deserializeAiAsk } from '../schemas/aiAsk.generated.js';
import { serializeAiAskModeField } from '../schemas/aiAsk.generated.js';
import { deserializeAiAskModeField } from '../schemas/aiAsk.generated.js';
import { serializeAiItemAsk } from '../schemas/aiItemAsk.generated.js';
import { deserializeAiItemAsk } from '../schemas/aiItemAsk.generated.js';
import { serializeAiItemAskTypeField } from '../schemas/aiItemAsk.generated.js';
import { deserializeAiItemAskTypeField } from '../schemas/aiItemAsk.generated.js';
import { serializeAiResponse } from '../schemas/aiResponse.generated.js';
import { deserializeAiResponse } from '../schemas/aiResponse.generated.js';
import { serializeAiTextGen } from '../schemas/aiTextGen.generated.js';
import { deserializeAiTextGen } from '../schemas/aiTextGen.generated.js';
import { serializeAiTextGenItemsField } from '../schemas/aiTextGen.generated.js';
import { deserializeAiTextGenItemsField } from '../schemas/aiTextGen.generated.js';
import { serializeAiTextGenItemsTypeField } from '../schemas/aiTextGen.generated.js';
import { deserializeAiTextGenItemsTypeField } from '../schemas/aiTextGen.generated.js';
import { serializeAiDialogueHistory } from '../schemas/aiDialogueHistory.generated.js';
import { deserializeAiDialogueHistory } from '../schemas/aiDialogueHistory.generated.js';
import { serializeAiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen } from '../schemas/aiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen.generated.js';
import { deserializeAiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen } from '../schemas/aiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen.generated.js';
import { serializeGetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.generated.js';
import { deserializeGetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.generated.js';
import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeAiExtract } from '../schemas/aiExtract.generated.js';
import { deserializeAiExtract } from '../schemas/aiExtract.generated.js';
import { serializeAiItemBase } from '../schemas/aiItemBase.generated.js';
import { deserializeAiItemBase } from '../schemas/aiItemBase.generated.js';
import { serializeAiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.generated.js';
import { deserializeAiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.generated.js';
import { serializeAiExtractStructured } from '../schemas/aiExtractStructured.generated.js';
import { deserializeAiExtractStructured } from '../schemas/aiExtractStructured.generated.js';
import { serializeAiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.generated.js';
import { deserializeAiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.generated.js';
import { serializeAiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.generated.js';
import { deserializeAiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.generated.js';
import { serializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { deserializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { serializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { serializeAiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.generated.js';
import { deserializeAiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.generated.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { serializeAiAgentAsk } from '../schemas/aiAgentAsk.generated.js';
import { deserializeAiAgentAsk } from '../schemas/aiAgentAsk.generated.js';
import { serializeAiAgentTextGen } from '../schemas/aiAgentTextGen.generated.js';
import { deserializeAiAgentTextGen } from '../schemas/aiAgentTextGen.generated.js';
import { serializeAiAgentExtract } from '../schemas/aiAgentExtract.generated.js';
import { deserializeAiAgentExtract } from '../schemas/aiAgentExtract.generated.js';
import { serializeAiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.generated.js';
import { deserializeAiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.generated.js';
import { serializeAiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.generated.js';
import { deserializeAiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { AiResponseFull } from '../schemas/aiResponseFull.generated.js';
import { AiAsk } from '../schemas/aiAsk.generated.js';
import { AiAskModeField } from '../schemas/aiAsk.generated.js';
import { AiItemAsk } from '../schemas/aiItemAsk.generated.js';
import { AiItemAskTypeField } from '../schemas/aiItemAsk.generated.js';
import { AiResponse } from '../schemas/aiResponse.generated.js';
import { AiTextGen } from '../schemas/aiTextGen.generated.js';
import { AiTextGenItemsField } from '../schemas/aiTextGen.generated.js';
import { AiTextGenItemsTypeField } from '../schemas/aiTextGen.generated.js';
import { AiDialogueHistory } from '../schemas/aiDialogueHistory.generated.js';
import { AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen } from '../schemas/aiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen.generated.js';
import { GetAiAgentDefaultConfigQueryParams } from '../managers/ai.generated.js';
import { GetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { AiExtract } from '../schemas/aiExtract.generated.js';
import { AiItemBase } from '../schemas/aiItemBase.generated.js';
import { AiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.generated.js';
import { AiExtractStructured } from '../schemas/aiExtractStructured.generated.js';
import { AiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.generated.js';
import { AiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.generated.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { AiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.generated.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { getUuid } from '../internal/utils.js';
import { stringToByteStream } from '../internal/utils.js';
import { delayInSeconds } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { dateTimeFromString } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { getValueFromObjectRawData } from '../internal/utils.js';
import { uploadNewFile } from './commons.generated.js';
import { AiAgentAsk } from '../schemas/aiAgentAsk.generated.js';
import { AiAgentTextGen } from '../schemas/aiAgentTextGen.generated.js';
import { AiAgentExtract } from '../schemas/aiAgentExtract.generated.js';
import { AiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.generated.js';
import { AiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testAskAISingleItem', async function testAskAISingleItem(): Promise<any> {
  const fileToAsk: FileFull = await uploadNewFile();
  const response: undefined | AiResponseFull = await client.ai.createAiAsk({
    mode: 'single_item_qa' as AiAskModeField,
    prompt: 'which direction sun rises',
    items: [
      {
        id: fileToAsk.id,
        type: 'file' as AiItemAskTypeField,
        content: 'Sun rises in the East',
      } satisfies AiItemAsk,
    ],
  } satisfies AiAsk);
  if (!(response!.answer.includes('East') as boolean)) {
    throw new Error('Assertion failed');
  }
  if (!(response!.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileToAsk.id);
});
test('testAskAIMultipleItems', async function testAskAIMultipleItems(): Promise<any> {
  const fileToAsk1: FileFull = await uploadNewFile();
  const fileToAsk2: FileFull = await uploadNewFile();
  const response: undefined | AiResponseFull = await client.ai.createAiAsk({
    mode: 'multiple_item_qa' as AiAskModeField,
    prompt: 'Which direction sun rises?',
    items: [
      {
        id: fileToAsk1.id,
        type: 'file' as AiItemAskTypeField,
        content: 'Earth goes around the sun',
      } satisfies AiItemAsk,
      {
        id: fileToAsk2.id,
        type: 'file' as AiItemAskTypeField,
        content: 'Sun rises in the East in the morning',
      } satisfies AiItemAsk,
    ],
  } satisfies AiAsk);
  if (!(response!.answer.includes('East') as boolean)) {
    throw new Error('Assertion failed');
  }
  if (!(response!.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileToAsk1.id);
  await client.files.deleteFileById(fileToAsk2.id);
});
test('testAITextGenWithDialogueHistory', async function testAITextGenWithDialogueHistory(): Promise<any> {
  const fileToAsk: FileFull = await uploadNewFile();
  const response: AiResponse = await client.ai.createAiTextGen({
    prompt: 'Parapharse the document.s',
    items: [
      new AiTextGenItemsField({
        id: fileToAsk.id,
        type: 'file' as AiTextGenItemsTypeField,
        content:
          'The Earth goes around the sun. Sun rises in the East in the morning.',
      }),
    ],
    dialogueHistory: [
      {
        prompt: 'What does the earth go around?',
        answer: 'The sun',
        createdAt: dateTimeFromString('2021-01-01T00:00:00Z'),
      } satisfies AiDialogueHistory,
      {
        prompt: 'On Earth, where does the sun rise?',
        answer: 'East',
        createdAt: dateTimeFromString('2021-01-01T00:00:00Z'),
      } satisfies AiDialogueHistory,
    ],
  } satisfies AiTextGen);
  if (!(response.answer.includes('sun') as boolean)) {
    throw new Error('Assertion failed');
  }
  if (!(response.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileToAsk.id);
});
test('testGettingAIAskAgentConfig', async function testGettingAIAskAgentConfig(): Promise<any> {
  const aiAskConfig: AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen =
    await client.ai.getAiAgentDefaultConfig({
      mode: 'ask' as GetAiAgentDefaultConfigQueryParamsModeField,
      language: 'en-US',
    } satisfies GetAiAgentDefaultConfigQueryParams);
  if (!(aiAskConfig.type == 'ai_agent_ask')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicText!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicText!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAskConfig.basicText!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicText!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicTextMulti!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicTextMulti!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAskConfig.basicTextMulti!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.basicTextMulti!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longText!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longText!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAskConfig.longText!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longText!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longText!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longText!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longTextMulti!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longTextMulti!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAskConfig.longTextMulti!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longTextMulti!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longTextMulti!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAskConfig.longTextMulti!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
});
test('testGettingAITextGenAgentConfig', async function testGettingAITextGenAgentConfig(): Promise<any> {
  const aiTextGenConfig: AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen =
    await client.ai.getAiAgentDefaultConfig({
      mode: 'text_gen' as GetAiAgentDefaultConfigQueryParamsModeField,
      language: 'en-US',
    } satisfies GetAiAgentDefaultConfigQueryParams);
  if (!(aiTextGenConfig.type == 'ai_agent_text_gen')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiTextGenConfig.basicGen!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.contentTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiTextGenConfig.basicGen!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
});
test('testAIExtract', async function testAIExtract(): Promise<any> {
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: ''.concat(getUuid(), '.txt') as string,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: stringToByteStream(
      'My name is John Doe. I live in San Francisco. I was born in 1990. I work at Box.',
    ),
  } satisfies UploadFileRequestBody);
  const file: FileFull = uploadedFiles.entries![0];
  await delayInSeconds(5);
  const response: AiResponse = await client.ai.createAiExtract({
    prompt: 'firstName, lastName, location, yearOfBirth, company',
    items: [new AiItemBase({ id: file.id })],
  } satisfies AiExtract);
  const expectedResponse: string =
    '{"firstName": "John", "lastName": "Doe", "location": "San Francisco", "yearOfBirth": "1990", "company": "Box"}';
  if (!(response.answer == expectedResponse)) {
    throw new Error('Assertion failed');
  }
  if (!(response.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
});
test('testAIExtractStructuredWithFields', async function testAIExtractStructuredWithFields(): Promise<any> {
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: ''.concat(getUuid(), '.txt') as string,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: stringToByteStream(
      'My name is John Doe. I was born in 4th July 1990. I am 34 years old. My hobby is guitar.',
    ),
  } satisfies UploadFileRequestBody);
  const file: FileFull = uploadedFiles.entries![0];
  await delayInSeconds(5);
  const response: AiExtractStructuredResponse =
    await client.ai.createAiExtractStructured({
      fields: [
        {
          key: 'firstName',
          displayName: 'First name',
          description: 'Person first name',
          prompt: 'What is the your first name?',
          type: 'string',
        } satisfies AiExtractStructuredFieldsField,
        {
          key: 'lastName',
          displayName: 'Last name',
          description: 'Person last name',
          prompt: 'What is the your last name?',
          type: 'string',
        } satisfies AiExtractStructuredFieldsField,
        {
          key: 'dateOfBirth',
          displayName: 'Birth date',
          description: 'Person date of birth',
          prompt: 'What is the date of your birth?',
          type: 'date',
        } satisfies AiExtractStructuredFieldsField,
        {
          key: 'age',
          displayName: 'Age',
          description: 'Person age',
          prompt: 'How old are you?',
          type: 'float',
        } satisfies AiExtractStructuredFieldsField,
        {
          key: 'hobby',
          displayName: 'Hobby',
          description: 'Person hobby',
          prompt: 'What is your hobby?',
          type: 'multiSelect',
          options: [
            { key: 'guitar' } satisfies AiExtractStructuredFieldsOptionsField,
            { key: 'books' } satisfies AiExtractStructuredFieldsOptionsField,
          ],
        } satisfies AiExtractStructuredFieldsField,
      ],
      items: [new AiItemBase({ id: file.id })],
    } satisfies AiExtractStructured);
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.hobby'),
      ) as string) == (['guitar'].map(toString).join(',') as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.firstName'),
      ) as string) == 'John'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.lastName'),
      ) as string) == 'Doe'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.dateOfBirth'),
      ) as string) == '1990-07-04'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(getValueFromObjectRawData(response, 'answer.age')) as string) ==
      '34'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(response.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
});
test('testAIExtractStructuredWithMetadataTemplate', async function testAIExtractStructuredWithMetadataTemplate(): Promise<any> {
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: ''.concat(getUuid(), '.txt') as string,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: stringToByteStream(
      'My name is John Doe. I was born in 4th July 1990. I am 34 years old. My hobby is guitar.',
    ),
  } satisfies UploadFileRequestBody);
  const file: FileFull = uploadedFiles.entries![0];
  await delayInSeconds(5);
  const templateKey: string = ''.concat('key', getUuid()) as string;
  const template: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: templateKey,
      templateKey: templateKey,
      fields: [
        {
          key: 'firstName',
          displayName: 'First name',
          description: 'Person first name',
          type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          key: 'lastName',
          displayName: 'Last name',
          description: 'Person last name',
          type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          key: 'dateOfBirth',
          displayName: 'Birth date',
          description: 'Person date of birth',
          type: 'date' as CreateMetadataTemplateRequestBodyFieldsTypeField,
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          key: 'age',
          displayName: 'Age',
          description: 'Person age',
          type: 'float' as CreateMetadataTemplateRequestBodyFieldsTypeField,
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          key: 'hobby',
          displayName: 'Hobby',
          description: 'Person hobby',
          type: 'multiSelect' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          options: [
            {
              key: 'guitar',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'books',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  const response: AiExtractStructuredResponse =
    await client.ai.createAiExtractStructured({
      metadataTemplate: {
        templateKey: templateKey,
        scope: 'enterprise',
      } satisfies AiExtractStructuredMetadataTemplateField,
      items: [new AiItemBase({ id: file.id })],
    } satisfies AiExtractStructured);
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.firstName'),
      ) as string) == 'John'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.lastName'),
      ) as string) == 'Doe'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.dateOfBirth'),
      ) as string) == '1990-07-04T00:00:00Z'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(getValueFromObjectRawData(response, 'answer.age')) as string) ==
      '34'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(
        getValueFromObjectRawData(response, 'answer.hobby'),
      ) as string) == (['guitar'].map(toString).join(',') as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(response.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!,
  );
  await client.files.deleteFileById(file.id);
});
export {};
