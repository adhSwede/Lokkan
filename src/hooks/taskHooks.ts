import { getTasksByColumnId } from "@queries/taskQueries";
import { useTaskStore } from "@stores/taskStore";
import { useEffect } from "react";

export const useGetTasksByColumnId = (columnId?: string) => {
  const setTasks = useTaskStore().setTasks;

  useEffect(() => {
    if (!columnId) {
      console.error("Failed to retrieve columnId.");
      return;
    }

    getTasksByColumnId(columnId).then((tasks) => {
      if (tasks) setTasks(tasks);
    });
  }, [setTasks, columnId]);
};

export const useReorderTask = (
  id: string,
  columnId: string,
  position: number,
) => {
  const reorderTaskStore = useTaskStore().reorderTask;

  if (!id) {
    console.error("Failed to retrieve id.");
    return;
  }
  if (!columnId) {
    console.error("Failed to retrieve columnId.");
    return;
  }
  if (!position) {
    console.error("Failed to retrieve position.");
    return;
  }
};
