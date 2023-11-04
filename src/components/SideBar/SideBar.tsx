import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

export const SideBar = () => {
  const refresh = () => window.location.reload();
  return (
    <section className={cx("side-bar")}>
      <button className={cx("new-btn")} onClick={refresh}>
        + new
      </button>
    </section>
  );
};
