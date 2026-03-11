import { getColumnsByBoardId, reorderColumn } from "@queries/columnQueries";
import {
  useColumns,
  useReorderColumns as useReorderColumnsStore,
  useSetColumns,
} from "@stores/columnStore";
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

export const useReorderColumns = () => {
  const columns = useColumns();
  const reorderColumns = useReorderColumnsStore();

  return (from: number, to: number) => {
    reorderColumns(from, to);
    const reordered = [...columns];
    reordered.splice(to, 0, reordered.splice(from, 1)[0]);
    reordered.forEach((col, i) => reorderColumn(col.id, i));
  };
};
