import { getColumnsByBoardId } from "@queries/columnQueries";
import { useSetColumns } from "@stores/columnStore";
import { useEffect } from "react";

export const useGetColsByBoardId = (boardId?: string) => {
  const setColumns = useSetColumns();

  useEffect(() => {
    if (!boardId) {
      console.error("Failed to retrieve boardId.");
      return;
    }
    getColumnsByBoardId(boardId).then((columns) => {
      if (columns) setColumns(columns);
    });
  }, [setColumns, boardId]);
};
