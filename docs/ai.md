AI
==

AI allows to send an intelligence request to supported large language models and returns an answer based on the provided prompt and items.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [AI](#ai)
  - [Send AI request](#send-ai-request)
  - [Send AI text generation request](#send-ai-text-generation-request)
  - [Get AI agent default configuration](#get-ai-agent-default-configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Send AI request
------------------------

To send an AI request to the supported large language models, call the
[`ai.ask(body, options?, callback?)`](http://opensource.box.com/box-node-sdk/jsdoc/AIManager.html#ask) method with the prompt and items. The `items` parameter is a list of items to be processed by the LLM, often files. The `prompt` provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters. The `mode`  specifies if this request is for a single or multiple items. If you select `single_item_qa` the items array can have one element only. Selecting `multiple_item_qa` allows you to provide up to 25 items.

<!-- sample post_ai_ask -->
```js
client.ai.ask(
    {
        prompt: 'What is the capital of France?',
        items: [
            {
                type: 'file',
                id: '12345'
            }
        ],
        mode: 'single_item_qa'
    })
    .then(response => {
        /* response -> {
            "answer": "Paris",
            "created_at": "2021-10-01T00:00:00Z",
            "completion_reason": "done"
        } */
    });
```

NOTE: The AI endpoint may return a 412 status code if you use for your request a file which has just been updated to the box.
It usually takes a few seconds for the file to be indexed and available for the AI endpoint.


Send AI text generation request
------------------------

To send an AI text generation request to the supported large language models, call the
[`ai.textGen(body, options?, callback?)`](http://opensource.box.com/box-node-sdk/jsdoc/AIManager.html#textGen) method with the prompt, items and dialogue history. The `dialogue_history` parameter is history of prompts and answers previously passed to the LLM. This provides additional context to the LLM in generating the response. The `items` parameter is a list of items to be processed by the LLM, often files. The `prompt` provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters.

<!-- sample post_ai_text_gen -->
```js
client.ai.textGen(
    {
        prompt: 'What is the capital of France?',
        items: [
            {
                type: 'file',
                id: '12345'
            }
        ],
        dialogue_history: [
            {
                prompt: 'What is the capital of France?',
                answer: 'Paris',
                created_at: '2021-10-01T00:00:00Z'
            },
            {
                prompt: 'What is the capital of Germany?',
                answer: 'Berlin',
                created_at: '2021-10-01T00:00:00Z'
            }
        ]
    })
    .then(response => {
        /* response -> {
            "answer": "The capital of France is Paris.",
            "created_at": "2021-10-01T00:00:00Z",
            "completion_reason": "done"
        } */
    });
```


 Get AI agent default configuration
------------------------

To get an AI agent default configuration call the [ai.getAiAgentDefaultConfig(options?, callback?)](http://opensource.box.com/box-node-sdk/jsdoc/AIManager.html#getAiAgentDefaultConfig) method. The `mode` parameter filters the agent configuration to be returned. It can be either `ask` or `text_gen`. The `language` parameter specifies the ISO language code to return the agent config for. If the language is not supported, the default agent configuration is returned. The `model` parameter specifies the model for which the default agent configuration should be returned.

<!-- sample get_ai_agent_default -->
```js
client.ai.getAiAgentDefaultConfig({
    mode: 'ask',
    language: 'en',
    model:'openai__gpt_3_5_turbo'
}).then(response => {
    /* response -> {
        "type": "ai_agent_ask",
        "basic_text": {
            "llm_endpoint_params": {
            "type": "openai_params",
            "frequency_penalty": 1.5,
            "presence_penalty": 1.5,
            "stop": "<|im_end|>",
            "temperature": 0,
            "top_p": 1
            },
            "model": "openai__gpt_3_5_turbo",
            "num_tokens_for_completion": 8400,
            "prompt_template": "It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?",
            "system_message": "You are a helpful travel assistant specialized in budget travel"
        },
        ...
    } */
});
```
