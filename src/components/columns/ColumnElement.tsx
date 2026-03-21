import { invoke } from "@tauri-apps/api/core";
import { useColumnStore } from "@stores/columnStore";
import { Card } from "@components/base/Card";
import { Trash2 } from "lucide-react";
import { useTaskStore } from "@stores/taskStore";
import { AddTaskCard } from "@components/tasks/add/AddTaskCard";
import type { Column } from "@t/Column";
import { TaskSortable } from "@components/tasks/TaskSortable";
import { useGetTasksByColumnId } from "@hooks/taskHooks";
import { TaskElement } from "@components/tasks/TaskElement";

export const ColumnElement = ({ name, id }: Column) => {
  const { deleteColumn } = useColumnStore();
  const { tasks } = useTaskStore();

  useGetTasksByColumnId(id);

  const deleteColumnElement = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const column = await invoke<Column>("delete_column", { id });
      deleteColumn(column);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1 pb-4">
          <h2 className="text-xl">{name}</h2>
          <button
            onClick={(e) => deleteColumnElement(e)}
            className="absolute top-0 right-1 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
        <div className="h-full w-full rounded shadow-(--card-shadow)">
          {tasks
            .filter((t) => t.column_id === id)
            .toSorted((a, b) => a.position - b.position)
            .map((task, index) => (
              <TaskSortable key={task.id} id={task.id} index={index} group={id}>
                <TaskElement {...task} />
              </TaskSortable>
            ))}
          {id && <AddTaskCard columnId={id} />}
        </div>
      </div>
    </Card>
  );
};
