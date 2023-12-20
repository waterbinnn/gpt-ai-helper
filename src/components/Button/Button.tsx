import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import Spinner from '/public/spinner.svg';

const cx = classNames.bind(styles);

interface Props {
  disabled: boolean;
  isLoading: boolean;
}

export const Button = ({ disabled, isLoading }: Props) => {
  return (
    <button disabled={disabled} className={cx('btn-send')}>
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
  );
};
