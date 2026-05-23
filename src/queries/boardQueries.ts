import type { Board } from "@t/Board";
import { invoke } from "@tauri-apps/api/core";

export const getAllBoards = async () => {
  try {
    const fetchedBoards = await invoke<Board[]>("get_all_boards");
    if (Array.isArray(fetchedBoards)) {
      return fetchedBoards;
    } else {
      console.error("Invalid boards data.");
    }
  } catch (err) {
    console.error("Error fetching boards:", err);
  }
};

export const createBoard = async (name: string, description?: string) => {
  try {
    return await invoke<Board>("create_board", { name, description });
  } catch (err) {
    console.error("Error creating board:", err);
  }
};

export const updateBoard = async (id: string, name: string, description?: string) => {
  try {
    return await invoke<Board>("update_board", { id, name, description });
  } catch (err) {
    console.error("Error updating board:", err);
  }
};
