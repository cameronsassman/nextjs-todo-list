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
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays } from 'lucide-react';
import { format } from "date-fns";

const MAX_CHAR_LIMIT = 50;

export default function TaskForm({ currentTask, setCurrentTask }: any) {
  const { addTask, editTask } = useTasks();
  const [taskName, setTaskName] = useState(currentTask ? currentTask.name : "");
  const [author, setAuthor] = useState(currentTask ? currentTask.author : "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStartTime, setSelectedStartTime] = useState("08:00");
  const [selectedEndTime, setSelectedEndTime] = useState("17:00");
  const [charCount, setCharCount] = useState(0);
  const [images, setImages] = useState<string[]>([]);

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
      addTask(taskName, author, dateTime, images);
    }

    setTaskName("");
    setAuthor("");
    setSelectedDate(undefined);
    setSelectedStartTime("");
    setSelectedEndTime("");
    setImages([]);
    setCharCount(0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            if (newImages.length === files.length) {
              setImages((prevImages) => [...prevImages, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
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
          <Button className="flex text-blue-700 bg-sky-100 items-center rounded-2xl">
            <Plus color="#1d4ed8" strokeWidth={1.75} />
            <Label className="cursor-pointer text-base">New Task</Label>
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
            <Label htmlFor="author" className="text-right">
              User icon
            </Label>
            <Input 
              type="file"
              accept="image/*" 
              multiple 
              onChange={handleImageUpload}
              className="col-span-3 w-full"
            />
          </div>
          <div className="flex gap-1 h-9">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex w-3/5 justify-start text-left font-normal text-muted-foreground">
                    <CalendarDays size={20}/>
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
            <div >
              <Select defaultValue={selectedStartTime!} onValueChange={(e) => setSelectedStartTime(e)} >
                <SelectTrigger className="w-auto">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                <ScrollArea>
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                      .padStart(2, "0");
                    const minute = ((i % 4) * 15)
                      .toString()
                      .padStart(2, "0");
                    return (
                      <SelectItem key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </SelectItem>
                    );
                  })}
                </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select defaultValue={selectedEndTime!} onValueChange={(e) => setSelectedEndTime(e)}>
                <SelectTrigger className="w-auto">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                <ScrollArea >
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                      .padStart(2, "0");
                    const minute = ((i % 4) * 15)
                      .toString()
                      .padStart(2, "0");
                    return (
                      <SelectItem key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </SelectItem>
                    );
                  })}
                </ScrollArea>
                </SelectContent>
              </Select>
            </div>
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
