import { Message, useChat } from 'ai/react';
import { useCallback, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Chatbot.module.scss';
import Spinner from '/public/spinner.svg';

const cx = classNames.bind(styles);

export function Chatbot() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLUListElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!textRef.current) {
      return;
    }
    textRef.current.style.height = '100px';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className={cx('chat-container')}>
      <div className={cx('chat-wrap')}>
        <ul className={cx('feed')} ref={chatContainerRef}>
          <li className={cx('chatting')}>
            <div className={cx('bot-icon')}></div>
            <p className={cx('chat')}>안녕하세요? 무엇이든 물어보세요! </p>
          </li>
          {messages.map((message: Message, index: number) => {
            return (
              <li
                key={message.id + index}
                className={cx('chatting', { user: message.role === 'user' })}
              >
                {message.role === 'assistant' && (
                  <div className={cx('bot-icon')}></div>
                )}
                {message.role === 'assistant' ? (
                  <div className={cx('multiple-chats')}>
                    {message.content
                      .split('\n')
                      .map((text: string, index: number) => {
                        if (text === '') {
                          return (
                            <p className={cx('nbsp')} key={message.id + index}>
                              &nbsp;
                            </p>
                          );
                        } else {
                          return (
                            <p className={cx('chat')} key={message.id + index}>
                              {text}
                            </p>
                          );
                        }
                      })}
                  </div>
                ) : (
                  <p className={cx('chat', 'user')} key={message.id + index}>
                    {message.content}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <form onSubmit={handleSubmit} className={cx('form-wrap')}>
          <textarea
            ref={textRef}
            className={cx('message')}
            value={input}
            onChange={handleInputChange}
            onInput={handleResizeHeight}
          />
          <button className={cx('btn-send')}>
            {isLoading ? (
              <>
                <div className={cx('icon')}>
                  <Spinner />
                </div>
                <span className={cx('text')}>Loading</span>
              </>
            ) : (
              <span className={cx('text')}>Send</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
