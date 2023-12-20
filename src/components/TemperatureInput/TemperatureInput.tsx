import classNames from 'classnames/bind';
import styles from './TemperatureInput.module.scss';
import { ChangeEvent } from 'react';

const cx = classNames.bind(styles);

interface Props {
  label: string;
  temp: number;
  handleTemp: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TemperatureInput = ({ label, temp, handleTemp }: Props) => {
  return (
    <div className={cx('title-wrap')}>
      <div className={cx('input-range')}>
        <label htmlFor='temperature'>{label}</label>
        <div className={cx('temp-wrap')}>
          <input
            type='range'
            min={0}
            max={1}
            step={0.1}
            value={temp}
            onChange={handleTemp}
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
    </div>
  );
};
