import classNames from 'classnames/bind';
import styles from '../Title/Title.module.scss';
import scriptStyles from './Scripts.module.scss';
import { ChangeEvent, useState } from 'react';
import { useChat } from 'ai/react';
import { BaseInput, Button, TemperatureInput } from '../../components';

import CopyIcon from '/public/copy.svg';
import { message } from 'antd';

const cx = classNames.bind({ ...styles, ...scriptStyles });

export const Script = () => {
  const [temp, setTemp] = useState(0.5);
  const [messageApi, contextHolder] = message.useMessage();

  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      api: 'api/script',
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
      <h2 className={cx('head-title')}>SCRIPT MAKER</h2>
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

        <h3 className={cx('ai-title')}>AI 대본</h3>
        <div className={cx('message-container')}>
          {messages.map((message) => (
            <>
              <div
                key={message.id}
                className={'messages'}
                onClick={() => handleCopy(message.content)}
              >
                <div
                  className={cx('message', {
                    input: message.role === 'user',
                  })}
                >
                  {message.role === 'assistant'
                    ? message.content
                    : `주제 : ${message.content}`}
                  {message.role === 'assistant' && (
                    <div className={cx('icon-copy')}>
                      <CopyIcon />
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};
