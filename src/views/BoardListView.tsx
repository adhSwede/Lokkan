import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useBoards, useSetBoards, type Board } from "../stores/boardStore";
import { BoardListItem } from "../components/full/BoardListItem";

export const BoardListView = () => {
  const boards = useBoards();
  const setBoards = useSetBoards();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const fetchedBoards = await invoke<Board[]>("getAllBoards");
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
    <div>
      <ul>
        {boards.map((board) => (
          <BoardListItem key={board.id} {...board} />
        ))}
      </ul>
    </div>
  );
};
