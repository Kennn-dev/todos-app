export interface ITask {
  id: number;
  title: string;
  isCheck: boolean;
}

export class TaskService {
  constructor() {}

  create(title: string): ITask {
    return {
      id: Date.now(),
      title,
      isCheck: false,
    };
  }

  toggleCheck(tasks: ITask[], id: number): ITask[] {
    const index = tasks.findIndex((p) => p.id === id);
    if (index !== -1) {
      tasks[index].isCheck = !tasks[index].isCheck;
    }

    return tasks;
  }

  delete(tasks: ITask[], id: number): ITask[] {
    const index = tasks.findIndex((p) => p.id === id);
    tasks.splice(index, 1);
    return tasks;
  }
}
