import { serializeAiAgent } from '@/schemas/aiAgent';
import { deserializeAiAgent } from '@/schemas/aiAgent';
import { serializeGetAiAgentDefaultConfigQueryParamsModeField } from '@/managers/ai';
import { deserializeGetAiAgentDefaultConfigQueryParamsModeField } from '@/managers/ai';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeAiResponseFull } from '@/schemas/aiResponseFull';
import { deserializeAiResponseFull } from '@/schemas/aiResponseFull';
import { serializeAiAsk } from '@/schemas/aiAsk';
import { deserializeAiAsk } from '@/schemas/aiAsk';
import { serializeAiAskModeField } from '@/schemas/aiAsk';
import { deserializeAiAskModeField } from '@/schemas/aiAsk';
import { serializeAiItemAsk } from '@/schemas/aiItemAsk';
import { deserializeAiItemAsk } from '@/schemas/aiItemAsk';
import { serializeAiItemAskTypeField } from '@/schemas/aiItemAsk';
import { deserializeAiItemAskTypeField } from '@/schemas/aiItemAsk';
import { serializeAiResponse } from '@/schemas/aiResponse';
import { deserializeAiResponse } from '@/schemas/aiResponse';
import { serializeAiTextGen } from '@/schemas/aiTextGen';
import { deserializeAiTextGen } from '@/schemas/aiTextGen';
import { serializeAiTextGenItemsField } from '@/schemas/aiTextGen';
import { deserializeAiTextGenItemsField } from '@/schemas/aiTextGen';
import { serializeAiTextGenItemsTypeField } from '@/schemas/aiTextGen';
import { deserializeAiTextGenItemsTypeField } from '@/schemas/aiTextGen';
import { serializeAiDialogueHistory } from '@/schemas/aiDialogueHistory';
import { deserializeAiDialogueHistory } from '@/schemas/aiDialogueHistory';
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeAiExtract } from '@/schemas/aiExtract';
import { deserializeAiExtract } from '@/schemas/aiExtract';
import { serializeAiItemBase } from '@/schemas/aiItemBase';
import { deserializeAiItemBase } from '@/schemas/aiItemBase';
import { serializeAiExtractStructuredResponse } from '@/schemas/aiExtractStructuredResponse';
import { deserializeAiExtractStructuredResponse } from '@/schemas/aiExtractStructuredResponse';
import { serializeAiExtractStructured } from '@/schemas/aiExtractStructured';
import { deserializeAiExtractStructured } from '@/schemas/aiExtractStructured';
import { serializeAiExtractStructuredFieldsField } from '@/schemas/aiExtractStructured';
import { deserializeAiExtractStructuredFieldsField } from '@/schemas/aiExtractStructured';
import { serializeAiExtractStructuredFieldsOptionsField } from '@/schemas/aiExtractStructured';
import { deserializeAiExtractStructuredFieldsOptionsField } from '@/schemas/aiExtractStructured';
import { serializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { deserializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { serializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { serializeAiExtractStructuredMetadataTemplateField } from '@/schemas/aiExtractStructured';
import { deserializeAiExtractStructuredMetadataTemplateField } from '@/schemas/aiExtractStructured';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { serializeAiAgentAsk } from '@/schemas/aiAgentAsk';
import { deserializeAiAgentAsk } from '@/schemas/aiAgentAsk';
import { serializeAiAgentTextGen } from '@/schemas/aiAgentTextGen';
import { deserializeAiAgentTextGen } from '@/schemas/aiAgentTextGen';
import { serializeAiAgentExtract } from '@/schemas/aiAgentExtract';
import { deserializeAiAgentExtract } from '@/schemas/aiAgentExtract';
import { serializeAiAgentExtractStructured } from '@/schemas/aiAgentExtractStructured';
import { deserializeAiAgentExtractStructured } from '@/schemas/aiAgentExtractStructured';
import { BoxClient } from '@/client';
import { AiAgent } from '@/schemas/aiAgent';
import { GetAiAgentDefaultConfigQueryParams } from '@/managers/ai';
import { GetAiAgentDefaultConfigQueryParamsModeField } from '@/managers/ai';
import { FileFull } from '@/schemas/fileFull';
import { AiResponseFull } from '@/schemas/aiResponseFull';
import { AiAsk } from '@/schemas/aiAsk';
import { AiAskModeField } from '@/schemas/aiAsk';
import { AiItemAsk } from '@/schemas/aiItemAsk';
import { AiItemAskTypeField } from '@/schemas/aiItemAsk';
import { AiResponse } from '@/schemas/aiResponse';
import { AiTextGen } from '@/schemas/aiTextGen';
import { AiTextGenItemsField } from '@/schemas/aiTextGen';
import { AiTextGenItemsTypeField } from '@/schemas/aiTextGen';
import { AiDialogueHistory } from '@/schemas/aiDialogueHistory';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { AiExtract } from '@/schemas/aiExtract';
import { AiItemBase } from '@/schemas/aiItemBase';
import { AiExtractStructuredResponse } from '@/schemas/aiExtractStructuredResponse';
import { AiExtractStructured } from '@/schemas/aiExtractStructured';
import { AiExtractStructuredFieldsField } from '@/schemas/aiExtractStructured';
import { AiExtractStructuredFieldsOptionsField } from '@/schemas/aiExtractStructured';
import { MetadataTemplate } from '@/schemas/metadataTemplate';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { AiExtractStructuredMetadataTemplateField } from '@/schemas/aiExtractStructured';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { getDefaultClient } from './commons';
import { getUuid } from '@/internal/utils';
import { stringToByteStream } from '@/internal/utils';
import { delayInSeconds } from '@/internal/utils';
import { dateTimeFromString } from '@/internal/utils';
import { uploadNewFile } from './commons';
import { AiAgentAsk } from '@/schemas/aiAgentAsk';
import { AiAgentTextGen } from '@/schemas/aiAgentTextGen';
import { AiAgentExtract } from '@/schemas/aiAgentExtract';
import { AiAgentExtractStructured } from '@/schemas/aiAgentExtractStructured';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testAskAISingleItem', async function testAskAISingleItem(): Promise<any> {
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'ask' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  const aiAskAgentConfig: AiAgentAsk = aiAgentConfig as AiAgentAsk;
  const aiAskAgentBasicTextConfig: AiAgentAsk = new AiAgentAsk({
    basicText: aiAskAgentConfig.basicText,
  });
  const fileToAsk: FileFull = await uploadNewFile();
  const response: undefined | AiResponseFull = await client.ai.createAiAsk({
    mode: 'single_item_qa' as AiAskModeField,
    prompt: 'Which direction does the Sun rise?',
    items: [
      {
        id: fileToAsk.id,
        type: 'file' as AiItemAskTypeField,
        content: 'The Sun rises in the east',
      } satisfies AiItemAsk,
    ],
    aiAgent: aiAskAgentBasicTextConfig,
  } satisfies AiAsk);
  if (!(response!.answer.includes('east') as boolean)) {
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
    prompt: 'Which direction does the Sun rise?',
    items: [
      {
        id: fileToAsk1.id,
        type: 'file' as AiItemAskTypeField,
        content: 'Earth goes around the Sun',
      } satisfies AiItemAsk,
      {
        id: fileToAsk2.id,
        type: 'file' as AiItemAskTypeField,
        content: 'The Sun rises in the east in the morning',
      } satisfies AiItemAsk,
    ],
  } satisfies AiAsk);
  if (!(response!.answer.includes('east') as boolean)) {
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
    prompt: 'Paraphrase the documents',
    items: [
      new AiTextGenItemsField({
        id: fileToAsk.id,
        type: 'file' as AiTextGenItemsTypeField,
        content:
          'The Earth goes around the Sun. The Sun rises in the east in the morning.',
      }),
    ],
    dialogueHistory: [
      {
        prompt: 'What does the earth go around?',
        answer: 'The Sun',
        createdAt: dateTimeFromString('2021-01-01T00:00:00Z'),
      } satisfies AiDialogueHistory,
      {
        prompt: 'On Earth, where does the Sun rise?',
        answer: 'east',
        createdAt: dateTimeFromString('2021-01-01T00:00:00Z'),
      } satisfies AiDialogueHistory,
    ],
  } satisfies AiTextGen);
  if (!(response.answer.includes('Sun') as boolean)) {
    throw new Error('Assertion failed');
  }
  if (!(response.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileToAsk.id);
});
test('testGettingAIAskAgentConfig', async function testGettingAIAskAgentConfig(): Promise<any> {
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'ask' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  if (!(aiAgentConfig.type == 'ai_agent_ask')) {
    throw new Error('Assertion failed');
  }
  const aiAgentAskConfig: AiAgentAsk = aiAgentConfig as AiAgentAsk;
  if (!!(aiAgentAskConfig.basicText!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.basicText!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAgentAskConfig.basicText!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.basicText!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.basicTextMulti!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.basicTextMulti!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAgentAskConfig.basicTextMulti!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.basicTextMulti!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longText!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longText!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAgentAskConfig.longText!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longText!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longText!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longText!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longTextMulti!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longTextMulti!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAgentAskConfig.longTextMulti!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longTextMulti!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longTextMulti!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentAskConfig.longTextMulti!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
});
test('testGettingAITextGenAgentConfig', async function testGettingAITextGenAgentConfig(): Promise<any> {
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'text_gen' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  if (!(aiAgentConfig.type == 'ai_agent_text_gen')) {
    throw new Error('Assertion failed');
  }
  const aiAgentTextGenConfig: AiAgentTextGen = aiAgentConfig as AiAgentTextGen;
  if (!!(aiAgentTextGenConfig.basicGen!.llmEndpointParams! == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentTextGenConfig.basicGen!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentTextGenConfig.basicGen!.promptTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!(aiAgentTextGenConfig.basicGen!.numTokensForCompletion! > -1)) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentTextGenConfig.basicGen!.contentTemplate! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentTextGenConfig.basicGen!.embeddings!.model! == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(aiAgentTextGenConfig.basicGen!.embeddings!.strategy!.id! == '')) {
    throw new Error('Assertion failed');
  }
});
test('testAIExtract', async function testAIExtract(): Promise<any> {
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'extract' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  const aiExtractAgentConfig: AiAgentExtract = aiAgentConfig as AiAgentExtract;
  const aiExtractAgentBasicTextConfig: AiAgentExtract = new AiAgentExtract({
    basicText: aiExtractAgentConfig.basicText,
  });
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
    aiAgent: aiExtractAgentBasicTextConfig,
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
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'extract_structured' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  const aiExtractStructuredAgentConfig: AiAgentExtractStructured =
    aiAgentConfig as AiAgentExtractStructured;
  const aiExtractStructuredAgentBasicTextConfig: AiAgentExtractStructured =
    new AiAgentExtractStructured({
      basicText: aiExtractStructuredAgentConfig.basicText,
    });
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: ''.concat(getUuid(), '.txt') as string,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: stringToByteStream(
      ''.concat(
        'My name is John Doe. I was born in 4th July 1990. I am 34 years old. My hobby is guitar. My UUID is ',
        getUuid(),
      ) as string,
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
      includeConfidenceScore: true,
      aiAgent: aiExtractStructuredAgentBasicTextConfig,
    } satisfies AiExtractStructured);
  if (!!(response.confidenceScore == void 0)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(response.answer.hobby) as string) ==
      (['guitar'].map(toString).join(',') as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.firstName) as string) == 'John')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.lastName) as string) == 'Doe')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.dateOfBirth) as string) == '1990-07-04')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.age) as string) == '34')) {
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
      ''.concat(
        'My name is John Doe. I was born in 4th July 1990. I am 34 years old. My hobby is guitar. My UUID is ',
        getUuid(),
      ) as string,
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
  if (!((toString(response.answer.firstName) as string) == 'John')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.lastName) as string) == 'Doe')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(response.answer.dateOfBirth) as string) ==
      '1990-07-04T00:00:00Z'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.answer.age) as string) == '34')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(response.answer.hobby) as string) ==
      (['guitar'].map(toString).join(',') as string)
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
