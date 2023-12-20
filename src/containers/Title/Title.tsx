import React, { ChangeEvent, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Title.module.scss';
import { useChat } from 'ai/react';

import CopyIcon from '/public/copy.svg';
import { BaseInput, TemperatureInput, Button } from '../../components';
import { message } from 'antd';

const cx = classNames.bind(styles);

export const Title = () => {
  const [temp, setTemp] = useState(0.5);
  const [messageApi, contextHolder] = message.useMessage();

  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      api: 'api/title',
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
      messageApi.open({
        type: 'success',
        content: 'copied!',
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'try again',
      });
    }
  };

  return (
    <section>
      {contextHolder}
      <h2 className={cx('head-title')}>TITLE MAKER</h2>
      <div className={cx('agent-wrap')}>
        <form onSubmit={handleFormSubmit} className={cx('form-wrap')}>
          {/* temperature */}
          <TemperatureInput
            label={'창의도를 설정하세요.'}
            temp={temp}
            handleTemp={handleTemp}
          />
          {/* subject  */}
          <BaseInput
            label={'주제를 입력하세요.'}
            input={input}
            handleInputChange={handleInputChange}
          />
          <Button
            disabled={isLoading || input.length === 0}
            isLoading={isLoading}
          />
        </form>

        <h3 className={cx('ai-title')}>AI 제목</h3>
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
