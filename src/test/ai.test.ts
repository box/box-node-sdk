import { serializeAiAgent } from '../schemas/aiAgent.js';
import { deserializeAiAgent } from '../schemas/aiAgent.js';
import { serializeGetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.js';
import { deserializeGetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeAiResponseFull } from '../schemas/aiResponseFull.js';
import { deserializeAiResponseFull } from '../schemas/aiResponseFull.js';
import { serializeAiAsk } from '../schemas/aiAsk.js';
import { deserializeAiAsk } from '../schemas/aiAsk.js';
import { serializeAiAskModeField } from '../schemas/aiAsk.js';
import { deserializeAiAskModeField } from '../schemas/aiAsk.js';
import { serializeAiItemAsk } from '../schemas/aiItemAsk.js';
import { deserializeAiItemAsk } from '../schemas/aiItemAsk.js';
import { serializeAiItemAskTypeField } from '../schemas/aiItemAsk.js';
import { deserializeAiItemAskTypeField } from '../schemas/aiItemAsk.js';
import { serializeAiResponse } from '../schemas/aiResponse.js';
import { deserializeAiResponse } from '../schemas/aiResponse.js';
import { serializeAiTextGen } from '../schemas/aiTextGen.js';
import { deserializeAiTextGen } from '../schemas/aiTextGen.js';
import { serializeAiTextGenItemsField } from '../schemas/aiTextGen.js';
import { deserializeAiTextGenItemsField } from '../schemas/aiTextGen.js';
import { serializeAiTextGenItemsTypeField } from '../schemas/aiTextGen.js';
import { deserializeAiTextGenItemsTypeField } from '../schemas/aiTextGen.js';
import { serializeAiDialogueHistory } from '../schemas/aiDialogueHistory.js';
import { deserializeAiDialogueHistory } from '../schemas/aiDialogueHistory.js';
import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeAiExtract } from '../schemas/aiExtract.js';
import { deserializeAiExtract } from '../schemas/aiExtract.js';
import { serializeAiItemBase } from '../schemas/aiItemBase.js';
import { deserializeAiItemBase } from '../schemas/aiItemBase.js';
import { serializeAiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.js';
import { deserializeAiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.js';
import { serializeAiExtractStructured } from '../schemas/aiExtractStructured.js';
import { deserializeAiExtractStructured } from '../schemas/aiExtractStructured.js';
import { serializeAiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.js';
import { deserializeAiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.js';
import { serializeAiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.js';
import { deserializeAiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.js';
import { serializeMetadataTemplate } from '../schemas/metadataTemplate.js';
import { deserializeMetadataTemplate } from '../schemas/metadataTemplate.js';
import { serializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { serializeAiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.js';
import { deserializeAiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { serializeAiAgentAsk } from '../schemas/aiAgentAsk.js';
import { deserializeAiAgentAsk } from '../schemas/aiAgentAsk.js';
import { serializeAiAgentTextGen } from '../schemas/aiAgentTextGen.js';
import { deserializeAiAgentTextGen } from '../schemas/aiAgentTextGen.js';
import { serializeAiAgentExtract } from '../schemas/aiAgentExtract.js';
import { deserializeAiAgentExtract } from '../schemas/aiAgentExtract.js';
import { serializeAiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.js';
import { deserializeAiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.js';
import { serializeAiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.js';
import { deserializeAiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.js';
import { BoxClient } from '../client.js';
import { AiAgent } from '../schemas/aiAgent.js';
import { GetAiAgentDefaultConfigQueryParams } from '../managers/ai.js';
import { GetAiAgentDefaultConfigQueryParamsModeField } from '../managers/ai.js';
import { FileFull } from '../schemas/fileFull.js';
import { AiResponseFull } from '../schemas/aiResponseFull.js';
import { AiAsk } from '../schemas/aiAsk.js';
import { AiAskModeField } from '../schemas/aiAsk.js';
import { AiItemAsk } from '../schemas/aiItemAsk.js';
import { AiItemAskTypeField } from '../schemas/aiItemAsk.js';
import { AiResponse } from '../schemas/aiResponse.js';
import { AiTextGen } from '../schemas/aiTextGen.js';
import { AiTextGenItemsField } from '../schemas/aiTextGen.js';
import { AiTextGenItemsTypeField } from '../schemas/aiTextGen.js';
import { AiDialogueHistory } from '../schemas/aiDialogueHistory.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { AiExtract } from '../schemas/aiExtract.js';
import { AiItemBase } from '../schemas/aiItemBase.js';
import { AiExtractStructuredResponse } from '../schemas/aiExtractStructuredResponse.js';
import { AiExtractStructured } from '../schemas/aiExtractStructured.js';
import { AiExtractStructuredFieldsField } from '../schemas/aiExtractStructured.js';
import { AiExtractStructuredFieldsOptionsField } from '../schemas/aiExtractStructured.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { AiExtractStructuredMetadataTemplateField } from '../schemas/aiExtractStructured.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { getDefaultClient } from './commons.js';
import { getUuid } from '../internal/utils.js';
import { stringToByteStream } from '../internal/utils.js';
import { delayInSeconds } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { dateTimeFromString } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { getValueFromObjectRawData } from '../internal/utils.js';
import { uploadNewFile } from './commons.js';
import { AiAgentAsk } from '../schemas/aiAgentAsk.js';
import { AiAgentTextGen } from '../schemas/aiAgentTextGen.js';
import { AiAgentExtract } from '../schemas/aiAgentExtract.js';
import { AiAgentExtractStructured } from '../schemas/aiAgentExtractStructured.js';
import { AiAgentLongTextTool } from '../schemas/aiAgentLongTextTool.js';
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
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'ask' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  const aiAskAgentConfig: AiAgentAsk = aiAgentConfig as AiAgentAsk;
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
    aiAgent: aiAskAgentConfig,
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
  const aiAgentConfig: AiAgent = await client.ai.getAiAgentDefaultConfig({
    mode: 'text_gen' as GetAiAgentDefaultConfigQueryParamsModeField,
    language: 'en-US',
  } satisfies GetAiAgentDefaultConfigQueryParams);
  const aiTextGenAgentConfig: AiAgentTextGen = aiAgentConfig as AiAgentTextGen;
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
    aiAgent: aiTextGenAgentConfig,
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
  const longTextConfigWithNoEmbeddings: AiAgentLongTextTool = {
    systemMessage: aiExtractAgentConfig.longText!.systemMessage,
    promptTemplate: aiExtractAgentConfig.longText!.promptTemplate,
    model: aiExtractAgentConfig.longText!.model,
    numTokensForCompletion:
      aiExtractAgentConfig.longText!.numTokensForCompletion,
    llmEndpointParams: aiExtractAgentConfig.longText!.llmEndpointParams,
  } satisfies AiAgentLongTextTool;
  const agentIgnoringOverridingEmbeddingsModel: AiAgentExtract =
    new AiAgentExtract({
      basicText: aiExtractAgentConfig.basicText,
      longText: longTextConfigWithNoEmbeddings,
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
    aiAgent: agentIgnoringOverridingEmbeddingsModel,
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
  const longTextConfigWithNoEmbeddings: AiAgentLongTextTool = {
    systemMessage: aiExtractStructuredAgentConfig.longText!.systemMessage,
    promptTemplate: aiExtractStructuredAgentConfig.longText!.promptTemplate,
    model: aiExtractStructuredAgentConfig.longText!.model,
    numTokensForCompletion:
      aiExtractStructuredAgentConfig.longText!.numTokensForCompletion,
    llmEndpointParams:
      aiExtractStructuredAgentConfig.longText!.llmEndpointParams,
  } satisfies AiAgentLongTextTool;
  const agentIgnoringOverridingEmbeddingsModel: AiAgentExtractStructured =
    new AiAgentExtractStructured({
      basicText: aiExtractStructuredAgentConfig.basicText,
      longText: longTextConfigWithNoEmbeddings,
    });
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
      aiAgent: agentIgnoringOverridingEmbeddingsModel,
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
