import { Chat } from "../components/Chat/Chat";
import { SideBar } from "../components/SideBar/SideBar";

export const GPTChat = () => {
  return (
    <main className={"container"}>
      <SideBar />
      <Chat />
    </main>
  );
};
