import { useParams } from "react-router";
import { useRef } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/react";
import { useColumnStore } from "@stores/columnStore";
import { useGetColsByBoardId, useReorderColumns } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";

export const KanbanView = () => {
  const { id } = useParams();
  const lastOverId = useRef<string | null>(null);
  const { columns } = useColumnStore();
  const reorderColumns = useReorderColumns();

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
    reorderColumns(source.id as string, toId);
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
      </DragDropProvider>
      <AddColumnCard boardId={id} />
    </div>
  );
};
