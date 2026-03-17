import type { Task } from "@t/Task";
import { create } from "zustand";

interface TaskState {
  // States
  tasks: Task[];

  // Setters
  setTasks: (tasks: Task[]) => void;
  addTask: (tasks: Task) => void;
  deleteTask: (tasks: Task) => void;
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
}));
