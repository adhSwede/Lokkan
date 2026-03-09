import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

export const TaskSortable = ({
  id,
  index,
  children,
  group,
}: {
  id: string;
  index: number;
  children: ReactNode;
  group: string;
}) => {
  const { ref } = useSortable({ id, index, type: "item", group });
  return <div ref={ref}>{children}</div>;
};
