import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames/bind';
import styles from './AgentForm.module.scss';
import { useChat } from 'ai/react';

const cx = classNames.bind(styles);

export const AgentForm = () => {
  const [temp, setTemp] = useState(0.5);
  const [script, setScript] = useState<string | ArrayBuffer | null>();
  const [file, setFile] = useState<File | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      api: 'api/agents',
      body: {
        temperature: temp,
        script: script,
      },
    });

  //파일 업로드 버튼 클릭시 input ref 클릭
  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    e.target.value = ''; //같은 파일 재업로드 가능하게
  }, []);

  useEffect(() => {
    if (file) {
      //file to txt
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        setScript(fileReader.result);
      };
    }
  }, [file]);

  const handleFileDelete = () => {
    setFile(null);
  };

  //creative 설정
  const handleTemp = (e: ChangeEvent<HTMLInputElement>) => {
    setTemp(Number(e.currentTarget.value));
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    handleSubmit(e);
    setFile(null);
    setTemp(0.5);
  };

  return (
    <div className={cx('agent-wrap')}>
      <form onSubmit={handleFormSubmit} className={cx('form-wrap')}>
        <input
          type='file'
          ref={fileInput}
          onChange={handleFile}
          accept='text/plain'
          style={{ display: 'none' }}
        />
        <div className={cx('file-wrap')}>
          <button
            disabled={file ? true : false}
            className={cx('btn-upload')}
            onClick={handleClickFileUpload}
            type='button'
          >
            파일 업로드
          </button>
          {file ? (
            <div>
              <span className={cx('file-name')}>{file.name}</span>
              <button
                className={cx('btn-del')}
                type='button'
                onClick={handleFileDelete}
              >
                X
              </button>
            </div>
          ) : null}
        </div>
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
            type='number'
            min={0}
            max={1}
            step={0.1}
            className={cx('temp')}
            value={temp}
            onChange={handleTemp}
          />
        </div>
        <textarea
          className={cx('input-text')}
          value={input}
          onChange={handleInputChange}
          placeholder='텍스트를 입력하세요...'
        />
        <button
          disabled={isLoading || input.length === 0}
          className={cx('btn-send')}
        >
          {isLoading ? 'Loading' : 'Send'}
        </button>
      </form>
      <h3 className={cx('ai-title')}>AI Title</h3>
      <div className={cx('message-container')}>
        {messages.map(
          (message) =>
            message.role === 'assistant' && (
              <div key={message.id} className={cx('messages')}>
                {message.content
                  .split('\n')
                  .map((text: string, index: number) => {
                    return (
                      <p className={cx('message')} key={message.id + index}>
                        {text}
                      </p>
                    );
                  })}
              </div>
            )
        )}
      </div>
    </div>
  );
};
