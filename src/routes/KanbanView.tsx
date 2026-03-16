import { useParams } from "react-router";
import { useColumns } from "@stores/columnStore";
import { useRef } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import { useGetColsByBoardId, useReorderColumns } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";

export const KanbanView = () => {
  const { id } = useParams();
  if (!id) return null;

  const columns = useColumns();
  const reorderColumns = useReorderColumns();
  const dragStartIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  useGetColsByBoardId(id);

  const handleDragStart: DragStartEvent = (event) => {
    const source = event.operation.source as { index: number } | null;
    dragStartIndex.current = source?.index ?? null;
  };

  const handleDragOver: DragOverEvent = (event) => {
    const target = event.operation.target;
    if (!target) return;
    const idx = columns.findIndex((c) => c.id === target.id);
    if (idx !== -1) dragOverIndex.current = idx;
  };

  const handleDragEnd: DragEndEvent = (event) => {
    if (
      event.canceled ||
      dragStartIndex.current === null ||
      dragOverIndex.current === null
    )
      return;
    if (dragStartIndex.current === dragOverIndex.current) return;
    reorderColumns(dragStartIndex.current, dragOverIndex.current);
    dragStartIndex.current = null;
    dragOverIndex.current = null;
  };

  return (
    <div className="grid h-full grid-cols-5 grid-rows-1 gap-3">
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
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
      </DragDropProvider>
      <AddColumnCard boardId={id} />
    </div>
  );
};
