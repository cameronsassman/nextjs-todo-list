'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskProvider } from "../../lib/context";
import TaskForm from "./TaskForm/form";
import TaskList from "./TaskList/list";

export default function Form() {
    const [currentTask, setCurrentTask] = useState(null);

    return (
      <TaskProvider>
        <div className="flex flex-col items-center mt-5">
          <div className="flex flex-col items-center w-auto max-w-2xl shadow bg-gray-50 rounded-3xl">
            <Tabs defaultValue="task">
              <TabsList className="gap-2.5 items-center justify-between rounded-t-3xl bg-white pt-6 px-6 text-muted-foreground border-b">
                <TabsTrigger value="messages" disabled className="px-3 py-1">Messages</TabsTrigger>
                <TabsTrigger value="task" className="px-3 py-1">Today's Task</TabsTrigger>
                <TabsTrigger value="activity" disabled className="px-3 py-1">Last Activity</TabsTrigger>
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