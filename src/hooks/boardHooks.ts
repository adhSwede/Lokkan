import { useSetBoards } from "@stores/boardStore";
import { getAllBoards } from "@queries/boardQueries";
import { useEffect } from "react";

export const useGetAllBoards = () => {
  const setBoards = useSetBoards();

  useEffect(() => {
    getAllBoards().then((boards) => {
      if (boards) setBoards(boards);
    });
  }, [setBoards]);
};
