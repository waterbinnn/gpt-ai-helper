import { ChangeEvent } from 'react';

import classNames from 'classnames/bind';
import styles from './BaseInput.module.scss';

const cx = classNames.bind(styles);

interface Props {
  input: string;
  label: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = ({ label, input, handleInputChange }: Props) => {
  return (
    <>
      <label htmlFor='subject'>{label}</label>
      <input
        className={cx('input-text')}
        value={input}
        onChange={handleInputChange}
        id='subject'
        maxLength={100}
      />
      <span className={cx('length')}>{input.length}/100</span>
    </>
  );
};
