import { Trash2 } from "lucide-react";
import { useDeleteBoard, type Board } from "../../../stores/boardStore";
import { Card } from "../../base/Card";
import { invoke } from "@tauri-apps/api/core";

export const BoardListItem = ({ name, id }: Board) => {
  const deleteBoard = useDeleteBoard();

  const deleteBoardItem = async () => {
    try {
      const board = await invoke<Board>("delete_board", { id: id });
      deleteBoard(board);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="flex flex-1 items-center">
      <div className="relative flex flex-1 p-3 px-3">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg">{name}</h2>
          <button
            onClick={deleteBoardItem}
            className="absolute top-2 right-2 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </Card>
  );
};
