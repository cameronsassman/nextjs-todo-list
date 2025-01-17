'use client';

import { useState } from "react";
import { Plus } from "lucide-react";

import "../../globals.css";
import { useTasks } from "@/lib/context";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from 'lucide-react';
import { format } from "date-fns";

const MAX_CHAR_LIMIT = 50;

export default function TaskForm({ currentTask, setCurrentTask }: any) {
  const { addTask, editTask } = useTasks();
  const [taskName, setTaskName] = useState(currentTask ? currentTask.name : "");
  const [author, setAuthor] = useState(currentTask ? currentTask.author : "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [image, setImage] = useState("");
  const [charCount, setCharCount] = useState(0);

  const today = new Date();
  const currentDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!taskName.trim() || !author.trim() || !selectedDate || !selectedStartTime || !selectedEndTime) {
      return alert("All fields are required");
    }

    const formattedDate = selectedDate.toLocaleDateString();
    const dateTime = `${formattedDate} ${selectedStartTime} - ${selectedEndTime}`;
    if (currentTask) {
      editTask(currentTask.id, taskName, author);
      setCurrentTask(null);
    } else {
      addTask(taskName, author, dateTime, image);
    }

    setTaskName("");
    setAuthor("");
    setSelectedDate(undefined);
    setSelectedStartTime("");
    setSelectedEndTime("");
    setImage("");
    setCharCount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR_LIMIT) {
      setTaskName(value);
      setCharCount(value.length);
    }
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
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Who is responsible?"
              className="col-span-3 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              User image
            </Label>
            <Input
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="col-span-3 w-full"
            />
          </div>
          <div className="justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex w-3/5 justify-start text-left font-normal text-muted-foreground">
                    <CalendarDays />
                    <span className="pl-2.5">{selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="justify-items-center"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select defaultValue={selectedStartTime}>
              <SelectTrigger>
                <SelectValue placeholder="Test"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">{selectedStartTime}</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="time"
              value={selectedStartTime}
              onChange={(e) => setSelectedStartTime(e.target.value)}
            />
            <Input
              type="time"
              value={selectedEndTime}
              onChange={(e) => setSelectedEndTime(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="flex mt-4 text-white bg-black items-center rounded-md p-3">
              <Label>Save task</Label>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
