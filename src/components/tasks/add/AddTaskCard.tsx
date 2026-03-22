import { useState } from "react";
import { Card } from "@components/base/Card";
import { AddTaskButton } from "./AddTaskButton";
import { AddTaskForm } from "./AddTaskForm";

export const AddTaskCard = ({ columnId }: { columnId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="h-1/10">
      {isEditing ? (
        <AddTaskForm
          columnId={columnId}
          onToggle={() => setIsEditing(!isEditing)}
        />
      ) : (
        <AddTaskButton onClick={() => setIsEditing(!isEditing)} />
      )}
    </Card>
  );
};
