import { Check, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateBoard } from "@hooks/boardHooks";

export const AddBoardForm = ({ onToggle }: { onToggle: () => void }) => {
  const createBoard = useCreateBoard();
  const inputField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const board = await createBoard(nameValue, descValue || undefined);
    if (board) {
      onToggle();
      navigate(`/boards/${board.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-1">
      <input
        ref={inputField}
        onChange={(e) => setNameValue(e.target.value)}
        type="text"
        placeholder="Name"
        className="w-full rounded p-1 px-2 bg-(--color-input)"
      />
      <textarea
        value={descValue}
        onChange={(e) => setDescValue(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full resize-none rounded p-1 px-2 text-sm bg-(--color-input)"
      />
      <div className="flex gap-1">
        <button
          type="submit"
          className="cursor-pointer rounded p-1 hover:bg-(--color-hover)"
        >
          <Check size={16} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="cursor-pointer rounded p-1 hover:bg-(--color-hover)"
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
};
