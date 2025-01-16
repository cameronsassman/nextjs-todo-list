'use client'

import { useState } from "react";
import { Plus, RefreshCcw } from "lucide-react";

import "../../globals.css";
import { useTasks } from "@/app/lib/context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const MAX_CHAR_LIMIT = 50;
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

export default function TaskForm({ currentTask, setCurrentTask }: any) {
  const { addTask, editTask } = useTasks();
  const [taskName, setTaskName] = useState(currentTask ? currentTask.name : "");
  const [author, setAuthor] = useState(currentTask ? currentTask.author : ""); // New state for author
  const [charCount, setCharCount] = useState(0);

  const today = new Date();

  const month = months[today.getMonth()];
  const day = days[today.getDay() - 1];
  const date = today.getDate();
  const currentDate = day + ", " + date + " " + month;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!taskName.trim() || !author.trim()) {
      return alert("Both task name and author cannot be empty");
    }

    if (currentTask) {
      editTask(currentTask.id, taskName, author); // Pass author when editing
      setCurrentTask(null);
    } else {
      addTask(taskName, author); // Pass author when adding
    }

    setTaskName("");
    setAuthor("");
    setCharCount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR_LIMIT) {
      setTaskName(value);
      setCharCount(value.length);
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  return (
    <Dialog>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Label className="text-xl font-bold">Today's Task</Label>
          <Label className="text-gray-500">{currentDate}</Label>
        </div>
        <DialogTrigger asChild className="px-6 gap-1.5">
          <Button className="flex text-blue-700 bg-blue-200 items-center rounded-2xl">
            <Plus color="#1d4ed8" strokeWidth={1.75} />
            <Label className="cursor-pointer text-base">New task</Label>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>Add your tasks here. Click save when you are done</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              type="text"
              value={taskName}
              onChange={handleInputChange}
              placeholder="What would you like to do?"
              maxLength={MAX_CHAR_LIMIT}
              className="col-span-3 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Created by
            </Label>
            <Input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              placeholder="Who is responsible?"
              className="col-span-3 w-full"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="flex mt-4 text-white bg-black items-center rounded-md p-3"
            >
              <Label>Save task</Label>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
