import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

export const ColumnSortable = ({
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
  const { ref } = useSortable({
    id,
    index,
    group,
    type: "Column",
    accept: "Column",
  });

  return <div ref={ref}>{children}</div>;
};
