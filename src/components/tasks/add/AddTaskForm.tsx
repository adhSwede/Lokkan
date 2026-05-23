import { useTaskStore } from "@stores/taskStore";
import { invoke } from "@tauri-apps/api/core";
import { X } from "lucide-react";
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

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const position = tasks.length;
      const task = await invoke<Task>("create_task", {
        title: inputValue,
        columnId,
        position,
      });
      addTask(task);
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
