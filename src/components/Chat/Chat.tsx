import { SendMessage } from "../SendMessage/SendMessage";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

interface ChatLog {
  type: string;
  message: string;
}

export const Chat = () => {
  const [userMsg, setUserMsg] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: userMsg },
    ]);
    sendMessage(userMsg);
    setUserMsg("");
  };

  const sendMessage = async (message: string) => {
    const url = "/api/chat";
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 1.0, //creative 정도
      // max_tokens: 100, //답변길이
    };

    setIsLoading(true);

    await axios
      .post(url, data)
      .then((response) => {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx("chat-container")}>
      <h2 className={cx("title")}>CHAT</h2>
      <ul className={cx("feed")}>
        {chatLog.map((chat, index) => (
          <li
            key={index}
            className={cx("chat", { user: chat.type === "user" })}
          >
            {chat.message}
          </li>
        ))}
        {isLoading && (
          <li key={chatLog.length} className={cx("chat")}>
            Loading...
          </li>
        )}
      </ul>
      <div className={cx("bottom-section")}>
        <SendMessage
          userMsg={userMsg}
          setUserMsg={setUserMsg}
          getMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
