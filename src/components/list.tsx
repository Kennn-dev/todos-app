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
  return (
    <div className="flex flex-col gap-0 p-2">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggleCheck={toggleTask}
        />
      ))}
      <div className="flex flex-col gap-1.5">
        <Input
          placeholder="What next todo ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          disabled={isTextEmpty(text)}
          onClick={() => {
            addTask(text);
            setText("");
          }}
          size={"default"}
          variant={"default"}
        >
          Add task
        </Button>
      </div>
    </div>
  );
}
