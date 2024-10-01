"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import { TaskData } from "@/utils/interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput as Input,
} from "@/components/ui/command";

interface AddTaskProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultTags = ["UI", "API", "Backend", "Frontend", "Bug", "Enhancement"];

const AddTaskPage = ({ setIsOpen }: AddTaskProps) => {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("story");
  const [storyPoint, setStoryPoint] = useState(1);
  const [assignedTo, setAssignedTo] = useState("");
  const [finishedBy, setFinishedBy] = useState("");
  const [priority, setPriority] = useState("medium");
  const [projectStage, setProjectStage] = useState("planning");

  // Tag states
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(defaultTags);
  const [open, setOpen] = useState(false);

  const handleUnselectTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((s) => s !== tag));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if ((e.key === "Delete" || e.key === "Backspace") && input.value === "") {
        setSelectedTags((prev) => {
          const newSelected = [...prev];
          newSelected.pop();
          return newSelected;
        });
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const addNewTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags((prev) => [...prev, inputValue]);
      setSelectedTags((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: TaskData = {
      taskName,
      description,
      type,
      status: "Not Started",
      storyPoint: storyPoint.toString(),
      assignedTo,
      projectStage,
      priority,
      tags: selectedTags,
    };
    try {
      await addTask(data);
      setIsOpen(false);
    } catch (e) {
      alert("Error adding task");
    }
  };

  const selectableTags = tags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        {/* Task name input */}
        <div className="form-group">
          <label>Task name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        {/* Description input */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Type dropdown */}
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="story">Story</option>
            <option value="bugs">Bugs</option>
          </select>
        </div>

        {/* Storypoint dropdown */}
        <div className="form-group">
          <label>Storypoint:</label>
          <select
            value={storyPoint}
            onChange={(e) => setStoryPoint(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Assigned to input */}
        <div className="form-group">
          <label>Assigned to:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>

        {/* Project stage dropdown */}
        <div className="form-group">
          <label>Project Stage:</label>
          <select
            value={projectStage}
            onChange={(e) => setProjectStage(e.target.value)}
          >
            <option value="planning">Planning</option>
            <option value="implementation">Implementation</option>
            <option value="testing">Testing</option>
          </select>
        </div>

        {/* Priority dropdown */}
        <div className="form-group">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Tags input */}
        <div className="form-group">
          <label>Tag(s):</label>
          <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
          >
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <div className="flex gap-1 flex-wrap">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-background text-foreground"
                  >
                    {tag}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselectTag(tag)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))}
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onBlur={() => setOpen(false)}
                  onFocus={() => setOpen(true)}
                  placeholder="Add tag..."
                  className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                />
              </div>
            </div>
            {open && selectableTags.length > 0 ? (
              <div className="relative mt-2">
                <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                  <CommandGroup>
                    {selectableTags.map((tag) => (
                      <CommandItem
                        key={tag}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          setSelectedTags((prev) => [...prev, tag]);
                        }}
                      >
                        {tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              </div>
            ) : null}
          </Command>
          <Button
            onClick={addNewTag}
            className="mt-2"
            disabled={!inputValue || tags.includes(inputValue)}
          >
            Add Tag
          </Button>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Task
          </button>
        </div>
      </form>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f0f0f0;
          border-radius: 8px;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
        }
        input,
        select,
        textarea {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        input[type="text"],
        textarea {
          height: 40px;
        }
        textarea {
          resize: vertical;
          min-height: 80px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default AddTaskPage;
