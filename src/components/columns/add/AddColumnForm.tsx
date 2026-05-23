import { invoke } from "@tauri-apps/api/core";
import { X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
