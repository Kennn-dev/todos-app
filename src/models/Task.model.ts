import { isTextEmpty } from "@/utils/string.utils";
import type { Tag } from "./Tag.model";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  // v2
  tags: Tag[];
}
export interface TaskUpdatePayload extends Pick<ITask, "tags" | "title"> {}
export function create(
  title: string,
  id: string,
  tags: Tag[] = [],
): ITask | null {
  if (isTextEmpty(title)) return null;
  return {
    id,
    title,
    completed: false,
    tags,
  };
}

export function toggleComplete(tasks: ITask[], id: string): ITask[] {
  const ts = [...tasks];
  return ts.map((t) => {
    if (t.id === id) {
      t.completed = !t.completed;
    }
    return t;
  });
}

export function deleteTask(tasks: ITask[], id: string): ITask[] {
  const ts = [...tasks];
  return ts.filter((t) => t.id !== id);
}

export function editTask(
  tasks: ITask[],
  id: string,
  data: Pick<ITask, "tags" | "title">,
): ITask[] {
  const ts = [...tasks];
  return ts.map((t) => {
    if (t.id === id) {
      return {
        ...t,
        title: data.title,
        tags: data.tags,
      };
    }
    return t;
  });
}

export function addTagToTask(task: ITask, tag: Tag): ITask {
  const t = { ...task };
  t.tags.push(tag);
  return t;
}

export function deleteTagInTask(task: ITask, tagId: string) {
  const t = { ...task };
  t.tags.filter((t) => t.id !== tagId);
  return t;
}
