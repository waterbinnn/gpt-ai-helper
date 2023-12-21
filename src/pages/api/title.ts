import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const PREFIX_TEMPLATE = `You are a helpful assistant.
 you have to make title about message. answer creative way. in korean.
 Answer only three in the form of list. don't write other text except list. 
 you must not show message like "1.text" .
 you should show message just only text. (without "" and list style number.) 
 `;

export default async function POST(request: Request) {
  const body = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    temperature: body.temperature,
    messages: [
      {
        role: 'system',
        content: PREFIX_TEMPLATE,
      },
      ...body.messages,
    ],
  });

  //openAI 데이터를 stream 형식으로 생성
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client
  return new StreamingTextResponse(stream);
}
