import { type Column } from "../../../stores/columnStore";
import { Card } from "../../base/Card";

export const ColumnElement = ({ name }: Column) => {
  return (
    <Card className="h-full">
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="flex w-full justify-center p-1 pb-4">
          <h2 className="text-xl">{name}</h2>
        </div>
        <div className="h-full w-full rounded shadow-(--card-shadow)"></div>
      </div>
    </Card>
  );
};
