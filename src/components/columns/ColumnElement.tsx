import { Card } from "@components/base/Card";
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
import { EditDropDown } from "@components/base/EditDropDown";

export const ColumnElement = ({ name, id }: Column) => {
  const { tasks } = useTaskStore();

  useGetTasksByColumnId(id);

  const { setNodeRef } = useDroppable({ id, data: { type: "Column" } });

  const columnTasks = tasks
    .filter((t) => t.column_id === id)
    .toSorted((a, b) => a.position - b.position);

  return (
    <Card className="flex w-50 bg-(--color-surface)">
      <div className="flex h-full w-full flex-col p-3">
        <div className="relative mb-3 flex items-center">
          <h2 className="w-full wrap-anywhere pr-8 text-lg">{name}</h2>
          <div className="absolute top-0 right-0">
            <EditDropDown id={id} type="column" />
          </div>
        </div>
        <div ref={setNodeRef} className="flex h-full w-full flex-col gap-1">
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
