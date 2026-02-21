import { Route, Routes } from "react-router";
import { TitleBar } from "./components/TitleBar";
import { BoardListView } from "./Routes/BoardListView";
import { KanbanView } from "./Routes/KanbanView";

export const App = () => {
  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-(--bg-dark) dark:text-white">
      <TitleBar />

      <div className="h-full p-3">
        <Routes>
          {/* Views go here */}
          <Route path="/" element={<BoardListView />} />
          <Route path="/boards/:id" element={<KanbanView />} />
        </Routes>
      </div>
    </div>
  );
};
