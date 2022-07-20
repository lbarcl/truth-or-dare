import OpenAI from 'openai-api';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    const openai = new OpenAI("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");
    const response = await openai.complete({
        engine: 'davinci',
        prompt: 'Write a truth question for truth or dare game.',
        maxTokens: 50,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    })

    return {
      status: 200,
      headers: {
        'access-control-allow-origin': 'sameorigin'
      },
      body: JSON.stringify(response.data)
    };
  }