import { useTasks } from "@/lib/context";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import TaskItem from "../TaskItem/item";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasklList({ setCurrentTask }: any) {
    const { tasks, archivedTasks } = useTasks();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const closedCount = tasks.filter((task) => task.completed).length;
    const openCount = tasks.length - closedCount;


    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }, [filter, search]);

    const Loading = () => <div>Loading tasks...</div>;


    const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) => task.name.toLowerCase().includes(search.toLowerCase()));

    

    return (
    <div className="">
      <Tabs defaultValue="all">
        <TabsList className="gap-4 mb-5 mt-5">
          <TabsTrigger value="all" onClick={() => setFilter("all")} className="text-base px-2 py-2 flex flex-row text-slate-400 gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-0 group">All <Label className="text-center bg-gray-300 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer group-data-[state=active]:bg-blue-600">{tasks.length}</Label></TabsTrigger>
          <div className="border border-gray-300 h-6 self-center"></div>
          <TabsTrigger value="closed"onClick={() => setFilter("completed")} className="text-base px-2 py-2 flex flex-row text-slate-400 gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-0 group">Closed <Label className="text-center bg-gray-300 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer group-data-[state=active]:bg-blue-600">{closedCount}</Label></TabsTrigger>
          <TabsTrigger value="open" onClick={() => setFilter("incomplete")} className="text-base px-2 py-2 flex flex-row text-slate-400 gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-0 group">Open <Label className="text-center bg-gray-300 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer group-data-[state=active]:bg-blue-600">{openCount}</Label></TabsTrigger>
          <TabsTrigger value="archive" onClick={() => setFilter("archive")} className="text-base px-2 py-2 flex flex-row text-slate-400 gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-0 group">Archive <Label className="text-center bg-gray-300 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer group-data-[state=active]:bg-blue-600">{archivedTasks.length}</Label></TabsTrigger>
        </TabsList>
      </Tabs>
      { loading ? (
        <Loading />
      ) : (
        <div>
          {tasks.length > 0 && (
            <>
              {filteredTasks.map((task : any) => (
                <TaskItem key={task.id} task={task} setCurrentTask={setCurrentTask} />
              ))}
            </>
          )}
          
          {archivedTasks.length > 0 && (
            <>
              {archivedTasks.map((task) => (
                <TaskItem key={task.id} task={task} setCurrentTask={setCurrentTask} />
              ))}
            </>)}
        </div>
      )}
    </div>
  );
}