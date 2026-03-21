import {
  getTasksByColumnId,
  reorderTask as reorderTaskQuery,
} from "@queries/taskQueries";
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

export const useReorderTask = () => {
  const { setTasksForColumns } = useTaskStore();

  return async (finalColumnId: string, originalColumnId: string) => {
    const { tasks } = useTaskStore.getState();

    const affectedColumnIds = [...new Set([finalColumnId, originalColumnId])];

    for (const columnId of affectedColumnIds) {
      const columnTasks = tasks
        .filter((t) => t.column_id === columnId)
        .toSorted((a, b) => a.position - b.position);

      for (let i = 0; i < columnTasks.length; i++) {
        await reorderTaskQuery(columnTasks[i].id, columnId, i);
      }
    }

    const updates = await Promise.all(
      affectedColumnIds.map(async (columnId) => {
        const fetched = await getTasksByColumnId(columnId);
        return fetched ? { columnId, tasks: fetched } : null;
      })
    );

    setTasksForColumns(updates.filter((u) => u !== null));
  };
};
