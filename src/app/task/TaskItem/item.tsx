import { useTasks } from "@/app/lib/context";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Check } from 'lucide-react'

export default function TaskItem({ task, setCurrentTask }: any) {
    const {toggleCompletion } = useTasks();

      return (
    <div className={`flex justify-between items-center p-5 mb-2.5 bg-white shadow-inner rounded-lg`}>
      <div className="flex justify-between items-center w-full border-b border-b-gray-100 py-2">
        <div className="flex flex-col">
            <Label className={task.completed ? "text-lg font-thin line-through" : "text-lg font-thin"}>{task.name}</Label>
            <Label className="text-gray-500">{task.author}</Label>
        </div>
        <div className="flex gap-2.5">
          <Button onClick={() => toggleCompletion(task.id)} className={task.completed ? "bg-blue-600 " : "p-3 w-2 h-2 border border-gray-300"}>
            {task.completed ? <Check size={10} color="#ffffff" strokeWidth={4} /> : <></>}
          </Button>
        </div>
      </div>
    </div>
  );
}