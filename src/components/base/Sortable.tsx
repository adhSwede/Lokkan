import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

export const Sortable = ({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: ReactNode;
}) => {
  const { ref } = useSortable({ id, index });
  return <div ref={ref}>{children}</div>;
};
