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
