import { useState } from "react";
import { Card } from "@components/base/Card";
import { AddColumnButton } from "./AddColumnButton";
import { AddColumnForm } from "./AddColumnForm";

export const AddColumnCard = ({ boardId }: { boardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="h-1/10 w-50">
      {isEditing ? (
        <AddColumnForm
          boardId={boardId}
          onToggle={() => setIsEditing(!isEditing)}
        />
      ) : (
        <AddColumnButton onClick={() => setIsEditing(!isEditing)} />
      )}
    </Card>
  );
};
