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
    <Card className="flex w-50 bg-(--color-surface)/35">
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1 pb-4">
          <h2 className="text-xl">{name}</h2>
          <div className="absolute top-0 right-1">
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
