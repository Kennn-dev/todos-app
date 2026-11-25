import { TaskService, type ITask } from "@/models/Task.model";
import { useState } from "react";

export function useTodos() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskService = new TaskService();
  const addTask = (title: string) => {
    const newTask = taskService.create(title);
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    const newTasks = taskService.toggleCheck(tasks, id);
    setTasks((prev) => newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = taskService.delete(tasks, id);
    setTasks(newTasks);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
