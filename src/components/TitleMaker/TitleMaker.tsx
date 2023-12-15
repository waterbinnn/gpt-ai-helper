import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames/bind';
import styles from './TitleMaker.module.scss';
import { useChat } from 'ai/react';

import CopyIcon from '/public/copy.svg';

const cx = classNames.bind(styles);

export const TitleMaker = () => {
  const [temp, setTemp] = useState(0.5);

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    setMessages,
    isLoading,
  } = useChat({
    api: 'api/agents',
    body: {
      temperature: temp,
    },
  });

  //creative 설정
  const handleTemp = (e: ChangeEvent<HTMLInputElement>) => {
    setTemp(Number(e.currentTarget.value));
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h2 className={cx('head-title')}>TITLE MAKER</h2>
      <div className={cx('agent-wrap')}>
        <form onSubmit={handleFormSubmit} className={cx('form-wrap')}>
          <div className={cx('title-wrap')}>
            <label htmlFor='temperature'>창의도를 설정하세요.</label>
            <div className={cx('temp-wrap')}>
              <input
                type='range'
                min={0}
                max={1}
                step={0.1}
                value={temp}
                onChange={handleTemp}
                className={cx('input-range')}
              />
              <input
                id='temperature'
                type='number'
                min={0}
                max={1}
                step={0.1}
                className={cx('temp')}
                value={temp}
                onChange={handleTemp}
              />
            </div>
          </div>
          <div className={cx('title-wrap')}>
            <label htmlFor='subject'>주제를 입력하세요.</label>
            <input
              className={cx('input-text')}
              value={input}
              onChange={handleInputChange}
              id='subject'
            />
          </div>
          <button
            disabled={isLoading || input.length === 0}
            className={cx('btn-send')}
          >
            {isLoading ? 'Loading' : 'Send'}
          </button>
        </form>

        <h3 className={cx('ai-title')}>AI TITLE</h3>
        <div className={cx('message-container')}>
          {messages.map((message) => (
            <div key={message.id} className={cx('messages')}>
              {message.content
                .split('\n')
                .map((text: string, index: number) => {
                  return (
                    <div
                      onClick={() => handleCopy(text)}
                      key={message.id + index}
                      className={cx('message', {
                        input: message.role === 'user',
                      })}
                    >
                      <p>
                        {message.role === 'assistant' ? text : `주제 : ${text}`}
                      </p>
                      {message.role === 'assistant' && <CopyIcon />}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
