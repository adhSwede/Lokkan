import { useBoardStore } from "@stores/boardStore";
import { getAllBoards, createBoard, updateBoard as updateBoardQuery } from "@queries/boardQueries";
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

  return (name: string, description?: string) =>
    createBoard(name, description).then((board) => {
      if (board) addBoard(board);
      return board;
    });
};

export const useUpdateBoard = () => {
  const { updateBoard } = useBoardStore();

  return async (id: string, name: string, description?: string) => {
    const board = await updateBoardQuery(id, name, description);
    if (board) updateBoard(board);
    return board;
  };
};
