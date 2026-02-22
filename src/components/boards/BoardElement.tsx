import { Trash2 } from "lucide-react";
import { useDeleteBoard, type Board } from "../../stores/boardStore";
import { Card } from "../base/Card";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router";

export const BoardElement = ({ name, id }: Board) => {
  const navigate = useNavigate();
  const deleteBoard = useDeleteBoard();

  const deleteBoardElement = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const board = await invoke<Board>("delete_board", { id });
      deleteBoard(board);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="relative flex flex-1 items-center">
      <div
        onClick={() => navigate(`/boards/${id}`)}
        className="flex flex-1 cursor-pointer p-3 px-3 hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div className="flex flex-1 items-center">
          <h2 className="max-w-9/10 text-lg wrap-anywhere">{name}</h2>
          <button
            onClick={(e) => deleteBoardElement(e)}
            className="absolute top-2 right-2 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </Card>
  );
};
