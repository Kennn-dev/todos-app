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
  if (!isValidTaskName(title)) return null;
  return {
    id,
    title: title.trim(),
    completed: false,
    tags,
  };
}

export function toggleComplete(tasks: ITask[], id: string): ITask[] {
  return tasks.map((t) => {
    if (t.id === id) {
      return {
        ...t,
        completed: !t.completed,
      };
    }
    return t;
  });
}

export function deleteTask(tasks: ITask[], id: string): ITask[] {
  const ts = [...tasks];
  return ts.filter((t) => t.id !== id);
}

export function addTagToTask(task: ITask, tag: Tag): ITask {
  return {
    ...task,
    tags: [...task.tags, tag],
  };
}

export function isValidTaskName(name: string): boolean {
  if (name.trim() === "") return false;
  return true;
}

export function editTask(
  id: string,
  tasks: ITask[],
  task: TaskUpdatePayload,
): ITask[] | null {
  const target = tasks.find((t) => t.id === id);
  if (!target || !canEdit(target) || !isValidTaskName(task.title)) return null;

  return tasks.map((t) =>
    t.id === id ? { ...t, ...task, title: task.title.trim() } : t,
  );
}
export const canEdit = (task: ITask) => !task.completed;
