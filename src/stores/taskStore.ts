import type { Task } from "@t/Task";
import { create } from "zustand";

interface TaskState {
  // States
  tasks: Task[];

  // Setters
  setTasks: (tasks: Task[]) => void;
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
