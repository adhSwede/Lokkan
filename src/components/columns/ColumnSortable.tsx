import { useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";
import { useCombinedRefs } from "@dnd-kit/utilities";

export const ColumnSortable = ({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: ReactNode;
}) => {
  const { ref: sortableRef } = useSortable({ id, index, type: "Column" });
  const { ref: droppableRef } = useDroppable({
    id,
    collisionPriority: 0,
  });

  const combinedRef = useCombinedRefs(sortableRef, droppableRef);

  return <div ref={combinedRef}>{children}</div>;
};
