"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddTaskPage = () => {
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

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form Submitted");
    console.log({
      taskName,
      description,
      type,
      storyPoint,
      assignedTo,
      finishedBy,
      priority,
      tags,
    });
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
          <label>Finished by:</label>
          <input
            type="date"
            value={finishedBy}
            onChange={(e) => setFinishedBy(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tag(s):</label>
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
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

        <div className="flex justify-end space-x-4">
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
