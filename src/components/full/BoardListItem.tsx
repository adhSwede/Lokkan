import type { Board } from "../../stores/boardStore";

export const BoardListItem = ({
  id,
  name,
  description,
  created_at,
  updated_at,
}: Board) => {
  return (
    <li>
      <div>
        {id}
        {name}
        {description}
        {created_at}
        {updated_at}
      </div>
    </li>
  );
};
