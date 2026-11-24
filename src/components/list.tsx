import type { ITask } from "@/models/Task.model";
import { useState } from "react";
import Task from "./task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ListProps {
  tasks: ITask[];
  onAddTask(title: string): void;
  onToggleCheck(id: number): void;
  onDelete(id: number): void;
}
export default function List(props: ListProps) {
  const { tasks, onDelete, onToggleCheck, onAddTask } = props;
  const [text, setText] = useState<string>("");
  return (
    <div className="flex flex-col gap-0 p-2">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleCheck={onToggleCheck}
        />
      ))}
      <div className="flex flex-col gap-1.5">
        <Input
          placeholder="What next todo ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={() => onAddTask(text)}
          size={"default"}
          variant={"default"}
        >
          Add task
        </Button>
      </div>
    </div>
  );
}
