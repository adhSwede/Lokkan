import { create } from "zustand";

export interface Board {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BoardState {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards }),
}));

// Custom hooks
export const useSetBoards = () => useBoardStore((state) => state.setBoards);
export const useBoards = () => useBoardStore((state) => state.boards);
