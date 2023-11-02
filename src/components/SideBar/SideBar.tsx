import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

export const SideBar = () => {
  return (
    <section className={cx("side-bar")}>
      <button className={cx("new-btn")}>+ new</button>
      <ol className={cx("history")}></ol>
    </section>
  );
};
