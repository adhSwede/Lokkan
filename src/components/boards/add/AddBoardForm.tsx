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
    <form onSubmit={handleSubmit} className="relative p-1">
      <button type="button" onClick={onToggle} className="absolute left-3 top-1/2 -translate-y-1/2">
        <X size={16} />
      </button>
      <input
        ref={inputField}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className="w-full rounded p-1 pl-8 bg-(--color-input)"
      />
    </form>
  );
};
