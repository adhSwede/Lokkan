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

export const useColumnStore = create<ColumnState>((set) => ({
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
