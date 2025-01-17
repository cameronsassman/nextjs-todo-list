import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  author: string;
  date: string;
  dateTime: string;
  completed: boolean;
  image: string
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string, author: string, dateTime: string, image: string) => void;
  editTask: (id: number, updatedName: string, updatedAuthor: string) => void;
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string, author: string, dateTime: string, image: string) =>
    setTasks([...tasks, { id: Date.now(), name, author, date: new Date(dateTime).toDateString(), dateTime, completed: false, image }]);

  const editTask = (id: number, updatedName: string, updatedAuthor: string) =>
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, name: updatedName, author: updatedAuthor }
          : task
      )
    );

  const deleteTask = (id: number) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const toggleCompletion = (id: number) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, toggleCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
