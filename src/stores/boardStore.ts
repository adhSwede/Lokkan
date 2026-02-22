import { create } from "zustand";

export interface Board {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface BoardState {
  // States
  boards: Board[];
  // Setters
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
  deleteBoard: (board: Board) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  // States
  boards: [],
  // Setters
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  deleteBoard: (board) =>
    set((state) => ({ boards: state.boards.filter((b) => b.id !== board.id) })),
}));

// Custom hooks
export const useBoards = () => useBoardStore((state) => state.boards);
export const useSetBoards = () => useBoardStore((state) => state.setBoards);
export const useAddBoard = () => useBoardStore((state) => state.addBoard);
export const useDeleteBoard = () => useBoardStore((state) => state.deleteBoard);
