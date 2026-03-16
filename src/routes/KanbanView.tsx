import { useParams } from "react-router";
import { useColumns } from "@stores/columnStore";
import { useRef } from "react";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/react";
import { useGetColsByBoardId, useReorderColumns } from "@hooks/columnHooks";
import { ColumnSortable } from "@components/columns/ColumnSortable";

export const KanbanView = () => {
  const { id } = useParams();
  const columns = useColumns();
  const reorderColumns = useReorderColumns();
  const lastOverId = useRef<string | null>(null);

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
    const from = columns.findIndex((c) => c.id === source.id);
    const to = columns.findIndex((c) => c.id === lastOverId.current);
    lastOverId.current = null;
    if (from === -1 || to === -1 || from === to) return;
    reorderColumns(from, to);
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
