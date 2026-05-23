import type { Board } from "@t/Board";
import { Card } from "../base/Card";
import { useNavigate } from "react-router";
import { EditDropDown } from "@components/base/EditDropDown";

export const BoardElement = ({ name, id }: Board) => {
  const navigate = useNavigate();

  return (
    <Card className="relative flex flex-1 items-center">
      <div
        onClick={() => navigate(`/boards/${id}`)}
        className="flex flex-1 cursor-pointer p-3 px-3 hover:bg-(--color-hover)"
      >
        <div className="flex flex-1 items-center">
          <h2 className="max-w-9/10 text-lg wrap-anywhere">{name}</h2>
          <div className="absolute top-2 right-2">
            <EditDropDown id={id} type="board" />
          </div>
        </div>
      </div>
    </Card>
  );
};
