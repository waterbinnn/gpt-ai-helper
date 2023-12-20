import { AIMessage, ChatMessage, HumanMessage } from 'langchain/schema';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { GoogleCustomSearch } from 'langchain/tools';
import { NextRequest, NextResponse } from 'next/server';
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';

export const runtime = 'edge';

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content);
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const PREFIX_TEMPLATE = `You are a helpful assistant.
 you have to write creative story about message. 
 `;

export default async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === 'user' || message.role === 'assistant'
    );
    const returnIntermediateSteps = body.show_intermediate_steps;
    const previousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const tools = [new GoogleCustomSearch()];

    const chat = new ChatOpenAI({
      modelName: 'gpt-4',
      temperature: body.temperature,
    });

    const executor = await initializeAgentExecutorWithOptions(tools, chat, {
      agentType: 'openai-functions',
      verbose: true,
      returnIntermediateSteps,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        chatHistory: new ChatMessageHistory(previousMessages),
        returnMessages: true,
        outputKey: 'output',
      }),
      agentArgs: {
        prefix: PREFIX_TEMPLATE,
      },
    });

    const result = await executor.call({
      input: `search about '${currentMessageContent}' on internet. make new creative story`,
    });

    if (returnIntermediateSteps) {
      return NextResponse.json({ output: result.output }, { status: 200 });
    } else {
      const textEncoder = new TextEncoder();
      const fakeStream = new ReadableStream({
        async start(controller) {
          for (const character of result.output) {
            controller.enqueue(textEncoder.encode(character));
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(fakeStream);
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
