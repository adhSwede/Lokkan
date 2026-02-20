import { useState } from "react";
import { Card } from "../../base/Card";
import { AddBoardButton } from "./AddBoardButton";
import { AddBoardForm } from "./AddBoardForm";

export const AddBoardCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="w-full">
      {isEditing ? (
        <AddBoardForm onToggle={() => setIsEditing(!isEditing)} />
      ) : (
        <AddBoardButton onClick={() => setIsEditing(!isEditing)} />
      )}
    </Card>
  );
};
