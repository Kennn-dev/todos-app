import useListView from "@/app/list.hooks";
import { useTodos } from "@/app/todos.hooks";
import { isValidTaskName } from "@/models/Task.model";
import InputTags from "./input-tags";
import Task from "./task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ListProps {}
export default function List(props: ListProps) {
  const { addTask, tasks, deleteTask, toggleTask, getTaskById, saveTask } =
    useTodos();

  const {
    initForm,

    tags,
    text,
    setTags,
    setText,

    mode,
    submit,
    changeCreateMode,
    changeUpdateMode,
    reset,
  } = useListView({
    create: (data) => addTask(data.title, data.tags),
    update: saveTask,
  });

  const handleSubmit = () => {
    submit();
  };

  const handleEdit = (id: string) => {
    const task = getTaskById(id);
    if (!task) {
      return;
    }
    initForm({
      tags: task.tags,
      title: task.title,
    });
    changeUpdateMode(id);
  };

  const selected = (id: string) => mode?.type === "edit" && mode.id === id;
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
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="What next todo ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <InputTags placeholder="Tags ..." value={tags} onChange={setTags} />
        <div className="flex gap-3 items-center">
          <Button
            className={"flex-3/4"}
            disabled={!isValidTaskName(text)}
            onClick={handleSubmit}
            size={"default"}
            variant={"default"}
          >
            {mode?.type === "create" ? "Add task" : "Save task"}
          </Button>

          <Button onClick={reset} size={"default"} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
