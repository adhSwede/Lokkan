import { useParams } from "react-router";
import { useColumns, useReorderColumns } from "@stores/columnStore";
import { useRef } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import { useGetColsByBoardId } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";

export const KanbanView = () => {
  const { id } = useParams();
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
    const lastDraggedOver = event.operation.target as { index: number } | null;
    dragOverIndex.current = lastDraggedOver?.index ?? null;
  };

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || dragStartIndex.current === null) return;
    const target = event.operation.target as { index: number } | null;
    if (!target || dragStartIndex.current === target.index) return;
    reorderColumns(dragStartIndex.current, target.index);
    dragStartIndex.current = null;
  };

  return (
    <div className="grid h-full grid-cols-5 grid-rows-1 gap-3">
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column, index) => (
          <ColumnSortable key={column.id} id={column.id} index={index}>
            <ColumnElement {...column} />
          </ColumnSortable>
        ))}
      </DragDropProvider>
      {id && <AddColumnCard boardId={id} />}
    </div>
  );
};
