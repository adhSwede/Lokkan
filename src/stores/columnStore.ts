import { create } from "zustand";
import type { Column } from "@t/Column";

interface ColumnState {
  // States
  columns: Column[];

  // Setters
  setColumns: (columns: Column[]) => void;
  addColumn: (columns: Column) => void;
  deleteColumn: (columns: Column) => void;
  reorderColumns: (from: number, to: number) => void;
}

const useColumnStore = create<ColumnState>((set) => ({
  // States
  columns: [],
  // Setters
  setColumns: (columns) => set({ columns }),

  addColumn: (column) =>
    set((state) => ({ columns: [...state.columns, column] })),

  deleteColumn: (column) =>
    set((state) => ({
      columns: state.columns.filter((c) => c.id !== column.id),
    })),

  reorderColumns: (from, to) =>
    set((state) => {
      const reordered = [...state.columns];
      reordered.splice(to, 0, reordered.splice(from, 1)[0]);
      return { columns: reordered };
    }),
}));

// Custom hooks
export const useColumns = () => useColumnStore((state) => state.columns);
export const useSetColumns = () => useColumnStore((state) => state.setColumns);
export const useAddColumn = () => useColumnStore((state) => state.addColumn);
export const useDeleteColumn = () =>
  useColumnStore((state) => state.deleteColumn);
export const useReorderColumns = () =>
  useColumnStore((state) => state.reorderColumns);
