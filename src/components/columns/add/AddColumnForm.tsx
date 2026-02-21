import { invoke } from "@tauri-apps/api/core";
import { X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import {
  useAddColumn,
  useColumns,
  type Column,
} from "../../../stores/columnStore";

export const AddColumnForm = ({
  boardId,
  onToggle,
}: {
  boardId: string;
  onToggle: () => void;
}) => {
  const inputField = useRef<HTMLInputElement>(null);
  const addColumn = useAddColumn();
  const columns = useColumns();

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
