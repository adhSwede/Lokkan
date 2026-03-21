import type { Task } from "@t/Task";
import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

interface TaskState {
  // States
  tasks: Task[];

  // Setters
  setTasks: (tasks: Task[]) => void;
  setTasksForColumns: (updates: { columnId: string; tasks: Task[] }[]) => void;
  setTasksOptimistic: (activeId: string, overId: string | null, overColumnId?: string) => void;
  addTask: (tasks: Task) => void;
  deleteTask: (tasks: Task) => void;
  reorderTask: (taskId: string, columnId: string, position: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  // States
  tasks: [],

  // Setters
  setTasks: (tasks) =>
    set((state) => ({
      tasks: [
        ...state.tasks.filter((t) => t.column_id !== tasks[0]?.column_id),
        ...tasks,
      ],
    })),

  setTasksForColumns: (updates) =>
    set((state) => {
      const columnIds = updates.map((u) => u.columnId);
      return {
        tasks: [
          ...state.tasks.filter((t) => !columnIds.includes(t.column_id)),
          ...updates.flatMap((u) => u.tasks),
        ],
      };
    }),

  setTasksOptimistic: (activeId, overId, overColumnId) =>
    set((state) => {
      let tasks = state.tasks.map((t) => ({ ...t }));
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      if (activeIndex === -1) return state;

      const originalColumnId = tasks[activeIndex].column_id;
      let targetColumnId = originalColumnId;

      if (overId) {
        const overIndex = tasks.findIndex((t) => t.id === overId);
        if (overIndex === -1) return state;
        targetColumnId = tasks[overIndex].column_id;
        tasks[activeIndex] = { ...tasks[activeIndex], column_id: targetColumnId };
        const isCrossColumn = originalColumnId !== targetColumnId;
        tasks = arrayMove(tasks, activeIndex, isCrossColumn ? overIndex - 1 : overIndex);
      } else if (overColumnId) {
        targetColumnId = overColumnId;
        tasks[activeIndex] = { ...tasks[activeIndex], column_id: targetColumnId };
        // Move to end of target column in array so it gets the last position
        let lastTargetIndex = -1;
        for (let i = 0; i < tasks.length; i++) {
          if (i !== activeIndex && tasks[i].column_id === targetColumnId) lastTargetIndex = i;
        }
        if (lastTargetIndex !== -1) tasks = arrayMove(tasks, activeIndex, lastTargetIndex);
      }

      // Recalculate positions for affected columns based on new array order
      for (const colId of new Set([originalColumnId, targetColumnId])) {
        let pos = 0;
        tasks = tasks.map((t) => (t.column_id === colId ? { ...t, position: pos++ } : t));
      }

      return { tasks };
    }),

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  deleteTask: (task) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== task.id) })),

  reorderTask: (taskId: string, columnId: string, position: number) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      const without = state.tasks.filter((t) => t.id !== taskId);
      const updatedTask = { ...task, column_id: columnId, position };

      const columnTasks = without
        .filter((t) => t.column_id === columnId)
        .toSorted((a, b) => a.position - b.position);

      columnTasks.splice(position, 0, updatedTask);

      const reindexed = columnTasks.map((t, i) => ({ ...t, position: i }));
      const otherTasks = without.filter((t) => t.column_id !== columnId);

      return { tasks: [...otherTasks, ...reindexed] };
    }),
}));
