# 기록용

chatGPT api로 채팅앱 구현

nextjs로 SSR 이 되기 때문에 따로 서버를 세팅할 필요 없이, pages/api 에 코드를 작성하면 서버에서 실행되며, 클라이언트에서 요청할 수 있는 API 엔드포인트를 만들 수 있다.

## model

: **gpt-3.5-turbo-0613**

docs
[OpenAI Platform](https://platform.openai.com/docs/api-reference/chat/create)

### stream 으로 실제 채팅앱처럼 구현하기

<p>기존에 응답이 다 오면 화면에 보여주는 형식은 너무 오래 기다려야해서 사용자 경험에 좋지 않다고 느꼈다. 실제로 chatGPT 를 사용하면 응답을 stream 형식으로 준다. 관련 문서를 찾아보니 next.js 에서 stream 에 관련해 자세하게 설명해주고 있었다.</p>
docs

[openAI streaming in next.js](https://vercel.com/blog/an-introduction-to-streaming-on-the-web)

### chat 구현

- useChat

  useChat로 chatting app 구현을 쉽게 해줄 수 있다.

```tsx
const {
  input, //사용자 input state를 따로 딸 필요 없이 input state를 불러올 수 있음
  handleInputChange, //setInput(()=>e.target.value) 해줄 필요 없이 input state 저장
  handleSubmit, //submit 함수를 따로 만들어줄 필요 없이 내장되어있음
  isLoading,
  messages, //아래 설명
} = useChat();
```

messages : ai messages 를 받을 수 있음. 이게 제일 중요한데 기존에 setChatLogs state로 관리했던 message들을 객체로 깔끔하게 담아준다.
role, content, createdAt, id 을 출력함.
</br>
짱인 점은 messages 내 ai 대답을 담는 index.content에 글씨가 하나씩 담기는 점이다. 서버에서 글자를 하나씩 보내줘서 이걸 map돌려 streaming 해줄 수 있는것!
아래 이미지를 보면 처음엔 한글자만 담기다가 점점 다 담기는 것을 볼 수 있음!

useChat 을 써준다고 다 되는 것은 아님.
<br/>
서버 측에서 동작할 API핸들러가 필요하다. app/chat.ts 파일을 작성해줘야 한다. 반드시 파일명을 chat.ts로 해줘야 함!

```tsx
//app/chat.ts

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; //추후 배포 환경 위해 작성

const config = new Configuration({
  //openAI API를 사용하기 위한 설정
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export default async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true, //streaming 을 위해 꼭 써야함
    messages: [
      {
        role: "system",
        content:
          "You are a creative helpful assistant. You are a youtube creater.", //AI 가 어떤 시스템인지를 인지시켜 준다. 여기서는 크리에이티브 한 크리에이터로 설정
      },
      ...messages,
    ],
  });

  //openAI API의 응답을 스트림 형식으로 처리하고,
  const stream = await OpenAIStream(response);

  // 해당 스트림을 클라이언트로 응답으로 반환
  return new StreamingTextResponse(stream);
}
```

- client code

```tsx
//src/components/Chat.tsx

<ul className={cx("feed")} ref={chatContainerRef}>
  {messages.map((message: Message, index: number) => {
    //주고받은 메세지들을 담은 messages 배열을 map 돌려서 채팅 형식으로 구성
    return (
      <li
        key={message.id + index}
        className={cx("chatting", { user: message.role === "user" })}
      >
        {message.role === "assistant" && <div className={cx("bot-icon")}></div>}
        <div className={cx("multiple-chats")}>
          {message.content.split("\n").map((text: string, index: number) => {
            if (text === "") {
              // 문단이 달라지면 다른 말풍선으로 보여주기 위함
              return (
                <p className={cx("nbsp")} key={message.id + index}>
                  &nbsp;
                </p>
              );
            } else {
              return (
                <p
                  className={cx("chat", {
                    user: message.role === "user",
                  })}
                  key={message.id + index}
                >
                  {text}
                </p>
              );
            }
          })}
        </div>
      </li>
    );
  })}
</ul>
```

- user input 이 길어질 경우 textarea 의 height 높이 자동 조절이 가능하게 해주었다.

```tsx
const handleResizeHeight = useCallback(() => {
  if (!textRef.current) {
    return;
  }
  textRef.current.style.height = "100px";
  textRef.current.style.height = textRef.current.scrollHeight + "px";
}, []);
```

- 응답이 길어질 때 자동으로 scroll 이 내려가게 만들어 주었다.

```tsx
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);
```
