import { Plus } from "lucide-react";

export const AddBoardButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-transparent hover:border-(--color-text-muted) p-2 transition-opacity hover:opacity-60"
      onClick={onClick}
    >
      <Plus className="h-fit" />
      <span>Add new board...</span>
    </button>
  );
};
