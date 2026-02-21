import { invoke } from "@tauri-apps/api/core";
import { useDeleteColumn, type Column } from "../../stores/columnStore";
import { Card } from "../base/Card";
import { Trash2 } from "lucide-react";

export const ColumnElement = ({ name, id }: Column) => {
  const deleteColumn = useDeleteColumn();

  const deleteColumnElement = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const column = await invoke<Column>("delete_column", { id });
      deleteColumn(column);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1 pb-4">
          <h2 className="text-xl">{name}</h2>
          <button
            onClick={(e) => deleteColumnElement(e)}
            className="absolute top-0 right-1 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
        <div className="h-full w-full rounded shadow-(--card-shadow)"></div>
      </div>
    </Card>
  );
};
