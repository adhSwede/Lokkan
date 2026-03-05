import { invoke } from "@tauri-apps/api/core";
import { useDeleteColumn, type Column } from "@stores/columnStore";
import { Card } from "@components/base/Card";
import { Trash2 } from "lucide-react";
import { useSetTasks, useTasks, type Task } from "@stores/taskStore";
import { useEffect } from "react";
import { TaskElement } from "@components/tasks/TaskElement";
import { AddTaskCard } from "@components/tasks/add/AddTaskCard";

export const ColumnElement = ({ name, id }: Column) => {
  const deleteColumn = useDeleteColumn();

  const tasks = useTasks();
  const setTasks = useSetTasks();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await invoke<Task[]>("get_tasks_by_column_id", {
          columnId: id,
        });

        if (Array.isArray(fetchedTasks)) {
          setTasks(fetchedTasks);
        } else {
          console.log("Invalid tasks data.");
        }
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };

    loadTasks();
  }, [id, setTasks]);

  const deleteColumnElement = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const column = await invoke<Column>("delete_column", { id });
      deleteColumn(column);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="relative flex w-full justify-center p-1 pb-4">
          <h2 className="text-xl">{name}</h2>
          <button
            onClick={(e) => deleteColumnElement(e)}
            className="absolute top-0 right-1 flex w-fit cursor-pointer rounded p-1 hover:bg-red-500/50"
          >
            <Trash2 />
          </button>
        </div>
        <div className="h-full w-full rounded shadow-(--card-shadow)">
          {tasks
            .filter((task) => task.column_id === id)
            .map((task) => (
              <TaskElement key={task.id} {...task} />
            ))}
          {id && <AddTaskCard columnId={id} />}
        </div>
      </div>
    </Card>
  );
};
