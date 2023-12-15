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
          Chatting
        </li>
        <li
          className={cx('sidebar-item', { active: pathname === '/title' })}
          onClick={() => handleRouter('/title')}
        >
          Title Maker
        </li>
        <li
          className={cx('sidebar-item', { active: pathname === '/script' })}
          onClick={() => handleRouter('/script')}
        >
          Script Maker
        </li>
      </ul>
    </nav>
  );
};
