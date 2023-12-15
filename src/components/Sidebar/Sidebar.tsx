import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

export const Sidebar = () => {
  const router = useRouter();
  const { pathname } = router;

  const handleRouter = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={cx('sidebar-container')}>
      <ul className={cx('sidebar-wrap')}>
        <li
          className={cx('sidebar-item', { active: pathname === '/' })}
          onClick={() => handleRouter('/')}
        >
          Chatbot
        </li>
        <li
          className={cx('sidebar-item', { active: pathname === '/title' })}
          onClick={() => handleRouter('/title')}
        >
          Youtube Title
        </li>
        <li
          className={cx('sidebar-item', { active: pathname === '/script' })}
          onClick={() => handleRouter('/script')}
        >
          Youtube Script
        </li>
      </ul>
    </nav>
  );
};
