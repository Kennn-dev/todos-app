import type { Tag } from "@/models/Tag.model";
import {
  create,
  deleteTask,
  editTask,
  toggleComplete,
  type ITask,
  type TaskUpdatePayload,
} from "@/models/Task.model";
import { uuid } from "@/utils";
import { useState } from "react";

export function useTodos() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (title: string, tags: Tag[] = []): boolean => {
    const newTask = create({
      title,
      tags,
      completed: false,
      content: "",
      createdAt: new Date(),
      id: uuid(),
    });
    if (newTask === null) return false;
    setTasks((prev) => [...prev, newTask]);
    return true;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => toggleComplete(prev, id));
  };

  const deleteTodo = (id: string) => {
    setTasks((prev) => deleteTask(prev, id));
  };

  const getTaskById = (id: string): ITask | undefined => {
    return tasks.find((t) => t.id === id);
  };

  const saveTask = (id: string, task: TaskUpdatePayload): boolean => {
    const updatedTasks = editTask(id, tasks, task);
    if (updatedTasks === null) return false;
    setTasks(updatedTasks);
    return true;
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask: deleteTodo,
    getTaskById,
    saveTask,
  };
}
