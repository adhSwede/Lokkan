import { Card } from "@components/base/Card";
import type { Task } from "@t/Task";
import { EditDropDown } from "@components/base/EditDropDown";
import { useUpdateTask } from "@hooks/taskHooks";
import { useEffect, useRef, useState } from "react";

export const TaskElement = ({
  title,
  description,
  id,
  column_id,
  position,
}: Task) => {
  const updateTask = useUpdateTask();
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [descValue, setDescValue] = useState(description ?? "");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) titleRef.current?.focus();
  }, [isEditing]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await updateTask(
      id,
      column_id,
      titleValue,
      position,
      descValue || undefined,
    );
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="bg-(--color-surface)">
        <form onSubmit={handleSave} className="flex w-full flex-col gap-2 p-3">
          <input
            ref={titleRef}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="w-full rounded bg-(--color-input) p-1 px-2 text-sm"
            placeholder="Title"
          />
          <textarea
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            className="w-full resize-none rounded bg-(--color-input) p-1 px-2 text-sm"
            placeholder="Description"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cursor-pointer rounded px-2 py-1 text-xs hover:bg-(--color-hover)"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded bg-(--color-input) px-2 py-1 text-xs hover:bg-(--color-hover)"
            >
              Save
            </button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card className="relative bg-(--color-bg)">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 p-3 pr-8">
        <h3 className="text-base wrap-anywhere">{title}</h3>
        {description && (
          <p className="text-sm wrap-anywhere text-(--color-text-muted)">
            {description}
          </p>
        )}
      </div>
      <div className="absolute top-2 right-2">
        <EditDropDown id={id} type="task" onEdit={() => setIsEditing(true)} />
      </div>
    </Card>
  );
};
