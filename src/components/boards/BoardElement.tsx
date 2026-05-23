import type { Board } from "@t/Board";
import { Card } from "@components/base/Card";
import { useNavigate } from "react-router";
import { EditDropDown } from "@components/base/EditDropDown";
import { useUpdateBoard } from "@hooks/boardHooks";
import { useEffect, useRef, useState } from "react";

export const BoardElement = ({ name, description, id }: Board) => {
  const navigate = useNavigate();
  const updateBoard = useUpdateBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [descValue, setDescValue] = useState(description ?? "");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) nameRef.current?.focus();
  }, [isEditing]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await updateBoard(id, nameValue, descValue || undefined);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="relative flex flex-1 items-center">
        <form
          onSubmit={handleSave}
          onClick={(e) => e.stopPropagation()}
          className="flex w-full flex-col gap-2 p-3"
        >
          <input
            ref={nameRef}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="w-full rounded bg-(--color-input) p-1 px-2 text-sm"
            placeholder="Name"
          />
          <textarea
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            className="w-full resize-none rounded bg-(--color-input) p-1 px-2 text-sm"
            placeholder="Description"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
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
    <Card className="relative flex bg-(--color-surface)">
      <div
        onClick={() => navigate(`/boards/${id}`)}
        className="flex flex-1 cursor-pointer items-start p-3 px-3 hover:bg-(--color-hover)"
      >
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="max-w-9/10 text-lg wrap-anywhere">{name}</h2>
          {description && (
            <p className="text-sm wrap-anywhere text-(--color-text-muted)">
              {description}
            </p>
          )}
        </div>
      </div>
      <div
        className="absolute top-2 right-2"
        onClick={(e) => e.stopPropagation()}
      >
        <EditDropDown id={id} type="board" onEdit={() => setIsEditing(true)} />
      </div>
    </Card>
  );
};
