import { useState } from "react";
import { Card } from "../../base/Card";
import { AddBoardButton } from "./AddBoardButton";
import { EditBoardForm } from "./EditBoardForm";

export const AddBoardCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="w-full">
      {isEditing ? (
        <EditBoardForm onToggle={() => setIsEditing(!isEditing)} />
      ) : (
        <AddBoardButton onClick={() => setIsEditing(!isEditing)} />
      )}
    </Card>
  );
};
