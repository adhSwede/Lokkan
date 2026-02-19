import { TitleBar } from "./components/full/TitleBar";
import { BoardListView } from "./views/BoardListView";

export const App = () => {
  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-(--bg-dark)">
      <TitleBar />

      {/* Views go here */}
      <div className="p-3">
        <BoardListView />
      </div>
    </div>
  );
};
