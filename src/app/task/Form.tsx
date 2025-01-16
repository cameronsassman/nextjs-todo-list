'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { TaskProvider } from "../lib/context";
import TaskForm from "./TaskForm/form";
import TaskList from "./TaskList/list";

export default function Form() {
    const [currentTask, setCurrentTask] = useState(null);

    return (
      <TaskProvider>
        <div className="flex flex-col items-center mt-5">
          <div className="flex flex-col items-center w-auto max-w-2xl shadow bg-gray-50 rounded-3xl">
            <Tabs defaultValue="task">
              <TabsList>
                <TabsTrigger value="messages" disabled>Messages</TabsTrigger>
                <TabsTrigger value="task">Today's Task</TabsTrigger>
                <TabsTrigger value="activity" disabled>Last Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="task" className="w-full p-5">
                <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} />
                <TaskList setCurrentTask={setCurrentTask} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </TaskProvider>
    );
}