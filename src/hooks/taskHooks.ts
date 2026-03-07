import { getTasksByColumnId } from "@queries/taskQueries";
import { useSetTasks } from "@stores/taskStore";
import { useEffect } from "react";

export const useGetTasksByColumnId = (columnId?: string) => {
  const setTasks = useSetTasks();

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
