import {
  getColumnsByBoardId,
  reorderColumn,
  deleteColumn,
} from "@queries/columnQueries";
import { useColumnStore } from "@stores/columnStore";
import { useEffect } from "react";

export const useGetColsByBoardId = (boardId?: string) => {
  const { setColumns } = useColumnStore();

  useEffect(() => {
    if (!boardId) {
      console.error("Failed to retrieve board Id.");
      return;
    }

    getColumnsByBoardId(boardId).then((columns) => {
      if (columns) setColumns(columns);
    });
  }, [setColumns, boardId]);
};

export const useReorderColumns = () => {
  const { columns, reorderColumns } = useColumnStore();

  return (fromId: string, toId: string) => {
    const from = columns.findIndex((c) => c.id === fromId);
    const to = columns.findIndex((c) => c.id === toId);

    if (from === -1 || to === -1 || from === to) return;
    reorderColumns(from, to);

    const reordered = [...columns];
    reordered.splice(to, 0, reordered.splice(from, 1)[0]);
    reordered.forEach((col, i) => reorderColumn(col.id, i));
  };
};

export const useDeleteColumn = () => {
  const { deleteColumn: deleteColumnStore } = useColumnStore();

  return (columnId: string) => {
    deleteColumn(columnId).then((column) => {
      if (column) deleteColumnStore(column);
    });
  };
};
