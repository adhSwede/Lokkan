import { TitleBar } from "./components/full/TitleBar";
import { BoardListView } from "./views/BoardListView";

export const App = () => {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-(--bg-dark)">
      <TitleBar />
      <div>
        {/* Views go here */}
        <main className="flex">
          <BoardListView />
        </main>
      </div>
    </div>
  );
};
