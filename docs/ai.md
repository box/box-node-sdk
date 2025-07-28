# AiManager

- [Ask question](#ask-question)
- [Generate text](#generate-text)
- [Get AI agent default configuration](#get-ai-agent-default-configuration)
- [Extract metadata (freeform)](#extract-metadata-freeform)
- [Extract metadata (structured)](#extract-metadata-structured)

## Ask question

Sends an AI request to supported LLMs and returns an answer specifically focused on the user's question given the provided context.

This operation is performed by calling function `createAiAsk`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-ai-ask/).

<!-- sample post_ai_ask -->

```ts
await client.ai.createAiAsk({
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
```

### Arguments

- requestBody `AiAsk`
  - Request body of createAiAsk method
- optionalsInput `CreateAiAskOptionalsInput`

### Returns

This function returns a value of type `undefined | AiResponseFull`.

A successful response including the answer from the LLM.No content is available to answer the question. This is returned when the request item is a hub, but content in the hubs is not indexed. To ensure content in the hub is indexed, make sure Box AI for Hubs in the Admin Console was enabled before hub creation.

## Generate text

Sends an AI request to supported Large Language Models (LLMs) and returns generated text based on the provided prompt.

This operation is performed by calling function `createAiTextGen`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-ai-text-gen/).

<!-- sample post_ai_text_gen -->

```ts
await client.ai.createAiTextGen({
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
```

### Arguments

- requestBody `AiTextGen`
  - Request body of createAiTextGen method
- optionalsInput `CreateAiTextGenOptionalsInput`

### Returns

This function returns a value of type `AiResponse`.

A successful response including the answer from the LLM.

## Get AI agent default configuration

Get the AI agent default config.

This operation is performed by calling function `getAiAgentDefaultConfig`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-ai-agent-default/).

<!-- sample get_ai_agent_default -->

```ts
await client.ai.getAiAgentDefaultConfig({
  mode: 'ask' as GetAiAgentDefaultConfigQueryParamsModeField,
  language: 'en-US',
} satisfies GetAiAgentDefaultConfigQueryParams);
```

### Arguments

- queryParams `GetAiAgentDefaultConfigQueryParams`
  - Query parameters of getAiAgentDefaultConfig method
- optionalsInput `GetAiAgentDefaultConfigOptionalsInput`

### Returns

This function returns a value of type `AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen`.

A successful response including the default agent configuration.
This response can be one of the following four objects:

- AI agent for questions
- AI agent for text generation
- AI agent for freeform metadata extraction
- AI agent for structured metadata extraction.
  The response depends on the agent configuration requested in this endpoint.

## Extract metadata (freeform)

Sends an AI request to supported Large Language Models (LLMs) and extracts metadata in form of key-value pairs.
In this request, both the prompt and the output can be freeform.
Metadata template setup before sending the request is not required.

This operation is performed by calling function `createAiExtract`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-ai-extract/).

<!-- sample post_ai_extract -->

```ts
await client.ai.createAiExtract({
  prompt: 'firstName, lastName, location, yearOfBirth, company',
  items: [new AiItemBase({ id: file.id })],
  aiAgent: agentIgnoringOverridingEmbeddingsModel,
} satisfies AiExtract);
```

### Arguments

- requestBody `AiExtract`
  - Request body of createAiExtract method
- optionalsInput `CreateAiExtractOptionalsInput`

### Returns

This function returns a value of type `AiResponse`.

A response including the answer from the LLM.

## Extract metadata (structured)

Sends an AI request to supported Large Language Models (LLMs) and returns extracted metadata as a set of key-value pairs.
For this request, you either need a metadata template or a list of fields you want to extract.
Input is **either** a metadata template or a list of fields to ensure the structure.
To learn more about creating templates, see [Creating metadata templates in the Admin Console](https://support.box.com/hc/en-us/articles/360044194033-Customizing-Metadata-Templates)
or use the [metadata template API](g://metadata/templates/create).

This operation is performed by calling function `createAiExtractStructured`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-ai-extract-structured/).

<!-- sample post_ai_extract_structured -->

```ts
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
```

### Arguments

- requestBody `AiExtractStructured`
  - Request body of createAiExtractStructured method
- optionalsInput `CreateAiExtractStructuredOptionalsInput`

### Returns

This function returns a value of type `AiExtractStructuredResponse`.

A successful response including the answer from the LLM.
