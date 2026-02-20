import { useParams } from "react-router";
import { useColumns, useSetColumns, type Column } from "../stores/columnStore";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ColumnElement } from "../components/full/columns/ColumnElement";
import { AddColumnCard } from "../components/full/columns/add/AddColumnCard";

export const KanbanView = () => {
  const { id } = useParams();
  const columns = useColumns();
  const setColumns = useSetColumns();

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

  return (
    <div className="grid h-full grid-cols-5 grid-rows-1 gap-3">
      {columns.map((column) => (
        <ColumnElement key={column.id} {...column} />
      ))}
      {id && <AddColumnCard boardId={id} />}
    </div>
  );
};
