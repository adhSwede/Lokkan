import type { Column } from "@t/Column";
import { invoke } from "@tauri-apps/api/core";

export const getColumnsByBoardId = async (boardId: string) => {
  try {
    const fetchedColumns = await invoke<Column[]>("get_columns_by_board_id", {
      boardId,
    });
    if (Array.isArray(fetchedColumns)) {
      return fetchedColumns;
    } else {
      console.log("Invalid columns data.");
    }
  } catch (err) {
    console.error("Error fetching columns:", err);
  }
};

export const reorderColumn = async (id: string, position: number) => {
  try {
    return await invoke<Column>("reorder_column", { id, position });
  } catch (err) {
    console.error("Error reordering column:", err);
  }
};

export const deleteColumn = async (id: string) => {
  try {
    return await invoke<Column>("delete_column", { id });
  } catch (err) {
    console.log(err);
  }
};
