import { useParams } from "react-router";
import { useRef } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  useDragOperation,
} from "@dnd-kit/react";
import { useColumnStore } from "@stores/columnStore";
import { useGetColsByBoardId, useReorderColumns } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";
import { useReorderTask } from "@hooks/taskHooks";
import { useTaskStore } from "@stores/taskStore";
import { TaskElement } from "@components/tasks/TaskElement";

const TaskDragOverlay = () => {
  const { source } = useDragOperation();
  const { tasks } = useTaskStore();
  if (!source || source.type !== "Task") return null;
  const task = tasks.find((t) => t.id === source.id);
  if (!task) return null;
  return <TaskElement {...task} />;
};

export const KanbanView = () => {
  const { id } = useParams();
  const lastOverId = useRef<string | null>(null);
  const { columns } = useColumnStore();
  const { tasks } = useTaskStore();
  const reorderColumns = useReorderColumns();
  const reorderTask = useReorderTask();

  useGetColsByBoardId(id);

  if (!id) return null;

  const handleDragOver: DragOverEvent = (event) => {
    const target = event.operation.target;
    if (!target || target.id === event.operation.source?.id) return;
    lastOverId.current = target.id as string;
  };

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !lastOverId.current) return;
    const source = event.operation.source;

    if (!source || source.id === lastOverId.current) return;
    const toId = lastOverId.current;
    lastOverId.current = null;

    if (source.type === "Column") {
      reorderColumns(source.id as string, toId);
    } else if (source.type === "Task") {
      const columnId = tasks.find((t) => t.id === toId)?.column_id;
      if (!columnId) return;
      reorderTask(source.id as string, toId, columnId);
    }
  };

  return (
    <div className="grid h-full grid-cols-5 grid-rows-1 gap-3">
      <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        {columns.map((column, index) => (
          <ColumnSortable
            key={column.id}
            id={column.id}
            index={index}
            group={id}
          >
            <ColumnElement {...column} />
          </ColumnSortable>
        ))}
        <DragOverlay>
          <TaskDragOverlay />
        </DragOverlay>
      </DragDropProvider>
      <AddColumnCard boardId={id} />
    </div>
  );
};
