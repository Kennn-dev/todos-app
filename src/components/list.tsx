import { useTodos } from "@/app/todos.hooks";
import { isTextEmpty } from "@/models/Task.model";
import { useState } from "react";
import Task from "./task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ListProps {}
export default function List(props: ListProps) {
  const { addTask, tasks, deleteTask, toggleTask } = useTodos();
  const [text, setText] = useState<string>("");
  const handleAddTask = () => {
    addTask(text);
    setText("");
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
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="What next todo ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <Button
          disabled={isTextEmpty(text)}
          onClick={handleAddTask}
          size={"default"}
          variant={"default"}
        >
          Add task
        </Button>
      </div>
    </div>
  );
}
