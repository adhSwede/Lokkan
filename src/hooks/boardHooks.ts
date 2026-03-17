import { useBoardStore } from "@stores/boardStore";
import { getAllBoards, createBoard } from "@queries/boardQueries";
import { useEffect } from "react";

export const useGetAllBoards = () => {
  const { setBoards } = useBoardStore();

  useEffect(() => {
    getAllBoards().then((boards) => {
      if (boards) setBoards(boards);
    });
  }, [setBoards]);
};

export const useCreateBoard = () => {
  const { addBoard } = useBoardStore();

  return (name: string) =>
    createBoard(name).then((board) => {
      if (board) addBoard(board);
      return board;
    });
};
