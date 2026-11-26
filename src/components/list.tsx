import useListView from "@/app/list.hooks";
import { useTodos } from "@/app/todos.hooks";
import { isTextEmpty } from "@/utils/string.utils";
import InputTags from "./input-tags";
import Task from "./task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ListProps {}
export default function List(props: ListProps) {
  const {
    addTask,
    tasks,
    deleteTask,
    toggleTask,
    getTaskById,
    selectedId,
    selectTaskId,
    saveTask,
  } = useTodos();
  const { initForm, reset, tags, text, setTags, setText } = useListView();
  const handleAddTask = () => {
    addTask(text, tags);
    reset();
    selectTaskId(null);
  };
  const handleEdit = (id: string) => {
    selectTaskId(id);
    const task = getTaskById(id);
    if (!task) {
      return;
    }
    initForm({
      tags: task.tags,
      title: task.title,
    });
  };
  const handleSaveTask = () => {
    saveTask({
      tags,
      title: text,
    });
    reset();
    selectTaskId(null);
  };
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
            selected={selectedId === task.id}
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
              handleAddTask();
            }
          }}
        />
        <InputTags value={tags} onChange={setTags} />

        <Button
          disabled={isTextEmpty(text)}
          onClick={() => {
            selectedId !== null ? handleSaveTask() : handleAddTask();
          }}
          size={"default"}
          variant={"default"}
        >
          {selectedId !== null ? "Save task" : "Add task"}
        </Button>
      </div>
    </div>
  );
}
