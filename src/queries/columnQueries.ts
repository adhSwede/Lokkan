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
