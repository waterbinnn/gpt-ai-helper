# 기록용 

chatGPT api로 채팅앱 구현

# about gpt api

## model 
: **gpt-3.5-turbo-0613**

docs
[OpenAI Platform](https://platform.openai.com/docs/api-reference/chat/create)

## 예시

### 1. “hello”

- 소요시간 : 1.96초
- total tokens : 17
<img width="505" alt="1" src="https://github.com/waterbinnn/gpt-api/assets/96714788/ea8032f8-fbf3-4540-b2ab-557c8939a1f8">
<img width="587" alt="2" src="https://github.com/waterbinnn/gpt-api/assets/96714788/2678bdd4-2f5f-4aa9-b7c0-a63d754c193a">


hello 같은 단순한 요청은 빠른 답변이 옴 . 


반면 창의성 필요한 질문에는 대답이 느림 

### 2. 계산식 “what is 10101010*38383838?”

- 소요시간 : 6.69초
- total tokens : 44
<img width="636" alt="3" src="https://github.com/waterbinnn/gpt-api/assets/96714788/54be6a9e-1953-4660-b2ef-9b889df29f2e">
<img width="565" alt="4" src="https://github.com/waterbinnn/gpt-api/assets/96714788/150edf4c-9299-4fa2-b297-594f5d029f54">


### 3. 리액트의 동작 원리를 알려줘

- 소요 시간 : 55.36초
- total tokens : 731
<img width="1333" alt="5" src="https://github.com/waterbinnn/gpt-api/assets/96714788/84fa9749-5eb2-4ba0-96e2-1efaa1591bf3">
<img width="546" alt="6" src="https://github.com/waterbinnn/gpt-api/assets/96714788/66c12214-d5df-49a0-b7e2-e182ded69245">


### 4. 제목을 지어줘

- 소요시간 : 23.07초
- total tokens : 379
- 이어서 재질문했을 때 소요시간 : 8.99초
<img width="641" alt="7" src="https://github.com/waterbinnn/gpt-api/assets/96714788/786de171-7883-4e1e-823c-d357f6d907f9">
<img width="640" alt="8" src="https://github.com/waterbinnn/gpt-api/assets/96714788/2015fbbe-f659-4131-9ce9-0b2dd4f87289">


### 5. 한국어 질문 vs 영어 질문 - 영어가 빠름빠름

- 한국어 질문 소요시간 : 13.00 초
- 영어 질문 소요시간 : 9.83초
<img width="837" alt="9" src="https://github.com/waterbinnn/gpt-api/assets/96714788/7c0674b8-1faa-4506-93c8-1cea6c6ed18e">

## About code

```jsx
{model: "gpt-3.5-turbo", messages: [{role: "user", content: "hello"}], temperature: 1, max_tokens: 100}
max_tokens: 100
messages: [{role: "user", content: "hello"}]
0: {role: "user", content: "hello"}
content: "hello"
role: "user"
model: "gpt-3.5-turbo"
temperature: 1
```

```jsx
{id: "chatcmpl-8H5rwESuqBtUzmI1iVhqhx4SVBjKd", object: "chat.completion", created: 1699084828,…}
choices: [{index: 0, message: {role: "assistant",…}, finish_reason: "stop"}]
0: {index: 0, message: {role: "assistant",…}, finish_reason: "stop"}
finish_reason: "stop"
index: 0
message: {role: "assistant",…}
created: 1699084828
id: "chatcmpl-8H5rwESuqBtUzmI1iVhqhx4SVBjKd"
model: "gpt-3.5-turbo-0613"
object: "chat.completion"
usage: {prompt_tokens: 28, completion_tokens: 93, total_tokens: 121}
completion_tokens: 93
prompt_tokens: 28
total_tokens: 121
```

- Temperature
    
    : 다양성(degree of diversity) 정도를 나타내며 높을수록 창의적인 결과물을 만들어준다. 
    
    온도(temperature)값의 범위는 0에서 무한대이지만 일반적으로 0.5 ~ 1.0 사이의 값이을 주로 사용 한다.
    정보성 글일때는 낮은 온도를 사용하고 창의성이 필요한 경우에는 높은 온도로 설정하여 사용하면 된다. (지정 안했을 때의 기본 값은 0.7)
    
- Max Tokens
    
    텍스트의 최대 길이(max_tokens)는 생성되는 텍스트의 최대 길이를 지정하는 값.
    기본값은 256이며 최대값은 2048.
