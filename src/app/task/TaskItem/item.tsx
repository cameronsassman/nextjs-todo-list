import { useTasks } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, X, Archive, ArchiveRestore  } from "lucide-react";
import Image from "next/image";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TaskItem({ task, setCurrentTask }: any) {
  const { deleteTask, toggleCompletion, toggleArchive } = useTasks();

  const taskDetails = task.dateTime.split(" ");
  const taskDate = new Date(taskDetails[0]);
  const startTime = taskDetails[1];
  const endTime = taskDetails[3];

  const month = months[taskDate.getMonth()];
  const day = days[taskDate.getDay() - 1];
  const date = taskDate.getDate();
  const currentDate = `${day}, ${date} ${month}`;


  return (
    <div className="bg-white shadow-inner rounded-lg relative">
      <div className="flex flex-col justify-between p-4 px-5 mb-2.5">
        <div className="flex justify-between items-center w-full border-b border-b-gray-100 py-2">
          <div className="flex flex-col">
            <Label className={task.completed ? "text-lg font-thin line-through" : "text-lg font-thin"}>
              {task.name}
            </Label>
            <Label className="text-gray-500">{task.author}</Label>
          </div>
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={() => toggleCompletion(task.id)}
              className={task.completed ? "bg-blue-600" : "p-3 w-2 h-2 border border-gray-300"}
            >
              {task.completed ? <Check size={10} color="#ffffff" strokeWidth={4} /> : <></>}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center w-full py-2">
          <div className="pt-2">
            <Label className="text-gray-400">{currentDate + " "}</Label>
            <Label className="text-neutral-300">
              {startTime} - {endTime}
            </Label>
          </div>
          {task.image && task.image.length > 0 && (
            <div>
              {task.image.map((image: string, index: number) => (
                <div key={index}  className="relative w-6 h-6">
                  <Image
                    src={image}
                    alt={`Task ${task.name} - ${index + 1}`}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
