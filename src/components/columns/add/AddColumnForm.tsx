import { invoke } from "@tauri-apps/api/core";
import { Check, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useColumnStore } from "@stores/columnStore";
import { type Column } from "@t/Column";

export const AddColumnForm = ({
  boardId,
  onToggle,
}: {
  boardId: string;
  onToggle: () => void;
}) => {
  const inputField = useRef<HTMLInputElement>(null);
  const { columns, addColumn } = useColumnStore();

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const position = columns.length;
      const column = await invoke<Column>("create_column", {
        name: inputValue,
        boardId,
        position,
      });
      addColumn(column);
      onToggle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-1">
      <input
        ref={inputField}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Column name"
        className="w-full rounded p-1 px-2 bg-(--color-input)"
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
