import { useParams } from "react-router";
import { useColumns, useSetColumns, useReorderColumns, type Column } from "@stores/columnStore";
import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ColumnElement } from "@components/columns/ColumnElement";
import { AddColumnCard } from "@components/columns/add/AddColumnCard";
import { DragDropProvider, type DragEndEvent, type DragStartEvent } from "@dnd-kit/react";
import { Sortable } from "@components/base/Sortable";

export const KanbanView = () => {
  const { id } = useParams();
  const columns = useColumns();
  const setColumns = useSetColumns();
  const reorderColumns = useReorderColumns();
  const dragStartIndex = useRef<number | null>(null);

  useEffect(() => {
    const loadColumns = async () => {
      try {
        const fetchedColumns = await invoke<Column[]>(
          "get_columns_by_board_id",
          { boardId: id },
        );
        if (Array.isArray(fetchedColumns)) {
          setColumns(fetchedColumns);
        } else {
          console.log("Invalid columns data.");
        }
      } catch (err) {
        console.error("Error fetching columns:", err);
      }
    };

    loadColumns();
  }, [id, setColumns]);

  const handleDragStart: DragStartEvent = (event) => {
    const source = event.operation.source as { index: number } | null;
    dragStartIndex.current = source?.index ?? null;
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
      <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {columns.map((column, index) => (
          <Sortable key={column.id} id={column.id} index={index}>
            <ColumnElement {...column} />
          </Sortable>
        ))}
      </DragDropProvider>
      {id && <AddColumnCard boardId={id} />}
    </div>
  );
};
