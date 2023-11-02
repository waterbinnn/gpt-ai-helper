import classNames from "classnames/bind";
import styles from "./SedMessage.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  userMsg: string;
  setUserMsg: React.Dispatch<React.SetStateAction<string>>;
  getMessage: () => void;
  isLoading: boolean;
}

export const SendMessage = ({
  userMsg,
  setUserMsg,
  getMessage,
  isLoading,
}: Props) => {
  return (
    <form className={cx("input-container")}>
      <textarea
        className={cx("text-input")}
        placeholder="대화를 시작해 보세요."
        value={userMsg}
        onChange={(e) => setUserMsg(e.target.value)}
      />
      <button
        disabled={isLoading}
        type="button"
        className={cx("btn-send")}
        onClick={getMessage}
      >
        send
      </button>
    </form>
  );
};
