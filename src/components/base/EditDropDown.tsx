import { invoke } from "@tauri-apps/api/core";
import { useColumnStore } from "@stores/columnStore";
import { useTaskStore } from "@stores/taskStore";
import { useBoardStore } from "@stores/boardStore";
import type { Column } from "@t/Column";
import type { Task } from "@t/Task";
import type { Board } from "@t/Board";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Edit,
  EllipsisVertical,
  TriangleAlert,
  Trash2,
  X,
} from "lucide-react";

type EntityType = "column" | "task" | "board";

interface Props {
  id: string;
  type: EntityType;
  onEdit?: () => void;
}

export const EditDropDown = ({ id, type, onEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
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
    setConfirming(false);
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
        onClick={(e) => {
          e.stopPropagation();
          setConfirming(false);
          setOpen((o) => !o);
        }}
        className="flex w-fit cursor-pointer rounded p-1 hover:bg-(--color-hover)"
        aria-label="Options"
      >
        <EllipsisVertical />
      </button>
      {open && (
        <ul className="absolute right-0 z-50 mt-1 min-w-30 rounded border border-(--color-input) bg-(--color-bg) text-(--color-text) shadow-md">
          {onEdit && (
            <li>
              <button
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm hover:bg-(--color-hover)"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onEdit();
                }}
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
            </li>
          )}
          <li>
            {confirming ? (
              <div className="flex flex-col gap-2 px-3 py-2">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-4 w-4 shrink-0 text-orange-400" />
                  <span className="text-xs text-(--color-text-muted)">
                    Are you sure you want to delete this?
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    className="cursor-pointer rounded p-1 text-green-500 hover:bg-(--color-hover)"
                    onClick={handleDelete}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    className="cursor-pointer rounded p-1 text-red-400 hover:bg-(--color-hover)"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirming(false);
                      setOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-(--color-hover)"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirming(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
