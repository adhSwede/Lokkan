import { useBoards } from "@stores/boardStore";
import { BoardElement } from "@components/boards/BoardElement";
import { AddBoardCard } from "@components/boards/add/AddBoardCard";
import { useGetAllBoards } from "@hooks/boardHooks";

export const BoardListView = () => {
  const boards = useBoards();
  useGetAllBoards();

  return (
    <div className="grid grid-cols-5 gap-3">
      {boards.map((board) => (
        <BoardElement key={board.id} {...board} />
      ))}
      <AddBoardCard />
    </div>
  );
};
