import { useTasks } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import pfp from "../../../../public/userImage.jpg"
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
  const { deleteTask, toggleCompletion } = useTasks();

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
            <div className="flex mt-0 absolute top-0 right-0">
              <Button onClick={() => deleteTask(task.id)} className="">
                <X size={16} color="#e0e0e0" strokeWidth={3} />
              </Button>
            </div>
            <Button
              onClick={() => toggleCompletion(task.id)}
              className={task.completed ? "bg-blue-600" : "p-3 w-2 h-2 border border-gray-300"}
            >
              {task.completed ? <Check size={10} color="#ffffff" strokeWidth={4} /> : <></>}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center w-full border-b border-b-gray-100 py-2">
          <div className="pt-2">
            <Label className="text-gray-500">{currentDate + " "}</Label>
            <Label className="text-gray-500">
              {startTime} - {endTime}
            </Label>
          </div>
          <Image
            src={task.image}
            alt="Picture of the author"
            fill
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
