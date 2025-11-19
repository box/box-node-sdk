import { serializeAiSingleAgentResponseFull } from '@/schemas/aiSingleAgentResponseFull';
import { deserializeAiSingleAgentResponseFull } from '@/schemas/aiSingleAgentResponseFull';
import { serializeCreateAiAgent } from '@/schemas/createAiAgent';
import { deserializeCreateAiAgent } from '@/schemas/createAiAgent';
import { serializeAiStudioAgentAsk } from '@/schemas/aiStudioAgentAsk';
import { deserializeAiStudioAgentAsk } from '@/schemas/aiStudioAgentAsk';
import { serializeAiMultipleAgentResponse } from '@/schemas/aiMultipleAgentResponse';
import { deserializeAiMultipleAgentResponse } from '@/schemas/aiMultipleAgentResponse';
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
import { serializeAiAgentReference } from '@/schemas/aiAgentReference';
import { deserializeAiAgentReference } from '@/schemas/aiAgentReference';
import { CreateAiAgentInput } from '@/schemas/createAiAgent';
import { GetAiAgentByIdOptionalsInput } from '@/managers/aiStudio';
import { GetAiAgentByIdOptionals } from '@/managers/aiStudio';
import { AiSingleAgentResponseFull } from '@/schemas/aiSingleAgentResponseFull';
import { CreateAiAgent } from '@/schemas/createAiAgent';
import { AiStudioAgentAsk } from '@/schemas/aiStudioAgentAsk';
import { AiMultipleAgentResponse } from '@/schemas/aiMultipleAgentResponse';
import { GetAiAgentByIdQueryParams } from '@/managers/aiStudio';
import { FileFull } from '@/schemas/fileFull';
import { AiResponseFull } from '@/schemas/aiResponseFull';
import { AiAsk } from '@/schemas/aiAsk';
import { AiAskModeField } from '@/schemas/aiAsk';
import { AiItemAsk } from '@/schemas/aiItemAsk';
import { AiItemAskTypeField } from '@/schemas/aiItemAsk';
import { BoxDeveloperTokenAuth } from '@/box/developerTokenAuth';
import { BoxClient } from '@/client';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { getUuid } from '@/internal/utils';
import { AiAgentReference } from '@/schemas/aiAgentReference';
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
test('testAiStudioCRUD', async function testAiStudioCRUD(): Promise<any> {
  const agentName: string = getUuid();
  const createdAgent: AiSingleAgentResponseFull =
    await client.aiStudio.createAiAgent({
      name: agentName,
      accessState: 'enabled',
      ask: new AiStudioAgentAsk({
        accessState: 'enabled',
        description: 'desc1',
      }),
    } satisfies CreateAiAgentInput);
  if (!(createdAgent.name == agentName)) {
    throw new Error('Assertion failed');
  }
  const agents: AiMultipleAgentResponse = await client.aiStudio.getAiAgents();
  const numAgents: number = agents.entries.length;
  if (!((toString(agents.entries[0].type) as string) == 'ai_agent')) {
    throw new Error('Assertion failed');
  }
  const retrievedAgent: AiSingleAgentResponseFull =
    await client.aiStudio.getAiAgentById(createdAgent.id, {
      queryParams: { fields: ['ask'] } satisfies GetAiAgentByIdQueryParams,
    } satisfies GetAiAgentByIdOptionalsInput);
  if (!(retrievedAgent.name == agentName)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(retrievedAgent.accessState) as string) == 'enabled')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(retrievedAgent.ask!.accessState) as string) == 'enabled')) {
    throw new Error('Assertion failed');
  }
  if (!(retrievedAgent.ask!.description == 'desc1')) {
    throw new Error('Assertion failed');
  }
  const updatedAgent: AiSingleAgentResponseFull =
    await client.aiStudio.updateAiAgentById(createdAgent.id, {
      name: agentName,
      accessState: 'enabled',
      ask: new AiStudioAgentAsk({
        accessState: 'disabled',
        description: 'desc2',
      }),
    } satisfies CreateAiAgentInput);
  if (!((toString(updatedAgent.accessState) as string) == 'enabled')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedAgent.ask!.accessState) as string) == 'disabled')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedAgent.ask!.description == 'desc2')) {
    throw new Error('Assertion failed');
  }
  await client.aiStudio.deleteAiAgentById(createdAgent.id);
  const agentsAfterDelete: AiMultipleAgentResponse =
    await client.aiStudio.getAiAgents();
  if (!(agentsAfterDelete.entries.length == numAgents - 1)) {
    throw new Error('Assertion failed');
  }
});
test('testUseAIAgentReferenceInAIAsk', async function testUseAIAgentReferenceInAIAsk(): Promise<any> {
  const agentName: string = getUuid();
  const createdAgent: AiSingleAgentResponseFull =
    await client.aiStudio.createAiAgent({
      name: agentName,
      accessState: 'enabled',
      ask: new AiStudioAgentAsk({
        accessState: 'enabled',
        description: 'desc1',
      }),
    } satisfies CreateAiAgentInput);
  const fileToAsk: FileFull = await uploadNewFile();
  const response: undefined | AiResponseFull = await client.ai.createAiAsk({
    mode: 'single_item_qa' as AiAskModeField,
    prompt: 'Which direction does the Sun rise?',
    items: [
      {
        id: fileToAsk.id,
        type: 'file' as AiItemAskTypeField,
        content: 'The Sun rises in the east.',
      } satisfies AiItemAsk,
    ],
    aiAgent: new AiAgentReference({ id: createdAgent.id }),
  } satisfies AiAsk);
  if (!(response!.answer.includes('east') as boolean)) {
    throw new Error('Assertion failed');
  }
  if (!(response!.completionReason == 'done')) {
    throw new Error('Assertion failed');
  }
  if (!(response!.aiAgentInfo!.models!.length > 0)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileToAsk.id);
  await client.aiStudio.deleteAiAgentById(createdAgent.id);
});
export {};
