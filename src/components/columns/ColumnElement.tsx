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
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export const ColumnElement = ({ name, id }: Column) => {
  const { deleteColumn } = useColumnStore();
  const { tasks } = useTaskStore();

  useGetTasksByColumnId(id);

  const { setNodeRef } = useDroppable({ id, data: { type: "Column" } });

  const columnTasks = tasks
    .filter((t) => t.column_id === id)
    .toSorted((a, b) => a.position - b.position);

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
    <Card className="flex w-50 bg-(--color-surface)/70">
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
        <div
          ref={setNodeRef}
          className="h-full w-full rounded shadow-(--card-shadow)"
        >
          <SortableContext
            items={columnTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {columnTasks.map((task) => (
              <TaskSortable key={task.id} task={task}>
                <TaskElement {...task} />
              </TaskSortable>
            ))}
          </SortableContext>
          {id && <AddTaskCard columnId={id} />}
        </div>
      </div>
    </Card>
  );
};
