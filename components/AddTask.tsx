"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import { TaskData } from "@/utils/interface";

interface AddTaskProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskPage = ({ setIsOpen }: AddTaskProps) => {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("story");
  const [storyPoint, setStoryPoint] = useState(1);
  const [assignedTo, setAssignedTo] = useState("");
  const [finishedBy, setFinishedBy] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [projectStage, setProjectStage] = useState("planning");
  const [availableTags, setAvailableTags] = useState<string[]>([
    "UI",
    "API",
    "Backend",
    "Frontend",
    "Bug",
    "Enhancement",
  ]);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      const newTags = tagInput.split(",").map((tag) => tag.trim());
      setTags([...tags, ...newTags]);
      setAvailableTags([...availableTags, ...newTags]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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
      tags,
    };
    try {
      await addTask(data);
      setIsOpen(false);
    } catch (e) {
      alert("Error adding task");
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="story">Story</option>
            <option value="bugs">Bugs</option>
          </select>
        </div>

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

        <div className="form-group">
          <label>Assigned to:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>

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

        <div className="form-group">
          <label>Tag(s):</label>
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              list="tagOptions"
              onSelect={(e) => {
                const selectedTag = e.currentTarget.value;
                if (selectedTag && !tags.includes(selectedTag)) {
                  setTags([...tags, selectedTag]);
                  setTagInput("");
                }
              }}
            />
            <datalist id="tagOptions">
              {availableTags
                .filter(
                  (tag) =>
                    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
                    !tags.includes(tag)
                )
                .map((tag) => (
                  <option key={tag} value={tag} />
                ))}
            </datalist>
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="tags-list">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}{" "}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

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
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .tags-input {
          display: flex;
          gap: 8px;
        }
        .tags-list {
          margin-top: 10px;
        }
        .tag {
          display: inline-block;
          background-color: #d0c9f9;
          padding: 5px 10px;
          border-radius: 16px;
          margin-right: 5px;
        }
        button {
          padding: 8px 16px;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AddTaskPage;