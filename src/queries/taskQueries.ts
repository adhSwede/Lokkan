import type { Task } from "@t/Task";
import { invoke } from "@tauri-apps/api/core";

export const getTasksByColumnId = async (columnId: string) => {
  try {
    const fetchedTasks = await invoke<Task[]>("get_tasks_by_column_id", {
      columnId,
    });

    if (Array.isArray(fetchedTasks)) {
      return fetchedTasks;
    } else {
      console.log("Invalid tasks data.");
    }
  } catch (err) {
    console.log("Error fetching tasks:", err);
  }
};
