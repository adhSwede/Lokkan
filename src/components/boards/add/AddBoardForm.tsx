import { X } from "lucide-react";
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
      <div className="relative">
        <button type="button" onClick={onToggle} className="absolute left-3 top-1/2 -translate-y-1/2">
          <X size={16} />
        </button>
        <input
          ref={inputField}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          placeholder="Name"
          className="w-full rounded p-1 pl-8 bg-(--color-input)"
        />
      </div>
      <textarea
        value={descValue}
        onChange={(e) => setDescValue(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full resize-none rounded p-1 px-2 text-sm bg-(--color-input)"
      />
    </form>
  );
};
