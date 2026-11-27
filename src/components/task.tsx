import { canEdit, type ITask } from "@/models/Task.model";
import {
  CircleCheckIcon,
  CircleIcon,
  EditIcon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDistance } from "date-fns";
import CustomBadge from "./custom-badge";
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
  const { task, onDelete, onToggleCheck, onEdit } = props;
  const disabled = !canEdit(task);
  function getDateFromNow(date?: Date): string {
    if (!date) return "";

    return formatDistance(date, new Date(), {
      addSuffix: true,
    });
  }
  return (
    <div
      className={`${task.completed ? "opacity-30" : "opacity-100"}  transition-all space-y-1.5
      overflow-hidden rounded-xl  border border-input px-1.5 py-2 `}
    >
      <div className="block">
        <CustomBadge type="Done">Done</CustomBadge>
      </div>
      <div
        className={`flex gap-1.5 items-start justify-between 
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
          <div className="flex flex-col gap-1">
            <span className="font-bold font-heading">{task.title}</span>
            <div className="flex gap-2 flex-wrap">
              {task.tags.map((t) => (
                <Badge key={t.id} variant={"outline"}>
                  {t.name}
                </Badge>
              ))}
            </div>
            <span className="text-gray-400 font-light italic text-xs">
              {getDateFromNow(task.createdAt)}
            </span>
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
    </div>
  );
}
