import { useTaskStore } from "@stores/taskStore";
import { invoke } from "@tauri-apps/api/core";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type Task } from "@t/Task";

export const AddTaskForm = ({
  columnId,
  onToggle,
}: {
  columnId: string;
  onToggle: () => void;
}) => {
  const inputField = useRef<HTMLInputElement>(null);
  const { addTask, tasks } = useTaskStore();

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const position = tasks.length;
      const task = await invoke<Task>("create_task", {
        title: titleValue,
        columnId,
        position,
        description: descValue || undefined,
      });
      addTask(task);
      onToggle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-1">
      <input
        ref={inputField}
        onChange={(e) => setTitleValue(e.target.value)}
        type="text"
        placeholder="Title"
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
