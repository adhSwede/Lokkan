import { invoke } from "@tauri-apps/api/core";
import { X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { useAddBoard, type Board } from "@stores/boardStore";
import { useNavigate } from "react-router";

export const AddBoardForm = ({ onToggle }: { onToggle: () => void }) => {
  const inputField = useRef<HTMLInputElement>(null);
  const addBoard = useAddBoard();
  const navigate = useNavigate();

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const board = await invoke<Board>("create_board", { name: inputValue });
      addBoard(board);
      onToggle();
      navigate(`/boards/${board.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1 p-1">
      <button type="button" onClick={onToggle}>
        <X className="p-1" />
      </button>
      <input
        ref={inputField}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className="rounded bg-black/10 p-1 px-2 dark:bg-white/10"
      />
    </form>
  );
};
