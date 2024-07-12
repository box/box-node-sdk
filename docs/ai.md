AI
==

AI allows to send an intelligence request to supported large language models and returns an answer based on the provided prompt and items.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Send AI request](#send-ai-request)
- [Send AI text generation request](#send-ai-text-generation-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Send AI request
------------------------

To send an AI request to the supported large language models, call the
[`ai.ask(body, options?, callback?)`](http://opensource.box.com/box-node-sdk/jsdoc/AI.html#ask) method with the prompt and items. The `items` parameter is a list of items to be processed by the LLM, often files. The `prompt` provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters. The `mode`  specifies if this request is for a single or multiple items. If you select `single_item_qa` the items array can have one element only. Selecting `multiple_item_qa` allows you to provide up to 25 items.

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
[`ai.textGen(body, options?, callback?)`](http://opensource.box.com/box-node-sdk/jsdoc/AI.html#textGen) method with the prompt, items and dialogue history. The `dialogue_history` parameter is history of prompts and answers previously passed to the LLM. This provides additional context to the LLM in generating the response. The `items` parameter is a list of items to be processed by the LLM, often files. The `prompt` provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters.

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
