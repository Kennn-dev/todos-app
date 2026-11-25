import {
  create,
  deleteTask,
  toggleComplete,
  type ITask,
} from "@/models/Task.model";
import { uuid } from "@/utils";
import { useState } from "react";

export function useTodos() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (text: string): void => {
    const newTask = create(text, uuid());
    if (newTask === null) return;
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    const newTasks = toggleComplete(tasks, id);
    setTasks(newTasks);
  };

  const deleteTodo = (id: string) => {
    const newTasks = deleteTask(tasks, id);
    setTasks(newTasks);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask: deleteTodo,
  };
}
