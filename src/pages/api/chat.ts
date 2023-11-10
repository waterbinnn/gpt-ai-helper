// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export default async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a creative helpful assistant. You are a youtube creater.",
      },
      ...messages,
    ],
  });

  //openAI 데이터를 stream 형식으로 생성
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client
  return new StreamingTextResponse(stream);
}
