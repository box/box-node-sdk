import { serializeAiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { deserializeAiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { serializeCreateAiAgent } from '../schemas/createAiAgent.generated.js';
import { deserializeCreateAiAgent } from '../schemas/createAiAgent.generated.js';
import { serializeAiStudioAgentAsk } from '../schemas/aiStudioAgentAsk.generated.js';
import { deserializeAiStudioAgentAsk } from '../schemas/aiStudioAgentAsk.generated.js';
import { serializeAiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
import { deserializeAiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
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
import { serializeAiAgentReference } from '../schemas/aiAgentReference.generated.js';
import { deserializeAiAgentReference } from '../schemas/aiAgentReference.generated.js';
import { CreateAiAgentInput } from '../schemas/createAiAgent.generated.js';
import { GetAiAgentByIdOptionalsInput } from '../managers/aiStudio.generated.js';
import { GetAiAgentByIdOptionals } from '../managers/aiStudio.generated.js';
import { AiSingleAgentResponseFull } from '../schemas/aiSingleAgentResponseFull.generated.js';
import { CreateAiAgent } from '../schemas/createAiAgent.generated.js';
import { AiStudioAgentAsk } from '../schemas/aiStudioAgentAsk.generated.js';
import { AiMultipleAgentResponse } from '../schemas/aiMultipleAgentResponse.generated.js';
import { GetAiAgentByIdQueryParams } from '../managers/aiStudio.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { AiResponseFull } from '../schemas/aiResponseFull.generated.js';
import { AiAsk } from '../schemas/aiAsk.generated.js';
import { AiAskModeField } from '../schemas/aiAsk.generated.js';
import { AiItemAsk } from '../schemas/aiItemAsk.generated.js';
import { AiItemAskTypeField } from '../schemas/aiItemAsk.generated.js';
import { BoxDeveloperTokenAuth } from '../box/developerTokenAuth.generated.js';
import { BoxClient } from '../client.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { getUuid } from '../internal/utils.js';
import { AiAgentReference } from '../schemas/aiAgentReference.generated.js';
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
    prompt: 'which direction sun rises',
    items: [
      {
        id: fileToAsk.id,
        type: 'file' as AiItemAskTypeField,
        content: 'Sun rises in the East',
      } satisfies AiItemAsk,
    ],
    aiAgent: new AiAgentReference({ id: createdAgent.id }),
  } satisfies AiAsk);
  if (!(response!.answer.includes('East') as boolean)) {
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
