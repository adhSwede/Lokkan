import { useParams } from "react-router";
import { useState } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useColumnStore } from "@stores/columnStore";
import { useGetColsByBoardId, useReorderColumns } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";
import { useTaskStore } from "@stores/taskStore";
import { useReorderTask } from "@hooks/taskHooks";
import { TaskElement } from "@components/tasks/TaskElement";
import type { Task } from "@t/Task";
import type { Column } from "@t/Column";

export const KanbanView = () => {
  const { id } = useParams();
  const { columns } = useColumnStore();
  const { tasks, setTasksOptimistic } = useTaskStore();
  const reorderColumns = useReorderColumns();
  const reorderTask = useReorderTask();

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeTaskOriginalColumnId, setActiveTaskOriginalColumnId] = useState<
    string | null
  >(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  useGetColsByBoardId(id);

  if (!id) return null;

  const columnsId = columns.map((c) => c.id);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "Column") {
      setActiveColumn(active.data.current.column);
    }
    if (active.data.current?.type === "Task") {
      setActiveTask(active.data.current.task);
      setActiveTaskOriginalColumnId(active.data.current.task.column_id);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    if (isOverTask) {
      setTasksOptimistic(activeId, overId);
    }

    if (isOverColumn) {
      setTasksOptimistic(activeId, null, overId);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (active.data.current?.type === "Column") {
      if (activeId === overId) return;
      reorderColumns(activeId, overId);
      return;
    }

    if (active.data.current?.type === "Task") {
      const finalTask = tasks.find((t) => t.id === activeId);
      if (!finalTask) return;
      reorderTask(
        finalTask.column_id,
        activeTaskOriginalColumnId ?? finalTask.column_id,
      );
      setActiveTaskOriginalColumnId(null);
    }
  };

  return (
    <div className="grid h-full grid-cols-5 grid-rows-1 gap-3">
      {/* Context that keeps track of the dnd area. */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <ColumnSortable key={column.id} id={column.id} column={column}>
              <ColumnElement {...column} />
            </ColumnSortable>
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnElement {...activeColumn} />}
            {activeTask && <TaskElement {...activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
      <AddColumnCard boardId={id} />
    </div>
  );
};
