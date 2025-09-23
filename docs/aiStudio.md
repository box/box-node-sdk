# AiStudioManager

- [List AI agents](#list-ai-agents)
- [Create AI agent](#create-ai-agent)
- [Update AI agent](#update-ai-agent)
- [Get AI agent by agent ID](#get-ai-agent-by-agent-id)
- [Delete AI agent](#delete-ai-agent)

## List AI agents

Lists AI agents based on the provided parameters.

This operation is performed by calling function `getAiAgents`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-ai-agents/).

<!-- sample get_ai_agents -->

```ts
await client.aiStudio.getAiAgents();
```

### Arguments

- queryParams `GetAiAgentsQueryParams`
  - Query parameters of getAiAgents method
- headersInput `GetAiAgentsHeadersInput`
  - Headers of getAiAgents method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `AiMultipleAgentResponse`.

A successful response including the agents list.

## Create AI agent

Creates an AI agent. At least one of the following capabilities must be provided: `ask`, `text_gen`, `extract`.

This operation is performed by calling function `createAiAgent`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-ai-agents/).

<!-- sample post_ai_agents -->

```ts
await client.aiStudio.createAiAgent({
  name: agentName,
  accessState: 'enabled',
  ask: new AiStudioAgentAsk({ accessState: 'enabled', description: 'desc1' }),
} satisfies CreateAiAgentInput);
```

### Arguments

- requestBodyInput `CreateAiAgentInput`
  - Request body of createAiAgent method
- optionalsInput `CreateAiAgentOptionalsInput`

### Returns

This function returns a value of type `AiSingleAgentResponseFull`.

Definition of created AI agent.

## Update AI agent

Updates an AI agent.

This operation is performed by calling function `updateAiAgentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-ai-agents-id/).

<!-- sample put_ai_agents_id -->

```ts
await client.aiStudio.updateAiAgentById(createdAgent.id, {
  name: agentName,
  accessState: 'enabled',
  ask: new AiStudioAgentAsk({ accessState: 'disabled', description: 'desc2' }),
} satisfies CreateAiAgentInput);
```

### Arguments

- agentId `string`
  - The ID of the agent to update. Example: "1234"
- requestBodyInput `CreateAiAgentInput`
  - Request body of updateAiAgentById method
- optionalsInput `UpdateAiAgentByIdOptionalsInput`

### Returns

This function returns a value of type `AiSingleAgentResponseFull`.

Definition of created AI agent.

## Get AI agent by agent ID

Gets an AI Agent using the `agent_id` parameter.

This operation is performed by calling function `getAiAgentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-ai-agents-id/).

<!-- sample get_ai_agents_id -->

```ts
await client.aiStudio.getAiAgentById(createdAgent.id, {
  queryParams: { fields: ['ask'] } satisfies GetAiAgentByIdQueryParams,
} satisfies GetAiAgentByIdOptionalsInput);
```

### Arguments

- agentId `string`
  - The agent id to get. Example: "1234"
- optionalsInput `GetAiAgentByIdOptionalsInput`

### Returns

This function returns a value of type `AiSingleAgentResponseFull`.

A successful response including the agent.

## Delete AI agent

Deletes an AI agent using the provided parameters.

This operation is performed by calling function `deleteAiAgentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-ai-agents-id/).

<!-- sample delete_ai_agents_id -->

```ts
await client.aiStudio.deleteAiAgentById(createdAgent.id);
```

### Arguments

- agentId `string`
  - The ID of the agent to delete. Example: "1234"
- optionalsInput `DeleteAiAgentByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

A successful response with no content.
