import { X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateBoard } from "@hooks/boardHooks";

export const AddBoardForm = ({ onToggle }: { onToggle: () => void }) => {
  const createBoard = useCreateBoard();
  const inputField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBoard(inputValue).then((board) => {
      if (board) {
        onToggle();
        navigate(`/boards/${board.id}`);
      }
    });
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
