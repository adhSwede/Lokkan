import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useBoards, useSetBoards, type Board } from "../stores/boardStore";
import { BoardListItem } from "../components/full/boards/BoardListItem";
import { AddBoardCard } from "../components/full/boards/AddBoardCard";
import { Card } from "../components/base/Card";

export const BoardListView = () => {
  const boards = useBoards();
  const setBoards = useSetBoards();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const fetchedBoards = await invoke<Board[]>("get_all_boards");
        if (Array.isArray(fetchedBoards)) {
          setBoards(fetchedBoards);
        } else {
          console.error("Invalid boards data.");
        }
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    };

    loadBoards();
  }, [setBoards]);

  return (
    <div className="grid grid-cols-5 gap-3">
      {boards.map((board) => (
        <BoardListItem key={board.id} {...board} />
      ))}
      <AddBoardCard />
    </div>
  );
};
