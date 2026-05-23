import { Route, Routes, useLocation, useMatch } from "react-router";
import { TitleBar } from "@components/TitleBar";
import { BoardListView } from "@routes/BoardListView";
import { KanbanView } from "@routes/KanbanView";
import { useGetAllBoards } from "@hooks/boardHooks";
import { NavArrows } from "@components/NavArrows";
import { useEffect, useState } from "react";

export const App = () => {
  useGetAllBoards();
  const location = useLocation();
  const boardMatch = useMatch("/boards/:id");
  const [lastBoardId, setLastBoardId] = useState<string | null>(null);

  useEffect(() => {
    if (boardMatch?.params.id) {
      setLastBoardId(boardMatch.params.id);
    }
  }, [location, boardMatch]);

  return (
    <div className="flex h-full w-full flex-col bg-(--color-bg) text-(--color-text)">
      <TitleBar />

      <div className="h-full p-3">
        <Routes>
          <Route path="/" element={<BoardListView />} />
          <Route path="/boards/:id" element={<KanbanView />} />
        </Routes>
      </div>

      <NavArrows lastBoardId={lastBoardId} />
    </div>
  );
};
