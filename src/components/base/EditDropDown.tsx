import { invoke } from "@tauri-apps/api/core";
import { useColumnStore } from "@stores/columnStore";
import { useTaskStore } from "@stores/taskStore";
import { useBoardStore } from "@stores/boardStore";
import type { Column } from "@t/Column";
import type { Task } from "@t/Task";
import type { Board } from "@t/Board";
import { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";

type EntityType = "column" | "task" | "board";

interface Props {
  id: string;
  type: EntityType;
  onEdit?: () => void;
}

export const EditDropDown = ({ id, type, onEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { deleteColumn } = useColumnStore();
  const { deleteTask } = useTaskStore();
  const { deleteBoard } = useBoardStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    try {
      if (type === "column") {
        const column = await invoke<Column>("delete_column", { id });
        deleteColumn(column);
      } else if (type === "task") {
        const task = await invoke<Task>("delete_task", { id });
        deleteTask(task);
      } else if (type === "board") {
        const board = await invoke<Board>("delete_board", { id });
        deleteBoard(board);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        className="flex w-fit cursor-pointer rounded p-1 hover:bg-(--color-hover)"
        aria-label="Options"
      >
        <EllipsisVertical />
      </button>
      {open && (
        <ul className="absolute right-0 z-50 mt-1 min-w-32 rounded border border-(--color-input) bg-(--color-surface) text-(--color-text) shadow-md">
          {onEdit && (
            <li>
              <button
                className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-(--color-hover)"
                onClick={(e) => { e.stopPropagation(); setOpen(false); onEdit(); }}
              >
                Edit
              </button>
            </li>
          )}
          <li>
            <button
              className="w-full cursor-pointer px-3 py-2 text-left text-sm text-red-500 hover:bg-(--color-hover)"
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
