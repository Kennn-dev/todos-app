import type { ITask } from "@/models/Task.model";
import {
  CircleCheckIcon,
  CircleIcon,
  EditIcon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface TaskProps {
  task: ITask;
  onToggleCheck(id: string): void;
  onDelete(id: string): void;
  onEdit(id: string): void;
  selected: boolean;
}
export default function Task(props: TaskProps) {
  const { task, onDelete, onToggleCheck, onEdit, selected } = props;
  const disabled = task.completed || selected;
  return (
    <div
      className={`flex gap-1.5 items-start justify-between px-3 py-2 ${task.completed ? "opacity-30" : "opacity-100"} transition-all
      overflow-hidden rounded-xl ${selected ? "border border-input" : ""}
      `}
    >
      <div className="flex-none">
        {task.completed ? (
          <HugeiconsIcon
            cursor={"pointer"}
            icon={CircleCheckIcon}
            size={18}
            color="var(--primary)"
            strokeWidth={1.5}
            onClick={() => onToggleCheck(task.id)}
          />
        ) : (
          <HugeiconsIcon
            cursor={"pointer"}
            icon={CircleIcon}
            size={18}
            color="currentColor"
            strokeWidth={1.5}
            onClick={() => onToggleCheck(task.id)}
          />
        )}
      </div>
      <div className={`flex items-start gap-2 flex-1 `}>
        <div className="flex flex-col gap-0.5">
          <span>{task.title}</span>
          <div className="flex gap-2 flex-wrap  mt-1">
            {task.tags.map((t) => (
              <Badge key={t.id} variant={"outline"}>
                {t.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className={`actions flex items-center gap-0`}>
        <Button
          variant={"ghost"}
          className={`${disabled && "invisible opacity-0"} rounded-full`}
          size={"icon-sm"}
          onClick={() => onEdit(task.id)}
        >
          <HugeiconsIcon
            icon={EditIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
        </Button>
        <Button
          variant={"ghost"}
          className={`${disabled && "invisible opacity-0"} rounded-full`}
          size={"icon-sm"}
          onClick={() => onDelete(task.id)}
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
