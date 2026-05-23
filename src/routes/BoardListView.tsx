import { useBoardStore } from "@stores/boardStore";
import { BoardElement } from "@components/boards/BoardElement";
import { AddBoardCard } from "@components/boards/add/AddBoardCard";
export const BoardListView = () => {
  const { boards } = useBoardStore();

  return (
    <div className="grid grid-cols-5 items-start gap-3">
      {boards.map((board) => (
        <BoardElement key={board.id} {...board} />
      ))}
      <AddBoardCard />
    </div>
  );
};
