import { Chat, Sidebar } from '../../components';
import classNames from 'classnames/bind';

import styles from './Chatbot.module.scss';

const cx = classNames.bind(styles);

export const Chatbot = () => {
  return (
    <div className={cx('page-container')}>
      <Sidebar />
      <Chat />
    </div>
  );
};
