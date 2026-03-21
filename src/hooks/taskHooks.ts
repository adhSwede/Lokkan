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
  const { tasks, setTasksForColumns } = useTaskStore();

  return async (fromId: string, toId: string, columnId: string) => {
    const sourceTask = tasks.find((t) => t.id === fromId);
    if (!sourceTask) return;

    const columnTasks = tasks
      .filter((t) => t.column_id === columnId && t.id !== fromId)
      .toSorted((a, b) => a.position - b.position);

    const to = columnTasks.findIndex((t) => t.id === toId);
    if (to === -1) return;

    const reordered = [...columnTasks];
    reordered.splice(to, 0, sourceTask);

    for (let i = 0; i < reordered.length; i++) {
      await reorderTaskQuery(reordered[i].id, columnId, i);
    }

    const [updatedTarget, updatedSource] = await Promise.all([
      getTasksByColumnId(columnId),
      sourceTask.column_id !== columnId
        ? getTasksByColumnId(sourceTask.column_id)
        : Promise.resolve(undefined),
    ]);

    const updates = [];
    if (updatedTarget) updates.push({ columnId, tasks: updatedTarget });
    if (updatedSource) updates.push({ columnId: sourceTask.column_id, tasks: updatedSource });
    setTasksForColumns(updates);
  };
};
