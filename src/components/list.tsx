import { useTodos } from "@/app/todos.hooks";
import type { TaskUpdatePayload } from "@/models/Task.model";
import { useState } from "react";
import FormDrawer from "./form-drawer";
import Task from "./task";
import { Button } from "./ui/button";

export type Mode = { type: "create" } | { type: "edit"; id: string };
interface ListProps {}
export default function List(props: ListProps) {
  const { addTask, tasks, deleteTask, toggleTask, getTaskById, saveTask } =
    useTodos();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>({ type: "create" });

  const isCreateMode = mode.type === "create";
  const isEditMode = mode.type === "edit";

  const handleSubmit = (payload: TaskUpdatePayload) => {
    let result: boolean = false;
    if (isCreateMode) {
      result = addTask(payload.title, payload.tags);
    }

    if (isEditMode) {
      result = saveTask(mode.id, payload);
    }

    setOpen(!result);
  };

  const handleEdit = (id: string) => {
    setOpen(true);
    setMode({ type: "edit", id });
  };

  const handleCreate = () => {
    setOpen(true);
    setMode({ type: "create" });
  };

  const getInitialValue = (id: string | null): TaskUpdatePayload => {
    const _default = {
      tags: [],
      title: "",
    };
    if (id === null) return _default;
    const task = getTaskById(id);
    if (!task) return _default;

    return {
      tags: task?.tags,
      title: task?.title,
    };
  };

  const selected = (id: string) => mode?.type === "edit" && mode.id === id;
  const formValue = getInitialValue(isCreateMode ? null : mode.id);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleCheck={toggleTask}
            onEdit={handleEdit}
            selected={selected(task.id)}
          />
        ))}
      </div>
      <div className="text-right">
        <Button onClick={handleCreate}>Create</Button>
      </div>
      <FormDrawer
        title={`${isCreateMode ? "Create" : "Edit"} ${isEditMode ? formValue.title : "Task"}`}
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        initialValues={formValue}
      />
    </div>
  );
}
