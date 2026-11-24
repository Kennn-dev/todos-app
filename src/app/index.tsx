import List from "@/components/list";
import type { ITask } from "@/models/Task.model";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const addTask = (title: string) => {
    const newTask: ITask = {
      id: Date.now(),
      title,
      isCheck: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const toggleTask = (id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index !== -1) {
        prev[index].isCheck = !prev[index].isCheck;
      }

      return prev;
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      prev.splice(index, 1);
      return prev;
    });
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Todos App</h1>
      <List
        onAddTask={addTask}
        onDelete={deleteTask}
        onToggleCheck={toggleTask}
        tasks={tasks}
      />
    </div>
  );
}
