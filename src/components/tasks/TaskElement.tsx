import { Card } from "@components/base/Card";
import type { Task } from "@t/Task";
import { EditDropDown } from "@components/base/EditDropDown";

export const TaskElement = ({ title, id }: Task) => {
  return (
    <Card className="bg-(--color-surface)">
      <div className="flex w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1">
          <h3 className="text-lg">{title}</h3>
          <div className="absolute top-0 right-1">
            <EditDropDown id={id} type="task" />
          </div>
        </div>
      </div>
    </Card>
  );
};
