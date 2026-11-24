import type { ITask } from "@/models/Task.model";
import { CircleIcon, TrashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

interface TaskProps {
  task: ITask;
  onToggleCheck(id: number): void;
  onDelete(id: number): void;
}
export default function Task(props: TaskProps) {
  const { task, onDelete, onToggleCheck } = props;
  return (
    <div className="flex gap-1.5 items-center justify-between px-3 py-2">
      <div
        className={`flex items-center gap-1 flex-1 ${task.isCheck ? "opacity-80" : "opacity-100"}`}
      >
        <HugeiconsIcon
          icon={CircleIcon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
          onClick={() => onToggleCheck(task.id)}
        />
        <span>{task.title}</span>
      </div>

      <div className="action">
        <Button size={"icon-lg"} onClick={() => onDelete(task.id)}>
          <HugeiconsIcon
            icon={TrashIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
        </Button>
      </div>
    </div>
  );
}
