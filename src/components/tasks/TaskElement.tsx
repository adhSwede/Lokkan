import { invoke } from "@tauri-apps/api/core";
import { deleteTask, type Task } from "@stores/taskStore";
import { Card } from "@components/base/Card";
import { Trash2 } from "lucide-react";

export const TaskElement = ({ title, id }: Task) => {
  const deleteTaskFromStore = deleteTask();

  const deleteTaskElement = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const task = await invoke<Task>("delete_task", { id });
      deleteTaskFromStore(task);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div className="flex w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1">
          <h3 className="text-lg">{title}</h3>
          <button
            onClick={(e) => deleteTaskElement(e)}
            className="absolute top-0 right-1 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </Card>
  );
};
