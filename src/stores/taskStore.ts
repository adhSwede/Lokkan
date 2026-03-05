import { create } from "zustand";

export interface Task {
  id: string;
  column_id: string;
  title: string;
  description: string;
  position: number;
  created_at: string;
  updated_at: string;
}

interface TaskState {
  // States
  tasks: Task[];

  // Setters
  setTasks: (tasks: Task[]) => void;
  addTask: (tasks: Task) => void;
  deleteTask: (tasks: Task) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  // States
  tasks: [],

  // Setters
  setTasks: (tasks) =>
    set((state) => ({
      tasks: [...state.tasks.filter((t) => t.column_id !== tasks[0]?.column_id), ...tasks],
    })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (task) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== task.id) })),
}));

// // Custom hooks
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useSetTasks = () => useTaskStore((state) => state.setTasks);
export const useAddTask = () => useTaskStore((state) => state.addTask);
export const deleteTask = () => useTaskStore((state) => state.deleteTask);
