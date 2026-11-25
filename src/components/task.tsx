import type { ITask } from "@/models/Task.model";
import {
  CircleCheckIcon,
  CircleIcon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

interface TaskProps {
  task: ITask;
  onToggleCheck(id: number, status: boolean): void;
  onDelete(id: number): void;
}
export default function Task(props: TaskProps) {
  const { task, onDelete, onToggleCheck } = props;
  return (
    <div
      className={` flex gap-1.5 items-center justify-between px-3 py-2 ${task.isCheck ? "opacity-30" : "opacity-100"} transition-all`}
    >
      <div className={`flex items-center gap-1 flex-1 `}>
        {task.isCheck ? (
          <HugeiconsIcon
            cursor={"pointer"}
            icon={CircleCheckIcon}
            size={24}
            color="var(--primary)"
            strokeWidth={1.5}
            onClick={() => onToggleCheck(task.id!, task.isCheck)}
          />
        ) : (
          <HugeiconsIcon
            cursor={"pointer"}
            icon={CircleIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            onClick={() => onToggleCheck(task.id!, task.isCheck)}
          />
        )}

        <span>{task.title}</span>
      </div>

      <div className="action">
        <Button
          className={`${task.isCheck && "invisible opacity-0"}`}
          size={"icon-lg"}
          onClick={() => onDelete(task.id!)}
        >
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
