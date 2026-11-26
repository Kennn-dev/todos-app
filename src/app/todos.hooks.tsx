import type { Tag } from "@/models/Tag.model";
import {
  create,
  deleteTask,
  toggleComplete,
  type ITask,
  type TaskUpdatePayload,
} from "@/models/Task.model";
import { uuid } from "@/utils";
import { useState } from "react";

export function useTodos() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addTask = (text: string, tags: Tag[] = []): void => {
    const newTask = create(text, uuid(), tags);
    if (newTask === null) return;
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    if (id === selectedId) return;
    const newTasks = toggleComplete(tasks, id);
    setTasks(newTasks);
  };

  const deleteTodo = (id: string) => {
    const newTasks = deleteTask(tasks, id);
    setTasks(newTasks);
  };

  const getTaskById = (id: string): ITask | undefined => {
    return tasks.find((t) => t.id === id);
  };

  const selectTaskId = (id: string | null) => {
    setSelectedId(id);
  };

  const saveTask = (task: TaskUpdatePayload): void => {
    if (selectedId === null) return;
    const t = getTaskById(selectedId);
    if (!t) return;
    const updatedTasks = tasks.map((v) => {
      if (v.id === t.id) {
        return {
          ...v,
          title: task.title,
          tags: task.tags,
        };
      }
      return v;
    });
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask: deleteTodo,
    getTaskById,
    selectTaskId,
    selectedId,
    saveTask,
  };
}
