export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}
export const isTextEmpty = (text: string): boolean => text.trim() === "";
export function create(title: string, id: string): ITask | null {
  if (isTextEmpty(title)) return null;
  return {
    id,
    title,
    completed: false,
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
