import { Route, Routes } from "react-router";
import { TitleBar } from "@components/TitleBar";
import { BoardListView } from "@routes/BoardListView";
import { KanbanView } from "@routes/KanbanView";
import { useGetAllBoards } from "@hooks/boardHooks";

export const App = () => {
  useGetAllBoards();

  return (
    <div className="flex h-screen w-full flex-col bg-(--color-bg) text-(--color-text)">
      <TitleBar />

      <div className="flex-1 overflow-y-auto p-3">
        <Routes>
          <Route path="/" element={<BoardListView />} />
          <Route path="/boards/:id" element={<KanbanView />} />
        </Routes>
      </div>
    </div>
  );
};
