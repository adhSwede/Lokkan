import { Plus } from "lucide-react";

export const AddTaskButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="flex flex-1 cursor-pointer items-center gap-3 p-2 hover:bg-white/10"
      onClick={onClick}
    >
      <Plus className="h-fit" />
      <span>Add new task...</span>
    </button>
  );
};
