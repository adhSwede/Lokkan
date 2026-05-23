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

export const updateTask = async (
  id: string,
  columnId: string,
  title: string,
  position: number,
  description?: string,
) => {
  try {
    return await invoke<Task>("update_task", { id, columnId, title, description, position });
  } catch (err) {
    console.error("Error updating task:", err);
  }
};

export const reorderTask = async (
  id: string,
  columnId: string,
  position: number,
) => {
  try {
    return await invoke<Task>("reorder_task", { id, columnId, position });
  } catch (err) {
    console.error("Error reordering task:", err);
  }
};
