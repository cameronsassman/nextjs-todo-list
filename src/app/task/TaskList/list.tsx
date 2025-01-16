import { useTasks } from "@/app/lib/context";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import TaskItem from "../TaskItem/item";
import { Label } from "@/components/ui/label";

export default function TasklList({ setCurrentTask }: any) {
    const { tasks } = useTasks();
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
      <div className="flex gap-4 mb-5 mt-5">
          <Button onClick={() => setFilter("all")} className="flex flex-row text-slate-400 gap-2">All <Label className="text-center bg-gray-400 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer">{tasks.length}</Label></Button>
          <div className="border border-gray-300 h-6 self-center"></div>
          <Button onClick={() => setFilter("completed")} className="flex flex-row text-slate-400 gap-2">Closed <Label className="text-center bg-gray-400 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer">{closedCount}</Label></Button>
          <Button onClick={() => setFilter("incomplete")} className="flex flex-row text-slate-400 gap-2">Open <Label className="text-center bg-gray-400 text-slate-100 px-1.5 rounded-2xl text-sm cursor-pointer">{openCount}</Label></Button>
      </div>
      { loading ? (
        <Loading />
      ) : (
        <div>
          {filteredTasks.map((task : any) => (
            <TaskItem key={task.id} task={task} setCurrentTask={setCurrentTask} />
          ))}
        </div>
      )}
    </div>
  );
}