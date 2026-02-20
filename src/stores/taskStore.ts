import { create } from "zustand";

// #[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
// pub struct Task {
//     pub id: String,
//     pub column_id: String,
//     pub title: String,
//     pub description: Option<String>,
//     pub position: i64,
//     pub created_at: String,
//     pub updated_at: String,
// }

// export interface Column {
// id: string;
// board_id: string;
// name: string;
// position: number;
// created_at: string;
// updated_at: string;
// }

// interface ColumnState {
// // States
// columns: Column[];

// // Setters
// setColumns: (columns: Column[]) => void;
// addColumn: (columns: Column) => void;
// deleteColumn: (columns: Column) => void;
// }

// const useColumnStore = create<ColumnState>((set) => ({
// // States
// columns: [],
// // Setters
// setColumns: (columns) => set({ columns }),
// addColumn: (column) =>
// set((state) => ({ columns: [...state.columns, column] })),
// deleteColumn: (column) =>
// set((state) => ({
//     columns: state.columns.filter((c) => c.id !== column.id),
// })),
// }));

// // Custom hooks
// export const useColumns = () => useColumnStore((state) => state.columns);
// export const useSetColumns = () => useColumnStore((state) => state.setColumns);
// export const useAddColumn = () => useColumnStore((state) => state.addColumn);
// export const useDeleteColumn = () =>
// useColumnStore((state) => state.deleteColumn);
